var header = document.querySelector('.page-header');
var navToggle = document.querySelector('.page-header__hamburger');

header.classList.remove('page-header--no-js');

navToggle.addEventListener('click', function () {
  if (header.classList.contains('page-header--opened')) {
    header.classList.remove('page-header--opened');
    header.classList.add('page-header--close');

  } else {
    header.classList.add('page-header--opened');
    header.classList.remove('page-header--close');

  }
});
