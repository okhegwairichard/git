const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("searchButton");
const profile = document.getElementById("profile");
const message = document.getElementById("message");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const githubLink = document.getElementById("githubLink");
searchButton.addEventListener("click", searchUser);
async function searchUser() {
    const username = usernameInput.value.trim();
    if (username === "") {
        message.textContent = "Please enter a GitHub username.";
        profile.classList.add("hidden");
        return;
    }
    message.textContent = "Searching...";
    profile.classList.add("hidden");
    try {
        const response = await fetch(`/api/user/${username}`);
        const data = await response.json();
        if (!response.ok) {
            message.textContent = data.error;
            return;
        }
        message.textContent = "";
        avatar.src = data.avatar_url;
        name.textContent = data.name || "No name available";
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || "No bio available";
        followers.textContent = data.followers;
        following.textContent = data.following;
        repos.textContent = data.public_repos;
        githubLink.href = data.html_url;
        profile.classList.remove("hidden");
    } catch (error) {
        console.log(error);
        message.textContent = "Unable to connect to the server.";
    }
}