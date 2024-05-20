let elNumber1 = document.getElementById('number-one')
let elNumber2 = document.getElementById('number-two')
let elSum = document.getElementById('btn-sum')
let elsubtract = document.getElementById('btn-subtract')
let elmultiply = document.getElementById('btn-multiply')
let eldivide = document.getElementById('btn-divide')
let elresult = document.getElementById('result')

console.log(elNumber1);

elSum.addEventListener('click', function(){
    let number1 = elNumber1.value
    let number2= elNumber2.value
    elresult.textContent = parseInt(number1) + parseInt(number2)
});

elsubtract.addEventListener('click', function(){
    let number1 = elNumber1.value
    let number2= elNumber2.value
    elresult.textContent = parseInt(number1) - parseInt(number2)
});

elmultiply.addEventListener('click', function(){
    let number1 = elNumber1.value
    let number2= elNumber2.value
    elresult.textContent = parseInt(number1) * parseInt(number2)
});

eldivide.addEventListener('click', function(){
    let number1 = elNumber1.value
    let number2= elNumber2.value
    elresult.textContent = parseInt(number1) / parseInt(number2)
});