const COLOR_CHARACTER = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let elmColor = document.getElementById('color')
let elmButton = document.getElementById('button-random')
let elmBox = document.getElementById('color-box')


elmButton.addEventListener('click', function () {
    elmColor.textContent = random_color();
    elmBox.style.backgroundColor = random_color();
});

elmColor.addEventListener('click', function () {
    let Color = elmColor.textContent;
    navigator.clipboard.writeText(Color);
    alert("Copied the text: " + Color);
})

function random_color() {
    let index = 0;
    let color = "#";
    for (let i = 0; i < 6; i++) {
        index = Math.floor(Math.random() * ((COLOR_CHARACTER.length - 1) + 1));
        color += COLOR_CHARACTER[index];
    }
    console.log(color);
    return color;
}