using Backend.Data;
using Backend.Data.Contexts;
using Backend.Features.Login;
using Backend.models;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
      
        private readonly IConfiguration _configuration;
        //private readonly ApplicationDbContext _context;
        private readonly TimsContext logisticsContext;

        public AuthController(IConfiguration configuration,TimsContext logisticsContext)
        {
            _configuration = configuration;
            this.logisticsContext = logisticsContext;
        }
     
      
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateDTO loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await logisticsContext.MstUsers
                .FirstOrDefaultAsync(u => u.Login.ToLower() == loginDto.username.ToLower());

            if (user == null)
            {
                await createLogAsync(loginDto.username, loginDto.password, "N", "test", "test");
                return Unauthorized("Invalid credentials.");
            }
            String isPasswordValid = CommonFile.EncryptString(loginDto.password, CommonFile.loginpwdkey);
            String convpwd = CommonFile.DecryptString(user.Password, CommonFile.loginpwdkey);
            if (isPasswordValid != user.Password)
            {
                await createLogAsync(loginDto.username, loginDto.password, "N", "test","test");
                return Unauthorized("Invalid credentials.");
            }
            //await createLogAsync(loginDto.Login, loginDto.Password, "Y", loginDto.SystemName, loginDto.SystemIp);
            var token = GenerateJwtTokenLogin(user, "Client1");
            return Ok(new { id_token = token });
        }
        private async Task createLogAsync(string Usr,string pwd,string status,string sysname,string sysip)
        {
            TrnUserlog trn = new TrnUserlog();
            trn.User = Usr;
            trn.Password = pwd;
            trn.Logstatus = status;
            trn.SysIp = sysip;
            trn.SysName = sysname;
            logisticsContext.TrnUserlogs.Add(trn);
            await logisticsContext.SaveChangesAsync();
        }
        private string GenerateJwtTokenLogin(MstUser user,String clientUrl)
        {
            var signingKey = this.logisticsContext.SigningKeys.FirstOrDefault(k => k.IsActive);
            if (signingKey == null)
            {
                throw new Exception("No active signing key available.");
            }
            var privateKeyBytes = Convert.FromBase64String(signingKey.PrivateKey);
            var rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
            var rsaSecurityKey = new RsaSecurityKey(rsa)
            {
                KeyId = signingKey.KeyId
            };
            var creds = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.User),
                new Claim(ClaimTypes.NameIdentifier, user.Login),
                new Claim("login",user.Login),
                new Claim(ClaimTypes.Email, user.Email)
            };
            // Iterate through the user's roles and add each as a Role claim
            //foreach (var userRole in user.UserRoles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, userRole.Role.Name));
            //}
            // Define the JWT token's properties, including issuer, audience, claims, expiration, and signing credentials
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"], // The token issuer, typically your application's URL
                audience: clientUrl, // The intended recipient of the token, typically the client's URL
                claims: claims, // The list of claims to include in the token
                expires: DateTime.UtcNow.AddHours(1), // Token expiration time set to 1 hour from now
                signingCredentials: creds // The credentials used to sign the token
            );
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenDescriptor);
            return token;
        }
    }
}
