modalList = {};

function add_quickref_item(parent, data, type) {
  var icon = data.icon || "perspective-dice-six-faces-one";
  var subtitle = data.subtitle || "";
  var title = data.title || "[no title]";

  var item = document.createElement("div");
  item.className += "item itemsize";
  item.innerHTML =
    '\
    <div class="item-icon iconsize icon-' +
    icon +
    '"></div>\
    <div class="item-text-container text">\
        <div class="item-title">' +
    title +
    '</div>\
        <div class="item-desc">' +
    subtitle +
    "</div>\
    </div>\
    ";

  var style = window.getComputedStyle(parent.parentNode.parentNode);
  var color = style.backgroundColor;
  var openModal = () => captureModal(data, color, type);
  if (modalList[data.title]) {
    console.warn('duplicate data title '+ data.title +'. Preserving first-encountered')
  } else {
    modalList[data.title] = openModal;
  }
  item.onclick = openModal;

  parent.appendChild(item);
}

function showModalFromList(modalName) {
  modalList[modalName]();
}

function captureModal(data, color, type) {
  var title = data.title || "[no title]";
  var subtitle = data.description || data.subtitle || "";
  var bullets = data.bullets || [];
  var reference = data.reference || "";
  type = type || "";
  color = color || "black";

  $("body").addClass("modal-open");
  $("#modal").addClass("modal-visible");
  $("#modal-backdrop").css("height", window.innerHeight + "px");
  $("#modal-container")
    .css("background-color", color)
    .css("border-color", color);
  $("#modal-title")
    .text(title)
    .append('<span class="float-right">' + type + "</span>");
  $("#modal-subtitle").text(subtitle);
  $("#modal-reference").text(reference);

  var bullets_html = bullets
    .map(function (item) {
      return '<p class="fonstsize">' + item + "</p>";
    })
    .join("\n<hr>\n");
  $("#modal-bullets").html(bullets_html);
}

function hide_modal() {
  $("body").removeClass("modal-open");
  $("#modal").removeClass("modal-visible");
}

function init() {
  data_sets.forEach((vals) => {
    var { data, parent, type } = vals;
    var parent = document.getElementById(parent);
    data.forEach(function (item) {
      add_quickref_item(parent, item, type);
    });
  });

  var modal = document.getElementById("modal");
  modal.onclick = hide_modal;
}

$(window).load(init);
