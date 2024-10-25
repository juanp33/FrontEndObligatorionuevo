
import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

// Importa los emojis de manera adecuada si los tienes como archivos locales o usa emojis de texto.
const data = [
  {
    option: '🧉',
    style: { backgroundColor: '#3DA5D9', textColor: '#FFF' },
  },
  {
    option: '🍿',
    style: { backgroundColor: '#A663CC', textColor: '#FFF' },
  },
  {
    option: '🧪',
    style: { backgroundColor: '#4CAF50', textColor: '#FFF' },
  },
  {
    option: '🌍',
    style: { backgroundColor: '#0074D9', textColor: '#FFF' },
  },
  {
    option: '📚',
    style: { backgroundColor: '#FFCC00', textColor: '#000' },
  },
  {
    option: '⚽',
    style: { backgroundColor: '#FF4136', textColor: '#FFF' },
  }
];

const Ruleta = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }, 3000); 

    
    return () => clearTimeout(timer);
  }, []);
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
        }}
      />
    </div>
  );
};

export default Ruleta;