using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PdfSharp.Pdf;
using PdfSharp.Drawing;
using PdfSharp.Pdf.Security;
using PdfSharp.Pdf.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace AesEncrypt
{
    public class BardEncryption
    {
        public static void EncryptPdf(string inputPdfPath, string outputPdfPath, string password)
        {
            // Create a reader for the existing PDF document.
            using (iTextSharp.text.pdf.PdfReader reader = new iTextSharp.text.pdf.PdfReader(inputPdfPath))
            {
                // Create a new PDF document with encryption.
                using (FileStream fs = new FileStream(outputPdfPath, FileMode.Create))
                {
                    using (Document document = new Document())
                    {
                        PdfCopy writer = new PdfCopy(document, fs);
                        writer.SetEncryption(PdfWriter.STRENGTH128BITS, password, null, PdfWriter.AllowPrinting);

                        document.Open();

                        // Add the pages from the existing PDF to the new PDF.
                        for (int i = 1; i <= reader.NumberOfPages; i++)
                        {
                            PdfImportedPage page = writer.GetImportedPage(reader, i);
                            writer.AddPage(page);
                        }

                        document.Close();
                    }
                }
            }
        }

    // Example usage:
    // EncryptPdf("input.pdf", "output.pdf", "your_password_here");


}
}