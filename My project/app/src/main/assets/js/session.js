function render() {
    var temp = document.querySelector("#utiz")
    var span = document.querySelectorAll(".infos span")
    var data = JSON.parse(Android.getInfo(`sessions/${sessionStorage.getItem("terID")}/${sessionStorage.getItem("sesID")}`))
    var hostData = JSON.parse(Android.getInfo(`users/${data.host}`))
    var currentUser = Android.getUid()
    span[0].innerHTML = sessionStorage.getItem("terName")
    span[1].innerHTML = `Host: ${hostData.username}`
    if (hostData.rating.nr == 0) {
        span[2].innerHTML = `Rating: 0.0`
    }else {
        span[2].innerHTML = `Rating: ${(hostData.rating.sum*1.0 / hostData.rating.nr).toFixed(1)}`
    }
    span[4].innerHTML = data.date
    span[6].innerHTML = data.time
    span[8].innerHTML = `${data.people} / ${data.max_people}`
    data.users.forEach(user => {
        var clone = temp.content.cloneNode(true);
        var userData = JSON.parse(Android.getInfo(`users/${user}`))
        clone.querySelector(".name span").innerHTML = userData.username
        if (userData.rating.nr == 0) {
            clone.querySelector(".rating span").innerHTML = `Rating: 0`
        }else {
            clone.querySelector(".rating span").innerHTML = `Rating: ${(userData.rating.sum*1.0 / userData.rating.nr).toFixed(1)}`
        }
        clone.querySelector(".infos1 .id").innerHTML = user
        if (user == currentUser) {
            clone.querySelector(".box").classList.add("currentUser")
        }
        document.querySelector(".playersname").appendChild(clone);
    })
    if (data.host == Android.getUid() || data.users.includes(currentUser) || data.people >= data.max_people) {
        document.querySelector(".btn").classList.remove("show")
    }
}

function join(btn) {
    var data = JSON.parse(Android.getInfo(`sessions/${sessionStorage.getItem("terID")}/${sessionStorage.getItem("sesID")}`))
    var currentData = JSON.parse(Android.getInfo(`users/${Android.getUid()}`))
    var temp = document.querySelector("#utiz");
    var clone = temp.content.cloneNode(true);
    var name = clone.querySelector(".infos1 .name");
    var rating = clone.querySelector(".infos1 .rating");
    var id = clone.querySelector(".infos1 .id");
    
    name.innerHTML = currentData.username
    if (currentData.rating.nr == 0) {
        rating.innerHTML = `Rating: 0`
    }else {
        rating.innerHTML = `Rating: ${(currentData.rating.sum*1.0 / currentData.rating.nr).toFixed(1)}`
    }
    id.innerHTML = Android.getUid()

    data.users.push(Android.getUid())
    data.people += 1
    Android.writeData("sessions", `${sessionStorage.getItem("terID")}/${sessionStorage.getItem("sesID")}`, JSON.stringify(data))
    document.querySelector(".players span:nth-child(2)").innerHTML = `${data.people} / ${data.max_people}`
    clone.querySelector(".box").classList.add("currentUser")
    document.querySelector(".playersname").appendChild(clone);
    btn.classList.remove("show")
}

function openProfile(btn) {
    var uid = btn.querySelector(".id").innerHTML
    sessionStorage.setItem("uid", uid)
    Android.redirectTo('profile.html')
}

window.onload = function() {
    render();
}