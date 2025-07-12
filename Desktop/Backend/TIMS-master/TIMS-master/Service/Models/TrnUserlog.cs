using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.models;

public partial class TrnUserlog
{
    [Key]
    public int Id { get; set; }

    public string? User { get; set; }

    public string? Password { get; set; }

    public string? SysIp { get; set; }

    public string? SysName { get; set; }

    public string? Logstatus { get; set; }

    public DateTime? Logintime { get; set; }
}
