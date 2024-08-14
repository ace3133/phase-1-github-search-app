const form = document.getElementById("github-form");
const container = document.getElementById("github-container")
const userList = document.getElementById("user-list");
const repoList = document.getElementById("repos-list");
const text = document.getElementById("search");
const button = document.getElementById("button");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("https://api.github.com/search/users?q=octocat")
        .then(res => res.json())
        .then(users => {
            Object.values(users.items).forEach(user => {
                if (text.value.toLowerCase() === user.login.toLowerCase()) {
                    createUserList(user);
                    toggleSearch(user)
                    text.disabled = true
                }
                else if (text.value === '') {
                    location.reload()
                }

            })
        })

})
function createUserList(user) {
    let userli = document.createElement("li");
    userList.appendChild(userli);
    userli.innerHTML = `<p>${user.login}</p><a href="${user.html_url}" target="_blank">${user.html_url}</a><img src="${user.avatar_url}" style="width: 80px; height: 80px; margin-left: 10px; vertical-align: middle;" />
`;
    userli.classList.add("li")
    container.appendChild(userList)
}
function toggleSearch(user) {
    button.addEventListener("click", () => {
        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(res => res.json())
            .then(repos => {
                Object.values(repos).forEach((repo) => {
                    let repoLi = document.createElement("li");
                    repoList.appendChild(repoLi)
                    repoLi.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`
                    button.disabled = true
                    text.value = ''
                })

            })
    })
}

