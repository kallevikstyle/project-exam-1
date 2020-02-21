//  Contact form MODULE
const validation = (function() {
    let contactForm = {
        firstName: {
            isValid: false,
            pattern: /^[a-z -]+$/i,
            inputId: document.querySelector('#firstname'),
            errorId: document.querySelector('#firstname-err'),
            checkId: document.querySelector('#firstname-check'),
            startValidation: function() {
                validateForm(this);
            }
        },
        lastName: {
            isValid: false,
            pattern: /^[a-z -]+$/i,
            inputId: document.querySelector('#lastname'),
            errorId: document.querySelector('#lastname-err'),
            checkId: document.querySelector('#lastname-check'),
            startValidation: function () {
                validateForm(this);
            }
        },
        email: {
            isValid: false,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            inputId: document.querySelector('#email'),
            errorId: document.querySelector('#email-err'),
            checkId: document.querySelector('#email-check'),
            startValidation: function () {
                validateForm(this);
            }
        },
        message: {
            isValid: false,
            pattern: /\S/,
            inputId: document.querySelector('#message'),
            errorId: document.querySelector('#message-err'),
            checkId: document.querySelector('#message-check'),
            startValidation: function () {
                validateForm(this);
            }
        },
        submitButton: {
            buttonId: document.querySelector('#message-submit')
        },
        validate: function() {
            // Start validation for all fields
            this.firstName.startValidation();
            this.lastName.startValidation();
            this.email.startValidation();
            this.message.startValidation();
            // Add eventlistener for submit button
            this.submitButton.buttonId.addEventListener('click', function() {
                submitForm(contactForm); 
            });
        }
    };
    
    function validateForm(input) {
        // Add event listeners for inputs
        input.inputId.addEventListener('change', function () {
            if (!input.pattern.test(input.inputId.value)) {
                showErrorMessage(input);
                // Set valid to false
                input.isValid = false;
            } else {
                hideErrorMessage(input);
                // Set valid to true
                input.isValid = true;
            }
        });
    }
    // Validation on clicking submit button
    function submitForm(contactForm) {
        const firstNameValid = contactForm.firstName.isValid,
            lastNameValid = contactForm.lastName.isValid,
            emailValid = contactForm.email.isValid,
            messageValid = contactForm.message.isValid,
            messageSuccess = document.querySelector('#message-success');
        
        // Check if all fields are valid
        if (firstNameValid && lastNameValid && emailValid && messageValid) {
            messageSuccess.style.border = "1px solid #3FD201";
            messageSuccess.style.color = "#3FD201";
            messageSuccess.innerHTML = "Your message has been sent!";
            messageSuccess.style.display = "block"
        } else {
            // Display separate error message for any invalid field
            if (!firstNameValid) {
                showErrorMessage(contactForm.firstName);
            } 
            if (!lastNameValid) {
                showErrorMessage(contactForm.lastName);
            }
            if (!emailValid) {
                showErrorMessage(contactForm.email);
            }
            if (!messageValid) {
                showErrorMessage(contactForm.message);
            }
            // Display error message on submit
            messageSuccess.style.border = "1px solid #C93C39";
            messageSuccess.style.color = "#C93C39";
            messageSuccess.innerHTML = "One or more fields has not been entered correctly. Please enter valid information, and try again.";
            messageSuccess.style.display = "block"  
        }
    }
    // Show and hide error messages
    function showErrorMessage(input) {
         // Show error messages
        input.errorId.style.display = "inline-block";
        input.inputId.style.border = "2px solid #C93C39";
        // Hide check symbol
        input.checkId.style.display = "none";
    }
    function hideErrorMessage(input) {
        // Hide error messages
        input.errorId.style.display = "none";
        input.inputId.style.border = "none";
        // Show check symbols
        input.checkId.style.display = "inline-block";
    }
    
    return {
        contactForm
    }
})();

(function() {
    // Initiate validation
    validation.contactForm.validate();

})();