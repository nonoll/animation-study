const PI2 = Math.PI * 2;

class GlowParticle {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;

    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;

    this.sinValue = Math.random();
  }

  animate(ctx, stateWidth, stageHeight) {
    this.sinValue += 0.01;
    
    this.radius += Math.sin(this.sinValue);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stateWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.beginPath();

    const { r, g, b } = this.rgb;
    // @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    // ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, PI2, false);
    ctx.fill();
  }
}
