// import "./import/modules";
// import "./import/components";
// import "./import/inputMask";
// import "./import/script";

// new VenoBox({
//   selector: ".index-gallery__item"
// });


/**
 * Вспомогательные общие функции
 */

const bodyLock = (e) => {
  let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.marginRight = widthScrollBar + 'px';
  document.documentElement.classList.add('_lock');
}

const bodyUnLock = (e) => {
  document.documentElement.style.marginRight = '0px';
  document.documentElement.classList.remove('_lock');
}

/**
 * Функция отктия и закрытия строку поиска  и фильтрацию по убыванию/возрастанию
 * 
 * Оптимизировать код
 */

const openSearchBtn = document.getElementById('open-search');
if (openSearchBtn) {
  openSearchBtn.addEventListener('click', function (e) {
    this.classList.toggle('_active');
    document.getElementById('single-search').classList.toggle('_active');

    if (!this.classList.contains('_active')) {
      this.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    } else {
      this.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  })
}

const openFilterBtn = document.getElementById('open-filter');
if (openFilterBtn) {
  openFilterBtn.addEventListener('click', function (e) {
    this.classList.toggle('_active');
    document.getElementById('filter-sort').classList.toggle('_active');

    if (!this.classList.contains('_active')) {
      this.innerHTML = '<i class="fa-solid fa-sliders"></i>';
    } else {
      this.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  })
}

/**
 * Фильтр по цене 
 * 
 * Разобраться в скрипке 
 */

const rangeInput = document.querySelectorAll(".price-input__range input");
const priceInputField = document.querySelectorAll(".price-input__field input");
const progress = document.querySelector('#prodgress');
const priceGap = 1000;


if (rangeInput) {
  rangeInput.forEach(input => {
    input.addEventListener('input', (e) => {
      const minValue = parseInt(rangeInput[0].value);
      const maxValue = parseInt(rangeInput[1].value);

      if (maxValue - minValue < priceGap) {
        if (e.target.className === "price-input__range-min") {
          rangeInput[0].value = maxValue - priceGap;
        } else {
          rangeInput[1].value = minValue + priceGap;
        }
      } else {
        priceInputField[0].value = minValue;
        priceInputField[1].value = maxValue;
        progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
      }


    })

  })
}


/**
 * Рейтинг в виде звездочек
 */

const ratingItemList = document.querySelectorAll('.form__star');
const inputSaveRating = document.querySelector('#form-reviews__rating');
if (ratingItemList) {
  const ratingItemArray = Array.prototype.slice.call(ratingItemList);

  ratingItemArray.forEach(item => {
    item.addEventListener('click', function (e) {
      const { rating } = item.dataset;
      item.parentNode.dataset.ratingTotal = rating;
      // inputSaveRating.value = rating;
    })
  })
}

const orderBtn = document.querySelectorAll('.filter-sort__value');

orderBtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
    // e.preventDefault();
  })
})


// Создание правильной ссылка номера телефона
const regNum = document.querySelectorAll('.reg-num');
if (regNum) {
  regNum.forEach(num => {
    phoneNumber = num.href.replace('tel:', '');
    newNumber = clearSimvol(phoneNumber.replace('8', "+7"));
    num.href = newNumber
  });
}
function clearSimvol(str) {
  return str.replace(/[\s.,%,),(,-]/g, '');
}

/**
 * Функции отвечающие за открытие и закрытие мини-корзины
 */

const showCart = document.getElementById('show-cart');
if (showCart) {
  showCart.addEventListener('click', showMiniCart);
}

function showMiniCart(e) {
  document.querySelector('#mini-cart').classList.add('_show');
  bodyLock();
}

const closeCart = document.getElementById('close-cart');
if (closeCart) {
  closeCart.addEventListener('click', closeMiniCart);
}

function closeMiniCart(e) {
  document.querySelector('#mini-cart').classList.remove('_show');
  bodyUnLock();
}



/**
 * Работа с добавление в корзину без перезагрузки страницы
 */



// if (addToCartButton) {
//   addToCartButton.forEach(btn => [
//     btn.addEventListener('click', addToCart)
//   ])
// }

// function addToCart(e) {
//   e.preventDefault();
//   // let miniCartCount = parseInt(document.querySelector('#mini-cart-count').textContent) || 0;
//   let productId = this.getAttribute('data-product-id');
//   console.log(productId);
//   let productLink = this.getAttribute('href');
//   console.log(productLink);
//   let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
//   console.log(csrfToken);

