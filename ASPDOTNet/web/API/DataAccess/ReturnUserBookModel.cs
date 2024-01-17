using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataAccess
{
    public class ReturnUserModel{

        public int Id { get; set; }
        public string? Lastname { get; set; }

        public string? Firstname { get; set; }

        public string? Email { get; set; }

        public string? Phone_no { get; set; }

        public string? Role { get; set; }

        public DateTime Created_at { get; set; }

        public DateTime Updated_at { get; set; }
        public List<Book_User>? Book_User { get; set; }

    }

    public class Book_User{
        public Book? Book { get; set; }
    }


    public class Book
    {
        public int? Id { get; set; }

        public String? Title { get; set; }

        public String? Sub_Title { get; set; }

        public DateTime YearOf_Publication { get; set; }

        public String? ISBN_Number { get; set; }

        public String? Publisher { get; set; }

        public String? Front_Cover_Img_url { get; set; }

        public String? Back_Cover_Img_url { get; set; }

        public String? Small_front_Cover_Img_url { get; set; }

        public String? Book_FilePath { get; set; }

        public double Price { get; set; }

        public Author? Author { get; set; }
    }

    public class Author{

        public string? Lastname { get; set; }

        public string? Firstname { get; set; }

        public string? Email { get; set; }

        public string? Phone_no { get; set; }

        public string? Gender { get; set; }

        public DateTime Date_of_birth { get; set; }

        public string? ImageURL { get; set; }

        public DateTime Created_at { get; set; }

        public DateTime Updated_at { get; set; }
    }

}
