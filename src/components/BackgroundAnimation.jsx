import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particlesConfig = {
            count: 70,       // Número de nodos
            color: '0, 240, 255', // Base color RGB (var--accent-blue)
            minRadius: 1,
            maxRadius: 3,
            connectionDistance: 130, // Distancia máxima para conectar nodos
            mouseDistance: 150,      // Distancia de interacción con el mouse
            speed: 0.6               // Velocidad general
        };

        let particles = [];
        let mouse = { x: null, y: null };

        // Resize handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Mouse handlers
        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * particlesConfig.speed;
                this.vy = (Math.random() - 0.5) * particlesConfig.speed;
                this.radius = Math.random() * (particlesConfig.maxRadius - particlesConfig.minRadius) + particlesConfig.minRadius;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particlesConfig.color}, 0.8)`;
                ctx.fill();
            }

            update() {
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < particlesConfig.mouseDistance) {
                        // Subtle repel or pull
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (particlesConfig.mouseDistance - distance) / particlesConfig.mouseDistance;
                        // Repel
                        this.x -= forceDirectionX * force * 1.5;
                        this.y -= forceDirectionY * force * 1.5;
                    }
                }

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particlesConfig.count; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < particlesConfig.connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / particlesConfig.connectionDistance);
                        ctx.strokeStyle = `rgba(${particlesConfig.color}, ${opacity * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw subtle static background gradients
            const gradient1 = ctx.createRadialGradient(
                canvas.width * 0.15, canvas.height * 0.5, 0,
                canvas.width * 0.15, canvas.height * 0.5, canvas.width * 0.5
            );
            gradient1.addColorStop(0, 'rgba(255, 255, 255, 0.015)');
            gradient1.addColorStop(1, 'transparent');
            
            const gradient2 = ctx.createRadialGradient(
                canvas.width * 0.85, canvas.height * 0.3, 0,
                canvas.width * 0.85, canvas.height * 0.3, canvas.width * 0.5
            );
            gradient2.addColorStop(0, 'rgba(0, 240, 255, 0.03)');
            gradient2.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            drawConnections();
            
            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialization
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        resizeCanvas();
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: '#050505' // matching --bg-dark
            }}
        />
    );
};

export default BackgroundAnimation;
