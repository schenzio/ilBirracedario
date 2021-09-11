//FUNZIONI
function gestoreApriMenu () {
	try {
	   //var music = new Audio('audio/tappo.mp3');
       //music.play();
	   nodoMenu.style.width = "40%";
	} catch ( e ) {
	   alert ("gestoreApriMenu" + e);
	}
}
function gestoreChiudiMenu () {
	try {
	   nodoMenu.style.width = "0%";
	} catch ( e ) {
	   alert ("gestoreChiudiMenu" + e);
	}
}
function gestoreTesti () {
	try {
	   nodoModal.setAttribute ("style", "display: display");
	   scriviMessaggio (nodoIngredientiNome, this.id);
	   scriviMessaggio (nodoIngredientiDesc, testiIngredienti[this.id]);
	} catch ( e ) {
	   alert ("gestoreTesti" + e);
	}
}
function gestoreChiudiTesti () {
	try {
	   nodoModal.setAttribute ("style", "display: none");
    } catch ( e ) {
       alert ("gestoreChiudiTesti" + e);
    }
}		
/**/function gestoreClickAvanti () {
	try {
	   cambiaScheda (1);
    } catch ( e ) {
       alert ("gestoreClickAvanti" + e);
    }
}		
/**/function gestoreClickIndietro () {
	try {
	   cambiaScheda (-1);
    } catch ( e ) {
       alert ("gestoreClickIndietro" + e);
    }
}
function gestoreVisualizzaScheda () {
	try {
	   indiceScheda = 0;
	   indiceRegione = regioni[this.value]; /*0 per belghe, 1 per inglesi, 2 per tedesche*/
	   numeroSchede = stiliBirre[indiceRegione].length; /*9 per belghe, 8 per inglesi, 12 per tedesche*/
       cambiaScheda (0);
	} catch ( e ) {
	   alert ("gestoreVisualizzaScheda" + e);
	}
}
function gestorePietanza () {
	try {
	   rimuoviFigli (nodoRisultato);
	   rimuoviFigli(nodoReset);
	   piattoAbbinato = this.id; 
	   var paesi = ricercaPaesi (piattoAbbinato);
	   creaOpzioni (nodoProvenienza, paesi, piattoAbbinato);
	} catch ( e ) {															
       alert ("gestorePietanza" + e);
    }
}
function gestoreAbbinamenti () {
	try {
	   rimuoviFigli(nodoReset);
	   var paese = this.value;
	   var birreAbbinate = ricercaMultipla (piattoAbbinato, paese);
	   creaGalleria (nodoRisultato, birreAbbinate);
	   var nodoRefresh = creaBottone (nodoReset, "Refresh");
	   nodoRefresh.onclick = gestoreRefresh;
	} catch ( e ) {
	   alert ("gestoreAbbinamenti" + e);
    }
}
function gestoreRefresh () {
	try {
	   rimuoviFigli (nodoProvenienza);
	   rimuoviFigli (nodoRisultato);
	   rimuoviFigli (nodoReset);
	} catch ( e ) {
	   alert ("gestoreRefresh" + e);
	}
}
/**/function scriviMessaggio (nodo, messaggio) {
    try {
       var nodoTesto = document.createTextNode(messaggio);  		
	   rimuoviFigli (nodo);
	   nodo.appendChild(nodoTesto);
	} catch ( e ) {
       alert ("scriviMessaggio" + e);		
    }
}
/**/function cambiaScheda (x) {
	try {
	   inizializza ();
	   indiceScheda += x;
	   if (indiceScheda == numeroSchede) {
		  indiceScheda = 0;
	   }
	   if (indiceScheda < 0) {
		  indiceScheda = numeroSchede - 1;
	   }
	   modificaVisibilità (indiceRegione, indiceScheda, "display");
	} catch ( e ) {
       alert ("cambiaScheda" + e);
    }
}
function inizializza () {
	try {
	   for (var s = 0; s < stiliBirre.length; s++) {
		  for (var t = 0; t < stiliBirre[s].length; t++) {
			 modificaVisibilità (s, t, "none");
		  }
	   }
	} catch ( e ) {
       alert ("inizializza" + e);
    }
}
function modificaVisibilità (indice1, indice2, visibilità) {
	try {
	   var nodoStile = document.getElementById (stiliBirre[indice1][indice2]);
	   nodoStile.setAttribute ("style", "display:" + visibilità);
    } catch ( e ) {
       alert ("modificaVisibilità" + e);
    }
}
/**/function ricercaPaesi (pietanza) {
	try {
	   var paesi = {};
	   for (var i = 0; i < birre.length; i++) {
		  var birra = birre[i];
		  for (var g = 0; g < birra.abbinamenti.length; g++) {
			 if (birra.abbinamenti[g] == pietanza) {	
			    paesi[birra.paese] = true;			
				}
		  }
	   }
	   return paesi;
	} catch ( e ) {
	   alert ("ricercaPaesi" + e);
	}
}
function creaOpzioni (nodo, lista, piatto) {
	try {
		scriviMessaggio (nodo, piatto + ", un 'ottima scelta. Da dove vuoi importare la birra da abbinare?");
		var nodoAcapo = document.createElement ("br");
		nodo.appendChild(nodoAcapo);
		for (x in lista) {
		   var nodoPaese = creaBottone (nodo, x);
		   nodoPaese.onclick = gestoreAbbinamenti;
	    }
	} catch ( e ) {
       alert ("creaOpzioni" + e);
    }
}
function creaBottone (nodo, value) {
	try {
	   var nodoElemento = document.createElement ("input");
	   nodoElemento.setAttribute ("type", "button");
	   nodoElemento.setAttribute ("value", value);
	   nodo.appendChild (nodoElemento);
	   return nodoElemento;
	} catch ( e ) {
	   alert ("creaBottone" + e);
	}
}
function ricercaMultipla (piatto, paese) {
	try {
	   var birreAbbinate = {};
	   for (var i = 0; i < birre.length; i++) {
		  var birra = birre[i];
		  var fotoBirraAbbinabile = birra.foto;
		  var nomeBirraAbbinabile = birra.nome;
		  for (var b = 0; b < birra.abbinamenti.length; b++) {
			 if (birra.abbinamenti[b] == piatto && birra.paese == paese) {	
			    birreAbbinate[nomeBirraAbbinabile] = fotoBirraAbbinabile;
			 }
		  }
	   }
	   return birreAbbinate;
	} catch ( e ) {
	   alert ("ricercaMultipla" + e);
	}
}
function creaGalleria (nodo, lista) {
	try {
	   rimuoviFigli(nodo);
	   for (var x in lista) {
		  var nodoBox = document.createElement ("div");
		  var nodoImg = document.createElement ("img");
		  var nodoBoxNome = document.createElement ("div");
		  var nodoNome = document.createElement ("span");
		  var nodoTesto = document.createTextNode (x);
		  nodoBox.setAttribute ("class", "box");
		  nodoBoxNome.setAttribute ("class", "boxnome");
		  nodoImg.setAttribute ("src", lista[x]);
		  nodoImg.setAttribute ("alt", lista[x]);
		  nodoBox.setAttribute ("id", x);
		  nodo.appendChild (nodoBox);
		  nodoBox.appendChild (nodoImg);
		  nodoBox.appendChild (nodoBoxNome);
		  nodoBoxNome.appendChild (nodoNome);
		  nodoNome.appendChild (nodoTesto);
	   }
	} catch ( e ) {
       alert ("creaGalleria" + e);
    }
}
/**/function rimuoviFigli (nodo) {
	try {
	   while (nodo.childNodes.length > 0) {
		  nodo.removeChild (nodo.firstChild);
	   }  
    } catch ( e ) {
	   alert ("rimuoviFigli" + e);
	}
}
//VAR GLOBALI
var nodoApriMenu;
var nodoChiudiMenu;
var nodoMenu;
var fotoIngredienti = {
	"Acqua"   : "acqua.gif",
	"Malto"   : "malto.gif",
    "Luppolo" : "luppolo.gif",
	"Lieviti" : "lievito.gif"
}
var testiIngredienti = {
	"Acqua"   : "Costituisce tra l\'85% e il 95% della birra, ma la sua importanza non si limita alla quantità. La composizione chimica dell\'acqua, modificabile dai mastri birrai grazie a moderne tecniche, ha infatti una forte incidenza sul prodotto finale. Per esempio, le lager chiare impiegano un\'acqua più leggera e dal pH lievemente acido, mentre le birre scure una più dura e alcalina, ricca di bicarbonato; un\'acqua con abbondanza di solfato e magnesio risulta invece ideale per esaltare l\'amarezza del luppolo.",
	"Malto"   : "Il malto d\'orzo è la base più comune del corpo della birra ed è responsabile del gusto dolciastro. Per essere maltato, o tallito, un cereale passa attraverso tre fasi: la macerazione, ovvero la permanenza in acqua per circa 2 giorni, la germinazione, in cui i cereali sono stesi e rigirati o ventilati fino alla fuoriuscita di una radichetta, e la torrefazione, l\'essicazione che blocca la crescita della radichetta quando questa ha raggiunto metà della lunghezza del seme. A seconda del tempo in cui sono torrefatti,i malti assumono diversi livelli di tostatura che incidono sul colore e sul gusto della birra. Oltre all\'orzo, possono essere utilizzate anche percentuali di cereali nobili, come frumento, segale, avena o farro, oppure, in prodotti industriali di minor qualità, riso e mais. Spesso si usa inoltre lasciare una parte dei cereali non maltata.",
    "Luppolo" : "Il luppolo è una pianta rampicante della famiglia delle Cannabaceae. Pur essendo oggi un ingrediente fondamentale, era assente nelle nelle prime birre sumere ed egizie ed è stato impiegato a partire dal Medioevo. Il luppolo dona l\'amarezza e l\'aromaticità alla birra grazie, rispettivamente, ai propri α-acidi e oli essenziali, oltre a favorire la conservazione e lo sviluppo di schiuma. Se aggiunti nelle fasi iniziali della produzione, i luppoli cedono più amaro, in quelle finali più aroma. I prodotti di maggior pregio utilizzano varietà diverse in momenti diversi.",
	"Lieviti" : "Sono i microrganismi responsabili del processo di fermentazione. Prima degli studi di Louis Pasteur a metà \'800, l'azione del lievito non era compresa e i monaci medioevali attribuivano i suoi effetti alla bontà divina. I lieviti per l\'alta fermentazione, Saccharomyces cerevisiae, agiscono a temperatura più alta, 15-25 °C, ed emergono sulla superficie del liquido; conferiscono alle birre un gusto più fruttato e la loro purezza non è fondamentale (per un aroma più intenso è anzi talvolta apprezzabile un certo grado di contaminazione). I lieviti per la bassa fermentazione, del ceppo Saccharomyces pastorianus, agiscono tra i 5 e i 15 °C e si depositano sul fondo del recipiente; lasciano le birre più \"pulite\", senza conferire alcun gusto particolare. In Belgio si utilizzano infine lieviti presenti nell\'aria per la fermentazione spontanea, solitamente appartenenti al genere Brettanomyces del Pajotteland; essi donano note aromatiche animali come la celebre \"coperta di cavallo\"."
}
var nodoIngredientiImg;
var nodoModal;
var nodoIngredientiNome;
var nodoIngredientiDesc;
var nodoChiudiTesti;
var stiliBirre = [
	[/*belghe*/
	  "lambic", 
      "flemish_red_ale",
      "oud_bruin", 
      "blanche", 
      "trappiste", 
      "birre_abbazia", 
      "belgian_ale", 
      "saison", 
      "bière_de_garde"
	], 
	[/*inglesi*/
	  "brown_ale", 
      "porter", 
      "stout", 
      "bitter", 
      "ipa", 
      "golden_ale", 
      "irish_red_ale", 
      "strong_ale"
	], 
	[/*tedesche*/
      "dunkel",
      "marzen", 
      "helles", 
      "rauchbier", 
      "bock", 
      "pilsner", 
      "vienna_lager", 
      "schwarzbier", 
      "berliner_weisse", 
      "weizen", 
      "alt", 
      "kolsch"
	]
]
var pietanze = {
	"Appetizer"                : "appetizer.png", 
	"Salumi"                   : "salumi.png", 
	"Formaggi"                 : "formaggi.png", 
	"Pasta o riso con carne"   : "pasta_riso_con_carne.png", 
	"Pasta o riso con verdure" : "pasta_riso_con_verdure.png", 
	"Zuppe"                    : "zuppe.png",
	"Carni rosse"              : "carni_rosse.png", 
	"Carni bianche"            : "carni_bianche.png", 
	"Selvaggina"               : "selvaggina.png", 
	"Pesce ai ferri"           : "pesce_ai_ferri.png", 
	"Pesce affumicato"         : "pesce_affumicato.png", 
	"Molluschi"                : "molluschi.png", 
	"Dolci al cucchiaio"       : "dolci_al_cucchiaio.png", 
	"Dolci secchi"             : "dolci_secchi.png"
}
var birre = [ 
   {
	  nome        : "Lambic", 
	  abbinamenti : ["Appetizer", "Salumi", "Formaggi", "Zuppe", "Selvaggina", "Dolci secchi"], 
	  paese       : "Belgio",  
	  foto        : "lambic.png"
   },
   {
	  nome        : "Flemish Red Ale", 
	  abbinamenti : ["Salumi", "Formaggi"], 
	  paese       : "Belgio", 
	  foto        : "flemish_red_ale.png"
   },
   {
	  nome        : "Oud Bruin", 
	  abbinamenti : ["Carni rosse", "Dolci secchi"], 
	  paese       : "Belgio", 
	  foto        : "oud_bruin.png"
   }, 
   {
	  nome        : "Blanche", 
	  abbinamenti : ["Appetizer", "Formaggi"],
	  paese       : "Belgio", 
	  foto        : "blanche.png"
   },
   {
	  nome        : "Trappiste", 
	  abbinamenti : ["Salumi", "Formaggi", "Zuppe", "Selvaggina"], 
	  paese       : "Belgio", 
	  foto        : "trappiste.png"
   },
   {
	  nome        : "Birre d'Abbazia", 
	  abbinamenti : ["Salumi", "Formaggi", "Zuppe", "Selvaggina"], 
	  paese       : "Belgio", 
	  foto        : "birre_abbazia.png"
   },
   {
	  nome        : "Belgian Ale", 
	  abbinamenti : ["Pasta o riso con verdure", "Pasta o riso con carne"], 
	  paese       : "Belgio", 
	  foto        : "belgian_ale.png"
   },
   {
	  nome        : "Saison", 
	  abbinamenti : ["Appetizer", "Formaggi", "Zuppe", "Carni bianche", "Selvaggina"], 
	  paese       : "Belgio", 
	  foto        : "saison.png"
   },
   {
	  nome        : "Bière de Garde", 
	  abbinamenti : ["Salumi", "Carni rosse", "Selvaggina"], 
	  paese     : "Francia", 
	  foto        : "bière_de_garde.png"
   },
   {
      nome        : "Brown Ale", 
	  abbinamenti : ["Pasta o riso con carne", "Carni rosse", "Dolci al cucchiaio"], 
	  paese       : "Inghilterra",
	  foto        : "brown_ale.png"
   },
   {
	  nome        : "Porter", 
      abbinamenti : ["Pesce affumicato", "Molluschi"], 
      paese       : "Inghilterra",
      foto        : "porter.png"
   },
   {
	  nome        : "Stout", 
	  abbinamenti : ["Pesce affumicato", "Molluschi", "Dolci al cucchiaio"], 
	  paese       : "Irlanda", 
	  foto        : "stout.png"
   },
   {
	  nome        : "Bitter", 
	  abbinamenti : ["Appetizer", "Pasta o riso con carne", "Carni rosse"], 
	  paese       : "Inghilterra",
	  foto        : "bitter.png"
   },
   {
	  nome        : "IPA", 
	  abbinamenti : ["Appetizer", "Carni rosse", "Carni bianche"], 
	  paese       : "Inghilterra",
	  foto        : "ipa.png"
   },
   {
	  nome        : "Golden Ale", 
	  abbinamenti : ["Appetizer", "Salumi", "Pasta o riso con_verdure", "Carni bianche"], 
	  paese       : "Inghilterra", 
	  foto        : "golden_ale.png"
   },
   {
	  nome        : "Irish Red Ale", 
	  abbinamenti : ["Salumi", "Pasta o riso con carne", "Carni rosse"], 
	  paese       : "Irlanda",
	  foto        : "irish_red_ale.png"
   },
   {
	  nome        : "Strong Ale", 
	  abbinamenti : ["Carni rosse"], 
	  paese       : "Inghilterra",
	  foto        : "strong_ale.png"
   },
   {
	  nome        : "Dunkel", 
	  abbinamenti : ["Salumi", "Carni rosse", "Selvaggina"], 
	  paese       : "Germania",
	  foto        : "dunkel.png"
   },
   {
	  nome        : "Marzen", 
	  abbinamenti : ["Appetizer", "Carni bianche"], 
	  paese       : "Germania",
	  foto        : "marzen.png"
   },
   {
	  nome        : "Helles", 
	  abbinamenti : ["Appetizer", "Pesce ai ferri"], 
	  paese       : "Germania",
	  foto        : "helles.png"
   },
   {
	  nome        : "Rauchbier", 
	  abbinamenti : ["Carni rosse", "Selvaggina", "Pesce affumicato"], 
	  paese       : "Germania",
	  foto        : "rauchbier.png"
   },
   {
	  nome        : "Bock", 
	  abbinamenti : ["Salumi", "Carni rosse", "Selvaggina"], 
	  paese       : "Germania", 
	  foto        : "bock.png"
   },
   {
	  nome        : "Pilsner", 
	  abbinamenti : ["Appetizer", "Formaggi", "Pasta riso con verdure", "Carni bianche", "Pesce ai ferri"], 
	  paese     : "Repubblica Ceca", 
	  foto        : "pilsner.png"
   },
   {
	  nome        : "Vienna Lager", 
	  abbinamenti : ["Appetizer", "Formaggi", "Pasta riso con verdure", "Carni bianche"], 
	  paese     : "Austria", 
	  foto        : "vienna_lager.png"
   },
   {
	  nome        : "Schwarzbier", 
	  abbinamenti : ["Salumi", "Pasta o riso con carne", "Carni rosse"], 
	  paese       : "Germania",
	  foto        : "schwarzbier.png"
   },
   {
	  nome        : "Berliner Weisse", 
	  abbinamenti : ["Appetizer"], 
	  paese       : "Germania",
	  foto        : "berliner_weisse.png"
   },
   {
	  nome        : "Weizen", 
	  abbinamenti : ["Formaggi", "Pasta o riso con verdure", "Carni bianche", "Pesci ai ferri"], 
	  paese       : "Germania", 
	  foto        : "weizen.png"
   },
   {
	  nome        : "Alt", 
	  abbinamenti : ["Salumi", "Carni rosse", "Carni bianche"], 
	  paese       : "Germania",
	  foto        : "alt.png"
   },
   {
	  nome        : "Kolsch", 
	  abbinamenti : ["Appetizer", "Pasta o riso con verdure", "Carni bianche"], 
	  paese       : "Germania", 
	  foto        : "kolsch.png"
   }
]
var indiceScheda;
var numeroSchede;
var indiceRegione;
var nodoRegioni;
var regioni = {
	"Macroregione Belga": 0,
	"Macroregione Inglese": 1,
	"Macroregione Tedesca": 2
}
var nodoAvanti;
var nodoIndietro;
var nodoPietanze;
var piattoAbbinato;
var nodoProvenienza;
var nodoRisultato;
var nodoReset;

