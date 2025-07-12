 
 
using Backend.Models.Entities;
using Backend.Modules.Master.Account.AccountNature;
using Backend.Modules.Master.Account.AccountSchedule;
using Backend.Modules.Master.Account.CostCodeType;
using Backend.Modules.Master.Common.State;
using Backend.Modules.Master.Country;
using Backend.Modules.Master.Operation.BookingBasis;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Contexts;

public partial class TmsContext : DbContext
{
    

    public TmsContext(DbContextOptions<TmsContext> options)
        : base(options)
    {
    }
    public virtual DbSet<Fin_Gl_Account_Nature> Fin_Gl_Account_Nature { get; set; }
    public virtual DbSet<Fin_Gl_Account_Schedules> Fin_Gl_Account_Schedules { get; set; }
    public virtual DbSet<fin_cost_code_type> fin_cost_code_type { get; set; }

    public virtual DbSet<CityMaster> CityMasters { get; set; }

    public virtual DbSet<CountryMaster> CountryMasters{ get; set; }

    public virtual DbSet<StateMaster> StateMasters { get; set; }
    public virtual DbSet<PackingMaster> PackingMasters { get; set; }

   public virtual DbSet<BookingBasisModeModel> BookingBasisModeModels{ get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CityMaster>(entity =>
        {
            entity.HasKey(e => e.CityCode);

            entity.ToTable("CityMaster");

            entity.Property(e => e.CityCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Category)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CityName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CountryCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CreatedBy");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.DomInt)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("DomInt");
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.IsActive)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ModifiedBy");
            entity.Property(e => e.ModifiedOn)
                .HasColumnType("datetime")
                .HasColumnName("ModifiedOn");
            entity.Property(e => e.PinCode).HasColumnType("decimal(6, 0)");
            entity.Property(e => e.SerialNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("SerialNo");
            entity.Property(e => e.StateCode)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.StdCode)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("StdCode");
            entity.Property(e => e.Zone)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.CountryMaster)
         .WithMany()
         .HasForeignKey(d => d.CountryCode)
         .OnDelete(DeleteBehavior.ClientSetNull)
         .HasConstraintName("FK_CityMaster_Country_Master");

            entity.HasOne(d => d.StateMaster)
                .WithMany(p => p.CityMasters)
                .HasForeignKey(d => d.StateCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CityMaster_State_Master");


        });

        modelBuilder.Entity<CountryMaster>(entity =>
        {
            entity.HasKey(e => e.CountryCode);

            entity.ToTable("Country_Master");

            entity.Property(e => e.CountryCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Capital)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Continent)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CountryName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CreatedBy");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.Currency)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.IsActive)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ModifiedBy");
            entity.Property(e => e.ModifiedOn)
                .HasColumnType("datetime")
                .HasColumnName("ModifiedOn");
            entity.Property(e => e.SerialNo)
                .ValueGeneratedOnAdd()
 
                .HasColumnName("SerialNo");
 
        });

        modelBuilder.Entity<StateMaster>(entity =>
        {
            entity.HasKey(e => e.StateCode);

            entity.ToTable("StateMaster");

            entity.Property(e => e.StateCode)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Capital)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CountryCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CreatedBy");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.EwayBillGenStates)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("EWayBillGenStates");
            entity.Property(e => e.GstinnoAvailable)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("GstinNoAvailable");
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.IsActive)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.ModifiedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ModifiedBy");
            entity.Property(e => e.ModifiedOn)
                .HasColumnType("datetime")
                .HasColumnName("ModifiedOn");
            entity.Property(e => e.SerialNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("SerialNo");
            entity.Property(e => e.SmeWayBillPassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("SmeWayBillPassword");
            entity.Property(e => e.SmeWayBillUserId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("SmeWayBillUserID");
            entity.Property(e => e.Smgstin)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("SmGstin");
            entity.Property(e => e.StateName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.StateNo)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Zone)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.CountryMaster).WithMany(p => p.StateMasters)
                .HasForeignKey(d => d.CountryCode)
                .HasConstraintName("FK_StateMaster_Country_Master")
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
