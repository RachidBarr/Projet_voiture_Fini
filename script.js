var urlApi = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=vehicules-commercialises&facet=marque&facet=modele_utac&facet=carburant&facet=hybride&facet=puissance_administrative&facet=boite_de_vitesse&facet=annee&facet=carrosserie&facet=gamme";

function GetModele(marque){

   var xhttp = new XMLHttpRequest();
    var url = urlApi + "&q=" + marque;

    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      var nomMarque = document.getElementById("NomMarque");
      nomMarque.innerHTML = marque;

      ElementAAfficher(false, true, false);

      ListerModele(result);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

}

function ListerModele(listeModele){
    var elements = "";
    var containerModele = document.getElementById("ListeModele");
    containerModele.innerHTML = "";

    var nomDesModeles = [];
    var nouvelleListeModele = [];
    for(var i = 0; i < listeModele.records.length; i++){

        var modele = listeModele.records[i];
        var nom = modele.fields.modele_dossier;

        if(!nomDesModeles.includes(nom)){
            nomDesModeles.push(nom);
            nouvelleListeModele.push(modele);
        }
    } 

    for(var i = 0; i < nouvelleListeModele.length; i++){

        var modele = nouvelleListeModele[i];
        var nom = modele.fields.modele_dossier;
 
        var btn = document.createElement("button");

        btn.value = nom;
        btn.innerHTML = nom;
        
        btn.classList.add("modele");

        btn.addEventListener("click", function(e){
            AfficherInfo(e);
        });

        containerModele.appendChild(btn);
    }

}

 

function AfficherInfo(e){
    var modele = e.currentTarget.value;
    var xhttp = new XMLHttpRequest();
    var url = urlApi + "&q=" + modele;

    var info_nom = document.getElementById("info_nom");
    var info_carburant = document.getElementById("info_carburant");
    var info_co2 = document.getElementById("info_co2");
    var info_consourbaine = document.getElementById("info_consourbaine");
    var info_consomix = document.getElementById("info_consomix");


    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      var res = result.records[0];

      info_nom.innerHTML = modele;
      info_carburant.innerHTML = res.fields.carburant;
      info_consourbaine.innerHTML = res.fields.consommation_urbaine_l_100km;
      info_consomix.innerHTML = res.fields.consommation_mixte_l_100km;
      info_co2.innerHTML = res.fields.co2_g_km;

      ElementAAfficher(false, false, true);

    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function ElementAAfficher(affMarque, affModele, affInfo){
    var blocMarque = document.getElementById("BlocMarque");
    var blocModele = document.getElementById("BlocModele");
    var blocInfo = document.getElementById("BlocInfo");

    blocMarque.classList.add("cacher");
    blocModele.classList.add("cacher");
    blocInfo.classList.add("cacher");

    if(affMarque){
        blocMarque.classList.remove("cacher");
    }

    if(affModele){
        blocModele.classList.remove("cacher");
    }

    if(affInfo){
        blocInfo.classList.remove("cacher");
    }
    
    
    
}

function Rechercher(){
    var saisie = document.getElementById("saisie").value;

    GetModele(saisie);
}


var darkTheme = false;
function ChangerTheme(){
    var body = document.getElementById("ContainerBody");
    if(darkTheme){
        body.classList.add("light");
        body.classList.remove("dark");
    }else{
        body.classList.remove("light");
        body.classList.add("dark");
    }
    darkTheme = !darkTheme;
}