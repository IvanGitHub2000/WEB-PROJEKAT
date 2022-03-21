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
    public class OrganizacijaController : ControllerBase
    {
       public OrganizacijaContext Context {get;set;}
        public OrganizacijaController(OrganizacijaContext context)
        {
            Context=context;

        }
       #region DODAJ_ORGANIZACIJU
       [Route("Dodaj Organizaciju")]
       [HttpPost]
       public async Task<ActionResult> DodajOrganizaciju([FromBody] Organizacija org)
       {
          if(org.Ime.Length>50 || string.IsNullOrWhiteSpace(org.Ime))
           {
               return BadRequest("Greska sa imenom organizacije!!!");

           } 
             if(org.Osnivac.Length>50 || string.IsNullOrWhiteSpace(org.Osnivac))
           {
               return BadRequest("Greska sa imenom osnivaca!!!");

           }
           if(org.VrednostOrganizacijeUMilionimaDolara<10 || org.VrednostOrganizacijeUMilionimaDolara>20000)
           {
               return BadRequest("Greska sa vrednoscu organizacije!!!");

           }  
           try
           {
                 Context.Organizacije.Add(org);
                 await Context.SaveChangesAsync();
                 return Ok($"Dodata organizacija sa imenom: {org.Ime},osnivacem: {org.Osnivac} i vrednoscu procenjenom na {org.VrednostOrganizacijeUMilionimaDolara} miliona dolara!!!");

           }
           catch(Exception e)
           {
               return BadRequest(e.Message);
           }

       }
       #endregion
        #region DODAVANJE_ORGANIZACIJE_ARGUMENTI
        [Route("DodajOrganizatora/{naziv}/{osnivac}/{vrednost}")]
        [HttpPost]
        public async Task<ActionResult> DodajOrganizatora(string naziv, string osnivac, string vrednost)
        {
            
           int value=Int32.Parse(vrednost);
            if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Greska kod naziva!");
            }

            if (string.IsNullOrWhiteSpace(osnivac) || osnivac.Length > 50)
            {
                return BadRequest("Greska kod osnivaca!");
            }

            if (value <20 || value >20000)
            {
                return BadRequest("Greska kod naziva sportskog objekta!");
            }

            try
            {
                

                var organizator = await Context.Organizacije.Where(p => p.Ime == naziv&&p.VrednostOrganizacijeUMilionimaDolara==value).FirstOrDefaultAsync();

                    if(organizator==null){
                        Organizacija o = new Organizacija()
                        {
                            Ime = naziv,
                            Osnivac=osnivac,
                            VrednostOrganizacijeUMilionimaDolara=value
                        };
                        
                        Context.Organizacije.Add(o);
                        await Context.SaveChangesAsync();
                        return Ok(o);
                    }

                else
                {
                    return BadRequest("Organizacija vec postoji!!!");
                }
                    
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        #endregion
   #region BRISANJE_ORGANIZACIJE
         
        [Route("Obrisi Organizaciju/{naziv}")]
        [HttpDelete]

        public async Task<ActionResult> Obrisi(string naziv)
        {

           if(naziv.Length>50 || string.IsNullOrWhiteSpace(naziv))
            {
                return BadRequest("Greska kod prosledjivanja imena kompanije koja je bankrotirala!!!");//razmisli i o bankrotiranju
            }

             try
             {
               
               var org1=Context.Organizacije.Where(p=>p.Ime==naziv).FirstOrDefault();

               if(org1!=null)
               {   
                   string name=org1.Ime;
                   int value=org1.VrednostOrganizacijeUMilionimaDolara;
                   if(value<1000)
                   {
                   
                   

                   Context.Organizacije.Remove(org1);
                   await Context.SaveChangesAsync();
                   return Ok(1);
                   }
                   else
                   {
                       return BadRequest("Organizacija se ne nalazi u dugovima!!!");
                   }
               }
               else
               {
                     return BadRequest("Prvobitno nismo nasli trazenu kompaniju!");
               }

             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
        }


        #endregion
#region Get_organizacija
[Route("PreuzmiOrganizacijuSaNajvecimBudzetom")]
[HttpGet]
public async Task<ActionResult> PreuzmiOrgMax()
{   
int max=0;
var sve=Context.Organizacije;
    foreach(var x in Context.Organizacije)
    {
          var p=x.VrednostOrganizacijeUMilionimaDolara;
          if(p>max)
          {
            max=p;
           
          }
    }
    if(max<500)
    {
        return BadRequest("Nijedna organizacija nema dovoljno sredstava!!!");
    }
    
    var j=await sve.Where(p=>p.VrednostOrganizacijeUMilionimaDolara==max).ToListAsync();
    var l=j.FirstOrDefault();
   
        return Ok(l);
    }
#endregion
 
  #region PreuzmiOrgReal
  [Route("PreuzmiOrganizacije")]
[HttpGet]
public async Task<ActionResult> PreuzmiOrg()
{  
    try{ 
var org=Context.Organizacije;
var sve=await org.Where(p=>p.ID>0).ToListAsync();

return Ok(
    
    sve.Select(p=>
    new
    {
        id=p.ID,
      ime=p.Ime,
      osnivac=p.Osnivac,
      vrednost=p.VrednostOrganizacijeUMilionimaDolara

    })
);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }

    }
    #endregion

    #region MinBudget
    [Route("PreuzmiOrganizacijuSaNajmanjimBudxetom")]
[HttpGet]
public async Task<ActionResult> PreuzmiOrgMin()
{   
int min=9999999;
var sve=Context.Organizacije;
    foreach(var x in Context.Organizacije)
    {
          var p=x.VrednostOrganizacijeUMilionimaDolara;
          if(min>p)
          {
            min=p;
           
          }
    }
    /*if(min<500)
    {
        return BadRequest("Nijedna organizacija nema dovoljno sredstava!!!");
    }*/
    
    var j=await sve.Where(p=>p.VrednostOrganizacijeUMilionimaDolara==min).ToListAsync();
    var l=j.FirstOrDefault();
    /*return Ok("Organizacija sa najvecim budzetom je pronadjena.Njeno ime je:" +l.Ime + "Osnivac je:" + l.Osnivac + "i njena vrednost je"
        + l.VrednostOrganizacijeUMilionimaDolara + "miliona dolara.");*/
        return Ok(l);
    }
       [Route("IzmeniOrganizacijuId/{novac}")]
       [HttpPost]
       public async Task<ActionResult> IzmeniOrganizacijuId(string novac)
       {
         /* if(org.Ime.Length>50 || string.IsNullOrWhiteSpace(org.Ime))
           {
               return BadRequest("Greska sa imenom organizacije!!!");

           } 
             if(org.Osnivac.Length>50 || string.IsNullOrWhiteSpace(org.Osnivac))
           {
               return BadRequest("Greska sa imenom osnivaca!!!");

           }
           if(org.VrednostOrganizacijeUMilionimaDolara<10 || org.VrednostOrganizacijeUMilionimaDolara>20000)
           {
               return BadRequest("Greska sa vrednoscu organizacije!!!");

           }  */
           var sve=Context.Organizacije.Where(p=>p.Ime==novac).FirstOrDefault();
            
                 
          


           try
           {  
                  sve.VrednostOrganizacijeUMilionimaDolara=sve.VrednostOrganizacijeUMilionimaDolara*5;
                 Context.Organizacije.Update(sve);
                 await Context.SaveChangesAsync();
                // return Ok($"Izmenjena organizacija sa imenom: {sve.Ime},osnivacem: {sve.Osnivac} i novom vrednoscu  na {sve.VrednostOrganizacijeUMilionimaDolara} miliona dolara!!!");
return Ok(sve.VrednostOrganizacijeUMilionimaDolara);
           }
           catch(Exception e)
           {
               return BadRequest(e.Message);
           }

       }
       #endregion

#region POMOGNI_ORGANIZACIJAMA
            [Route("PomocOrganizacijama/{ime}")]//sa select box dobijas info o ovome
            [HttpPut]
          public async Task<ActionResult> PomocOrganizacijama(string ime)
          {
              if(ime.Length>50)
              {
                  return BadRequest("Predugacko ime!!! Takva organizacija u bazi podataka ne postoji!!!");
              }
              try
              {
                  
                 
                var zaMenjanje= Context.Organizacije.Where(p=>p.Ime==ime).FirstOrDefault();

                if(zaMenjanje!=null)
                {
                    

                zaMenjanje.VrednostOrganizacijeUMilionimaDolara+=zaMenjanje.VrednostOrganizacijeUMilionimaDolara/10;
                }
                else
                {
                    return BadRequest("Trazena organizacija ne postoji!!!");
                }
                await Context.SaveChangesAsync();

                
                  return Ok(1);
              
              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
          }
          #endregion
 #region PreuzmiOrgStubic
 [Route("PreuzmiOrganizacijeStubic")]
[HttpGet]
public async Task<ActionResult> PreuzmiOrganizacijeStubic()
{

try{





return Ok(
    await Context.Organizacije.Select(p=>
    new
    {
       ime=p.Ime,
       vrednost=p.VrednostOrganizacijeUMilionimaDolara

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




