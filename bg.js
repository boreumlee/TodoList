const body = document.querySelector("body");


function paintImage(rN){
    const image = new Image();
    image.src = `images/${genRandom()+1}.jpg`;
    image.classList.add("bgIamge");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*3);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();