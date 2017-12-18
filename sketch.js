var WIDTH, HEIGHT;
var FRAMERATE = 30;
var DRAW_BUFFER = 20;
var RANDOM_START_AND_END = true;
var NUM_DOTS = 20;
var DNA_SIZE = 200;
var POS_DELTA = 10;

var MUTATION_CHANCE = .005;
var MOST_FIT_CHANCE = .5;

var direction = ['U', 'D', 'L', 'R'];
var start;
var end;
var dots;
var dna_pos = 0;
var gen_num = 1;

function setup() {
  WIDTH = 500;
  HEIGHT = 500;
  createCanvas(WIDTH, HEIGHT);
  frameRate(FRAMERATE);

  createStartEndPoints();
  createDots();

}

function draw() {

  show();
  update();

}

function createStartEndPoints() {

  if (RANDOM_START_AND_END) {
    start = {
      x: random(DRAW_BUFFER, WIDTH - DRAW_BUFFER),
      y: random(DRAW_BUFFER, HEIGHT - DRAW_BUFFER)
    };
    end = {
      x: random(DRAW_BUFFER, WIDTH - DRAW_BUFFER),
      y: random(DRAW_BUFFER, HEIGHT - DRAW_BUFFER)
    };
  } else {
    start = {
      x: DRAW_BUFFER,
      y: HEIGHT / 2
    };
    end = {
      x: WIDTH - DRAW_BUFFER,
      y: HEIGHT / 2
    };
  }

}

function createDots() {

  dots = new Array();

  for (i = 0; i < NUM_DOTS; i++) {

    var dna = new Array();
    for (j = 0; j < DNA_SIZE; j++) {
      dna.push(random(direction));
    }
    dots.push({
      x: start.x,
      y: start.y,
      dna: dna
    });
  }
}

function show() {

  background(221, 217, 217);
  text("Generation: " + gen_num, 10, 20);

  drawTargetPoints();
  drawDots();

}

function drawTargetPoints() {
  noStroke();
  // DRAW START
  fill('red');
  ellipse(start.x, start.y, 10);
  // DRAW END
  fill('blue');
  ellipse(end.x, end.y, 10);
}

function drawDots() {
  noStroke();
  fill(0, 0, 0, 100);

  for (i = 0; i < dots.length; i++) {
    ellipse(dots[i].x, dots[i].y, 10);
  }
}

function update() {
  if (dna_pos == DNA_SIZE - 1) {
    console.log(dots);
    evaluate();
    newGen();
    dna_pos = 0;
    gen_num++;
  } else {
    // LOOP THROUGH AND UPDATE POSITION
    updatePositions();
    dna_pos++;
  }
}

function evaluate() {
  for (d of dots) {
    d.eval = dist(d.x, d.y, end.x, end.y);
  }
}

function newGen() {
  // SORT BY EVALUATION
  dots.sort(function(a, b) {
    return a.eval - b.eval;
  });
  // SELECT MOST FIT DOT
  var most_fit = dots[0];

  for (d of dots) {

    d.x = start.x;
    d.y = start.y;

    for (i = 0; i < DNA_SIZE; i++) {
      var r = random();
      if (r <= MUTATION_CHANCE) {
        d.dna[i] = random(direction);
      } else if (r <= MOST_FIT_CHANCE) {
        d.dna[i] = most_fit.dna[i];
      }
    }
  }
}

function updatePositions() {

  for (d of dots) {
    var dir = d.dna[dna_pos];
    if (dir == 'U' && d.y > 0) {
      d.y = d.y - POS_DELTA;
    } else if (dir == 'D' && d.y < HEIGHT) {
      d.y = d.y + POS_DELTA;
    } else if (dir == 'L' && d.x > 0) {
      d.x = d.x - POS_DELTA;
    } else if (dir == 'R' && d.x < WIDTH) {
      d.x = d.x + POS_DELTA;
    }
  }

}
