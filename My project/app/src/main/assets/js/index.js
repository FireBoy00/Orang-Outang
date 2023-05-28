function login() {
    const email = document.querySelector(".emailInput")
    const password = document.querySelector(".passwordInput")
    Android.login(email.value, password.value)
}

function create() {
    const username = document.querySelector(".usernameInput")
    const email = document.querySelector(".emailInput")
    const password = document.querySelector(".passwordInput")
    console.log(`Username: ${username.value}`)
    console.log(`Email: ${email.value}`)
    console.log(`Password: ${password.value}`)
    Android.create(email.value, password.value, username.value)
}

function createProfile(username) {
    var data = {
        username: username,
        rating: {
            sum: 0,
            nr: 0
        }
    }
    console.log(JSON.stringify(data))
    Android.writeData("users", Android.getUid(), JSON.stringify(data))
}

function switchMode() {
    document.querySelector(".other").classList.toggle("show")
    document.querySelector(".other1").classList.toggle("show")
    document.querySelector(".loginBtn").classList.toggle("show")
    document.querySelector(".createBtn").classList.toggle("show")
    document.querySelector(".usernameInput").toggleAttribute("hidden")
    document.querySelector(".usernameInput").toggleAttribute("disabled")
}

function handleSubmit(event) {
    event.preventDefault()
    var buttonClicked = event.submitter
    var action = buttonClicked.getAttribute("data-action")

    if (action === "login") {
        // Call the login function
        login()
    } else if (action === "create") {
        // Call the create function
        create()
    }
}

window.onload = checkUser()