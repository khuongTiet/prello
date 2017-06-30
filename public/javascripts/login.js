var password = document.querySelector('#password');
var confirm = document.querySelector('#confirm');

var register_form = document.querySelector('#register-form');

register_form.addEventListener('submit', function(e) {
  if (password.value !== confirm.value) {
    e.preventDefault();
  }
});
