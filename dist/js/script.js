"use strict";

window.addEventListener("DOMContentLoaded", function () {
  //------carousel-------

  const slides = document.querySelectorAll(".carousel__slide"),
    slider = document.querySelector(".carousel__slider"),
    prev = document.querySelector(".carousel__slider-prev"),
    next = document.querySelector(".carousel__slider-next"),
    slidesWrapper = document.querySelector(".carousel__slider-wrapper"),
    slidesField = document.querySelector(".carousel__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width; // получаем ширину обертки в виде объекта и достаем св-во width
  let offset = 0,
    slideIndex = 1;

  slidesField.style.width = 100 * slides.length + "%";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  const indicators = document.createElement("ol"),
    dots = [];

  indicators.classList.add("carousel__indicators");
  slider.append(indicators);

  function createDots() {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("li");
      dot.classList.add("carousel__dot");
      dot.setAttribute("data-slide-to", i + 1);
  
      if (i == 0) {
        dot.style.opacity = 1;
      }
  
      indicators.append(dot);
      dots.push(dot);
    }
  }

  createDots();

  const cutWidth = +width.slice(0, width.length - 2);

  function switchNextSlide() {
    next.addEventListener("click", () => {
      if (offset == cutWidth * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += cutWidth;
      }
  
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
  
      switchSlides();
    });
  }

  function switchPreviousSlide() {
    prev.addEventListener("click", () => {
      if (offset == 0) {
        offset = cutWidth * (slides.length - 1);
      } else {
        offset -= cutWidth;
      }
  
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
  
      switchSlides();
    });
  }

  switchNextSlide();
  switchPreviousSlide();
  
  function switchSlides() {
    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function switchDots() {
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");
  
        slideIndex = slideTo;
        offset = cutWidth * (slideTo - 1);
  
        switchSlides();
      });
    });
  }
  
  switchDots();

  //--------catalog items --------

  const itemContent = document.querySelectorAll(".catalog__item-content"),
    itemList = document.querySelectorAll(".catalog__item-list"),
    details = document.querySelectorAll(".catalog__item-link"),
    backDetails = document.querySelectorAll(".catalog__item-back");

  function showDetails(show, hide, links) {
    links.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        show[i].classList.add("catalog__item-list_active");
        hide[i].classList.remove("catalog__item-content_active");
      });
    });
  }

  function showCard(show, hide, links) {
    links.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        show[i].classList.add("catalog__item-content_active");
        hide[i].classList.remove("catalog__item-list_active");
      });
    });
  }

  showDetails(itemList, itemContent, details);
  showCard(itemContent, itemList, backDetails);

  const contents = document.querySelectorAll(".catalog__content"),
    tabs = document.querySelectorAll(".catalog__tab");

  function hideActiveContent() {
    tabs.forEach((tab) => {
      tab.classList.remove("catalog__tab_active");
    });
    contents.forEach((content) => {
      content.classList.remove("catalog__content_active");
    });
  }

  function showActiveContent(i = 0) {
    tabs[i].classList.add("catalog__tab_active");
    contents[i].classList.add("catalog__content_active");
  }

  showActiveContent();

  function chooseTab(elem) {
    elem.forEach((tab, i) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();

        hideActiveContent();
        showActiveContent(i);
      });
    });
  }

  chooseTab(tabs);

  //------Modal------

  const consultation = document.querySelector("#consultation"),
    order = document.querySelector("#order"),
    thanks = document.querySelector("#thanks"),
    overlay = document.querySelector(".overlay"),
    modalClose = document.querySelectorAll(".modal__close"),
    attrConsultation = document.querySelectorAll('[data-modal="consultation"]');

  function addAttributesForBtns() {
    document.querySelectorAll(".button_buy").forEach((btn) => {
      btn.setAttribute("data-modal", "order");
    });
  }

  addAttributesForBtns();

  const attrOrder = document.querySelectorAll('[data-modal="order"]');

  function showModalConsultation() {
    attrConsultation.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        overlay.classList.add("overlay_active");
        consultation.style.display = "block";
      });
    });
  }

  const modalSubtitle = document.querySelector('#order .modal__subtitle'),
              model = document.querySelectorAll('.catalog__item-subtitle');

  function showModalOrder() {
    attrOrder.forEach((btn, i) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const modelName = model[i].innerText;

        modalSubtitle.insertAdjacentText('afterbegin', modelName);
        overlay.classList.add("overlay_active");
        order.style.display = "block";
      });
    });
  }

  function closeModals() {
    modalClose.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        consultation.style.display = "none";
        order.style.display = "none";
        thanks.style.display = "none";
        overlay.classList.remove("overlay_active");
        modalSubtitle.innerText = '';
      });
    });
  }

  showModalConsultation();
  showModalOrder();
  closeModals();
});
