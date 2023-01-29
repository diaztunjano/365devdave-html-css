///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/* MOBILE NAVIGATION LOGIC */

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

/* SMOOTH SCROLLING */

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const hrefAtt = link.getAttribute("href");

    // Scroll back to top:
    if (hrefAtt === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // other cases that are not the top:
    // Get the ID selector
    if (hrefAtt !== "#" && hrefAtt.startsWith("#")) {
      const sectionEl = document.querySelector(hrefAtt);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close mobile nav.
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

/* ADD STICKY NAVIGATION */

const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(sectionHeroEl);
