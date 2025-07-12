using Backend.models;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Backend.Modules.Master.Common.Company;
using Backend.Modules.Master.Common.Branch;
using Backend.Modules.Master.Admin.UserRights;
using Backend.Features.MenuList;
using Backend.Features.Login;

namespace Backend.Data.Contexts;

public partial class TimsContext : DbContext
{
    public TimsContext()
    {
    }

    public TimsContext(DbContextOptions<TimsContext> options)
        : base(options)
    {
    }
    public virtual DbSet<BranchMaster> BranchMasters { get; set; }

    public virtual DbSet<CompanyMaster> CompanyMasters { get; set; }

    public virtual DbSet<MstUser> MstUsers { get; set; }

    public virtual DbSet<TrnUserlog> TrnUserlogs { get; set; }


    public virtual DbSet<MstVehicle> MstVehicles { get; set; }
    public virtual DbSet<MstMenu> MstMenus { get; set; }
    public virtual DbSet<TrnUserright> TrnUserrights { get; set; }

    public DbSet<MstUserCompany> MstUserCompanies { get; set; }
    public DbSet<MstUserDivision> MstUserDivisions { get; set; }
    public DbSet<MstUserBranch> MstUserBranches { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:TIMSConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BranchMaster>(entity =>
        {
            entity.HasKey(e => e.BranchCode);

            entity.ToTable("Branch_Master");

            entity.Property(e => e.BranchCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("BranchCode");
            entity.Property(e => e.AreaOffice)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.BiometricInstalled)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("BiometricInstalled");
            entity.Property(e => e.BranchAddress)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("BranchAddress");
            entity.Property(e => e.BranchCity)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("BranchCity");
            entity.Property(e => e.BranchCountry)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("BranchCountry");
            entity.Property(e => e.BranchEmail)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BranchEMail");
            entity.Property(e => e.BranchFax)
                .HasColumnType("decimal(11, 0)")
                .HasColumnName("BranchFax");
            entity.Property(e => e.BranchMode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("BranchMode");
            entity.Property(e => e.BranchName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("BranchName");
            entity.Property(e => e.BranchPinCode)
                .HasColumnType("decimal(6, 0)")
                .HasColumnName("BranchPinCode");
            entity.Property(e => e.BranchState)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("BranchState");
            entity.Property(e => e.BranchType)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("BranchType");
            entity.Property(e => e.CctvInstalled)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("CctvInstalled");
            entity.Property(e => e.CoCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("CoCode");
            entity.Property(e => e.Companycode).HasColumnName("companycode");
            entity.Property(e => e.ContactPerson)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CreatedBy");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("datetime")
                .HasColumnName("CreatedOn");
            entity.Property(e => e.Crptemail)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CrptEmail");
            entity.Property(e => e.Da)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValue("D")
                .HasColumnName("Da");
            entity.Property(e => e.DivCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("DivCode");
            entity.Property(e => e.DocketStartingCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EWayBillPassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("EWayBillPassword");
            entity.Property(e => e.EWayBillUserId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("EWayBillUserID");
            entity.Property(e => e.Gstin)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("GSTIN");
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.IsActive)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.Loaisactive)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("LoaIsactive");
            entity.Property(e => e.MobileNo).HasColumnType("decimal(11, 0)");
            entity.Property(e => e.ModifiedBy)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("ModifiedBy");
            entity.Property(e => e.ModifiedOn)
                .HasColumnType("datetime")
                .HasColumnName("ModifiedOn");
            entity.Property(e => e.NetConnect)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("NetConnect");
            entity.Property(e => e.NetProvider)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("NetProvider");
            entity.Property(e => e.RegionalOffice)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ReportingmgrEmail)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("ReportingmgrEmail");
            entity.Property(e => e.SerialNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("SerialNo");
            entity.Property(e => e.ZonalOffice)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ZonalofficeDesc)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("ZonalofficeDesc");
            entity.Property(e => e.Zone)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.CoCodeNavigation).WithMany(p => p.BranchMasters)
                .HasForeignKey(d => d.CoCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Branch_Master_Company_Master_CCODE");
        });

        modelBuilder.Entity<CompanyMaster>(entity =>
        {
            entity.HasKey(e => e.CoCode).HasName("PK_company_Master");

            entity.ToTable("Company_Master");

            entity.Property(e => e.CoCode)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("CoCode");
            entity.Property(e => e.Address1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Address3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CityCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CoName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CoName");
            entity.Property(e => e.CountryCode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Gstn)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("Gstn");
            entity.Property(e => e.Pan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Pan");
            entity.Property(e => e.PinCode).HasColumnType("decimal(6, 0)");
            entity.Property(e => e.StateCode)
                .HasMaxLength(2)
                .IsUnicode(false);
        });
        modelBuilder.Entity<MstMenu>()
            .ToTable("mst_MENU")
            .HasKey(m => m.Id);

        modelBuilder.Entity<MstUser>()
            .ToTable("mst_USERS")
            .HasKey(u => u.Id);

        modelBuilder.Entity<MstUser>()
    .HasIndex(u => u.Login)
    .IsUnique();

        modelBuilder.Entity<TrnUserlog>(entity =>
        {
            entity
                .ToTable("trn_USERLOG");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(18, 0)")
                .HasColumnName("ID");
            entity.Property(e => e.Logintime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("smalldatetime")
                .HasColumnName("LOGINTIME");
            entity.Property(e => e.Logstatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("LOGSTATUS");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PASSWORD");
            entity.Property(e => e.SysIp)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("SYS_IP");
            entity.Property(e => e.SysName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("SYS_NAME");
            entity.Property(e => e.User)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("USER");
        });


        modelBuilder.Entity<MstVehicle>(entity =>
        {
            entity
                 .HasKey(e => e.Id);
            entity.ToTable("mst_VEHICLE");

            entity.Property(e => e.ChesisNo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("CHESIS_NO");
            entity.Property(e => e.EffDate).HasColumnName("eff_Date");
            entity.Property(e => e.EngineNo)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("ENGINE_NO");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID");
            entity.Property(e => e.Insertdate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("smalldatetime")
                .HasColumnName("INSERTDATE");
            entity.Property(e => e.Isactive)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValue("Y")
                .IsFixedLength()
                .HasColumnName("ISACTIVE");
            entity.Property(e => e.Model)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("MODEL");
            entity.Property(e => e.OwnerId).HasColumnName("owner_id");
            entity.Property(e => e.RegistrationValidTill).HasColumnName("REGISTRATION_VALID_TILL");
            entity.Property(e => e.Remarks)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("REMARKS");
            entity.Property(e => e.VehicleNo)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("VEHICLE_NO");
            entity.Property(e => e.VehicleTypeId).HasColumnName("VEHICLE_TYPE_ID");
        });
        //modelBuilder.HasSequence("challan_seq");
        //modelBuilder.HasSequence("cons_seq");
        //modelBuilder.HasSequence("invoice_seq");

        modelBuilder.Entity<TrnUserright>()
            .ToTable("trn_USERRIGHTS")
            .HasKey(t => t.Id);

        // Foreign Key: trn_USERRIGHTS → mst_MENU
        modelBuilder.Entity<TrnUserright>()
            .HasOne(t => t.Menu)
            .WithMany(m => m.UserRights)
            .HasForeignKey(t => t.MenuId)
            .HasConstraintName("FK_trn_USERRIGHTS_mst_menu");

        // Foreign Key: trn_USERRIGHTS → mst_USERS (Login used as key)

        modelBuilder.Entity<TrnUserright>()
            .HasOne(t => t.MstUser)
            .WithMany(u => u.UserRights)
            .HasForeignKey(t => t.User)           // TrnUserRights.USER (varchar)
            .HasPrincipalKey(u => u.Login)        // MstUser.LOGIN (varchar)
            .HasConstraintName("FK_trn_USERRIGHTS_mst_users");

        modelBuilder.Entity<MenuDTO>(entity =>
        {
            entity.HasKey(e => e.menuId);
        });
        modelBuilder.Entity<UserRightsDTO>(entity =>
        {
            entity.HasKey(e => e.menuId);
        });
        modelBuilder.Entity<MstUserBranch>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_USER_BRANCHES");

            entity.ToTable("mst_USER_BRANCHES");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BranchCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("branch_code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<MstUserCompany>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_USER_COMPANIES");

            entity.ToTable("mst_USER_COMPANIES");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompanyCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("company_code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<MstUserDivision>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_USER_DIVISIONS");

            entity.ToTable("mst_USER_DIVISIONS");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DivisionCode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("division_code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });
        modelBuilder.Entity<MstUserCompany>()
    .HasOne(x => x.User)
    .WithMany(u => u.UserCompanies)
    .HasForeignKey(x => x.UserId);

        modelBuilder.Entity<MstUserDivision>()
            .HasOne(x => x.User)
            .WithMany(u => u.UserDivisions)
            .HasForeignKey(x => x.UserId);

        modelBuilder.Entity<MstUserBranch>()
            .HasOne(x => x.User)
            .WithMany(u => u.UserBranches)
            .HasForeignKey(x => x.UserId);
        OnModelCreatingPartial(modelBuilder);
    }
    public DbSet<Client> Clients { get; set; }
    public DbSet<SigningKey> SigningKeys { get; set; }
    public DbSet<MenuDTO> UserRightsWithMenus { get; set; }
    public DbSet<UserRightsDTO> UserRightsWithMenusByUSer { get; set; }

    public List<MenuDTO> GetUserRightsWithMenu(string? login, int? menuId)
    {
        var userParam = new SqlParameter("@USER", login ?? (object)DBNull.Value);
        var menuParam = new SqlParameter("@ParentMenuId", menuId ?? (object)DBNull.Value);

        return UserRightsWithMenus
            .FromSqlRaw("EXEC rsp_getuser_Menu @USER, @ParentMenuId", userParam, menuParam)
            .ToList();
    }
    public List<UserRightsDTO> GetUserRightsWithMenuByUser(Int32? login)
    {
        var userParam = new SqlParameter("@USER", login ?? (object)DBNull.Value);

        return UserRightsWithMenusByUSer
            .FromSqlRaw("EXEC rsp_get_alluser_Menu @USER", userParam)
            .ToList();
    }
    public List<UserRightsDTO> GetUsersMenuAutofill(Int32? login, String mnuName)
    {
        var userParam = new SqlParameter("@USER", login ?? (object)DBNull.Value);
        var userParam2 = new SqlParameter("@mnuName", "%" + mnuName + "%");

        string sqlQuery = "EXEC rsp_get_alluser_Menu_autofill @USER,@mnuName";
        var result = UserRightsWithMenusByUSer
            .FromSqlRaw(sqlQuery, userParam, userParam2)
            .ToList();
        return result;
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
