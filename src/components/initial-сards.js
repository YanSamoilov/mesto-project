export {initialCards};

import bigBlue from '../images/bigBlue.jpg';
import antarctic from '../images/antarctica.jpg';
import madagaskar from '../images/madagaskar.jpg';
import amazonka from '../images/amazonka.jpg';
import greatReef from '../images/Great-Barrier-Reef.jpg';
import underWater from '../images/underwater.jpg';

// Массив стартовых карточек
const initialCards = [
  {
    name: 'Большая голубая дыра',
    link: bigBlue,
    alt: 'Темное круглое пятно в океане, означающее, что там глубоко.'
  },
  {
    name: 'Антарктида',
    link: antarctic,
    alt: 'Океан омывает ледяные горы.'
  },
  {
    name: 'Мадагаскар',
    link: madagaskar,
    alt: 'Темнокожие женщины идут по проселочной дороге на фоне африканские деревья.'
  },
  {
    name: 'Амазонка',
    link: amazonka,
    alt: 'Из самолета видно извилистое русло реки в джунглях.'
  },
  {
    name: 'Большой барьерный риф',
    link: greatReef,
    alt: 'Извилистая длинная полоса рифов в воде окенана.'
  },
  {
    name: 'Под водой',
    link: underWater,
    alt: 'Коралл под водой.'
  }
]
