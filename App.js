//Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speakUp");


function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(
          data.main.temp
        )}`;
        weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
        weatherStatement = `sir the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };
  
    xhr.send();
  }

// convert kelvin to celcius
function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
  }

//jarvis function initiate




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
    transcript=transcript.toLowerCase();
    console.log(`my words: ${transcript}`);

    if(transcript.includes("hello, simba") || transcript.includes("hi simba")){
        readOut("Hello sir how are you");
    }

    if(transcript.includes("open youtube")){
        readOut("sure sir, opening youtube");
        window.open("https://www.youtube.com/");
    }    

    if(transcript.includes("open google")){
        readOut("sure sir, opening google");
        window.open("https://www.google.com/");
    }   

    if(transcript.includes("search for")){
        readOut("yes my master this is the result");
        let input = transcript.split("");
        input.splice(0,11);
        input.pop();
        input =input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`);
    }   

    if(transcript.includes("watch for")){
        readOut("yes my master this is the result");
        let input = transcript.split("");
        input.splice(0,11);
        input.pop();
        input =input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.youtube.com/results?search_query=${input}`);
    }   





    if(transcript.includes("open my shop")){
        readOut("sure sir, opening your project i am happy to serve you ");
        window.open("http://localhost/Shopme/");
    }   
    
    if(transcript.includes("maria")){
        readOut("hola mama de christian i am trying to speak in spanish,estoy aprendiendo, que puedo hacer por ti");
    }   



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

