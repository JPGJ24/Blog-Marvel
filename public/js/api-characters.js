  const api_news = document.getElementById('data-characters');
  const publicKey = "55e6bdf4c02745a407791c0bb407b66b";
  const privateKey = "dcf4094d68e6dd29f4787369e95cca40a76b87b0";
  const timeStamp = "1690811482339";
  const hash = "123d5ddf3fac755aa6eee3724e3d626c"
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=20&apikey=${publicKey}&ts=${timeStamp}&hash=${hash}`;



  let characters = [];
  const itemsPerPage = 4;
  let currentPage = 1;
  
  const fetchCharactersData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch news data");
      }

      const data = await response.json();
      const charactersData = data?.data?.results;
      console.log(charactersData)
      characters=(charactersData)
      showPage(currentPage);
      createPagination();
    } catch (error) {
      console.error(error);
    }
  };
  
  const showPage = (page) => {
    api_news.innerHTML = "";
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newsSlice = characters.slice(startIndex, endIndex);
    console.log(newsSlice)
    newsSlice.forEach((index) => {
      const seeData = document.createElement('data-characters');
      seeData.innerHTML = ` 
      <div class="row-fluid post">
      <div class="span7">
          <a href=${index.url} target="_blank">
          <h2>${index.name}</h2></a>
          <ul class="meta">
              <li>Autor: </li>
              <li class="author">Marvel</li>
              <li class="comments-numb">  
              <li>Fecha:</li>                                      
                  ${index.modified}
                  <i class="icon-camera-retro"></i>
              </li>
          </ul>
          <p>${index.description}</p>
          <a href=${index.urls[1].url} 
          target="_blank"
          class="button">Ver más</a>
      </div>
      <div class="span5 image_post">
      <a href=${index.thumbnail.path + "." +index.thumbnail.extension} target="_blank">
      <img src=${index.thumbnail.path + "." +index.thumbnail.extension} alt=${index.name}>
      </a>
          <ul>
              <li>${index.name}</li>
              <li><a href=${index.thumbnail.path + "." +index.thumbnail.extension} target="_blank">
              <i class="icon-picture"></i></a></li>
          </ul>
      </div>
  </div>`;
      api_news.appendChild(seeData);
    });
  };
  
  const createPagination = () => {
    const totalPages = Math.ceil(characters.length / itemsPerPage);
  
    const pagination = document.createElement("ul");
    pagination.classList.add("pagination");
  
    const prevButton = createButton("«", () => {
      currentPage = Math.max(currentPage - 1, 1);
      showPage(currentPage);
      updatePaginationButtons();
    });
    pagination.appendChild(prevButton);
  
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createButton(i, () => {
        currentPage = i;
        showPage(currentPage);
        updatePaginationButtons();
      });
      pagination.appendChild(pageButton);
    }
  
    const nextButton = createButton("»", () => {
      currentPage = Math.min(currentPage + 1, totalPages);
      showPage(currentPage);
      updatePaginationButtons();
    });
    pagination.appendChild(nextButton);
  
    api_news.parentNode.appendChild(pagination);
  };
  
  const createButton = (label, onClick) => {
    const button = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = label;
    button.appendChild(link);
    button.addEventListener("click", onClick);
    return button;
  };
  
  const updatePaginationButtons = () => {
    const buttons = document.querySelectorAll(".pagination li");
    buttons.forEach((button, index) => {
      button.classList.toggle("active", index === currentPage);
    });
  };
  
  fetchCharactersData();
  