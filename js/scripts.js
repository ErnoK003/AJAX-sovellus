var firsttime = 1;
function todaydate(){
    if (firsttime == 1) {
        const today = new Date();
        const dateinput = document.getElementById('dateInput')
        dateinput.value = today.toISOString().split('T')[0]; //otetaan tämän päivän päivämäärä ja muutetaan se ISO 8601-
        firsttime=0                                         //muotoon, josta otetaan lopuksi päivämäärä
    }

}

function selecteddate(){
    const dateinput = document.getElementById('dateInput')
    const selectedDate = new Date(dateinput.value);
    const convertdate = selectedDate.toISOString().split('T')[0];
    const converteddate = convertdate.split('-')
    wanteddate = `${converteddate[2]}.${converteddate[1]}.${converteddate[0]}`; //muutetaan päivämäärä haluttuun muotoon
    return wanteddate; //palautetaan päivämäärä oikeassa muodossa
}


//searchTheater = () =>{
//    var movies = document.getElementById('movies'); // haetaan elokuvien div-elementti
//    movies.innerHTML = ''; // tyhjennetään elokuvien div-elementti, jotta saadaan uudet elokuvat näkyviin
//    var teatteriID = document.getElementById('theaters').value    //hakee valitun teatterin ID:n (valuen select-elementistä)
//    if (!teatteriID) {
//        console.error('TeatteriID puuttuu!');
//        return;
//    }
//    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${teatteriID}&dt=${selecteddate()}`) //haetaan Finnkinon XML-dataa teatterin ID:n perusteella (ID:t on määrännyt Finnkino)
//        .then(response => response.text()) // muutetaan data teksiksi
//        .then(str => {                     // data tulee XML-muodossa, siksi .text()
//        const parser = new DOMParser();  // luodaan uusi DOMParser-olio
//        const xml = parser.parseFromString(str, 'text/xml'); // parsitaan teksti DOM-objekteiksi
//
//        const shows = xml.querySelectorAll('Show'); // hakee datasta kaikki näytökset
//        
//        let row = document.createElement('div'); // luodaan uusi div-elementti, josta luodaan rivi, johon mahtuu tietty määrä elokuvia
//        row.className = 'row'; // asetetaan div-elementin luokaksi "row", jotta se menee riviin
//        
//        var elokuvia = 0
//        shows.forEach(show => {                     // käy läpi jokaisen näytöksen ja hakee siitä otsikon,
//            const title = show.querySelector('Title')?.textContent;     // teatterin, teatterin ID:n ja alkamisen ajan
//            const theatre = show.querySelector('Theatre')?.textContent;
//            const startTime = show.querySelector('dttmShowStart')?.textContent;
//            const image = show.querySelector('EventMediumImagePortrait')?.textContent; //hakee elokuvan kansikuvan
//            console.log(`${title} @${theatre} - Alkaa: ${startTime.split('T')}`);
//
//            const moviediv = document.createElement('div'); // luodaan uusi div-elementti, johon lisätään kaikki elokuvan tiedot
//            moviediv.classList.add("col");
//
//            const movieinfo = document.createElement('p'); // luodaan uusi p-elementti, johon lisätään elokuvan info
//            movieinfo.style.fontSize = '17px';
//            const moviebanner = document.createElement('img'); // luodaan uusi img-elementti, johon lisätään elokuvan kansikuva
//            moviebanner.src = image; // asetetaan img-elementin lähde elokuvan kansikuvaksi
//            moviebanner.alt = `Elokuva: ${title}`; // asetetaan img-elementin alt-teksti elokuvan nimeksi
//            movieinfo.innerHTML = title + '<br>' + theatre + '<br>' + startTime.split('T') + '<br>' // lisätään elokuvan tiedot p-elementtiin
//            moviediv.appendChild(movieinfo); // lisätään p-elementti div-elementtiin
//            moviediv.appendChild(moviebanner); // lisätään img-elementti div-elementtiin
//            moviediv.classList.add("col")
//
//            if (elokuvia > 2) {
//                movies.appendChild(row); // lisätään täysi rivi elokuvien div-elementin alle
//                row = document.createElement('div'); // luodaan uusi div-elementti, josta luodaan rivi, johon mahtuu tietty määrä elokuvia
//                row.className = 'row'; // asetetaan div-elementin luokaksi "row", jotta se menee riviin
//                elokuvia = 0
//            }
//
//            row.appendChild(moviediv); // lisätään Elokuvadiv-elementti riviin
//            elokuvia += 1
//        if (elokuvia < 3) {
//            movies.appendChild(row); // lisätään täysi rivi elokuvien div-elementin alle
//        }
//        });
//    });
//}



// var chosendate = document.getElementById('dateInput').value

