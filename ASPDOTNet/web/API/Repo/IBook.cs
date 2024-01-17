using API.Models;

namespace API.Repo
{
    public interface IBook
    {
        public Task<IEnumerable<Book>> GetAllBooks();
        public Task<Book> GetBook(int Id);
        public Task<String> CreateBook(Book NewBook);
        public Task<String> UpdateBook(int Id, Book EditBook);
        public Task<String> DeleteBook(int Id);
        public void ChangedData(Book DBook);
        public Task<IEnumerable<Book>> RecentBooks();
        public Task<IEnumerable<Book>> PopularBooks(string baseUrl);
        public Task<String> downloadBook(int bookId, int userId);
        public Task<DateTime> BookAudit();
    }
}