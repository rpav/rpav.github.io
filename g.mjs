export function pir(n) { return n * Math.PI; }
export function lerp(x, y, a) { return x + ((y - x) * a); }

export class vec2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  toString() { return `vec2<${this.x}, ${this.y}>`; }
  len() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  lenSq() { return this.x * this.x + this.y * this.y; }
  normalized() { let scale = 1.0 / this.len(); return new vec2(this.x * scale, this.y * scale); }
  add(v1) { return new vec2(this.x + v1.x, this.y + v1.y); }
  addf(f) { return new vec2(this.x + f, this.y + f); }
  sub(v1) { return new vec2(this.x - v1.x, this.y - v1.y); }
  subf(f) { return new vec2(this.x - f, this.y - f); }
  mul(v1) { return new vec2(this.x * v1.x, this.y * v1.y); }
  mulf(f) { return new vec2(this.x * f, this.y * f); }
  eql(v1) { return this.x == v1.x && this.y == v1.y; }
  within(v1, r) { return v1.sub(this).lenSq() <= r * r; }
  lerp(v1, a) { return new vec2(lerp(this.x, v1.x, a), lerp(this.y, v1.y, a)); }
}

export class rect {
  constructor(pos, size) {
    this.pos = pos || V2();
    this.size = size || V2();
  }
  toString() { return `rect<${this.pos},${this.size}>`; }
}

export function V2(x, y) { return new vec2(x, y); }
export function Rect(...args) {
  let pos, size;
  if (args.length == 4) {
    pos = V2(args[0], args[1]);
    size = V2(args[2], args[3]);
  } else if (args.length == 2) {
    pos = args[0];
    size = args[1];
  } else if (args.length == 1) {
    pos = V2();
    size = args[0];
  }

  return new rect(pos, size);
}

export class Better2D {
  constructor(ctx) {
    this.c = ctx;
  }
  get canvas() { return this.c.canvas; }

  // chaining
  clearRect(r) { this.c.clearRect(r.pos.x, r.pos.y, r.size.x, r.size.y); return this; }
  fillRect(r) { this.c.fillRect(r.pos.x, r.pos.y, r.size.x, r.size.y); return this; }
  strokeRect(r) { this.c.strokeRect(r.pos.x, r.pos.y, r.size.x, r.size.y); return this; }
  fillText(text, v, mw) { this.c.fillText(text, v.x, v.y, mw); return this; }
  strokeText(text, v, mw) { this.c.strokeText(text, v.x, v.y, mw); return this; }
  setLineWidth(val) { this.c.lineWidth = val; return this; }
  setLineCap(val) { this.c.lineCap = val; return this; }
  setLineJoin(val) { this.c.lineJoin = val; return this; }
  setMiterLimit(val) { this.c.miterLimit = val; return this; }
  setLineDash(val) { this.c.setLineDash(val); return this; }
  setLineDashOffset(val) { this.c.lineDashOffset = val; return this; }
  setFont(val) { this.c.font = val; return this; }
  setTextAlign(val) { this.c.textAlign = val; return this; }
  setTextBaseline(val) { this.c.textBaseline = val; return this; }
  setTextDirection(val) { this.c.textDirection = val; return this; }
  setFillStyle(val) { this.c.fillStyle = val; return this; }
  setStrokeStyle(val) { this.c.strokeStyle = val; return this; }

  beginPath() { this.c.beginPath(); return this; }
  closePath() { this.c.closePath(); return this; }
  moveTo(v) { this.c.moveTo(v.x, v.y); return this; }
  lineTo(v) { this.c.lineTo(v.x, v.y); return this; }
  bezierCurveTo(cp0, cp1, end) { this.c.bezierCurveTo(cp0.x, cp0.y, cp1.x, cp1.y, end.x, end.y); return this; }
  //
  arc(v, r, s, e, acw) { this.c.arc(v.x, v.y, r, s, e, acw); return this; }
  rect(r) { this.c.rect(r.pos.x, r.pos.y, r.size.x, r.size.y); return this; }
  fill() { this.c.fill(); return this; }
  stroke() { this.c.stroke(); return this; }
  // need: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#paths
  // - quadraticCurveTo, arcTo, ellipse
  // - transforms
  // - compositing
  // etc

  // non-chaining
  measureText(text) { return this.measureText(text); }
  getLineDash() { return this.getLineDash(); }

  createConicGradient(a, v) { return this.c.createConicGradient(a, v.x, v.y); }
  createLinearGradient(v0, v1) { return this.c.createLinearGradient(v0.x, v0.y, v1.x, v1.y); }
  createRadialGradient(v0, r0, v1, r1) {
    return this.c.createRadialGradient(v0.x, v0.y, r0, v1.x, v1.y, r1);
  }
  createPattern(im, rep) { return this.c.createPattern(im, rep); }


}
