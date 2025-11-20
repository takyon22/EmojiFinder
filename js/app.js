const div = document.getElementById("myDiv");
const sound = document.getElementById("clickSound");

div.addEventListener("click", () => {
  sound.currentTime = 0; // startar från början varje gång
  sound.play();
});
