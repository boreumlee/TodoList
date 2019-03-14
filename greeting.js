
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const CURRENT_LS = "currentUSER",
    SHOW_CN = "show";

function localSTName(text){
    localStorage.setItem(CURRENT_LS, text);
}

function submitHandle(event){
    event.preventDefault();
    const currentValue = input.value;
    helloText(currentValue);
    localSTName(currentValue);
}

function askForName(){
    greeting.classList.remove(SHOW_CN);
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", submitHandle);

}

function helloText(text){
    greeting.classList.add(SHOW_CN);
    form.classList.remove(SHOW_CN);
    greeting.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUSer = localStorage.getItem(CURRENT_LS);
    if(currentUSer === null){
        askForName()
    } else {
        helloText(currentUSer);
    }
}

function init(){
    loadName();
}

init();