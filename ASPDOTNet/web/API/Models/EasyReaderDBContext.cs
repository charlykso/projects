using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class EasyReaderDBContext: IdentityDbContext
    {
        public EasyReaderDBContext(DbContextOptions options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Book_User>()
                .HasOne(b => b.Book)
                .WithMany(bu => bu.Book_User)
                .HasForeignKey(bi => bi.BookId);

            modelBuilder.Entity<Book_User>()
                .HasOne(b => b.User)
                .WithMany(bu => bu.Book_User)
                .HasForeignKey(bi => bi.UserId);
        }

        public new DbSet<User> Users { get; set; } = null!;
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Author> Authors { get; set; } = null!;
        public DbSet<Book_User> Book_Users { get; set; } = null!;
        public DbSet<BookAuditLog> BookAuditLogs { get; set; } = null!;
    }
}
