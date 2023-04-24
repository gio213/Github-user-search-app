const input = document.querySelector("input"),
  searchBtn = document.querySelector(".inputDiv button"),
  profileImg = document.querySelector(".profileImg"),
  userName = document.querySelector(".uInfos  h1"),
  errorP = document.querySelector(".inputDiv  p"),
  userId = document.querySelector(".uInfos  p"),
  userJoin = document.querySelector(".uInfos  h2"),
  bio = document.querySelector(".middleTxt p"),
  repos = document.querySelector(".reposFollowersFollowing p"),
  followers = document.querySelector(".followers p"),
  following = document.querySelector(".following p"),
  locationPath = document.getElementById("locationPath"),
  locationAddress = document.querySelector(".locationAddress h1"),
  githubBlog = document.querySelector(".githubBlog h1"),
  githubBlogPath = document.getElementById("githubBlogPath"),
  twitter = document.querySelector(".twitter h3"),
  tiwitterPath = document.getElementById("tiwitterPath"),
  company = document.querySelector(".company h1"),
  companyPath = document.getElementById("companyPath");
let api = `https://api.github.com/users/`;

let searched = input.addEventListener("input", function (e) {
  api = `https://api.github.com/users/${e.target.value}`;
  console.log(api);
  return api;
});
async function getUser() {
  const response = await fetch(api);
  data = await response.json();
  data = data;
  console.log(data);
  return data;
}

searchBtn.addEventListener("click", function () {
  getUser();
  renderData();
});

async function renderData() {
  const userData = await getUser();
  if (userData.message === "Not Found") {
    errorP.innerHTML = `No results`;
    return;
  }

  profileImg.innerHTML = `<img src="${userData.avatar_url}" alt="profile image">`;
  console.log(userData.avatar_url);
  userName.innerHTML = `${userData.name}`;
  userId.innerHTML = `${userData.login}`;
  userJoin.innerHTML = `Joined ${userData.created_at.substring(0, 10)}`;

  if (userData.bio === null) {
    bio.innerHTML = `Secret agent who doesn't share bio`;
  } else {
    bio.innerHTML = `${userData.bio}`;
  }
  repos.innerHTML = `${userData.public_repos}`;
  followers.innerHTML = `${userData.followers}`;
  following.innerHTML = `${userData.following}`;
  if (userData.location === null) {
    locationPath.setAttribute("fill", "#4b6a9b");
    locationAddress.style.color = "#4b6a9b";
    locationAddress.textContent = `Not available`;
  } else {
    locationAddress.innerHTML = `${userData.location}`;
  }
  if (userData.blog === "") {
    githubBlogPath.setAttribute("fill", "#4b6a9b");
    githubBlog.style.cursor = "not-allowed";
    githubBlog.style.color = "#4b6a9b";
    githubBlog.textContent = `Not available`;
  } else {
    githubBlog.innerHTML = `${userData.blog}`;

    githubBlog.style.cursor = "pointer";
  }
  if (userData.twitter_username === null) {
    tiwitterPath.setAttribute("fill", "#4b6a9b");
    twitter.style.color = "#4b6a9b";
    twitter.innerHTML = `Not available`;
  } else {
    twitter.innerHTML = `${userData.twitter_username}`;

    tiwitterPath.setAttribute("fill", "#ffffff");
    twitter.style.color = "white";
  }
  if (userData.company === null) {
    companyPath.setAttribute("fill", "#4b6a9b");
    company.style.cursor = "not-allowed";
    company.style.color = "#4b6a9b";
    company.innerHTML = `Not available`;
  } else {
    company.innerHTML = ` ${userData.company}`;
    companyPath.setAttribute("fill", "#ffffff");
  }
}
