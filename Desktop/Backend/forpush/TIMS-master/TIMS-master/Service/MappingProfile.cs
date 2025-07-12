using AutoMapper;
using Backend.Features.Login;
using Backend.Models.Entities;
using Backend.Modules.Master.Admin.Users;
using Backend.Modules.Master.Common.Branch;
using Backend.Modules.Master.Common.Company;
using Backend.Modules.Master.Common.CompanyDivision;
using Backend.Modules.Master.Common.Country;
using Backend.Modules.Master.Common.PinCode;
using Backend.Modules.Master.Common.State;
using Backend.Modules.Master.Country;
using Backend.Modules.Master.Operation.BookingBasis;
using Backend.Modules.Master.Operation.RouteMaster;

namespace Backend
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<CityMaster, CityMasterDTO>();
            CreateMap<StateMaster, StateMasterDTO>();
            CreateMap<CityMasterDTO, CityMaster>();
           
            CreateMap<MstUser, RegisterDTO>();
            CreateMap<RegisterDTO, MstUser>();
            CreateMap<CompanyMaster, CompanyMasterDTO>();
            CreateMap<CompanyMasterDTO,CompanyMaster >();
            CreateMap<CompDivision, DivisionMasterDTO>();
            CreateMap<DivisionMasterDTO,CompDivision >();
            CreateMap<BranchMaster, BranchMasterDTO>();
            CreateMap<BranchMasterDTO,BranchMaster >();
 
            CreateMap<CountryMaster, CountryMasterDto>().ReverseMap();
            CreateMap<StateMaster, StateMasterDto>().ReverseMap();
            CreateMap<CountryCreateUpdateDto, CountryMaster>()
              .ForMember(dest => dest.StateMasters, opt => opt.Ignore());
            CreateMap<OprRouteHeader, OprRouteHeaderDto>().ReverseMap();
            CreateMap<OprRouteLine, OprRouteLineDto>().ReverseMap();
            CreateMap<OprRouteHeader, OprRouteCreateUpdateDto>().ReverseMap();
 
            CreateMap<PincodeMaster, PincodeMasterDTO>();
            CreateMap<PincodeMasterDTO, PincodeMaster>();

            CreateMap<BookingBasisModeDto, BookingBasisModeModel>();
            CreateMap<BookingBasisModeModel, BookingBasisModeDto>();

        }

    }
}
