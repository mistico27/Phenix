//Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speakUp");


//Speech recognition set up
const SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//start
recognition.onstart = function(){
    console.log("vr active");
};

recognition.onresult = function(event){
    let current = event.resultIndex;
    let transcript=event.results[current][0].transcript;
    readOut(transcript);
}

//stop
recognition.onend =function(){
    console.log("vr deactivated");
};

///start the continuos
//recognition.continuous = true;


startBtn.addEventListener("click",()=>{
    recognition.start();
});

stopBtn.addEventListener("click",()=>{
    recognition.stop();
});

//Phenix speech
function readOut(message){
    const speech = new SpeechSynthesisUtterance();
    ///different voices
    const allVoices=speechSynthesis.getVoices();
    speech.text = message;
    speech.voice = allVoices[82];
    speech.volume=1;
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
}

//speak
speakBtn.addEventListener("click",()=>{
    readOut("hi i am phenix, my creator is Christian beltran,  so i am mexican i believe, and that is amazing, so lets code!! ");
});

//window on load
window.onload = function(){
    readOut(" ");
}

