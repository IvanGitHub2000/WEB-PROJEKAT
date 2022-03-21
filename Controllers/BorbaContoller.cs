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
    public class BorbaController : ControllerBase
    {
       public OrganizacijaContext Context {get;set;}
        public BorbaController(OrganizacijaContext context)
        {

            Context=context;

        }

        #region  IZMENI_BORBU
        [Route("Izmeni Borbu/{ko1}/{ko2}")]
        [HttpPut]

        public async Task<ActionResult> IzmeniBorbu(int ko1,int ko2)//izmeni pobednika i nagradni fond,
        //onog koga unesemo, pobedjuje kao iznenadjenje veceri!!! i dobija bonus.Kao zamena za povredu.KO2 je knockoutratio onog ko se nije povredio.
        {
    
      var prvif=Context.Borci.Where(p=>p.KnockoutRatio==ko1).FirstOrDefault();
      string ime1=prvif.Ime + " " + prvif.Prezime;

      var drugif=Context.Borci.Where(x=>x.KnockoutRatio==ko2).FirstOrDefault();

      var fight=Context.Borbe.Where(d=>d.DrugiBorac==drugif.Ime).FirstOrDefault();//mora postoji u borbe 

        //var prvi=Context.Borci.Where(p=>p.ID==id1).FirstOrDefault();
        //var drugi=Context.Borci.Where(d=>d.ID==id2).FirstOrDefault();


        string prvakat=prvif.Kategorija;//kategorija zamene za povredjenog borca


        string drugakat=drugif.Kategorija;//kategorija onog sto ostaje

        
             //Uslov da pripadaju istoj kategoriji za borbu

            
             try{
             if(prvakat.Equals(drugakat)==true){

                // string ImePrvog=prvif.Ime+ " " + prvif.Prezime; isto sto i ime1;
                 string ImeDrugog=drugif.Ime + " " + drugif.Prezime;
 
               /* Random rand =new Random();
                int num=rand.Next();
                int koo1=prvif.KnockoutRatio*num;


                 Random rand1 =new Random();
                  int num1=rand1.Next();
                  int koo2=drugi.KnockoutRatio*num1;*/

                 fight.PrviBorac=ime1;
                 fight.DrugiBorac=ImeDrugog;
                if(ko1>ko2)
                {
                        fight.Pobednik=ime1;
                }
                else if(ko1<ko2)
                {
                    fight.Pobednik=ImeDrugog;
                }
               Random rand2 =new Random();
                int num2=rand2.Next();
                fight.NovcanaNagradaUHiljadamaDolara=(num2%50000);

                 if(fight.NovcanaNagradaUHiljadamaDolara<1 || fight .NovcanaNagradaUHiljadamaDolara>50000)
            {
                return BadRequest("Greska kod nagrade");
            }
             if(string.IsNullOrWhiteSpace(fight.PrviBorac) || string.IsNullOrWhiteSpace(fight.DrugiBorac))
            {
                return BadRequest("Niste uneli imena boraca!");
            }
            if(fight.PrviBorac.Length>50 || fight.DrugiBorac.Length>50)
            {
                return BadRequest("Imena boraca su predugacka!");
            }
            if(fight.NovcanaNagradaUHiljadamaDolara<1 || fight.NovcanaNagradaUHiljadamaDolara>50000)
            {
                return BadRequest("Greska kod nagrade");
            }

                Context.Borbe.Update(fight);
                 await Context.SaveChangesAsync();
                 return Ok($"Borba je uspesno organizovana! 1.{fight.PrviBorac} + 2.{fight.DrugiBorac} + pobednik je {fight.Pobednik} + nagrada{fight.NovcanaNagradaUHiljadamaDolara} ");
                        
             } 
             else
             {
                 return BadRequest("Nisu ista kategorija");
             }
             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }  
        }
        #endregion
        #region DODAJ_BORBU
        [Route("Dodaj Borbu")]
        [HttpPost]
        public async Task<ActionResult> DodajBorbu([FromBody] Borba borba)
        {
 
        
            
             if(string.IsNullOrWhiteSpace(borba.PrviBorac) || string.IsNullOrWhiteSpace(borba.DrugiBorac))
            {
                return BadRequest("Niste uneli imena boraca!");
            }
            if(borba.PrviBorac.Length>50 || borba.DrugiBorac.Length>50)
            {
                return BadRequest("Imena boraca su predugacka!");
            }
            if(borba.NovcanaNagradaUHiljadamaDolara<1 || borba.NovcanaNagradaUHiljadamaDolara>50000)
            {
                return BadRequest("Greska kod nagrade");
            }
             try
             {
            Context.Borbe.Add(borba);
            await Context.SaveChangesAsync();// da bi se dodalo u bazu
             return Ok($"Dodata je borba ciji je ID={borba.ID}.Borac {borba.PrviBorac} i borac {borba.DrugiBorac} ce se nadmetati za nagradni fond u iznosu od {borba.NovcanaNagradaUHiljadamaDolara}!!!");
             }
             catch(Exception e)
             {
                 return BadRequest(e.Message);
             }
        }
        #endregion
  #region get_borbe_by_id
[Route("PreuzmiBorbeById")]
[HttpGet]
public async Task<ActionResult> PreuzmiBorbeByID()
{   
return Ok(await Context.Borbe.Select(p=>
    new{
      //  id=p.Arena.ID,
      id=p.ID,
      prvi=p.PrviBorac,
      drugi=p.DrugiBorac,
      pobednik=p.Pobednik,
      nagrada=p.NovcanaNagradaUHiljadamaDolara
        
    }).ToListAsync());
}
#endregion
#region OdstampajBorbeNagrade
          [Route("OdstampajBorbe/{nagradaB}")]
            [HttpPut]
          public async Task<ActionResult> OdstampajArene(int nagradaB)
          {
              

              if(nagradaB<0)
              {
                  return BadRequest("Greska!!!");
              }
              try
              {
                  var zaMenjanje= await Context.Borbe.Where(p=>p.NovcanaNagradaUHiljadamaDolara==nagradaB).ToListAsync();
                 
                  
                 
                 
                  return Ok(
                      zaMenjanje.Select(p=>
                      new
                      {
                                
                               
                                pobednik=p.Pobednik,
                                nagrada=p.NovcanaNagradaUHiljadamaDolara
                      }).ToList()
                  );

              }
              catch(Exception e)
              {
                  return BadRequest(e.Message);
              }
          }
#endregion
 
#region BorbeGubitniciSplit
[Route("PreuzmiGubitnike/{id}/{niz}")]
[HttpGet]
public async Task<ActionResult> PreuzmiGubitnike(string id,string niz)
{   
    if(string.IsNullOrWhiteSpace(niz)||string.IsNullOrWhiteSpace(id))
    {
        return BadRequest("Greska!!!");
    }
    try{

string[] tokens = niz.Split(',');

int id1=Int32.Parse(id);
if(id1<0)
{
    return BadRequest("Los id!!!");
}

var gubitnici=Context.Borbe
.Where(a=>a.Arena.ID==id1 && tokens.Contains(a.Pobednik));

var losers=await gubitnici.ToListAsync();

return Ok(
    losers.Select(p=>
    new
    {
        prviBorac=p.PrviBorac,
        drugiBorac=p.DrugiBorac,
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
    #region PreuzmiBorbeStubic
    [Route("PreuzmiBorbeStubic")]
[HttpGet]
public async Task<ActionResult> PreuzmiBorbeStubic()
{

try{





return Ok(
    await Context.Borbe.Select(p=>
    new
    {
       pobednik=p.Pobednik,
       nagrada=p.NovcanaNagradaUHiljadamaDolara

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
