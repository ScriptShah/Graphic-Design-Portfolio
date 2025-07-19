/*================================================
*
* Template name : Naru
* Version       : 1.0.2
* Author        : FlaTheme
* Author URL    : http://themeforest.net/user/flatheme
*
* Table of Contents :
* 1.  Page Preloader
* 2.  Header
* 3.  Sliders
* 4.  Cursors
* 5.  Portfolio Filter
* 6.  Lightbox
* 7.  ScrollCue
* 8.  Maps
* 9.  ScrollToTop
* 10. Contact Form
*
================================================*/
"use strict";

/*===============================================
  1. Page Preloader
===============================================*/
var body = document.body;

window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

var preloaderType = body.getAttribute("data-preloader");

if (preloaderType === "true") {
  var preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = "<div><span></span></div>";
  body.appendChild(preloader);
}


/*===============================================
  2. Header
===============================================*/
//
// Header Placeholder //
//
if (document.querySelector(".header.with-placeholder")) {
  var headerPlaceholder = document.createElement("div");
  headerPlaceholder.className = "header-placeholder";
  document.querySelector(".header.with-placeholder").insertAdjacentElement("beforebegin", headerPlaceholder);
}

var headerNav = $(".header-menu");

if (headerNav.length) {
  var toggleBtn = $(".mobile-nav-toggle");
  //
  // Mobile Menu - Toggle //
  //
  toggleBtn.on("click", function() {
    if (headerNav.hasClass("show")) {
      headerNav.removeClass("show");
      toggleBtn.removeClass("active");
    }
    else {
      headerNav.addClass("show");
      toggleBtn.addClass("active");
    }
  });
  //
  // Mobile Menu - Close //
  //
  $(document).on("click", function(e) {
    if ( $(e.target).closest(".header-menu, .mobile-nav-toggle").length === 0 ) {
      if (headerNav.hasClass("show")) {
        headerNav.removeClass("show");
        toggleBtn.removeClass("active");
      }
    }
  });
}


/*===============================================
  3. Sliders
===============================================*/
//
// Clients Slider //
//
var swiper = new Swiper(".clients-slider", {
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 70,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 70,
    },
    1920: {
      slidesPerView: 6,
      spaceBetween: 80,
    },
  },
  navigation: {
    nextEl: ".clients-next",
    prevEl: ".clients-prev",
  },
});


/*===============================================
  4. Cursors
===============================================*/
const cursor = document.querySelector(".cursors");
const cursorInner = cursor.querySelector(".cursor-inner");
const hoverItems = document.querySelectorAll("div[data-hover-caption]");

document.addEventListener("mousemove", function (event) {
  cursor.style.left = event.pageX + "px"
  cursor.style.top = event.pageY + "px"
});

// Hover Caption
hoverItems.forEach(hoverItem => {
  hoverItem.addEventListener("mouseover", function () {
    cursorInner.innerHTML = "<div class='mouse-caption'><h2>" + hoverItem.getAttribute('data-hover-caption') + "</h2></div>";
    cursorInner.classList.add("visible");
  })
  hoverItem.addEventListener("mouseout", function () {
    cursorInner.innerHTML = "";
  })
});

// Hover Image
const hoverImgs = document.querySelectorAll("[data-hover-img]");

hoverImgs.forEach(hoverImg => {
  hoverImg.addEventListener("mouseover", function () {
    cursorInner.innerHTML =  "<img src='" + hoverImg.getAttribute('data-hover-img') + "'>";
    cursorInner.classList.add("visible");
  })
  hoverImg.addEventListener("mouseout", function () {
    cursorInner.innerHTML = "";
  })
});


/*===============================================
  5. Portfolio Filter
===============================================*/
var pGrid = $(".portfolio-grid");

if (pGrid.length) {
  var mixer = mixitup('.portfolio-grid', {
    selectors: {
        target: '.portfolio-item'
    },
    animation: {
        duration: 250
    }
  });
}


/*===============================================
  6. Lightbox
===============================================*/
const lightbox = GLightbox();


/*===============================================
  7. ScrollCue - Animate on Scroll
===============================================*/
scrollCue.init();


/*===============================================
  8. Maps
===============================================*/
var mapCanvas = $(".gmap");

if (mapCanvas.length) {
  var m,divId,initLatitude, initLongitude, map;

  for (var i = 0; i < mapCanvas.length; i++) {
    m = mapCanvas[i];

    initLatitude = m.dataset["latitude"];
    initLongitude = m.dataset["longitude"];
    divId = "#"+ m["id"];

    map = new GMaps({
      el: divId,
      lat: initLatitude,
      lng: initLongitude,
      zoom: 16,
      scrollwheel: false,
      styles: [
          /* style your map at https://snazzymaps.com/editor and paste JSON here */
      ]
    });

    map.addMarker({
      lat : initLatitude,
      lng : initLongitude
    });
  }
}


/*===============================================
  9. Scroll To Top
===============================================*/
var scrollTopBtn = document.querySelector(".scrolltotop");

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
    });
  });
}


/*===============================================
  10. Contact Form
===============================================*/
const contactForm = document.getElementById("contactform");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch("assets/php/contact-form.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        document.getElementById("success").classList.add("show-result"); // Show Success Message
        contactForm.reset(); // Reset the form
      } else {
        document.getElementById("error").classList.add("show-result"); // Show Error Message
      }
    })
    .catch(error => {
      document.getElementById("error").classList.add("show-result"); // Show Error Message
      console.error("There was a problem with the fetch operation:", error);
    });
  });
}