document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    const toggleSearchBtn = document.getElementById('toggle-search');
    let isSearchingUsers = true; // Flag to track search type
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        if (isSearchingUsers) {
          searchUsers(searchTerm);
        } else {
          searchRepos(searchTerm);
        }
      }
    });
  
    toggleSearchBtn.addEventListener('click', function () {
      isSearchingUsers = !isSearchingUsers;
      if (isSearchingUsers) {
        toggleSearchBtn.textContent = 'Toggle Search Type: Users';
      } else {
        toggleSearchBtn.textContent = 'Toggle Search Type: Repositories';
      }
    });
  
    function searchUsers(searchTerm) {
      const url = `https://api.github.com/search/users?q=${searchTerm}`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  
    function searchRepos(searchTerm) {
      const url = `https://api.github.com/search/repositories?q=${searchTerm}`;
      fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data.items);
        })
        .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
        `;
        reposList.appendChild(listItem);
      });
    }
  });
  