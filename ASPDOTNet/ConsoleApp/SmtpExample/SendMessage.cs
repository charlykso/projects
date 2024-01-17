using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SmtpExample
{
    public class SendMessage
    {
        public static string sendMessage()
        {
            // SMTP server details
            string smtpServer = "m03.internetmailserver.net";
            int smtpPort = 587; // Use the appropriate port for your server
            string smtpUsername = "admin@easyreadlib.com";
            string smtpPassword = "oqgwd8q6wd23972##";

            // Sender's email address
            string fromEmail = "admin@easyreadlib.com";

            // Recipient's email address
            string toEmail = "charlykso141@gmail.com";
            try
            {
                using (SmtpClient smtpClient = new SmtpClient(smtpServer))
                {
                    smtpClient.Port = smtpPort;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true; // Enable SSL if your server requires it

                    using (MailMessage mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress(fromEmail);
                        mailMessage.To.Add(toEmail);
                        mailMessage.Subject = "Test Email";
                        mailMessage.Body = "This is a test email sent from .NET Core.";

                        smtpClient.Send(mailMessage);
                        return "Email sent successfully.";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        public static string TestMessage()
        {
            // SMTP server details
            string smtpServer = "smtp.gmail.com";
            int smtpPort = 587; // Use the appropriate port for your server
            string smtpUsername = "eventify141@gmail.com";
            string smtpPassword = "hyfxczxwsalvseej";

            // Sender's email address
            string fromEmail = "eventify141@gmail.com";

            // Recipient's email address
            string toEmail = "charlykso141@gmail.com";
            try
            {
                using (SmtpClient smtpClient = new SmtpClient(smtpServer))
                {
                    smtpClient.Port = smtpPort;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true; // Enable SSL if your server requires it

                    using (MailMessage mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress(fromEmail);
                        mailMessage.To.Add(toEmail);
                        mailMessage.Subject = "Test Email";
                        mailMessage.Body = "This is a test email sent from .NET Core.";

                        smtpClient.Send(mailMessage);
                        return "Email sent successfully.";
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
    }
}