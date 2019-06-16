// prototype原型模式
var textField, emailField;

function Field(type, displayText) {
  this.type = type || "";
  this.displayText = displayText || "";
}

Field.prototype = {
  getElement: function() {
    var field = document.createElement("input");
    field.setAttribute("type", this.type);
    field.setAttribute("placeholder", this.displayText);
    return field;
  }
};

textField = new Field("text", "Enter the first line of your address");
emailField = new Field("email", "Enter your email address");

window.addEventListener(
  "load",
  function() {
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
  },
  false
);

// 使用ES5实现原型模式
var field = {
    type: "",
    displayText: "",
    getElement: function() {
      var field = document.createElement("input");
      field.setAttribute("type", this.type);
      field.setAttribute("placeholder", this.displayText);
      return field;
    }
  },
  textField = Object.create(field, {
    type: {
      value: "text",
      enumerable: true
    },
    displayText: {
      value: "Enter the first line of your address",
      enumerable: true
    }
  }),
  emailField = Object.create(field, {
    type: {
      value: "email",
      enumerable: true
    },
    displayText: {
      value: "Enter your email address",
      enumerable: true
    }
  });

window.addEventListener("load", function() {
  var bodyElement = document.body;
  bodyElement.appendChild(textField.getElement());
  bodyElement.appendChild(emailField.getElement());
},false);
