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
    var inheritedLi = $(this).parents('.inherited');
    var input = inheritedLi.children('input[type=text], input[type=file], textarea');
    if (input.is('textarea') && !inheritedTextAreas[input])
      inheritedTextAreas[input] = input.tinymce(TinyMceDefaultSettings);
    if ($(this).attr('checked')) {
      input.removeClass('disabled').removeAttr('disabled');
      if (input.is('textarea'))
        inheritedTextAreas[input].tinymce().show();
      if (input.attr('type') == 'file')
        inheritedLi.children('p.remove').find('input[type=checkbox]').removeAttr('checked');
    } else {
      input.addClass('disabled').attr('disabled', true);
      if (input.is('textarea'))
        inheritedTextAreas[input].tinymce().hide();
      if (input.attr('type') == 'file')
        inheritedLi.children('p.remove').find('input[type=checkbox]').attr('checked', true);
    }
  });

});
