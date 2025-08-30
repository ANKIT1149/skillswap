"use client"
import React, { useEffect, useRef } from 'react'

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
      });
    }

    let animationFrameId: number;

    function animate() {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas!.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas!.height)
          particle.speedY *= -1;

        ctx!.fillStyle = 'rgba(129, 140, 248, 0.4)';
        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx!.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
     <canvas ref={canvasRef} className="absolute inset-0" />
  )
}

export default Canvas
