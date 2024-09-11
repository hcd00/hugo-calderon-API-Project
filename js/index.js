const section = document.getElementById('first');
const text = document.getElementById('text');
const apiKey = '63f990452fcc30086d6de43fccaab951';
const githubUrl = 'https://api.github.com/users/hcd00/repos';
fetch(githubUrl)
  .then(response => {
    return response.json();
  })
  .then(response => {
    let repositories = response;
    console.log(repositories);
  })
  .catch(error => {
    console.error("There were an error in fetching your request.", error);
  })

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", `${apiKey}`);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

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
  text.innerHTML = data[0].team.name + '' + data[0].venue.name;

})

const getStandings = async () => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/standings?league=39&season=2020", requestOptions)
    const result = await response.json();
    console.log(result);
    console.log('result.response',result.response)
    return result.response[0];
  }
  catch (e) {
    console.log('Error.', e)
  }
}

getStandings().then(data => {
  console.log(data.league.standings[0]);
})