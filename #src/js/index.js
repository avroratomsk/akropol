/*
* Yandex metrika
*/

(function(){

    let loadMetrika = false;
    const metrikaId = 97977097;
    let timerId;

    if ( navigator.userAgent.indexOf( "YandexMetrika" ) > -1 ) {
        loadYandexMetrika();
    }else{
        // Подключаем Метрику, если юзер начал скроллить.
        window.addEventListener( "scroll", loadYandexMetrika, {passive: true} );

        // Подключаем Метрику, если юзер коснулся экрана.
        window.addEventListener( "touchstart", loadYandexMetrika );

        // Подключаем Метрику, если юзер дернул мышкой.
        document.addEventListener( "mouseenter", loadYandexMetrika );

        // Подключаем Метрику, если юзер кликнул мышкой.
        document.addEventListener( "click", loadYandexMetrika );

        // Подключаем Метрику при полной загрузке DOM дерева,
        // с "отложкой" в 1 секунду через setTimeout,
        // если пользователь ничего вообще не делал (фоллбэк).
        document.addEventListener( "DOMContentLoaded", loadFallback);
    }

    function loadFallback() {
        timerId = setTimeout( loadYandexMetrika, 1000 );
    }
    
    function loadYandexMetrika (e) {
        // Пишем отладку в консоль браузера.
        if ( e && e.type ) {
            console.log( e.type );
        } else {
            console.log( "DOMContentLoaded" );
        }

        if ( loadMetrika ) {
            return;
        }

        (function (m, e, t, r, i, k, a) {
            m[i] =
              m[i] ||
              function () {
                  (m[i].a = m[i].a || []).push(arguments);
              };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                    return;
                }
            }
            (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a);
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(metrikaId, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
        });

        loadMetrika = true;

        clearTimeout( timerId );

        window.removeEventListener( "scroll", loadYandexMetrika );
        window.removeEventListener( "touchstart", loadYandexMetrika );
        document.removeEventListener( "mouseenter", loadYandexMetrika );
        document.removeEventListener( "click", loadYandexMetrika );
        document.removeEventListener( "DOMContentLoaded", loadFallback );
    }
})();




/**
 * Вспомогательные общие функции
 * * */

const bodyLock = (e) => {
    let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.marginRight = widthScrollBar + "px";
    document.documentElement.classList.add("_lock");
};

const bodyUnLock = (e) => {
    document.documentElement.style.marginRight = "0px";
    document.documentElement.classList.remove("_lock");
};

/**
 * Функция отктия и закрытия строку поиска  и фильтрацию по убыванию/возрастанию
 * 
 * Оптимизировать код
 */

const openSearchBtn = document.getElementById("open-search");
if (openSearchBtn) {
    openSearchBtn.addEventListener("click", function (e) {
        this.classList.toggle("_active");
        document.getElementById("single-search").classList.toggle("_active");

        if (!this.classList.contains("_active")) {
            this.innerHTML = "<i class=\"fa-solid fa-magnifying-glass\"></i>";
        } else {
            this.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
        }
    });
}

const openFilterBtn = document.getElementById("open-filter");
if (openFilterBtn) {
    openFilterBtn.addEventListener("click", function (e) {
        this.classList.toggle("_active");
        document.getElementById("filter-sort").classList.toggle("_active");

        if (!this.classList.contains("_active")) {
            this.innerHTML = "<i class=\"fa-solid fa-sliders\"></i>";
        } else {
            this.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
        }
    });
}

/**
 * Фильтр по цене 
 * 
 * Разобраться в скрипке 
 */

const rangeInput = document.querySelectorAll(".price-input__range input");
const priceInputField = document.querySelectorAll(".price-input__field input");
const progress = document.querySelector("#prodgress");
const priceGap = 1000;


if (rangeInput) {
    rangeInput.forEach(input => {
        input.addEventListener("input", (e) => {
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


        });

    });
}


/**
 * Рейтинг в виде звездочек
 */

