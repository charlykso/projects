using System;

namespace API.DataAccess
{
    public class InitiatePaymentModel
    {
        public Double Amount { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
        public int Book_Id { get; set; }
        public int User_Id { get; set; }
    }
    public class MakePaymentDetails{
        public string? tx_ref { get; set; }
        public Double amount { get; set; }
        public string? name { get; set; }
        public string? redirect_url { get; set; }
        public string? currency { get; set; }
        public Customer? customer { get; set; }
        public Customizations? customizations { get; set; }
    }

    public class Customer{
        public string? email { get; set; }
        public string? name { get; set; }
        public string? phone_number { get; set; }
    }


    public class Customizations{
        public string? title { get; set; }
        public string? description { get; set; }
        public string? logo { get; set; }
    }

    public class JsonResponse{
        public string? status { get; set; }
        public string? Message { get; set; }
        public Data? data { get; set; }
    }

    public class Data{
        public string? link { get; set; }
    }

    public class AfterPayment{
        public string? status { get; set; }
        public string? tx_ref { get; set; }
        public string? transaction_id { get; set; }
    }
}
