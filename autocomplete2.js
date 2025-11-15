const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchStates = async (searchText) => {
    const response = await fetch("states.json");
    const states = await response.json();
   
    let matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);
}

const outputHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches.map((match) => `
            <div class="state" data-name="${match.name}">
                <h3>${match.name}</h3>
                <p>${match.abbr}</p>
                <small>${match.capital}</small>
                <small>${match.lat}</small>
                <small>${match.long}</small>
            </div>
        `).join("");
        matchList.innerHTML = html;
        // Add click event to each .state
        document.querySelectorAll('.state').forEach(item => {
            item.addEventListener('click', function() {
                search.value = this.getAttribute('data-name');
                matchList.innerHTML = '';
            });
        });
    } else {
        matchList.innerHTML = '';
    }
}

search.addEventListener("input", () => searchStates(search.value));