const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const input = document.getElementById('input');
const output = document.getElementById('output');
const alert = document.getElementById('alert');

async function emojiSearch() {
  const query = input.value.trim();
  if (!query) return;

  const res = await fetch(`https://emojihub.yurace.pro/api/similar/${query}`); //Söker API med användarens input
  const data = await res.json();

  output.innerHTML = ""; // Rensa

  if (!data.length) {
    output.innerHTML = "<p>Inga resultat... 😔<p>";
    return;
  }
  // Om inga träffar ^

  data.forEach(item => {

    const div = document.createElement("div");
    div.className = "emojis";

    div.innerHTML = `
      <div class="emoji">${item.htmlCode}</div>
    `;
    // Loopar igenom allt i array och levererar items i en div.

    div.querySelector('.emoji').addEventListener('click', (e) => {
      navigator.clipboard.writeText(e.target.textContent)

      const temp = document.createElement('span');
      temp.textContent = 'Kopierad!';
      alert.appendChild(temp);

      setTimeout(() => alert.removeChild(temp), 1000); // tar bort efter 2s
    });

    output.appendChild(div);
  });
}


async function randomSearch() {
  const res = await fetch('https://emojihub.yurace.pro/api/random');
  const data = await res.json();

  output.innerHTML = '';

  output.innerHTML = `
    <div class="emoji">${data.htmlCode[0]}</div>
  `
  // Hämtar enbart första koden från htmlCode Array '[0]' eftersom det är random
}

button1.addEventListener('click', emojiSearch); //Kör function emojiSearch vid knapptryck
button2.addEventListener('click', randomSearch); //Kör function randomSearch vid knapptryck

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') emojiSearch();
}); //Detta gör så man kan trycka enter för att söka och inte behöva trycka på knappen