//   fetch('/cart/', {
//     method: 'POST',
//     headers: {
//       // "Accept": "application/json",
//       'Content-Type': 'application/json',
//       "X-CSRFToken": csrfToken
//     },
//     body: JSON.stringify(productId)
//   })
//     .then(response => response.json())
//     .then(data => { console.log(data) })
//     .catch(error => {
//       console.error('Ошибка при отправке данных:', error);
//     })

// fetch('/cart/cart_add/', {
//   method: 'POST',
//   headers: {
//     "Accept": "application/json",
//     'Content-Type': 'application/json',
//     'X-CSRFToken': csrfToken
//   },
//   body: JSON.stringify({ product_id: productId })
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       return response.json();
//     } else {
//       throw new Error('Unexpected response type');
//     }
//   })
//   .then(data => {
//     console.log(data);
//     // miniCartCount++;
//     let cartItemsContainer = document.querySelector('#cart-item');
//     cartItemsContainer.innerHTML = data.cart_items_html;
//     // document.querySelector('#mini-cart-count').textContent = miniCartCount; // Обновляем счетчик товаров в мини-корзине
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });
// }

const whoGetRadio = document.querySelectorAll('.who-get');
if (whoGetRadio) {
  whoGetRadio.forEach(item => {
    item.addEventListener('change', function (e) {
      console.log(this);
      if (item.dataset.id == 'another') {
        document.getElementById('contact-human').classList.add('_show')
      } else {
        document.getElementById('contact-human').classList.remove('_show')
      }
    })
  })
}

const pickupCheckbox = document.getElementById('pickup');
if (pickupCheckbox) {
  pickupCheckbox.addEventListener('change', function (e) {
    if (!pickupCheckbox.checked) {
      document.getElementById('address-delivery').classList.add('_hidden');
    } else {
      document.getElementById('address-delivery').classList.remove('_hidden');
    }
  })
}

let addToCartButton = document.querySelectorAll('.add-to-cart');
if (addToCartButton) {
  addToCartButton.forEach(btn => {
    btn.addEventListener('click', addCartProduct)
  })
}

function addCartProduct(e) {
  e.preventDefault();
  let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
  // Элементы которые меняются
  let productCount = 0;
  let goodsInCartCount = document.getElementById('mini-cart-count');
  if (goodsInCartCount) {
    productCount = parseInt(goodsInCartCount.innerText, 0);
  }

  let productId = e.target.dataset.productId;
  let variation = {}
  const selectElem = document.querySelectorAll('select');
  selectElem.forEach(elem => {
    if (elem.dataset.name == 'Цвета') {
      elemName = elem.dataset.name.slice(0, -1);
      variation[elemName] = elem.value;
    } else if (elem.dataset.name == 'Размеры') {
      elemName = elem.dataset.name.slice(0, -1);
      variation[elemName] = elem.value;
    } else {
      elemName = elem.dataset.name;
      variation[elemName] = elem.value;
    }
  });

  let addToCartUrl = e.target.getAttribute('href');
  // "/cart/cart_add-test/"
  fetch(addToCartUrl, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken
    },
    body: JSON.stringify({ "productId": productId, "variation": variation })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error")
      }

      return response.json()
    })
    .then(data => {
      // Уведомление добавления в корзину
      const notificationModal = document.getElementById('notification-modal');
      notificationModal.querySelector('.success__body').innerHTML = '<div class="success__body-inner"><p class="success__name">Товар добавлен</p></div>';
      notificationModal.classList.add("show");

      // Закрытие уведомления после 5 секунд
      setTimeout(function () {
        notificationModal.classList.remove("show");
      }, 5000);

      const showCartBody = document.getElementById("show-cart");
      let count = showCartBody.querySelector('.count-product-cart');

      // const divElem = document.createElement('div');
      // divElem.className = "no-empty"
      // if (!showCartBody.querySelector('.no-empty')) {
      //   showCartBody.appendChild(divElem);
      // }

      // Увеличиваем количество товаров в корзине (отрисовка в шаблоне)
      productCount++;
      goodsInCartCount.innerText += productCount;
      count.innerText = productCount;
      document.getElementById('mini-cart_noempty').innerHTML = '<h4 class="mini-cart__title">Корзина<span>(</span><strong id="mini-cart-count">' + productCount + '</strong><span>)</span></h4><div class="mini-cart__inner" id="cart-item">{% include "components/cart-item.html" %}</div><div class="mini-cart__links"><a href="/orders/create/" class="mini-cart__link">Оформить заказ</a></div>';


      // Меняем содержимое корзины на ответ от django (новый отрисованный фрагмент разметки корзины)
      const cartItemsContainer = document.getElementById('cart-item');
      cartItemsContainer.innerHTML = data.cart_items_html;


    })
    .catch(error => {
      console.log(error);
    })
}


