//import { Organizacija } from "./Organizacija";
export class Arena{

    constructor(id,ime, drzava,kapacitet){
   
        this.id = id
        this.ime = ime
        this.drzava=drzava
        this.kapacitet = kapacitet;
     
    }


crtajtabelicuArene(host)
{
    var tr=document.createElement("tr");
    host.appendChild(tr);


var el=document.createElement("td");
el.innerHTML=this.id;
tr.appendChild(el);
el=document.createElement("td");
el.innerHTML=this.ime;
tr.appendChild(el);
el=document.createElement("td");
el.innerHTML=this.drzava;
tr.appendChild(el);
el=document.createElement("td");
el.innerHTML=this.kapacitet;
tr.appendChild(el);
}

}