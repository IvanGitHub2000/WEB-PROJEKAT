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
    public class ArenaController : ControllerBase
    {
       public OrganizacijaContext Context {get;set;}
        public ArenaController(OrganizacijaContext context)
        {
            Context=context;

        }
        #region DODAJ_ARENU
        [Route("Dodaj Arenu")]
        [HttpPost]
        public async Task<ActionResult> DodajArenu([FromBody] Arena arena)
        {
          if(arena.Kapacitet>100000)
            
             {
                 return BadRequest("Prevelika arena!!!");
             }
             if(arena.Kapacitet<1000)
            {
                return BadRequest("Premala arena!!");
            }
             if(string.IsNullOrWhiteSpace(arena.Drzava)
             || arena.Drzava.Length>20)
             {
             return BadRequest("Greska kod drzave!");
             }

              if(string.IsNullOrWhiteSpace(arena.Ime)
             || arena.Ime.Length>20)
             {
             return BadRequest("Greska kod imenovanja arene!");
             }
             try
             {
            Context.Arene.Add(arena);
            await Context.SaveChangesAsync();// da bi se dodalo u bazu
             return Ok($"Dodata je arena ciji je ID={arena.ID}, sa imenom: {arena.Ime},kapacitetom:{arena.Kapacitet},iz drzave:{arena.Drzava}"
             + $"PAZNJA:Potrebne Covid propusnice:{arena.PotrebnaCovidPropusnica}");
             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
            
             
        }
            #endregion
          /*  #region DODAJ_ARENU
        [Route("DodajArenuOrganizaciji/{ime}/{drzava}/{kapacitet}/{potrebnaCovid}/{idorg}")]
        [HttpPost]
        public async Task<ActionResult> DodajArenuOrganizaciji(string ime,string drzava,string kapacitet,string potrebnaCovid,string idorg)
        {
            int idOrganizacije=Int32.Parse(idorg);
          if(idOrganizacije<0)
          return BadRequest("Greska kod id!!!");
             try
             {
                 var arena= await Context.Arene.Include(p=>p.Organizacija).Where(p=>p.ID>0).ToListAsync();
                

                // Arena arena=new Arena();

                 arena.Ime=ime;
                 arena.Drzava=drzava;
                 arena.Kapacitet=Int32.Parse(kapacitet);
                 arena.PotrebnaCovidPropusnica=Boolean.Parse(potrebnaCovid);
                 arena.Organizacija.ID=idOrganizacije;
          
                 Context.Arene.Add(arena);
                 await Context.SaveChangesAsync();
                 return Ok();
           
             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
            
             
        }
        #endregion*/
         
            #region IZMENI_ARENU
            [Route("PreuzmiArenice/{kap}")]
            [HttpPut]
          public async Task<ActionResult> PreuzmiArenice(string kap)
          {
              if(string.IsNullOrWhiteSpace(kap))
              {
                  return BadRequest("Greska!!!");
              }
              int minimum=Int32.Parse(kap);
              
              try
              {
                  if(minimum<1000 || minimum>100000)
                  {
                      return BadRequest("Greska kod kapaciteta!!!");
                  }
                 
                  var zaMenjanje= await Context.Arene.Where(p=>p.PotrebnaCovidPropusnica==true && p.Kapacitet>minimum).ToListAsync();
                
                  return Ok(
                      zaMenjanje.Select(p=>
                  new
                  {
                      id=p.ID,
                      ime=p.Ime,
                      drzava=p.Drzava,
                      kapacitet=p.Kapacitet


                  }).ToList()
                  );

              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
          }
          #endregion
          [Route("OdstampajArene/{proba}")]
            [HttpPut]
          public async Task<ActionResult> OdstampajArene(int proba)
          {//menja se da li su potrebne propusnice ili ne
             /* if(string.IsNullOrWhiteSpace(imeArene)||imeArene.Length>20)
              {
                  return BadRequest("Greska prilikom unosa imena arene koju zelite da izmenite");
              }*/
              

              
              try
              {
                  var zaMenjanje= await Context.Arene.Where(p=>p.Kapacitet>proba).ToListAsync();
                 
                  //zaMenjanje.PotrebnaCovidPropusnica=true;
                 
                  await Context.SaveChangesAsync();
                  return Ok(
                      zaMenjanje.Select(p=>
                      new
                      {
                                
                                ime=p.Ime,
                                drzava=p.Drzava,
                                kapacitet=p.Kapacitet,
                                covidprop=p.PotrebnaCovidPropusnica
                      }).ToList()
                  );

              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
              }
              
              
          
/*[Route("PreuzmiArenu")]
[HttpGet]
public async Task<List<Models.Arena>> PreuzmiArenu1()x
{   

var f= await Context.Arene.Include(p=>p.Organizacija).ToListAsync();
return (f);



  
        
    }*/
   #region get_arenu
[Route("PreuzmiArenuPoIDOrganizacije")]
[HttpGet]
public async Task<ActionResult> PreuzmiArenuPoIDOrganizacije()
{
return Ok(await Context.Arene.Select(p=>
    new{
        //id=p.Organizacija.ID,
        id=p.ID,
        kapacitet=p.Kapacitet,
        ime=p.Ime,
        

        
    }).ToListAsync());
}
 #endregion
[Route("PreuzmiArenePoMax/{birajArenu}")]
[HttpGet]
public async Task<ActionResult> PreuzmiArenePoMax(int birajArenu)
{

try{
var arene=Context.Arene
.Where(a=>a.Organizacija.ID==birajArenu);


var arene1=await arene.ToListAsync();

return Ok(
    arene1.Select(p=>
    new
    {
       ime=p.Ime
    }).ToList()
    
);
}
catch(Exception e)
{
    return BadRequest(e.Message);
}
    }


[Route("ObrisiAreneSaNedovoljnimKapacitetom/{kap}")]
[HttpDelete]
public async Task<ActionResult> ObrisiAreneSaNedovoljnimKapacitetom(string kap)
{

try{
    if(string.IsNullOrWhiteSpace(kap))
    {
        return BadRequest("Greska kod kapaciteta!!!");
    }
    int cap=Int32.Parse(kap);
    if(cap<1000 || cap>100000)
    {
        return BadRequest("Greska!!!");
    }
      var arena1= await Context.Arene.Where(p=>p.Kapacitet<cap).ToListAsync();

      if(arena1!=null){

      foreach(var v in arena1){
          
           Context.Arene.Remove(v);
                   await Context.SaveChangesAsync();
      }
                   return Ok(1);
      }
      else{
        return BadRequest("Ne postoje arene koje ne zadovoljaju uslove!!!");
      }
}
catch(Exception e)
{
    return BadRequest(e.Message);
}
    }
  #region IZMENI_ARENU_COVID
            [Route("IzmeniArenuCovid/{ime}")]//sa select box dobijas info o ovome
            [HttpPut]
          public async Task<ActionResult> IzmeniArenuCovid(string ime)
          {
              if(ime.Length>20||string.IsNullOrWhiteSpace(ime))
              {
                  return BadRequest("Predugacko ime!!! Takva arena u bazi podataka ne postoji!!!");
              }
              try
              {
                 
                var zaMenjanje= Context.Arene.Where(p=>p.Ime==ime).FirstOrDefault();
                if(zaMenjanje!=null)
                {
                if(zaMenjanje.PotrebnaCovidPropusnica==false)
                {
                zaMenjanje.PotrebnaCovidPropusnica=true;
                }
                else
                {
                    return BadRequest("Kod trazene arene vec stoji pravilo o COVID propusnicama");
                }
                await Context.SaveChangesAsync();

                }
                  return Ok(1);
              }
              
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
          }
          #endregion
          [Route("PreuzmiAreneStubic")]
[HttpGet]
public async Task<ActionResult> PreuzmiAreneStubic()
{

try{





return Ok(
    await Context.Arene.Select(p=>
    new
    {
       ime=p.Ime,
       kapacitet=p.Kapacitet

    }).ToListAsync()
    
);
}
catch(Exception e)
{
    return BadRequest(e.Message);
}
    }
    }
}
    

