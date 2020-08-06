;((win, doc) => {
  class App {
    constructor() {
      this.canvas = doc.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      doc.body.prepend(this.canvas);

      this.pixelRatio = win.devicePixelRatio > 2 ? 2 : 1;

      this.onResize = this.onResize.bind(this);
      win.addEventListener('resize', this.onResize, false);
      this.onResize();


      this.isDown = false;
      this.moveX = 0;
      this.offsetX = 0;

      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      doc.addEventListener('pointerdown', this.onPointerDown, false);
      doc.addEventListener('pointermove', this.onPointerMove, false);
      doc.addEventListener('pointerup', this.onPointerUp, false);

      this.animate = this.animate.bind(this);
      win.requestAnimationFrame(this.animate);
    }

    onResize() {
      this.stageWidth = doc.body.clientWidth;
      this.stageHeight = doc.body.clientHeight;

      // this.canvas.width = this.stageWidth;
      // this.canvas.height = this.stageHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      // this.polygon = new Polygon(
      //   this.stageWidth / 2,
      //   this.stageHeight / 2,
      //   this.stageWidth / 3,
      //   3
      // );

      // this.polygon = new Polygon(
      //   this.stageWidth / 2,
      //   this.stageHeight / 2,
      //   this.stageWidth / 3.5,
      //   12
      // );

      this.polygon = new Polygon(
        this.stageWidth / 2,
        this.stageHeight + (this.stageHeight / 4),
        this.stageWidth / 1.5,
        15
      );
    }

    onPointerDown(e) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = e.clientX;
    }

    onPointerMove(e) {
      if (!this.isDown) {
        return;
      }

      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }

    onPointerUp() {
      this.isDown = false;
    }

    animate() {
      win.requestAnimationFrame(this.animate);

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      this.moveX *= 0.92;
      this.polygon.animate(this.ctx, this.moveX);

      // this.polygon.animate(this.ctx);
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);