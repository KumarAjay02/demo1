using System;
using System.Collections.Generic;

namespace Backend.Modules.Master.Common.PinCode;

public partial class PincodeMasterDTO
{
    public int Id { get; set; }

    public decimal PinCode { get; set; }

    public string AreaName { get; set; } = null!;

    public string CityCode { get; set; } = null!;

    public string? PickupBranchCode { get; set; }

    public string? DeliveryBranchCode { get; set; }

    public double? PickupDistance { get; set; }

    public double? DeliveryDistance { get; set; }

    public string? OdaLocation { get; set; }

    public string? CodService { get; set; }

    public TimeOnly? NoEntry1From { get; set; }

    public TimeOnly? NoEntry1To { get; set; }

    public TimeOnly? NoEntry2From { get; set; }

    public TimeOnly? NoEntry2To { get; set; }

    public string IsActive { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public int SerialNo { get; set; }
}
