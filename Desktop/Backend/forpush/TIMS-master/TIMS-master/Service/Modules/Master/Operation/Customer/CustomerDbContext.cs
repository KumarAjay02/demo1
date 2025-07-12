using Microsoft.EntityFrameworkCore;

namespace Backend.Modules.Master.Operation.Customer
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerDet> CustomerDets { get; set; }
        public DbSet<CustomerDet2> CustomerDet2s { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Customer primary key
            modelBuilder.Entity<Customer>(entity => {
                entity.HasKey(c => new { c.CoCode, c.DivCode, c.CustomerCode });
                entity.ToTable("Customer");
                   }
            );

            
            modelBuilder.Entity<CustomerDet>(entity =>
            {
                entity.ToTable("Customer_Det");
                entity.HasKey(cd => new { cd.CoCode, cd.DivCode, cd.Branch, cd.CustomerCode, cd.CustomerDetCode });
                entity.HasOne(cd => cd.Customer)
                .WithMany(c => c.CustomerDets)
                .HasForeignKey(cd => new { cd.CoCode, cd.DivCode, cd.CustomerCode }); ;
            });

            
            modelBuilder.Entity<CustomerDet2>(entity =>
            {
                entity.ToTable("Customer_Det2");
                entity.HasKey(cd2 => new { cd2.CoCode, cd2.DivCode, cd2.Branch, cd2.CustomerCode, cd2.CustomerDetCode, cd2.PlantCode });
                entity.HasOne(cd2 => cd2.CustomerDet)
                .WithMany(cd => cd.CustomerDet2s)
                .HasForeignKey(cd2 => new { cd2.CoCode, cd2.DivCode, cd2.Branch, cd2.CustomerCode, cd2.CustomerDetCode });
            });
        }
    }
}