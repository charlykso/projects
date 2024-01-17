using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTextSharp.text;
using System.IO;
using iTextSharp.text.pdf;
using System.Security.Cryptography;
using System.Text;

namespace AesEncrypt
{
    public class LastEncryption
    {
        public static void EncryptFile(string inputPdfPath, string outputPdfPath, string password)
        {
            // Set your fixed Key and IV
            string key = password;
            string iv = password;

            // Input and output file paths
            string inputFile = inputPdfPath;
            string outputFile = outputPdfPath;

            try
            {
                // Read the PDF file
                using (FileStream inputStream = new FileStream(inputFile, FileMode.Open, FileAccess.Read))
                {
                    // Create a memory stream to write the output PDF
                    using (MemoryStream outputStream = new MemoryStream())
                    {
                        // Create a PDF reader and a PDF stamper
                        PdfReader reader = new PdfReader(inputStream);
                        PdfStamper stamper = new PdfStamper(reader, outputStream);

                        // Set the encryption parameters
                        stamper.SetEncryption(
                            Encoding.ASCII.GetBytes(key),
                            Encoding.ASCII.GetBytes(iv),
                            PdfWriter.ALLOW_PRINTING, // Permissions
                            PdfWriter.ENCRYPTION_AES_128 // Encryption Algorithm
                        );

                        // Close the stamper (this will save the encrypted PDF to the memory stream)
                        stamper.Close();

                        // Write the encrypted PDF to a file
                        File.WriteAllBytes(outputFile, outputStream.ToArray());
                    }
                }

                Console.WriteLine("PDF encryption completed.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }
        }
    }
}
