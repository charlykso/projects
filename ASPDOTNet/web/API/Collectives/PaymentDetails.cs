namespace API.Collectives
{
    public class PaymentDetails
    {
        public data? data { get; set; }
        public string? status { get; set; }
    }

    public class data
    {
        public int id { get; set; }
        public Double amount { get; set; }
        public DateTime created_at { get; set; }
        public string? processor_response { get; set; }
        public customer? customer { get; set; }
        public string? tx_ref { get; set; }
    }
    public class customer
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? phone_number { get; set; }
    }
}