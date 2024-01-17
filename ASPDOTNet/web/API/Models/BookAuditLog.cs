using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class BookAuditLog
    {
        public int Id { get; set; }
        
        [Required]
        public int BookId { get; set; }
        public Book? Book { get; set; }

        [Required]
        public DateTime ChangeMadeAt { get; set; }
    }
}