using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AesEncrypt
{
    public class NewEncryption
    {
        public static void EncryptFile(string InputFile, string OutputFile, string Password)
        {
            var m_strPassPhrase = Password;
            var p_strSaltValue = "XXXXXXXXXXXXXXXXX";
            var m_strPasswordIterations = 2;
            var m_strInitVector = "ZZZZZZZZZZZZZZZZ";
            var blockSize = 128; // AES block size

            // Input and output file paths
            var inputFile = InputFile; // Change to the path of your input file
            var outputFile = OutputFile; // Change to the path where you want to save the encrypted file

            try
            {
                // Read the plaintext from the input file
                var plainTextBytes = File.ReadAllBytes(inputFile);

                var saltValueBytes = Encoding.ASCII.GetBytes(p_strSaltValue);
                var password = new Rfc2898DeriveBytes(m_strPassPhrase, saltValueBytes, m_strPasswordIterations);
                var keyBytes = password.GetBytes(blockSize / 8); // Divide by 8 to convert bits to bytes

                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = keyBytes;
                    aesAlg.IV = Encoding.ASCII.GetBytes(m_strInitVector);

                    using (var memoryStream = new MemoryStream())
                    {
                        using (var cryptoStream = new CryptoStream(memoryStream, aesAlg.CreateEncryptor(), CryptoStreamMode.Write))
                        {
                            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                            cryptoStream.FlushFinalBlock();
                        }

                        // Write the encrypted data to the output file
                        File.WriteAllBytes(outputFile, memoryStream.ToArray());

                        Console.WriteLine("File encrypted successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

        public static void DecryptFile(string InputFile, string OutputFile, string Password)
        {
            var m_strPassPhrase = Password;
            var p_strSaltValue = "XXXXXXXXXXXXXXXXX";
            var m_strPasswordIterations = 2;
            var m_strInitVector = "ZZZZZZZZZZZZZZZZ";
            var blockSize = 128; // AES block size

            // Input and output file paths
            var inputFile = InputFile; // Change to the path of your encrypted file
            var outputFile = OutputFile; // Change to the path where you want to save the decrypted file

            try
            {
                // Read the encrypted data from the input file
                var encryptedBytes = File.ReadAllBytes(inputFile);

                var saltValueBytes = Encoding.ASCII.GetBytes(p_strSaltValue);
                var password = new Rfc2898DeriveBytes(m_strPassPhrase, saltValueBytes, m_strPasswordIterations);
                var keyBytes = password.GetBytes(blockSize / 8); // Divide by 8 to convert bits to bytes

                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = keyBytes;
                    aesAlg.IV = Encoding.ASCII.GetBytes(m_strInitVector);

                    using (var memoryStream = new MemoryStream(encryptedBytes))
                    {
                        using (var cryptoStream = new CryptoStream(memoryStream, aesAlg.CreateDecryptor(), CryptoStreamMode.Read))
                        {
                            using (var outputStream = new MemoryStream())
                            {
                                cryptoStream.CopyTo(outputStream);

                                // Write the decrypted data to the output file
                                File.WriteAllBytes(outputFile, outputStream.ToArray());

                                Console.WriteLine("File decrypted successfully.");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}