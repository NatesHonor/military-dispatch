import React, { useState, useRef, useEffect } from 'react';

const NewBuildingSection = ({ mapRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0 });
  const pinRef = useRef(null);
  const isDragging = useRef(false);

  const handleButtonClick = () => {
    setIsMenuOpen(true);
    setShowPin(true);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !mapRef.current) return;

    const mapRect = mapRef.current.getBoundingClientRect();
    const newX = e.clientX - mapRect.left - pinRef.current.offsetWidth / 2;
    const newY = e.clientY - mapRect.top - pinRef.current.offsetHeight / 2;

    if (
      newX >= 0 &&
      newY >= 0 &&
      newX <= mapRect.width - pinRef.current.offsetWidth &&
      newY <= mapRect.height - pinRef.current.offsetHeight
    ) {
      setPinPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (showPin && mapRef.current) {
      const mapRect = mapRef.current.getBoundingClientRect();
      setPinPosition({
        x: mapRect.width / 2 - pinRef.current.offsetWidth / 2,
        y: mapRect.height / 2 - pinRef.current.offsetHeight / 2,
      });
    }
  }, [showPin, mapRef]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button onClick={handleButtonClick}>Create Building</button>
      {isMenuOpen && <div className="new-building-menu"></div>}
      {showPin && (
        <div
          className="drop-pin"
          ref={pinRef}
          onMouseDown={handleMouseDown}
          style={{
            position: 'absolute',
            top: `${pinPosition.y}px`,
            left: `${pinPosition.x}px`,
            cursor: 'grab',
            fontSize: '24px',
            zIndex: 1000,
          }}
        >
          📍
        </div>
      )}
    </div>
  );
};

export default NewBuildingSection;
