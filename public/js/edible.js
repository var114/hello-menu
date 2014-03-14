$("[data-dropzone]").each(function (index) {
    var postUrl = $(this).data("dropzone");
    $(this).dropzone({
      url: postUrl,
      createImageThumbnails: false
    });
  });

$('.show-edible').click(function () {
  $("[data-edible]").each(function (index) {
    $(this).toggleClass("show-yourself");
  })

})

// $('[data-menu-link]').tooltips();


var socket = io.connect('/');
socket.on('success', function (data) {
  console.log(data);
  });

$("[data-edible]").each(function (index) {
  var dataOriginal = $(this).html();
  var dataName = $(this).data("edible").dataName;
  var dbName = $(this).data("edible").db;
  $(this).attr('contenteditable', true);
  $(this).blur(function () {
    var updatedText = $(this).text();
    if (dataOriginal !== updatedText) {
      console.log('updated ' + dataName + ' of ' + dbName +  ' to: ' + updatedText);  
      edibleUpdate(socket, dbName, dataName, updatedText);
    }
  });
});

function edibleUpdate(socket, dbName, dataKey, dataValue) {
  socket.emit('edit', {dbName: dbName, dataKey: dataKey, dataValue:dataValue})
}

/* CSS Tricks Events */
// http://css-tricks.com/snippets/javascript/saving-contenteditable-content-changes-as-json-with-ajax/ */
document.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
      data = {};

  if (input) {
    if (esc) {
      // restore state
      document.execCommand('undo');
      el.blur();
    } else if (nl) {
      // save
      data[el.getAttribute('data-name')] = el.innerHTML;

      // we could send an ajax request to update the field
      /*
      $.ajax({
        url: window.location.toString(),
        data: data,
        type: 'post'
      });
      */
      // log(JSON.stringify(data));

      el.blur();
      event.preventDefault();
    }
  }
}, true);

// function log(s) {
//   document.getElementById('debug').innerHTML = 'value changed to: ' + s;
// }