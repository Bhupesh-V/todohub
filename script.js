var repositories = [];
var username;
let todolist = [];


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
/*function listOfRepos(repos){
	const names = repos.map(repository => `<li>${repository.full_name}</li>`).join("\n");
	return `<ul>${names}</ul>`
}*/
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
	//console.log(repositories);
	displayList();
}


function listOfIssues(issues){
	for (var i=0;i<issues.length;i++){
		if (issues[i] != null){
			var tododict = {};
			tododict['title'] = issues[i].title;
			tododict['link'] = issues[i].html_url;
			//console.log(tododict);
			todolist.push(tododict);
		}
	}
	//console.log(todolist)
}

function displayList(){
	const todos = document.getElementById("todos");
	todos.innerHTML = "<p>Loading List ...</p>";
	console.log(todolist);
	todolist.forEach(value => {
	  console.log(value)
	})
/*	for (var i=0;i<todoItems.length;i++){
		todo = "<a href='" + todoItems[i].link + "'>" + todoItems[i].title + "</a>" + "\n";
		console.log(todo);
		todos.innerHTML += todo;
	}*/
}