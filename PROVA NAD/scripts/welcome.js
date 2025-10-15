document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("tasto");
  const button = document.querySelector(".bottone-fluorescente");
  const link = document.querySelector("#bottone-welcome a");

  button.addEventListener("click", (event) => {
    if (!checkbox.checked) {
      event.preventDefault();
      alert("Devi accettare le condizioni prima di procedere");
    }
  });
});
