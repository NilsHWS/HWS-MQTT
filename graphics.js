// Elementaufbau und Dimensionierung
const scale = window.devicePixelRatio;
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var cWidth = canvas.clientWidth;
var cHeight = canvas.clientHeight;
canvas.style.width = parseInt(cWidth / 2) + "px";
canvas.style.height = parseInt(cHeight / 2) + "px";


function createGrid() {
	
    const step = 1;  //::TODO:: Schrittweite des Grid setzen
    context.clearRect(0, 0, cWidth, cHeight);  // löscht den Inhalt des Rechtecks

    canvas.width = cWidth * scale;
    canvas.height = cHeight * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
	// ::Info:: beginPath startet das zeichnen, stoke und closePath beenden es
    context.beginPath();
    let count = cWidth / step;
    context.lineWidth = 0.5;
    var x = 0;
    var y = 0;

    for (let a = 0; a < count; a++) {
		// ::TODO:: mit moveTo und lineTo ein Grid erzeugen
		// Linienstärke ist gesetzt, mit context.strokeStyle(#rrggbb) kann
		// die Farbe im RGB-Kontext gesetzt werden

        context.moveTo(0,y);
        context.lineTo(canvas.width,y);

        context.moveTo(x,0);
        context.lineTo(x,canvas.width);

        x = x + 50;
        y = y + 50;
		
    }
    context.stroke();
    context.closePath();
}

var maxVal = 130;
var currX = 0;

//::TODO:: einen geeigneten Datenspeicher definieren
var data = {
    "t": 0,
    "h": 0,
    
};

// externe Speicher fuer Zeichnen des Canvas
// Bezeichnung der Variablen abhängig von den akommenden Bezeichnungen, bzw. topics am broker. Da mir diese aber momentan nicht bekannt sind, habe ich temp1 und temp2 als Platzhalter für die 
// Johanna-Wittum-Schule und Alfons-Kern-Schule genommen - Nils

var temp1 = 0;
var temp2 = 0;

var tempalt1 = 0;
var tempalt2 = 0;

var ttemp1 = 0;
var ttemp2 = 0;



// ::TODO:: Diese Funktion sollte dazu verwendet werden, um der oben
// definierten Datenstruktur ein eben erhaltenes neues Datenelement hinzuzufügen
// die Funktion sollte berücksichtigen, dass nur so viel Daten im Speicher sind
// wie auf den Schirm passen. Die Funktion sollte intern aufgerufen werden, also 
// von drawCurves
function normalizeAndAdd(type, newData) {

    data[type] = newData;

}

//::Info:: die nachfolgende Funktion soll von der eigentliche Anzeige-Webseite aufgerufen werden
//::TODO:: Farben für jede Linie festlegen, Daten aus dem Datenspeicher zeichnen
function drawCurves(type, newData) {

    normalizeAndAdd(type, newData);
	
    context.beginPath();
    context.lineWidth = 2;


switch(type) {
        
    case "t":
        context.strokeStyle = "green"

        temp1 = data["t"];
        context.moveTo(ttemp1,(canvas.height*0,1)*tempalt1);
        ttemp1 = 50 + ttemp1;
        context.lineTo(ttemp1,(canvas.height*0,1)*temp1);
        document.getElementById('Temp1').innerText = temp1
        tempalt1 = temp1;
        break;

    case "h":
        context.strokeStyle = "red"
    
        temp2 = data["h"];
        context.moveTo(ttemp2,(canvas.height*0,25)*tempalt2);
        ttemp2 = 50 + ttemp2;
        context.lineTo(ttemp2,(canvas.height*0,25)*temp2);
        document.getElementById('Temp2').innerText = temp2
        feuchtalt = feucht;
        break;

 
}
	
	//::TODO:: für jede Datenreihe mit moveTo und lineTo eine Datenline zeichnen
	//::TODO:: vorher die Farbe für die Linie setzen
	
    context.stroke();
    context.closePath();
}

// Erzeugung des Hintergrundrasters initial
// nach jedem Löschen des Bildes die nachfolgende Funktion erneut aufrufen
createGrid(cWidth, cHeight);


