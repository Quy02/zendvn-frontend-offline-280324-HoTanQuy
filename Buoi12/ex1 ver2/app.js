let elDecrease = document.getElementById('btn-decrease');
let elIncrease = document.getElementById('btn-increase');
let elReset = document.getElementById('btn-reset');
let elSave = document.getElementById('btn-save');
let elNumber = document.getElementById('number');
let elSaved = document.getElementById('saved-number');

elDecrease.addEventListener('click', function() {
    elNumber.textContent = parseInt(elNumber.textContent) - 1;
});

elIncrease.addEventListener('click', function() {
    elNumber.textContent = parseInt(elNumber.textContent) + 1;
});

elReset.addEventListener('click', function() {
    elNumber.textContent = 0;
});

elSave.addEventListener('click', function() {
    elSaved.textContent +=  elNumber.textContent + "|";
    elNumber.textContent = 0;
});



