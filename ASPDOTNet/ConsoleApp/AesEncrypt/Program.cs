// See https://aka.ms/new-console-template for more information
using AesEncrypt;
using CloudinaryDotNet;

Console.WriteLine("Hello, World!");
// string text = "Hello World";
// string key = "abcdefghijklmnop";
// Encrypt.encrypt("book/hello.txt", key);
// Encrypt.Decrypt("book/hello.txt.aes", key);

// AesEncryption.EncryptFile("book/Company_Law_inner.pdf", "book/Company_Law_inner.pdf", key);

// AesDecryption.DecryptFile("book/company_lay_inner.pdf", "book/decrypt/company_law_inner_decrpted.pdf", key);

//NewEncrypt
// NewEncryption.EncryptFile("book/newDecrypt/Aspirant_draft_2nd_edition.pdf", "book/newEncrypt/aspirant_draft_encrypted.pdf", key);

// NewEncryption.DecryptFile("book/newDecrypt/Aspirant_draft_2nd_edition.pdf", "book/newEncrypt/aspirant_draft_encrypted.pdf", key);





// Get the PDF bytes.
// var pdfBytes = File.ReadAllBytes("book/Aspirant Draft 2nd edition.pdf");

// Encrypt the PDF file.
// var encryptedPdfBytes = PdfEncryptor.EncryptPdf(pdfBytes, "abcdefgh");

// Save the encrypted PDF file.
// File.WriteAllBytes("book/newEncrypt/aspirant_draft_2nd_edition.pdf", encryptedPdfBytes);



//Bard encryption
// BardEncryption.EncryptPdf("book/Aspirant Draft 2nd edition.pdf", "book/iTextEnc/aspirant_draft_2nd_edition", key);


//ITextSharp
// LastEncryption.EncryptFile("book/decrypt/company_law_inner_decrpted.pdf", "book/iTextEnc/company_law_inner_encrypted.pdf", key);


// string encryptedFilePath = "book/Miracle/constin.pdf.aes"; // Replace with the path to your encrypted file
// string decryptedFilePath = "book/Miracle/dec/constin.pdf"; // Replace with the desired path for the decrypted file

// byte[] encryptedData = File.ReadAllBytes(encryptedFilePath);
// byte[] decryptedData = AESDecryptor.Decrypt(encryptedData);

// File.WriteAllBytes(decryptedFilePath, decryptedData);

// Console.WriteLine("File decrypted successfully.");


//cloudinary

UploadCloudinary upload = new UploadCloudinary();
var result = upload.UploadImage("./book/Commercial Law Inner");

Console.WriteLine(result);

// var pbId = upload.getPublicId("https://res.cloudinary.com/dipxdfu0l/image/upload/v1695493658/Easyread/localBookCover/bnmtuuor79iokhcmrcuw.jpg");
// Console.WriteLine(pbId);

// Console.WriteLine(upload.deleteFile("Easyread/localBookCover/" + pbId));