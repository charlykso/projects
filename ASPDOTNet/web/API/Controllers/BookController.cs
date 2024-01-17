using System;
using System.IO;
using API.DataAccess;
using API.Models;
using API.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Collectives;
using CloudinaryDotNet;
using Humanizer;
using CloudinaryDotNet.Actions;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private IConfiguration _iConfig;
        private readonly IBook? _iBook;
        private readonly Cloudinary _cloudinary;

        public BookController(IBook iBook, IConfiguration iConfig)
        {

            _iBook = iBook;
            _iConfig = iConfig;

            var account = new Account(
                _iConfig["Cloudinary:Cloud_Name"],
                _iConfig["Cloudinary:Api_Key"],
                _iConfig["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary(account);
        }

        [Authorize]
        //api/book/GetAllBooks
        //api/book/GetAllBooks?sort=desc or asc&by=Title or price or pub_date&pageNumber=1&pageSize=5
        [HttpGet("GetAllBooks")]
        public async Task<ActionResult> GetAllBooks(string? sort, string? by, int? pageNumber, int? pageSize)
        {
            var currentPageNumber = pageNumber ?? 1;
            var currentPageSize = pageSize ?? 1000;
            try
            {
                var books = await _iBook!.GetAllBooks();
                string baseURL = _iConfig["Base_URL:URL"];

                foreach (var item in books)
                {
                    // item.Back_Cover_Img_url = baseURL + item.Back_Cover_Img_url!.Remove(0, 7);
                    item.Front_Cover_Img_url = baseURL + item.Front_Cover_Img_url!.Remove(0, 7);
                    // item.Small_front_Cover_Img_url = baseURL + item.Small_front_Cover_Img_url!.Remove(0, 7);
                    // item.Book_FilePath = baseURL + item.Book_FilePath!.Remove(0, 7);
                    item.Book_FilePath = null;
                    item.Author!.Books = null;
                    item.Author.Password = null;
                }

                if (by == "title")
                {
                    switch (sort)
                    {
                        case "desc":
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderByDescending(b => b.Title));
                        default:
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderBy(b => b.Title));

                    }
                }
                else if (by == "price")
                {
                    switch (sort)
                    {
                        case "desc":
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderByDescending(b => b.Price));
                        default:
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderBy(b => b.Price));
                    }
                }
                else if (by == "pub_year")
                {
                    switch (sort)
                    {
                        case "desc":
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderByDescending(b => b.YearOf_Publication));
                        default:
                            return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize).OrderBy(b => b.YearOf_Publication));
                    }
                }
                else
                {
                    // Console.WriteLine($"Books: {books}");
                    return Ok(books.Skip((currentPageNumber - 1) * currentPageSize).Take(currentPageSize));
                }
            }
            catch (System.Exception ex)
            {
                
                Console.WriteLine("This is the Book controller");
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        //api/book/GetBook/Id
        [HttpGet("GetBook/{Id}")]
        public async Task<ActionResult> GetBook(int Id)
        {
            try
            {

                var book = await _iBook!.GetBook(Id);
                string baseURL = _iConfig["Base_URL:URL"];

                // book.Back_Cover_Img_url = baseURL + book.Back_Cover_Img_url!.Remove(0, 7);
                book.Front_Cover_Img_url = baseURL + book.Front_Cover_Img_url!.Remove(0, 7);
                // book.Small_front_Cover_Img_url = baseURL + book.Small_front_Cover_Img_url!.Remove(0, 7);
                // book.Book_FilePath = baseURL + book.Book_FilePath!.Remove(0, 7);
                book.Book_FilePath = null;
                book.Author!.Books = null;
                book.Author.Password = null;

                return Ok(book);
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        //api/book/GetSingleBook/Id
        [HttpGet("GetSingleBook/{Id}")]
        public async Task<ActionResult> GetSingleBook(int Id)
        {
            string baseURL = _iConfig["Base_URL:URL"];

            // string basePath = AppContext.BaseDirectory;
            // string baseurl = basePath.Remove(26);
            // string baseURL = baseurl + "wwwroot";
            try
            {
                var book = await _iBook!.GetBook(Id);

                return Ok(new
                {
                    
                    Title = book.Title,
                    Sub_Title = book.Sub_Title,
                    Publisher = book.Publisher,
                    ISBN_Number = book.ISBN_Number,
                    Price = book.Price,
                    Front_Cover_Img_url = book.Front_Cover_Img_url,
                    // Back_Cover_Img_url = book.Back_Cover_Img_url,
                    // Small_front_Cover_Img_url = book.Small_front_Cover_Img_url,
                    AuthorId = book.AuthorId,
                    Created_at = book.Created_at,
                    Updated_at = book.Updated_at,
                    Author_name = book.Author!.Lastname + " " + book.Author!.Firstname,
                    YearOf_Publication = book.YearOf_Publication

                });
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        //api/book/CreateBook
        [HttpPost("CreateBook")]
        public async Task<ActionResult> CreateBook([FromForm] BookModel newBook)
        {
            try
            {
                var first_guid = Guid.NewGuid();
                var first_filePath = Path.Combine("wwwroot/book_cover/", first_guid.ToString());
                var first_filestream = new FileStream(first_filePath, FileMode.Create);
                newBook.Front_Cover_Img!.CopyTo(first_filestream);

                var uploadBookCover = new ImageUploadParams()
                {
                    File = new FileDescription(first_filestream.ToString()), // Replace with the path to your image
                    Folder = "Easyread/local/bookCover"
                };
                var uploadBookCoverResult = _cloudinary.Upload(uploadBookCover);
                var bookCoverPath = uploadBookCoverResult.SecureUrl.ToString();

                // var second_guid = Guid.NewGuid();
                // var second_filePath = Path.Combine("wwwroot/book_cover/", second_guid + ".jpg");
                // var second_filestream = new FileStream(second_filePath, FileMode.Create);
                // newBook.Back_Cover_Img!.CopyTo(second_filestream);

                // var third_guid = Guid.NewGuid();
                // var third_filePath = Path.Combine("wwwroot/book_cover/", third_guid + ".jpg");
                // var third_filestream = new FileStream(third_filePath, FileMode.Create);
                // newBook.Small_front_Cover_Img!.CopyTo(third_filestream);

                var bookFile = newBook.Title!.Replace(" ", "_").ToLower();
                bookFile = bookFile.Replace("'","");
                var bookFilePath = Path.Combine("wwwroot/books/", bookFile);
                var bookFileStream = new FileStream(bookFilePath, FileMode.Create);
                newBook.BookFile!.CopyTo(bookFileStream);
                bookFileStream.Dispose();

                var uploadBookFile = new RawUploadParams()
                {
                    File = new FileDescription(bookFileStream.ToString()),
                    Folder = "Easyread/local/book"
                };
                var uploadBookFileResult = _cloudinary.Upload(uploadBookFile);
                var bookPDFPath = uploadBookFileResult.SecureUrl.ToString();


                var book = new Models.Book();
                book.Title = newBook.Title;
                book.Sub_Title = newBook.Sub_Title;
                book.Publisher = newBook.Publisher;
                book.ISBN_Number = newBook.ISBN_Number;
                book.Price = newBook.Price;
                book.Front_Cover_Img_url = bookCoverPath;
                // book.Back_Cover_Img_url = second_filePath;
                // book.Small_front_Cover_Img_url = third_filePath;
                // var key = _iConfig["Enc:key"];
                // var mainBody = await StringEncryption.EncryptString(key, newBook.Body!);
                // book.Body = mainBody;

                // var encBookFilePath = Path.Combine("wwwroot/books/encrypt/", bookFile + ".pdf");
                // EncryptPDF.EncryptFile(bookFilePath, encBookFilePath, _iConfig["Enc:Key"]);
                
                // var mainBookPath = encBookFilePath;

                book.Book_FilePath = bookPDFPath;
                book.AuthorId = newBook.AuthorId;
                book.Created_at = DateTime.Now;
                book.Updated_at = DateTime.Now;
                book.YearOf_Publication = newBook.YearOf_Publication;
                // if (System.IO.File.Exists(bookFilePath))
                // {
                //     System.IO.File.Delete(bookFilePath);
                // }

                var createNewBook = await _iBook!.CreateBook(book);
                if (createNewBook == "Book created")
                {
                    _iBook.ChangedData(book);
                    return Ok("Book created successfuly!");                    
                }
                
                return BadRequest(createNewBook);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        //api/book/UpdateBook/Id
        [HttpPut("UpdateBook/{Id}")]
        public async Task<ActionResult> UpdateBook(int Id, [FromForm] UpdateBookModel editBook)
        {
            // string basePath = AppContext.BaseDirectory;
            // string baseurl = basePath.Remove(26);
            // string baseURL = baseurl;
            try
            {
                var first_guid = Guid.NewGuid();
                var first_filePath = Path.Combine("wwwroot/book_cover/", first_guid + ".jpg");
                var first_filestream = new FileStream(first_filePath, FileMode.Create);
                editBook.Front_Cover_Img!.CopyTo(first_filestream);

                // var second_guid = Guid.NewGuid();
                // var second_filePath = Path.Combine("wwwroot/book_cover/", second_guid + ".jpg");
                // var second_filestream = new FileStream(second_filePath, FileMode.Create);
                // editBook.Back_Cover_Img!.CopyTo(second_filestream);

                // var third_guid = Guid.NewGuid();
                // var third_filePath = Path.Combine("wwwroot/book_cover/", third_guid + ".jpg");
                // var third_filestream = new FileStream(third_filePath, FileMode.Create);
                // editBook.Small_front_Cover_Img!.CopyTo(third_filestream);

                var bookFile = editBook.Title!.Replace(" ", "_").ToLower();
                bookFile = bookFile.Replace("'", "");
                var bookFilePath = Path.Combine("wwwroot/books/", bookFile + ".pdf");
                var bookFileStream = new FileStream(bookFilePath, FileMode.Create);
                editBook.BookFile!.CopyTo(bookFileStream);
                bookFileStream.Dispose();

                var book = await _iBook!.GetBook(Id);
                book.Title = editBook.Title;
                book.Sub_Title = editBook.Sub_Title;
                book.Publisher = editBook.Publisher;
                book.ISBN_Number = editBook.ISBN_Number;
                book.Price = editBook.Price;

                // book.Back_Cover_Img_url = baseURL + book.Back_Cover_Img_url;
                // book.Front_Cover_Img_url = baseURL + book.Front_Cover_Img_url;
                // book.Small_front_Cover_Img_url = baseURL + book.Small_front_Cover_Img_url;
                // book.Book_FilePath = baseURL + book.Book_FilePath;

                System.IO.File.Delete(book.Front_Cover_Img_url!);
                // System.IO.File.Delete(book.Back_Cover_Img_url!);
                // System.IO.File.Delete(book.Small_front_Cover_Img_url!);
                System.IO.File.Delete(book.Book_FilePath!);
                
                book.Front_Cover_Img_url = first_filePath;
                // book.Back_Cover_Img_url = second_filePath;
                // book.Small_front_Cover_Img_url = third_filePath;

                // var encBookFilePath = Path.Combine("wwwroot/books/encrypt/", bookFile + ".pdf");
                // EncryptPDF.EncryptFile(bookFilePath, encBookFilePath, _iConfig["Enc:Key"]);
                
                // var mainBookPath = encBookFilePath;
                book.Book_FilePath = bookFilePath;
                book.Updated_at = DateTime.Now;
                book.YearOf_Publication = editBook.YearOf_Publication;
                
                // System.IO.File.Delete(bookFilePath);

                var updateBookNow = await _iBook!.UpdateBook(Id, book);
                if (updateBookNow == "Book Updated successfuly")
                {
                    _iBook.ChangedData(book);
                    return Ok("Book Updated successfuly!");
                }
                return BadRequest(updateBookNow);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        //api/book/DeleteBook/Id
        [HttpDelete("DeleteBook/{Id}")]
        public async Task<ActionResult> DeleteBook(int Id)
        {
            try
            {
                //for local
                string basePath = AppContext.BaseDirectory;
                string baseurl = basePath.Remove(26);
                string baseURL = baseurl + "wwwroot";
                // Console.WriteLine(basePath);
                // Console.WriteLine(baseurl);
                var book = await _iBook!.GetBook(Id);
                
                if (book is null)
                {
                    return NotFound($"No book found with the id {Id}");
                }
                else
                {
                    //for local
                    book.Back_Cover_Img_url = baseURL + book.Back_Cover_Img_url!.Remove(0, 7);
                    book.Front_Cover_Img_url = baseURL + book.Front_Cover_Img_url!.Remove(0, 7);
                    book.Small_front_Cover_Img_url = baseURL + book.Small_front_Cover_Img_url!.Remove(0, 7);
                    book.Book_FilePath = baseURL + book.Book_FilePath!.Remove(0, 7);

                    System.IO.File.Delete(book.Back_Cover_Img_url!);
                    System.IO.File.Delete(book.Front_Cover_Img_url!);
                    System.IO.File.Delete(book.Small_front_Cover_Img_url!);
                    System.IO.File.Delete(book.Book_FilePath!);
                    _iBook.ChangedData(book);
                    await _iBook.DeleteBook(Id);
                    return Ok("Book Deleted Successfuly!");
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getRecentBooks")]
        public async Task<IActionResult> RecentBooks()
        {
            try
            {
                var books = await _iBook!.RecentBooks();
                string baseURL = _iConfig["Base_URL:URL"];

                foreach (var item in books)
                {
                    // item.Back_Cover_Img_url = baseURL + item.Back_Cover_Img_url!.Remove(0, 7);
                    item.Front_Cover_Img_url = baseURL + item.Front_Cover_Img_url!.Remove(0, 7);
                    // item.Small_front_Cover_Img_url = baseURL + item.Small_front_Cover_Img_url!.Remove(0, 7);
                    // item.Book_FilePath = baseURL + item.Book_FilePath!.Remove(0, 7);
                    item.Book_FilePath = null;
                    item.Author!.Books = null;
                    item.Author.Password = null;
                }
                return Ok(books);                
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }

        }

        [Authorize]
        [HttpGet("popularBooks")]
        public async Task<IActionResult> PopularBooks()
        {
            try
            {
                var books = await _iBook!.PopularBooks(_iConfig["Base_URL:URL"]);
                string baseURL = _iConfig["Base_URL:URL"];

                if (books is null)
                {
                    return NoContent();
                }
                
                foreach (var item in books)
                {
                    item.Book_FilePath = null;
                    item.Book_FilePath = null;
                    item.Author!.Books = null;
                    item.Author.Password = null;
                }
                return Ok(books);
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{Id}/download")]
        public async Task<IActionResult> downloadBook( int Id, [FromQuery] int userId)
        {
            string baseURL = _iConfig["Base_URL:URL"];
            try
            {
                var book = await _iBook!.downloadBook(Id, userId);
                if (book == "Not paid for")
                {
                    return NotFound(book);
                }
                book = baseURL + book.Remove(0, 7);
                return Ok(book);
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getChangedTime")]
        public async Task<IActionResult> getChangedTime()
        {
            try
            {
                var changedTime = await _iBook!.BookAudit();
                Console.WriteLine("Last change was made "+changedTime.Humanize());
                return Ok(changedTime);
            }
            catch (System.Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }
    }
}
