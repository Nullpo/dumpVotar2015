var request     = require("request");
var assert      = require('assert');
var MongoClient = require('mongodb').MongoClient;

var mesas = 9044;

var Utils = {
  urlForMesa: function urlForMesa(mesa) {
    return "https://apielecciones.buenosaires.gob.ar/api/mesa?id=" + mesa;
  },
  parseResponse: function createParseResponse(mesa, db){
    return function parseResponse(error, response, body){
      if(error){
        console.log("Error al leer la mesa " + mesa);
      } else {
        var collection = db.collection('documents');
        collection.insert({
          mesa: mesa,
          body: body
        }, function(err, result){
          if(err){
            console.log("Error al escribir la mesa " + mesa);
          } else {
            console.log("Mesa " + mesa + " guardado correctamente");
          }
        })
      }
    };
  }
};

MongoClient.connect("mongodb://localhost:27017/votar", function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  for(var mesa = 1; mesa <= mesas ; mesa++){
    request({
      url: Utils.urlForMesa(mesa),
      json:true
    }, Utils.parseResponse(mesa, db));
  }
});


