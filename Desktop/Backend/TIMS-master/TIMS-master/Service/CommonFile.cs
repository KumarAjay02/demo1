using System.Security.Cryptography;
using System.Text;

namespace Backend
{
    public class CommonFile
    {
        public static string loginpwdkey = "RahulAarushSarit";
        public static string EncryptString(string plainText, string key)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = new byte[16]; // Initialization Vector (set to zero for simplicity)

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                        cryptoStream.Write(plainBytes, 0, plainBytes.Length);
                        cryptoStream.FlushFinalBlock();
                    }
                    return Convert.ToBase64String(memoryStream.ToArray());
                }
            }
        }

        public static string DecryptString(string encryptedText, string key)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = new byte[16]; // Must match the IV used for encryption

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, aes.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        byte[] encryptedBytes = Convert.FromBase64String(encryptedText);
                        cryptoStream.Write(encryptedBytes, 0, encryptedBytes.Length);
                        cryptoStream.FlushFinalBlock();
                    }
                    return Encoding.UTF8.GetString(memoryStream.ToArray());
                }
            }
        }
    }
}
