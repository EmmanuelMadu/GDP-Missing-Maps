    var image = new Image();

    function process(){
      cut();
      setTimeout(function(){generateJSONDATA(40);}, 10000); // pause then talk to watson
      setTimeout(function(){loadupmodal();document.location.href += "#openModal";}, 45000); // pause then set up modal
    }

    function cut(){
       image.onload= cutImageUp;
       image.src = this.REQUESTCODE + "/505.jpg"; // this will need to be changed depending on the users code
    }

    function cutImageUp() {
        var numColsToCut = 10;
        var numRowsToCut = 4;
        var widthOfOnePiece =  image.width / numColsToCut;
        var heightOfOnePiece = image.height / numRowsToCut;

        var tile;
        var index = 0;
        var canvas = document.createElement('canvas');;
        var context = canvas.getContext('2d');
        canvas.width = widthOfOnePiece;
        canvas.height = heightOfOnePiece;
        for(var x = 0; x < numColsToCut; ++x) {
            for(var y = 0; y < numRowsToCut; ++y) {
                //canvas = document.createElement('canvas');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                tile = canvas.toDataURL("image/jpeg");
                ImageElement = document.getElementById('myImage1');
                ImageElement.src = tile;

                save(tile,index);
                ++index;
            }
        }
        console.log("{LOG} - Finished cutting");
    }

    function php(i,imgData,foldername){
             $.ajax({
                url:'save.php',  
                type:'post',
                dataType:'text',
                data:{
                  base64data:imgData,
                  index:i,
                  foldername: foldername
                }
              });
           }

    function save(imgData,index){ 
      var element = $("#myImage1");
          html2canvas(element,{
            background:'#ffffff'
          });
          php(index,imgData,REQUESTCODE);
        }