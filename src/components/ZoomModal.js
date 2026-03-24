import React, { useRef, useState, useEffect } from "react";
import "./ZoomModal.css";

const ZoomModal = ({ imageUrl, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Zoom in/out with buttons
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.2));

  // Scroll zoom support
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  // Touch pinch zoom (optional for mobile)
  useEffect(() => {
    const image = imageRef.current;
    let initialDistance = null;

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (initialDistance) {
          const delta = distance - initialDistance;
          if (delta > 10) handleZoomIn();
          if (delta < -10) handleZoomOut();
        }

        initialDistance = distance;
      }
    };

    const handleTouchEnd = () => {
      initialDistance = null;
    };

    image.addEventListener("touchmove", handleTouchMove);
    image.addEventListener("touchend", handleTouchEnd);

    return () => {
      image.removeEventListener("touchmove", handleTouchMove);
      image.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Drag image
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startDrag.x,
        y: e.clientY - startDrag.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div className="zoom-modal" onWheel={handleWheel}>
      <div className="zoom-backdrop" onClick={onClose}></div>
      <div
        className="zoom-content"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Zoom"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: dragging ? "grabbing" : "grab",
          }}
        />
        <div className="zoom-controls">
          <button onClick={handleZoomOut}>➖</button>
          <button onClick={handleZoomIn}>➕</button>
          <button onClick={onClose}>❌</button>
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;