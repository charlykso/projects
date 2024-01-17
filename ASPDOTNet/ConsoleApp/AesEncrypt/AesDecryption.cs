using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace AesEncrypt
{
    public class AesDecryption
    {
        public static void DecryptFile(string inputFile, string outputFile, string password)
        {
            try
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                using (FileStream fsInput = new FileStream(inputFile, FileMode.Open))
                {
                    byte[] salt = new byte[16];
                    fsInput.Read(salt, 0, salt.Length);

                    using (Aes aesAlg = Aes.Create())
                    {
                        aesAlg.KeySize = 256;
                        aesAlg.BlockSize = 128;
                        aesAlg.Padding = PaddingMode.PKCS7;

                        using (var keyDerivationFunction = new Rfc2898DeriveBytes(passwordBytes, salt, 10000))
                        {
                            aesAlg.Key = keyDerivationFunction.GetBytes(aesAlg.KeySize / 8);
                            aesAlg.IV = keyDerivationFunction.GetBytes(aesAlg.BlockSize / 8);
                        }

                        using (CryptoStream cryptoStream = new CryptoStream(fsInput, aesAlg.CreateDecryptor(), CryptoStreamMode.Read))
                        {
                            using (FileStream fsOutput = new FileStream(outputFile, FileMode.Create))
                            {
                                byte[] buffer = new byte[4096];
                                int bytesRead;

                                while ((bytesRead = cryptoStream.Read(buffer, 0, buffer.Length)) > 0)
                                {
                                    fsOutput.Write(buffer, 0, bytesRead);
                                }
                            }
                        }
                    }
                }

                Console.WriteLine("File decrypted and saved as " + outputFile);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}