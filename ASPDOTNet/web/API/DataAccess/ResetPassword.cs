using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataAccess
{
    public class ResetPassword
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ResetPasswordToken { get; set; }
    }
}