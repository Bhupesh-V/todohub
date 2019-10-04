var repositories = [];
var username;
const baseUrl = "https://api.github.com/"

let addLoadSVG = () => {
  loadsvg = document.getElementById("load");
  setimg = document.createElement("img");
  setimg.setAttribute("src", "images/puff.svg");
  setimg.setAttribute("width", "40");
  loadsvg.appendChild(setimg);
};

let deleteLoadSVG = () => {
  let element = document.querySelector("#load");
  element.style.display = "none";
};

let getUsername = () => {
  username = document.getElementById("username").value;
  getRepositories(username);
};

let getRepositories = async username => {
  const response = await fetch(`${baseUrl}users/${username}/repos`);

  if (response.status === 404) {
    isLoading = false;
    usernameNotFoundError();
  }else{
	addLoadSVG();
  	let data = await response.json();
  	listOfRepos(data, username);
  }
};

let listOfRepos = repos => {
  for (let i = 0; i < repos.length; i++) {
    if (repos[i].fork == false) {
      name_of_repo = repos[i].full_name;
      repositories.push(
        name_of_repo.slice(username.length + 1, name_of_repo.length)
      );
    }
  }
  getIssues();
};

let getIssues = async () => {
  for (let i = 0; i < repositories.length; i++) {
    const response = await fetch(`${baseUrl}repos/${username}/${repositories[i]}/issues`);
	let issues = await response.json();
	if (issues.length === 0){
		issueNotFoundError(repositories[i]);
	}
	listOfIssues(issues);
  }
};

let usernameNotFoundError = () => {
  htmllist = document.getElementById("list");
  let errorheading = document.createElement("h3");
  let errortext = document.createTextNode(
    `Ah! Username ${username} Not Found, Please enter valid Username...`
  );
  errorheading.appendChild(errortext);
  htmllist.appendChild(errorheading);
};

let issueNotFoundError = (repo) => {
	htmllist = document.getElementById("list");
	let errorheading = document.createElement("h3");
	errorheading.setAttribute("class", "todo-no-issue");
	errorheading.setAttribute("id", "no-issue");
	let errortext = document.createTextNode(`Ah! Looks like you currently don't have any open issues in ${repo}.`);
	errorheading.appendChild(errortext);
	htmllist.appendChild(errorheading);
  };

let listOfIssues = issues => {
  deleteLoadSVG();
  if (issues.length !== 0) {
    for (let i = 0; i < issues.length; i++) {
      if (issues[i] != null) {
        htmllist = document.getElementById("list");
        let todo = document.createElement("div");
        todo.setAttribute("id", "todo");

        //attach title/link to todo
        let issuelink = document.createElement("a");
        issuelink.setAttribute("href", issues[i].html_url);
        let issueTitle = document.createTextNode(issues[i].title);
        issuelink.appendChild(issueTitle);
        todo.appendChild(issuelink);

        //attach date to todo
        let Tododate = document.createElement("div");
        Tododate.setAttribute("id", "date");
        let todo_date = document.createTextNode(
          issues[i].created_at.slice(0, 10)
        );
        Tododate.appendChild(todo_date);
        todo.appendChild(Tododate);

        //attach status to todo
        let status = document.createElement("div");
        status.setAttribute("id", "status");
        let x = document.createTextNode(
          issues[i].state.charAt(0).toUpperCase() + issues[i].state.slice(1)
        );
        status.appendChild(x);
        todo.appendChild(status);

        //attach the todo to list
        list.appendChild(todo);
      }
    }
  }
};
