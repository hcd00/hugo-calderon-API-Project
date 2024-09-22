const section = document.getElementById('first');
const standingsSection = document.getElementById('standings');
const text = document.getElementById('text');
const standingsText = document.getElementById('standingsText');
const apiKey = '63f990452fcc30086d6de43fccaab951';

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
    return result.response;
  } catch (e) {
    console.log('Error.', e);
  }
};

getTeam().then(data => {
  console.log(data);
  //data from api reponse
  const teamName = data[0].team.name;
  const teamVenue = data[0].venue.name
  const teamAddress = data[0].venue.address;
  const teamVenueURL = data[0].venue.image;
  text.innerHTML = teamName + ' ' + teamVenue;
  const logoURL = data[0].team.logo;
  //Images
  const img = document.createElement('img');
  img.src = logoURL;
  img.alt = teamName;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  section.appendChild(img);
  const venueImg = document.createElement('img');
  venueImg.src = teamVenueURL;
  venueImg.alt = teamVenue;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  section.appendChild(venueImg);
})

//Standings endpoint
const getStandings = async () => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/standings?league=39&season=2020", requestOptions)
    const result = await response.json();
    console.log(result);
    console.log('result.response', result.response)
    return result.response[0];
  }
  catch (e) {
    console.log('Error.', e)
  }
}

getStandings().then(data => {
  const standings = data.league.standings[0];
  console.log(standings);
  const table = document.createElement('table');
  table.style.width = '100%';
  table.setAttribute('border', '1');
  //table headers
  const headerRow = document.createElement('tr');
  const headers = ['Rank', 'Team', 'Points', "GD"];
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(header);
  });
  //Header Row to Table
  // table.appendChild(headerRow);
  // //set for loop for standings
  // standings.forEach(teamStanding => {
  //   const row = document.createElement('tr');
  //   //Cells for each column
  //   //Rank
  //   const rankCell = document.createElement('td');
  //   rankCell.appendChild(document.createTextNode(teamStanding.rank));
  //   row.appendChild(rankCell);
  //   //Team
  //   const teamCell = document.createElement('td');
  //   teamCell.appendChild(document.createTextNode(teamStanding.team.name));
  //   row.appendChild(teamCell);

  //   //Points
  //   const pointsCell = document.createElement('td');
  //   console.log(standings.points);
  //   pointsCell.appendChild(document.createTextNode(standings.points));
  //   row.appendChild(pointsCell);

  //   //GD
  //   const goalDiffCell = document.createElement('td');
  //   console.log(standings.goalsDiff);
  //   goalDiffCell.appendChild(document.createTextNode(standings.goalsDiff));
  //   row.appendChild(goalDiffCell);

  //   table.appendChild(row);

  // });
  standingsSection.appendChild(table);
  standingsText.innerHTML = standings[0].rank + ' ' + standings[0].team.name + '<br>' +
    standings[1].rank + ' ' + standings[1].team.name + ' ' + standings[1].points + standings[1].goalsDiff;
})