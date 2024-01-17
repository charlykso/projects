using System;
using System.Text;
using System.Net.Http.Headers;
using API.Collectives;
using API.DataAccess;
using API.Models;
using API.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IBook_User? _IBkUs;
        private readonly IHttpClientFactory _ClientFactory;
        private readonly IConfiguration _IConfig;
        public PaymentController(IBook_User IBkUs, IHttpClientFactory clientFactory, IConfiguration IConfig)
        {
            _IBkUs = IBkUs;
            _IConfig = IConfig;
            _ClientFactory = clientFactory;
        }

        //api/payment/getallpayments
        [HttpGet("getallpayments")]
        public async Task<ActionResult> GetAllPayments()
        {
            try
            {
                var payments = await _IBkUs!.GetAllPayments();
                if (payments != null)
                {
                    return Ok(payments);
                }
                return Ok("No payment made yet.");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        //api/payment/initiate
        [HttpPost("initiate")]
        public async Task<ActionResult> initiate([FromForm] InitiatePaymentModel initiatePay)
        {
            try
            {

                Random random = new Random();
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < 10; i++)
                {
                    sb.Append(chars[random.Next(chars.Length)]);
                }
                string tx_ref = "EasyReader-" + sb.ToString();
                string curency = "NGN";
                string bookIdUserId = initiatePay.Book_Id.ToString() + "_" + initiatePay.User_Id.ToString();
                var base_url = _IConfig["Base_URL:URL"] + "/api";
                // var base_url = _IConfig["Base_URL:TEST"];
                string redirect_url = base_url + "/payment/verify";
                Customer customer = new Customer();
                customer.email = initiatePay.Email;
                customer.phone_number = initiatePay.PhoneNo;
                customer.name = bookIdUserId;
                Customizations customizations = new Customizations();
                customizations.title = "Easyread";
                customizations.description = "Pay for your law book";
                customizations.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGWVZpu9PtzJpoTnu7rGJ3x0Z-DUrsN5EXA&usqp=CAU";

                MakePaymentDetails jsonPayload = new MakePaymentDetails();
                jsonPayload.amount = initiatePay.Amount;
                jsonPayload.tx_ref = tx_ref;
                jsonPayload.redirect_url = redirect_url;
                jsonPayload.currency = curency;
                jsonPayload.customer = customer;
                jsonPayload.customizations = customizations;

                // Convert the payload to JSON string
                var jsonPayloadString = JsonConvert.SerializeObject(jsonPayload);

                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.flutterwave.com/v3/payments");

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayloadString, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _IConfig["FW_Payment:Secret_key"]);

                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                //check if the respond status is successful
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    //convert the respond to string
                    var apiString = await response.Content.ReadAsStringAsync();

                    var paymentRes = JsonConvert.DeserializeObject<JsonResponse>(apiString);
                    Console.WriteLine(paymentRes);
                    if (paymentRes!.status == "success")
                    {
                        return Ok(new
                        {
                            link = paymentRes.data!.link
                        });
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        //api/payment/getpayment/{id}
        [HttpGet("getpayment/{Id}")]
        public async Task<ActionResult> GetPayment(int Id)
        {
            try
            {
                var payment = await _IBkUs!.GetSinglePayment(Id);
                if (payment != null)
                {
                    return Ok(payment);
                }
                return Ok($"No payment with the id {Id}");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        //api/payment/verify
        [HttpGet("verify")]
        public async Task<IActionResult> verify()
        {
            try
            {
                Console.WriteLine(Request.Query);
                var newpayment = new Payment_Model();
                newpayment.status = Request.Query["status"];
                newpayment.tx_ref = Request.Query["tx_ref"];
                if (int.TryParse(Request.Query["transaction_id"], out int parsedValue))
                {
                    newpayment.transaction_id = parsedValue;
                }
                // newpayment.transaction_id = int.Parse(Request.Query["transaction_id"]);
                // var token = "FLWSECK_TEST-1e6ad0f6f2577a9db03c1deaabd86937-X";
                //this is the uri
                var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.flutterwave.com/v3/transactions/{newpayment.transaction_id}/verify");
                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();
                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _IConfig["FW_Payment:Secret_key"]);
                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                //check if the respond status is successful
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    //convert the respond to string
                    var apiString = await response.Content.ReadAsStringAsync();
                    //deserialize it to json object
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetails>(apiString);
                    string bookIdUserId = paymentRes!.data!.customer!.name!;
                    string[] part1 = bookIdUserId.Split(' ');
                    string[] parts = part1[0].Split('_');
                    newpayment.book_Id = int.Parse(parts[0]);
                    newpayment.user_Id = int.Parse(parts[1]);
                    if (paymentRes!.status == "success")
                    {

                        var payment = new Models.Book_User();
                        payment.UserId = newpayment.user_Id;
                        payment.BookId = newpayment.book_Id;
                        payment.Transaction_Id = paymentRes!.data!.id;
                        payment.Payment_made_at = paymentRes!.data!.created_at;
                        payment.Amount = paymentRes!.data!.amount;
                        payment.Payment_Status = paymentRes!.data!.processor_response;
                        payment.tx_ref = paymentRes.data.tx_ref;
                        payment.Updated_at = DateTime.Now;

                        var res = await _IBkUs!.CreatePayment(payment);
                        if (res == "success")
                        {
                            return Ok("Payment made successfully!");
                        }
                        return BadRequest("Payment Failed");

                    }
                    return BadRequest("Unautorized");

                }
                return BadRequest(response.StatusCode);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //api/payment/updatepayment/{id}
        [HttpPut("UpdatePayment/{Id}")]
        public async Task<ActionResult> UpdatePayment(int Id, [FromForm] Book_UserModel editPayment)
        {
            try
            {
                var payment = await _IBkUs!.GetSinglePayment(Id);
                if (payment != null)
                {
                    payment.UserId = editPayment.UserId;
                    payment.BookId = editPayment.BookId;
                    payment.Transaction_Id = editPayment.Transaction_Id;
                    payment.Payment_Status = editPayment.Payment_Status;
                    payment.Updated_at = DateTime.Now;

                    var res = await _IBkUs!.UpdatePayment(Id, payment);
                    if (res == "success")
                    {
                        return Ok("Payment updated successfuly!");
                    }
                    return BadRequest("sorry the payment could not be updated");
                }
                return BadRequest("Sorry payment not found");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        //api/payment/deletepayment/{id}
        [HttpDelete("deletepayment/{Id}")]
        public async Task<ActionResult> DeletePayment(int Id)
        {
            try
            {
                var payment = await _IBkUs!.GetSinglePayment(Id);
                if (payment != null)
                {
                    var res = await _IBkUs!.DeletePayment(Id);
                    if (res == "success")
                    {
                        return Ok("Payment deleted successfuly!");
                    }
                    return BadRequest("Payment not deleted!");
                }
                return Ok($"No payment with the id {Id}");
            }
            catch (System.Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}