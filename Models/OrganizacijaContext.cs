using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class OrganizacijaContext:DbContext
    {
        public DbSet<Borac> Borci {get;set;}

        public DbSet<Borba> Borbe {get;set;}

        public DbSet<Arena> Arene {get;set;}

        public DbSet<Organizacija> Organizacije {get;set;}

        
        public OrganizacijaContext(DbContextOptions options): base(options)
        {
            
        }
    }
}