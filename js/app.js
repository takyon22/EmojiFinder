//const som länkar element i HTML/CSS (knappar, inputs, output divs) till denna JS filen
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const input = document.getElementById('input');
const output = document.getElementById('output');
const alert = document.getElementById('alert');

//function för emoji sök
async function emojiSearch() {

  const query = input.value.trim();
  if (!query) return;

  const res = await fetch(`https://emojihub.yurace.pro/api/similar/${query}`);
  //Söker API med användarens input (query)
  const data = await res.json();

  output.innerHTML = ""; // Rensa tidigare sökning

  if (!data.length) {
    output.innerHTML = "<p>Inga resultat... 😔<p>";
    return;
  }
  // om inga träffar ^

  data.forEach(item => {

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="emoji">${item.htmlCode.join('')}</div>
    `;
    // loopar igenom allt i array och levererar emojis i enstaka separata div.
    // Jag löste att emojis inte visas korrekt genom att använda join för att sammanlänka alla html koder i array!! YESS

    div.querySelector('.emoji').addEventListener('click', (e) => {
      navigator.clipboard.writeText(e.target.textContent)
    //kopierar den klickade emojin till clipboard. här funkar det inte att låta användaren kopiera själva html-koden från API
    //då klistras bara själva koden in, inte emojin. textContent fungerar korrekt.

      const temp = document.createElement('span');
      temp.textContent = 'Kopierad!';
      alert.appendChild(temp);
      //skapar en alert som signalerar att emojin kopierats till clipboard
      setTimeout(() => alert.removeChild(temp), 1000); // försvinner efter 2s
    });

    output.appendChild(div);
    //slutligen lägger till den skapade emoji div till output div
  });
}

//function för random emoji sök
async function randomSearch() {
  const res = await fetch('https://emojihub.yurace.pro/api/random');
  const data = await res.json();

  output.innerHTML = '';

  output.innerHTML = `
    <div class="emoji">${data.htmlCode[0]}</div>
  `;
  // Hämtar enbart första koden från htmlCode Array '[0]' för att undvika konstiga emojis
  // hudfärgs emojis renderas inte korrekt på sidan så om jag skriver [0] så visas bara själva emojin.

  output.querySelector('.emoji').addEventListener('click', (e) => {
    navigator.clipboard.writeText(e.target.textContent)

    const temp = document.createElement('span');
    temp.textContent = 'Kopierad!';
    alert.appendChild(temp);
    setTimeout(() => alert.removeChild(temp), 1000); // tar bort efter 2s

    //jag gjorde denna lite annorlunda, utan emojis div t.ex. Det verkar inte behövas om det bara är 1 emoji som genereras
  });

}

button1.addEventListener('click', emojiSearch); //Kör function emojiSearch när användaren klickar på 'Hitta emoji' (button1)
button2.addEventListener('click', randomSearch); //Kör function emojiSearch när användaren klickar på 'Slumpa emoji' (button2)

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') emojiSearch()}); //Kör emojiSearch direkt efter användaren tryckt enter
