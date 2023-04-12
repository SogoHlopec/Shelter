import dataPets from "../assets/data/pets.json";
import getRandomNum from "./getRandomNum";

const MAX_INDEX = dataPets.length;
const WINDOW_INNER_WIDTH = document.documentElement.clientWidth;

// const getCountInitialCard = (width) => {
//   if (width <= 725) return 1;
//   if (width <= 980) return 2;
//   else return 3;
// };

// const COUNT_INITIAL_CARDS = getCountInitialCard(WINDOW_INNER_WIDTH);
const COUNT_INITIAL_CARDS = 3;

const initNextArr = (nextArr, currArr, countCards, maxRandomNum) => {
  for (let i = 0; i < countCards; i++) {
    const indexCard = getRandomNum(maxRandomNum);
    if (!nextArr.includes(indexCard) && !currArr.includes(indexCard)) {
      nextArr.push(indexCard);
    } else {
      i--;
    }
  }
};

const copyClearArr = (arr1, arr2) => {
  arr1.forEach((element) => {
    arr2.push(element);
  });
  arr1.length = 0;
};

const initCards = (countCards, maxRandomNum) => {
  let nextArr = [];
  let currArr = [];
  let pastArr = [];

  initNextArr(nextArr, currArr, countCards, maxRandomNum);
  copyClearArr(nextArr, currArr);
  initNextArr(nextArr, currArr, countCards, maxRandomNum);
  copyClearArr(currArr, pastArr);
  copyClearArr(nextArr, currArr);
  initNextArr(nextArr, currArr, countCards, maxRandomNum);

  return { past: pastArr, curr: currArr, next: nextArr };
};

const arrCards = initCards(COUNT_INITIAL_CARDS, MAX_INDEX);

const renderCards = (arrIndexCards, dataPets, insertionPosition) => {
  const slide = document.createElement("div");
  slide.className = "slider__cards";

  for (let i = 0; i < arrIndexCards.length; i++) {
    const html = `
              <div class="slider__card">
                <img
                  src="${dataPets[arrIndexCards[i]].img}"
                  alt="Pets ${dataPets[arrIndexCards[i]].name}"
                  class="card__img"
                />
                <h3 class="card__title">${dataPets[arrIndexCards[i]].name}</h3>
                <button class="card__btn">Learn more</button>
              </div>
  `;
    slide.insertAdjacentHTML(insertionPosition, html);
  }
  return slide;
};

// !init starter cards start
const wrapperCards = document.querySelector(".wrapper-cards");
wrapperCards.innerHTML = "";
wrapperCards.append(renderCards(arrCards.past, dataPets, "beforeend"));
// !init starter cards end

const slider = document.querySelector(".slider");
const btnRight = slider.querySelector(".btn-right");
const btnLeft = slider.querySelector(".btn-left");
let isEvent = false;

const moveRight = () => {
  if (isEvent) return;
  isEvent = true;
  arrCards.past.length = 0;
  copyClearArr(arrCards.curr, arrCards.past);
  copyClearArr(arrCards.next, arrCards.curr);
  initNextArr(arrCards.next, arrCards.curr, COUNT_INITIAL_CARDS, MAX_INDEX);

  const currSlides = document.querySelectorAll(".slider__cards");
  currSlides[0].style.left = 0;
  const widthOffset = currSlides[0].offsetWidth;
  const newSlide = renderCards(arrCards.curr, dataPets, "beforeend");
  newSlide.style.left = widthOffset + "px";
  wrapperCards.append(newSlide);
  setTimeout(() => {
    currSlides[0].style.left = -(widthOffset + 10) + "px";
    newSlide.style.left = 0;
    setTimeout(() => {
      currSlides[0].remove();
      isEvent = false;
    }, 1000);
  }, 100);
};

const moveLeft = () => {
  if (isEvent) return;
  isEvent = true;
  arrCards.next.length = 0;
  copyClearArr(arrCards.curr, arrCards.next);
  copyClearArr(arrCards.past, arrCards.curr);
  initNextArr(arrCards.past, arrCards.curr, COUNT_INITIAL_CARDS, MAX_INDEX);

  const currSlides = document.querySelectorAll(".slider__cards");
  currSlides[0].style.left = 0;
  const widthOffset = currSlides[0].offsetWidth;
  const newSlide = renderCards(arrCards.curr, dataPets, "afterbegin");
  newSlide.style.left = -(widthOffset + 10) + "px";
  wrapperCards.prepend(newSlide);
  setTimeout(() => {
    currSlides[0].style.left = widthOffset + "px";
    newSlide.style.left = 0;
    setTimeout(() => {
      currSlides[0].remove();
      isEvent = false;
    }, 1000);
  }, 100);
};

btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);
