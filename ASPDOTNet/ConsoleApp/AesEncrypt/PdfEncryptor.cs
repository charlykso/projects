using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography;

namespace AesEncrypt
{
    public class PdfEncryptor
    {
        private static readonly Aes _aes = Aes.Create();

        public static byte[] EncryptPdf(byte[] pdfBytes, string password)
        {
            _aes.Key = DeriveKey(password);
            _aes.IV = new byte[16];

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream, _aes.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cryptoStream.Write(pdfBytes, 0, pdfBytes.Length);
                }

                return memoryStream.ToArray();
            }
        }

        private static byte[] DeriveKey(string password)
        {
            using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, new byte[16], 10000))
            {
                return rfc2898DeriveBytes.GetBytes(32);
            }
        }
    }
}