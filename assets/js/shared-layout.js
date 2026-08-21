(function () {
  var script = document.currentScript;
  var siteRoot = script && script.getAttribute("data-site-root") ? script.getAttribute("data-site-root") : ".";
  var pageId = document.body.classList.contains("home") ? "home" : document.body.classList.contains("single-post") ? "news" : getPageId(window.location.pathname);
  var partialTemplates = getPartialTemplates();
  var navigationObserver = null;

  loadSiteOverrides();
  loadPartial("site-header", "partials/header.html");
  loadPartial("site-footer", "partials/footer.html");
  bindNavigationStateEvents();

  function loadPartial(targetName, partialPath) {
    var target = document.querySelector('[data-include="' + targetName + '"]');

    if (!target) {
      return;
    }

    if (window.location.protocol === "file:") {
      renderPartial(target, partialTemplates[targetName]);
      return;
    }

    fetch(withBase(partialPath))
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + partialPath);
        }
        return response.text();
      })
      .then(function (html) {
        renderPartial(target, html);
      })
      .catch(function (error) {
        if (window.console) {
          window.console.error(error);
        }
        renderPartial(target, partialTemplates[targetName]);
      });
  }

  function renderPartial(target, html) {
    if (!html) {
      return;
    }

    target.outerHTML = html;
    prepareSharedLayout();
  }

  function prepareSharedLayout() {
    rewriteSitePaths();
    markActiveNavigation();
    applyHomeContainers();
    updateCurrentYear();
    syncNavigationAffixState();
    watchNavigationClass();
    refreshNavigationSpacing();
    document.dispatchEvent(new CustomEvent("shared-layout:ready"));
  }

  function rewriteSitePaths() {
    var links = document.querySelectorAll("[data-site-href]");
    var images = document.querySelectorAll("[data-site-src]");

    links.forEach(function (link) {
      link.setAttribute("href", withBase(link.getAttribute("data-site-href")));
    });

    images.forEach(function (image) {
      image.setAttribute("src", withBase(image.getAttribute("data-site-src")));
    });
  }

  function markActiveNavigation() {
    var items = document.querySelectorAll("[data-nav-id]");

    items.forEach(function (item) {
      var link = item.querySelector("a");

      item.classList.remove("active", "page_item");
      if (link) {
        link.removeAttribute("aria-current");
      }

      if (item.getAttribute("data-nav-id") === pageId) {
        item.classList.add("active", "page_item");
        if (link) {
          link.setAttribute("aria-current", "page");
        }
      }
    });
  }

  function applyHomeContainers() {
    if (pageId !== "home") {
      return;
    }

    document.querySelectorAll("[data-home-container]").forEach(function (container) {
      container.classList.add("container-home");
    });
  }

  function updateCurrentYear() {
    var year = new Date().getFullYear().toString();

    document.querySelectorAll("[data-current-year]").forEach(function (target) {
      target.textContent = year;
    });
  }

  function refreshNavigationSpacing() {
    var navigation = document.getElementById("navigation");
    var contentWrap = document.getElementById("contentwrap");
    var homeContentWrap = document.getElementById("homeContentWrap");
    var target = contentWrap || homeContentWrap;

    if (!navigation || !target) {
      return;
    }

    target.style.paddingTop = navigation.offsetHeight + "px";
  }

  function bindNavigationStateEvents() {
    ["scroll", "resize", "load", "pageshow"].forEach(function (eventName) {
      window.addEventListener(eventName, syncNavigationStateSoon);
    });
    [0, 100, 500].forEach(function (delay) {
      window.setTimeout(syncNavigationStateSoon, delay);
    });
  }

  function syncNavigationStateSoon() {
    window.requestAnimationFrame(function () {
      syncNavigationAffixState();
      refreshNavigationSpacing();
    });
  }

  function syncNavigationAffixState() {
    var navigation = document.getElementById("navigation");

    if (!navigation || !navigation.classList.contains("fixed")) {
      return;
    }

    var isAffixed = window.pageYOffset >= 175 || document.documentElement.scrollTop >= 175 || document.body.scrollTop >= 175;

    navigation.classList.toggle("affix", isAffixed);
    navigation.classList.toggle("affix-top", !isAffixed);
  }

  function watchNavigationClass() {
    var navigation = document.getElementById("navigation");

    if (!navigation || navigationObserver || typeof MutationObserver === "undefined") {
      return;
    }

    navigationObserver = new MutationObserver(function () {
      syncNavigationStateSoon();
    });
    navigationObserver.observe(navigation, { attributes: true, attributeFilter: ["class"] });
  }

  function loadSiteOverrides() {
    if (document.getElementById("site-overrides-css")) {
      return;
    }

    var stylesheet = document.createElement("link");
    stylesheet.id = "site-overrides-css";
    stylesheet.rel = "stylesheet";
    stylesheet.href = withBase("assets/css/site-overrides.css");
    document.head.appendChild(stylesheet);
  }

  function withBase(path) {
    if (!path || isExternal(path)) {
      return path;
    }

    if (siteRoot === "." || siteRoot === "") {
      return path;
    }

    return siteRoot.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }

  function isExternal(path) {
    return /^(?:[a-z]+:|\/\/|#)/i.test(path);
  }

  function getPageId(pathname) {
    var cleanPath = pathname.replace(/\/index\.html$/i, "/").replace(/\/+$/, "");
    var lastSegment = cleanPath.split("/").filter(Boolean).pop() || "";

    if (!lastSegment || lastSegment === "website") {
      return "home";
    }

    if (lastSegment === "digital-bio-news") {
      return "news";
    }

    if (lastSegment === "our-team") {
      return "team";
    }

    return lastSegment;
  }

  function getPartialTemplates() {
    return {
      "site-header": `
<a id="top"></a>
<div id="navigation" class="fixed">
  <div id="navbarBottom" class="navbar navbar-default ">
    <div class="container" data-home-container>
      <div class="navbar-header">
        <div id="mobile_menu">
          <a href="#drawer-menu" class="nav-button nav-button-x"><span>toggle menu</span></a>
        </div>
        <div id="branding-container">
          <a class="brand" data-site-href="index.html" title=" Digital Biology Lab">
            <img class="site-logo" data-site-src="assets/uploads/2022/07/Logo-Full-1.png" alt=" Digital Biology Lab" width="" height="" />
          </a>
        </div>
      </div>
      <nav id="main_nav" class="menu-main-menu-container" aria-label="Main Navigation">
        <ul id="menu-main-menu" class="menu pull-right">
          <li id="menu-item-3002" data-nav-id="home" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-3002"><a data-site-href="index.html"><span>Home</span></a></li>
          <li id="menu-item-3004" data-nav-id="team" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3004"><a data-site-href="our-team/index.html"><span>Team</span></a></li>
          <li id="menu-item-3003" data-nav-id="news" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3003"><a data-site-href="digital-bio-news/index.html"><span>News</span></a></li>
          <li id="menu-item-3005" data-nav-id="publications" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3005"><a data-site-href="publications/index.html"><span>Publications</span></a></li>
          <li id="menu-item-3006" data-nav-id="software" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3006"><a data-site-href="software/index.html"><span>Software</span></a></li>
          <li id="menu-item-3007" data-nav-id="contact" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3007"><a data-site-href="contact/index.html"><span>Contact</span></a></li>
        </ul>
      </nav>
    </div>
  </div>
</div>`,
      "site-footer": `
<style id="shared-footer-style">
footer.site-footer{padding-bottom:24px}
footer.site-footer .site-footer-main{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
footer.site-footer .site-footer-item{flex:0 1 auto}
footer.site-footer .site-footer-logo{text-align:center}
footer.site-footer #branding-container-footer{text-align:center;max-width:260px;margin:0 auto}
footer.site-footer #branding-container-footer img{display:block;max-width:260px;margin:0 auto}
footer.site-footer .footer-affiliation{margin:0}
footer.site-footer .footer-affiliation p{margin:0;max-width:520px;text-align:center;font-size:1.5rem;line-height:1.45}
footer.site-footer .footer-affiliation a:link,footer.site-footer .footer-affiliation a:visited{color:#fff;background:transparent;text-decoration:none}
footer.site-footer .footer-affiliation a:hover,footer.site-footer .footer-affiliation a:focus{color:#ccecf8;background:transparent;text-decoration:none}
footer.site-footer .site-footer-links{text-align:center}
footer.site-footer .footer-social{margin:0;text-align:center}
footer.site-footer .footer-social li{display:inline-block}
footer.site-footer .footer-social li a:link,footer.site-footer .footer-social li a:visited{font-size:2.8rem}
footer.site-footer .creditbox{margin-top:22px;padding:16px 0 0;border-top:1px solid rgba(255,255,255,.2)}
footer.site-footer .creditbox p{max-width:none;margin:0;font-size:1.4rem;line-height:1.4}
@media(max-width:991px){footer.site-footer .site-footer-main{gap:18px;flex-direction:column}footer.site-footer #branding-container-footer{margin:0 auto}footer.site-footer .footer-social{margin-top:0}}
</style>
<footer id="colophon" class="site-footer">
  <a id="footer"></a>

  <div class="container" data-home-container>
    <div class="site-footer-main">
      <div class="site-footer-item site-footer-logo">
        <div id="branding-container-footer">
          <a class="brand" data-site-href="index.html" title=" Digital Biology Lab">
            <img class="site-logo" data-site-src="assets/uploads/2022/07/Alt-Logo.png" alt=" Digital Biology Lab" width="" height="" />
          </a>
        </div>
      </div>

      <div class="site-footer-item site-footer-affiliation">
        <div class="footer-affiliation">
          <p><strong><a data-site-href="index.html">Digital Biology Lab</a></strong><br />
          <a href="https://www.hii.usf.edu/" target="_blank" rel="noopener">Health Informatics Institute</a><br />
          <a href="https://www.usf.edu/" target="_blank" rel="noopener">University of South Florida</a><br />
          Tampa, Florida, USA</p>
        </div>
      </div>

      <div class="site-footer-item site-footer-links">
        <ul class="social footer-social">
          <li><a target="_blank" href="https://www.linkedin.com/groups/4998136/" title="Social Media Link for LinkedIn"><i class="fa-brands fab fa-linkedin" title="LinkedIn"></i></a></li>
          <li><a target="_blank" href="https://github.com/DigBio" title="Social Media Link for GitHub"><i class="fa-brands fab fa-github" title="GitHub"></i></a></li>
        </ul>
      </div>
    </div>
    <div class="creditbox">
      <p class="center">&copy; <span data-current-year>2026</span> Digital Biology Lab. All rights reserved.</p>
    </div>
  </div>
</footer><!-- #colophon -->

</div><!-- // pagewrapper -->

<div id="drawer-menu" class="menu-mobile-menu-container">
  <!-- <form role="search" method="get" id="searchform" class="navbar-form" data-site-action="index.html">
  <div class="form-group">
    <label class="screen-reader-text" for="s">Search for:</label>
    <input type="text" class="form-control" placeholder="Search" value="Search" name="s" id="s" onfocus="if(this.value == 'Search') { this.value = ''; }" />
    <button type="submit" class="btn btn-default"><i class="fa fa-search" aria-hidden="true"></i></button>
  </div>
  </form> -->

  <ul id="menu-main-menu-1" class="menu">
    <li data-nav-id="home" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-3002"><a data-site-href="index.html"><span>Home</span></a></li>
    <li data-nav-id="team" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3004"><a data-site-href="our-team/index.html"><span>Team</span></a></li>
    <li data-nav-id="news" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3003"><a data-site-href="digital-bio-news/index.html"><span>News</span></a></li>
    <li data-nav-id="publications" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3005"><a data-site-href="publications/index.html"><span>Publications</span></a></li>
    <li data-nav-id="software" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3006"><a data-site-href="software/index.html"><span>Software</span></a></li>
    <li data-nav-id="contact" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3007"><a data-site-href="contact/index.html"><span>Contact</span></a></li>
  </ul>
</div>`
    };
  }
})();
