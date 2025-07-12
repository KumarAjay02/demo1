using AutoMapper;
using Backend;
using Backend.Models.Entities;
using Backend.Modules.Master.Operation.Customer;
using DocumentFormat.OpenXml.Presentation;

public class CustomerMappingProfile : Profile
{
    public CustomerMappingProfile()
    {
        
        CreateMap<Customer, CustomerDto>()
            .ForMember(dest => dest.CustomerDets, opt => opt.MapFrom(src => src.CustomerDets));

        CreateMap<CustomerDet, CustomerDetDto>()
            .ForMember(dest => dest.CustomerDet2s, opt => opt.MapFrom(src => src.CustomerDet2s));

        CreateMap<CustomerDet2, CustomerDet2Dto>();

        // Reverse mappings if needed
        CreateMap<CustomerDto, Customer>();
        CreateMap<CustomerDetDto, CustomerDet>();
        CreateMap<CustomerDet2Dto, CustomerDet2>();
    }
}
