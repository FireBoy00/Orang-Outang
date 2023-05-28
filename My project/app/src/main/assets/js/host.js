function render() {
    var nume = document.querySelector(".terrain span")
    nume.innerHTML = sessionStorage.getItem("name")
}

function isDateGreaterThanCurrent(selectedDate) {
    const currentDate = new Date();  // Get the current date
  
    // Create a new Date object from the selected date string
    const parts = selectedDate.split('-');
    const selectedDateTime = new Date(parts[0], parts[1] - 1, parts[2]); // Subtract 1 from the month since months are zero-based
  
    return selectedDateTime > currentDate;
}

function host() {
    var host = Android.getUid();
    var date = document.querySelector(".seldate .date input").value
    var time = document.querySelector(".seldate .time input").value
    var maxplayers = document.querySelector(".playersnr input").value
    var currentpl = 1
    var teren = sessionStorage.getItem("id")
    
    if (maxplayers >= 2 && isDateGreaterThanCurrent(date)) {
        var data = {
            date: date,
            time: time,
            max_people: maxplayers,
            people: currentpl,
            host: host,
            users: []
        }
        data.users.push(host)
    
        var datas = JSON.parse(Android.getInfo("sessions/" + teren))
        if (datas == undefined) {
            datas = []
        }
        datas.push(data)
        Android.writeData("sessions",teren,JSON.stringify(datas))
        Android.redirectTo('main_page.html')
    }else {
        Android.showAlert("Error", "Please pick at least 2 people and a time greater then the current one")
    }
}

window.onload = render()