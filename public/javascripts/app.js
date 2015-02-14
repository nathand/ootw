var allMapData = {};
var map;
var mapThis = [];
var currentGraphicsLayer;
require([
  "esri/geometry/Point",
  "esri/graphic",
  "esri/map",
  "esri/layers/GraphicsLayer",
  "esri/Color",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/SpatialReference",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/InfoTemplate",
  "esri/urlUtils",
  "dojo/domReady!"
  ], function(
    Point, Graphic, Map, GraphicsLayer, Color, SimpleMarkerSymbol, SimpleRenderer, ClassBreaksRenderer,
    SpatialReference, SimpleFillSymbol, SimpleLineSymbol,
    InfoTemplate, urlUtils
  ) {
  var orangeRed = new Color([238, 69, 0, 0.7]); // hex is #ff4500
  var marker = new SimpleMarkerSymbol("solid", 15, null, orangeRed);
  var renderer = new ClassBreaksRenderer(marker, "display");
  var rendererA = new SimpleRenderer(marker);
  rendererA.setColorInfo({
      field: "Cumulative_Confirmed_probably_suspected_cases",
      minDataValue: 1000,
      maxDataValue: 4000,
      colors: [
        new Color("#DEFFDD"),//low
        new Color("#E00700")//high
      ]
    });

  map = new Map("map", {
    basemap: "topo",
    center: [-158.2045, 21.4831], // longitude, latitude
    zoom: 8
  });
  getData("default");


  function getData(selection) {
    selection = "15/02/14";
    $.ajax({url:"//localhost:3000/api/" + selection}).done(function(data) {
      mapThis = data;
      var date = selection.replace('/', '.').replace('/', '.');
      allMapData[date] = data;
      buildGraphicsLayer(mapThis);
    });
  }
  function buildGraphicsLayer(mapData) {
    graphicsLayer = new GraphicsLayer({id: "icons"});
    for(var i = 0; i < mapData.length; i++) {
      var info = mapData[i];
      var index = info.info.lastIndexOf(" -");
      var title = info.info.substring(15, index - 2);
      var trimmed = "";
      if (title.length > 25) {
        trimmed = title.substring(0, 25);
      }
      else {
        trimmed = title;
      }
      var description = info;
      var link = info.link
      graphicsLayer.add(
        new Graphic(
          new Point(info.lon, info.lat),
          marker,
          { "title": trimmed, "link": link, "full": title }
        )
      );
    }
    graphicsLayer.on('click', function(e) {
      //console.log(e.graphic.attributes);
    });
    currentGraphicsLayer = graphicsLayer;

    var template = new InfoTemplate("${title}", "<a href=\"${link}\">See more info...</a> ");
    graphicsLayer.setInfoTemplate(template);
    map.addLayer(graphicsLayer);
  }
  function removeGraphicsLayer() {
    map.removeLayer(map.getLayer("icons"));
  }

});
