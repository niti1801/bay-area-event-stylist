(function () {
  "use strict";

  function initCarousels() {
    var carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach(function (carousel) {
      var track = carousel.querySelector(".carousel__track");
      var dotsContainer = carousel.querySelector(".carousel__dots");
      if (!track || !dotsContainer) return;

      var slides = track.querySelectorAll(".carousel__slide");
      if (slides.length === 0) return;

      dotsContainer.innerHTML = "";
      var dots = [];

      for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement("span");
        dot.className = "carousel__dot";
        dot.setAttribute("aria-hidden", "true");
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }

      function activeIndex() {
        var slide = slides[0];
        if (!slide) return 0;
        var w = slide.offsetWidth + 8;
        return Math.round(track.scrollLeft / w);
      }

      function updateDots() {
        var idx = Math.min(activeIndex(), dots.length - 1);
        for (var j = 0; j < dots.length; j++) {
          dots[j].classList.toggle("is-active", j === idx);
        }
      }

      var scrollTimer;
      track.addEventListener(
        "scroll",
        function () {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(updateDots, 50);
        },
        { passive: true }
      );

      window.addEventListener("resize", updateDots, { passive: true });
      updateDots();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousels);
  } else {
    initCarousels();
  }
})();
