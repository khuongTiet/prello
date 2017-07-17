
$(function() {
  $('#reset-submit-btn').on('click', function(e) {
    if ($('#reset-password').val() !== $('#reset-password-confirm').val()) {
      e.preventDefault();
    }
  });
});
