var main_menu = document.querySelector('#optionbar');
var side_menu = document.querySelector('#sidebar');
var menu = document.querySelector('#main-menu');
var outside = document.querySelector('#container');
var navbar = document.querySelector('#nav');

main_menu.addEventListener("click", function() {
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

outside.addEventListener("click", function() {
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  }
})
