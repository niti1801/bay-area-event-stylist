(function () {
  "use strict";

  /** Largest font size (px) so tagline stays on one line within .tagline-wrap */
  function fitTagline() {
    var wrap = document.querySelector(".tagline-wrap");
    var el = document.querySelector(".tagline");
    if (!wrap || !el) return;

    var targetW = wrap.clientWidth;
    if (targetW < 8) return;

    var minPx = 8;
    var maxPx = 22;

    el.style.fontSize = maxPx + "px";
    if (el.scrollWidth <= targetW + 0.5) {
      el.style.fontSize = maxPx + "px";
      return;
    }

    var lo = minPx;
    var hi = maxPx;
    var best = minPx;
    var i;
    for (i = 0; i < 32; i++) {
      var mid = (lo + hi) / 2;
      el.style.fontSize = mid + "px";
      if (el.scrollWidth <= targetW) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
      if (hi - lo < 0.12) break;
    }
    el.style.fontSize = Math.round(best * 100) / 100 + "px";
  }

  function initTaglineFit() {
    function run() {
      fitTagline();
    }

    run();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    }

    var wrap = document.querySelector(".tagline-wrap");
    if (wrap && typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () {
        fitTagline();
      });
      ro.observe(wrap);
    }

    window.addEventListener("orientationchange", function () {
      setTimeout(fitTagline, 200);
    });
    window.addEventListener("resize", function () {
      fitTagline();
    });
  }

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

      function updateEndMask() {
        var maxScroll = track.scrollWidth - track.clientWidth;
        var atEnd = maxScroll <= 2 || track.scrollLeft >= maxScroll - 3;
        carousel.classList.toggle("carousel--at-end", atEnd);
      }

      var scrollTimer;
      track.addEventListener(
        "scroll",
        function () {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(function () {
            updateDots();
            updateEndMask();
          }, 50);
        },
        { passive: true }
      );

      function onResizeCarousel() {
        updateDots();
        updateEndMask();
      }

      window.addEventListener("resize", onResizeCarousel, { passive: true });
      updateDots();
      updateEndMask();
      requestAnimationFrame(updateEndMask);
    });
  }

  function initScrollReveals() {
    if (typeof IntersectionObserver === "undefined") return;

    var revealEls = document.querySelectorAll(".section-title, .project");

    revealEls.forEach(function (el) {
      el.setAttribute("data-reveal", "");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -16px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initScrollTop() {
    var btn = document.querySelector(".scroll-top");
    if (!btn) return;

    btn.removeAttribute("hidden");

    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 300);
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initFooterReveal() {
    if (typeof IntersectionObserver === "undefined") return;

    var footer = document.querySelector(".site-footer");
    if (!footer) return;

    var observer = new IntersectionObserver(
      function (entries) {
        footer.classList.toggle("is-visible", entries[0].isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(footer);
  }

  function init() {
    initTaglineFit();
    initCarousels();
    initScrollReveals();
    initFooterReveal();
    initScrollTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
