var allMapData = {};
var map;
var mapThis = [];
var currentGraphicsLayer;
require([
  "https://code.jquery.com/jquery-2.1.3.js",
  "dojo/request",
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
    jQuery, request, 
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
    // jQuery.ajax({url:"//localhost:3000/api/" + selection}).done(function(data) {
    // });
    var promise = request("//localhost:3000/api/" + selection).then(
        function(text) {
          mapThis = text;
          var date = selection.replace('/', '.').replace('/', '.');
          allMapData[date] = text;
          if (!mapThis)
            return;
          mapThis = JSON.parse(mapThis);
          buildGraphicsLayer(mapThis);
        }
      );
  }

  function addEventList(listItem) {
    return '<li class="table-view-cell"><p>' + listItem + '</p></li>';
  }

  function buildGraphicsLayer(mapData) {
    graphicsLayer = new GraphicsLayer({id: "icons"});

    var ULElement = '<ul id="today" class="table-view control-content active">';

    for(var i = 0; i < mapData.length; i++) {
      var info = mapData[i];
      if (!info) {
        continue;
      }
      var index = info.info.lastIndexOf(" -");
      var title = info.info.substring(15, index);
      
      ULElement += addEventList(title);

      var trimmed = "";
      if (title.length > 25) {
        trimmed = title.substring(0, 25);
      }
      else {
        trimmed = title;
      }
      var description = info;
      var link = info.link;
      graphicsLayer.add(
        new Graphic(
          new Point(info.lon, info.lat),
          marker,
          { "title": trimmed, "link": link, "full": title }
        )
      );
    }
    ULElement += '</ul>';

    document.getElementById('events').innerHTML = ULElement;

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



  // window.onload = function() {
  //   request("/ratchet/js/ratchet.min.js").then(
  //       function(data) {
  //         window.ratchet = data;
  //         //console.log(data);
  //       }
  //     );
  // };
  // jQuery(window).bind("load", function () {
  //         jQuery.getScript("/ratchet/js/ratchet.min.js")
  //                 .done(function () {});
  //     });
  });

window.onload = function() {(function(d, t) {
    var g = d.createElement(t), // create a script tag
        s = d.getElementsByTagName(t)[0]; // find the first script tag in the document
    g.src = '/ratchet/js/ratchet.min.js'; // set the source of the script to your script
    s.parentNode.insertBefore(g, s); // append the script to the DOM
}(document, 'script'));
};