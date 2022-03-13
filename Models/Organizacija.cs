using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Organizacija")]
    public class Organizacija
    {

       [Key]
        public int ID { get; set; }

        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Osnivac { get; set; }
        
        [Required]
        [Range(10,20000)]
        public int VrednostOrganizacijeUMilionimaDolara { get; set; }
      
      [JsonIgnore]
        public List<Arena> Arene {get;set;}
    }
}