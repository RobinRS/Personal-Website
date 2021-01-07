var loadingAnimationTime = 1800
var isDark = false;
document.querySelector(".popupnav").style.display = "none";

function showMainAnimation(parent) {
  var boxContainer = document.createElement("div");
  boxContainer.style.overflow = "hidden";
  var box = document.createElement("div");
  box.classList.add("box", "flex");
  parent.appendChild(boxContainer);
  boxContainer.appendChild(box);
  var quote = ["Robin", "Schleser"];
  var delay = 0;
  for (var word in quote){
    var text = document.createElement("span");
    text.textContent = quote[word];
    text.classList.add("animate-slideup");
    delay = delay + 22;
    text.style.animationDelay = delay + "ms";
    box.appendChild(text);
  }
}

function revealCurtain(parent) {
  var curtain = document.createElement("div");
  curtain.classList.add("flex", "curtain");
  parent.appendChild(curtain);
  var progressBar = document.createElement("div");
  progressBar.classList.add("progressBar");
  curtain.appendChild(progressBar);
  progressBar.classList.add("progressGrow-animation");  
  return curtain;
};

function init () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  var container = document.getElementById("main");
  var curtain = revealCurtain(container);

  setTimeout(function() {
    container.removeChild(curtain);
    showMainAnimation(container);
    document.querySelector("nav").style.zIndex = 30;
    var elems = document.querySelectorAll("section");
    for (var i = 0; i < elems.length; i++) {
      document.querySelectorAll("section")[i].style.display = "block";
      document.getElementById("menu-mobile").style.zIndex = 9999;
    }
  }, loadingAnimationTime + 300)

  if(isDM()) {
    darkMode();
    document.getElementById("logoImg").src = "logo.webp";
    isDark = true;
  } else {
    document.getElementById("logoImg").src = "logoB.webp";
  }

};

init();

function select (elem) {
  document.querySelector(".selected").classList.remove("selected");
  elem.classList.add("selected");
};

function toggleDarkMode() {
  if(!isDark) {
    darkMode();
    isDark = true;
    document.getElementById("logoImg").src = "logo.webp";
  } else {
    document.getElementById("logoImg").src = "logoB.webp";
    document.querySelector('style').textContent = "";
    isDark = false;
  }

  var scrollTop = document.documentElement.scrollTop;

  if(scrollTop > 50) {
    if(!isDark) {
      set("nav", "backgroundColor", "#F0F0F0");
    } else {
      set("nav", "backgroundColor", "#3B3B3D");
    }
  }

};

var scrollList = [vh() - 50, (vh() * 2) - 50, (vh() * 2.5) - 50, (vh() * 4) - 50];

window.onscroll = scroll;

function scroll() {

  var scrollTop = document.documentElement.scrollTop;

  if(scrollTop > 50) {
    if(!isDark) {
      set("nav", "backgroundColor", "#F0F0F0");
    } else {
      set("nav", "backgroundColor", "#3B3B3D");
    }
    set("nav", "height", "70px");
    set(".logo", "animation", "navbar 0.5s 1");
    set("#menu-mobile", "animation", "navbar 0.5s 1");
    set(".logo", "top", "15px");
    set("#menu-mobile", "top", "15px");
    set("nav ul", "top", "15px");
    set("nav", "boxShadow", "0 5px 15px 0px rgba(0,0,0,0.6)");
  } else {
    set("nav", "height", "100px");
    set("nav", "backgroundColor", "unset");
    set(".logo", "animation", "unset");
    set("#menu-mobile", "animation", "unset");
    set(".logo", "top", "50px");
    set("#menu-mobile", "top", "50px");
    set("nav ul", "top", "50px");
    set("nav", "boxShadow", "unset");
  }

  if(document.querySelector(".selected") != undefined) {
    document.querySelector(".selected").classList.remove("selected");
  }
  

  for (var i = 0; i <= scrollList.length; i++) {
    if(i == 0 && scrollTop < scrollList[i]) {
      if(!isSelect(i)) {
        select(i);
      }
    } else if(scrollTop > scrollList[i - 1] && scrollTop < scrollList[i]) {
      if(!isSelect(i)) {
        select(i);
      }
    }
  }
}

var expanded = false;

function menuToggle() {
  window.scrollTo(0, 0);
  if(!expanded) {
    set(".popupnav", "opacity", 1);
    document.querySelector(".popupnav").style.display = "block";
    window.onscroll = function () { window.scrollTo(0, 0); };
    expanded = !expanded;
  } else {
    set(".popupnav", "opacity", 0);
    window.onscroll = scroll;
    set(".popupnav", "display", "none");
    set("body", "overflowY", "unset");
    expanded = !expanded;
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

function set(selector, key, value) {
  document.querySelector(selector).style[key] = value;
}

function isSelect(id) {
  console.log(id);
  return document.querySelectorAll(".nav-item")[id].classList.contains("selected")
}

function select(id) {
  document.querySelectorAll(".nav-item")[id+4].classList.add("selected");
}

function selectMobile(id) {
  menuToggle();
  document.querySelectorAll(".nav-item")[id].classList.add("selected");
}

function darkMode() {
  document.querySelector('style').textContent += "#menu-mobile-in { filter: invert(1); } #menu-mobile { filter: invert(1); } :root { --contrast: #FB7B6B; --bgColor: #3B3B3D; --fontColor: #F0F0F0; } .corner { fill:#A63729; } #social svg path { fill:white; } .content-box {background: #222831 !important; } #skills .skills svg { fill: white; } section .reverse { color: var(--fontColor); } #footer { color: var(--fontColor); } #contact button { background: linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } #skills .bg { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); } .accentbutton { background:  linear-gradient(135deg, #CA4F4F 0%, #7A1C91 100%); }"
}

function isDM() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}