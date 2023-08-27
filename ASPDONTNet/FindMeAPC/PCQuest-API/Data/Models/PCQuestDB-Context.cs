using Microsoft.EntityFrameworkCore;

namespace PCQuest_API.Data.Models
{
    public class PCQuestDB_Context: DbContext
    {
        public PCQuestDB_Context(DbContextOptions<PCQuestDB_Context> options): base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Price> Prices { get; set; }
    }
}
