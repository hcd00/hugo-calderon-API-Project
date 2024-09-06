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
