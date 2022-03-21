using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;

namespace WEB_PROJEKAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoracController : ControllerBase
    {
       public OrganizacijaContext Context {get;set;}
        public BoracController(OrganizacijaContext context)
        {
            Context=context;

        }
        #region PREUZIMANJE_BORCA
        [Route("Preuzmi Borca i sve informacije o njemu")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(/*int id*/)
        {      
           
                         int KO=50;
                         var fighter= await Context.Borci.Where(p=>p.KnockoutRatio>KO).ToListAsync();
                         
                          if(fighter==null){return BadRequest("Greska!!!");}
                          return Ok(fighter.Select(p=>
                            new{
                                   id=p.ID,
                                   ime=p.Ime,
                                    prezime=p.Prezime,
                                   kategorija=p.Kategorija,
                                   brojPobeda=p.BrojPobeda,
                                   brojPoraza=p.BrojPoraza,
                                   knockoutRatio=p.KnockoutRatio   
                                   }).ToList());
                          
           
        }
        #endregion

        #region DODAVANJE_BORCA
        [Route("Dodaj Borca")]
        [HttpPost]

        public async Task<ActionResult> DodajBorca([FromBody] Borac borac)
        {
            if(borac.KnockoutRatio>100
            || borac.KnockoutRatio<0)
             {
                 return BadRequest("Greska kod nokauta!");
             }
             if(string.IsNullOrWhiteSpace(borac.Ime)
             || borac.Ime.Length>50)
             {
             return BadRequest("Greska kod imena!");
             }

              if(string.IsNullOrWhiteSpace(borac.Prezime)
             || borac.Prezime.Length>50)
             {
             return BadRequest("Greska kod prezimena!");
             }
             try
             {
            Context.Borci.Add(borac);
            await Context.SaveChangesAsync();
             return Ok($"Dodat je borac ciji je ID={borac.ID}");
             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
        }
       #endregion

        #region PROMENA_BORCA
        
        [Route("PromeniBorca/{ime}/{prezime}/{kategorija}/{knockoutRatio}/{brojPobeda}/{brojPoraza}/{ranking}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(string ime,string prezime,string kategorija,string knockoutRatio,string brojPobeda ,string brojPoraza,string ranking)
        {     int knockoutRatio1=Int32.Parse(knockoutRatio);
         int brojPobeda1=Int32.Parse(brojPobeda);
          int brojPoraza1=Int32.Parse(brojPoraza);
           int ranking1=Int32.Parse(ranking);


                if(knockoutRatio1>100 || knockoutRatio1<0)
                {
                   return BadRequest("Greska kod nokauta!");
                }
             
             if(brojPobeda1<0)
             {
             return BadRequest("Greska kod broja pobeda!");
             }

            if(brojPoraza1<0)
             {
                 return BadRequest("Greska kod poraza!");
             }
             if(ranking1<1 || ranking1> 5)
             {
                 return BadRequest("Greska kod rangiranja!");
             }
             try
             {   
               
               var fighter=Context.Borci.Where(p=>p.Ime==ime && p.Prezime==prezime).FirstOrDefault();

               if(fighter!=null)
               {
               
                fighter.BrojPobeda=brojPobeda1;
                fighter.BrojPoraza=brojPoraza1;
                fighter.Ranking=ranking1;
                fighter.Kategorija=kategorija;
                fighter.KnockoutRatio=knockoutRatio1;

                await Context.SaveChangesAsync();
                
                 return Ok(fighter.ID);
             }
             else
             {
                 return BadRequest("Borac nije pronadjen!");
             }

             }  
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion 
    
        #region BRISANJE_BORCA
         
        [Route("Obrisi Borca/{knockoutRatio}")]
        [HttpDelete]

        public async Task<ActionResult> Obrisi(int knockoutRatio)
        {

            if(knockoutRatio<0 || knockoutRatio>100)
            {
                return BadRequest("Greska kod nokauta!");
            }

             try
             {
               
               var fighter=Context.Borci.Where(p=>p.KnockoutRatio==knockoutRatio).FirstOrDefault();

               if(fighter!=null)
               {
                   string name=fighter.Ime;
                   string surname=fighter.Prezime;
                   
                   string kateg=fighter.Kategorija;
                   int rank=fighter.Ranking;

                   Context.Borci.Remove(fighter);
                   await Context.SaveChangesAsync();
                   return Ok($"Borac:{name} {surname}, ciji je rank bio:{rank} i cija je kategorija bila {kateg}, je uspesno obrisan");
               }
               else
               {
                     return BadRequest("Prvobitno nismo nasli trazenog borca!");
               }

             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
        }


        #endregion
      #region get_borca_by_id
[Route("PreuzmiBorcaById")]
[HttpGet]
public async Task<ActionResult> PreuzmiBorcaById()
{   
return Ok(await Context.Borci.Select(p=>
    new{
       // id=p.Borba.ID,
        id=p.ID,
        ime=p.Ime,
        prezime=p.Prezime,
        kategorija=p.Kategorija,
        borbaid=p.Borba.ID
    }).ToListAsync());
}
    #endregion
    #region PreuzmiBorcaByall
    [Route("PreuzmiBorcaByAll/{id}/{nizPobednika}")]
[HttpGet]
public async Task<ActionResult> PreuzmiBorcaByAll(string id,string nizPobednika)
{   
    try{

int id1=Int32.Parse(id);
string[] tokens = nizPobednika.Split(',');
      
var borci=Context.Borbe
.Where(a=>a.Arena.ID==id1 && tokens.Contains(a.Pobednik));


var borci1=await borci.ToListAsync();

return Ok(
    borci1.Select(p=>
    new
    {
        prviBorac=p.PrviBorac,
        drugiBorac=p.DrugiBorac,
        Pobednik=p.Pobednik,
        Nagrada=p.NovcanaNagradaUHiljadamaDolara
    }).ToList()
);

}
catch(Exception e)
{
    return BadRequest(e.Message);
}
    }
    #endregion

      #region get_borca_by_kat
[Route("PreuzmiBorcaByKat/{kat}")]
[HttpGet]
public async Task<ActionResult> PreuzmiBorcaByKat(string kat)
{   

if(kat.Length>20 || string.IsNullOrWhiteSpace(kat))
{
    return BadRequest("Ovakva kategorija ne postoji u bazi podataka!!!");
}

var za=await Context.Borci.Where(p=>p.Kategorija==kat).ToListAsync();
if(za!=null){
return Ok(za.Select(p=>
    new{
       
        id=p.ID,
        ime=p.Ime,
        prezime=p.Prezime,
        brojPobeda=p.BrojPobeda,
        brojPoraza=p.BrojPoraza,
        
        KnockoutRatio=p.KnockoutRatio
    }).ToList());
}
else{
    return BadRequest("Ne postoji ovakva kategorija");
}
}
    #endregion
    #region PreuzmiBoracStubic
    [Route("PreuzmiBoracStubic")]
    [HttpGet]
public async Task<ActionResult> PreuzmiBoracStubic()
{

try{

return Ok(
    await Context.Borci.Select(p=>
    new
    {
       ime=p.Ime,
       prezime=p.Prezime,
       knockoutratio=p.KnockoutRatio

    }).ToListAsync()
    
);
}
catch(Exception e)
{
    return BadRequest(e.Message);
}
    } 
    #endregion
}
}