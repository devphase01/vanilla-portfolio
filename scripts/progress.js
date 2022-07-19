const cardContainer = document.querySelector(".content-cards-section");
const searchGame = document.querySelector(".content-header-search input");
const addGameBtn = document.querySelector(".content-header-button");
const navLink = document.querySelectorAll(".links-section-link");
const addGameModalWindow = document.querySelector(".add-game-modal-wrapper");
const closeModalWindow = document.querySelector(".modal-window-close");

let skills;

function renderKnowledges(skills) {
  if (skills) {
    skills.forEach(skill => {
      const template = `
            <div class="content-cards-section-card">
                <div class="card-image">
                    <img src="${skill.icon}" style="width: 40px; height: 40px" />
                </div>
                <div class="card-content">
                    <div class="card-progress-section">
                        <span class="card-progress-title">
                            ${skill.technology}
                        </span>
        
                        <span class="card-progress-subtitle">
                            Knowlages
                        </span>
        
                        <div class="card-progress-bar">
                            <div 
                              class="card-progress-bar-progress"
                              style="width: ${skill.progress < 100 ? skill.progress : 100}%"
                             ></div>
                        </div>
                    </div>
        
                    <div class="card-percentage">
                        <span class="card-percentage-value">
                            ${skill.progress}%
                        </span>
                    </div>
                </div>
            </div>
        `
      cardContainer.innerHTML += template;
    })
  }
}

function createModal() {
  addGameModalWindow.classList.remove("hide");

  const technologyInput = document.getElementById("gameName");
  const iconInput = document.getElementById("version");
  const progressInput = document.getElementById("progress");

  const handleClick = () => {
    const addGame = async () => {
      await fetch("http://localhost:5000/stack", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          technology: technologyInput.value,
          icon: iconInput.value,
          progress: parseInt(progressInput.value)
        })
      })
    } 

    addGame();
  }

  const submitForm = document.querySelector(".modal-submit");

  submitForm.addEventListener("click", handleClick);

}

searchGame.addEventListener("keyup", (e) => {
  cardContainer.innerHTML = "";

  const value = e.target.value.toLocaleLowerCase();

  let filteredArray = skills.filter(skill => skill.technology.toLocaleLowerCase().includes(value));
  renderKnowledges(filteredArray);
})

addGameBtn.onclick = () => {
  createModal();
}

closeModalWindow.onclick = () => addGameModalWindow.classList.add("hide");

navLink.forEach(link => { // Iteration by all menu-link
  link.addEventListener("click", () => {
    const profile = document.querySelector(".profile"); // Parent for content
    const contentNumber = link.dataset.forContent; // Get data number to find content-box
    const activeContentBox = document.querySelector(`.content-box[data-content-box="${contentNumber}"]`); // set menu ~ content-box

    navLink.forEach(linkToRemove => linkToRemove.classList.remove("active-menu"));
    profile.querySelectorAll(".content-box").forEach(contentBox => contentBox.classList.remove("active-box"));

    link.classList.add("active-menu");
    activeContentBox.classList.add("active-box");
  })
})



















window.onload = () => {
  async function getData() {
    const response = await fetch("http://localhost:5000/stack");
    const json = await response.json();
    skills = json;
    renderKnowledges(skills);
  }

  getData();
};

/* 
  const addGame = async () => {
    await fetch("http://localhost:5000/games", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({gameName, version, progress})
    })
  } 
*/