namespace PCQuest_API.Data.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; } = null;
        public string? ImgFilePath { get; set; }
        public Category? Category { get; set; }
        public Price? Price { get; set; }
        public DateTime? Createdat { get; set; }
        public DateTime? Updatedat { get; set;}
    }
}
