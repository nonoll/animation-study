;((win, doc) => {
  class App {
    constructor() {
      this.canvas = doc.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      doc.body.prepend(this.canvas);

      this.waveGroup = new WaveGroup();
      // this.wave = new Wave();

      this.pixelRatio = win.devicePixelRatio > 2 ? 2 : 1;

      this.onResize = this.onResize.bind(this);
      win.addEventListener('resize', this.onResize, false);
      this.onResize();

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

      this.waveGroup.resize(this.stageWidth, this.stageHeight);
      // this.wave.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
      win.requestAnimationFrame(this.animate);

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      this.waveGroup.draw(this.ctx);
      // this.wave.draw(this.ctx);
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);