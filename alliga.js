// Esempio base con fetch
fetch("https://strive-school-data.s3.amazonaws.com/quizzes/2021-04-21.json") // ← sostituisci con l'URL reale
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore nel recupero dei dati");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Dati ricevuti:", data);
    // Qui puoi usare i dati nel tuo progetto
  })
  .catch((err) => console.error("Errore:", err));
