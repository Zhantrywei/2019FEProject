// 定义一个工厂，基于输入内容，使用最合适的类来创建相对应的表单域对象
var FormFieldFactory = {
    makeField: function(options) {
        var options = options || {},
            type = options.type || "text",
            displayText = options.displayText || "",
            field;

        // 基于所提供类型选择合适的类来创建实例
        switch (type) {
            case "text":
                field = new TextField(displayText);
                break;
            case "email":
                field = new EmailField(displayText);
                break;
            case "button":
                field = new ButtonField(displayText);
                break;
            default:
                field = new TextField(displayText);
                break;
        }

        return field;
    }
};

// 定义TextField类，创建input text 表单元素
function TextField(displayText) {
    this.displayText = displayText;
}

TextField.prototype.getElement = function() {
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", this.displayText);
    return textField;
};

// 定义EmailField类，创建input email表单元素
function EmailField(displayText) {
    this.displayText = displayText;
}

EmailField.prototype.getElement = function() {
    var emailField = document.createElement("input");
    emailField.setAttribute("type", "email");
    emailField.setAttribute("placeholder", this.displayText);
    return emailField;
};

// 定义ButtonField类，创建button表单元素
function ButtonField(displayText) {
    this.displayText = displayText;
}

ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;
    return button;
};

// 使用工厂模式
// 使用工厂创建文本表单域，邮箱表单域，提交按钮，我们不需要知道底层的那些类或他们特定输入就可以创建表单域。FormFieldFactory对该方法进行了抽象
var textField = FormFieldFactory.makeField({
        type: "text",
        displayText: "Enter the first line of your address"
    }),
    emailField = FormFieldFactory.makeField({
        type: "email",
        displayText: "Enter your email address"
    }),
    buttonField = FormFieldFactory.makeField({
        type: "button",
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
// 当需要在代码的其余所有部分通过屏蔽较为复杂的对象创建方法来简化某些特定对象的创建过程时，使用工厂模式最合适。