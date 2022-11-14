var video="";
var status="";
objects=[];
var objectDetecter;

function setup(){
    canvas=createCanvas(480,380);
    canvas.position(500,580);
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetecter.detect(video,gotresult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("black");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetecter.detect(gotresult);
                document.getElementById("isobjectfound").innerHTML=object_name+" is found. ";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(object_name+" is found. ");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("isobjectfound").innerHTML=object_name+" is not found. ";
            }
        }
    }
}

function start(){
    objectDetecter=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
   object_name=document.getElementById("textinput").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;

}

