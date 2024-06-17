import { useState } from "react";

const SpeedButtons = ({ setIntervalMs }) => {
    const [activeButton, setActiveButton] = useState(1000);

    const handleClick = (interval) => {
        setActiveButton(interval);
        setIntervalMs(interval);
      };
    

    return (
      <div className="speed-buttons">
        <button 
        className={activeButton === 1000 ? 'active' : ''}
        onClick={() => handleClick(1000)}>1x</button>
        <button 
        className={activeButton === 2000 ? 'active' : ''}
        onClick={() => handleClick(2000)}>0.5x</button>
        <button 
        className={activeButton === 3000 ? 'active' : ''}
        onClick={() => handleClick(3000)}>0.25x</button>
      </div>
    );
  };
  
// need to fix button settings as changing the interval resets it to the maximum interval and thus gives infinite time if you keep switching

  export default SpeedButtons;