// // // Ловим собыитие клика по кнопке добавить в корзину
// $(document).on("click", ".add-to-cart", function (e) {
//   // Блокируем его базовое действие
//   e.preventDefault();

//   // Берем элемент счетчика в значке корзины и берем оттуда значение
//   var goodsInCartCount = $("#mini-cart-count");
//   var cartCount = parseInt(goodsInCartCount.text() || 0);

//   // Получаем id товара из атрибута data-product-id
//   var product_id = $(this).data("product-id");

//   // Из атрибута href берем ссылку на контроллер django
//   var add_to_cart_url = $(this).attr("href");

//   // делаем post запрос через ajax не перезагружая страницу
//   $.ajax({
//     type: "POST",
//     url: add_to_cart_url,
//     data: {
//       product_id: product_id,
//       csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
//     },
//     success: function (data) {
//       $("#notification-modal .success__body").html('<div class="success__body-inner"><p class="success__name">Товар добавлен</p></div>');
//       $("#notification-modal").addClass("show");

//       // Закрытие модального окна после 5 секунд
//       setTimeout(function () {
//         $("#notification-modal").removeClass("show");
//       }, 5000);

//       $('#show-cart').append('<div class="no-empty"></div>');

//       // Увеличиваем количество товаров в корзине (отрисовка в шаблоне)
//       cartCount++;
//       goodsInCartCount.text(cartCount);
//       if (cartCount > 0) {
//         $('#mini-cart_noempty').html('<h4 class="mini-cart__title">Корзина<span>(</span><strong id="mini-cart-count">' + cartCount + '</strong><span>)</span></h4><div class="mini-cart__inner" id="cart-item">{% include "components/cart-item.html" %}</div><div class="mini-cart__links"><a href="/orders/create/" class="mini-cart__link">Оформить заказ</a></div>')
//       }
//       // Меняем содержимое корзины на ответ от django (новый отрисованный фрагмент разметки корзины)
//       var cartItemsContainer = $("#cart-item");
//       cartItemsContainer.html(data.cart_items_html);
//     },

//     error: function (data) {
//       console.log("Ошибка при добавлении товара в корзину");
//     },
//   });
// });

$(document).on("click", ".remove-from-cart", function (e) {
  // Блокируем его базовое действие
  e.preventDefault();

  // Берем элемент счетчика в значке корзины и берем оттуда значение
  var goodsInCartCount = $("#mini-cart-count");
  var cartCount = parseInt(goodsInCartCount.text() || 0);

  // Получаем id корзины из атрибута data-cart-id
  var cart_id = $(this).data("cart-id");
  // Из атрибута href берем ссылку на контроллер django
  var remove_from_cart = $(this).attr("href");
  console.log(remove_from_cart);
  console.log($("[name=csrfmiddlewaretoken]").val());
  // делаем post запрос через ajax не перезагружая страницу
  $.ajax({
    type: "POST",
    url: remove_from_cart,
    data: {
      cart_id: cart_id,
      csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
    },
    success: function (data) {
      // Уменьшаем количество товаров в корзине (отрисовка)
      cartCount -= data.quantity_deleted;
      goodsInCartCount.text(cartCount);

      if (cartCount == 0) {
        // $('#show-cart .no-empty').remove();
        $('#mini-cart_noempty').html('<div class="mini-cart__empty"><p class="mini-cart__empty-text">Пусто</p><a href="{% url "category" %}"class="mini-cart__empty-link">Перейти в каталог</a></div>')
        // $('#mini-cart .mini-cart__links').remove()
      }
      // Меняем содержимое корзины на ответ от django (новый отрисованный фрагмент разметки корзины)
      var cartItemsContainer = $("#cart-item");
      cartItemsContainer.html(data.cart_items_html);
    },

    error: function (data) {
      console.log("Ошибка при добавлении товара в корзину");
    },
  });
});


/**
 * Скролл к id блока с фотографиями раздела на страницы галерея. 
 */

const linkToBlockImages = document.querySelectorAll('[data-id]');

if (linkToBlockImages) {
  linkToBlockImages.forEach(link => {
    link.addEventListener('mouseup', scrollToSection)
  })
}

function scrollToSection(e) {
  e.preventDefault();
  let blockToScroll = document.getElementById(e.target.dataset.id)
  let distanceToBlock = blockToScroll.getBoundingClientRect().top
  let headerHeight = document.querySelector('.header').clientHeight

  console.log(headerHeight);
  window.scroll({
    top: distanceToBlock + window.pageYOffset - 104,
    behavior: 'smooth'
  });
}

/**
 * Popup окна
 */

