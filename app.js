const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const search = document.querySelector("#search");

const getuser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    const card = `
    <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="user profile picture" class="avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li><strong>${data.followers} Followers</strong></li>
                    <li><strong>${data.following} Following</strong></li>
                    <li><strong>${data.public_repos} Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = card;
    getrepos(username);
}


const getrepos = async (username) => {
    const reposinsert = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            reposinsert.appendChild(elem);
            elem.target = "_blank";
        }
    );
}

const formsubmit = () => {
    if (search.value != "") {
        getuser(search.value);
        search.value = "";
    }
    return false;
}


search.addEventListener(
    "focusout",
    function () {
        formsubmit();
    }
);