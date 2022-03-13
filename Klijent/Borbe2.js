export class Borbe2{
    constructor(prviBorac,drugiBorac,novcanaNagrada){
        this.prviBorac=prviBorac
        this.drugiBorac=drugiBorac
      
        this.novcanaNagrada=novcanaNagrada
    }


    crtajtabelicuBorbe2(host)
    {

        var tr=document.createElement("tr");
        host.appendChild(tr);
    
    var el=document.createElement("td");
    el.innerHTML=this.prviBorac;
    tr.appendChild(el);
    el=document.createElement("td");
    el.innerHTML=this.drugiBorac;
    tr.appendChild(el);

    el=document.createElement("td");
    el.innerHTML=this.novcanaNagrada;
    tr.appendChild(el);

    
    
    }

}