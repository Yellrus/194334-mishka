'use strict';

(function() {
  var body = document.body;
  var burgerMenu = document.getElementsByClassName('page-header__nav-menu')[0];
  var burgerContain = document.getElementsByClassName('page-header__hamburger')[0];
  var burgerNav = document.getElementsByClassName('page-header__hamburger')[0];

  burgerMenu.addEventListener('click', function toggleClasses() {
    [body, burgerContain, burgerNav].forEach(function (el) {
      el.classList.toggle('open');
    });
  }, false);
})();

/* пока нихрена не выходит */
