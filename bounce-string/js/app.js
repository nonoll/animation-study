;((win, doc) => {
  class App {
    constructor() {
      this.canvas = doc.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      doc.body.prepend(this.canvas);

      this.pixelRatio = win.devicePixelRatio > 2 ? 2 : 1;

      this.strings = [];
      this.moveX = -5000;
      this.moveY = -5000;

      this.onResize = this.onResize.bind(this);
      win.addEventListener('resize', this.onResize, false);
      this.onResize();

      this.ball = new Ball(this.stageWidth, this.stageHeight, 70, 6);

      this.isPointerDown = false;
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      doc.addEventListener('pointerdown', this.onPointerDown, false);
      doc.addEventListener('pointermove', this.onPointerMove, false);
      doc.addEventListener('pointerup', this.onPointerUp, false);

      this.animate = this.animate.bind(this);
      win.requestAnimationFrame(this.animate);
    }

    onPointerDown(e) {
      this.isPointerDown = true;
      this.moveX = e.clientX;
      this.moveY = e.clientY;
    }

    onPointerMove(e) {
      if (!this.isPointerDown) {
        return;
      }

      this.moveX = e.clientX;
      this.moveY = e.clientY;
    }

    onPointerUp() {
      this.isPointerDown = false;

      this.moveX = -5000;
      this.moveY = -5000;
    }

    onResize() {
      this.stageWidth = doc.body.clientWidth;
      this.stageHeight = doc.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      const xGap = 20;
      const yGap = 20;
      const x1 = xGap;
      const x2 = this.stageWidth - xGap;
      const total = Math.floor((this.stageHeight - yGap) / yGap);
      this.strings = [];

      for (let i = 0; i < total; i++) {
        const pos = {
          x1,
          y1: (i * yGap) + yGap,
          x2,
          y2: (i * yGap) + yGap
        }; 
        const string = new BounceString(pos, '#ff5038');
        this.strings.push(string);
      }

      // const pos = {
      //   x1: 50,
      //   y1: this.stageHeight / 2,
      //   x2: this.stageWidth - 50,
      //   y2: this.stageHeight / 2
      // }; 
      // this.strings = [
      //   new BounceString(pos, '#ff5038')
      // ]
    }

    animate() {
      win.requestAnimationFrame(this.animate);

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      if (!this.strings.length) {
        return;
      }

      for (let i = 0, length = this.strings.length; i < length; i++) {
        const string = this.strings[i];

        if (this.isPointerDown) {
          string.animate(this.ctx, this.moveX, this.moveY);
        } else {
          string.animate(this.ctx, this.ball.x, this.ball.y);
        }
      }

      this.ball.animate(this.ctx, this.stageWidth, this.stageHeight);
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);