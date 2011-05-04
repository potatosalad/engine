$(document).ready(function() {

  var enableNav = function() {
    $('#editable-elements .nav a').click(function(e) {
      var index = parseInt($(this).attr('href').match(/block-(.+)/)[1]);

      $('#editable-elements .wrapper ul li.block').hide();
      $('#block-' + index).show();

      $(this).parent().find('.on').removeClass('on');
      $(this).addClass('on');

      e.preventDefault();
    });
  }

  enableNav();

  $.subscribe('form.saved.success', function(event, data) {
    if (data.editable_elements != '') {
      $('#editable-elements').replaceWith(data.editable_elements);
      enableNav();

      $('textarea.html').tinymce(TinyMceDefaultSettings);
    }
  }, []);

  $('textarea.html:enabled').tinymce(TinyMceDefaultSettings);

  var inheritedTextAreas = new Array();
  $('#editable-elements .inherited .override input[type=checkbox]').change(function() {
    var input = $(this).parents('.inherited').children('input[type=text], textarea');
    if (input.is('textarea') && !inheritedTextAreas[input])
      inheritedTextAreas[input] = input.tinymce(TinyMceDefaultSettings);
    if ($(this).attr('checked')) {
      input.removeClass('disabled').removeAttr('disabled');
      if (input.is('textarea'))
        inheritedTextAreas[input].tinymce().show();
    } else {
      input.addClass('disabled').attr('disabled', 'disabled');
      if (input.is('textarea'))
        inheritedTextAreas[input].tinymce().hide();
    }
  });

});
