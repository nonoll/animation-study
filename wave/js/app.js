;((win, doc) => {
  const COLORS = [
    { r: 45,  g: 74,  b: 227 },     // blue
    { r: 250, g: 255, b: 89 },      // yellow
    { r: 255, g: 104, b: 248 },     // pupple
    { r: 44,  g: 209, b: 252 },     // skyblue
    { r: 54,  g: 233, b: 84 }       // green
  ];

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