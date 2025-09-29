function fetchGitHubUser() {
  const username = document.getElementById("username").value;
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(data => {
      profileDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" />
        <div class="profile-info">
          <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p><strong>Username:</strong> ${data.login}</p>
          <p><strong>Bio:</strong> ${data.bio || 'No bio'}</p>
          <p><strong>Followers:</strong> ${data.followers}</p>
          <p><strong>Following:</strong> ${data.following}</p>
          <p><strong>Public Repos:</strong> ${data.public_repos}</p>
          <p><strong>Profile 
              <a href="https://github.com/${data.login}" target="_blank"></strong></a>
            </p>
        </div> `;
    })
    .catch(error => {
      profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
