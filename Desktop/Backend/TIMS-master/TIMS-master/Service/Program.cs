using Backend.Controllers;
using Backend.Data;
using Backend.Data.Contexts;
using Backend.Modules.Master.Common.CompanyDivision;
using Backend.Modules.Master.Common.PinCode;
using Backend.Modules.Master.Operation.Customer;
using Backend.Modules.Master.Operation.RouteMaster;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
            builder.Services.AddEndpointsApiExplorer();
 
           // builder.Services.AddSwaggerGen();
          
 
            
              builder.Services.AddDbContext<TmsContext>(options =>
 
        options.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));
            builder.Services.AddDbContext<TimsContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));
            builder.Services.AddDbContext<Comp_DivisionContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));
            builder.Services.AddDbContext<PincodeMasterContext>(options =>
          options.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));
            builder.Services.AddDbContext<CustomerDbContext>(options =>

            options.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));
            builder.Services.AddDbContext<Tims2Context>(opt =>
            opt.UseSqlServer(builder.Configuration.GetConnectionString("TIMSConnection")));

            builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
            builder.Services.AddHostedService<KeyRotationService>();
           
            builder.Services.AddAutoMapper(typeof(Startup)); // Ensure AutoMapper is installed via NuGet  
 
            builder.Services.AddAutoMapper(typeof(CustomerMappingProfile));
            builder.Services.AddAutoMapper(typeof(MappingProfile));

            //builder.Services.AddScoped<ICustomerService, CustomerService>();
 
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Backend API",
                    Version = "v1"
                });

                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Enter 'Bearer' followed by your token in the input below.Example: Bearer your-token-here"
                });

                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
            });
           

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policy =>
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
            });

            //enable when production
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowFrontendApps", policy =>
            //        policy.WithOrigins("http://testangularapi.suntekaxpress.in", "http://localhost:4200")
            //              .AllowAnyHeader()
            //              .AllowAnyMethod());
            //});

            // Configure Authentication using JWT Bearer tokens
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true, // Ensure the token was issued by a trusted issuer
                    ValidIssuer = builder.Configuration["Jwt:Issuer"], // The expected issuer value from configuration
                    ValidateAudience = false, // Disable audience validation (can be enabled as needed)
                    ValidateLifetime = true, // Ensure the token has not expired
                    ValidateIssuerSigningKey = true, // Ensure the token's signing key is valid
                    // Define a custom IssuerSigningKeyResolver to dynamically retrieve signing keys from the JWKS endpoint
                    IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                    {
                        var httpClient = new HttpClient();
                        // Synchronously fetch the JWKS (JSON Web Key Set) from the specified URL
                        var jwks = httpClient.GetStringAsync($"{builder.Configuration["Jwt:Issuer"]}/.well-known/jwks.json").Result;
                        // Parse the fetched JWKS into a JsonWebKeySet object
                        var keys = new JsonWebKeySet(jwks);
                        // Return the collection of JsonWebKey objects for token validation
                        return keys.Keys;
                    }
                };
            });
            var app = builder.Build();
            // Enable Swagger middleware only in the development environment for API documentation and testing
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(); // Generates the Swagger JSON document
                app.UseSwaggerUI(); // Enables the Swagger UI for interactive API exploration
            }
            app.UseCors("AllowAllOrigins");//comment on production
            //app.UseCors("AllowFrontendApps");//allow on production
            app.UseRouting();
            // Enforce HTTPS redirection to ensure secure communication
            app.UseHttpsRedirection();
            // Enable Authentication middleware to process and validate incoming JWT tokens
            app.UseAuthentication();
            // Enable Authorization middleware to enforce access policies based on user roles and claims
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}