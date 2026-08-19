(function () {
  if (!document.body.classList.contains("home")) {
    return;
  }

  var contentEl = document.querySelector(".pagebreak_right_content");
  var contentInner = document.querySelector(".pagebreak_container_inner");
  var heroBox = document.querySelector(".pagebreak.pagebreak_right");

  if (!contentEl || !contentInner || !heroBox) {
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

  var target = measureTargetCircle();

  if (!target) {
    revealTextInstantly();
    revealBackground();
    return;
  }

  runIntro();

  function runIntro() {
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

  function measureTargetCircle() {
    var rect = contentEl.getBoundingClientRect();
    var after = getComputedStyle(contentEl, "::after");
    var afterWidth = parseFloat(after.width);
    var afterHeight = parseFloat(after.height);
    var afterLeftOffset = parseFloat(after.left) || 0;
    var afterTopOffset = parseFloat(after.top) || 0;

    if (!afterWidth || !afterHeight) {
      return null;
    }

    return {
      top: rect.top + afterTopOffset,
      left: rect.left + afterLeftOffset,
      width: afterWidth,
      height: afterHeight
    };
  }

  function createOverlay(box) {
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var centerX = box.left + box.width / 2;
    var centerY = box.top + box.height / 2;

    var scaleX = Math.max((2 * centerX) / box.width, (2 * (viewportWidth - centerX)) / box.width);
    var scaleY = Math.max((2 * centerY) / box.height, (2 * (viewportHeight - centerY)) / box.height);
    var scale = Math.max(scaleX, scaleY) * 1.15;

    var el = document.createElement("div");
    el.id = "intro-overlay";
    el.dataset.startScale = String(scale);
    el.style.cssText = [
      "position:fixed",
      "top:" + box.top + "px",
      "left:" + box.left + "px",
      "width:" + box.width + "px",
      "height:" + box.height + "px",
      "border-radius:50%",
      "background:#f3e2d8",
      "z-index:9999",
      "pointer-events:none",
      "transform-origin:50% 50%",
      "will-change:transform"
    ].join(";");

    return el;
  }
})();
