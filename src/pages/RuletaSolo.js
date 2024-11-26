import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { label: 'Arte', option: '🎨', style: { backgroundColor: '#3DA5D9', textColor: '#FFF' } },
  { label: 'Entretenimiento', option: '🍿', style: { backgroundColor: '#A663CC', textColor: '#FFF' } },
  { label: 'Ciencia', option: '🧪', style: { backgroundColor: '#4CAF50', textColor: '#FFF' } },
  { label: 'Geografía, paises, capitales, etc', option: '🌍', style: { backgroundColor: '#0074D9', textColor: '#FFF' } },
  { label: 'Historia mundial', option: '📚', style: { backgroundColor: '#FFCC00', textColor: '#000' } },
  { label: 'Deportes', option: '⚽', style: { backgroundColor: '#FF4136', textColor: '#FFF' } }
];

const RuletaSolo = ({ onSelectCategory, forcedCategory, spinWheel }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    if (spinWheel) {
      spinWheel((categoria) => {
        let newPrizeNumber;
        console.log(forcedCategory)
        if (categoria) {
          newPrizeNumber = data.findIndex((item) => item.label === categoria);
          if (newPrizeNumber === -1) {
            console.log('La categoría forzada no se encuentra en la lista de categorías.');
            newPrizeNumber = Math.floor(Math.random() * data.length);
          }
        } else {
          newPrizeNumber = Math.floor(Math.random() * data.length);
        }

        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      });
    }
  }, [ spinWheel]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={data.map((item) => item.style.backgroundColor)}
        textColors={data.map((item) => item.style.textColor)}
        outerBorderWidth={8}
        innerRadius={5}
        radiusLineWidth={2}
        fontSize={48}
        onStopSpinning={() => {
          setMustSpin(false);
          if (onSelectCategory) {
            onSelectCategory(data[prizeNumber].label);
          }
        }}
      />
    </div>
  );
};

export default RuletaSolo;