function useData(txt) {
    // Convert "=" to ":" and add double quotes around keys and values
    // txt = txt.replace(/=/g, ":").replace(/\w+/g, ':"$1"').replace(/\w+/g, '"$1":')
    document.querySelector("h1").innerHTML = txt

}

window.onload = Android.getInfo("sessions/f1")