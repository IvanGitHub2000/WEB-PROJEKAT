using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

[Table("Arena")]
public class Arena{


[Key]
public int ID { get; set; }

[Required]
[MaxLength(20)]
public string Ime { get; set; }

[Required]
[MaxLength(20)]
public string Drzava { get; set; }

[Required]
[Range(1000,100000)]
public int Kapacitet { get; set; }

[Required]
public bool PotrebnaCovidPropusnica { get; set; }

[JsonIgnore]
public List<Borba> Borbe{get;set;}

public Organizacija Organizacija {get;set;}


}
}