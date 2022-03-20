

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{

    [Table("Borba")]
    public class Borba
    {

    [Key]
    public int ID { get; set; }

    
    [Required]
    [MaxLength(50)]
     public string PrviBorac { get; set; }

    [Required]
    [MaxLength(50)]
     public string DrugiBorac { get; set; }

      [Required]
    [MaxLength(50)]
     public string Pobednik { get; set; }

    [Required]
    [Range(1,50000)]
     public int NovcanaNagradaUHiljadamaDolara { get; set; }

        [JsonIgnore]
        public List<Borac> Borci{get;set;}

       public Arena Arena{get;set;}
     
    }
}