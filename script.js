var repositories = [];
var username;


function getUsername() {
	username = document.getElementById("username").value;
	getRepositories(username);
}


function getRepositories(username){
	const fetchPromise = fetch('https://api.github.com/users/' + username + '/repos');

	fetchPromise.then(response => {
		return response.json();
	}).then(repos => {
		listOfRepos(repos, username);
	});
}


function listOfRepos(repos){
	for (var i=0;i<repos.length;i++){
		if (repos[i].fork == false){
			name_of_repo = repos[i].full_name;
			repositories.push(name_of_repo.slice(username.length + 1, name_of_repo.length));
		}
	}
	getIssues();
}


function getIssues(){
	for(var i=0;i<repositories.length;i++){
		const fetchPromise = fetch('https://api.github.com/repos/' + username + '/' + repositories[i] + '/issues');
	  	fetchPromise.then(response => {
			return response.json();
		}).then(issues => {
			listOfIssues(issues);
		});
	}
}


function listOfIssues(issues){
	for (var i=0;i<issues.length;i++){

		if (issues[i] != null) {
			htmllist = document.getElementById("list");
			var para = document.createElement("p");

			//create link
			var issuelink = document.createElement("a");
			issuelink.setAttribute("href", issues[i].html_url);
			var issueTitle = document.createTextNode(issues[i].title);;
			issuelink.appendChild(issueTitle);

			//attach the link to the <p> tag
			para.appendChild(issuelink);
			
			//attach the <p> tag to div = "list"
			list.appendChild(para);
		}
	}
}