export default class View {
  static colors = {
    '1': '#C2EAE9',  //syan
    '2': '#4DB6CD', //blue
    '3': '#F49F7B', //orange
    '4': '#F8EFB6', //yellow
    '5': '#B3FFA8', //green
    '6': '#B888E8', //purple
    '7': '#FACFD7', //red
  }

  constructor(elements, width, heigth, rows, columns) {
    this.elements = elements;
    this.width = width;
    this.heigth = heigth;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.heigth;
    this.context = this.canvas.getContext('2d');

    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeigth = this.heigth;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeigth = this.playfieldHeigth - this.playfieldBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeigth = this.playfieldInnerHeigth / rows;

    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelwidth = this.width / 3;
    this.panelHeigth = this.heigth;


    this.elements.appendChild(this.canvas)
  }

  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);
  }

  renderStartScreen() {
    this.context.fillStyle = 'white';
    this.context.font = '20px "Indie Flower"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Start', this.width / 2, this.heigth / 2);
  }

  renderPauseScreen() {
    this.context.fillStyle = 'rgba(0,0,0,0.25)';
    this.context.fillRect(0, 0, this.width, this.heigth);

    this.context.fillStyle = 'white';
    this.context.font = '20px "Indie Flower"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Resume', this.width / 2, this.heigth / 2);
  }

  renderEndScreen({ score }) {
    this.clearScreen();

    this.context.fillStyle = 'white';
    this.context.font = '20px "Indie Flower"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('GAME OVER', this.width / 2, this.heigth / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.heigth / 2);
    this.context.fillText('Press ENTER to Restart', this.width / 2, this.heigth / 2 + 48);
  }

  renderPlayfield({ playfield }) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            this.playfieldX + (x * this.blockWidth),
            this.playfieldY + (y * this.blockHeigth),
            this.blockWidth,
            this.blockHeigth,
            View.colors[block]
          );
        }
      }
    }
    this.context.strokeStyle = 'white';
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeigth);
  }

  renderPanel({ level, score, lines, nextPiece }) {
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '19px "Indie Flower"';

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
    this.context.fillText('Next:', this.panelX, this.panelY + 90);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];

        if (block) {
          this.renderBlock(
            this.panelX + (x * this.blockWidth * 0.5),
            this.panelY + 100 + (y * this.blockHeigth * 0.5),
            this.blockWidth * 0.5,
            this.blockHeigth * 0.5,
            View.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = '#3F464D';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.heigth);
  }
}