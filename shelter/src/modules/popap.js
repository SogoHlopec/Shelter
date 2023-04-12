import dataPets from "../assets/data/pets.json";

const section = document.getElementById("our-friends");

const getNamePet = (event) => {
  let namePet;
  if (event.target.classList.contains("slider__card")) {
    namePet = event.target.querySelector("h3").innerHTML;
  } else if (event.target.parentNode.classList.contains("slider__card")) {
    namePet = event.target.parentNode.querySelector("h3").innerHTML;
  }
  return namePet;
};

const getDataPet = (namePet) => {
  let pet;
  for (let item of dataPets) {
    if (namePet === item.name) {
      return (pet = item);
    }
  }
};

const renderPopap = (pet) => {
  const html = `
         <div class="wrapper-popap">
          <div class="popap">
            <div class="popap__close-icon"></div>
            <img src="${pet.img}" alt="${pet.name}" class="popap__img" />
            <div class="popap__content">
              <h3 class="popap__title">${pet.name}</h3>
              <h4 class="popap__subtitle">${pet.type} - ${pet.breed}</h4>
              <p class="popap__text">${pet.description}</p>
              <ul class="popap__stats">
                <li class="stats__item"><strong>Age: </strong>${pet.age}</li>
                <li class="stats__item">
                  <strong>Inoculations: </strong>${pet.inoculations}
                </li>
                <li class="stats__item">
                  <strong>Diseases: </strong>${pet.diseases}
                </li>
                <li class="stats__item">
                  <strong>Parasites: </strong>${pet.parasites}
                </li>
              </ul>
            </div>
          </div>
        </div>
`;
  section.insertAdjacentHTML("beforeend", html);
};

section.addEventListener("click", (event) => {
  const namePet = getNamePet(event);
  if (namePet) {
    const pet = getDataPet(namePet);
    renderPopap(pet);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      section.querySelector(".wrapper-popap").classList.toggle("popap_active");
    }, 100);

    section
      .querySelector(".wrapper-popap")
      .addEventListener("click", (event) => {
        if (
          event.target.classList.contains("popap__close-icon") ||
          event.target.classList.contains("wrapper-popap")
        ) {
          section
            .querySelector(".wrapper-popap")
            .classList.toggle("popap_active");
          setTimeout(() => {
            section.removeChild(section.querySelector(".wrapper-popap"));
          }, 400);
          document.body.style.overflow = "";
        }
      });
  }
});
