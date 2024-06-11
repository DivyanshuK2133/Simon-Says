let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","blue","green"];

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("mousedown",playAudio);    
}
var y=document.getElementById("myAudio1");
var x=document.getElementById("myAudio");
var z=document.getElementById("myAudio2");
var a=document.getElementById("myAudio3");
a.loop=false;

z.loop=true;

console.log(z.loop);

function playAudio3(){
    if(z.paused){
        a.play();
    }
    else{
        z.pause();
        z.currentTime=0;
        a.currentTime=0;
        a.play();
    }
}
function playAudio2(){
    if(z.paused){
        z.play();
    }
    else{
        z.currentTime=0;
        z.play();
    }
}

function playAudio(){
    if(x.paused){
        x.play();
    }
    else{
        x.currentTime=0;
        x.play();
    }
}
function playAudio1(){
    if(y.paused){
        y.play();
    }
    else{
        y.currentTime=0;
        y.play();
    }
}

let started=false;
let level =0;
let h2=document.querySelector("h2");

document.addEventListener("keypress", function (){
    if(started==false){
        playAudio1();
    setTimeout(function(){
        h2.innerText= `3`;
    },500);
    setTimeout(function(){
        h2.innerText= `2`;
        playAudio1();
    },1500);
    setTimeout(function(){
        h2.innerText= `1`;
        playAudio1();
    },2500);
    setTimeout(start,3500);
    started=true;
    }
});

function start(){
    let allBtns= document.querySelectorAll(".btn");
    for(btn of allBtns){
        btn.addEventListener("mousedown",btnPress);    
    }  
        playAudio2();
        levelUp();

}

function gameFlash(btn){
    let id=btn.getAttribute("id");
    btn.classList.add(`${id}Flash`);
    setTimeout(function (){
        btn.classList.remove(`${id}Flash`);
    }, 250);
}

function userFlash(btn){
    let id=btn.getAttribute("id");
    btn.classList.add(`${id}Flash`);
    setTimeout(function (){
        btn.classList.remove(`${id}Flash`);
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;

    let randomIdx= Math.floor(Math.random()*4);
    let randomColor=btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    //  ;
    for(let i=0;i<gameSeq.length;i++){
        setTimeout(function(){
            console.log(gameSeq[i]);
            let flash=document.querySelector(`.${gameSeq[i]}`);
            gameFlash(flash);
        },i*500);
    }
}


function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);   
        }
    } else{
        h2.innerHTML=`Game Over! Your Score Was <b>${level}<b> <br> Press Any Key To Restart`;
        reset();
    }
}

function btnPress(){
    let btn= this;
    userFlash(btn);
    userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

function reset(){
    playAudio3();
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}