using API.DataAccess;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController: ControllerBase
    {
        private readonly IConfiguration? _IConfig;
        private readonly EasyReaderDBContext? _EasyReadContext;
        private readonly IMapper _imapper;
        public LoginController(EasyReaderDBContext EasyReadContext, IConfiguration IConfig, IMapper imapper)
        {
            _EasyReadContext = EasyReadContext;
            _IConfig = IConfig;
            _imapper = imapper;
        }

        [AllowAnonymous]
        [HttpPost]
        //api/login
        public async Task<IActionResult> Login([FromBody] UserLoginModel userLogin)
        {
            try
            {
                string baseURL = _IConfig!["Base_URL:URL"];
                var logUser = await AuthenticateUser(userLogin);
                // Console.WriteLine(logUser);
                var tokenUser = new User();
                tokenUser.Id = logUser.Id;
                tokenUser.Firstname = logUser.Firstname;
                tokenUser.Lastname = logUser.Lastname;
                tokenUser.Role = logUser.Role;
                tokenUser.Email = logUser.Email;

                if (logUser != null)
                {
                    var newtoken = new GenerateToken(_IConfig!);
                    var token = newtoken.GenerateTokenForUser(tokenUser);

                    if (logUser.Book_User != null)
                    {
                        foreach (var item in logUser.Book_User)
                        {
                            item.Book!.Back_Cover_Img_url = baseURL + item.Book.Back_Cover_Img_url!.Remove(0, 7);
                            item.Book!.Front_Cover_Img_url = baseURL + item.Book.Front_Cover_Img_url!.Remove(0, 7);
                            item.Book!.Small_front_Cover_Img_url = baseURL + item.Book.Small_front_Cover_Img_url!.Remove(0, 7);
                            item.Book!.Book_FilePath = baseURL + item.Book.Book_FilePath!.Remove(0, 7);
                        }
                    }


                    return Ok(new
                    {
                        token = token,
                        Id = logUser.Id,
                        Firstname = logUser.Firstname,
                        Lastname = logUser.Lastname,
                        Role = logUser.Role,
                        Email = logUser.Email,
                        Phone = logUser.Phone_no,
                        Book_User = logUser.Book_User

                    });
                }

                return NotFound("User not found");
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }


        private async Task<DataAccess.ReturnUserModel> AuthenticateUser(UserLoginModel userLogin)
        {
            try
            {
                var currentUser = await _EasyReadContext!.Users.AsQueryable().Where(u => 
                u.Phone_no == userLogin.Phone_no).Include(bu => bu.Book_User!).ThenInclude(b => b.Book).ThenInclude(b => b!.Author).FirstAsync();
    
                if (currentUser != null && BCrypt.Net.BCrypt.Verify(userLogin.Password, currentUser.Password))
                {
                    var user = _imapper.Map<DataAccess.ReturnUserModel>(currentUser);
                    // Console.WriteLine(user);
                    return user;
                }
                Console.WriteLine("User does not exist!");
                return null!;
            }
            catch (System.Exception ex)
            {
                
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        
    }
}
