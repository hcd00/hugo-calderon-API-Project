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

fetch("https://v3.football.api-sports.io/teams?id=33", requestOptions)
  .then(response => response.json())
  .then(result => {
    const team = result.response[0].team.name;
    const venue = result.response[0].venue.name;
    console.log("Team:", team);
    console.log("venue", venue);
  })
  .catch(error => console.log('error', error));