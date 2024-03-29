using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace API.Collectives
{
    public class EncryptPDF
    {
        // public static void Encrypt(string filepath, string password)
        // {
        //     ExpressEncription.AESEncription.AES_Encrypt(filepath, password);
        // }

        public static void EncryptFile(string inputFile, string outputFile, string password)
        {
            byte[] salt = GenerateRandomSalt();
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            using (var aesAlg = Aes.Create())
            {
                aesAlg.KeySize = 256;
                aesAlg.BlockSize = 128;
                aesAlg.Padding = PaddingMode.PKCS7;

                using (var keyDerivationFunction = new Rfc2898DeriveBytes(passwordBytes, salt, 10000))
                {
                    aesAlg.Key = keyDerivationFunction.GetBytes(aesAlg.KeySize / 8);
                    aesAlg.IV = keyDerivationFunction.GetBytes(aesAlg.BlockSize / 8);
                }

                using (FileStream fsOutput = new FileStream(outputFile, FileMode.Create))
                {
                    fsOutput.Write(salt, 0, salt.Length);

                    using (CryptoStream cryptoStream = new CryptoStream(fsOutput, aesAlg.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        using (FileStream fsInput = new FileStream(inputFile, FileMode.Open))
                        {
                            byte[] buffer = new byte[4096];
                            int bytesRead;

                            while ((bytesRead = fsInput.Read(buffer, 0, buffer.Length)) > 0)
                            {
                                cryptoStream.Write(buffer, 0, bytesRead);
                            }
                        }
                    }
                }
            }
        }

        private static byte[] GenerateRandomSalt()
        {
            byte[] salt = new byte[16];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        // public static void  Decrypt(string filepath, string password)
        // {
        //     ExpressEncription.AESEncription.AES_Decrypt(filepath, password);
        // }

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
