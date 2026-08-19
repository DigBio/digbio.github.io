(function () {
  if (!document.body.classList.contains("home")) {
    return;
  }

  var contentInner = document.querySelector(".pagebreak_container_inner");
  var heroBox = document.querySelector(".pagebreak.pagebreak_right");

  if (!contentInner || !heroBox) {
    dispatchBgRevealed();
    return;
  }

  var heading = contentInner.querySelector("h1");
  var bodyEls = contentInner.querySelectorAll("p, a.btn-mayecreate");

  if (!window.matchMedia("(min-width: 1200px)").matches) {
    revealTextInstantly();
    dispatchBgRevealed();
    return;
  }

  runIntro();

  function runIntro() {
    var target = computeTarget();
    var overlay = createOverlay(target);
    document.body.appendChild(overlay);

    var animation = overlay.animate(
      [{ transform: "scale(" + overlay.dataset.startScale + ")" }, { transform: "scale(1)" }],
      { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
    );

    animation.onfinish = function () {
      overlay.parentNode.removeChild(overlay);
      revealHeadingThenBody();
    };
  }

  function revealHeadingThenBody() {
    if (heading) {
      heading.classList.add("intro-revealed");
    }

    window.setTimeout(function () {
      bodyEls.forEach(function (el) {
        el.classList.add("intro-revealed");
      });

      window.setTimeout(revealBackground, 500);
    }, 250);
  }

  function revealTextInstantly() {
    if (heading) {
      heading.classList.add("intro-revealed");
    }

    bodyEls.forEach(function (el) {
      el.classList.add("intro-revealed");
    });
  }

  function revealBackground() {
    heroBox.classList.add("intro-bg-revealed");
    window.setTimeout(dispatchBgRevealed, 800);
  }

  function dispatchBgRevealed() {
    document.dispatchEvent(new CustomEvent("intro:bg-revealed"));
  }

  function computeTarget() {
    var diameter = 140;

    return {
      diameter: diameter,
      viewportCenterX: 100,
      viewportCenterY: window.innerHeight - 100
    };
  }

  function createOverlay(target) {
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var diameter = target.diameter;
    var boxTop = target.viewportCenterY - diameter / 2;
    var boxLeft = target.viewportCenterX - diameter / 2;

    var scaleX = Math.max((2 * target.viewportCenterX) / diameter, (2 * (viewportWidth - target.viewportCenterX)) / diameter);
    var scaleY = Math.max((2 * target.viewportCenterY) / diameter, (2 * (viewportHeight - target.viewportCenterY)) / diameter);
    var scale = Math.max(scaleX, scaleY) * 1.15;

    var el = document.createElement("div");
    el.id = "intro-overlay";
    el.dataset.startScale = String(scale);
    el.style.cssText = [
      "position:fixed",
      "top:" + boxTop + "px",
      "left:" + boxLeft + "px",
      "width:" + diameter + "px",
      "height:" + diameter + "px",
      "border-radius:50%",
      "background:#F1E6DE",
      "z-index:9999",
      "pointer-events:none",
      "transform-origin:50% 50%",
      "will-change:transform"
    ].join(";");

    return el;
  }
})();
