let elmnumber1 = document.getElementById('number-1')
let elmnumber2 = document.getElementById('number-2')
let elmresult = document.getElementById('result')
let elmGenerate = document.getElementById('Generate')

elmGenerate.addEventListener('click', function () {
    let valuen1 = elmnumber1.value;
    let valuen2 = elmnumber2.value;

    if (valuen1 == "" || valuen2 == '') {
        alert("Vui long nhap so!");
    }
    else
        if (parseInt(elmnumber1.value) > parseInt(valuen2)) {
            alert("Vui long nhap dung!");
        }
        else {
            elmresult.value = Math.floor(Math.random() * (parseInt(valuen2) - parseInt(valuen1) + 1)) + parseInt(valuen1);
        }
});
