/* WATSON API BY PINK PINEAPPLE */

var MYJSONDATA = {}; // the public JSON data 

function generateJSONDATA(numberOfImages){
  for(i = 0; i < numberOfImages; i++){
    //var link = "http://homepages.shu.ac.uk/~b7021184/map/1.jpg"; 
    var link = "http://homepages.shu.ac.uk/~b7021184/GDPmap/"+REQUESTCODE+"/"+i+".jpg"; 
    getResponse(link,i); 
  }
  console.log("{LOG} - Recieved data from watson");
}

function getResponse(url,i) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText); 
      if(parseInt(data[0]["code"]) != 200){
        alert("Unable to contact watson!");
        console.log(data);
      }else{
        if(data != null){
          
          var score1 = data["images"][0]["classifiers"][0]["classes"][0]["score"];
          var score2 = data["images"][0]["classifiers"][0]["classes"][1]["score"];
          var score3 = data["images"][0]["classifiers"][0]["classes"][2]["score"];
          var score4 = data["images"][0]["classifiers"][0]["classes"][3]["score"];


        MYJSONDATA["image"+i] = {};

        MYJSONDATA["image"+i].building = {};
        MYJSONDATA["image"+i].building.score = score1;

        MYJSONDATA["image"+i].farmland = {};
        MYJSONDATA["image"+i].farmland.score = score2;

        MYJSONDATA["image"+i].path = {};
        MYJSONDATA["image"+i].path.score = score3;

        MYJSONDATA["image"+i].water = {};
        MYJSONDATA["image"+i].water.score = score4;

      }else{
        MYJSONDATA["image"+i] = {};
        MYJSONDATA["image"+i].class = "unknown T";
        MYJSONDATA["image"+i].score = 0.0;
      }
      }
    }
  };
  xhttp.open("GET", "searchImage.php?imagelink="+url, false);
  xhttp.send();
}

function loadupmodal() { 
    var modalString = [];
    var modalString = "<a href='#close' title='Close' class='close'>X</a><h2 class='text'>Analysis of Requestcode: "+REQUESTCODE+"</h2>"; 
      // start from 0 to 36 
      var i; 
      for(i = 0; i <= 36; i+= 4){
        modalString += "<div class='tooltip'><img id=modalImage"+i+" src="+REQUESTCODE+"/"+i+".jpg><span class='tooltiptext'>";
        modalString += "<p>Building: <span>"+ MYJSONDATA["image"+i].building.score +"</span></p>";
        modalString += "<p>Farmland:<span>"+ MYJSONDATA["image"+i].farmland.score +"</span></p>";
        modalString += "<p>Path:<span>"+ MYJSONDATA["image"+i].path.score +"</span></p>";
        modalString += "<p>Water: <span>"+ MYJSONDATA["image"+i].water.score +"</span></p>";
        modalString += "</span></div>";
      }
      modalString += "<br>"; 
      // start from 1 to 37 

      for(i=1; i <= 37; i+=4){
        modalString += "<div class='tooltip'><img id=modalImage"+i+" src="+REQUESTCODE+"/"+i+".jpg><span class='tooltiptext'>";
        modalString += "<p>Building: <span>"+ MYJSONDATA["image"+i].building.score +"</span></p>";
        modalString += "<p>Farmland:<span>"+ MYJSONDATA["image"+i].farmland.score +"</span></p>";
        modalString += "<p>Path:<span>"+ MYJSONDATA["image"+i].path.score +"</span></p>";
        modalString += "<p>Water: <span>"+ MYJSONDATA["image"+i].water.score +"</span></p>";
        modalString += "</span></div>";
      }
      modalString += "<br>"; 
      // start from 2 to 38
      for(i=2; i <= 38; i+=4){
        modalString += "<div class='tooltip'><img id=modalImage"+i+" src="+REQUESTCODE+"/"+i+".jpg><span class='tooltiptext'>";
        modalString += "<p>Building: <span>"+ MYJSONDATA["image"+i].building.score +"</span></p>";
        modalString += "<p>Farmland:<span>"+ MYJSONDATA["image"+i].farmland.score +"</span></p>";
        modalString += "<p>Path:<span>"+ MYJSONDATA["image"+i].path.score +"</span></p>";
        modalString += "<p>Water: <span>"+ MYJSONDATA["image"+i].water.score +"</span></p>";
        modalString += "</span></div>";
      } 
      modalString += "<br>"; 
      // start from 3 to 39
      for(i=3; i <= 39; i+=4){
        modalString += "<div class='tooltip'><img id=modalImage"+i+" src="+REQUESTCODE+"/"+i+".jpg><span class='tooltiptext'>";
        modalString += "<p>Building: <span>"+ MYJSONDATA["image"+i].building.score +"</span></p>";
        modalString += "<p>Farmland:<span>"+ MYJSONDATA["image"+i].farmland.score +"</span></p>";
        modalString += "<p>Path:<span>"+ MYJSONDATA["image"+i].path.score +"</span></p>";
        modalString += "<p>Water: <span>"+ MYJSONDATA["image"+i].water.score +"</span></p>";
        modalString += "</span></div>";
      }
      modalString += "<br>"; 
      modalString +='<p class="text">KEY<br>';
      modalString +='<span style="font-weight: bold;">Building: </span>Red<br>';
      modalString +='<span style="font-weight: bold;">Farmland: </span>Green<br>';
      modalString +='<span style="font-weight: bold;">Path: </span>Purple<br>';
      modalString +='<span style="font-weight: bold;">Water: </span>Blue<br></p>';
      document.getElementById("theclose").innerHTML = modalString;
      console.log("{LOG} - Modal Populated");

      for(i =0; i < 40; i++){
        var id = "modalImage" + i; 
        colour("modalImage" + i, findClassifier(i));
        document.getElementById(id).style.width = "10vh";

      }
      console.log("{LOG} - Colour Coded");
      document.getElementById("load").style.display = "none";
      document.getElementById("modBtn").style = "";

}

 



function findClassifier(index){
    var colour;
    
    if(MYJSONDATA["image"+index].water.score>=0.60){
      colour = "water"
    }

    if(MYJSONDATA["image"+index].farmland.score >=0.60){
      colour = "farmland"
    }
    if(MYJSONDATA["image"+index].path.score >=0.60){
      colour = "path"
    }   

    if(MYJSONDATA["image"+index].building.score >=0.60){
      colour = "building"
    }

    return colour;
}


function colour(id, colour){


switch(colour){
  case("building"):
   Caman("#" + id, function () {
      // Red
      this.colorize(300, 100, 100, 15); //red
      this.render();
    });
   break;

   case("farmland"):
    Caman("#" + id, function () {
      // Red
      this.colorize(100, 300, 100, 15); //green
      this.render();
    });
    break;

    case("water"):
     Caman("#" + id, function () {
      // Red
      this.colorize(100, 100, 300, 15); //blue
      this.render();
    });
     break;

     case("path"):
        Caman("#" + id, function () {
      // Red
      this.colorize(300, 34, 200, 15);
      this.render();
    });
    break;

    default:

  }
}

