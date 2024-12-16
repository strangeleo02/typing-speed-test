const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.WPM span');
const cpm = document.querySelector('.CPM span');
const btn = document.querySelector('button');
//set values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraphs() {
    const paragraphs = ["The early bird catches the worm, but the second mouse gets the cheese. It's a classic tale of risk and reward, where sometimes it pays to be patient and sometimes it pays to be bold.",
        "The quick brown fox jumps over the lazy dog. A day without sunshine is like a day without a job.",
        "The sun sets over the horizon, casting a warm glow on the world. It's a beautiful sight to behold.",
        "The world is a magical place, filled with wonders and mysteries. It's a place where you can learn and grow.",
        "The sunrise is a sight to behold, painting the sky with hues of pink, orange, and purple. It's a beautiful sight to behold."
    ]
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    for (const char of paragraphs[randomIndex]) {
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.firstElementChild.classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener('click', () => input.focus());
}
//handle user input

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    const typedChar = input.value[charIndex];
    
    // Prevent errors when reaching end of text
    if (charIndex >= characters.length || timeLeft <= 0) {
        clearInterval(timer);
        input.value = '';
        return;
    }

    if (!isTyping) {
        timer = setInterval(initTime, 1000);
        isTyping = true;
    }
    
    // Handle backspace and character comparison
    if (typedChar) {
        if (typedChar === characters[charIndex].innerText) {
            characters[charIndex].classList.remove('active');
            characters[charIndex].classList.add('correct');
        } else {
            characters[charIndex].classList.remove('active');
            characters[charIndex].classList.add('incorrect');
            mistake++;
        }
        
        charIndex++;
        
        // Safely add 'active' class, avoiding out-of-bounds error
        if (characters[charIndex]) {
            characters[charIndex].classList.add('active');
        }
        
        mistakes.innerText = mistake;
        cpm.innerText = Math.round((charIndex - mistake));
        
        // Calculate WPM only once
        const totalTime = maxTime - timeLeft;
        const wpmVal = totalTime > 0 
            ? Math.round((charIndex - mistake) / 5 / totalTime * 60) 
            : 0;
        wpm.innerText = wpmVal;
    }
}


function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
    } else {
        clearInterval(timer);
        const totalTime = maxTime - timeLeft; // Calculate total time
        const wpm = Math.round((charIndex - mistake) / 5 / totalTime * 60);
        wpm.innerText = wpm;
    }
}


function reset() {
    loadParagraphs();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    input.value = "";
}
input.addEventListener('input', initTyping);
btn.addEventListener("click", reset);
loadParagraphs();