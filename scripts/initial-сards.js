// Массив стартовых карточек
const initialCards = [
  {
    name: 'Большая голубая дыра',
    link: './images/bigBlue.jpg',
    alt: 'Темное круглое пятно в океане, означающее, что там глубоко.'
  },
  {
    name: 'Антарктида',
    link: './images/antarctica.jpg',
    alt: 'Океан омывает ледяные горы.'
  },
  {
    name: 'Мадагаскар',
    link: './images/madagaskar.jpg',
    alt: 'Темнокожие женщины идут по проселочной дороге на фоне африканские деревья.'
  },
  {
    name: 'Амазонка',
    link: './images/amazonka.jpg',
    alt: 'Из самолета видно извилистое русло реки в джунглях.'
  },
  {
    name: 'Большой барьерный риф',
    link: './images/Great-Barrier-Reef.jpg',
    alt: 'Извилистая длинная полоса рифов в воде окенана.'
  },
  {
    name: 'Под водой',
    link: './images/underwater.jpg',
    alt: 'Коралл под водой.'
  }
]


initialCards.forEach(item => {         // Расстановка стартовых карточек.
  cardsList.append(createCard(item));
})
