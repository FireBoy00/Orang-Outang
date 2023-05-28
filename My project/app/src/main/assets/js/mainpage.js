var sport="Football";
var cntSessions = 0;
var fav = false;
var data = {
    "terenuri": {
        "Football": [
            {
                "id": "f1",
                "name": "Sport Kiru",
                "address": "Strada Carvunarilor 19",
                "price": "160 ron / hour",
                "program": "8 A.M – 11 P.M",
                "favorite": false
            },
            {
                "id": "f2",
                "name": "Green Arena",
                "address": "Hipodrom sud",
                "price": "120 ron / hour",
                "program": "8 A.M – 9:30 P.M",
                "favorite": false
            },
            {
                "id": "f3",
                "name": "Axa Strejnic",
                "address": "Strada sportului 6, Strejnic",
                "price": "180 ron / hour",
                "program": "10 A.M – 10 P.M",
                "favorite": false
            },
            {
                "id": "f4",
                "name": "Municipal",
                "address": "Parcul municipal Ploiesti Vest",
                "price": "45 ron / hour",
                "program": "9 A.M – 10 P.M",
                "favorite": false
            },
            {
                "id": "f5",
                "name": "Complex Tenis Vest Ploiesti",
                "address": "Strada Marasesti 478",
                "price": "120 ron / hour",
                "program": "7 A.M.- 2 A.M.",
                "favorite": false
            }
        ],
        "Tennis": [
            {
                "id": "t1",
                "name": "CSS Ploiesti - Baza de Tenis",
                "address": "CSS Ploiesti - Baza de Tenis",
                "price": "35 ron / hour",
                "program": "8 A.M- 10 P.M",
                "favorite": false
            },
            {
                "id": "t2",
                "name": "Teren #2",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "10 ron / hour",
                "program": "12:00",
                "favorite": false
            },
            {
                "id": "t3",
                "name": "Sala sporturilor Olimpia",
                "address": "Strada Alecu Russo 10",
                "price": "20 ron / hour",
                "program": "9 A.M – 9 P.M",
                "favorite": false
            },
            {
                "id": "t4",
                "name": "Tenis Vest Ploiesti",
                "address": "Strada Marasesti 478",
                "price": "35 ron / hour",
                "program": "7 A.M.- 2 A.M.",
                "favorite": false
            },
            {
                "id": "t5",
                "name": "Tenis Green Arena",
                "address": "Bulevardul Bucuresti,Ploiesti",
                "price": "30 ron / hour",
                "program": "8 A.M – 9:30 P.M",
                "favorite": false
            },
            {
                "id": "t6",
                "name": "Tenis Municipal",
                "address": "Parc Municipal Ploiesti Vest",
                "price": "18 ron / hour",
                "program": "9 A.M – 10 P.M",
                "favorite": false
            }
        ],
        "Baschet": [
            {
                "id": "b1",
                "name": "Teren #1",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "5 ron / hour",
                "program": "12:00",
                "favorite": false
            },
            {
                "id": "b2",
                "name": "Teren #2",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "10 ron / hour",
                "program": "12:00",
                "favorite": false
            },
            {
                "id": "b3",
                "name": "Teren #3",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "20 ron / hour",
                "program": "12:00",
                "favorite": false
            },
            {
                "id": "b4",
                "name": "Teren #4",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "15 ron / hour",
                "program": "12:00",
                "favorite": false
            },
            {
                "id": "b5",
                "name": "Teren #5",
                "address": "Str. Nicaieriea, Nr. 234",
                "price": "30 ron / hour",
                "program": "12:00",
                "favorite": false
            }
        ]
    }
}

function openHost(btn) {
    var id = document.querySelector(".teren .info .id").innerHTML
    var name = document.querySelector(".teren .info .name").innerHTML
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("name", name)
    Android.redirectTo('host.html')
}

