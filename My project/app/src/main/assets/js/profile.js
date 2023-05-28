function rate(clickedStar, starIndex) {
    var svgElements = clickedStar.parentNode.parentNode.querySelectorAll('.stea .star');
    svgElements.forEach(function(element, index) {
      sessionStorage.setItem("stars", starIndex)
      if (index <= starIndex) {
        element.classList.add('selected');
      } else {
        element.classList.remove('selected');
      }
    })
}

function review() {
  var userData = JSON.parse(Android.getInfo(`users/${sessionStorage.getItem("uid")}`))
  userData.rating.nr += 1
  userData.rating.sum += parseInt(sessionStorage.getItem("stars"), 10)+1
  Android.writeData("users", sessionStorage.getItem("uid"), JSON.stringify(userData))
  Android.showToast("Review added")
  Android.redirectTo('main_page.html')
}

function render() {
    var span = document.querySelectorAll(".infos span")
    var userData = JSON.parse(Android.getInfo(`users/${sessionStorage.getItem("uid")}`))
    console.log(sessionStorage.getItem("uid"))
    span[1].innerHTML = userData.username
    if (userData.rating.nr == 0) {
      span[3].innerHTML = 0
    }else {
      span[3].innerHTML = (userData.rating.sum*1.0 / userData.rating.nr).toFixed(1)
    }
}

window.onload = render