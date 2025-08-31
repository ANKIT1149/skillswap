import React, { useEffect, useRef } from 'react';

const WaveAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = Math.max(
            window.innerHeight,
            document.documentElement.scrollHeight
          );
        };
        resizeCanvas();
    
          let time = 0;
          let animationFrameId: number;
    
    
        function drawWave() {
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          ctx!.beginPath();
          ctx!.moveTo(0, canvas!.height);
    
          for (let x = 0; x < canvas!.width; x += 5) {
            const y =
              canvas!.height / 2 +
              Math.sin(x * 0.01 + time) * 50 * Math.cos(x * 0.005);
            ctx!.lineTo(x, y);
          }
    
          ctx!.lineTo(canvas!.width, canvas!.height);
          ctx!.fillStyle = 'rgba(255, 127, 127, 0.2)';
          ctx!.fill();
          ctx!.closePath();
    
          ctx!.beginPath();
          ctx!.moveTo(0, canvas!.height);
          for (let x = 0; x < canvas!.width; x += 5) {
            const y =
              canvas!.height / 2 + 50 + Math.sin(x * 0.015 + time * 1.2) * 40;
            ctx!.lineTo(x, y);
          }
          ctx!.lineTo(canvas!.width, canvas!.height);
          ctx!.fillStyle = 'rgba(255, 153, 102, 0.15)';
          ctx!.fill();
          ctx!.closePath();
    
          time += 0.05;
          animationFrameId = requestAnimationFrame(drawWave);
        }
    
        drawWave();
    
         const handleResize = () => {
          resizeCanvas();
        };
    
        const observer = new ResizeObserver(() => {
          resizeCanvas();
        });
        observer.observe(document.documentElement);
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          observer.disconnect();
          cancelAnimationFrame(animationFrameId);
        };
      }, []);
    
  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export default WaveAnimation;
