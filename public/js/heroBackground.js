// Vertical Bars Noise Animation - Default Original
// Converted from React to vanilla JavaScript

class VerticalBarsNoise {
    constructor(options = {}) {
        // OGM Color Scheme defaults
        this.backgroundColor = options.backgroundColor || '#141414'; // Hero background
        this.lineColor = options.lineColor || '#8B7355'; // Darker muted gold
        this.barColor = options.barColor || '#8B7355';
        this.lineWidth = options.lineWidth || 1;
        this.animationSpeed = options.animationSpeed || 0.0005;
        this.removeWaveLine = options.removeWaveLine !== undefined ? options.removeWaveLine : true;

        this.canvas = null;
        this.ctx = null;
        this.time = 0;
        this.animationFrameId = null;
        this.mouse = { x: 0, y: 0, isDown: false };
        this.ripples = [];
        this.dpr = 1;
    }

    hexToRgb(hex) {
        const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
        const r = Number.parseInt(cleanHex.substring(0, 2), 16);
        const g = Number.parseInt(cleanHex.substring(2, 4), 16);
        const b = Number.parseInt(cleanHex.substring(4, 6), 16);
        return { r, g, b };
    }

    noise(x, y, t) {
        const n =
            Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t) +
            Math.sin(x * 0.015 - t) * Math.cos(y * 0.005 + t);
        return (n + 1) / 2;
    }

    getMouseInfluence(x, y) {
        const dx = x - this.mouse.x;
        const dy = y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        return Math.max(0, 1 - distance / maxDistance);
    }

    getRippleInfluence(x, y, currentTime) {
        let totalInfluence = 0;
        this.ripples.forEach((ripple) => {
            const age = currentTime - ripple.time;
            const maxAge = 2000;
            if (age < maxAge) {
                const dx = x - ripple.x;
                const dy = y - ripple.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const rippleRadius = (age / maxAge) * 300;
                const rippleWidth = 50;
                if (Math.abs(distance - rippleRadius) < rippleWidth) {
                    const rippleStrength = (1 - age / maxAge) * ripple.intensity;
                    const proximityToRipple =
                        1 - Math.abs(distance - rippleRadius) / rippleWidth;
                    totalInfluence += rippleStrength * proximityToRipple;
                }
            }
        });
        return Math.min(totalInfluence, 2);
    }

    resizeCanvas() {
        if (!this.canvas) return;
        const dpr = window.devicePixelRatio || 1;
        this.dpr = dpr;
        const displayWidth = window.innerWidth;
        const displayHeight = Math.max(window.innerHeight * 6, document.body.scrollHeight); // Cover all sections
        this.canvas.width = displayWidth * dpr;
        this.canvas.height = displayHeight * dpr;
        this.canvas.style.width = displayWidth + 'px';
        this.canvas.style.height = displayHeight + 'px';
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    }

    handleMouseMove(e) {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleMouseDown(e) {
        this.mouse.isDown = true;
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.ripples.push({
            x,
            y,
            time: Date.now(),
            intensity: 1.5,
        });
        const now = Date.now();
        this.ripples = this.ripples.filter(
            (ripple) => now - ripple.time < 2000
        );
    }

    handleMouseUp() {
        this.mouse.isDown = false;
    }

    animate() {
        if (!this.canvas || !this.ctx) return;

        this.time += this.animationSpeed;
        const currentTime = Date.now();
        const canvasWidth = this.canvas.clientWidth;
        const canvasHeight = this.canvas.clientHeight;
        const viewportHeight = window.innerHeight;
        const numLines = Math.floor(canvasHeight / 11);
        const lineSpacing = canvasHeight / numLines;

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        for (let i = 0; i < numLines; i++) {
            const y = i * lineSpacing + lineSpacing / 2;
            const mouseInfluence = this.getMouseInfluence(canvasWidth / 2, y);
            const lineAlpha = Math.max(0.3, 0.3 + mouseInfluence * 0.7);

            this.ctx.beginPath();
            const lineRgb = this.hexToRgb(this.lineColor);
            this.ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${lineAlpha})`;
            this.ctx.lineWidth = this.lineWidth + mouseInfluence * 2;
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(canvasWidth, y);
            this.ctx.stroke();

            for (let x = 0; x < canvasWidth; x += 8) {
                const noiseVal = this.noise(x, y, this.time);
                const mouseInfl = this.getMouseInfluence(x, y);
                const rippleInfl = this.getRippleInfluence(x, y, currentTime);
                const totalInfluence = mouseInfl + rippleInfl;
                const threshold = Math.max(
                    0.2,
                    0.5 - mouseInfl * 0.2 - Math.abs(rippleInfl) * 0.1
                );

                if (noiseVal > threshold) {
                    const barWidth = 3 + noiseVal * 10 + totalInfluence * 5;
                    const barHeight = 2 + noiseVal * 3 + totalInfluence * 3;
                    const baseAnimation =
                        Math.sin(this.time + y * 0.0375) * 20 * noiseVal;
                    const mouseAnimation = this.mouse.isDown
                        ? Math.sin(this.time * 3 + x * 0.01) * 10 * mouseInfl
                        : 0;
                    const rippleAnimation =
                        rippleInfl * Math.sin(this.time * 2 + x * 0.02) * 15;
                    const animatedX =
                        x + baseAnimation + mouseAnimation + rippleAnimation;
                    const intensity = Math.min(
                        1,
                        Math.max(0.7, 0.7 + totalInfluence * 0.3)
                    );
                    const barRgb = this.hexToRgb(this.barColor);
                    this.ctx.fillStyle = `rgba(${barRgb.r}, ${barRgb.g}, ${barRgb.b}, ${intensity})`;
                    this.ctx.fillRect(
                        animatedX - barWidth / 2,
                        y - barHeight / 2,
                        barWidth,
                        barHeight
                    );
                }
            }
        }

        if (!this.removeWaveLine) {
            this.ripples.forEach((ripple) => {
                const age = currentTime - ripple.time;
                const maxAge = 2000;
                if (age < maxAge) {
                    const progress = age / maxAge;
                    const radius = progress * 300;
                    const alpha = (1 - progress) * 0.3 * ripple.intensity;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(201, 165, 91, ${alpha})`; // Gold ripple
                    this.ctx.lineWidth = 2;
                    this.ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
                    this.ctx.stroke();
                }
            });
        }

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    init(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');

        if (!this.canvas) return;

        this.resizeCanvas();

        // Event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());

        // Start animation
        this.animate();
    }

    destroy() {
        window.removeEventListener('resize', () => this.resizeCanvas());
        if (this.canvas) {
            this.canvas.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.removeEventListener('mousedown', (e) => this.handleMouseDown(e));
            this.canvas.removeEventListener('mouseup', () => this.handleMouseUp());
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.time = 0;
        this.ripples = [];
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const verticalBackground = new VerticalBarsNoise({
            backgroundColor: '#141414', // Hero background
            lineColor: '#6B5535', // Even darker muted gold
            barColor: '#6B5535',
            lineWidth: 1,
            animationSpeed: 0.0005,
            removeWaveLine: true
        });
        verticalBackground.init(heroCanvas);
    }
});