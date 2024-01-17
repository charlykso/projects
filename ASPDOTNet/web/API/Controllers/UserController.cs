using API.DataAccess;
using API.Models;
using API.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using API.Collectives;
using AutoMapper;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IUser? _iUser;
    private readonly IHttpClientFactory _ClientFactory;
    private readonly IConfiguration _IConfig;
    private IMapper _imapper;

    public UserController(IUser iUser, IConfiguration IConfig, IHttpClientFactory ClientFactory, IMapper imapper)
    {
      _iUser = iUser;
      _IConfig = IConfig;
      _ClientFactory = ClientFactory;
      _imapper = imapper;
    }

    // [Authorize]
    //api/user/GetAllUsers
    [HttpGet("GetAllUsers")]
    public async Task<ActionResult> GetAllUsers()
    {
      try
      {
        var users = await _iUser!.GetAllUsers();

        return Ok(users);
      }
      catch (System.Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [Authorize]
    //api/user/GetUser/Id
    [HttpGet("GetUser/{Id}")]
    public async Task<ActionResult<User>> GetUser(int Id)
    {
      try
      {
        var user = await _iUser!.GetUser(Id);
        // var newUser = user!.inClude(b => b.Book);
        return Ok(user);
      }
      catch (System.Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    //api/user/verifyUser
    [HttpPost("VerifyUser")]
    public async Task<ActionResult> VerifyUserPhone([FromForm] UserModel newUser)
    {
      try
      {
        if (ModelState.IsValid)
        {
          //verify the users phone number to see if it's in DB and send verification code if it's not
          var phoneExist = await _iUser!.CheckPhone(newUser.Phone_no!);
          if (phoneExist == "Not Exist")
          {
            var code = new VeriffyPhoneNo();
            var dCode = code.verifyPhone(newUser.Phone_no!);

            if (dCode == "Request not sent")
            {
              return BadRequest("Request not sent");
            }
            //if the code is sent return the code
            return Ok(dCode);
          }
          return BadRequest("The phone number already exist");
        }
        return BadRequest("Invalid input format");
      }
      catch (System.Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    //api/user/createuser
    [HttpPost("CreateUser")]
    public IActionResult CreateUser([FromForm] UserModel newUser)
    {//after verifying the user phone number we create the user and store the details in the DB
      try
      {
        var user = new User();
        user.Firstname = newUser.Firstname;
        user.Lastname = newUser.Lastname;
        user.Email = newUser.Email;
        user.Phone_no = newUser.Phone_no;
        var newUser_password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
        user.Password = newUser_password;
        if(newUser.Role == null)
        {
          user.Role = "User";
        }else{
          user.Role = newUser.Role;
        }
        user.Created_at = DateTime.Now;
        user.Updated_at = DateTime.Now;

        _iUser!.CreateUser(user);
        //when the user is created generate JWT token for the user and return the token
        var newToken = new GenerateToken(_IConfig);
        var token = newToken.GenerateTokenForUser(user);
        // var Nowuser = _imapper.Map<DataAccess.ReturnUserModel>(user);
        // await Task.Delay(2000);
        return Created( "Succesful",new {
          token = token,
          Id = user.Id,
          Firstname = user.Firstname,
          Lastname = user.Lastname,
          Email = user.Email,
          Phone_no = user.Phone_no,
          Book_User = user.Book_User
        });
      }
      catch (System.Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [Authorize]
    //api/user/UpdateUser
    [HttpPut("UpdateUser/{Id}")]
    public async Task<ActionResult> UpdateUser(int Id, [FromForm]UpdateUserModel editUser)
    {
      try
      {
        if (Id <= 0)
        {
          return NoContent();
        }
        var user = await _iUser!.GetUser(Id);
        if (user is null)
        {
            return NotFound($"No user found with the id {Id}");
        }else
        {
          user.Firstname = editUser.Firstname;
          user.Lastname = editUser.Lastname;
          user.Email = editUser.Email;
          user.Role = editUser.Role;
          user.Updated_at = DateTime.Now;
        }

        try
        {
          _iUser.UpdateUser(Id, user);
          return Created("User Updated successfuly", user);
        }
        catch (System.Exception ex1)
        {

          return BadRequest(ex1.Message);
        }
      }
      catch (System.Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [AllowAnonymous]
    //api/user/googleauth
    [HttpPost("GoogleAuth")]
    public async Task<IActionResult> GoogleAuth([FromForm] SocialMediaToken GetToken)
    {//the google auth token is passed through the form
      var token = GetToken.Token;
      string baseURL = _IConfig!["Base_URL:URL"];
      try
      {
        //this is the uri
        var request = new HttpRequestMessage(HttpMethod.Get, "https://www.googleapis.com/oauth2/v2/userinfo");
        //create an an instance of IHttpclientFactory
        var client = _ClientFactory.CreateClient();
        //add the auth token to the header
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        //send request and get the respond
        HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
        //check if the respond status is successful
        if (response.StatusCode == System.Net.HttpStatusCode.OK)
        {
          //convert the respond to string
          var apiString = await response.Content.ReadAsStringAsync();
          //deserialize it to json object
          var Guser = JsonConvert.DeserializeObject<GoogleAuth>(apiString);
          //Console.WriteLine(Guser!.email);
          //check if the email is in DB
          var userEmail = await _iUser!.CheckEmail(Guser!.email!);
          if (userEmail == "NOT EXIST")
          {
            //if it's not in the DB we create a user
            var user = new User();
            user.Email = Guser.email;
            user.Firstname = Guser.given_name;
            user.Lastname = Guser.family_name;
            user.Role = "User";
            user.Created_at = DateTime.Now;
            user.Updated_at = DateTime.Now;
            try
            {
              _iUser.CreateUser(user);
              var newToken = new GenerateToken(_IConfig);
              var JwtToken = newToken.GenerateTokenForSocialUser(user);

              if (user.Book_User != null)
              {
                foreach (var item in user.Book_User!)
                {
                  item.Book!.Back_Cover_Img_url = baseURL + item.Book.Back_Cover_Img_url!.Remove(0, 7);
                  item.Book!.Front_Cover_Img_url = baseURL + item.Book.Front_Cover_Img_url!.Remove(0, 7);
                  item.Book!.Small_front_Cover_Img_url = baseURL + item.Book.Small_front_Cover_Img_url!.Remove(0, 7);
                  item.Book!.Book_FilePath = baseURL + item.Book.Book_FilePath!.Remove(0, 7);
                  item.User = null;
                  item.Book.Author!.Books = null;
                  item.Book.Author.Password = null;
                }
              }

              return Created("Succesful", new
                    {
                        token = JwtToken,
                        Id = user.Id,
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Role = user.Role,
                        Email = user.Email,
                        Book_User = user.Book_User
              });
            }
            catch (System.Exception ex1)
            {
              return BadRequest(ex1.Message);
            }
          }
          else
          {
            //if the user email is already in the DB, get the user details and generate a signin token for the user
            var newUser = await _iUser.GetUserByMail(Guser.email!);
            var newToken = new GenerateToken(_IConfig);
            var JwtToken = newToken.GenerateTokenForSocialUser(newUser);

            var user = _imapper.Map<DataAccess.ReturnUserModel>(newUser);
            
            if (user.Book_User != null)
            {
              foreach (var item in user.Book_User!)
              {
                item.Book!.Back_Cover_Img_url = baseURL + item.Book.Back_Cover_Img_url!.Remove(0, 7);
                item.Book!.Front_Cover_Img_url = baseURL + item.Book.Front_Cover_Img_url!.Remove(0, 7);
                item.Book!.Small_front_Cover_Img_url = baseURL + item.Book.Small_front_Cover_Img_url!.Remove(0, 7);
                item.Book!.Book_FilePath = baseURL + item.Book.Book_FilePath!.Remove(0, 7);
              }
            }

            return Ok(new
                    {
                        token = JwtToken,
                        Id = user.Id,
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Role = user.Role,
                        Phone_no = user.Phone_no,
                        Email = user.Email,
                        Book_User = user.Book_User

             });
          }
        }
        return NoContent();
      }
      catch (System.Exception ex)
      {
        
        return BadRequest(ex.Message);
      }
       
    }


    [AllowAnonymous]
    //api/user/FacebookAuth
    [HttpPost("FacebookAuth")]
    public async Task<IActionResult> FacebookAuth([FromForm] SocialMediaToken GetToken)
    {
      //get the facebook auth token
      var token = GetToken.Token;
      try
      {
        //set the uri and add the token
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://graph.facebook.com/me?fields=id,name,email&access_token={token}");
        //create an instance of IHttpClientFactory
        var client = _ClientFactory.CreateClient();
        //use the instance of IHttpClientFactory to send the quest and get the response
        HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
        //check if the response is success or not
        if (response.StatusCode == System.Net.HttpStatusCode.OK)
        {
          //convert the respone to a string
          var apiString = await response.Content.ReadAsStringAsync();
          //deserialize it to json object
          var Fuser = JsonConvert.DeserializeObject<FacebookAuth>(apiString);
          //Console.WriteLine(Fuser!.email);
          //check if the user email is in DB
          var userEmail = await _iUser!.CheckEmail(Fuser!.email!);
          if (userEmail == "NOT EXIST")
          {//split the full name into firstname and lastname
            string fullName = Fuser.name!;
            string[] Name = fullName.Split(" ");
          
            var user = new User();
            user.Email = Fuser.email;
            user.Firstname = Name[0];
            user.Lastname = Name[1];
            user.Role = "User";
            user.Created_at = DateTime.Now;
            user.Updated_at = DateTime.Now;
            try
            {
              _iUser.CreateUser(user);
              var newToken = new GenerateToken(_IConfig);
              var JwtToken = newToken.GenerateTokenForSocialUser(user);

              return Created("Succesful", new
                    {
                        token = JwtToken,
                        Id = user.Id,
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Role = user.Role,
                        Email = user.Email,
                        Book_User = user.Book_User

              });
              
            }
            catch (System.Exception ex1)
            {
              
              return BadRequest(ex1.Message);
            }
            
          }
          else
            {
              //if the user email is already in the DB get the user and generate login token
              var newUser = await _iUser.GetUserByMail(Fuser.email!);
              var newToken = new GenerateToken(_IConfig);
              var JwtToken = newToken.GenerateTokenForSocialUser(newUser);
             
              return Ok(new
                    {
                        token = JwtToken,
                        Id = newUser.Id,
                        Firstname = newUser.Firstname,
                        Lastname = newUser.Lastname,
                        Role = newUser.Role,
                        Phone_no = newUser.Phone_no,
                        Email = newUser.Email,
                        Book_User = newUser.Book_User
              });
            }
        }
        return NoContent();
      }
      catch (System.Exception ex)
      {
        return BadRequest(ex.Message);
      }

    }


    [Authorize(Roles = "Admin")]
    //api/user/DeleteUser/Id
    [HttpDelete("DeleteUser/{Id}")]
    public async Task<ActionResult> DeleteUser(int Id)
    {
      try
      {
        var user = await _iUser!.GetUser(Id);


        if (user is null)
        {
          return NotFound($"User with the id {Id} not found");
        }

        try
        {
          _iUser.DeleteUser(Id);
          return Ok("User deleted successfuly");
        }
        catch (System.Exception ex1)
        {

          return BadRequest(ex1.Message);
        }
      }
      catch (System.Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }

    [HttpPost("genToken")]
    public async Task<IActionResult> genToken([FromForm] string Email)
    {
      try
      {
        var res = await _iUser!.GenerateResetToken(Email);
        if (res == "User Not found")
        {
          return NotFound();
        }
        return Ok(res);
      }
      catch (System.Exception ex)
      {
        
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("resetPassword")]
    public async Task<IActionResult> resetPassword([FromForm] ResetPassword resetPassword)
    {
      try
      {
        var res = await _iUser!.ResetPassword(resetPassword.Email!, resetPassword.Password!, resetPassword.ResetPasswordToken!);
        if (res == "Password changed")
        {
          return Ok(res);
        }
        return BadRequest(res);
        
      }
      catch (System.Exception ex)
      {
        
        return BadRequest(ex.Message);
      }
    }
  }
}
