const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
    {
        image: './img/drink.jpg',
        text: "May I have some water, please?"
    },
    {
        image: './img/angry.jpg',
        text: "I am mad!"
    },
    {
        image: './img/food.jpg',
        text: "I am hungry!"
    },
    {
        image: './img/grandma.jpg',
        text: "Whose grandma is this?"
    },
    {
        image: './img/happy.jpg',
        text: "I am happy today!"
    },
    {
        image: './img/home.jpg',
        text: "I want to go home."
    },
    {
        image: './img/hurt.jpg',
        text: "I am hurt!"
    },
    {
        image: './img/outside.jpg',
        text: "Can we go outside?"
    },
    {
        image: './img/sad.jpg',
        text: "I feel sad!"
    },
    {
        image: './img/scared.jpg',
        text: "I was scared last night!"
    },
    {
        image: './img/school.jpg',
        text: "This school is very good!"
    },
    {
        image: './img/tired.jpg',
        text: "You look tired!"
    },

];

data.forEach(createBox);

//create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    //add an active effect
    box.classList.add('active');
    setTimeout(()=> box.classList.remove('active'),800);
});

    main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();

//store the voices
let voices = [];

function getVoices() {
    let voices = SpeechSynthesis.getVoices();

    voices.forEach(voice =>{
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

//set text 
function setTextMessage(text){
    message.text = text;
}

//speak text
function speakText() {
    speechSynthesis.speak(message);
}

//voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

//close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//read text button
readBtn.addEventListener('click', ()=>{
    setTextMessage(textarea.value);
    speakText();
});


getVoices();