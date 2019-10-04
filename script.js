var repositories = [];
var username;


function addLoadSVG(){
	loadsvg = document.getElementById("load");
	setimg = document.createElement("img");
	setimg.setAttribute("src", "images/puff.svg");
	setimg.setAttribute("width", "40");
	loadsvg.appendChild(setimg);
}


function deleteLoadSVG(){
	var element = document.querySelector("#load");
    element.style.display = 'none';
}


function getUsername() {
	username = document.getElementById("username").value;
	checkIfUsernameExists(username);
}

function checkIfUsernameExists(username) {
	const fetchPromise = fetch('https://api.github.com/users/' + username);

	fetchPromise
		.then(response => {
			const ifExists = response.status == 404 ? false : true;
			if (ifExists) {
				addLoadSVG();
				getRepositories(username);
			} else {
				alert('Username doesn\'t exist! Please enter valid');
				document.getElementById('username').focus();
			}
		})
		.catch( err => {
			alert("Some error occured! Please try again.");
		});
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

/*function displayError(){
	htmllist = document.getElementById("list");
	var errorheading = document.createElement("h3");
	var errortext = document.createTextNode("Ah! Looks like you currently don't have any open issues.");
	errorheading.appendChild(errortext);
	htmllist.appendChild(errorheading);
	return false;
}*/

function listOfIssues(issues){
	deleteLoadSVG();
	if (issues.length !== 0){
		for (var i=0;i<issues.length;i++){
			if (issues[i] != null) {
				htmllist = document.getElementById("list");
				var todo = document.createElement("div");
				todo.setAttribute("id", "todo");

				//attach title/link to todo
				var issuelink = document.createElement("a");
				issuelink.setAttribute("href", issues[i].html_url);
				var issueTitle = document.createTextNode(issues[i].title);
				issuelink.appendChild(issueTitle);
				todo.appendChild(issuelink);
				
				//attach date to todo
				var Tododate = document.createElement("div");
				Tododate.setAttribute("id", "date");
				var todo_date = document.createTextNode(issues[i].created_at.slice(0, 10));
				Tododate.appendChild(todo_date);
				todo.appendChild(Tododate);

				//attach status to todo
				var status = document.createElement("div");
				status.setAttribute("id", "status");
				var x = document.createTextNode(issues[i].state.charAt(0).toUpperCase() + issues[i].state.slice(1));
				status.appendChild(x);
				todo.appendChild(status);

				//attach the todo to list
				list.appendChild(todo);
			}
		}
	}
}