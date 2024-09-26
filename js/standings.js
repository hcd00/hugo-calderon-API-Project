const apiKey = '88d525fbd87eaa35a22b7f4330a7f769';
const standingsContainer = document.getElementById('standingsContainer');
//Accessing API
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

//Standings endpoint
const getStandings = async () => {
    try {
        const response = await fetch("https://v3.football.api-sports.io/standings?league=39&season=2020", requestOptions)
        const result = await response.json();
        return result.response[0];
    }
    catch (e) {
        console.log('Error.', e)
    }
}

//Display Table
getStandings().then(data => {
    //Data to be displayed
    const standings = data.league.standings[0];
    //Create table
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

    //Table Row
    table.appendChild(headerRow);
    for (let i = 0; i < standings.length; i++) {
        const row = document.createElement('tr');
        //Create cells for rows
        const rankCell = document.createElement('td');
        rankCell.appendChild(document.createTextNode(standings[i].rank));
        row.appendChild(rankCell);

        const teamCell = document.createElement('td');
        teamCell.appendChild(document.createTextNode(standings[i].team.name));
        row.appendChild(teamCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.appendChild(document.createTextNode(standings[i].points));
        row.appendChild(pointsCell);

        const goalsDiffCell = document.createElement('td');
        goalsDiffCell.appendChild(document.createTextNode(standings[i].goalsDiff));
        console.log('GD',standings[i].goalsDiff);
        row.appendChild(goalsDiffCell);

        table.appendChild(row);
    }
    //Add table to container
    standingsContainer.appendChild(table);
});