using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Modules.Master.Common.CompanyDivision;

public partial class Comp_DivisionContext : DbContext
{
    public Comp_DivisionContext()
    {
    }
    public Comp_DivisionContext(DbContextOptions<Comp_DivisionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CompDivision> CompDivisions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:TIMSConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CompDivision>(entity =>
        {
            entity.HasKey(e => e.DivCode).HasName("PK_companyDivision_Master");

            entity.ToTable("Comp_Division");

            entity.Property(e => e.DivCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("DivCode");
            entity.Property(e => e.Address1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CoCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("CoCode");
            entity.Property(e => e.DivName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("DivName");
            entity.Property(e => e.Gstn)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("Gstn");
            entity.Property(e => e.Pan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Pan");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
