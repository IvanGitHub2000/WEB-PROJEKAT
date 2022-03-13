export class BoracKat
{
    constructor(id,ime,prezime,brojPobeda,brojPoraza,koratio){
        this.id=id
        this.ime=ime
        this.prezime=prezime
        this.brojPobeda=brojPobeda
        this.brojPoraza=brojPoraza
        this.koratio=koratio
    }
    
    crtajtabelicuBoracKat(host)
    {

        var tr = document.createElement("tr");
        host.appendChild(tr);
    
        var el = document.createElement("td");
        el.innerHTML = this.id;
        tr.appendChild(el);
    
        el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el)
    
        el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el)
        
        el = document.createElement("td");
        el.innerHTML = this.brojPobeda;
        tr.appendChild(el)
    
        el = document.createElement("td");
        el.innerHTML = this.brojPoraza;
        tr.appendChild(el)
    
        el = document.createElement("td");
        el.innerHTML = this.koratio;
        tr.appendChild(el)

    }
}