using Backend.Modules.Master.Common.Branch;
using Backend.Modules.Master.Common.Company;
using Backend.Modules.Master.Common.CompanyDivision;
using Microsoft.EntityFrameworkCore;

namespace Backend.Modules.Master.Operation.RouteMaster;

public partial class Tims2Context : DbContext
{
    

    public Tims2Context(DbContextOptions<Tims2Context> options)
        : base(options)
    {
    }

    public virtual DbSet<OprRouteHeader> OprRouteHeader { get; set; }

    public virtual DbSet<OprRouteLine> OprRouteLine { get; set; }
    public virtual DbSet<CompanyMaster> CompanyMaster { get; set; }
    public virtual DbSet<CompDivision> CompDivisions { get; set; }
    public virtual DbSet<BranchMaster> BranchMasters { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OprRouteHeader>(entity =>
        {
            entity.HasKey(e => e.RouteNo).HasName("pk_opr_route_header");

            entity.ToTable("OPR_Route_Header");

            entity.Property(e => e.RouteNo)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.ActiveStatus)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.CoCode)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.DestHub)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.DivCode)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.OriginHub)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.PositionVehicle)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RouteName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RouteType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TotalKm).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.ViaLoc)
                .HasMaxLength(10)
                .IsUnicode(false);
            

        });

        modelBuilder.Entity<OprRouteLine>(entity =>
        {
            entity.HasKey(e => new { e.RouteNo, e.RouteBranch })
                  .HasName("pk_opr_route_lines");

            entity.ToTable("OPR_Route_Lines");

            entity.Property(e => e.RouteNo).IsUnicode(false);
            entity.Property(e => e.RouteBranch).IsUnicode(false);
            entity.Property(e => e.ActiveStatus).IsUnicode(false);
            entity.Property(e => e.Transistan).IsUnicode(false);
            entity.Property(e => e.CreatedBy).IsUnicode(false);
            entity.Property(e => e.ModifiedBy).IsUnicode(false);

            entity.HasOne(d => d.RouteHeader)
                .WithMany(p => p.RouteLine)
                .HasForeignKey(d => d.RouteNo)
                .HasConstraintName("fk_opr_route_lines_header");
        });

        OnModelCreatingPartial(modelBuilder);
    }



    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
