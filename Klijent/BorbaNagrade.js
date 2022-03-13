export class BorbaNagrade
{
    constructor(pobednik,nagrade)
    {
        
        this.pobednik=pobednik
        this.nagrade=nagrade
    }
    crtajtabelicuBorbe(host)
    {

    var tr=document.createElement("tr");
    host.appendChild(tr);
   var el=document.createElement("td");
    el.innerHTML=this.pobednik;
    tr.appendChild(el);
    el=document.createElement("td");
    el.innerHTML=this.nagrade;
    tr.appendChild(el);

    }
}