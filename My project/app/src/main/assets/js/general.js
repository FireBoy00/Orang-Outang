function checkUser() {
    if(Android.checkSignIn()) {
        Android.redirectTo("main_page.html")
    }
}

function getErrorMessage(input) {
    if (input.validity.patternMismatch) {
        if (input.value.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!/(?=.*[!@#$%^&*()_\-+=~`[\]{}|:;'<>.,?\\/])/.test(input.value)) {
            return "Password must contain at least one symbol.";
        }
        if (!/(?=.*[A-Z])/.test(input.value)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/(?=.*\d)/.test(input.value)) {
            return "Password must contain at least one number.";
        }
    }
    if (input.validity.valueMissing) {
        return "Please enter a password.";
    }
    return "";
}