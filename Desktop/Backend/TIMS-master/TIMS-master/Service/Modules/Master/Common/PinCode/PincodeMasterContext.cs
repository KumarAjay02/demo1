using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Modules.Master.Common.PinCode;

public partial class PincodeMasterContext : DbContext
{
    public PincodeMasterContext()
    {
    }

    public PincodeMasterContext(DbContextOptions<PincodeMasterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PincodeMaster> PincodeMasters { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    => optionsBuilder.UseSqlServer("Name=ConnectionStrings:TIMSConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PincodeMaster>(entity =>
        {
            entity.HasKey(e => e.PinCode);

            entity.ToTable("PincodeMaster");

            entity.Property(e => e.PinCode).HasColumnType("decimal(6, 0)");
            entity.Property(e => e.AreaName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CityCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CodService)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("CodService");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CreatedBy");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.DeliveryBranchCode)
                .HasMaxLength(4)
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
            entity.Property(e => e.NoEntry1From).HasColumnName("NoEntry1From");
            entity.Property(e => e.NoEntry1To).HasColumnName("NoEntry1To");
            entity.Property(e => e.NoEntry2From).HasColumnName("NoEntry2From");
            entity.Property(e => e.NoEntry2To).HasColumnName("NoEntry2To");
            entity.Property(e => e.OdaLocation)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("OdalLocation");
            entity.Property(e => e.PickupBranchCode)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.SerialNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("SerialNo");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
