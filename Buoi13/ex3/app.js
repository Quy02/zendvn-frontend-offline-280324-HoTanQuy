const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const SYMBOLS = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];
let elmLength = document.getElementById('length');
let elmInputlength = document.getElementById('input-length');
let elmCheckboxnumbers = document.getElementById('checkbox-numbers');
let elmCheckboxletters = document.getElementById('checkbox-letters');
let elmCheckboxsymbols = document.getElementById('checkbox-symbols');
let elmGenerate = document.getElementById('btnon-generate');
let elmResult = document.getElementById('result');
let currentInputLength = elmInputlength.value;

//Thay đổi chiều dài mật khẩu
elmInputlength.addEventListener('input', function () {
    currentInputLength = elmInputlength.value;
    console.log(currentInputLength);
    elmLength.textContent = currentInputLength;
})

//Mật khẩu ngẫu nhiên
elmGenerate.addEventListener('click', function () {
    if (!elmCheckboxnumbers.checked && !elmCheckboxletters.checked && !elmCheckboxsymbols.checked) {
        alert("Vui lòng chọn ít nhất 1 kiểu kí tự");
    }
    else {
        elmResult.textContent = "";
        let array = []
        if (elmCheckboxnumbers.checked) {
            array.push(NUMBERS)
        }
        if (elmCheckboxletters.checked) {
            array.push(LETTERS)
        }
        if (elmCheckboxsymbols.checked) {
            array.push(SYMBOLS)
        }
        for (let i = 0; i < currentInputLength; i++) {
            let randomArray = array[Math.floor(Math.random() * array.length)];
            elmResult.textContent += random_character(randomArray);
        }
    }
})

//Copy mật khẩu
elmResult.addEventListener('click', function(){
    let result = elmResult.textContent;
    navigator.clipboard.writeText(result);
    alert("Copied the text: " + result);
})

function random_character(character) {
    let index = 0;
    let pass = "";
    index = Math.floor(Math.random() * ((character.length - 1) + 1));
    pass += character[index];
    return pass;
}

