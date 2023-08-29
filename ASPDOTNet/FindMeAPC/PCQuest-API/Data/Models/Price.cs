namespace PCQuest_API.Data.Models
{
    public class Price
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Double Amount { get; set; }
        public string? Company { get; set; }
        public ICollection<Product>? Products { get; set; }
        public DateTime? Createdat { get; set; } = DateTime.Now;
        public DateTime? Updatedat { get; set; }
    }
}
