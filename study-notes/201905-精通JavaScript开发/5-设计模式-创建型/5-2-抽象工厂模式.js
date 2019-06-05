// 定义一个基础工厂类,创建表单域
function FormFieldFactory() {
    this.availableTypes = {
        TEXT: "text",
        EMAIL: "email",
        BUTTON: "button"
    };
}

FormFieldFactory.prototype = {
    // 多态重写,否则直接调用报错
    makeField: function() {
        throw new Error("This method should not be called directly.");
    }
};

// 定义一个工厂类,继承于基础工厂类,用于html5表单域创建
function Html5FormFieldFactory() {}
Html5FormFieldFactory.prototype = new FormFieldFactory();
// 针对此工厂使用明确的代码来重写makeField方法
Html5FormFieldFactory.prototype.makeField = function(options) {
    var options = options || {},
        type = options.type || this.availableTypes.TEXT,
        displayText = options.displayText || "",
        field;
    switch (type) {
        case this.availableTypes.TEXT:
            field = new Html5FormFieldFactory(displayText);
            break;
        case this.availableTypes.EMAIL:
            field = new Html5FormFieldFactory(displayText);
            break;
        case this.availableTypes.BUTTON:
            field = new Html5FormFieldFactory(displayText);
            break;
        default:
            throw new Error("Invalid field type specified: " + type);
    }
    return field;
};

// 定义一个工厂类,继承基础类,用于老式HTML4表单域的创建
function Html4FormFieldFactory() {}
Html4FormFieldFactory.prototype = new FormFieldFactory();
// 针对此工厂使用明确的代码来重写makeField方法
Html4FormFieldFactory.prototype.makeField = function(options) {
    var options = options || {},
        type = options.type || this.availableTypes.TEXT,
        displayText = options.displayText || "",
        field;
    switch (type) {
        case this.availableTypes.TEXT:
        case this.availableTypes.EMAIL:
            field = new Html4FormFieldFactory(displayText);
            break;
        case this.availableTypes.BUTTON:
            field = new ButtonField(displayText);
            break;
        default:
            throw new Error("Invalid field type specified: " + type);
    }
    return field;
};

function Html5TextField(displayText) {
    this.displayText = displayText || "";
}
Html5TextField.prototype.getElement = function() {
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", this.displayText);
    return textField;
};
// html4不支持placeholder
function Html4TextField(displayText) {
    this.displayText = displayText || "";
}
Html4TextField.prototype.getElement = function() {
    var wrapper = document.createElement("div"),
        textField = document.createElement("input"),
        textFieldId = "text-field-" + Math.floor(Math.random() * 999),
        label = document.createElement("label"),
        labelText = document.createTextNode(this.displayText);
    textField.setAttribute("type", "text");
    textField.setAttribute("id", textFieldId);
    label.setAttribute("for", textFieldId);
    label.appendChild(labelText);

    wrapper.appendChild(textField);
    wrapper.appendChild(label);
    return wrapper;
};

function Html5EmailField(displayText) {
    this.displayText = displayText;
}
Html5EmailField.prototype.getElement = function() {
    var emailField = document.createElement("input");
    emailField.setAttribute("type", "email");
    emailField.setAttribute("placeholder", this.displayText);
    return emailField;
};

// 定义按钮表单元素,此元素在html4和html5是一致的,所以不需要两个单独的类
function ButtonField(displayText) {
    this.displayText = displayText;
}
ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;
    return button;
};

var supportsHtml5FormFields = (function() {
        // 判断是否支持html5
        var field = document.createElement("input");
        field.setAttribute("type", "email");
        return field.type === "emial";
    })(),
    formFieldFactory = supportsHtml5FormFields
        ? new Html5FormFieldFactory()
        : new Html4FormFieldFactory(),
    textField = formFieldFactory.makeField({
        type: "text",
        displayText: "Enter the first line of your address"
    }),
    emailField = formFieldFactory.makeField({
        type: "email",
        displayText: "Enter your email address"
    }),
    buttonField = formFieldFactory.makeField({
        // 推荐使用变量代替硬编码值,可降低日后的维护成本
        type: formFieldFactory.availableTypes.BUTTON,
        displayText: "Submit"
    });
window.addEventListener(
    "load",
    function() {
        var bodyElement = document.body;
        bodyElement.appendChild(textField.getElement());
        bodyElement.appendChild(emailField.getElement());
        bodyElement.appendChild(buttonField.getElement());
    },
    false
);
// 当需要从现有代码中的多个类中,根据这些类之间共有的目的或者通用的主题,创建一个额外的抽象层,以降低应用程序的其余开发工作的复杂性时,使用抽象工厂模式最为合适
