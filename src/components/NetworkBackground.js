import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Nodes (particles)
    const nodes = [];
    const nodeCount = 80;
    const maxDistance = 200;

    // Create nodes with different properties
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 4 + 2,
        color: Math.random() > 0.7 ? '#ef4444' : '#3b82f6', // Mix of red and blue
        intensity: Math.random() * 0.8 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      // Create a subtle trail effect instead of clearing completely
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with some randomness
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.9;
          node.vx += (Math.random() - 0.5) * 0.1;
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.9;
          node.vy += (Math.random() - 0.5) * 0.1;
        }

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Add slight random movement
        node.vx += (Math.random() - 0.5) * 0.005;
        node.vy += (Math.random() - 0.5) * 0.005;

        // Limit velocity
        const maxVel = 1;
        if (Math.abs(node.vx) > maxVel) node.vx = node.vx > 0 ? maxVel : -maxVel;
        if (Math.abs(node.vy) > maxVel) node.vy = node.vy > 0 ? maxVel : -maxVel;

        // Draw node with glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, node.color + 'ff');
        gradient.addColorStop(0.5, node.color + '80');
        gradient.addColorStop(1, node.color + '00');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + 'ee';
        ctx.fill();

        // Draw connections
        for (let j = index + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
            Math.pow(node.y - otherNode.y, 2)
          );

          if (distance < maxDistance) {
            const opacity = ((maxDistance - distance) / maxDistance) * 0.5;
            
            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              node.x, node.y, otherNode.x, otherNode.y
            );
            lineGradient.addColorStop(0, node.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            lineGradient.addColorStop(1, otherNode.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = opacity * 2;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Enhanced mouse interaction
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      nodes.forEach(node => {
        const distance = Math.sqrt(
          Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
        );
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(node.y - mouseY, node.x - mouseX);
          node.vx += Math.cos(angle) * force * 0.02;
          node.vy += Math.sin(angle) * force * 0.02;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        zIndex: -1 
      }}
    />
  );
};

export default NetworkBackground;
