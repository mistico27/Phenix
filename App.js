//Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speakUp");
const time = document.querySelector("#time");
const battery =document.querySelector("#battery");
const internet =document.querySelector("#internet");
const turnOn = document.querySelector("#turn_on");
const msgs=document.querySelector(".messages");


///creating a chat
function createMSG(who,msg){
    let newMessage = document.createElement("p");
    newMessage.innerText = msg;
    newMessage.setAttribute("class",who)
    msgs.appendChild(newMessage)
}


document.querySelector("#start_simba_btn").addEventListener("click",()=>{
    recognition.start();
});
//simba like jarvis commands
let SimbaComs = [];
SimbaComs.push("hi friday");
SimbaComs.push("what are your commands");
SimbaComs.push("close this - to close opened popups");
SimbaComs.push(
  "change my information - information regarding your acoounts and you"
);
SimbaComs.push("whats the weather or temperature");
SimbaComs.push("show the full weather report");
SimbaComs.push("are you there - to check Simba presence");
SimbaComs.push("shut down - stop voice recognition");
SimbaComs.push("open google");
SimbaComs.push('search for "your keywords" - to search on google ');
SimbaComs.push("open whatsapp");
SimbaComs.push("open youtube");
SimbaComs.push('play "your keywords" - to search on youtube ');
SimbaComs.push("close this youtube tab - to close opened youtube tab");
SimbaComs.push("open github");
SimbaComs.push("open my github profile");

///simba tell me the weather
let weatherStatement="";



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

//time set up
let date = new Date()
let hrs=date.getHours()
let min = date.getMinutes()
let sec = date.getSeconds()

///autoSimba
function autoSimba(){
    setTimeout(()=>{
        recognition.start();
    },1000);
}



///onload()
window.onload = () =>{
    ///onStart
    turnOn.addEventListener("onend",()=>{
        setTimeout(()=>{
            autoSimba();
            readOut("I am ready Sir, how can i help you");
            if(localStorage.getItem("jarvis_setup")===null){
                readOut("Sir, please fill out the form");    
            }
        },200)
    })

    SimbaComs.forEach((e)=>{
        document.querySelector(".commands").innerHTML +=`<p>#${e}</p><br/>`
    })


    readOut(" ");
   time.textContent = `${hrs}: ${min}: ${sec}`
    setInterval(()=>{
        let date = new Date()
        let hrs=date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        time.textContent = `${hrs}: ${min}: ${sec}`

    },1000);

    //battery set up
    let batteryPromise = navigator.getBattery()
    batteryPromise.then(batteryCallback)

    function batteryCallback(batteryObject){
        printBatteryStatus(batteryObject);
        setInterval(()=>{
            printBatteryStatus(batteryObject);
            navigator.onLine?(internet.textContent="online"):(internet.textContent="offline")
        },5000);
    }

    function printBatteryStatus(batteryObject){
        battery.textContent=`${batteryObject.level*100} %`;
        if(batteryObject.charging =true){
            document.querySelector(".battery").style ="200px";  
            battery.textContent = `${batteryObject.level*100} % charging`
        }
    }

    //internet set up
    navigator.onLine?(internet.textContent="online"):(internet.textContent="offline")
    setInterval(()=>{
        navigator.onLine?(internet.textContent="online"):(internet.textContent="offline") 
    },6000);
}




//jarvis function initiate
if(localStorage.getItem("jarvis_setup") !== null){
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
}

///jarvis information set up
const setup = document.querySelector(".jarvis_setup");
setup.style.display="none";
if(localStorage.getItem("jarvis_setup") === null){
    setup.style.display="block";
    setup.querySelector("button").addEventListener("click",userInfo);
}

///user info function
function userInfo(){
    let setupinfo = {
        name:setup.querySelectorAll("input")[0].value,
        bio:setup.querySelectorAll("input")[1].value,
        location:setup.querySelectorAll("input")[2].value,
        facebook:setup.querySelectorAll("input")[3].value,
        github:setup.querySelectorAll("input")[4].value,
    } 

    let testArr=[];
    setup.querySelectorAll("input").forEach((e)=>{
        testArr.push(e.value);
    }); 

    if(testArr.includes("")){
        readOut("Sir enter your information");
    }else{
        localStorage.clear();
        localStorage.setItem("jarvis_setup",JSON.stringify(setupinfo));
        setup.style.display="none";
       weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
    }
}



