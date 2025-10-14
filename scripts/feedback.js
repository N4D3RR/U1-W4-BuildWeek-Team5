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
});
