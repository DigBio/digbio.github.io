(function () {
  "use strict";
  var scene = document.querySelector("[data-hero-parallax]");
  if (!scene) return;
  var hero = scene.parentElement;
  var objects = Array.from(scene.querySelectorAll(".hero-research-object"));
  var desktop = matchMedia("(min-width: 1200px)");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  var saveData = Boolean(navigator.connection && navigator.connection.saveData);
  var enabled = false;
  var visible = true;
  var frame = 0;
  var previousTime = 0;
  var scroll = 0;
  var scrollTarget = 0;
  var pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function render() {
    objects.forEach(function (object) {
      var depth = parseFloat(object.dataset.depth);
      var rotation = parseFloat(object.dataset.rotation);
      // Different depths create relative movement without changing the layout.
      var x = pointer.x * depth * 7;
      var y = scroll * depth * 34 + pointer.y * depth * 5;
      object.firstElementChild.style.transform = enabled ?
        "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) rotateX(" +
        (-pointer.y * depth * 2).toFixed(2) + "deg) rotateY(" + (pointer.x * depth * 2).toFixed(2) +
        "deg) rotate(" + (rotation + scroll * depth * 1.8).toFixed(2) + "deg)" : "rotate(" + rotation + "deg)";
    });
  }

  function tick(time) {
    frame = 0;
    if (!enabled || !visible || document.hidden) return;
    var dt = previousTime ? Math.min(time - previousTime, 50) : 16;
    previousTime = time;
    var ease = 1 - Math.exp(-dt / 100);
    scroll += (scrollTarget - scroll) * ease;
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;
    render();
    if (Math.abs(scrollTarget - scroll) > .0001 || Math.abs(pointer.targetX - pointer.x) > .001 || Math.abs(pointer.targetY - pointer.y) > .001) requestRender();
    else previousTime = 0;
  }

  function requestRender() {
    if (!frame && enabled && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function onScroll() {
    if (!enabled) return;
    var rect = hero.getBoundingClientRect();
    scrollTarget = clamp((window.innerHeight * .45 - rect.top) / rect.height, -1, 1);
    requestRender();
  }

  function configure() {
    enabled = desktop.matches && !reduced.matches && !saveData;
    scene.classList.toggle("is-moving", enabled);
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    pointer.x = pointer.y = pointer.targetX = pointer.targetY = 0;
    scroll = scrollTarget = 0;
    render();
    onScroll();
  }

  function reveal() { scene.classList.add("is-ready"); }
  document.addEventListener("intro:bg-revealed", reveal, { once: true });
  setTimeout(reveal, 3600);
  hero.addEventListener("pointermove", function (event) {
    if (!enabled || !finePointer.matches) return;
    var rect = hero.getBoundingClientRect();
    pointer.targetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    pointer.targetY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    requestRender();
  }, { passive: true });
  hero.addEventListener("pointerleave", function () {
    pointer.targetX = pointer.targetY = 0;
    requestRender();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      scene.classList.toggle("is-in-view", visible && !document.hidden);
      if (visible) onScroll();
      else { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
    }).observe(hero);
  } else scene.classList.add("is-in-view");
  document.addEventListener("visibilitychange", function () {
    scene.classList.toggle("is-in-view", visible && !document.hidden);
    if (!document.hidden) onScroll();
    else { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", configure, { passive: true });
  window.addEventListener("pageshow", configure);
  desktop.addEventListener("change", configure);
  reduced.addEventListener("change", configure);
  configure();
})();
