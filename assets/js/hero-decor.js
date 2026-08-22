(function () {
  if (!document.body.classList.contains("home")) {
    return;
  }

  var hero = document.querySelector(".pagebreak.pagebreak_right");
  var decors = Array.prototype.slice.call(document.querySelectorAll(".pagebreak.pagebreak_right .hero-decor"));

  if (!hero || decors.length === 0) {
    return;
  }

  decors.forEach(function (image) {
    image.draggable = false;
    image.setAttribute("draggable", "false");
  });

  var desktopQuery = window.matchMedia("(min-width: 1200px)");
  var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var kindOrder = ["protein", "neuralnetwork", "cell"];
  var activeBodies = [];
  var animationFrame = null;
  var bounds = null;
  var groups = groupByKind(decors);
  var lastFrameTime = 0;
  var pointer = {
    active: false,
    lastSeen: 0,
    x: 0,
    y: 0
  };
  var started = false;

  var slots = [
    { left: 62, top: 16, size: 36, rotation: -7, opacity: 1, layer: 1 },
    { left: 88, top: 49, size: 37, rotation: 5, opacity: 1, layer: 2 },
    { left: 64, top: 95, size: 36, rotation: -4, opacity: 1, layer: 1 }
  ];

  document.addEventListener("intro:bg-revealed", start, { once: true });
  window.setTimeout(start, 3600);
  window.addEventListener("blur", clearPointer);
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerleave", clearPointer);
  window.addEventListener("resize", handleResize);

  bindMediaChange(desktopQuery, function () {
    if (desktopQuery.matches) {
      start();
    } else {
      stop();
    }
  });

  bindMediaChange(reducedMotionQuery, function () {
    if (started) {
      stop();
      start();
    }
  });

  function start() {
    if (started || !desktopQuery.matches) {
      return;
    }

    started = true;
    activeBodies = [];
    decors.forEach(hideImmediately);
    updateBounds();

    var selected = selectSceneDecors();

    for (var i = 0; i < selected.length; i++) {
      showInSlot(selected[i], i);
    }

    if (!reducedMotionQuery.matches) {
      lastFrameTime = 0;
      animationFrame = window.requestAnimationFrame(tick);
    }
  }

  function stop() {
    started = false;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
    activeBodies = [];
    decors.forEach(hideImmediately);
  }

  function showInSlot(image, slotIndex) {
    var body = createBody(image, slots[slotIndex], slotIndex);
    activeBodies.push(body);
    renderBody(body);

    window.requestAnimationFrame(function () {
      image.classList.add("is-visible");
    });
  }

  function createBody(image, slot, slotIndex) {
    var x = pctToX(slot.left + randomFloat(-1, 1));
    var y = pctToY(slot.top + randomFloat(-1, 1));
    var sizePct = slot.size + randomFloat(-1, 1);
    var body = {
      anchorX: x,
      anchorY: y,
      angularVelocity: randomFloat(-0.45, 0.45),
      image: image,
      layer: slot.layer,
      opacity: slot.opacity,
      radius: 0,
      rotation: slot.rotation + randomFloat(-3.5, 3.5),
      driftPct: slot.drift || 5.4,
      driftPx: 0,
      sizePct: sizePct,
      sizePx: 0,
      slotIndex: slotIndex,
      vx: randomSignedVelocity(),
      vy: randomSignedVelocity(),
      wanderDuration: 0,
      wanderTimer: 0,
      wanderX: 0,
      wanderY: 0,
      x: x,
      y: y
    };

    updateBodyMetrics(body);
    refreshWander(body);
    image.style.zIndex = String(slot.layer);
    image.dataset.heroSlot = String(slotIndex);

    return body;
  }

  function tick(timestamp) {
    if (!started) {
      return;
    }

    if (!lastFrameTime) {
      lastFrameTime = timestamp;
    }

    var dt = Math.min((timestamp - lastFrameTime) / 1000, 0.05);
    lastFrameTime = timestamp;

    updateBounds();
    activeBodies.forEach(function (body) {
      updateBodyMetrics(body);
      applyBrownianForces(body, dt);
      applyPointerDisturbance(body, dt, timestamp);
      integrate(body, dt);
      collideWithBounds(body);
    });
    resolveBodyCollisions();
    activeBodies.forEach(function (body) {
      confineToAnchor(body);
      collideWithBounds(body);
    });
    activeBodies.forEach(renderBody);

    animationFrame = window.requestAnimationFrame(tick);
  }

  function applyBrownianForces(body, dt) {
    var spring = 0.09;
    var wander = 22;
    var jitter = 4;

    body.wanderTimer -= dt;

    if (body.wanderTimer <= 0) {
      refreshWander(body);
    }

    body.vx += body.wanderX * wander * dt;
    body.vy += body.wanderY * wander * dt;
    body.vx += randomFloat(-jitter, jitter) * dt;
    body.vy += randomFloat(-jitter, jitter) * dt;
    body.vx += (body.anchorX - body.x) * spring * dt;
    body.vy += (body.anchorY - body.y) * spring * dt;

    var damping = Math.pow(0.984, dt * 60);
    body.vx *= damping;
    body.vy *= damping;
    limitSpeed(body, 20);
    body.rotation += body.angularVelocity * dt;
  }

  function applyPointerDisturbance(body, dt, timestamp) {
    if (!pointer.active || timestamp - pointer.lastSeen > 1200) {
      pointer.active = false;
      return;
    }

    var dx = body.x - pointer.x;
    var dy = body.y - pointer.y;
    var distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
    var radius = Math.max(300, body.sizePx * 1.02);

    if (distance > radius) {
      return;
    }

    if (distance < 12) {
      var angle = body.slotIndex * 2.399963 + timestamp * 0.001;

      dx = Math.cos(angle) * 12;
      dy = Math.sin(angle) * 12;
      distance = 12;
    }

    var nx = dx / distance;
    var ny = dy / distance;
    var falloff = Math.pow(1 - distance / radius, 1.35);
    var push = 920 * falloff;
    var swirl = 360 * falloff;
    var directPush = 84 * falloff;
    var directSwirl = 28 * falloff;

    body.vx += (nx * push - ny * swirl) * dt;
    body.vy += (ny * push + nx * swirl) * dt;
    body.x += (nx * directPush - ny * directSwirl) * dt;
    body.y += (ny * directPush + nx * directSwirl) * dt;
    body.angularVelocity += randomFloat(-1.4, 1.4) * falloff * dt;
    limitSpeed(body, 130);
  }

  function integrate(body, dt) {
    body.x += body.vx * dt;
    body.y += body.vy * dt;
  }

  function collideWithBounds(body) {
    var minX = bounds.left + body.radius * 0.18;
    var maxX = bounds.right - body.radius * 0.18;
    var minY = bounds.top + body.radius * 0.18;
    var maxY = bounds.bottom - body.radius * 0.18;
    var bounce = 0.78;

    if (body.x < minX) {
      body.x = minX;
      body.vx = Math.abs(body.vx) * bounce;
    } else if (body.x > maxX) {
      body.x = maxX;
      body.vx = -Math.abs(body.vx) * bounce;
    }

    if (body.y < minY) {
      body.y = minY;
      body.vy = Math.abs(body.vy) * bounce;
    } else if (body.y > maxY) {
      body.y = maxY;
      body.vy = -Math.abs(body.vy) * bounce;
    }
  }

  function resolveBodyCollisions() {
    for (var i = 0; i < activeBodies.length; i++) {
      for (var j = i + 1; j < activeBodies.length; j++) {
        collideBodies(activeBodies[i], activeBodies[j]);
      }
    }
  }

  function collideBodies(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
    var minDistance = a.radius + b.radius;

    if (distance >= minDistance) {
      return;
    }

    var nx = dx / distance;
    var ny = dy / distance;
    var overlap = minDistance - distance;
    var separation = overlap * 0.52;

    a.x -= nx * separation;
    a.y -= ny * separation;
    b.x += nx * separation;
    b.y += ny * separation;

    var relativeVelocityX = b.vx - a.vx;
    var relativeVelocityY = b.vy - a.vy;
    var velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

    if (velocityAlongNormal > 0) {
      return;
    }

    var impulse = -velocityAlongNormal * 0.62;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;
  }

  function renderBody(body) {
    body.image.style.setProperty("--hero-decor-x", body.x.toFixed(2) + "px");
    body.image.style.setProperty("--hero-decor-y", body.y.toFixed(2) + "px");
    body.image.style.setProperty("--hero-decor-size", body.sizePct.toFixed(2) + "%");
    body.image.style.setProperty("--hero-decor-rotation", body.rotation.toFixed(2) + "deg");
    body.image.style.setProperty("--hero-decor-opacity", body.opacity.toFixed(2));
  }

  function hideImmediately(image) {
    image.classList.remove("is-visible");
    image.removeAttribute("data-hero-slot");
    image.style.removeProperty("--hero-decor-x");
    image.style.removeProperty("--hero-decor-y");
  }

  function updateBounds() {
    var rect = hero.getBoundingClientRect();
    var footer = document.querySelector("footer.site-footer");
    var footerTop = footer ? footer.getBoundingClientRect().top - rect.top : rect.height;
    var visualBottom = Math.max(rect.height * 1.02, footerTop);

    bounds = {
      bottom: visualBottom,
      height: rect.height,
      left: rect.width * 0.3,
      right: rect.width * 1.14,
      top: rect.height * 0.01,
      width: rect.width
    };
  }

  function updateBodyMetrics(body) {
    body.sizePx = (body.sizePct / 100) * bounds.width;
    body.radius = body.sizePx * 0.34;
    body.driftPx = (body.driftPct / 100) * bounds.width;
  }

  function confineToAnchor(body) {
    var dx = body.x - body.anchorX;
    var dy = body.y - body.anchorY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= body.driftPx || distance === 0) {
      return;
    }

    var nx = dx / distance;
    var ny = dy / distance;
    var velocityAwayFromAnchor = body.vx * nx + body.vy * ny;

    body.x = body.anchorX + nx * body.driftPx;
    body.y = body.anchorY + ny * body.driftPx;

    if (velocityAwayFromAnchor > 0) {
      body.vx -= velocityAwayFromAnchor * nx * 1.35;
      body.vy -= velocityAwayFromAnchor * ny * 1.35;
    }
  }

  function handleResize() {
    if (!started) {
      return;
    }

    var oldBounds = bounds;
    updateBounds();

    if (!oldBounds || oldBounds.width === 0 || oldBounds.height === 0) {
      return;
    }

    activeBodies.forEach(function (body) {
      body.x = (body.x / oldBounds.width) * bounds.width;
      body.y = (body.y / oldBounds.height) * bounds.height;
      body.anchorX = (body.anchorX / oldBounds.width) * bounds.width;
      body.anchorY = (body.anchorY / oldBounds.height) * bounds.height;
      updateBodyMetrics(body);
      renderBody(body);
    });
  }

  function handlePointerMove(event) {
    if (!started || !desktopQuery.matches || reducedMotionQuery.matches) {
      clearPointer();
      return;
    }

    if (!bounds) {
      updateBounds();
    }

    var rect = hero.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var padding = 260;

    pointer.x = x;
    pointer.y = y;
    pointer.lastSeen = performance.now();
    pointer.active = x >= bounds.left - padding && x <= bounds.right + padding && y >= bounds.top - padding && y <= bounds.bottom + padding;
  }

  function clearPointer() {
    pointer.active = false;
  }

  function selectSceneDecors() {
    var pickedByKind = {
      protein: pickRandom(groups.protein, 1),
      neuralnetwork: pickRandom(groups.neuralnetwork, 1),
      cell: pickRandom(groups.cell, 1)
    };

    return shuffleList(kindOrder).map(function (kind) {
      return pickedByKind[kind].shift();
    }).filter(Boolean);
  }

  function groupByKind(images) {
    return images.reduce(function (result, image) {
      var kind = image.getAttribute("data-hero-kind");

      if (!result[kind]) {
        result[kind] = [];
      }

      result[kind].push(image);
      return result;
    }, { protein: [], neuralnetwork: [], cell: [] });
  }

  function pickRandom(list, count) {
    var pool = list.slice();
    var picked = [];

    while (picked.length < count && pool.length) {
      picked.push(pool.splice(randomInt(0, pool.length - 1), 1)[0]);
    }

    return picked;
  }

  function shuffleList(list) {
    var shuffled = list.slice();

    for (var i = shuffled.length - 1; i > 0; i--) {
      var swapIndex = randomInt(0, i);
      var value = shuffled[i];

      shuffled[i] = shuffled[swapIndex];
      shuffled[swapIndex] = value;
    }

    return shuffled;
  }

  function pctToX(value) {
    return (value / 100) * bounds.width;
  }

  function pctToY(value) {
    return (value / 100) * bounds.height;
  }

  function limitSpeed(body, maxSpeed) {
    var speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);

    if (speed <= maxSpeed || speed === 0) {
      return;
    }

    var scale = maxSpeed / speed;
    body.vx *= scale;
    body.vy *= scale;
  }

  function refreshWander(body) {
    var angle = randomFloat(0, Math.PI * 2);

    body.wanderX = Math.cos(angle);
    body.wanderY = Math.sin(angle);
    body.wanderDuration = randomFloat(1.35, 2.8);
    body.wanderTimer = body.wanderDuration;
  }

  function randomSignedVelocity() {
    var speed = randomFloat(9, 18);
    return Math.random() < 0.5 ? -speed : speed;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function bindMediaChange(query, callback) {
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", callback);
    } else if (typeof query.addListener === "function") {
      query.addListener(callback);
    }
  }
})();
