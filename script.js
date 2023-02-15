let pallete = { // initial colors
    0: '#EEEDF0',
    1: '#A1B5C1',
    2: '#F9ACA7',
    3: '#68747D',
    4: '#CF365F',
}
let cards;
let copyButton;

window.onload = () => {
    cards = document.querySelectorAll('.color-card');
    copyButton = document.querySelector('#copy');


    let generateButton = document.querySelector('#generate');
    generateButton.addEventListener('click', generate);

    copyButton.addEventListener('click', (event) => {
        showStatus('pallete');
    })

    cards.forEach((card, index) => {
        card.addEventListener('click', (event) => {

            showStatus(pallete[index]);
        });
        setColors(card, index);
    });

}

window.addEventListener('keypress', (event) => {
    if (event.code === 'KeyC') {
        copyButton.click();
    } else if (event.code === 'Space') {
        generate();
    }
})

const setColors = (card, index) => {

    const color = pallete[index];
    const display = card.children[0];
    const name = card.children[1];

    card.setAttribute('data-clipboard-text', color);
    copyButton.setAttribute('data-clipboard-text', JSON.stringify(pallete));
    display.style.backgroundColor = color;
    name.innerText = color;

    new ClipboardJS('.cpt');
}

const generate = () => {
    for (let i = 0; i < 5; i++) {
        let color = Math.floor(Math.random() * 16777215).toString(16);
        pallete[i] = `#${color.toUpperCase()}`;
    }

    showColors();
}

const showColors = () => {
    cards.forEach((card, index) => {
        setColors(card, index);
    })
}

const showStatus = (color) => {
    let status = document.querySelector('#status');
    status.style.display = 'none';


    let copiedColor = document.querySelector('#copiedColor');
    copiedColor.innerText = color;

    status.style.display = 'block';


    setTimeout(() => {
        status.style.display = 'none';
    }, 2000)
}
