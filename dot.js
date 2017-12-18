class Dot {

  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.dna = new Array();

    // INITIALIZE DNA

    var direction = ['U', 'D', 'L', 'R'];

    for (i = 0; i < length; i++) {
      this.dna.push(random(direction));
    }
  }

}
