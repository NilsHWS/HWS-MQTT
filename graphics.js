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
    "v": 0,
    "p": 0,
    "a": 0,
};

// externe Speicher fuer Zeichnen des Canvas
var temp = 0;
var feucht = 0;
var gas = 0;
var druck = 0;
var hoehe = 0;
var tempalt = 0;
var feuchtalt = 0;
var gasalt = 0;
var druckalt = 0;
var hoehealt = 0;

var ttemp = 0;
var tfeucht = 0;
var tgas = 0;
var tdruck = 0;
var thoehe = 0;




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

        temp = data["t"];
        context.moveTo(ttemp,(canvas.height*0,1)*tempalt);
        ttemp = 50 + ttemp;
        context.lineTo(ttemp,(canvas.height*0,1)*temp);
        document.getElementById('Temp').innerText = temp
        tempalt = temp;
        break;

    case "h":
        context.strokeStyle = "red"
    
        feucht = data["h"];
        context.moveTo(tfeucht,(canvas.height*0,25)*feuchtalt);
        tfeucht = 50 + tfeucht;
        context.lineTo(tfeucht,(canvas.height*0,25)*feucht);
        document.getElementById('Feucht').innerText = feucht
        feuchtalt = feucht;
        break;

    case "v":
        context.strokeStyle = "blue"
        
        gas = data["v"];
        context.moveTo(tgas,(canvas.height*0,4)*gasalt);
        tgas = 50 + tgas;
        context.lineTo(tgas,(canvas.height*0,1)*gas);
        document.getElementById('Temp').innerText = gas
        gasalt = gas;
        break;

    case "p":
        context.strokeStyle = "orange"
            
        druck = data["p"];
        context.moveTo(tdruck,(canvas.height*0,4)*druckalt);
        tdruck = 50 + tdruck;
        context.lineTo(tdruck,(canvas.height*0,1)*druck);
        document.getElementById('Temp').innerText = druck
        druckalt = druck;
        break;

    case "a":
        context.strokeStyle = "orange"
                
        hoehe = data["a"];
        context.moveTo(thoehe,(canvas.height*0,4)*hoehealt);
        thoehe = 50 + thoehe;
        context.lineTo(thoehe,(canvas.height*0,1)*hoehe);
        document.getElementById('Temp').innerText = hoehe
        hoehealt = hoehe;
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


