searchTheater = () =>{
    var teatteriID = document.getElementById('theaters').value    //hakee valitun teatterin ID:n (valuen select-elementistä)
    fetch(`https://www.finnkino.fi/xml/Schedule/?area=${teatteriID}`) //haetaan Finnkinon XML-dataa teatterin ID:n perusteella (ID:t on määrännyt Finnkino)
        .then(response => response.text()) // muutetaan data teksiksi
        .then(str => {                     // data tulee XML-muodossa, siksi .text()
        const parser = new DOMParser();  // luodaan uusi DOMParser-olio
        const xml = parser.parseFromString(str, 'text/xml'); // parsitaan teksti DOM-objekteiksi

        const shows = xml.querySelectorAll('Show'); // hakee datasta kaikki näytökset

        shows.forEach(show => {                     // käy läpi jokaisen näytöksen ja hakee siitä otsikon,
            const title = show.querySelector('Title')?.textContent;     // teatterin, teatterin ID:n ja alkamisen ajan
            const theatre = show.querySelector('Theatre')?.textContent;
            const startTime = show.querySelector('dttmShowStart')?.textContent;
            const image = show.querySelector('EventMediumImagePortrait')?.textContent; //hakee elokuvan kansikuvan
            console.log(`${title} @${theatre} - Alkaa: ${startTime}`);
            const moviediv = document.createElement('div'); // luodaan uusi div-elementti, johon lisätään kaikki elokuvan tiedot
            const movieinfo = document.createElement('p'); // luodaan uusi p-elementti, johon lisätään elokuvan info
            movieinfo.innerHTML = title + '<br>' + theatre + '<br>' + startTime; // lisätään elokuvan tiedot p-elementtiin
            moviediv.innerHTML = `<img src="${image}" alt="Elokuva: ${title}">`;
            moviediv.appendChild(movieinfo); // lisätään p-elementti div-elementtiin
            const movies = document.getElementById('movies'); // haetaan elokuvien div-elementti
            movies.appendChild(moviediv); // lisätään luotu div-elementti elokuvien div-elementtiin
        });
    });
}