document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("tasto")
  const button = document.querySelector(".bottone-fluorescente")
  // const link = document.querySelector("#bottone-welcome a").  NON SERVE, messo onclick nell''html
  const toggleButton = function () {
    button.disabled = !checkbox.checked // se non spunti la casella, bottone disabilitato
  }
  toggleButton() //verifica del bottone

  checkbox.addEventListener("change", toggleButton) //se cambia la checkbox, cambia il bottone
  button.addEventListener("click", (event) => {
    if (!checkbox.checked) {
      event.preventDefault()
      // alert("Devi accettare le condizioni prima di procedere") // non si può attivare l'alert su un button disabilitato. come fare?
    }
  })
})
