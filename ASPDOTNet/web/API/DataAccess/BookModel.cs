using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.DataAccess
{
    public class BookModel
    {
        public int? Id {get; set;}

        [Required]
        [MaxLength(50)]
        public String? Title {get; set;}

        [Required]
        [MaxLength(50)]
        public String? Sub_Title {get; set;}

        [Required]
        public DateTime YearOf_Publication {get; set;}

        [Required]
        [MaxLength(50)]
        public String? ISBN_Number {get; set;}

        [Required]        
        [MaxLength(50)]
        public String? Publisher {get; set;}

        [NotMapped]
        public IFormFile? Front_Cover_Img {get; set;}

        public String? Front_Cover_Img_url {get; set;}

        [NotMapped]
        public IFormFile? Back_Cover_Img {get; set;}
        public String? Back_Cover_Img_url {get; set;}

        [NotMapped]
        public IFormFile? Small_front_Cover_Img { get; set; }
        public String? Small_front_Cover_Img_url { get; set; }

        [NotMapped]
        public IFormFile? BookFile { get; set; }

        public String? Book_FilePath { get; set; }

        [Required]
        public double Price {get; set;}

        [Required]
        public int? AuthorId { get; set; }
        
        public int? PurchaseCount { get; set; }


    }
}