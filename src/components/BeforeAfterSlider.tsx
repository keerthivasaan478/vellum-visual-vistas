
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

interface BeforeAfterSliderProps {
  beforeImage: ImageProps;
  afterImage: ImageProps;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  // State to track the slider's horizontal position (0-100)
  const [sliderPosition, setSliderPosition] = useState(50);
  // State to track if the user is currently dragging the handle
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs to access the container and handle DOM elements directly
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle the start of a drag (mouse down or touch start)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default browser actions like image selection
    setIsDragging(true);
  };

  // Function to handle the end of a drag (mouse up or touch end)
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  // Function to handle the movement during a drag
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    // Determine the horizontal coordinate of the pointer
    const clientX = e.type === 'touchmove' ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    
    // Get the bounding box of the container to calculate relative position
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;

    // Clamp the position to be within the 0-100 bounds
    newPosition = Math.max(0, Math.min(100, newPosition));
    
    setSliderPosition(newPosition);
  }, [isDragging]);

  // useEffect to add and remove global event listeners for dragging
  useEffect(() => {
    // Add event listeners for mouse and touch events when dragging
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    // Cleanup function to remove listeners when the component unmounts or dragging stops
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none shadow-soft cursor-e-resize"
      onMouseDown={handleDragStart}
      onTouchStart={(e) => { e.preventDefault(); handleDragStart(e); }}
    >
      {/* After Image (bottom layer) */}
      <img
        src={afterImage.src}
        alt={afterImage.alt}
        className="absolute top-0 left-0 w-full h-full object-cover"
        draggable="false"
      />
      
      {/* Before Image container (top layer, clipped by the slider position) */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage.src}
          alt={beforeImage.alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* Slider Handle and Line */}
      <div
        className="absolute top-0 h-full w-1 bg-canvas-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        {/* The circular handle with arrows */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-canvas-white rounded-full w-12 h-12 flex items-center justify-center text-burnt-gold shadow-soft border-2 border-burnt-gold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
      
      {/* "Before" Label */}
      <div className="absolute top-4 left-4 bg-off-black/80 text-canvas-white text-sm font-inter font-semibold px-3 py-1.5 rounded-lg pointer-events-none">
        Before
      </div>
      
      {/* "After" Label */}
      <div className="absolute top-4 right-4 bg-deep-teal/80 text-canvas-white text-sm font-inter font-semibold px-3 py-1.5 rounded-lg pointer-events-none">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
