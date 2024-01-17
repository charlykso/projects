using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AesEncrypt
{
    public class AesEncryption
    {
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
    }

}