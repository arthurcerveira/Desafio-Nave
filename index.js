const naversEndpoint = 'https://my-json-server.typicode.com/naveteam/fake-api/navers';

async function addNaverCards() {
    const naversData = await fetch(naversEndpoint).then(response => response.json());
    const naversDiv = document.querySelector(".navers");

    naversData.map(naver => {
        const naverCard = document.createElement("div");
        naverCard.classList.add("naver-card")

        const {name, image_url, job_role} = naver;

        const imageNaver = document.createElement("img");
        imageNaver.src = image_url
        imageNaver.classList.add("naver-picture")

        naverCard.append(imageNaver);

        const nameNaver = document.createElement("p");
        nameNaver.innerHTML = name
        nameNaver.classList.add("naver-name")
        
        naverCard.append(nameNaver);

        const roleNaver = document.createElement("p");
        roleNaver.innerHTML = job_role;
        roleNaver.classList.add("naver-role");

        naverCard.append(roleNaver);

        naversDiv.append(naverCard)
    })    
}

window.addEventListener("load", () => addNaverCards());