class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.radius = radius;

    this.vx = speed;
    this.vy = speed;

    this.x = this.stageWidth / 2;
    this.y = this.stageHeight / 2;
  }

  animate(ctx, stageWidth, stageHeight) {
    // this.stageWidth = stageWidth;
    // this.stageHeight = stageHeight;

    this.x += this.vx;
    this.y += this.vy;


    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
    }

    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
    }

    ctx.fillStyle = '#ffdd1c';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}