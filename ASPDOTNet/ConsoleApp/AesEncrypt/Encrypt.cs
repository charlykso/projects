using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AesEncrypt
{
    public class Encrypt
    {
        public static void encrypt(string filepath, string password)
        {
            ExpressEncription.AESEncription.AES_Encrypt(filepath, password);
        }

        public static void Decrypt(string filepath, string password)
        {
            ExpressEncription.AESEncription.AES_Decrypt(filepath, password);
        }
    }
}