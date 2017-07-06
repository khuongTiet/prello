
$(function() {
  $('#submit-btn').on('click', function(e) {
    if ($('#register-password').val() !== $('#register-password-confirm').val()) {
      e.preventDefault();
    }
  });
});
