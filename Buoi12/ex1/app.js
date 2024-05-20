function Decrease() {
    let elnumber = document.getElementById('number')
    let x = elnumber.textContent;
    elnumber.textContent = parseInt(x) - 1
}

function Increase() {
    let elnumber = document.getElementById('number')
    let x = elnumber.textContent;
    elnumber.textContent = parseInt(x) + 1
}

function Reset() {
    let elnumber = document.getElementById('number')
    let x = elnumber.textContent;
    elnumber.textContent = 0;
}

function Save() {
    let elnumber = document.getElementById('number')
    let x = elnumber.textContent;
    let elsave = document.getElementById('saved-number')
    elsave.textContent = elsave.textContent + x + "|";
    elnumber.textContent = 0;
}

