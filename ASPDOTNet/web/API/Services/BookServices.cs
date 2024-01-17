using System;
using API.Models;
using API.Repo;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class BookServices : IBook
    {
        private readonly EasyReaderDBContext? _easyReaderDBContext;
        public BookServices(EasyReaderDBContext easyReaderDBContext)
        {
            _easyReaderDBContext = easyReaderDBContext;
        }

        public DateTime GetLastModificationTimestamp()
        {
            var lastModification = _easyReaderDBContext!.BookAuditLogs.FirstOrDefault();
            return lastModification?.ChangeMadeAt ?? DateTime.MinValue;
        }

        public void ChangedData(Book DBook)
        {
            try
            {
                var lastModification = _easyReaderDBContext!.BookAuditLogs.FirstOrDefault();

                if (lastModification == null)
                {
                    lastModification = new BookAuditLog
                    {
                        BookId = DBook.Id,
                        ChangeMadeAt = DateTime.Now,
                    };
                    _easyReaderDBContext.BookAuditLogs.Add(lastModification);
                }
                else
                {
                    lastModification.BookId = DBook.Id;
                    lastModification.ChangeMadeAt = DateTime.Now;
                }

                _easyReaderDBContext.SaveChanges();
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
            }

        }

        public async Task<string> CreateBook(Book NewBook)
        {
            try
            {
                var book = await _easyReaderDBContext!.Books.AddAsync(NewBook);
                _easyReaderDBContext.SaveChanges();
                return "Book created";
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
                return (ex.Message);
            }
        }

        public async Task<string> DeleteBook(int Id)
        {
            try
            {
                var book = await _easyReaderDBContext!.Books.FindAsync(Id);
                if (book != null)
                {
                    _easyReaderDBContext.Remove(book);
                    _easyReaderDBContext.SaveChanges();
                    return "Book updated successfuly";
                }
                Console.WriteLine($"No book found with the id {Id}");
                return $"No book found with the id {Id}";
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
                return (ex.Message);
            }
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {

            try
            {
                var books = await _easyReaderDBContext!.Books.OrderBy(b => b.Title).AsQueryable()
                                                .Include(a => a.Author).ToListAsync();
                if (books is null)
                {
                    if (books!.Count() == 0)
                    {
                        Console.WriteLine("No books registered in the database");
                        return null!;
                    }
                    Console.WriteLine("Please fill in valid information");
                    return null!;
                }
                foreach (var book in books)
                {
                    if (book.Author == null)
                    {
                        Console.WriteLine("Book has no author");
                        return null!;
                    }
                }
                return books;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("This is the book services");
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<Book> GetBook(int Id)
        {
            try
            {
                var book = await _easyReaderDBContext!.Books.Where(b => b.Id == Id)
                                                        .Include(buk => buk.Author)
                                                        .FirstAsync();
                if (book is null)
                {
                    Console.WriteLine($"No book found with the id {Id}");
                    return null!;
                }
                return book;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<String> UpdateBook(int Id, Book EditBook)
        {
            try
            {
                var book = await _easyReaderDBContext!.Books.FindAsync(Id);

                if (book is null)
                {
                    Console.WriteLine($"No book found with the id {Id}");
                    throw new Exception($"No book found with the id {Id}");
                }
                else
                {

                    _easyReaderDBContext.Books.Attach(book!);
                    _easyReaderDBContext.SaveChanges();
                    Console.WriteLine("Book Updated successfuly");
                    return "Book Updated successfuly";
                }
            }
            catch (System.Exception ex)
            {

                Console.WriteLine(ex.Message);
                return (ex.Message);
            }
        }

        public async Task<IEnumerable<Book>> RecentBooks()
        {
            try
            {
                var book = await _easyReaderDBContext!.Books.OrderByDescending(b => b.Created_at)
                .Include(b => b.Author)
                .Take(5).ToListAsync();
                return book;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }

        }

        public async Task<IEnumerable<Book>> PopularBooks(string baseURL)
        {
            try
            {
                var popularBooks = await _easyReaderDBContext!.Book_Users.AsQueryable().GroupBy(b => b.BookId)
                .OrderByDescending(group => group.Count()).Take(7)
                .Select(group => new
                {
                    BookId = group.Key,
                    PurchaseCount = group.Count()
                })
                .ToListAsync();
                // Console.WriteLine(popularBooks);
                if (popularBooks.Any())
                {
                    var bookIds = popularBooks.Select(b => b.BookId);

                    var booksWithCounts = await _easyReaderDBContext!.Books
                        .Where(b => bookIds.Contains(b.Id)).Include(b => b.Author)
                        .ToListAsync();

                    // Create a list of Book objects with an additional PurchaseCount property
                    var result = booksWithCounts
                        .Join(popularBooks, b => b.Id, pb => pb.BookId, (b, pb) => new Book
                        {
                            // Copy all properties from the book entity
                            Id = b.Id,
                            Title = b.Title,
                            Author = b.Author,
                            Sub_Title = b.Sub_Title,
                            YearOf_Publication = b.YearOf_Publication,
                            ISBN_Number = b.ISBN_Number,
                            Publisher = b.Publisher,
                            Front_Cover_Img_url = baseURL + b.Back_Cover_Img_url!.Remove(0, 7),
                            Back_Cover_Img_url = baseURL + b.Back_Cover_Img_url!.Remove(0, 7),
                            Small_front_Cover_Img_url = baseURL + b.Small_front_Cover_Img_url!.Remove(0, 7),
                            // Book_FilePath = baseURL + b.Book_FilePath!.Remove(0, 7),
                            Book_FilePath = null,
                            Created_at = b.Created_at,
                            Updated_at = b.Updated_at,
                            Price = b.Price,
                            // Add the PurchaseCount property
                            PurchaseCount = pb.PurchaseCount
                        })
                        .OrderByDescending(b => b.PurchaseCount) // Order by PurchaseCount
                        .ToList();

                    return result;
                }

                return Enumerable.Empty<Book>();
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<string> downloadBook(int bookId, int userId)
        {
            try
            {
                var user = await _easyReaderDBContext!.Book_Users.AsQueryable().Where(b => b.UserId == userId && b.BookId == bookId)
                .Include(b => b.Book)
                .FirstOrDefaultAsync();

                if (user is null)
                {
                    return "Not paid for";
                }
                else
                {
                    var book_filePath = user.Book!.Book_FilePath;
                    return book_filePath!;
                }
            }
            catch (System.Exception ex)
            {
                // return(ex.Message);
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<DateTime> BookAudit()
        {
            try
            {
                var changeTime = await _easyReaderDBContext!.BookAuditLogs.FirstOrDefaultAsync();
                if (changeTime is null)
                {
                    DateTime myDate = new DateTime(2023, 9, 26, 0, 0, 0);
                    return myDate;
                }
                return changeTime.ChangeMadeAt;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
