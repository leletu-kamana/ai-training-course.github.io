// nav.js — shared navbar + footer, injected into every page
// Path-aware: works whether the page is at the site root (index.html)
// or inside the pages/ subfolder.
// Beginner-friendly: plain var, for loops, no ES6 classes/modules

// Detects whether the current page lives inside /pages/ or at the root.
// This decides whether links need "../" to reach the homepage and assets,
// or no prefix at all (since other pages/ files are siblings).
function isInsidePagesFolder() {
  return window.location.pathname.indexOf("/pages/") !== -1;
}

function getHomeLink() {
  return isInsidePagesFolder() ? "../index.html" : "index.html";
}

// All page links are relative to the pages/ folder, since both index.html
// and every page in pages/ link to other files inside pages/ the same way
// once we're past the home link itself.
var navLinks = [
  { file: "index.html", label: "Home", isHome: true },
  { file: "modules.html", label: "Modules" },
  { file: "examples.html", label: "Examples" },
  { file: "checker.html", label: "Self-Check Tool" },
  { file: "citation-guide.html", label: "Citation Guide" },
  { file: "quiz.html", label: "Quiz" },
  { file: "resources.html", label: "Resources" },
  { file: "about.html", label: "About" }
];

function getCurrentPage() {
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf("/") + 1);
  if (page === "" || page === "/") {
    page = "index.html";
  }
  return page;
}

// Builds the correct href for a nav link depending on where we are now.
function resolveNavHref(linkFile, isHomeLink) {
  var insidePages = isInsidePagesFolder();

  if (isHomeLink) {
    return insidePages ? "../index.html" : "index.html";
  }

  // Non-home links always point into pages/
  if (insidePages) {
    return linkFile; // sibling file inside pages/
  } else {
    return "pages/" + linkFile; // from root, go into pages/
  }
}

function resolveAssetPath(assetPath) {
  return isInsidePagesFolder() ? "../" + assetPath : assetPath;
}

function buildNavHTML() {
  var current = getCurrentPage();
  var html = "";

  html += '<a href="' + getHomeLink() + '" class="logo">';
  html += '<span class="logo-mark">AI</span>';
  html += '<span>Ethics &amp; Literacy</span>';
  html += '</a>';

  html += '<button id="navToggle" class="nav-toggle" aria-expanded="false" aria-controls="navMenu">Menu</button>';

  html += '<nav id="navMenu" class="nav-menu">';
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = resolveNavHref(link.file, link.isHome);
    var isCurrent = (link.file === current);
    html += '<a href="' + href + '" class="nav-link"';
    if (isCurrent) {
      html += ' aria-current="page"';
    }
    html += '>' + link.label + '</a>';
  }
  html += '</nav>';

  return html;
}

function buildFooterHTML() {
  var year = new Date().getFullYear();
  var insidePages = isInsidePagesFolder();
  var pagesPrefix = insidePages ? "" : "pages/";
  var homeHref = insidePages ? "../index.html" : "index.html";

  var html = "";
  html += '<div class="footer-grid">';

  html += '<div>';
  html += '<p class="font-display mb-1" style="font-size:1.05rem;">AI Ethics &amp; Literacy Course</p>';
  html += '<p class="muted">A free course on using AI as a learning tool, not a shortcut. Built for high school and tertiary students.</p>';
  html += '</div>';

  html += '<div>';
  html += '<span class="footer-heading">Course</span>';
  html += '<ul>';
  html += '<li><a href="' + pagesPrefix + 'modules.html">Modules</a></li>';
  html += '<li><a href="' + pagesPrefix + 'checker.html">Self-check tool</a></li>';
  html += '<li><a href="' + pagesPrefix + 'quiz.html">Quiz</a></li>';
  html += '<li><a href="' + pagesPrefix + 'citation-guide.html">Citation guide</a></li>';
  html += '</ul>';
  html += '</div>';

  html += '<div>';
  html += '<span class="footer-heading">More</span>';
  html += '<ul>';
  html += '<li><a href="' + pagesPrefix + 'resources.html">Resources</a></li>';
  html += '<li><a href="' + pagesPrefix + 'about.html">About this project</a></li>';
  html += '<li><a href="https://github.com/leletu-kamana">GitHub</a></li>';
  html += '</ul>';
  html += '</div>';

  html += '</div>';
  html += '<div class="rule"><p class="footer-bottom">&copy; ' + year + ' AI Ethics &amp; Literacy Course. Built for learning, not for sale.</p></div>';
  return html;
}

function initNav() {
  var navContainer = document.getElementById("siteNav");
  var footerContainer = document.getElementById("siteFooter");

  if (navContainer) {
    navContainer.innerHTML = buildNavHTML();

    var toggleBtn = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");

    toggleBtn.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        menu.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        menu.classList.add("is-open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

  if (footerContainer) {
    footerContainer.innerHTML = buildFooterHTML();
  }
}

document.addEventListener("DOMContentLoaded", initNav);