searchTheater = () =>{
    var movies = document.getElementById('movies'); // haetaan elokuvien div-elementti
    movies.innerHTML = ''; // tyhjennetään elokuvien div-elementti, jotta saadaan uudet elokuvat näkyviin
    var teatteriID = document.getElementById('theaters').value    //hakee valitun teatterin ID:n (valuen select-elementistä)
    if (!teatteriID) {
        console.error('TeatteriID puuttuu!');
        return;
    }
    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${teatteriID}&dt=${selecteddate()}`) //haetaan Finnkinon XML-dataa teatterin ID:n perusteella (ID:t on määrännyt Finnkino)
        .then(response => response.text()) // muutetaan data teksiksi
        .then(str => {                     // data tulee XML-muodossa, siksi .text()
            const parser = new DOMParser();  // luodaan uusi DOMParser-olio
            const xml = parser.parseFromString(str, 'text/xml'); // parsitaan teksti DOM-objekteiksi;
            const shows = xml.querySelectorAll('Show'); // hakee datasta kaikki näytökset
            let row = document.createElement('div'); // luodaan uusi div-elementti, josta luodaan rivi, johon mahtuu tietty määrä elokuvia
            row.className = 'row'; // asetetaan div-elementin luokaksi "row", jotta se menee riviin
            
            var elokuvainfot = []
            var elokuvia = 0
            shows.forEach(show => {                     // käy läpi jokaisen näytöksen ja hakee siitä otsikon,
                const title = show.querySelector('Title')?.textContent;     // teatterin, teatterin ID:n ja alkamisen ajan
                const theatre = show.querySelector('Theatre')?.textContent;
                const startTime = show.querySelector('dttmShowStart')?.textContent;
                const image = show.querySelector('EventMediumImagePortrait')?.textContent; //hakee elokuvan kansikuvan
                console.log(`${title} @${theatre} - Alkaa: ${startTime.split('T')}`);
                const paiva = startTime.split('T')[0]; // otetaan päivämäärä erilleen ajasta
                const paivaosat = paiva.split('-'); // jaetaan päivämäärä osiin
                const ppkkvvvv = paivaosat[2]+'.'+paivaosat[1]+'.'+paivaosat[0]; // muutetaan päivämäärä haluttuun muotoon
                const aika = startTime.split('T')[1]; // otetaan aika erilleen päivämäärästä
                var elokuvainfo = [title,theatre,ppkkvvvv,aika,image] // luodaan taulukko, johon lisätään elokuvan tiedot
                elokuvainfot.push(elokuvainfo)
                //console.log(elokuvainfot[elokuvainfot.length-1])  //hakee viimeisimmän lisätyn taulukon tiedot
            });
            if (document.getElementById('sortedbySelect').value == 'nimi'){ //tarkistetaan, halutaanko lajitella aakkosten mukaan
                elokuvainfot.sort() //lajitellaan elokuvainfot taulukko aakkosjärjestykseen
                console.log(elokuvainfot) // tulostetaan elokuvainfot taulukko konsoliin
            }

            elokuvainfot.forEach(elokuvainfo => {  //käydään läpi elokuvainfot taulukko ja lisätään jokainen elokuva omaan div-elementiin
                const moviediv = document.createElement('div'); // luodaan uusi div-elementti, johon lisätään kaikki elokuvan tiedot
                moviediv.classList.add("col");
            
                const movieinfo = document.createElement('p'); // luodaan uusi p-elementti, johon lisätään elokuvan info
                movieinfo.style.fontSize = '17px';
                const moviebanner = document.createElement('img'); // luodaan uusi img-elementti, johon lisätään elokuvan kansikuva
                moviebanner.src = elokuvainfo[4]; // asetetaan img-elementin lähde elokuvan kansikuvaksi
                moviebanner.alt = `Elokuva: ${elokuvainfo[0]}`; // asetetaan img-elementin alt-teksti elokuvan nimeksi
                movieinfo.innerHTML = elokuvainfo[0] + '<br>' + elokuvainfo[1] + '<br>' + elokuvainfo[2] +' klo '+ elokuvainfo[3] + '<br>' // lisätään elokuvan tiedot p-elementtiin
                moviediv.appendChild(movieinfo); // lisätään p-elementti div-elementtiin
                moviediv.appendChild(moviebanner); // lisätään img-elementti div-elementtiin
                moviediv.classList.add("col")
            
                if (elokuvia > 2) {
                    movies.appendChild(row); // lisätään täysi rivi elokuvien div-elementin alle
                    row = document.createElement('div'); // luodaan uusi div-elementti, josta luodaan rivi, johon mahtuu tietty määrä elokuvia
                    row.className = 'row'; // asetetaan div-elementin luokaksi "row", jotta se menee riviin
                    elokuvia = 0
                }
            
                row.appendChild(moviediv); // lisätään Elokuvadiv-elementti riviin
                elokuvia += 1
            if (elokuvia < 3) {
                movies.appendChild(row); // lisätään täysi rivi elokuvien div-elementin alle
            }
            
            })
        });
}


//const elokuvainfo = `${title} @${theatre} - Alkaa: ${startTime.split('T')}`