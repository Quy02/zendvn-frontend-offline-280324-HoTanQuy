let elbtnhome1 = document.getElementById('btn1-home')
let elbtnhome2 = document.getElementById('btn2-home')
let elbtnhome3 = document.getElementById('btn3-home')
let elscorehome = document.getElementById('score-home')
//
let elbtnaway1 = document.getElementById('btn1-away')
let elbtnaway2 = document.getElementById('btn2-away')
let elbtnaway3 = document.getElementById('btn3-away')
let elscoreaway = document.getElementById('score-away')


elbtnhome1.addEventListener('click', function () {
    score_home(elbtnhome1);
});

elbtnhome2.addEventListener('click', function () {
    score_home(elbtnhome2);
});

elbtnhome3.addEventListener('click', function () {
    score_home(elbtnhome3);
});

elbtnaway1.addEventListener('click', function () {
    score_away(elbtnaway1);
});

elbtnaway2.addEventListener('click', function () {
    score_away(elbtnaway2);
});

elbtnaway3.addEventListener('click', function () {
    score_away(elbtnaway3);
});

function score_home(btnhome) {
    let score = parseInt(btnhome.textContent);
    let scorehome = parseInt(elscorehome.textContent);
    elscorehome.textContent = score + scorehome;
    if(elscorehome.textContent < 0 || elscorehome.textContent == 0){
        elscorehome.textContent = "00";
    }
    if (elscorehome.textContent > 0 && elscorehome.textContent < 10) {
        elscorehome.textContent = "0" + elscorehome.textContent
    }
}

function score_away(btnaway) {
    let score = parseInt(btnaway.textContent);
    let scoreaway = parseInt(elscoreaway.textContent);
    elscoreaway.textContent = score + scoreaway;
    if(elscoreaway.textContent < 0 || elscoreaway.textContent == 0){
        elscoreaway.textContent = "00";
    }
    if (elscoreaway.textContent > 0 && elscoreaway.textContent < 10) {
        elscoreaway.textContent = "0" + elscoreaway.textContent
    }
}