const ratingItemList = document.querySelectorAll(".form__star");
const inputSaveRating = document.querySelector("#form-reviews__rating");
if (ratingItemList) {
    const ratingItemArray = Array.prototype.slice.call(ratingItemList);

    ratingItemArray.forEach(item => {
        item.addEventListener("click", function (e) {
            const { rating } = item.dataset;
            item.parentNode.dataset.ratingTotal = rating;
            // inputSaveRating.value = rating;
        });
    });
}

const orderBtn = document.querySelectorAll(".filter-sort__value");

orderBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
    // e.preventDefault();
    });
});


// Создание правильной ссылка номера телефона
const regNum = document.querySelectorAll("a[href^=\"tel:\"]");
if (regNum) {
    regNum.forEach(num => {
        let number = formatPhoneNumber(num.href);
        num.href = `tel:${number}`;
    });
}

function formatPhoneNumber(phoneNumber) {

    // Убираем все лишние символы (скобки, пробелы, тире)
    let cleanedNumber = phoneNumber.replace("tel:", "").replace(/[\s\-\(\)]/g, "");

    // Если номер уже начинается на +7, ничего не делаем
    if (cleanedNumber.startsWith("+7")) {
        return cleanedNumber;
    }

    // Если номер начинается на 8, заменяем на +7
    if (cleanedNumber.startsWith("8")) {
        return "+7" + cleanedNumber.slice(1);
    }

    // В остальных случаях добавляем +7 к началу
    return "+7" + cleanedNumber;
}

/**
 * Функции отвечающие за открытие и закрытие мини-корзины
 */

const showCart = document.querySelectorAll(".show-cart");
if (showCart) {
    showCart.forEach(btn => {
        btn.addEventListener("click", showMiniCart);
    });
}

function showMiniCart(e) {
    document.querySelector("#mini-cart").classList.add("_show");
    bodyLock();
}

const closeCart = document.getElementById("close-cart");
if (closeCart) {
    closeCart.addEventListener("click", closeMiniCart);
}

function closeMiniCart(e) {
    document.querySelector("#mini-cart").classList.remove("_show");
    bodyUnLock();
}



/**
 * Работа с добавление в корзину без перезагрузки страницы
 */

let addToCartButton = document.querySelectorAll(".add-to-cart");
if (addToCartButton) {
    addToCartButton.forEach(btn => {
        btn.addEventListener("click", addCartProduct);
    });
}

function addCartProduct(e) {
    e.preventDefault();
    let csrfToken = document.querySelector("[name=\"csrfmiddlewaretoken\"]").value;
    // Элементы которые меняются
    let productCount = 0;
    let goodsInCartCount = document.getElementById("mini-cart-count");
    if (goodsInCartCount) {
        productCount = parseInt(goodsInCartCount.innerText, 0);
    }

    let productId = e.target.dataset.productId;
    let variation = {};
    const selectElem = document.querySelectorAll("select");
    selectElem.forEach(elem => {
        if (elem.dataset.name == "Цвета") {
            elemName = elem.dataset.name.slice(0, -1);
            variation[elemName] = elem.value;
        } else if (elem.dataset.name == "Размеры") {
            elemName = elem.dataset.name.slice(0, -1);
            variation[elemName] = elem.value;
        } else {
            elemName = elem.dataset.name;
            variation[elemName] = elem.value;
        }
    });

    let addToCartUrl = e.target.getAttribute("href");
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
                throw new Error("Error");
            }

            return response.json();
        })
        .then(data => {
            // Уведомление добавления в корзину
            const notificationModal = document.getElementById("notification-modal");
            notificationModal.querySelector(".success__body").innerHTML = "<div class=\"success__body-inner\"><p class=\"success__name\">Товар добавлен</p></div>";
            notificationModal.classList.add("show");

            // Закрытие уведомления после 5 секунд
            setTimeout(function () {
                notificationModal.classList.remove("show");
            }, 5000);

            const showCartBody = document.querySelectorAll(".show-cart");
            if (showCartBody) {
                showCartBody.forEach(btn => {
                    let countElem = btn.querySelector(".count-product-cart");
                    if (countElem) {
                        countElem.innerText = data.cart_total_count;
                    } else {
                        let span = document.createElement("span");
                        span.className = "count-product-cart";
                        span.innerText = data.cart_total_count;
                        btn.appendChild(span);
                    }
                });
            }
            document.getElementById("mini-cart_noempty").innerHTML = "<h4 class=\"mini-cart__title\">Корзина<span>(</span><strong id=\"mini-cart-count\">" + data.cart_total_count + "</strong><span>)</span></h4><div class=\"mini-cart__inner\" id=\"cart-item\">{% include \"components/cart-item.html\" %}</div><div class=\"mini-cart__links\"><a href=\"/orders/create/\" class=\"mini-cart__link\">Оформить заказ</a></div>";


            // Меняем содержимое корзины на ответ от django (новый отрисованный фрагмент разметки корзины)
            const cartItemsContainer = document.getElementById("cart-item");
            cartItemsContainer.innerHTML = data.cart_items_html;


        })
        .catch(error => {
            console.log(error);
        });
}

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
                $("#mini-cart_noempty").html("<div class=\"mini-cart__empty\"><p class=\"mini-cart__empty-text\">Пусто</p><a href=\"{% url \"category\" %}\"class=\"mini-cart__empty-link\">Перейти в каталог</a></div>");
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

