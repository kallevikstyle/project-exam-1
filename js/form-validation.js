//  Contact form MODULE
const validation = (function() {
    let contactForm = {
        firstName: {
            pattern: /^[a-z -]+$/i,
            inputId: document.querySelector('#firstname'),
            errorId: document.querySelector('#firstname-err'),
            startValidation: function() {
                validateForm(this);
            }
        },
        lastName: {
            pattern: /^[a-z -]+$/i,
            inputId: document.querySelector('#lastname'),
            errorId: document.querySelector('#lastname-err'),
            startValidation: function () {
                validateForm(this);
            }
        },
        email: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            inputId: document.querySelector('#email'),
            errorId: document.querySelector('#email-err'),
            startValidation: function () {
                validateForm(this);
            }
        },
        message: {
            pattern: "",
            inputId: document.querySelector('#message'),
            errorId: document.querySelector('#message-err'),
            startValidation: function () {
                validateForm(this);
            }
        },
        validate: function() {
            // Starts validation for all fields
            this.firstName.startValidation();
            this.lastName.startValidation();
            this.email.startValidation();
            this.message.startValidation();
        }
    };

    function validateForm(input) {
        // Add event listeners for inputs
        input.inputId.addEventListener('change', function () {
            if (!input.pattern.test(input.inputId.value)) {
                input.errorId.style.display = "inline-block";
                input.inputId.style.border = "2px solid #C93C39";
            } else {
                input.errorId.style.display = "none";
                input.inputId.style.border = "none";
            }
            // NEED A BETTER PATTERN FOR EMAIL
        });
    }
    
    return {
        contactForm
    }
})();

(function() {

    validation.contactForm.validate();

})();