function Validator(options) {
    var formElement = document.querySelector(options.form);
    var isValid = true;

    function formGroup(selector, formInput) {
        var parentForm = formInput.parentElement;
        return parentForm.parentElement;
    }

    // Hàm kiểm tra hợp lệ hay không
    function validation(rule, inputElement) {
        var formGroupElement = formGroup(options.formGroup, inputElement);
        var formMessageElement = formGroupElement.querySelector(options.errorMessageSelector);

        const errorMessage = rule.check(inputElement.value);
        if(inputElement) {
            if(errorMessage) {
                formGroupElement.classList.add('invalid');
                formMessageElement.innerText = errorMessage;
                isValid = false;
            }
            else {
                formGroupElement.classList.remove('invalid');
                formMessageElement.innerText = '';
                isValid = true;
            }
        }
    }

    if(formElement) {
        // Không cho submit nếu còn field bị lỗi
        formElement.onsubmit = function(e) {
            var submitable = true;
            options.validate.forEach(rule => {
                var inputElement = document.querySelector(rule.selector);
                validation(rule, inputElement);
                if(!isValid) submitable = false;
            })

            if(!submitable) {
                e.preventDefault();
            }
        }

        // Kiểm tra từng rule
        options.validate.forEach(rule => {
            var inputElement = document.querySelector(rule.selector);
            var formGroupElement = formGroup(options.formGroup, inputElement);
            var formMessageElement = formGroupElement.querySelector(options.errorMessageSelector);
            if(inputElement) {
                // Xử lý khi blur ra
                inputElement.onblur = function(e) {
                    validation(rule, inputElement);
                }
                // Tắt cảnh báo khi gõ vào
                inputElement.oninput = function(e) {
                    formGroupElement.classList.remove('invalid');
                    formMessageElement.innerText = '';
                }
            }
        });

    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        check: (value) => {
            return value.trim() ? undefined : 'Vui lòng điền vào mục này'; 
        }
    }
}