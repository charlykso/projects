using System;

namespace API.DataAccess
{
    public class Payment_Model
    {
        public int user_Id { get; set; }
        public int book_Id { get; set; }
        public int transaction_id { get; set; }
        public string? email { get; set; }
        public string? status { get; set; }
        public string? tx_ref { get; set; }
    }
}
