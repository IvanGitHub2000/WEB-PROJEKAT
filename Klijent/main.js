import { org } from "./org.js";
import {Arena} from "./Arena.js";
import {Borba}from "./Borba.js";
import{Borac} from "./Borac.js";
import {Organizacija} from "./Organizacija.js"
//let org2=new Organizacija(0,null,null,0);
//org2.crtaj(document.body);
//var IDorganizacije=org.vratiIndeks();
//console.log(IDorganizacije);
//console.log(org.vratiIndeks());
//console.log(org.id);
var listaOrganizacija=[];

fetch("https://localhost:5001/Organizacija/PreuzmiOrganizacije", {
        method: "GET"
    }).then(p =>
      { p.json().then(organizacije=>{
      organizacije.forEach(organizacija => {
        var o=new Organizacija(organizacija.id,organizacija.ime,organizacija.osnivac,organizacija.vrednost);
        listaOrganizacija.push(o);
      });
 var listaArena=[];
  fetch("https://localhost:5001/Arena/PreuzmiArenuPoIDOrganizacije", {
    method: "GET"
  }).then(p =>
      { p.json().then(arene=>{
        arene.forEach(arena => {
          var p=new Arena(arena.id,arena.ime,arena.drzava,arena.kapacitet);
          listaArena.push(p);
        });
        var listaBorbi=[];
        fetch("https://localhost:5001/Borba/PreuzmiBorbeById", {
          method: "GET"
        }).then(p =>
          { p.json().then(borbe=>{
            borbe.forEach(borba => {
              var p=new Borba(borba.id,borba.prvi,borba.drugi,borba.pobednik,borba.nagrada);
              listaBorbi.push(p);
            });
          })
          var listaBoraca=[];
          fetch("https://localhost:5001/Borac/PreuzmiBorcaById", {
            method: "GET"
          }).then(p =>
            { p.json().then(borci=>{
              borci.forEach(borac => {
                var p=new Borac(borac.id,borac.ime,borac.prezime,borac.kategorija,borac.ranking,borac.brojPobeda,borac.brojPoraza,
                  borac.koratio);
                listaBoraca.push(p);
              });
              var o=new org(listaOrganizacija,listaArena,listaBorbi,listaBoraca);
              //var o1=new org(listaOrganizacija,listaArena,listaBorbi,listaBoraca);
                    o.crtaj1(document.body);
                  // o1.crtaj1(document.body);
                  //  o.crtaj2(document.body);
                  //  o.crtaj3(document.body);

              })
                })
              console.log(listaBoraca);
            })
          console.log(listaBorbi);
        })
        })
    console.log(listaArena);
    })
      })
      console.log(listaOrganizacija);
    
  
 //************************************************************************* */
/*let listaOrganizacija=[];

fetch("https://localhost:5001/Organizacija/PreuzmiOrganizacije", {
        method: "GET"
    }).then(p =>
      { p.json().then(organizacije=>{
      organizacije.forEach(organizacija => {
        let o=new Organizacija(organizacija.id,organizacija.ime,organizacija.osnivac,organizacija.vrednost);
        listaOrganizacija.push(o);
      });
      let listaBorbi=[];
        fetch("https://localhost:5001/Borba/PreuzmiBorbeById", {
          method: "GET"
        }).then(p =>
          { p.json().then(borbe=>{
            borbe.forEach(borba => {
              let p1=new Borba(borba.id,borba.prvi,borba.drugi,borba.pobednik,borba.nagrada);
              listaBorbi.push(p1);
            });
            var o=new org(listaOrganizacija,listaBorbi);
                    o.crtaj1(document.body);
          })
        })
        console.log(listaBorbi);
      })
      console.log(listaOrganizacija);
      })
    */