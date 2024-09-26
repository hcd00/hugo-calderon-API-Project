const teamContainer = document.getElementById('teamContainer');

//Headers for API
const apiKey = '88d525fbd87eaa35a22b7f4330a7f769';
var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", `${apiKey}`);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

//Team endpoint
const getTeam = async () => {
    try {
        const response = await fetch("https://v3.football.api-sports.io/teams?id=33", requestOptions)
        const result = await response.json();
        return result.response[0];
    } catch (e) {
        console.log('Error.', e);
    }
};

//Load Data into DOM
const createTeamCards = () => {
    getTeam().then(data => {
        console.log(data);
        //Team
        const teamName = data.team.name;
        const yrFounded = data.team.founded;
        //Venue
        const venueName = data.venue.name;
        const venueAddress = data.venue.address;
        const venueCapacity = data.venue.capacity;
        //Imgs
        const teamLogoURL = data.team.logo;
        const venueURL = data.venue.image;
        console.log('Team: ', teamName);
        console.log('Yr Founded: ', yrFounded);
        console.log('Venue: ', venueName);
        console.log('Addy: ', venueAddress);
        console.log('Capacity: ', venueCapacity);
        const teamCard = document.createElement('div');
        teamCard.classList.add('team-card');
        const teamLogo = document.createElement('img');
        teamLogo.src = teamLogoURL;
        teamLogo.alt = "Logo" + teamName;
        teamLogo.classList.add('team-logo');

        const venueImg = document.createElement('img');
        venueImg.src = venueURL;
        venueImg.alt = "Venue" + venueName;
        venueImg.classList.add('team-logo');

        const nameHeading = document.createElement('h3');
        nameHeading.innerHTML = teamName;

        const year = document.createElement('p');
        year.innerHTML = 'Founded: ' + yrFounded;

        const venue = document.createElement('p');
        venue.innerHTML = `Venue: ${venueName}. Address: ${venueAddress}. Capacity: ${venueCapacity}`;

        teamCard.appendChild(teamLogo);
        teamCard.appendChild(nameHeading);
        teamCard.appendChild(year);
        teamCard.appendChild(venue);
        teamCard.appendChild(venueImg);
        teamContainer.appendChild(teamCard);
    })
    .catch(error => console.log('Error:', error));
}

createTeamCards();