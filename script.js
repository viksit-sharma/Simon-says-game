let gameSeq = [];
let userSeq = [];

let btns = ["yellow","green","red","blue"]
let started = false;
let level = 0;
let preLevel = 0;

let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
if (window.matchMedia("(max-width : 768px").matches) {
    h2.innerText = "Tap on screen to start the game.";
}
else {
        h2.innerText = "Press any key on keyboard to start the game.";

}
if (window.matchMedia("(max-width : 768px").matches) {
    document.addEventListener("touchstart", function () {
    // document.querySelector("body").style.backgroundColor = "#26fe3fe8";
    //     setTimeout(function () {
    //     document.querySelector("body").style.backgroundColor = "#fdffde";
    //     },250);
    if (started == false) {
        started = true;

        levelUp();
    }
});
} else {
    document.addEventListener("keypress", function () {
    // document.querySelector("body").style.backgroundColor = "#26fe3fe8";
    //     setTimeout(function () {
    //     document.querySelector("body").style.backgroundColor = "#fdffde";
    //     },250);
    if (started == false) {
        started = true;

        levelUp();
    }
});
}


function computerFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}
function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 150);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button choosen by computer

    let radIdx = Math.floor(Math.random() * 4);
    let radClr = btns[radIdx];
    let radBtn = document.querySelector(`.${radClr}`);
    // console.log(radBtn);
    // console.log(radClr);
    // console.log(radIdx);
    gameSeq.push(radClr);

    computerFlash(radBtn);
}
function chkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            // console.log(userSeq.length == gameSeq.length);
            // console.log(gameSeq);
            // console.log(userSeq);
            setTimeout(levelUp, 500);
        }
        console.log("Same value")
    } else {
        if (preLevel < level) {
            h3.classList.remove("hidden");
            h3.classList.add("high");
            h3.innerText = `Highest Score : ${level}`;
        }
        else {
            h3.classList.remove("hidden");
            h3.classList.remove("high");
            h3.innerText = `Highest Score : ${preLevel}`;
        }
        document.querySelector("body").style.backgroundColor = "#fe2626e8";
        setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "#fdffde";
        }, 250);
        if (window.matchMedia("(max-width : 768px").matches) {
            h2.innerHTML = ` <P style="color: black;">GAME OVER!!!</P>  <br><p style="color: red;">Your Score Was ${level}.</p><br><P style="color: black;">Tap on screen to continue.</p>`
            reset();
        } else {
            h2.innerHTML = `<P style="color: black;">GAME OVER!!!</P>  <br><p style="color: red;">Your Score Was ${level}.</p><br><P style="color: black;">Press any Key on keyboard to continue.</p>`
            reset();
        }
        // console.log(gameSeq);
        //     console.log(userSeq);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userClr = btn.getAttribute("id");
    userSeq.push(userClr);
    chkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    preLevel = level;
    level = 0;
}