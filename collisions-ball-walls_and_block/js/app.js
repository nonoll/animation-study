;((win, doc) => {

  class App {
    constructor() {
      this.canvas = doc.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      doc.body.prepend(this.canvas);

      this.onResize = this.onResize.bind(this);
      win.addEventListener('resize', this.onResize, false);
      this.onResize();

      this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
      this.block = new Block(700, 40, 250, 250);

      this.animate = this.animate.bind(this);
      win.requestAnimationFrame(this.animate);
    }

    onResize() {
      console.log('resize');
      this.stageWidth = doc.body.clientWidth;
      this.stageHeight = doc.body.clientHeight;

      // this.canvas.width = this.stageWidth;
      // this.canvas.height = this.stageHeight;

      this.canvas.width = this.stageWidth * 2;
      this.canvas.height = this.stageHeight * 2;
      this.ctx.scale(2, 2);
    }

    animate() {
      console.log('animate');
      win.requestAnimationFrame(this.animate);

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      this.block.draw(this.ctx);
      this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);