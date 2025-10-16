document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".strs");
  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      resetStars();
      highlightStars(index);
    });
    star.addEventListener("mouseout", () => {
      resetStars();
      if (selectedRating > 0) highlightStars(selectedRating - 1);
    });
    star.addEventListener("click", () => {
      selectedRating = index + 1;
      resetStars();
      highlightStars(index);
      console.log("Hai votato:", selectedRating);
    });
  });
  function highlightStars(index) {
    for (let i = 0; i <= index; i++) {
      stars[i].src = "./assets/img/star.svg";
    }
  }

  function resetStars() {
    stars.forEach((star) => {
      star.src = "./assets/img/star-filled.svg";
    });
  }
  const commentInput = document.getElementById("commenthere");
  const moreInfoButton = document.querySelector(".bottone-fluorescente");
  let commentSent = false;

  // ooooooooooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  // CONBTN
  moreInfoButton.addEventListener("click", (event) => {
    if (!commentSent) {
      event.preventDefault();
      const comment = commentInput.value.trim();
      if (comment === "") {
        alert("Prima di procedere inserisci un commento");
      } else {
        alert("È stato inviato il commento: " + comment);
        commentSent = true;
        commentInput.value = "";
      }
    }
  });
});

// CONINV

// moreInfoButton.addEventListener("click", (event) => {
//   if (!commentSent) {
//     event.preventDefault(); // blocca il link
//     const comment = commentInput.value.trim();
//     if (comment === "") {
//       alert("Prima di procedere inserisci un commento");
//     } else {
//       alert("È stato inviato il commento: " + comment);
//       commentSent = true;
//     }
//   }
//   commentInput.addEventListener("keydown", (event) => {
//     if (event.key === "Enter" && !commentSent) {
//       event.preventDefault();
//       const comment = commentInput.value.trim();
//       if (comment === "") {
//         alert("Prima di procedere inserisci un commento");
//       } else {
//         alert("È stato inviato il commento: " + comment);
//         commentSent = true;
//         commentInput.value = "";
//       }
//     }
//   });
// });
// });
