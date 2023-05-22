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

  // -------- adding catalog items by using classes--------

  class CatalogItem {
    constructor(src, alt, subtitle, descr, parentSelector, oldPrice, newPrice) {
      this.src = src;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.parent = document.querySelector(parentSelector);
      this.oldPrice = oldPrice;
      this.newPrice = newPrice;
      this.transfer = 70;
      this.changePriceToRUB();
    }

    changePriceToRUB() {
      this.oldPrice = this.oldPrice * this.transfer;
      this.newPrice = this.newPrice * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="catalog__item">
        <div class="catalog__item-wrapper">

          <div class="catalog__item-content catalog__item-content_active">
            <img src=${this.src} alt=${this.alt} class="catalog__item-img">
            <div class="catalog__item-subtitle">${this.subtitle}</div>
            <div class="catalog__item-descr">${this.descr}</div>
            <a href="#" class="catalog__item-link">Подробнее</a>
          </div>

          <div class="catalog__item-list">
            <ul class="catalog__item-feature">
              <li class="catalog__item-points">
                Вы услышите звуковое оповещение о нужном пульсе во время тренировки;
              </li>
              <li class="catalog__item-points">
                Вы увидите информативный графический индикатор целевых тренировочных зон пульса;
              </li>
              <li class="catalog__item-points">
                Также Вы увидите информацию о расходе калорий за тренировку;
              </li>
              <li class="catalog__item-points">
                Вы сможете посмотреть данные по 10 тренировкам.
              </li>

            </ul>
            <a href="#" class="catalog__item-back">назад</a>
          </div>
        
        </div>
        <div class="catalog__divider"></div>

        <div class="catalog__item-footer">
          <div class="catalog__item-prices">
            <div class="catalog__item-old">${this.oldPrice} руб.</div>
            <div class="catalog__item-new">${this.newPrice} руб.</div>
          </div>
          <button class="button button_buy">купить</button>
        </div>
      </div>
      `;
      this.parent.append(element);
    }
  }

  for (let i = 1; i <= 6; i++) {
    new CatalogItem(
    "img/pulse.png",
    "pulsometer",
    `Пульсометр Polar FT${i}`,
    "Для первых шагов в тренировках, основанных на сердечном ритме",
    ".catalog .catalog__content",
    70,
    65
  ).render();
  }

  //--------catalog tabs / content --------

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

  //------Timer-------

  const deadline = "2023-09-01";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      seconds = Math.floor((t / 1000) % 60);
      minutes = Math.floor((t / 1000 / 60) % 60);
      hours = Math.floor((t / (1000 * 60 * 60) % 24));
      days = Math.floor(t / (1000 * 60 * 60 * 24));
    }
          

    return { total: t, seconds, minutes, hours, days };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

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

  //---------Forms-------------

  jQuery(function($){

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите свое имя",
            minlength: jQuery.validator.format("Необходимо ввести минимум {0} символа")
          },
          phone: 'Пожалуйста, введите свой номер телефона',
          email: {
            required: 'Пожалуйста, введите свою почту',
            email: 'Некорректный адрес почты'
          }
        }
      });
    }

    validateForms('#consultation form');
    validateForms('#consultation-form');
    validateForms('#order form');

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    // ----- Posting data from forms -------

    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
      }).done(function() {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    })

    //---------Recalculation scroll & pageup-----------

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
 });
});