function gestoreLoad () {
	try {
	   nodoApriMenu = document.getElementById("apri_menu");
	   nodoChiudiMenu = document.getElementById("chiudi_menu");
	   nodoMenu = document.getElementById("menu");
	   nodoIngredientiImg = document.getElementById("foto_ingredienti");
	   nodoIngredientiDesc = document.getElementById("desc_ingredienti");
	   nodoIngredientiNome = document.getElementById("nome_ingredienti");
	   nodoModal = document.getElementById("modal");
	   nodoChiudiTesti = document.getElementById("chiudi_testi");
       nodoRegioni = document.getElementById("regioni");
	   nodoAvanti = document.getElementById("avanti");
	   nodoIndietro = document.getElementById("indietro");
	   nodoPietanze = document.getElementById("pietanze");
	   nodoProvenienza = document.getElementById("provenienza");
	   nodoRisultato = document.getElementById("risultato");
	   nodoReset = document.getElementById("reset");
	   inizializza();
	   nodoModal.style.display="none";
	   modificaVisibilità (0, 0, "display");
	   indiceScheda = 0;
	   indiceRegione = 0;
	   numeroSchede=9;
	   creaGalleria(nodoIngredientiImg, fotoIngredienti);
	   for (var i = 0; i < nodoIngredientiImg.childNodes.length; i++) {
		   nodoIngredientiImg.childNodes[i].onclick = gestoreTesti;
	   }
	   for (var r in regioni) {
		  var bottoneRegione = creaBottone(nodoRegioni, r);
		  bottoneRegione.onclick = gestoreVisualizzaScheda;
	   }
	   creaGalleria (nodoPietanze, pietanze);
	   for (var i = 0; i < nodoPietanze.childNodes.length; i++) {
		  nodoPietanze.childNodes[i].onclick = gestorePietanza;
	   }
	   nodoApriMenu.onclick = gestoreApriMenu;
	   nodoChiudiMenu.onclick = gestoreChiudiMenu;
	   nodoChiudiTesti.onclick = gestoreChiudiTesti;
	   nodoAvanti.onclick = gestoreClickAvanti;
	   nodoIndietro.onclick = gestoreClickIndietro;
	} catch ( e ) {
	   alert ("gestoreLoad" + e);
	}
}
window.onload = gestoreLoad;
