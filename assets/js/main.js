const loadingAnimationTime = 1700
let isDark = false;

function showMainAnimation(parent) {
  const boxContainer = document.createElement("div");
  boxContainer.style.overflow = "hidden";
  const box = document.createElement("div");
  box.classList.add("box", "flex");
  parent.appendChild(boxContainer);
  boxContainer.appendChild(box);
  const quote = ["Robin", "Schleser"];
  let delay = 0;
  for (let word in quote){
    let text = document.createElement("span");
    text.textContent = quote[word];
    text.classList.add("animate-slideup");
    delay = delay + 22;
    text.style.animationDelay = delay + "ms";
    box.appendChild(text);
  }
}

function revealCurtain(parent) {
  const curtain = document.createElement("div");
  curtain.classList.add("flex", "curtain");
  parent.appendChild(curtain);
  const progressBar = document.createElement("div");
  progressBar.classList.add("progressBar");
  curtain.appendChild(progressBar);
  progressBar.classList.add("progressGrow-animation");  
  return curtain;
};

function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
}

function init () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);


  const container = document.getElementById("main");
  const curtain = revealCurtain(container);
  setTimeout(function() {
    container.removeChild(curtain);
    showMainAnimation(container);
    document.querySelector("nav").style.zIndex = 30;
    const elems = document.querySelectorAll("section");
    for (let i = 0; i < elems.length; i++) {
      document.querySelectorAll("section")[i].style.display = "block";
    }
  }, loadingAnimationTime + 300)
  if(window.matchMedia("(prefers-color-scheme: dark)")) {
    document.querySelector('style').textContent += "@media (prefers-color-scheme: dark) { :root { --contrast: #FB7B6B; --bgColor: #3B3B3D; --fontColor: #F0F0F0; } .corner { fill:#A63729; } #social svg { fill:white; } .content-box {background: black !important; } #skills .skills svg { fill: white; } section .reverse { color: var(--fontColor); } #footer { color: var(--fontColor); } #contact button { background: linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } #skills .bg { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } .accentbutton { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } .numberCircle {border-radius: 50%;width: 25px;height: 25px;padding: 4px; background: #fff;border: 2px solid var(--bgColor);color: var(--bgColor);text-align: center; font-family: sans-serif;font-size: 22px; } }"
    isDark = true;
  }
  if(msieversion()) {
    var elmement = document.createElement("div");
    elmement.style.position = "absolute";
    elmement.style.height = "100%";
    elmement.style.width = "100%";
    elmement.style.zIndex = "100000";
    elmement.style.textAlign = "center";
    elmement.style.backgroundColor = "#F0F0F0";

    var aTag = document.createElement("a");
    aTag.href = "https://browser-update.org/update.html";
    aTag.text = "Your Browser is to Old to render this Webpage!";
    aTag.style.fontSize = "20px";
    elmement.appendChild(aTag);
    document.body.textContent = "";
    document.body.appendChild(elmement);
    
  }
};

init();

function select (elem) {
  document.querySelector(".selected").classList.remove("selected");
  elem.classList.add("selected");
};

function toogleColorTracker() {
  
  if(window.matchMedia("(prefers-color-scheme: dark)") && !isDark) {
    document.querySelector('style').textContent += "@media (prefers-color-scheme: dark) { :root { --contrast: #FB7B6B; --bgColor: #3B3B3D; --fontColor: #F0F0F0; } .corner { fill:#A63729; } #social svg { fill:white; } .content-box {background: black !important; } #skills .skills svg { fill: white; } section .reverse { color: var(--fontColor); } #footer { color: var(--fontColor); } #contact button { background: linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } #skills .bg { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } .accentbutton { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } }"
    isDark = true;
  } else {
    document.querySelector('style').textContent = "";
    isDark = false;
  }
};

window.onscroll = function() {
  if(document.documentElement.scrollTop > 50) {
    if(window.matchMedia("(prefers-color-scheme: dark)") && !isDark) {
      document.querySelector("nav").style.backgroundColor = "#F0F0F0";
    }else {
      document.querySelector("nav").style.backgroundColor = "#3B3B3D";
    }
    document.querySelector("nav").style.height = "70px";

    document.querySelector(".logo").style.top = "15px";
    document.querySelector("nav ul").style.top = "15px";
  } else {
    document.querySelector("nav").style.backgroundColor = "unset";
    document.querySelector("nav").style.height = "100px"
    document.querySelector(".logo").style.top = "50px";
    document.querySelector("nav ul").style.top = "50px";
  }
  if(document.querySelector(".selected") != undefined) {
    document.querySelector(".selected").classList.remove("selected");
  }
  if(document.documentElement.scrollTop < vh() - 50) {
    if(!document.querySelectorAll(".nav-item")[0].classList.contains("selected")) {
      document.querySelectorAll(".nav-item")[0].classList.add("selected");
    }
  } 
  if(document.documentElement.scrollTop > vh() - 50 && document.documentElement.scrollTop < (vh() * 2) - 50) {
    if(!document.querySelectorAll(".nav-item")[1].classList.contains("selected")) {
      document.querySelectorAll(".nav-item")[1].classList.add("selected");
    }
  } 
  if(document.documentElement.scrollTop > (vh() * 2) - 50 && document.documentElement.scrollTop < (vh() * 2.5) - 50) {
    if(!document.querySelectorAll(".nav-item")[2].classList.contains("selected")) {
      document.querySelectorAll(".nav-item")[2].classList.add("selected");
    }
  } 
  if(document.documentElement.scrollTop > (vh() * 2.5) - 50 && document.documentElement.scrollTop < (vh() * 4) - 50) {
    if(!document.querySelectorAll(".nav-item")[3].classList.contains("selected")) {
      document.querySelectorAll(".nav-item")[3].classList.add("selected");
    }
  } 

}


function vh() {
  var div, h;
  div = document.createElement('div');
  div.style.height = '100vh';
  div.style.maxHeight = 'none';
  div.style.boxSizing = 'content-box';
  document.body.appendChild(div);
  h = div.clientHeight;
  document.body.removeChild(div);
  return h;
}