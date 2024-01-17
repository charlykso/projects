using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Collectives
{
    public class GetPublicId
    {

        //getting the publicId of the file
        public static string getPublicId(string imageUrl)
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


        //delete image using the publicId
        public bool deleteFile(string publicId, Cloudinary _cloudinary)
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
