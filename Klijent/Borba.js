export class Borba{

constructor(id,prvi,drugi,pobednik,nagrada){

this.id=id;
this.prvi=prvi;
this.drugi=drugi;
this.pobednik=pobednik
this.nagrada=nagrada
}
crtajBorbe(host) {

    var tr = document.createElement("tr");
    host.appendChild(tr);

    var el = document.createElement("td");
    el.innerHTML = this.pobednik;
    tr.appendChild(el);

    el = document.createElement("td");
    el.innerHTML = this.nagrada;
    tr.appendChild(el);
}



}