// const popupClose = (e) => {
//   if (e.target.classList.contains('close__popup') || e.target.closest('.close__popup')) {
//     popup = document.getElementById('popup_show');
//     document.documentElement.classList.remove('popup-show');
//     popup.classList.remove('popup_show');
//     bodyUnLock();
//   }

// }

const openPopup = (event) => {
  let popupBtn = event.target.closest('[data-popup]')
  if (popupBtn) {
    popup = document.getElementById(popupBtn.dataset.popup);
    document.documentElement.classList.add('popup-show');
    popup.classList.add('popup_show');
    bodyLock();
  }
}

const closePopup = (event) => {
  let popupCloseBtn = event.target.closest('.popup__close');
  if (popupCloseBtn) {
    popup = popupCloseBtn.closest('.popup');
    popup.classList.remove('popup_show');
    document.documentElement.classList.remove('popup-show');
    bodyUnLock();
  }
}

const popupBtn = document.querySelectorAll('[data-popup]');
if (popupBtn) {
  popupBtn.forEach(btn => btn.addEventListener('mouseup', openPopup));
}

const closePopupBtn = document.querySelectorAll('.popup__close');
if (closePopupBtn) {
  closePopupBtn.forEach(btn => btn.addEventListener('click', closePopup))
}

// const popup = document.querySelectorAll('.popup');
// if (popup) {
//   popup.forEach(popup => {
//     popup.addEventListener('mouseup', popupClose)
//   })
// }



/*******************************/



/********Burger menu**********/

const burgerButton = document.getElementById('burger-btn');
if (burgerButton) {
  burgerButton.addEventListener('mouseup', (event) => {
    const burgerBtn = event.target.closest('#burger-btn');
    if (burgerBtn) {
      burgerBtn.classList.toggle('_active');
      let headerElem = document.querySelector('.header');
      headerElem.classList.toggle('_active');
      if (headerElem.classList.contains('_active')) {
        bodyLock();
      } else {
        bodyUnLock();
      }
      document.documentElement.classList.toggle('_overlay');
    }
  })
}
const dpi = window.devicePixelRatio;
console.log(dpi);
console.log('---------------------');
document.addEventListener('DOMContentLoaded', () => {
  const dpi = window.devicePixelRatio;

  if (dpi > 2) {
    console.log(dpi);
    document.documentElement.classList.add('_big');
  }
  // const target = document.getElementById('target');

  // const handleEvent = (event) => {
  //     if (event.type === 'mouseup' || event.type === 'touchend') {
  //         console.log('Mouse or Touch Released');
  //         target.style.backgroundColor = 'lightgreen';
  //         setTimeout(() => {
  //             target.style.backgroundColor = 'lightblue';
  //         }, 200);
  //     }
  // };

  // target.addEventListener('mouseup', handleEvent);
  // target.addEventListener('touchend', handleEvent);

  // // Prevent default touch behavior to avoid text selection and other issues
  // target.addEventListener('touchstart', (event) => {
  //     event.preventDefault();
  // });
});

/************Формы обратной связи*************/
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('callback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(form.action, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        let loading = document.querySelector('.popup__loading');
        loading.classList.add('_active');
        setTimeout(() => {
          form.reset();
          loading.classList.remove('_active');
          document.getElementById('callback').classList.remove('popup_show');
          document.getElementById('success').classList.add('popup_show');
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  });
});

/*************Табы картинок**********/


const tabBtnTrigger = document.querySelectorAll('.index-work__links a');
const tabContent = document.querySelectorAll('.index-work__grid');
if (tabBtnTrigger) {
  tabBtnTrigger.forEach(btn => btn.addEventListener('click', showTabContent));
}

function showTabContent(e) {
  e.preventDefault();

  let contentID = this.getAttribute('href').replace('#', '');
  let contentTab = document.getElementById(contentID);
  tabContent.forEach(elem => elem.classList.remove('_active'));
  contentTab.classList.add('_active');

}


/*******************************/

const navArrowTriggerSubMenu = document.querySelectorAll('.nav__chevron');
if (navArrowTriggerSubMenu) {
  navArrowTriggerSubMenu.forEach(item => {
    item.addEventListener('click', function (e) {
      let parent = e.target.closest('.nav__item')
      console.log(parent);

      parent.classList.add('_active');
    })
  })
}

/*******************************/

const openFilterMobile = document.querySelector('.category-details__filter');
if (openFilterMobile) {
  openFilterMobile.addEventListener('click', function (e) {
    document.getElementById('filter-category').classList.add('_show');
    bodyLock();
  })
}

const closeFilter = document.getElementById('close-filter');

if (closeFilter) {
  closeFilter.addEventListener('click', function (e) {
    document.getElementById('filter-category').classList.remove('_show');
    bodyUnLock();
  })
}
/*******************************/