var source = new ol.source.BingMaps({
              imagerySet: 'AerialWithLabels',
              key: 'AtLadSYYesV1tzAdgTIanbFG9CtUHgVkyYKesVeN2skIBk0rdWG5e5BIb80LVgoA'
            });

var source2 = new ol.source.BingMaps({
              imagerySet: 'Aerial',
              key: 'AtLadSYYesV1tzAdgTIanbFG9CtUHgVkyYKesVeN2skIBk0rdWG5e5BIb80LVgoA'
            });

var source3 = new ol.source.OSM({
              
            });

var layer = new ol.layer.Tile({
  preload:Infinity
});

var map = new ol.Map({
        target: 'map',
        layers: [layer],
        view: new ol.View({
          extent: [-20000000, -15000000, 20000000, 15000000],
          center: [0,75],
          zoom: 3.7,
          maxZoom: 17,
          minZoom:3.7
        })
      })

layer.setSource(source);

var x = document.getElementById("mapPopUp");
setInterval(function(){
  if(map.getView().getZoom() >= 16){
    x.style.display = "none";
  }
  else{
    x.style.display = "block";
  }
}, 100)
  
function setsource(){
  var element = $("#map");
      html2canvas(element,{
        background:'#ffffff',
        onrendered:function(canvas){
          var imgData = canvas.toDataURL('image/jpeg');
          $.ajax({
            url:'save.php',  
            type:'post',
            dataType:'text',
            data:{
              base64data:imgData,
              index:505,
              foldername: REQUESTCODE
            }
          })
        } 
      });
      console.log("screenshot");
      document.getElementById("load").style.display= "block";
      layer.setSource(source);
}

document.getElementById("takeScreenshotBtn").onclick = function(){

   document.getElementById("modBtn").style.display = "none"; 

   REQUESTCODE = USERCODE + "_"+ reqq;
   reqq++;
    console.log("REQUEST CODE: " + REQUESTCODE);
    if (map.getView().getZoom() >= 16)
    {
      layer.setSource(source2);
      setTimeout(setsource,2000); 
      setTimeout(function(){process();}, 5000);  
    }
}

document.getElementById("mapPopUp").onclick = function(){
  var view = map.getView();
  
  view.animate({
    zoom:   16
});
}

