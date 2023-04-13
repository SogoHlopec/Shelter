import dataPets from "../assets/data/pets.json";
import getRandomNum from "./getRandomNum";

const btnRight = document.querySelector(".btn-right");
const btnRightEnd = document.querySelector(".btn-right-end");
const btnLeft = document.querySelector(".btn-left");
const btnLeftEnd = document.querySelector(".btn-left-end");
const numberPage = document.querySelector(".btn-number-page");
let currentPage;
let displayCards;

function mixArr(arr) {
  return arr
    .map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1]);
}

const initArrPets = () => {
  let result = [];
  for (let i = 0; i < dataPets.length; i++) {
    const value = getRandomNum(dataPets.length);
    if (!result.includes(value)) {
      result.push(value);
    } else {
      i--;
    }
  }
  result = [result.slice(0, 3), result.slice(3, 6), result.slice(6)];
  let finalArr = [];
  for (let i = 0; i < 6; i++) {
    finalArr.push(
      result.map((item) => {
        return mixArr(item);
      })
    );
  }
  result = finalArr.flat(10);
  return result;
};

const renderCards = (arrIndexCards, dataPets, insertionPosition) => {
  const sliderCards = document.querySelector(".slider__cards");
  sliderCards.innerHTML = "";

  for (let i = 0; i < arrIndexCards.length; i++) {
    const html = `
              <div class="slider__card init-page">
                <img
                  src="${dataPets[arrIndexCards[i]].img}"
                  alt="Pets ${dataPets[arrIndexCards[i]].name}"
                  class="card__img"
                />
                <h3 class="card__title">${dataPets[arrIndexCards[i]].name}</h3>
                <button class="card__btn">Learn more</button>
              </div>
  `;
    sliderCards.insertAdjacentHTML(insertionPosition, html);
  }
};

const arrIndexes = initArrPets();

const checkWindowWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth >= 951) {
    currentPage = 1;
    displayCards = 8;
  } else if (windowInnerWidth >= 640) {
    currentPage = 1;
    displayCards = 6;
  } else if (windowInnerWidth < 640) {
    currentPage = 1;
    displayCards = 3;
  }
  renderCards(
    arrIndexes.slice(currentPage - 1, displayCards),
    dataPets,
    "beforeend"
  );
};
checkWindowWidth();

window.addEventListener("resize", checkWindowWidth);

btnRight.addEventListener("click", () => {
  currentPage++;
  numberPage.textContent = currentPage;
  btnLeft.classList.remove("slider__btn_inactive");
  btnLeftEnd.classList.remove("slider__btn_inactive");

  if (currentPage * displayCards <= arrIndexes.length) {
    const needCards = arrIndexes.slice(
      (currentPage - 1) * displayCards,
      currentPage * displayCards
    );
    renderCards(needCards, dataPets, "beforeend");
  }
  if (currentPage * displayCards === arrIndexes.length) {
    btnRight.classList.add("slider__btn_inactive");
    btnRightEnd.classList.add("slider__btn_inactive");
  }
});

btnRightEnd.addEventListener("click", () => {
  currentPage = arrIndexes.length / displayCards;
  numberPage.textContent = currentPage;
  const needCards = arrIndexes.slice(
    (currentPage - 1) * displayCards,
    currentPage * displayCards
  );
  renderCards(needCards, dataPets, "beforeend");
  btnRight.classList.add("slider__btn_inactive");
  btnRightEnd.classList.add("slider__btn_inactive");
  btnLeft.classList.remove("slider__btn_inactive");
  btnLeftEnd.classList.remove("slider__btn_inactive");
});

btnLeft.addEventListener("click", () => {
  currentPage--;
  numberPage.textContent = currentPage;
  if (currentPage * displayCards < arrIndexes.length) {
    btnRight.classList.remove("slider__btn_inactive");
    btnRightEnd.classList.remove("slider__btn_inactive");
  }
  if (currentPage * displayCards <= arrIndexes.length) {
    const needCards = arrIndexes.slice(
      (currentPage - 1) * displayCards,
      currentPage * displayCards
    );
    renderCards(needCards, dataPets, "beforeend");
  }
  if (currentPage * displayCards === displayCards) {
    btnLeft.classList.add("slider__btn_inactive");
    btnLeftEnd.classList.add("slider__btn_inactive");
  }
});

btnLeftEnd.addEventListener("click", () => {
  currentPage = 1;
  numberPage.textContent = currentPage;
  const needCards = arrIndexes.slice(
    (currentPage - 1) * displayCards,
    currentPage * displayCards
  );
  renderCards(needCards, dataPets, "beforeend");
  btnLeft.classList.add("slider__btn_inactive");
  btnLeftEnd.classList.add("slider__btn_inactive");
  btnRight.classList.remove("slider__btn_inactive");
  btnRightEnd.classList.remove("slider__btn_inactive");
});
