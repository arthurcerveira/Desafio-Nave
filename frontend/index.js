const naversEndpoint = 'https://my-json-server.typicode.com/naveteam/fake-api/navers';

async function setNaversData() {
    const naversData = await fetch(naversEndpoint).then(response => response.json());
    const naversDiv = document.querySelector(".navers");

    naversData.map(naver => {
        const naverCard = document.createElement("div");

        const {name, image_url, job_role} = naver;

        const imageNaver = document.createElement("img");
        imageNaver.src = image_url

        naverCard.append(imageNaver);

        const nameNaver = document.createElement("p");
        nameNaver.innerHTML = name

        naverCard.append(nameNaver);

        const roleNaver = document.createElement("p");
        roleNaver.innerHTML = job_role

        naverCard.append(roleNaver);

        naversDiv.append(naverCard)
    })    
}

window.addEventListener("load", () => setNaversData());