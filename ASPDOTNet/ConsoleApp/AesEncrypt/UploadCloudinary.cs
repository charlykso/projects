using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;

namespace AesEncrypt
{
    public class UploadCloudinary
    {


        private readonly Cloudinary _cloudinary;

        public UploadCloudinary()
        {
            var account = new Account(
                "dipxdfu0l",
                "986214356956912",
                "lmln6Y1cp6AIRxb2wM4ylsFSBd4"
            );

            _cloudinary = new Cloudinary(account);
        }

        public string UploadImage(string imagePath)
        {

            // var uploadParams = new ImageUploadParams()
            // {
            //     File = new FileDescription(imagePath), // Replace with the path to your image
            //     Folder = "Easyread/local/bookCover"
            // };

            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(imagePath),
                Folder = "Easyread/local/book"
            };

            var uploadResult = _cloudinary.Upload(uploadParams);
            Console.WriteLine(uploadResult.PublicId);
            // You can return the uploaded image URL
            return uploadResult.SecureUrl.ToString();

        }

        public string getPublicId(string imageUrl)
        {
            try
            {
                Uri uri = new Uri(imageUrl);
                string[] segments = uri.Segments;
                // The publicId is usually the last part of the URL without the file extension
                string publicId = segments[segments.Length - 1].Split('.')[0];
                return publicId;
            }
            catch (Exception ex)
            {
                // Handle any exceptions (e.g., invalid URL)
                Console.WriteLine($"Error extracting publicId: {ex.Message}");
                return null!;
            }
        }

        public bool deleteFile(string publicId)
        {
            try
            {
                var deleteParams = new DeletionParams(publicId);

                var deletionResult = _cloudinary.Destroy(deleteParams);

                return deletionResult.Result == "ok";
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }


    }
}