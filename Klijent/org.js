import { Arena } from "./Arena.js";
import { BoracKo } from "./BoracKo.js";
import { Organizacija } from "./Organizacija.js";

import { Borac } from "./Borac.js";
import { BorbaNagrade } from "./BorbaNagrade.js";
import { BoracKat } from "./BoracKat.js";
import { Borbe2 } from "./Borbe2.js";

export class org{
    constructor(listaOrganizacija,listaArena,listaBorbi,listaBoraca){
        this.listaOrganizacija=listaOrganizacija;
        this.listaArena=listaArena;
        this.listaBorbi=listaBorbi;
        this.listaBoraca=listaBoraca;
        this.kont=null;
    }
crtaj1(host){
    
  if(this.kont!=null)
  {
      host.removeChild(this.kont);
      
  }
        let nesto=document.querySelector(".FormaStubici1");
        console.log(nesto);
        
        nesto.style.display="none";
            
        this.kont=document.createElement("div");
        this.kont.className="GlavniKontejner";
        host.appendChild(this.kont);

        let forma=document.createElement("div");
        forma.className="Forma";
        this.kont.appendChild(forma);

        
        let l1=document.createElement("h1");
        l1.className="h1glavni";
        l1.innerHTML="Molimo Vas odaberite neku od opcija";
        forma.appendChild(l1);
        
        
        //ORGANIZACIJE
        let btnOrganizacija = document.createElement("button");
        btnOrganizacija.innerHTML = "Organizacija";
        btnOrganizacija.className="menubtn";
        btnOrganizacija.onclick = (ev) => this.crtajOrganizacije(forma);
        forma.appendChild(btnOrganizacija);
        
        //ARENE
        let btnPrikazArena = document.createElement("button");
        btnPrikazArena.innerHTML = "Arene";
        btnPrikazArena.className="menubtn";
        btnPrikazArena.onclick = (ev) => this.crtajFormuArena(forma);
        forma.appendChild(btnPrikazArena);

        //BORBE
        let btnBorbe1 = document.createElement("button");
        btnBorbe1.innerHTML = "Borbe";
        btnBorbe1.className="menubtn";
        btnBorbe1.onclick = (ev) => this.crtajBorbe12(forma);
        forma.appendChild(btnBorbe1);
        //BORCI
        let btnBorci = document.createElement("button");
        btnBorci.innerHTML = "Borci";
        btnBorci.className="menubtn";
        btnBorci.onclick = (ev) => this.crtajBorce(forma);
        forma.appendChild(btnBorci);
        
        //STUBICI
        let btnStubici = document.createElement("button");
        btnStubici.innerHTML = "Stubici";
        btnStubici.className="menubtn";
        btnStubici.onclick = (ev) => this.crtajStubice(forma);
        forma.appendChild(btnStubici);
        
        
    }
    crtajStubice(host)
    {
        var host1=this.refreshStubice(host);

        let nesto= document.querySelector(".FormaStubici1");
        nesto.style.display="flex"

        let btnVrati = document.createElement("button");
        btnVrati.className="dugme";
        btnVrati.innerHTML = "Vrati na pocetnu";
        btnVrati.onclick = (ev) => this.crtaj1(document.body);
        host1.appendChild(btnVrati);

        
        let selectGrafik = document.createElement("select");
        selectGrafik.className = "selectGrafik";
        host1.appendChild(selectGrafik);


        let nizGrafika=["Statistika Organizacija","Statistika Arena","Statistika Borbi","Statistika Boraca"];

        let opcije;
        
        nizGrafika.forEach(p => {

            opcije = document.createElement("option");
            opcije.innerHTML =p;
            opcije.value=p;
            selectGrafik.appendChild(opcije);
            console.log(opcije.value);

        })
        
        
            let dugme=document.createElement("button");
            dugme.innerHTML="Dugme Grafik";
            dugme.className="dugmeGrafik";
            dugme.onclick=(ev)=>this.Grafikon(host1);
            host1.appendChild(dugme);

          

        }
Grafikon(host1){
            let optionEl = this.kont.querySelector(".selectGrafik");
            var izabrano = optionEl.options[optionEl.selectedIndex].value;
            console.log(izabrano);
            this.CrtajGrafike(izabrano,host1)}
CrtajGrafike(izabrano,host1)
{
            if(izabrano==null || izabrano=="" || izabrano==undefined)
            {
                alert("Izaberite grafik!!!");
                exit(0);
            }
            if(izabrano=="Statistika Organizacija"){
            this.crtajStubiceOrganizacija(host1);
            }
            else if(izabrano=="Statistika Arena")
            {
                this.crtajStubiceArena(host1);
            }
            else if(izabrano=="Statistika Borbi")
            {
                this.crtajStubiceBorba(host1);
            }
            else if(izabrano=="Statistika Boraca")
            {
                this.crtajStubiceBorac(host1);
            }
        }
    crtajStubiceBorac(host)
    {
        var nesto1=document.getElementById("myChartArena");
        var nesto2=document.getElementById("myChartBorba");
        var nesto3=document.getElementById("myChartOrganizacija");
        var nesto4=document.getElementById("myChartBorac"); 
        nesto1.style.display="none";
        nesto2.style.display="none";
        nesto3.style.display="none";
        nesto4.style.display="flex";
        var i=0;
        var j=0;
        var vrednostx=[];
        var vrednosty=[];
    fetch("https://localhost:5001/Borac/PreuzmiBoracStubic" ,
    {  method: "GET"
    
    }).then(s=>
        {if(s.ok)
            {
                
                    s.json().then(data=>
                        {
                            data.forEach(p=>{
                                              
                            vrednostx[i++]=p.ime + " " + p.prezime;
                            vrednosty[j++]=p.knockoutratio;
                           
                        }
                        )
                    }
                    )
                    
                }
            })
           
                 console.log(vrednostx);
                 console.log(vrednosty);
    
              var nesto1=  new Chart("myChartBorac", {
                    type: "bar",
                    data: {
                    labels: vrednostx,
                    datasets: [{
                    label:'Grafik Boraca',
                     backgroundColor:  'rgb(255,165,0)',
                    data: vrednosty
                    }]
                },
                options: {
                    scales: {
                      x: {
                        title: {
                          font: {
                            size: 25,
                            weight: "bold"
                          },
                          color: 'gold'
                        },
                
                        ticks: {
                          font: {
                            size: 15,
                            weight: "bold"
                          },
                          color: 'gold',
                        },
                      },
                
                      y: {
                        title: {
                          font: {
                            /*size: 40,*/
                           // weight: "bold"
                          },
                          //color: 'gold'
                        },
                
                       /* ticks: {
                          //beginAtZero: true,
                          font: {
                            size: 40,
                            weight: "gold"
                          },
                          color: 'gold'
                        }*/
                      }
                    }
                  }
           }) 
           
    }
    crtajStubiceBorba(host)
    {
        var nesto1=document.getElementById("myChartArena");
        var nesto2=document.getElementById("myChartOrganizacija");
        var nesto3=document.getElementById("myChartBorac");
        var nesto4=document.getElementById("myChartBorba"); 
        nesto1.style.display="none";
        nesto2.style.display="none";
        nesto3.style.display="none";
        nesto4.style.display="flex";
        var i=0;
        var j=0;
        var vrednostx=[];
        var vrednosty=[];
      
    fetch("https://localhost:5001/Borba/PreuzmiBorbeStubic" ,
    {  method: "GET"
    
    }).then(s=>
        {if(s.ok)
            {  
                
                    s.json().then(data=>
                        {
                            data.forEach(p=>{
                                              
                            vrednostx[i++]=p.pobednik;
                            vrednosty[j++]=p.nagrada;
                           
                        }
                        )
                    }
                    ) 
                    
                }
            })
          
                console.log(vrednostx);
                 console.log(vrednosty);
    
               var nesto1= new Chart("myChartBorba", {
                    type: "bar",
                    data: {
                    labels: vrednostx,
                    datasets: [{
                    label:'Grafik Borbi',
                     backgroundColor:  'rgba(5, 255, 131, 0.7)',
                    data: vrednosty
                    }]
                },
                options: {
                    scales: {
                      x: {
                        title: {
                          font: {
                            size: 25,
                            weight: "bold"
                          },
                          color: 'gold'
                        },
                
                        ticks: {
                          font: {
                            size: 20,
                            weight: "bold"
                          },
                          color: 'gold',
                        },
                      },
                
                      y: {
                        title: {
                          font: {
                            /*size: 40,*/
                           // weight: "bold"
                          },
                         // color: 'gold'
                        },
                
                       /* ticks: {
                          //beginAtZero: true,
                          font: {
                            size: 40,
                            weight: "gold"
                          },
                          color: 'gold'
                        }*/
                      }
                    }
                  }
           });
           
    }
    crtajStubiceOrganizacija(host){
    // {
        var nesto1=document.getElementById("myChartArena");
        var nesto2=document.getElementById("myChartBorba");
        var nesto3=document.getElementById("myChartBorac");
        var nesto4=document.getElementById("myChartOrganizacija"); 
        nesto1.style.display="none";
        nesto2.style.display="none";
        nesto3.style.display="none";
        nesto4.style.display="flex";
        var i=0;
        var j=0;
        var vrednostx=[];
        var vrednosty=[];
       
    fetch("https://localhost:5001/Organizacija/PreuzmiOrganizacijeStubic" ,
    {  method: "GET"
    
    }).then(s=>
        {if(s.ok)
            {
                
                
                    s.json().then(data=>
                        {
                            data.forEach(p=>{
                                              
                            vrednostx[i++]=p.ime;
                            vrednosty[j++]=p.vrednost;
                           
                        }
                        )
                    }
                    )
                    
                }
            })
           
                 console.log(vrednostx);
                 console.log(vrednosty);
    

              var nesto1=  new Chart("myChartOrganizacija", {
                    type: "bar",
                    data: {
                    labels: vrednostx,
                    
                    datasets: [{
                    label:'Grafik Organizacija',
                     backgroundColor:  'rgb(255, 215, 0)',
                     
                    data: vrednosty
                    }]
                },
              /*  options: {
                    scales:{
                        yAxes:
                        [{
                            ticks:{
                                beginAtZero:true
                            }
                        }],
                        yAxes:
                        [{
                         ticks:{
                             fontSize:100
                         }
                        }]
                    }
                }*/
                options: {
                    scales: {
                      x: {
                        title: {
                          font: {
                            size: 40,
                            weight: "bold"
                          },
                          color: 'gold'
                        },
                
                        ticks: {
                          font: {
                            size: 30,
                            weight: "bold"
                          },
                          color: 'gold',
                        },
                      },
                
                      y: {
                        title: {
                          font: {
                            /*size: 40,*/
                           // weight: "bold"
                          },
                        //  color: 'gold'
                        },
                
                       /* ticks: {
                          //beginAtZero: true,
                          font: {
                            size: 40,
                            weight: "gold"
                          },
                          color: 'gold'
                        }*/
                      }
                    }
                  }
           });  
          // host.appendChild(Chart);
          
          
    }
   refreshStubice1(host)
   {
            let nesto=host.querySelectorAll(".FormaStubici1");
             host.removeChild(nesto);
         
   }
    refreshStubice(host)
    {      
        this.kont.removeChild(host);
        let forma = document.createElement("div");
        forma.className = "FormaStubici2";
        this.kont.appendChild(forma);
        return forma;
    }
    crtajStubiceArena(host)
    {
        var nesto1=document.getElementById("myChartOrganizacija");
        var nesto2=document.getElementById("myChartBorba");
        var nesto3=document.getElementById("myChartBorac");
         var nesto4=document.getElementById("myChartArena"); 
         nesto1.style.display="none";
         nesto2.style.display="none";
         nesto3.style.display="none";
         nesto4.style.display="flex";
      
    var i=0;
    var j=0;
    var vrednostx=[];
    var vrednosty=[];
  
fetch("https://localhost:5001/Arena/PreuzmiAreneStubic" ,
{  method: "GET"

}).then(s=>
    {if(s.ok)
        {
            
                s.json().then(data=>
                    {
                        data.forEach(p=>{
                                          
                        vrednostx[i++]=p.ime;
                        vrednosty[j++]=p.kapacitet;
                       
                    }
                    )
                }
                )            
                
            }
        })
        
         console.log(vrednostx);
         console.log(vrednosty);

           var nesto1= new Chart("myChartArena", {
                type: "bar",
                data: {
                labels: vrednostx,
                datasets: [{
                label:'Grafik Arena',
                 backgroundColor:  'rgb(89, 0, 238)',
                data: vrednosty,
               
                
                }]
            },
            options: {
                scales: {
                  x: {
                    title: {
                      font: {
                        size: 41,
                        weight: "bold"
                      },
                      color: 'gold'
                    },
            
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold"
                      },
                      color: 'gold',
                    },
                  },
            
                  y: {
                    title: {
                      font: {
                        /*size: 40,*/
                        //weight: "bold"
                      },
                     // color: 'gold'
                    },
            
                   /* ticks: {
                      //beginAtZero: true,
                      font: {
                        size: 40,
                        weight: "gold"
                      },
                      color: 'gold'
                    }*/
                  }
                }
              }
       }); 
      
    }
    crtajOrganizacije(host)
    {
        var host1 = this.refreshOrg(host);
 
        this.crtajFormuObrisiOrganizaciju(host1);
        this.crtajFormuDodajOrganizaciju(host1); 
        this.crtajFormuPomoc(host1);
    }
    crtajBorce(host)
    {
        host = this.refreshBorce(host);
        let btnVrati = document.createElement("button");
        btnVrati.innerHTML = "Vrati na pocetnu";
        btnVrati.onclick = (ev) => this.crtaj1(document.body);
      
        host.appendChild(btnVrati);

        let labelica=document.createElement("label");
        labelica.innerHTML="Provera knockout umetnike";
        
        host.appendChild(labelica);
        let btnKO = document.createElement("button");
        btnKO.innerHTML = "Provera za knockout umetnike";
        btnKO.onclick = (ev) => this.crtajFormuKOUmetnici(host);
        
        host.appendChild(btnKO);
        
     
      //  host.appendChild(btnDodajBorca);

        this.crtajFormuDodajBorca(host);
     
        this.crtajFormuBoracKategorija(host);
    }

    crtajBorbe12(host)
    {
       var host1 = this.refreshBorbe(host);
       
        let btnVrati = document.createElement("button");
        btnVrati.innerHTML = "Vrati na pocetnu";
        btnVrati.onclick = (ev) => this.crtaj1(document.body);
        host1.appendChild(btnVrati);

   
        this.crtajFormuBorbi(host1);
        
        this.crtajFormuGubitnik(host1);
        
        
    }
    crtajFormuGubitnik(host)
 {
      
    let red = this.crtajRed(host);
    red.className="redBorbe1";
   

    let l1=document.createElement("label");
    l1.innerHTML = "Izaberi arenu";
    red.appendChild(l1);

    let selectArena = document.createElement("select");
    selectArena.className = "selectArena1";
    red.appendChild(selectArena);

    let opcije;
    this.listaArena.forEach(p => {
        opcije = document.createElement("option");
        opcije.innerHTML = p.ime;
        opcije.value = p.id;
        selectArena.appendChild(opcije);

    })

    
    let l2=document.createElement("label");
    l2.innerHTML = "Lista pobednika";
    l2.className="l2";
    red.appendChild(l2);
    let cbbox=document.createElement("div");
    cbbox.cbbox="cbbox";
    //cbbox.className="cbbox";
    red.appendChild(cbbox);

    let cb;
    this.listaBorbi.forEach(x=>
        {
            cb=document.createElement("input");
            cb.type="checkbox";
        
            cb.value=x.pobednik;
            cbbox.appendChild(cb);
            
            l1=document.createElement("label");
            l1.innerHTML=x.pobednik;
            cbbox.appendChild(l1);
        })
        cbbox.className="combo1";
        let btnNadji=document.createElement("button");
        btnNadji.className="COMBO";
        btnNadji.onclick=(ev)=>this.nadjiGubitnike();
        btnNadji.innerHTML="Nadji drugog borca i nagradu";
        red.appendChild(btnNadji);


}
nadjiGubitnike()
{
    let optionel=this.kont.querySelector(".selectArena1");
             var id=optionel.options[optionel.selectedIndex].value;
            console.log(id);
                           // this.nadjiGubitnike(pobednik);
            let borci1=this.kont.querySelectorAll("input[type='checkbox']:checked");
            if(borci1===null){
              alert("Izaberi nekog borca");
                  return;
                }
             let nizPobednika="";
            for(let i=0;i<borci1.length;i++)
            {
               nizPobednika=nizPobednika.concat(borci1[i].value,",");
            }
                            
                            
            var niz=nizPobednika.substring(0,nizPobednika.length-1);
                            
             console.log(niz);
                            
           this.ucitajSve(id,niz);

}
crtajBorbe1(host)
{
    let provera = this.kont.querySelector(".Borbe1");//isto ime

    if (provera == null) {

        let kontBorbe = document.createElement("div");
        kontBorbe.className = "Borbe1";//isto ime
        host.appendChild(kontBorbe);

        var tabela = document.createElement("table");
        tabela.className = "tabela1";
        kontBorbe.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabelahead.className="thead";
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className = "TabelaPodaci1";
        tabela.appendChild(tabelaBody);

        let th;
        var zag = ["Prvi Borac","Drugi Borac","Novcana Nagrada"];
        zag.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
}
ucitajSve(id,niz){
        console.log(id);
        fetch("https://localhost:5001/Borba/PreuzmiGubitnike/"+id +"/" + niz,
        {
            
            method:"GET"
        }).then(s=>
            {if(s.status==200)
                {
                    let forma=this.kont.querySelector(".FormaBorbe");
                    this.crtajBorbe1(forma);
                    
                    
                    let teloTabele= this.osveziSadrzaj1();
                
                            s.json().then(data=>{
                                data.forEach(t=>
                                    {   
                                       
                                        let borbe2=new Borbe2(t.prviBorac,t.drugiBorac,t.nagrada);
                                      console.log(borbe2);
                                        borbe2.crtajtabelicuBorbe2(teloTabele);    
                                    })
                                    console.log(data);
                                    
                                })
                            }
                            else{
                                if(s.status==400||s.status==404)
                                {
                                    alert("Greska!!!");
                                }
                            }
                            })
        }

crtajFormuBoracKategorija(host)
{
   
    let red = this.crtajRed(host);
   

    let header = document.createElement("h1");
    header.innerHTML = "Borci u kategorijama";
    red.appendChild(header);

let l1=document.createElement("label");
    l1.innerHTML = "Ukucaj kategoriju";
    red.appendChild(l1);

    let inputkat = document.createElement("input");
    inputkat.type = "text";
    inputkat.className="in5";
    red.appendChild(inputkat);
    let btnNadji = document.createElement("button");
    btnNadji.innerHTML = "Nadji borce";
    btnNadji.onclick = (ev) => this.KategorijaBorca(inputkat.value);
    red.appendChild(btnNadji);

}
crtajBorcePoKategoriji(host)
{
    let provera = this.kont.querySelector(".BorciKat");
    if (provera == null) {

        let kontBorciKat = document.createElement("div");
        kontBorciKat.className = "BorciKat";
        host.appendChild(kontBorciKat);

        var tabela = document.createElement("table");
        tabela.className = "tabela1";
        kontBorciKat.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className = "TabelaPodaciBorci1";
        tabela.appendChild(tabelaBody);

        let th;
        var zag = ["ID Borca","Ime", "Prezime","Broj Pobeda","Broj Poraza","Knockout Ratio"];
        zag.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
}
KategorijaBorca(kat)
{
    if(kat==""|| kat==null || kat==undefined)
    {
        alert("Molimo Vas unesite kategoriju!!!");
        exit(0);
    }
    fetch("https://localhost:5001/Borac/PreuzmiBorcaByKat/" + kat,
    {  method: "GET"
  
  }).then(s=>
        {if(s.status==200)
            {
             let forma=this.kont.querySelector(".FormaBorci");
             this.crtajBorcePoKategoriji(forma);

             
            
                        let teloTabele= this.osveziSadrzajBorci1();
                        s.json().then(data=>{
                            data.forEach(t=>
                                {   
                                   
                                    let borciKategorija=new BoracKat(t.id,t.ime,t.prezime,t.brojPobeda,t.brojPoraza,t.knockoutRatio);
                                  console.log(borciKategorija);
                                    borciKategorija.crtajtabelicuBoracKat(teloTabele);    
                                })
                                
                                
                            })
                        }
                        else{
                            if(s.status==400 || s.status==404)
                            {
                                alert("Greska kod kategorije!!! Nepostojeca kategorija!!!");
                            }
                        }
                        })
}
crtajFormuPomoc(host)
{
    
    let red = this.crtajRed(host);
    
    let header = document.createElement("h1");
    header.innerHTML = "Pomoc";
    red.appendChild(header);
    
    let l1=document.createElement("label");
    l1.innerHTML = "Izaberi organizaciju";
    red.appendChild(l1);
    
    let selectOrg = document.createElement("select");
    selectOrg.className = "selectOrganizaciju";
    red.appendChild(selectOrg);
    
    let opcije;
    this.listaOrganizacija.forEach(p => {
        opcije = document.createElement("option");
        opcije.innerHTML = p.ime;
        opcije.value = p.ime;
        selectOrg.appendChild(opcije);
        
    })
    //
    let btnNadji = document.createElement("button");
    btnNadji.innerHTML = "Pomogni organizaciji sredstvima";
    btnNadji.className="dugmence";
    btnNadji.onclick = (ev) => this.PruziPomoc();
    red.appendChild(btnNadji);
    
    let btnVrati = document.createElement("button");
    btnVrati.className="dugmence1";
        btnVrati.innerHTML = "Vrati na pocetnu";
        btnVrati.onclick = (ev) => this.crtaj1(document.body);
        red.appendChild(btnVrati);


}
PruziPomoc()
{
    let optionEl = this.kont.querySelector(".selectOrganizaciju");
    var imeOrg = optionEl.options[optionEl.selectedIndex].value;
    console.log(imeOrg);

    this.Pomoc(imeOrg)
}
Pomoc(ime)
{
    if(ime===null || ime===undefined || ime===""){
        alert("Unesite naziv organizacije!");
        exit(0);
    }
    fetch("https://localhost:5001/Organizacija/PomocOrganizacijama/" + ime,
    {  method: "PUT"
  
  }).then(s=>
        {if(s.status==200)
            {
               
                
                s.json().then(data=>{
                  alert("Izabranoj organizaciji su uspesno dodeljena sredstva pomoci");
                        console.log(data);
                            })
                        }
                        else{
                            if(s.status==400 || s.status==404)
                            {
                                alert("Greska kod dodele pomoci");
                            }
                        }
                        })
                      
}
crtajBorceSaKoPreko50(host)
{
    let provera = this.kont.querySelector(".Borci");
    if (provera == null) {

        let kontBorci = document.createElement("div");
        kontBorci.className = "Borci";
        host.appendChild(kontBorci);

        var tabela = document.createElement("table");
        tabela.className = "tabela";
        kontBorci.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className = "TabelaPodaciBorci";
        tabela.appendChild(tabelaBody);

        let th;
        var zag = ["ID Borca","Ime", "Prezime","Kategorija","Broj Pobeda","Broj Poraza","Knockout Ratio"];
        zag.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
}
crtajFormuKOUmetnici(host)
{
  


    fetch("https://localhost:5001/Borac/Preuzmi Borca i sve informacije o njemu",
    {  method: "GET"
  
  }).then(s=>
        {if(s.status==200)
            {
             let forma=this.kont.querySelector(".FormaBorci");
             this.crtajBorceSaKoPreko50(forma);

             
            
                        let teloTabele= this.osveziSadrzajBorci();
                        s.json().then(data=>{
                            data.forEach(t=>
                                {   
                                   
                                    let fajter=new BoracKo(t.id,t.ime,t.prezime,t.kategorija,t.brojPobeda,t.brojPoraza,t.knockoutRatio);
                                  console.log(fajter);
                                    fajter.crtajtabelicuFajtera(teloTabele);    
                                })
                                console.log(data);
                                
                            })
                        }
                        else{
                            if(s.status==400 || s.status==404)
                            {
                                alert("Greska!!!");
                            }
                        }
                        })


}

crtajFormuObrisiOrganizaciju(host)
{
  
    let red = this.crtajRed(host);

    let header = document.createElement("h1");
    header.innerHTML = "Uneti ime organizacije";
    header.className="jedinica";
    red.appendChild(header);

    let l = document.createElement("label");
    l.innerHTML = "Naziv organizacije koja se proverava : ";
    red.appendChild(l);
    let inputNaziv = document.createElement("input");
    inputNaziv.className="in4"
    inputNaziv.type = "text";
    red.appendChild(inputNaziv);

    let btnProvera = document.createElement("button");
    btnProvera.className="dugmence";
        btnProvera.innerHTML = "Izvrsi proveru";
        btnProvera.onclick = (ev) => this.ProveriOrganizaciju(inputNaziv.value);
        red.appendChild(btnProvera);
}
crtajFormuDodajOrganizaciju(host)
{
    
    let red = this.crtajRed(host);
    
    let header = document.createElement("h1");
    header.innerHTML = "Dodaj novu organizaciju";
  //  header.className="organ";
    red.appendChild(header);
    
        let l = document.createElement("label");
        l.innerHTML = "Naziv organizacije: ";
        red.appendChild(l);
        let inputNaziv = document.createElement("input");
        inputNaziv.className="in1"
       
        inputNaziv.type = "text";
        red.appendChild(inputNaziv);

       
        l = document.createElement("label");
        l.innerHTML = "Osnivac organizacije: ";
      
        red.appendChild(l);
        let inputOsnivac = document.createElement("input");
        inputOsnivac.className="in2"
      
        inputOsnivac.type = "text";
        red.appendChild(inputOsnivac);

       
        l = document.createElement("label");
        l.innerHTML = "Vrednost organizacije : ";
       
       red.appendChild(l);
        let inputVrednost = document.createElement("input");
        inputVrednost.className="in3";
     
        inputVrednost.type = "number";
        red.appendChild(inputVrednost);
        
        let btnDodaj = document.createElement("button");
        btnDodaj.className="dugmence";
        btnDodaj.innerHTML = "Dodaj novu organizaciju";
       
        btnDodaj.onclick = (ev) => this.DodajOrganizaciju(inputNaziv.value, inputOsnivac.value,inputVrednost.value);
        red.appendChild(btnDodaj);
        
}
crtajFormuDodajBorca(host)
{
   
    
    let red = this.crtajRed(host);
    red.className="redBorci";

    let div1=document.createElement("div");
    div1.className="div1";
    

    let div2=document.createElement("div");
    div2.className="div2";

    let div3=document.createElement("div");
    div3.className="div3";

    let div4=document.createElement("div");
    div4.className="div4";

    let div5=document.createElement("div");
    div5.className="div5";

    let div6=document.createElement("div");
    div6.className="div6";

    let div7=document.createElement("div");
    div7.className="div7";
    

    let header = document.createElement("h1");
    header.innerHTML = "Unesi podatke";
    red.appendChild(header);

    let l = document.createElement("label");
    l.className="labelaBorac";
    l.innerHTML = "Ime: ";
    div1.appendChild(l);

    let inputIme = document.createElement("input");
    inputIme.className = "Input"
    inputIme.type = "text";
    div1.appendChild(inputIme);
    ///////////////////////////////
    red.appendChild(div1);
  

    l = document.createElement("label");
    
   l.innerHTML = "Prezime: ";
   div2.appendChild(l);
  
  
   let inputPrezime = document.createElement("input");
   inputPrezime.className = "Input"
   inputPrezime.type = "text";
   div2.appendChild(inputPrezime);
   red.appendChild(div2);
   /////////////////////////////////////////
   l = document.createElement("label");
   
   l.innerHTML = "Kategorija: ";
   div3.appendChild(l);
   
   
   let inputKategorija = document.createElement("input");
   inputKategorija.className = "Input"
   inputKategorija.type = "text";
   div3.appendChild(inputKategorija);
   red.appendChild(div3);


   l = document.createElement("label");
   
   l.innerHTML = "KO Ratio:";
  div4.appendChild(l);
  
   let inputKO = document.createElement("input");
   inputKO.className = "Input"
   inputKO.type = "number";
   div4.appendChild(inputKO);
   red.appendChild(div4);

l = document.createElement("label");
l.innerHTML = "Pobede:";
div5.appendChild(l);

let inputPobede = document.createElement("input");
inputPobede.className = "Input"
inputPobede.type = "number";
div5.appendChild(inputPobede);
red.appendChild(div5);



l = document.createElement("label");

l.innerHTML = "Porazi:";
div6.appendChild(l);

let inputPorazi = document.createElement("input");
inputPorazi.className = "Input"
inputPorazi.type = "number";
div6.appendChild(inputPorazi);
red.appendChild(div6);



l = document.createElement("label");
l.innerHTML = "Ranking:";
div7.appendChild(l);

let inputRanking = document.createElement("input");
inputRanking.className = "Input"
inputRanking.type = "number";
div7.appendChild(inputRanking);
red.appendChild(div7);



    let btnDodajBorca = document.createElement("button");
    btnDodajBorca.innerHTML = "Izmeni borca";
    btnDodajBorca.onclick = (ev) => this.dodajBorca(inputIme.value,inputPrezime.value,inputKategorija.value,inputKO.value,inputPobede.value,inputPorazi.value,inputRanking.value);
    red.appendChild(btnDodajBorca);

}
crtajFormuBorbi(host)
{

        let red = this.crtajRed(host);
        red.className="redBorbe";
        let l1 = document.createElement("label");
        
        l1.innerHTML = "Borbe";
        red.appendChild(l1);

        let selectBorbe = document.createElement("select");
        selectBorbe.className = "selectBorbe";
        red.appendChild(selectBorbe);

        let opcije;
        this.listaBorbi.forEach(p => {
            opcije = document.createElement("option");
            opcije.innerHTML = p.prvi + "  VS  " + p.drugi;
            opcije.value = p.nagrada;
            selectBorbe.appendChild(opcije);

        })

        let btnNadji = document.createElement("button");
        btnNadji.innerHTML = "Nadji pobednika i nagradu";
        btnNadji.className="nadjiborbe";
        btnNadji.onclick = (ev) => this.nadjiBorbe();
        red.appendChild(btnNadji);


   
}

crtajRed(host) {
    let red = document.createElement("div");
    red.className = "red";
    host.appendChild(red);
    return red;
}
crtajBorbe(host)
{  
    let provera = this.kont.querySelector(".Borbe");
    if (provera == null) {

        let kontBorbe = document.createElement("div");
        kontBorbe.className = "Borbe";
        host.appendChild(kontBorbe);

        var tabela = document.createElement("table");
        tabela.className = "tabela";
        kontBorbe.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className = "TabelaPodaci";
        tabela.appendChild(tabelaBody);

        let th;
        var zag = ["Pobednik", "Nagrada"];
        zag.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
}
crtajArene(host)
{
    let provera = this.kont.querySelector(".Arene");
    if (provera == null) {

        let kontBorbe = document.createElement("div");
        kontBorbe.className = "Arene";
        host.appendChild(kontBorbe);

        var tabela = document.createElement("table");
        tabela.className = "tabela";
        kontBorbe.appendChild(tabela);

        var tabelahead = document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className = "TabelaPodaci";
        tabela.appendChild(tabelaBody);

        let th;
        var zag = ["ArenaID", "Ime","Drzava","Kapacitet"];
        zag.forEach(el => {
            th = document.createElement("th");
            
              var one=el.id;
                th.innerHTML=one;
            
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
}
osveziSadrzajBorci()
 {  var teloTabeleX = this.kont.querySelector(".tabela1");
 if(teloTabeleX!=null){
 
 teloTabeleX.style.display="none";

 }
 var teloTabeleY = this.kont.querySelector(".tabela");
 console.log(teloTabeleY);
 if(teloTabeleY.style.display=="none")
 {
     teloTabeleY.style.display="block";
     console.log(teloTabeleY);
 }
    var teloTabele = this.kont.querySelector(".TabelaPodaciBorci");
    var roditelj = teloTabele.parentNode;
    roditelj.removeChild(teloTabele);

    teloTabele = document.createElement("tbody");
    
    teloTabele.className = "TabelaPodaciBorci";
    
    roditelj.appendChild(teloTabele);
    return teloTabele;
}
osveziSadrzajBorci1()
{
    var teloTabeleX = this.kont.querySelector(".tabela");
    if(teloTabeleX!=null){
   
  teloTabeleX.style.display="none";

    }
    var teloTabeleY = this.kont.querySelector(".tabela1");
    console.log(teloTabeleY);
    if(teloTabeleY.style.display=="none")
    {
        teloTabeleY.style.display="block";
        console.log(teloTabeleY);
    }

    var teloTabele = this.kont.querySelector(".TabelaPodaciBorci1");
    var roditelj = teloTabele.parentNode;
    roditelj.removeChild(teloTabele);

    teloTabele = document.createElement("tbody");
    
    teloTabele.className = "TabelaPodaciBorci1";
    
    roditelj.appendChild(teloTabele);
    return teloTabele;
}
osveziSadrzaj()
{var teloTabeleX = this.kont.querySelector(".tabela1");
if(teloTabeleX!=null){

teloTabeleX.style.display="none";

}

var teloTabeleY = this.kont.querySelector(".tabela");
console.log(teloTabeleY);
if(teloTabeleY.style.display=="none")
{
    teloTabeleY.style.display="block";
    console.log(teloTabeleY);
}
var teloTabele = this.kont.querySelector(".TabelaPodaci");
var roditelj = teloTabele.parentNode;
roditelj.removeChild(teloTabele);
    

    teloTabele = document.createElement("tbody");
    
    teloTabele.className = "TabelaPodaci";
    
    roditelj.appendChild(teloTabele);
    return teloTabele;
}
osveziSadrzaj1()
{

    var teloTabeleX = this.kont.querySelector(".tabela");
    if(teloTabeleX!=null){
   
    teloTabeleX.style.display="none";

    }
    var teloTabeleY = this.kont.querySelector(".tabela1");
    console.log(teloTabeleY);
    if(teloTabeleY.style.display=="none")
    {
        teloTabeleY.style.display="block";
        console.log(teloTabeleY);
    }

    var teloTabele = this.kont.querySelector(".TabelaPodaci1");
    var roditelj = teloTabele.parentNode;
    roditelj.removeChild(teloTabele);


    teloTabele = document.createElement("tbody");
    
    teloTabele.className = "TabelaPodaci1";
    
    roditelj.appendChild(teloTabele);
    return teloTabele;
}
refreshBorce(host) {
    this.kont.removeChild(host);

    let forma = document.createElement("div");
    forma.className = "FormaBorci";
    this.kont.appendChild(forma);
    return forma;
}
refreshBorbe(host) {
    this.kont.removeChild(host);

    let forma = document.createElement("div");
    forma.className = "FormaBorbe";
    this.kont.appendChild(forma);
    return forma;
}
refreshArena(host) {
    this.kont.removeChild(host);

    let forma = document.createElement("div");
    forma.className = "FormaArena";
    this.kont.appendChild(forma);
    return forma;
}
refreshOrg(host) {
    this.kont.removeChild(host);
  
    let forma = document.createElement("div");
    forma.className = "FormaOrg";
    this.kont.appendChild(forma);
    return forma;
}

nadjiBorbe()
{
    let optionEl = this.kont.querySelector(".selectBorbe");
    var nagradaB = optionEl.options[optionEl.selectedIndex].value;
    console.log(nagradaB);

    this.ucitajBorbe(nagradaB)
}
crtajFormuArena(host)
{
    var host1=this.refreshArena(host);
   
let btnVrati = document.createElement("button");
        btnVrati.innerHTML = "Vrati na pocetnu";
        btnVrati.onclick = (ev) => this.crtaj1(document.body);
        host1.appendChild(btnVrati);

       let red = this.crtajRed(host);
       red.className="redArena";     
       host1.appendChild(red);  
       let l = document.createElement("label");
       l.innerHTML = "Ukucaj minimalni kapacitet za odrzavanje super eventa: ";
       red.appendChild(l);
       let inputKapacitet = document.createElement("input");
       inputKapacitet.className = "Input"
       inputKapacitet.type = "number";
       red.appendChild(inputKapacitet);
       
       let btnNadjiArene = document.createElement("button");
       btnNadjiArene.className="b1";
       btnNadjiArene.innerHTML = "Pronadji arene";
       btnNadjiArene.onclick = (ev) => this.nadjiArenezaPrikaz(inputKapacitet.value);
       red.appendChild(btnNadjiArene);
      //  red = this.crtajRed(host);       
        l = document.createElement("label");
       l.innerHTML = "Ukucaj kapacitet ispod kojeg se brisu arene: ";
       red.appendChild(l);
       let inputKapMin = document.createElement("input");
       inputKapMin.className = "Input"
       inputKapMin.type = "number";
       red.appendChild(inputKapMin);
        
       
       
       let btnBrisiArene = document.createElement("button");
       btnBrisiArene.className="b1";
       btnBrisiArene.innerHTML = "Obrisi arene";
       btnBrisiArene.onclick = (ev) => this.BrisiArene(inputKapMin.value);
       red.appendChild(btnBrisiArene);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

l = document.createElement("label");
l.innerHTML = "Dodaj COVID politiku: ";
red.appendChild(l);

       let selectCOVID = document.createElement("select");
        selectCOVID.className = "selectCOVID";
        red.appendChild(selectCOVID);

        let opcije;
        this.listaArena.forEach(p => {
            opcije = document.createElement("option");
            opcije.innerHTML = p.ime;
            opcije.value = p.ime;
            selectCOVID.appendChild(opcije);

        })

        let btnCovid = document.createElement("button");
        btnCovid.className="b1";
        btnCovid.innerHTML = "Dodaj COVID politiku";
        btnCovid.onclick = (ev) => this.DodajCovid();
        red.appendChild(btnCovid);

       
}
DodajCovid()
{
    let optionEl = this.kont.querySelector(".selectCOVID");
    var imeArene = optionEl.options[optionEl.selectedIndex].value;
    console.log(imeArene);

    this.PromeniCovid(imeArene)
}
PromeniCovid(ime)
{
    if(ime=="" || ime==null || ime==undefined)
    {
        alert("Molimo Vas unesite ime arene kojoj ce se dodati COVID politika!!!");
        exit(0);
    }
    fetch("https://localhost:5001/Arena/IzmeniArenuCovid/" + ime,
    {  method: "PUT"
  
  }).then(s=>
        {if(s.status==200)
            {
               
                
                s.json().then(data=>{
                  alert("Izabranoj areni uspesno dodata COVID politika");
                        console.log(data);
                            })
                        }
                        else{
                            if(s.status==400 || s.status==404)
                            {
                                alert("Greska!!! Odabrana arena vec ima svoju COVID politiku!!!");
                            }
                        }
                        })
}
BrisiArene(kap)
{
    if(kap=="" || kap==undefined || kap==null)
    {
        alert("Greska kod kapaciteta!!! Unesi kapacitet!!!");
        exit(0);
    }
    fetch("https://localhost:5001/Arena/ObrisiAreneSaNedovoljnimKapacitetom/" + kap,
    {  method: "DELETE"
  
  }).then(s=>
        {if(s.status==200)
            {
                        
                        s.json().then(data=>{
                       alert("Uspesno obrisane arene!!!")
                                console.log(data);
                                
                            })
                        }
                        else{
                            if(s.status==400 || s.status==404)
                            {
                                alert("Uneli ste neprihvatljiv kapacitet!!!");
                            }

                        }
                        })
}
nadjiArenezaPrikaz(kap){
    if(kap===null || kap===undefined || kap===""){
        alert("Unesite kapacitet arene!");
        exit(0);
    }
        fetch("https://localhost:5001/Arena/PreuzmiArenice/" + kap,
        {  method: "PUT"
      
      }).then(s=>
            {if(s.status==200)
                {
                 let forma=this.kont.querySelector(".FormaArena");
                 this.crtajArene(forma);

                
                
                            let teloTabele= this.osveziSadrzaj();
                            s.json().then(data=>{
                                data.forEach(t=>
                                    {   
                                       
                                        let arenica=new Arena(t.id,t.ime,t.drzava,t.kapacitet);
                                      console.log(arenica);
                                        arenica.crtajtabelicuArene(teloTabele);    
                                    })
                                    console.log(data);
                                    
                                })
                            }
                            else{
                                if(s.status==400 || s.status==404)
                                alert("Unet je neprihvatljiv kapacitet arene!!!");
                            }
                            })
                            

}



ucitajBorbe(nagradaB)
{   console.log(nagradaB)
    if(nagradaB=="" || nagradaB==undefined || nagradaB==null)
    {
        alert("Greska kod nagrade!!!");
        exit(0);
    }
    fetch("https://localhost:5001/Borba/OdstampajBorbe/" + nagradaB,
    {  method: "PUT"
  
  }).then(s=>
        {if(s.ok)
            {
                let forma=this.kont.querySelector(".FormaBorbe");
                this.crtajBorbe(forma);
                
                
                let teloTabele= this.osveziSadrzaj();
                s.json().then(data=>{
                    data.forEach(t=>
                        {   
                            
                            let fajt=new BorbaNagrade(t.pobednik,t.nagrada);
                            console.log(fajt);
                            fajt.crtajtabelicuBorbe(teloTabele);  
                           
                        })
                        
                              
                            })
                        }

                        else
                        {
                            if(s.status==400 || s.status==404)
                            {
                                alert("Greska!!!");
                            }
                        }
                        })
    }

dodajBorca(ime,prezime,kategorija,knockoutRatio,brojPobeda,brojPoraza,ranking)
{   console.log(ime)
    console.log(prezime)
    console.log(kategorija)
    if(ime===null || ime===undefined || ime===""){
        alert("Unesite ime borca!");
        exit(0);
    }
    if(prezime===null || prezime===undefined || prezime===""){
        alert("Unesite prezime borca!");
        exit(0);
    }
    if(kategorija===null || kategorija===undefined || kategorija===""){
        alert("Unesite kategoriju borca!");
        exit(0);
    }
   
    if(knockoutRatio===null || knockoutRatio===undefined || knockoutRatio===""){
        alert("Unesite KO ratio!");
        exit(0);
    }
    if(brojPobeda===null || brojPobeda===undefined || brojPobeda===""){
        alert("Unesite broj pobeda!");
        exit(0);
    }
    if(brojPoraza===null || brojPoraza===undefined || brojPoraza===""){
        alert("Unesite broj poraza!");
        exit(0);
    }
    if(ranking===null || ranking===undefined || ranking===""){
        alert("Unesite ranking!");
        exit(0);
    }
    fetch("https://localhost:5001/Borac/PromeniBorca/" +ime + "/" + prezime + "/" + kategorija + "/" + knockoutRatio + "/" + brojPobeda + "/" + brojPoraza + "/" + ranking,
    {
        method: "PUT"
    }).then(s => {
        if (s.status == 200) {
            s.json().then(data => {
                console.log(data);
                alert("Borac sa id-jem: " + data + " je izmenjen");
              
            })
        }
        else {
            if (s.status == 202) {
                s.json().then(data=>{
                   
                    alert("Borac koji ima id " + data +  " postoji u bazi");
                
                });
            }
            if(s.status==404 || s.status==400)
            {
                alert("Takav borac ne postoji!");
            }

        }
    })
    .catch(p => {
        console.log(p);
        alert("Greška u dodavanju borca.");
    });

}
DodajOrganizaciju(naziv,osnivac,vrednost)
{
    if(naziv===null || naziv===undefined || naziv===""){
        alert("Unesite naziv organizacije!");
        exit(0);
    }
    if(osnivac===null || osnivac===undefined || osnivac===""){
        alert("Unesite osnivaca organizacije!");
        exit(0);
    }
    if(vrednost===null || vrednost===undefined || vrednost===""){
        alert("Unesite vrednost organizacije!");
        exit(0);
    }
    fetch("https://localhost:5001/Organizacija/DodajOrganizatora/" + naziv + "/" + osnivac + "/" + vrednost,
    {
        method: "POST"
    }).then(s => {
        if (s.status == 200) {
            s.json().then(data => {
                console.log(data);
                alert("Nova organizacija je dodata!!!");
             
            })
        }
        else {
            if (s.status == 202) {
                s.json().then(data=>{
                   
                    alert("Organizacija vec postoji u bazi");
                
                });
            }
            if(s.status==404 || s.status==400)
            {
                alert("Los unos!");
            }

        }
    })
    .catch(p => {
        console.log(p);
        alert("Greška u dodavanju organizacije.");
    });
}
ProveriOrganizaciju(naziv)
{
    if(naziv===null || naziv===undefined || naziv===""){
        alert("Unesite naziv organizacije!");
        exit(0);
    }
    fetch("https://localhost:5001/Organizacija/Obrisi Organizaciju/" + naziv,
    {
        method: "DELETE"
    }).then(s => {
        if (s.status == 200) {
            s.json().then(data => {
                console.log(data);
                alert("Organizacija nema dovoljno sredstava za organizovanje borbi , a samim tim je i izbacena!!!");
               
            })
        }
        else {
            if (s.status == 202) {
                s.json().then(data=>{
                   
                    alert("Organizacija vec postoji u bazi");
                
                });
            }
            if(s.status==404 || s.status==400)
            {
                alert("Organizacija ne postoji!!!");
            }

        }
    })
    .catch(p => {
        console.log(p);
        alert("Greška u dodavanju organizacije.");
    });

}
}




