using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add CORS policy to allow specific origin  
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp", builder =>
                {
                    builder.WithOrigins("http://testangular.suntekaxpress.in")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            // Add controllers (for Web API)  
            services.AddControllers();
            services.AddAutoMapper(typeof(MappingProfile));

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable CORS globally  
            app.UseCors("AllowAngularApp");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
           
}
