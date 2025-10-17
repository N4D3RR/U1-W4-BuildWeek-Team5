document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("tasto");
  const button = document.querySelector(".bottone-fluorescente");
  // const link = document.querySelector("#bottone-welcome a").  NON SERVE, messo onclick nell''html
  const toggleButton = function () {
    button.disabled = !checkbox.checked; // se non spunti la casella, bottone disabilitato
  };
  toggleButton(); //verifica del bottone

  checkbox.addEventListener("change", toggleButton); //se cambia la checkbox, cambia il bottone
  button.addEventListener("click", (event) => {
    if (!checkbox.checked) {
      event.preventDefault();
      // alert("Devi accettare le condizioni prima di procedere") // non si può attivare l'alert su un button disabilitato. come fare?
    }
  });
});
// ____________________________________________________
const select = document.getElementById("livello-difficolta");

select.addEventListener("change", () => {
  const livello = select.value;
  console.log("Hai selezionato:", livello);

  // Esempio: salvi il livello nel localStorage per usarlo nella pagina 2quiz.html
  localStorage.setItem("livelloDifficolta", livello);
});
button.addEventListener("click", (event) => {
  const livello = select.value;
  if (!checkbox.checked || livello === "") {
    event.preventDefault();
    alert(
      "Devi accettare le condizioni e scegliere una difficoltà per procedere!"
    );
  }
});
// OOOOOOOOOOOOOOOOOOOOOOOOOOOO
