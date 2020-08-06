;((win, doc) => {
  class App {
    constructor() {
      this.canvas = doc.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      doc.body.prepend(this.canvas);

      this.tmpCanvas = doc.createElement('canvas');
      this.tmpCtx = this.tmpCanvas.getContext('2d');

      this.elOptions = doc.querySelector('#options');
      this.displayOptions = this.elOptions.value;
      this.elOptions.addEventListener('change', () => {
        this.displayOptions = this.elOptions.value;

        if (this.displayOptions === 'default') {
          this.radius = 10;
          this.pixelSize = 30;
          doc.body.style.backgroundColor = '#000';
        } else {
          this.radius = 16;
          this.pixelSize = 16;
          doc.body.style.backgroundColor = '#fff';
        }
        
        this.onResize();
      });

      // this.elRadius = doc.querySelector('#radius');
      // this.elRadius.addEventListener('change', () => {
      //   this.radius = parseInt(this.elRadius.value, 10);
      //   this.onResize();
      // });

      // this.elPixelSize = doc.querySelector('#pixelSize');
      // this.elPixelSize.addEventListener('change', () => {
      //   this.pixelSize = parseInt(this.elPixelSize.value, 10);
      //   this.onResize();
      // });

      this.ripple = new Ripple();
      this.radius = 10;
      this.pixelSize = 30;
      this.dots = [];

      this.pixelRatio = win.devicePixelRatio > 2 ? 2 : 1;

      this.onResize = this.onResize.bind(this);
      win.addEventListener('resize', this.onResize, false);
      this.onResize();

      this.isLoaded = false;
      this.imagePos = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };

      this.elImageType = doc.querySelector('#imageType');
      this.elImageType.addEventListener('change', () => {
        this.image = new Image();
        this.image.src = this.elImageType.value;
        this.image.addEventListener('load', () => {
          this.isLoaded = true;
          this.onResize();
        });
      });
      this.elImageType.dispatchEvent(new Event('change'));

      this.animate = this.animate.bind(this);
      win.requestAnimationFrame(this.animate);

      this.onCanvasClick = this.onCanvasClick.bind(this);
      this.canvas.addEventListener('click', this.onCanvasClick, false);
    }

    onCanvasClick(e) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      for (let i = 0, length = this.dots.length; i < length; i++) {
        const dot = this.dots[i];
        dot.reset();
      }

      this.ctx.drawImage(
        this.image,
        0, 0,
        this.image.width, this.image.height,
        this.imagePos.x, this.imagePos.y,
        this.imagePos.width, this.imagePos.height
      );

      this.ripple.start(e.offsetX, e.offsetY);
    }

    drawImage() {
      const stageRatio = this.stageWidth / this.stageHeight;
      const imageRatio = this.image.width / this.image.height;

      this.imagePos.width = this.stageWidth;
      this.imagePos.height = this.stageHeight;

      if (imageRatio > stageRatio) {
        this.imagePos.width = Math.round(this.image.width * (this.stageHeight / this.image.height));
        this.imagePos.x = Math.round((this.stageWidth - this.imagePos.width) / 2);
      } else {
        this.imagePos.height = Math.round(this.image.height * (this.stageWidth / this.image.width));
        this.imagePos.y = Math.round((this.stageHeight - this.imagePos.height) / 2);
      }

      if (this.displayOptions === 'default') {
        this.ctx.drawImage(
          this.image,
          0, 0,
          this.image.width, this.image.height,
          this.imagePos.x, this.imagePos.y,
          this.imagePos.width, this.imagePos.height
        );
      }

      this.tmpCtx.drawImage(
        this.image,
        0, 0,
        this.image.width, this.image.height,
        this.imagePos.x, this.imagePos.y,
        this.imagePos.width, this.imagePos.height
      );

      this.imageData = this.tmpCtx.getImageData(0, 0, this.stageWidth, this.stageHeight);

      this.drawDots();
    }

    drawDots() {
      this.dots = [];

      this.columns = Math.ceil(this.stageWidth / this.pixelSize);
      this.rows = Math.ceil(this.stageHeight / this.pixelSize);

      for (let i = 0; i < this.rows; i++) {
        const y = (i + 0.5) * this.pixelSize;
        const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

        for (let j = 0; j < this.columns; j++) {
          const x = (j + 0.5) * this.pixelSize;
          const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

          const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
          const red = this.imageData.data[pixelIndex + 0];
          const green = this.imageData.data[pixelIndex + 1];
          const blue = this.imageData.data[pixelIndex + 2];
          const scale = getBWValue(red, green, blue, false);

          const dot = new Dot(
            x,
            y,
            this.radius,
            this.pixelSize,
            red,
            green,
            blue,
            scale,
            this.displayOptions
          );

          if (this.displayOptions === 'reverse') {
            if (dot.targetRadius > 0.1) {
              this.dots.push(dot);
            }
          } else {
            this.dots.push(dot);
          }
        }
      }
    }

    onResize() {
      this.stageWidth = doc.body.clientWidth;
      this.stageHeight = doc.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      this.tmpCanvas.width = this.stageWidth;
      this.tmpCanvas.height = this.stageHeight;

      this.ripple.resize(this.stageWidth, this.stageHeight);

      if (this.isLoaded) {
        this.drawImage();
      }
    }

    animate() {
      win.requestAnimationFrame(this.animate);

      if (this.displayOptions === 'reverse') {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      }

      this.ripple.animate(this.ctx);

      for (let i = 0, length = this.dots.length; i < length; i++) {
        const dot = this.dots[i];
        const isCollide = collide(dot.x, dot.y, this.ripple.x, this.ripple.y, this.ripple.radius);
        if (isCollide) {
          dot.animate(this.ctx);
        }
      }
    }

  }
  
  doc.addEventListener('DOMContentLoaded', () => {
    new App();
  });
  
})(window, window.document);