function join(btn) {
    var sesID = btn.parentNode.parentNode.querySelector(".infos .id").innerHTML
    var terenName = btn.parentNode.parentNode.parentNode.parentNode.querySelector(".name").innerHTML
    var terenID = btn.parentNode.parentNode.parentNode.parentNode.querySelector(".sess .id").innerHTML
    sessionStorage.setItem("sesID", sesID)
    sessionStorage.setItem("terName", terenName)
    sessionStorage.setItem("terID", terenID)
    Android.redirectTo('session.html')
}

function genSessions(teren) {
    var path = teren.querySelector(".sess .info .id").innerHTML
    data = JSON.parse(Android.getInfo(`sessions/${path}`))
    if (data) {
        data.forEach((ses, id) => {
            var clone = teren.querySelector("#modelsession").content.cloneNode(true)
            var span = clone.querySelectorAll("span")
            user = JSON.parse(Android.getInfo(`users/${ses.host}`))
            span[0].innerHTML = `Created by: ${user.username}`
            span[1].innerHTML = `Data: ${ses.date}`
            span[2].innerHTML = `Time: ${ses.time}`
            span[3].innerHTML = id
            span[4].innerHTML = `${ses.people} / ${ses.max_people}`
            teren.querySelector(".sessions").appendChild(clone)
        })
    }
}

function genTerenuri(){
    var temp = document.querySelector("#modelteren");
    var x = JSON.parse(localStorage.getItem("data"))
    if ( sport != 'Favourite'){
        x.terenuri[sport].forEach(teren => {
            var clone = temp.content.cloneNode(true);
            
            var text = clone.querySelectorAll(".info span");
            text[0].textContent = `${teren.name}`
            text[1].textContent = teren.address;
            text[2].textContent = `Program: ${teren.program}`;
            text[3].textContent = `Price: ${teren.price}`;
            text[5].textContent = teren.id
    
            var img1 = clone.querySelector(".teren .star i")
            var img2 = clone.querySelector(".teren .star img")
            if (teren.favorite) {
                img1.classList.add("addFav")
                img2.classList.add("addFav")
            }
            
            genSessions(clone);
            document.querySelector(".terenuri").appendChild(clone);
        })
    }else {
        var spo = ["Football", "Baschet", "Tennis"]
        spo.forEach(sp => {
            x.terenuri[sp].forEach(teren => {
                if (teren.favorite) {
                    var clone = temp.content.cloneNode(true);
                    
                    var text = clone.querySelectorAll(".info span");
                    text[0].textContent = `${teren.name} (${sp})`
                    text[1].textContent = teren.address;
                    text[2].textContent = `Program: ${teren.program}`;
                    text[3].textContent = `Price: ${teren.price}`;
                    text[5].textContent = teren.id
            
                    var img1 = clone.querySelector(".teren .star i")
                    var img2 = clone.querySelector(".teren .star img")
                    if (teren.favorite) {
                        img1.classList.add("addFav")
                        img2.classList.add("addFav")
                    }

                    genSessions(clone);
                    document.querySelector(".terenuri").appendChild(clone);
                }
            })
        })
    }
    
}

function expandTeren(div) {
    div.classList.toggle("open");
}

function addFav(event) {
    if ( event.target.tagName.toLowerCase() === "img" )
    {
        event.stopPropagation();
        event.target.classList.toggle("addFav");
        event.target.parentNode.classList.toggle("addFav");
        var id = event.target.parentNode.parentNode.parentNode.parentNode.querySelector(".sess .info .id").innerHTML
        var x = JSON.parse(localStorage.getItem("data"))
        var spo = ["Football", "Baschet", "Tennis"]
        spo.forEach(sp => {
            x.terenuri[sp].forEach(teren => {
                if (teren.id == id) {
                    teren.favorite = !teren.favorite
                }
            })
        })
        localStorage.setItem("data", JSON.stringify(x))
    }
}

function render(sportsel) {
    sport = sportsel;
    if (!localStorage.getItem("data")) {
        localStorage.setItem("data", JSON.stringify(data))
    }
    var terenuri = document.querySelector(".terenuri");
    terenuri.innerHTML = ""; 
    genTerenuri();
}


window.onload = render("Football");