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

      this.pixelRatio = win.devicePixelRatio > 2 ? 2 : 1;

      this.totalParticles = 15;
      this.particles = [];

      this.maxRadius = 900;
      this.minRadius = 400;

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

      // @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
      this.ctx.globalCompositeOperation = 'saturation';

      this.createParticles();
    }

    createParticles() {
      let curColor = 0;
      this.particles = [];

      for (let i = 0; i < this.totalParticles; i++) {
        const particle = new GlowParticle(
          Math.random() * this.stageWidth,
          Math.random() * this.stageHeight,
          Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
          COLORS[curColor]
        );
        curColor = ++curColor % COLORS.length;
        this.particles.push(particle);
      }
    }

    animate() {
      win.requestAnimationFrame(this.animate);

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      for (let i = 0; i < this.totalParticles; i++) {
        const particle = this.particles[i];
        particle.animate(this.ctx, this.stageWidth, this.stageHeight);
      }
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);