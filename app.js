function Validator(option) {
    var formElement = document.querySelector(option.form)
    if (formElement) {
        option.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector)
            inputElement.onblur = function () {
                var message = this.parentElement.querySelector(".form-message")
                message.innerText = rule.test(inputElement.value)
            }
        });
    }
}
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            return value ? "" : "Vui lòng nhập trường này"
        }
    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value) ? "" : "Vui lòng nhập trường này là email"
        }
    }
}
Validator.isLimited = function (selector,limit) {
    return {
        selector: selector,
        test : function (value) {
            return value.length>=limit ? "" : `Vui lòng nhập mật khẩu có từ ${limit} ký tự`
        }
    }
}
Validator.isMatched = function (selector,confirm) {
    return {
        selector: selector,
        test : function (value) {
            return value==confirm() ? "" : "Mật khẩu không khớp"
        }
    }
}
Validator({
    form: "#form-1",
    rules: [
        Validator.isRequired("#fullname"),
        Validator.isEmail("#email"),
        Validator.isLimited("#password",6),
        Validator.isMatched("#pw-confirm",function () {
            return document.querySelector(`#form-1 #password`).value
        })
    ]
})
var root = document.querySelector("#root")
console.dir(root)
