class Point {
  constructor(index, x, y, speed = 0.02) {
    this.cur = index;
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = speed;
    this.max = Math.random() * 100 + 150;
  }

  updated() {
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