const linkToBlockImages = document.querySelectorAll("[data-id]");

if (linkToBlockImages) {
    linkToBlockImages.forEach(link => {
        link.addEventListener("mouseup", scrollToSection);
    });
}

function scrollToSection(e) {
    e.preventDefault();
    let blockToScroll = document.getElementById(e.target.dataset.id);
    let distanceToBlock = blockToScroll.getBoundingClientRect().top;
    let headerHeight = document.querySelector(".header").clientHeight;

    console.log(headerHeight);
    window.scroll({
        top: distanceToBlock + window.pageYOffset - 104,
        behavior: "smooth"
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
    let popupBtn = event.target.closest("[data-popup]");
    if (popupBtn) {
        const popup = document.getElementById(popupBtn.dataset.popup);
        document.documentElement.classList.add("popup-show");
        popup.classList.add("popup_show");

        let nameOrder = popupBtn.dataset.order;

        if (nameOrder) {
            let fieledHidden = popup.querySelector("input[name=\"service\"]");
            fieledHidden.value = nameOrder;
        }

        bodyLock();
    }
};

const closePopup = (event) => {
    let popupCloseBtn = event.target.closest(".popup__close");
    if (popupCloseBtn) {
        const popup = popupCloseBtn.closest(".popup");
        popup.classList.remove("popup_show");
        document.documentElement.classList.remove("popup-show");
        bodyUnLock();
    }
};

const popupBtn = document.querySelectorAll("[data-popup]");
if (popupBtn) {
    popupBtn.forEach(btn => btn.addEventListener("click", openPopup));
}

const closePopupBtn = document.querySelectorAll(".popup__close");
if (closePopupBtn) {
    closePopupBtn.forEach(btn => btn.addEventListener("click", closePopup));
}

// const popup = document.querySelectorAll('.popup');
// if (popup) {
//   popup.forEach(popup => {
//     popup.addEventListener('mouseup', popupClose)
//   })
// }



/*******************************/



/********Burger menu**********/
const burgerButton = document.getElementById("burger-btn");
if (burgerButton) {
    burgerButton.addEventListener("mouseup", (event) => {
        const burgerBtn = event.target.closest("#burger-btn");
        if (burgerBtn) {
            burgerBtn.classList.toggle("_active");
            let headerElem = document.querySelector(".header");
            headerElem.classList.toggle("_active");
            if (headerElem.classList.contains("_active")) {
                bodyLock();
            } else {
                bodyUnLock();
            }
            document.documentElement.classList.toggle("_overlay");
        }
    });
}
const dpi = window.devicePixelRatio;
document.addEventListener("DOMContentLoaded", () => {
    const dpi = window.devicePixelRatio;

    if (dpi > 2) {
        document.documentElement.classList.add("_big");
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

// Функция для поиска английских букв в поле ввода
function containsEnglishLetters(str) {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
}


// Функция для нахождения ссылки в поле ввода
function containsLink(input) {
    const regex = /(https?:\/\/[^\s]+)/g;
    return regex.test(input);
}

// Валидация полей формы
function validateForm(fieldsArray) {
    if (containsEnglishLetters(fieldsArray.name)) {
        return false;
    }

    if (containsLink(fieldsArray.message)) {
        return false;
    }

    if (containsLink(fieldsArray.reviews)) {
        return false;
    }

    return true;
}

// Отправка формы
function sendForm(form, popupName = "default") {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const eventForm = event.target;
        const formData = new FormData(eventForm);
        const csrfToken = eventForm.querySelector("[name=csrfmiddlewaretoken]").value;

        let dataObj = {};
        for (let [key, value] of formData.entries()) {
            dataObj[key] = value;
        }

        if (validateForm(dataObj)) {
            fetch(form.action, {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    form.reset();
                    if (popupName != "default") {
                        document.documentElement.classList.remove("popup-show");
                        bodyUnLock();
                        document.getElementById(popupName).classList.remove("popup_show");
                    }
                    document.getElementById("success").classList.add("notification_show");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const consultationForm = document.getElementById("consultation");
    if (consultationForm) {
        sendForm(consultationForm, "consultation-form");
    }

    const callBackForm = document.getElementById("callback-form");
    if (callBackForm) {
        sendForm(callBackForm, "callback");
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        sendForm(contactForm);
    }

    const orderService = document.getElementById("order-service-form");
    if (orderService) {
        sendForm(orderService, "order-service");
    }

});


const hideBtn  = document.querySelectorAll("[data-popup='more']");

hideBtn?.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const parentHiddenElement = e.currentTarget.closest(".service-content__col");
        const hiidenElement = parentHiddenElement.querySelector(".hidden_content").innerHTML;
        const popup = document.getElementById("more");
        popup.querySelector(".popup__text").innerHTML = hiidenElement;

    });
});


/*************Табы картинок**********/
const tabBtnTrigger = document.querySelectorAll(".index-work__link");
const tabContent = document.querySelectorAll(".index-work__grid");
if (tabBtnTrigger) {
    tabBtnTrigger.forEach(btn => btn.addEventListener("click", showTabContent));
}

function showTabContent(e) {
    e.preventDefault();
    console.log(e.target);
    let contentID = this.getAttribute("href").replace("#", "");
    let contentTab = document.getElementById(contentID);
    tabContent.forEach(elem => elem.classList.remove("_active"));
    contentTab.classList.add("_active");

}


/*******************************/

const navArrowTriggerSubMenu = document.querySelectorAll(".nav__chevron");
if (navArrowTriggerSubMenu) {
    navArrowTriggerSubMenu.forEach(item => {
        item.addEventListener("click", function (e) {
            let parent = e.target.closest(".nav__item");
            parent.classList.toggle("_active");
        });
    });
}

/*******************************/

const openFilterMobile = document.querySelector(".category-details__filter");
if (openFilterMobile) {
    openFilterMobile.addEventListener("click", function (e) {
        document.getElementById("filter-category").classList.add("_show");
        bodyLock();
    });
}

const closeFilter = document.getElementById("close-filter");

if (closeFilter) {
    closeFilter.addEventListener("click", function (e) {
        document.getElementById("filter-category").classList.remove("_show");
        bodyUnLock();
    });
}
/*******************************/


// Проверяем, установлены ли куки
if (!document.cookie.split("; ").find(row => row.startsWith("cookie_consent="))) {
    // Если куки не установлены, показываем уведомление
    document.getElementById("cookie-notice").style.display = "block";
}

// Обработчик для кнопки согласия
document.getElementById("accept-cookies").addEventListener("click", function() {
    console.log("click");
    // Устанавливаем куки на 1 год
    document.cookie = "cookie_consent=true; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
    // Скрываем уведомление
    document.getElementById("cookie-notice").style.display = "none";
});

const submenuOpenBtn = document.querySelectorAll(".submenu-open");

const openSubmenu = (e) => {
    console.log(e.currentTarget);
};

submenuOpenBtn?.forEach(btn => btn.addEventListener("click", openSubmenu));