const PI2 = Math.PI * 2;

class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  // animate(ctx, moveX) {
  //   ctx.save();
  //   ctx.fillStyle = '#000';
  //   ctx.beginPath();

  //   const angle = PI2 / this.sides;

  //   ctx.translate(this.x, this.y);

  //   this.rotate -= moveX * 0.008;
  //   ctx.rotate(this.rotate);

  //   for (let i = 0; i < this.sides; i++) {
  //     const x = this.radius * Math.cos(angle * i);
  //     const y = this.radius * Math.sin(angle * i);

  //     if (i === 0) {
  //       ctx.moveTo(x, y);
  //     } else {
  //       ctx.lineTo(x, y);
  //     }
  //   }

  //   ctx.fill();
  //   ctx.closePath();
  //   ctx.restore();
  // }

  animate(ctx, moveX) {
    ctx.save();
    ctx.fillStyle = '#000';

    const angle = PI2 / this.sides;

    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, PI2, false);
      ctx.fill();
    }

    ctx.restore();
  }
}