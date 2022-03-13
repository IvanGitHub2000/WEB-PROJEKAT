using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Borac")]
public class Borac
{
[Key]
public int ID { get; set; }

[Required]
[MaxLength(50)]
public string Ime { get; set; }
[Required]
[MaxLength(50)]
public string Prezime { get; set; }

[Required]
[MaxLength(20)]
public string Kategorija { get; set; }
[Required]
[Range(1,6)]
public int Ranking { get; set; }

[Required]

public int BrojPobeda {get;set;}

[Required]

public int BrojPoraza { get; set; }

[Required]

public int KnockoutRatio{get;set;}

public  Borba Borba {get;set;}


}
}