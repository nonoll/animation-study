class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.index + i,
        this.pointGap * i,
        this.centerY
      );
      this.points.push(point);
    }
    // this.point = new Point(this.index, this.centerX, this.centerY);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);
    // this.points[0].draw(ctx);

    for (let i = 1; i < this.totalPoints; i++) {
      const point = this.points[i];

      if (i < this.totalPoints - 1) {
        point.updated();
      }

      const cx = (prevX + point.x) / 2;
      const cy = (prevY + point.y) / 2;
      // @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      // ctx.lineTo(cx, cy);

      prevX = point.x;
      prevY = point.y;

      // point.draw(ctx);
    }
    
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);

    ctx.fill();
    ctx.closePath();
  }
}