//Speech recognition set up
const SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//start
recognition.onstart = function(){
    console.log("vr active");
};



async function getNews(){
    var url = "https://newsapi.org/v2/top-headlines?country=mx&apiKey=b0712dc2e5814a1bb531e6f096b3d7d3"
    var req = new Request(url)
    await fetch(req).then((response) => response.json())
    .then((data) => {
      console.log(data);
      let arrNews = data.articles
      arrNews.length = 10
      let a = []
      arrNews.forEach((e,index) => {
        a.push(index+1)
        a.push(".........")
        a.push(e.title)
        a.push(".........")
      });
      readOut(a)
    })
  }


///adding new languages




recognition.onresult = function(event){
    let current = event.resultIndex;
    let transcript=event.results[current][0].transcript;
    transcript=transcript.toLowerCase();
    let userData =localStorage.getItem("jarvis_setup");
    console.log(`my words: ${transcript}`);

    createMSG("usermsg",transcript);

    if(transcript.includes("hello, simba") || transcript.includes("hi simba")){
        readOut("Hello sir how are you");
    }

    if(transcript.includes("close")){
        readOut("ok sir closed");
        document.querySelector(".commands").style.display="none"
        setup.style.display="none";
    }

    if(transcript.includes("small")){
        readOut("ok sir getting smaller");
        window.open(`${window.location.href}`,"newWindow","menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0")
        window.close();
    }

    if(transcript.includes("give me the news")){
        readOut("This are the list of the news sir");
        getNews();
    }


    if(transcript.includes("your commands")){
        readOut("This are the list of my commands Sir, i must follow this ones");
        document.querySelector(".commands").style.display="block"
    }


    if(transcript.includes("open youtube")){
        readOut("sure sir, opening youtube");
        window.open("https://www.youtube.com/");
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

    if(transcript.includes("battery status")){
        readOut("yes sir my current charging status is" + battery.textContent);
    }

    if(transcript.includes("open my github")){
        readOut("sure sir, opening your project github i am happy to serve you ");
        window.open(`https://github.com/${JSON.parse(userData).github}`);
    }   


    if(transcript.includes("open my shop")){
        readOut("sure sir, opening your project i am happy to serve you ");
        window.open("http://localhost/Shopme/");
    }   
    
    if(transcript.includes("maria")){
        readOut("hola mama de christian i am trying to speak in spanish,estoy aprendiendo, que puedo hacer por ti");
    }   

    if (transcript.includes("Thank you")) {
        readOut("No problem i am here to help ya... de nada");
    }

    if(transcript.includes("weather report")) {
        readOut("opening the weather report sir");
        window.open(
          `https://www.google.com/search?q=weather+in+${
            JSON.parse(localStorage.getItem("jarvis_setup")).location
          }`
        );
    }

    if(transcript.includes("introduce yourself")){
        readOut("hi my name is simba, but i am a fenix, my creator is Christian beltran,  so i am mexican i believe, and that is amazing, so lets code!! ");
    }


    // weather report
    if (transcript.includes("what's the temperature")) {
        readOut(weatherStatement);
      }

// info change
    if (transcript.includes("change my information")) {
    readOut("Opening the information tab sir");
    localStorage.clear();
    
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
    }


      // availability check
    if (transcript.includes("are you there")) {
        readOut("yes sir, what can i do for you");
    }
      // close voice recognition
    if (transcript.includes("shut down")) {
        readOut("Ok sir I will be see you in a few");
        recognition.stop();
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
    createMSG("jmsg",message);
}

//speak
speakBtn.addEventListener("click",()=>{
    readOut("hi my name is simba, but i am a fenix, my creator is Christian beltran,  so i am mexican i believe, and that is amazing, so lets code!! ");
});



