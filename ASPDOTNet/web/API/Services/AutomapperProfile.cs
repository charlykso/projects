using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataAccess;
using API.Models;
using AutoMapper;
using Book_User = API.DataAccess.Book_User;

namespace API.Services
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            //for login
            CreateMap<User, ReturnUserModel>();
            CreateMap<Models.Book_User, DataAccess.Book_User>();
            CreateMap<Models.Book, DataAccess.Book>();
            CreateMap<Models.Author, DataAccess.Author>();

        }
    }
}