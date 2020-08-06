const PI2 = Math.PI * 2;
const COLORS = ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "Hex Color Code", "#FFFFFF", "#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];
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

  // animate(ctx, moveX) {
  //   ctx.save();
  //   ctx.fillStyle = '#000';

  //   const angle = PI2 / this.sides;

  //   ctx.translate(this.x, this.y);

  //   this.rotate -= moveX * 0.008;
  //   ctx.rotate(this.rotate);

  //   for (let i = 0; i < this.sides; i++) {
  //     const x = this.radius * Math.cos(angle * i);
  //     const y = this.radius * Math.sin(angle * i);

  //     ctx.beginPath();
  //     ctx.arc(x, y, 30, 0, PI2, false);
  //     ctx.fill();
  //   }

  //   ctx.restore();
  // }

  // animate(ctx, moveX) {
  //   ctx.save();
  //   ctx.fillStyle = '#000';

  //   const angle = PI2 / this.sides;
  //   const angle2 = PI2 / 4;

  //   ctx.translate(this.x, this.y);

  //   this.rotate -= moveX * 0.008;
  //   ctx.rotate(this.rotate);

  //   for (let i = 0; i < this.sides; i++) {
  //     const x = this.radius * Math.cos(angle * i);
  //     const y = this.radius * Math.sin(angle * i);

  //     ctx.save();
  //     ctx.translate(x, y);

  //     const rotate = ((360 / this.sides) * i + 45) * Math.PI / 180;
  //     ctx.rotate(rotate);
  //     ctx.beginPath();

  //     for (let j = 0; j < 4; j++) {
  //       const x2 = 80 * Math.cos(angle2 * j);
  //       const y2 = 80 * Math.sin(angle2 * j);
  //       if (j === 0) {
  //         ctx.moveTo(x2, y2);
  //       } else {
  //         ctx.lineTo(x2, y2);
  //       }
  //     }

  //     ctx.fill();
  //     ctx.closePath();
  //     ctx.restore();
  //   }

  //   ctx.restore();
  // }

  animate(ctx, moveX) {
    ctx.save();

    const angle = PI2 / this.sides;
    const angle2 = PI2 / 4;

    ctx.translate(this.x, this.y);

    this.rotate += moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      ctx.save();
      ctx.fillStyle = COLORS[i];
      ctx.translate(x, y);

      const rotate = ((360 / this.sides) * i + 45) * Math.PI / 180;
      ctx.rotate(rotate);
      ctx.beginPath();

      for (let j = 0; j < 4; j++) {
        const x2 = 160 * Math.cos(angle2 * j);
        const y2 = 160 * Math.sin(angle2 * j);
        if (j === 0) {
          ctx.moveTo(x2, y2);
        } else {
          ctx.lineTo(x2, y2);
        }
      }

      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    ctx.restore();
  }
}