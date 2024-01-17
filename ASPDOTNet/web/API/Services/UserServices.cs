using API.Models;
using API.Repo;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserServices : IUser
    {
        private readonly EasyReaderDBContext? _easyReaderDBContext;
        public UserServices(EasyReaderDBContext easyReaderDBContext)
        {
            _easyReaderDBContext = easyReaderDBContext;
        }

        public async Task<string> CheckEmail(string Email)
        {
            try
            {
                var checkUserEmail = await _easyReaderDBContext!.Users.FirstOrDefaultAsync(e =>
                e.Email!.ToLower() == Email.ToLower());

                if (checkUserEmail is null)
                {
                    return ("NOT EXIST");
                }
                else
                {
                    return ("EXIST");
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<User> GetUserByMail(string Email)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.Include(u => u.Book_User!)
                .ThenInclude(b => b.Book).ThenInclude(b => b!.Author).FirstOrDefaultAsync(e =>
                e.Email!.ToLower() == Email.ToLower());
                if (user is null)
                {
                    return null!;
                }
                else
                {
                    return user;
                }
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
                throw;
            }

        }


        public async Task<string> CheckPhone(string Phone_no)
        {
            try
            {
                var phone_noExist = await _easyReaderDBContext!.Users.FirstOrDefaultAsync(p =>
                p.Phone_no == Phone_no);

                if (phone_noExist is null)
                {
                    return ("Not Exist");
                }
                else
                {
                    return ("Exist");
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async void CreateUser(User NewUser)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.AddAsync(NewUser);
                _easyReaderDBContext.SaveChanges();
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async void DeleteUser(int Id)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.FindAsync(Id);
                if (user != null)
                {
                    _easyReaderDBContext.Remove(user);
                    _easyReaderDBContext.SaveChanges();
                }
                else
                {
                    Console.WriteLine($"No user found with the id {Id}");
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            try
            {
                var users = _easyReaderDBContext!.Users
                                                .Include(bu => bu.Book_User);
                if (users is null)
                {
                    if (users!.Count() == 0)
                    {
                        Console.WriteLine("No user registered in the database");
                        return null!;
                    }
                    Console.WriteLine("Please fill in valid information");
                    return null!;
                }
                var myUser = await users!.ThenInclude(b => b.Book).ToListAsync();

                return myUser!;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        public async Task<User> GetUser(int Id)
        {
            try
            {
                var user = _easyReaderDBContext!.Users.Where(a => a.Id == Id)
                                                        .Include(bu => bu.Book_User);

                if (user is null)
                {
                    Console.WriteLine($"No user found with the id {Id}");
                    return null!;
                }
                var myUser = await user!.ThenInclude(b => b.Book).FirstOrDefaultAsync();
                // await Task.Delay(2000);
                return myUser!;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async void UpdateUser(int Id, User EditUser)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.FindAsync(Id);
                if (user is null)
                {
                    Console.WriteLine($"No user found with the id {Id}");
                }
                _easyReaderDBContext.Users.Attach(user!);
                _easyReaderDBContext.SaveChanges();
                Console.WriteLine("User Updated successfuly");
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<string> GenerateResetToken(string Email)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.Where(u => u.Email == Email).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new Exception("User Not found");
                }
                else
                {
                    var reset_token = Guid.NewGuid();
                    Console.WriteLine(reset_token);
                    user.PasswordResetToken = reset_token.ToString();
                    user.Updated_at = DateTime.Now;
                    _easyReaderDBContext.Users.Attach(user);
                    _easyReaderDBContext.SaveChanges();
                    return reset_token.ToString();
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<string> ResetPassword(string Email, string Password, string ResetToken)
        {
            try
            {
                var user = await _easyReaderDBContext!.Users.Where(u => u.Email == Email).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new Exception("User Not Found");
                }
                else
                {
                    if (user.PasswordResetToken == ResetToken)
                    {
                        var new_Password = BCrypt.Net.BCrypt.HashPassword(Password);
                        user.Password = new_Password;
                        user.Updated_at = DateTime.Now;
                        user.PasswordResetToken = null;
                        _easyReaderDBContext.Users.Attach(user);
                        _easyReaderDBContext.SaveChanges();
                        return "Password changed";
                    }
                    throw new Exception("Incorrect token");
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
