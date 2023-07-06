/* Disclaimer IoT-Werkstatt CC 4.0 BY NC SA 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For Ardublock see the
 GNU General Public License for more details. */
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <Adafruit_BME680.h>
#include <Wire.h>


WiFiClient espClient; // das Objekt für WiFi
PubSubClient mqttclient(espClient); // für MQTT

IPAddress myOwnIP; // ownIP for mDNS 
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(2,13,NEO_GRBW + NEO_KHZ800);
// BME680 Lib written by Limor Fried & Kevin Townsend for Adafruit Industries, http://www.adafruit.com/products/3660
Adafruit_BME680 boschBME680; // Objekt Bosch Umweltsensor
int boschBME680_ready = 0;

String topic ="OctopusBoard1/Temperatur/alleSchulen";  // ::TODO:: passenden Main-Topic definieren


void callbackFunction(char* topic, byte* payload, unsigned int length) {
   Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (unsigned int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}
  // Handle the incoming MQTT messages here
  // Note: This function must be defined for your particular application.
}
// ::TODO:: -------------- definition mqtt-object ueber WiFi

//--------- list of mqtt callback functions 


//------------ reconnect mqtt-client
void mqttreconnect() { // Loop until we're reconnected 
  if (!mqttclient.connected()) { 
    while (!mqttclient.connected()) { 
      Serial.print("Attempting MQTT connection...")r;
      if (mqttclient.connect("MyProducer" , "one", "firstUser1" )) {
        Serial.println("connected");
      } 
      else { 
        Serial.print("failed, rc=");
        Serial.print(mqttclient.state());
        Serial.println(" try again in 5 seconds");
        delay(5000);
      }
    }
  } 
  else { 
    mqttclient.loop(); 
  }
}

function wificonnect() {
  WiFi.disconnect();
  WiFi.persistent(false);
  WiFi.mode(WIFI_STA);
  delay(100);

  // ::TODO:: SSID und PWD einbinden check
  const char* SSID = "Sng_Mobile, Sng_Mobile_5G"; // const damit es Konstant bleibt, * Zeiger Variable hier "S"- character, char für einzelne Zeichen 
  const char* passkey = "%Sng-R@uter4IOT"

  WiFi.begin(<SSID>,<passkey>);
  while (WiFi.status() != WL_CONNECTED) { // Warte bis Verbindung steht 
    delay(500); 
    Serial.print(".");
  };
  Serial.println ("\nconnected, meine IP:"+ WiFi.localIP().toString());
  myOwnIP = WiFi.localIP();

  // ::TODO:: eigene Farben für die Anzeige wählen
  pixels.setPixelColor(0,255,0,0,0); // Grün max intensität
  pixels.show();
  pixels.setPixelColor(1,0,255,0,0); // Rot max Intensität
  pixels.show();
}


function readAndSendData() {
 // Beispieldaten: ersetzen Sie diese durch den tatsächlichen Code zum Auslesen der Sensordaten
  float temperature = 20.0f; // boschBME680.readTemperature();
  

  // Konvertieren Sie die Daten in Strings
  char tempString[32];
  snprintf(tempString, sizeof(tempString), "%.2f", temperature);
  

  // Erstellen Sie die Topics
  char tempTopic[64];
  snprintf(tempTopic, sizeof(tempTopic), "%s/temperature", topic);

  // Daten Veröffentlichen
  mqttclient.publish(tempTopic, tempString);
  mqttclient.publish(humidTopic, humidString);
}
}


void setup(){ // Einmalige Initialisierung
  Serial.begin(115200);
  //----------------------------------MQTT-Client 
  mqttclient.setServer(192.168.0.100, 1883);
  mqttclient.setCallback(mqttcallback);
  mqttclient.setKeepAlive(60);
  mqttclient.setSocketTimeout(15);
  //::TODO:: Init Neopixel
  pixels.begin(); // Neopixel Bibliothek
  pixels.show(); // sendet pixel farbe daten an Neopixel


  Wire.begin(); // ---- Initialisiere den I2C-Bus 

  if (Wire.status() != I2C_OK) Serial.println("Something wrong with I2C");
  // ::TODO:: Initialize address 118 

  if (boschBME680_ready == 0) {
    while(1) { 
      Serial.println("Fehler! Sensor vorhanden?");
      delay(500);
    }
  }

  // ::TODO:: Umweltsensoren Bosch BME 680 initialisieren

  wificonnect();
}

void loop() { // Kontinuierliche Wiederholung 
  delay( 5000 );
  mqttreconnect();
  readAndSendData();
} //end loop
