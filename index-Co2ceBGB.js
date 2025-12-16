(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
        ? (t.credentials = `omit`)
        : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
const e = {
    createVector: (e = 0, t = 0, n = 0) => ({ x: e, y: t, z: n }),
    add: (e, t) => ({ x: e.x + t.x, y: e.y + t.y, z: (e.z || 0) + (t.z || 0) }),
    sub: (e, t) => ({ x: e.x - t.x, y: e.y - t.y, z: (e.z || 0) - (t.z || 0) }),
    mult: (e, t) => ({ x: e.x * t, y: e.y * t, z: (e.z || 0) * t }),
    mag: (e) => Math.sqrt(e.x * e.x + e.y * e.y + (e.z || 0) * (e.z || 0)),
    normalize: (t) => {
      let n = e.mag(t);
      return n
        ? { x: t.x / n, y: t.y / n, z: (t.z || 0) / n }
        : { x: 0, y: 0, z: 0 };
    },
    copy: (e) => ({ x: e.x, y: e.y, z: e.z || 0 }),
    dist: (t, n) => e.mag(e.sub(t, n)),
    lerp: (e, t, n) => ({
      x: e.x + (t.x - e.x) * n,
      y: e.y + (t.y - e.y) * n,
      z: (e.z || 0) + ((t.z || 0) - (e.z || 0)) * n,
    }),
    limit: (t, n) => {
      let r = e.mag(t);
      return r > n
        ? { x: (t.x / r) * n, y: (t.y / r) * n, z: ((t.z || 0) / r) * n }
        : { x: t.x, y: t.y, z: t.z || 0 };
    },
    random2D: () => {
      let e = Math.random() * Math.PI * 2;
      return { x: Math.cos(e), y: Math.sin(e), z: 0 };
    },
    random3D: () => {
      let e = Math.random() * Math.PI * 2,
        t = Math.acos(2 * Math.random() - 1),
        n = Math.sin(t);
      return { x: n * Math.cos(e), y: n * Math.sin(e), z: Math.cos(t) };
    },
    fromAngle: (e, t = 1) => ({ x: Math.cos(e) * t, y: Math.sin(e) * t, z: 0 }),
    heading: (e) => Math.atan2(e.y, e.x),
  },
  t = {
    lerp: (e, t, n) => e * (1 - n) + n * t,
    clamp: (e = 0, t, n = 1) => Math.min(n, Math.max(e, t)),
    map: (e, t, n, r, i) => ((e - t) / (n - t)) * (i - r) + r,
    rand: (e, t) => Math.random() * (t - e) + e,
    randPosNeg: () => (Math.random() > 0.5 ? 1 : -1),
    getDist: (e, t, n, r) => Math.sqrt((n - e) ** 2 + (r - t) ** 2),
    randGaussian: (e = 0, t = 1) => {
      let n = Math.random(),
        r = Math.random();
      return Math.sqrt(-2 * Math.log(n)) * Math.cos(2 * Math.PI * r) * t + e;
    },
  };
var n = class e {
  constructor(e, t, n, r = 1) {
    (this.r = e), (this.g = t), (this.b = n), (this.a = r);
  }
  modR(e) {
    return (this.r = e), this;
  }
  modG(e) {
    return (this.g = e), this;
  }
  modB(e) {
    return (this.b = e), this;
  }
  modA(e) {
    return (this.a = e), this;
  }
  clone() {
    return new e(this.r, this.g, this.b, this.a);
  }
  toRGBA() {
    return `rgba(${this.r | 0},${this.g | 0},${this.b | 0},${this.a})`;
  }
  toHex(e = !1) {
    let t = ((this.r << 16) | (this.g << 8) | this.b)
      .toString(16)
      .padStart(6, `0`);
    return e
      ? `#${t}${Math.round(this.a * 255)
          .toString(16)
          .padStart(2, `0`)}`
      : `#${t}`;
  }
};
const r = {
    color(e) {
      if (e instanceof n) return e;
      if (typeof e == `object` && e)
        return new n(e.r ?? 0, e.g ?? 0, e.b ?? 0, e.a ?? 1);
      if (typeof e == `string`) {
        if (e.startsWith(`#`)) {
          let t = e.slice(1);
          return t.length === 8
            ? new n(
                parseInt(t.slice(0, 2), 16),
                parseInt(t.slice(2, 4), 16),
                parseInt(t.slice(4, 6), 16),
                parseInt(t.slice(6, 8), 16) / 255
              )
            : t.length === 3
            ? new n(
                parseInt(t[0] + t[0], 16),
                parseInt(t[1] + t[1], 16),
                parseInt(t[2] + t[2], 16),
                1
              )
            : new n(
                (parseInt(t, 16) >> 16) & 255,
                (parseInt(t, 16) >> 8) & 255,
                parseInt(t, 16) & 255,
                1
              );
        }
        let t = e.match(/[\d.]+/g);
        if (t)
          return new n(
            parseInt(t[0]),
            parseInt(t[1]),
            parseInt(t[2]),
            t[3] ? parseFloat(t[3]) : 1
          );
      }
      return new n(0, 0, 0, 1);
    },
    lerpColor(e, t, r) {
      return new n(
        (e.r + (t.r - e.r) * r) | 0,
        (e.g + (t.g - e.g) * r) | 0,
        (e.b + (t.b - e.b) * r) | 0,
        e.a + (t.a - e.a) * r
      );
    },
    paletteLerp(e, t) {
      t = Math.max(0, Math.min(1, t));
      let n = t * (e.length - 1),
        r = Math.floor(n),
        i = Math.ceil(n);
      return r === i ? e[r] : this.lerpColor(e[r], e[i], n - r);
    },
  },
  i = {
    linear: { in: (e) => e, out: (e) => e, inOut: (e) => e },
    quad: {
      in: (e) => e * e,
      out: (e) => 1 - (1 - e) * (1 - e),
      inOut: (e) => (e < 0.5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2),
    },
    sine: {
      in: (e) => 1 - Math.cos((e * Math.PI) / 2),
      out: (e) => Math.sin((e * Math.PI) / 2),
      inOut: (e) => -(Math.cos(Math.PI * e) - 1) / 2,
    },
    expo: {
      in: (e) => 2 ** (10 * (e - 1)),
      out: (e) => 1 - 2 ** (-10 * e),
      inOut: (e) =>
        e < 0.5
          ? 2 ** (10 * (e * 2 - 1)) / 2
          : (2 - 2 ** (-10 * (e * 2 - 1))) / 2,
    },
    cubic: {
      in: (e) => e * e * e,
      out: (e) => 1 - (1 - e) ** 3,
      inOut: (e) => (e < 0.5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2),
    },
    quart: {
      in: (e) => e * e * e * e,
      out: (e) => 1 - (1 - e) ** 4,
      inOut: (e) => (e < 0.5 ? 8 * e * e * e * e : 1 - (-2 * e + 2) ** 4 / 2),
    },
    quint: {
      in: (e) => e * e * e * e * e,
      out: (e) => 1 - (1 - e) ** 5,
      inOut: (e) =>
        e < 0.5 ? 16 * e * e * e * e * e : 1 - (-2 * e + 2) ** 5 / 2,
    },
    circ: {
      in: (e) => 1 - Math.sqrt(1 - e * e),
      out: (e) => Math.sqrt(1 - (e - 1) * (e - 1)),
      inOut: (e) =>
        e < 0.5
          ? (1 - Math.sqrt(1 - 4 * e * e)) / 2
          : (Math.sqrt(1 - 4 * (e - 1) * (e - 1)) + 1) / 2,
    },
    back: {
      in: (e) => e * e * (2.70158 * e - 1.70158),
      out: (e) => 1 - (1 - e) ** 2 * (2.70158 * (1 - e) - 1.70158),
      inOut: (e) => {
        let t = 1.70158 * 1.525;
        return e < 0.5
          ? ((2 * e) ** 2 * ((t + 1) * 2 * e - t)) / 2
          : ((2 * e - 2) ** 2 * ((t + 1) * (e * 2 - 2) + t) + 2) / 2;
      },
    },
  },
  a = ({
    progress: e,
    inEnd: t = 0.25,
    holdEnd: n = 0.75,
    maxValue: r = 1,
    easeInFunc: a = `sine`,
    easeOutFunc: o = `sine`,
  }) => {
    let s;
    if (e <= t) {
      let n = e / t;
      s = i[o].out(n) * r;
    } else if (e < n) s = r;
    else {
      let t = (e - n) / (1 - n),
        o = i[a].in(t);
      s = r - o * r;
    }
    return s;
  };
var o = class {
    constructor(n, r) {
      (this.idx = n),
        (this.system = r),
        (this.pointer = this.system.pointer),
        (this.size = this.system.CONFIG.size),
        (this.cnvW = this.system.cnv.width),
        (this.cnvH = this.system.cnv.height),
        (this.vel = e.createVector(0, 0)),
        (this.acc = e.createVector(0, 0)),
        (this.physics_pos = e.createVector(0, 0)),
        (this.radial_pos = e.createVector(0, 0)),
        (this.curr_pos = e.copy(this.system.center)),
        (this.start_progress = t.rand(0, 1)),
        (this.curr_progress = this.start_progress),
        (this.adjusted_progress = 0),
        (this.progress_speed = t.rand(0.9, 1)),
        (this.prev_progress = 0),
        (this.is_interacting_with_pointer = !1),
        (this.total_radius = this.system.ring_radius),
        (this.start_ang = t.rand(0, Math.PI * 2)),
        (this.ang_vel = 1),
        (this.center_dist = 0),
        (this.random_radius = t.rand(0.5, 1) * this.total_radius),
        (this.max_speed = 20),
        (this.max_force = 0.1),
        (this.silhouette_target = null);
    }
    update() {
      this.update_progress(),
        this.prev_progress > this.curr_progress &&
          ((this.curr_pos = e.copy(this.system.center)),
          (this.physics_pos = e.mult(this.physics_pos, 0)),
          (this.vel = e.mult(this.vel, 0)),
          (this.acc = e.mult(this.acc, 0)),
          this.system.silhouette_bounds &&
            (this.silhouette_target =
              this.system.silhouette_bounds.getRandomSilhouettePoint())),
        this.radial_motion(),
        this.system.CONFIG.pointer_action !== `none` &&
          this.pointer_interaction({
            range: this.system.CONFIG.pointer_range,
            strength: this.system.CONFIG.pointer_strength,
            action: this.system.CONFIG.pointer_action,
          }),
        this.is_interacting_with_pointer || this.calculate_blended_forces(),
        this.system.CONFIG.silhouette_hard_boundary &&
          this.handle_boundary_collision(),
        this.update_physics(),
        (this.curr_pos = e.add(this.radial_pos, this.physics_pos));
    }
    render() {
      this.update(), this.draw();
    }
    update_progress() {
      (this.prev_progress = this.curr_progress),
        (this.progress_speed = this.system.CONFIG.speed),
        (this.adjusted_progress += this.progress_speed),
        (this.curr_progress =
          (this.start_progress + this.adjusted_progress) % 1);
    }
    update_physics() {
      (this.vel = e.add(this.vel, this.acc)),
        (this.physics_pos = e.add(this.physics_pos, this.vel)),
        (this.acc = e.mult(this.acc, 0));
    }
    apply_force(t) {
      this.acc = e.add(this.acc, t);
    }
    pointer_interaction({
      activate_edge: t = 100,
      strength: n = 0.2,
      action: r = `attract`,
    }) {
      let i = e.sub(this.pointer.pos, this.curr_pos);
      if (e.mag(i) < t) {
        this.is_interacting_with_pointer = !0;
        let t = e.normalize(i),
          a = e.mult(t, n);
        if (r === `attract`) this.apply_force(a);
        else if (r === `repel`) {
          let t = e.mult(a, -1);
          this.apply_force(t);
        }
      } else this.is_interacting_with_pointer = !1;
    }
    seek_arrive({ target_vec: n, range: r = 350 }) {
      let i = e.sub(n, this.curr_pos),
        a = e.mag(i);
      if (a < r) {
        let n = t.map(a, 0, r, 0, this.max_speed);
        (i = e.normalize(i)), (i = e.mult(i, n));
      } else (i = e.normalize(i)), (i = e.mult(i, this.max_speed));
      let o = e.sub(i, this.vel);
      return (o = e.limit(o, this.max_force)), o;
    }
    calculate_blended_forces() {
      let t = this.system.CONFIG.silhouette_blend,
        n = this.seek_arrive({ target_vec: this.radial_pos }),
        r = e.createVector(0, 0);
      this.system.silhouette_bounds &&
        this.silhouette_target &&
        (r = this.seek_arrive({ target_vec: this.silhouette_target }));
      let i = e.lerp(n, r, t);
      this.apply_force(i), this.apply_edge_steering();
    }
    radial_motion() {
      let e = i[this.system.CONFIG.radial_ease_type][
          this.system.CONFIG.radial_ease_direction
        ](this.curr_progress),
        n = this.system.CONFIG.radial_ease_strength || 1,
        r = this.curr_progress * (1 - n) + e * n,
        a = this.system.frameCount * this.system.CONFIG.spin,
        o = this.start_ang + a,
        s = this.total_radius * this.system.CONFIG.ring_interior_edge;
      s *= this.system.CONFIG.tweened_radius_adj;
      let c = t.map(r, 0, 1, s, this.total_radius);
      (this.radial_pos.x = Math.cos(o) * c + this.system.center.x),
        (this.radial_pos.y = Math.sin(o) * c + this.system.center.y);
    }
    handle_boundary_collision() {
      if (
        !this.system.silhouette_bounds ||
        this.system.CONFIG.silhouette_blend <= 0
      )
        return;
      let n = e.add(this.curr_pos, this.vel);
      this.system.silhouette_bounds.isInsideBoundary(n.x, n.y) ||
        ((this.vel = e.mult(this.vel, -0.5)),
        (this.vel.x += t.rand(-0.5, 0.5)),
        (this.vel.y += t.rand(-0.5, 0.5)));
    }
    apply_edge_steering() {
      if (
        !this.system.silhouette_bounds ||
        this.system.CONFIG.silhouette_blend <= 0
      )
        return;
      let e = this.system.silhouette_bounds.getDistance(
        this.curr_pos.x,
        this.curr_pos.y
      );
      if (e > -1) {
        let n = this.system.silhouette_bounds.getEdgeNormal(
            this.curr_pos.x,
            this.curr_pos.y
          ),
          r = t.map(e, -1, 0, 0, 1),
          i = t.clamp(0, r, 1),
          a = this.system.CONFIG.edge_steering_strength,
          o = { x: n.x * i * a, y: n.y * i * a };
        this.apply_force(o);
      }
    }
    calculate_size() {
      let n = a({
          progress: this.curr_progress,
          inEnd: 0.1,
          holdEnd: 0.65,
          maxValue: 1,
          easeInFunc: `circ`,
          easeOutFunc: `sine`,
        }),
        r = e.mag(e.mult(this.vel, 2)),
        i = t.map(r, 0.01, this.max_speed, 1, this.system.CONFIG.size * 1.5);
      (this.size = this.system.CONFIG.size * n * i),
        (this.size = t.clamp(0.1, this.size, this.system.CONFIG.size * 5));
    }
    calculate_color() {
      (this.color = r.lerpColor(
        this.system.color2,
        this.system.color1,
        this.curr_progress
      )),
        this.color.modA(0.65);
    }
    draw() {
      this.calculate_size(),
        this.calculate_color(),
        (this.system.ctx.fillStyle = this.color.toRGBA()),
        this.system.ctx.beginPath(),
        this.system.ctx.arc(
          this.curr_pos.x,
          this.curr_pos.y,
          this.size,
          0,
          Math.PI * 2
        ),
        this.system.ctx.fill();
    }
    debugParticle({
      idx: e = 0,
      logRate: t = 10,
      action: n = () => console.log(`debugging particle`),
    }) {
      this.idx === e && this.system.time % t === 0 && n();
    }
  },
  s = class {
    constructor({
      imgUrl: e,
      imgElementSelector: t,
      canvasDims: n,
      threshold: r = 127,
    }) {
      if (((this.imgElement = document.querySelector(t)), !this.imgElement))
        throw Error(`Silhouette image element not found: ${t}`);
      (this.canvasWidth = n.width),
        (this.canvasHeight = n.height),
        (this.offscreenCanvas = document.createElement(`canvas`)),
        (this.offscreenCtx = this.offscreenCanvas.getContext(`2d`, {
          willReadFrequently: !0,
        })),
        (this.ready = this.loadAndExtract(e, r)),
        (this.pixels = null),
        (this.validPoints = []),
        (this.distanceField = null),
        (this.edgeNormals = null);
    }
    async loadAndExtract(e, t) {
      let n = new Image();
      (n.crossOrigin = `anonymous`), (n.src = e), await n.decode();
      let r = n.height / n.width,
        i = Math.round(300 * r);
      (this.offscreenCanvas.width = 300),
        (this.offscreenCanvas.height = i),
        this.offscreenCtx.drawImage(n, 0, 0, 300, i);
      let a = this.offscreenCtx.getImageData(0, 0, 300, i);
      (this.pixels = new Uint8Array(300 * i)), (this.validPoints = []);
      for (let e = 0; e < a.data.length; e += 4) {
        let n = a.data[e],
          r = a.data[e + 1],
          i = a.data[e + 2],
          o = a.data[e + 3],
          s = (n + r + i) / 3,
          c = e / 4,
          l = s <= t && o >= 127;
        if (((this.pixels[c] = l ? 1 : 0), l)) {
          let e = c % 300,
            t = Math.floor(c / 300);
          this.validPoints.push({ x: e, y: t });
        }
      }
      (this.width = 300),
        (this.height = i),
        this.computeSDF(),
        this.updateImageBounds();
    }
    computeSDF() {
      let e = this.width,
        t = this.height,
        n = Math.sqrt(e * e + t * t);
      (this.distanceField = new Float32Array(e * t)),
        (this.edgeNormals = new Float32Array(e * t * 2));
      for (let r = 0; r < t; r++)
        for (let i = 0; i < e; i++) {
          let a = r * e + i,
            o = this.pixels[a] === 1,
            s = n,
            c = i,
            l = r;
          for (let n = -15; n <= 15; n++)
            for (let a = -15; a <= 15; a++) {
              let u = i + a,
                d = r + n;
              if (u < 0 || u >= e || d < 0 || d >= t) continue;
              let f = d * e + u,
                p = this.pixels[f] === 1;
              if (o !== p) {
                let e = Math.sqrt(a * a + n * n);
                if (e < s && ((s = e), (c = u), (l = d), s < 3)) break;
              }
            }
          if (((this.distanceField[a] = o ? -s : s), s < n)) {
            let e = i - c,
              t = r - l,
              n = Math.sqrt(e * e + t * t) || 1,
              s = o ? e / n : -e / n,
              u = o ? t / n : -t / n;
            (this.edgeNormals[a * 2] = s), (this.edgeNormals[a * 2 + 1] = u);
          }
        }
    }
    getDistance(e, t) {
      let n = this.canvasToPixelCoords(e, t);
      if (!n) return 999;
      let r = n.y * this.width + n.x;
      return this.distanceField[r];
    }
    getEdgeNormal(e, t) {
      let n = this.canvasToPixelCoords(e, t);
      if (!n) return { x: 0, y: 0 };
      let r = n.y * this.width + n.x;
      return { x: this.edgeNormals[r * 2], y: this.edgeNormals[r * 2 + 1] };
    }
    updateImageBounds() {
      let e = this.imgElement.getBoundingClientRect();
      (this.imgRect = {
        left: e.left,
        top: e.top,
        width: e.width,
        height: e.height,
      }),
        (this.centerCanvas = {
          x: e.left + e.width / 2,
          y: e.top + e.height / 2,
        });
    }
    canvasToPixelCoords(e, t) {
      let n = e - this.imgRect.left,
        r = t - this.imgRect.top,
        i = Math.floor((n / this.imgRect.width) * this.width),
        a = Math.floor((r / this.imgRect.height) * this.height);
      return i < 0 || i >= this.width || a < 0 || a >= this.height
        ? null
        : { x: i, y: a };
    }
    getRandomSilhouettePoint() {
      if (this.validPoints.length === 0) return this.getCenter();
      let e =
          this.validPoints[Math.floor(Math.random() * this.validPoints.length)],
        t = this.imgRect.left + (e.x / this.width) * this.imgRect.width,
        n = this.imgRect.top + (e.y / this.height) * this.imgRect.height;
      return { x: t, y: n };
    }
    isInsideBoundary(e, t) {
      let n = this.canvasToPixelCoords(e, t);
      if (!n) return !1;
      let r = n.y * this.width + n.x;
      return this.pixels[r] === 1;
    }
    getCenter() {
      return { ...this.centerCanvas };
    }
    updateCanvasDims(e, t) {
      (this.canvasWidth = e), (this.canvasHeight = t), this.updateImageBounds();
    }
  },
  c = class {
    constructor(t, n, r, i, a = null) {
      (this.particles = []),
        (this.cnv = t),
        (this.cnv_container = this.cnv.parentElement),
        (this.CONFIG = r),
        (this.pointer = i),
        (this.particle_positioner = n),
        (this.pp_dims = this.particle_positioner.getBoundingClientRect()),
        (this.ring_interior_edge = this.CONFIG.ring_interior_edge),
        (this.ctx = this.cnv.getContext(`2d`)),
        (this.center = e.createVector()),
        (this.frameCount = 0),
        (this.silhouetteConfig = a),
        (this.silhouette_bounds = null),
        (this.ready = this.init()),
        (this.introDone = !1),
        (this.introStarted = !1),
        this.updateColors();
    }
    updateColors() {
      (this.bgColor = r.color(this.CONFIG.bg_color)),
        this.bgColor.modA(this.CONFIG.bg_color_alpha),
        (this.bgColor = this.bgColor.toRGBA()),
        (this.color1 = r.color(this.CONFIG.color1)),
        (this.color2 = r.color(this.CONFIG.color2));
    }
    clearCanvas() {
      (this.ctx.fillStyle = this.CONFIG.bg_color),
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    }
    resizeCanvasOnly() {
      (this.cnv.width = window.innerWidth),
        (this.cnv.height = window.innerHeight),
        this.silhouette_bounds &&
          this.silhouette_bounds.updateCanvasDims(
            this.cnv.width,
            this.cnv.height
          );
    }
    sizeCanvas() {
      (this.pp_dims = this.particle_positioner.getBoundingClientRect()),
        (this.ring_radius = this.pp_dims.width / 2),
        (this.cnv.width = window.innerWidth),
        (this.cnv.height = window.innerHeight);
      let t = this.ring_center ? e.copy(this.ring_center) : null;
      this.ring_center = e.createVector(
        this.pp_dims.left + this.pp_dims.width / 2,
        this.pp_dims.top + this.pp_dims.height / 2
      );
      let n = !this.center.x && !this.center.y,
        r = t && e.dist(t, this.ring_center) > 50;
      (n || r) && (this.center = e.copy(this.ring_center)),
        this.silhouette_bounds &&
          this.silhouette_bounds.updateCanvasDims(
            this.cnv.width,
            this.cnv.height
          );
    }
    setParticleSize() {
      for (let e of this.particles) e.size = t.rand(0.1, this.CONFIG.size);
    }
    async init() {
      this.sizeCanvas();
      let e = {
        imgUrl: this.silhouetteConfig.imgUrl,
        imgElementSelector: this.silhouetteConfig.imgSelector,
        canvasDims: { width: this.cnv.width, height: this.cnv.height },
        threshold: this.silhouetteConfig.threshold,
      };
      this.silhouetteConfig &&
        ((this.silhouette_bounds = new s(e)),
        await this.silhouette_bounds.ready),
        (this.introStarted = !0);
    }
    systemIntro() {
      if (this.introStarted && !this.introDone)
        if (this.particles.length < this.CONFIG.count) {
          for (let e = 0; e < 50; e++)
            this.particles.push(
              new o(this.particles.length - 1, this, this.CONFIG, this.pointer)
            );
          this.particles.push(
            new o(this.particles.length - 1, this, this.CONFIG, this.pointer)
          );
        } else this.introDone = !1;
    }
    update(t) {
      (this.frameCount = t), this.systemIntro();
      let n;
      if (this.silhouette_bounds && this.CONFIG.silhouette_blend > 0) {
        let t = this.silhouette_bounds.getCenter();
        n = e.lerp(
          this.ring_center,
          e.createVector(t.x, t.y),
          this.CONFIG.silhouette_blend
        );
      } else n = e.copy(this.ring_center);
      this.center = e.lerp(this.center, n, 0.01);
      for (let e of this.particles) e.update();
    }
    draw() {
      (this.ctx.fillStyle = this.bgColor),
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height),
        this.ctx.save(),
        (this.ctx.globalCompositeOperation = this.CONFIG.blend_mode);
      for (let e of this.particles) e.draw();
      this.ctx.restore();
    }
    render(e) {
      this.update(e), this.draw();
    }
  },
  l = class e {
    constructor(t, n, r, i, a = `div`) {
      (this.parent = t),
        (this.object = n),
        (this.property = r),
        (this._disabled = !1),
        (this._hidden = !1),
        (this.initialValue = this.getValue()),
        (this.domElement = document.createElement(a)),
        this.domElement.classList.add(`lil-controller`),
        this.domElement.classList.add(i),
        (this.$name = document.createElement(`div`)),
        this.$name.classList.add(`lil-name`),
        (e.nextNameID = e.nextNameID || 0),
        (this.$name.id = `lil-gui-name-${++e.nextNameID}`),
        (this.$widget = document.createElement(`div`)),
        this.$widget.classList.add(`lil-widget`),
        (this.$disable = this.$widget),
        this.domElement.appendChild(this.$name),
        this.domElement.appendChild(this.$widget),
        this.domElement.addEventListener(`keydown`, (e) => e.stopPropagation()),
        this.domElement.addEventListener(`keyup`, (e) => e.stopPropagation()),
        this.parent.children.push(this),
        this.parent.controllers.push(this),
        this.parent.$children.appendChild(this.domElement),
        (this._listenCallback = this._listenCallback.bind(this)),
        this.name(r);
    }
    name(e) {
      return (this._name = e), (this.$name.textContent = e), this;
    }
    onChange(e) {
      return (this._onChange = e), this;
    }
    _callOnChange() {
      this.parent._callOnChange(this),
        this._onChange !== void 0 && this._onChange.call(this, this.getValue()),
        (this._changed = !0);
    }
    onFinishChange(e) {
      return (this._onFinishChange = e), this;
    }
    _callOnFinishChange() {
      this._changed &&
        (this.parent._callOnFinishChange(this),
        this._onFinishChange !== void 0 &&
          this._onFinishChange.call(this, this.getValue())),
        (this._changed = !1);
    }
    reset() {
      return this.setValue(this.initialValue), this._callOnFinishChange(), this;
    }
    enable(e = !0) {
      return this.disable(!e);
    }
    disable(e = !0) {
      return e === this._disabled
        ? this
        : ((this._disabled = e),
          this.domElement.classList.toggle(`lil-disabled`, e),
          this.$disable.toggleAttribute(`disabled`, e),
          this);
    }
    show(e = !0) {
      return (
        (this._hidden = !e),
        (this.domElement.style.display = this._hidden ? `none` : ``),
        this
      );
    }
    hide() {
      return this.show(!1);
    }
    options(e) {
      let t = this.parent.add(this.object, this.property, e);
      return t.name(this._name), this.destroy(), t;
    }
    min(e) {
      return this;
    }
    max(e) {
      return this;
    }
    step(e) {
      return this;
    }
    decimals(e) {
      return this;
    }
    listen(e = !0) {
      return (
        (this._listening = e),
        this._listenCallbackID !== void 0 &&
          (cancelAnimationFrame(this._listenCallbackID),
          (this._listenCallbackID = void 0)),
        this._listening && this._listenCallback(),
        this
      );
    }
    _listenCallback() {
      this._listenCallbackID = requestAnimationFrame(this._listenCallback);
      let e = this.save();
      e !== this._listenPrevValue && this.updateDisplay(),
        (this._listenPrevValue = e);
    }
    getValue() {
      return this.object[this.property];
    }
    setValue(e) {
      return (
        this.getValue() !== e &&
          ((this.object[this.property] = e),
          this._callOnChange(),
          this.updateDisplay()),
        this
      );
    }
    updateDisplay() {
      return this;
    }
    load(e) {
      return this.setValue(e), this._callOnFinishChange(), this;
    }
    save() {
      return this.getValue();
    }
    destroy() {
      this.listen(!1),
        this.parent.children.splice(this.parent.children.indexOf(this), 1),
        this.parent.controllers.splice(
          this.parent.controllers.indexOf(this),
          1
        ),
        this.parent.$children.removeChild(this.domElement);
    }
  },
  u = class extends l {
    constructor(e, t, n) {
      super(e, t, n, `lil-boolean`, `label`),
        (this.$input = document.createElement(`input`)),
        this.$input.setAttribute(`type`, `checkbox`),
        this.$input.setAttribute(`aria-labelledby`, this.$name.id),
        this.$widget.appendChild(this.$input),
        this.$input.addEventListener(`change`, () => {
          this.setValue(this.$input.checked), this._callOnFinishChange();
        }),
        (this.$disable = this.$input),
        this.updateDisplay();
    }
    updateDisplay() {
      return (this.$input.checked = this.getValue()), this;
    }
  };
function d(e) {
  let t, n;
  return (
    (t = e.match(/(#|0x)?([a-f0-9]{6})/i))
      ? (n = t[2])
      : (t = e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))
      ? (n =
          parseInt(t[1]).toString(16).padStart(2, 0) +
          parseInt(t[2]).toString(16).padStart(2, 0) +
          parseInt(t[3]).toString(16).padStart(2, 0))
      : (t = e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) &&
        (n = t[1] + t[1] + t[2] + t[2] + t[3] + t[3]),
    n ? `#` + n : !1
  );
}
var f = {
    isPrimitive: !0,
    match: (e) => typeof e == `string`,
    fromHexString: d,
    toHexString: d,
  },
  p = {
    isPrimitive: !0,
    match: (e) => typeof e == `number`,
    fromHexString: (e) => parseInt(e.substring(1), 16),
    toHexString: (e) => `#` + e.toString(16).padStart(6, 0),
  },
  m = [
    f,
    p,
    {
      isPrimitive: !1,
      match: (e) => Array.isArray(e) || ArrayBuffer.isView(e),
      fromHexString(e, t, n = 1) {
        let r = p.fromHexString(e);
        (t[0] = (((r >> 16) & 255) / 255) * n),
          (t[1] = (((r >> 8) & 255) / 255) * n),
          (t[2] = ((r & 255) / 255) * n);
      },
      toHexString([e, t, n], r = 1) {
        r = 255 / r;
        let i = ((e * r) << 16) ^ ((t * r) << 8) ^ ((n * r) << 0);
        return p.toHexString(i);
      },
    },
    {
      isPrimitive: !1,
      match: (e) => Object(e) === e,
      fromHexString(e, t, n = 1) {
        let r = p.fromHexString(e);
        (t.r = (((r >> 16) & 255) / 255) * n),
          (t.g = (((r >> 8) & 255) / 255) * n),
          (t.b = ((r & 255) / 255) * n);
      },
      toHexString({ r: e, g: t, b: n }, r = 1) {
        r = 255 / r;
        let i = ((e * r) << 16) ^ ((t * r) << 8) ^ ((n * r) << 0);
        return p.toHexString(i);
      },
    },
  ];
function h(e) {
  return m.find((t) => t.match(e));
}
var g = class extends l {
    constructor(e, t, n, r) {
      super(e, t, n, `lil-color`),
        (this.$input = document.createElement(`input`)),
        this.$input.setAttribute(`type`, `color`),
        this.$input.setAttribute(`tabindex`, -1),
        this.$input.setAttribute(`aria-labelledby`, this.$name.id),
        (this.$text = document.createElement(`input`)),
        this.$text.setAttribute(`type`, `text`),
        this.$text.setAttribute(`spellcheck`, `false`),
        this.$text.setAttribute(`aria-labelledby`, this.$name.id),
        (this.$display = document.createElement(`div`)),
        this.$display.classList.add(`lil-display`),
        this.$display.appendChild(this.$input),
        this.$widget.appendChild(this.$display),
        this.$widget.appendChild(this.$text),
        (this._format = h(this.initialValue)),
        (this._rgbScale = r),
        (this._initialValueHexString = this.save()),
        (this._textFocused = !1),
        this.$input.addEventListener(`input`, () => {
          this._setValueFromHexString(this.$input.value);
        }),
        this.$input.addEventListener(`blur`, () => {
          this._callOnFinishChange();
        }),
        this.$text.addEventListener(`input`, () => {
          let e = d(this.$text.value);
          e && this._setValueFromHexString(e);
        }),
        this.$text.addEventListener(`focus`, () => {
          (this._textFocused = !0), this.$text.select();
        }),
        this.$text.addEventListener(`blur`, () => {
          (this._textFocused = !1),
            this.updateDisplay(),
            this._callOnFinishChange();
        }),
        (this.$disable = this.$text),
        this.updateDisplay();
    }
    reset() {
      return this._setValueFromHexString(this._initialValueHexString), this;
    }
    _setValueFromHexString(e) {
      if (this._format.isPrimitive) {
        let t = this._format.fromHexString(e);
        this.setValue(t);
      } else
        this._format.fromHexString(e, this.getValue(), this._rgbScale),
          this._callOnChange(),
          this.updateDisplay();
    }
    save() {
      return this._format.toHexString(this.getValue(), this._rgbScale);
    }
    load(e) {
      return this._setValueFromHexString(e), this._callOnFinishChange(), this;
    }
    updateDisplay() {
      return (
        (this.$input.value = this._format.toHexString(
          this.getValue(),
          this._rgbScale
        )),
        this._textFocused ||
          (this.$text.value = this.$input.value.substring(1)),
        (this.$display.style.backgroundColor = this.$input.value),
        this
      );
    }
  },
  _ = class extends l {
    constructor(e, t, n) {
      super(e, t, n, `lil-function`),
        (this.$button = document.createElement(`button`)),
        this.$button.appendChild(this.$name),
        this.$widget.appendChild(this.$button),
        this.$button.addEventListener(`click`, (e) => {
          e.preventDefault(),
            this.getValue().call(this.object),
            this._callOnChange();
        }),
        this.$button.addEventListener(`touchstart`, () => {}, { passive: !0 }),
        (this.$disable = this.$button);
    }
  },
  v = class extends l {
    constructor(e, t, n, r, i, a) {
      super(e, t, n, `lil-number`), this._initInput(), this.min(r), this.max(i);
      let o = a !== void 0;
      this.step(o ? a : this._getImplicitStep(), o), this.updateDisplay();
    }
    decimals(e) {
      return (this._decimals = e), this.updateDisplay(), this;
    }
    min(e) {
      return (this._min = e), this._onUpdateMinMax(), this;
    }
    max(e) {
      return (this._max = e), this._onUpdateMinMax(), this;
    }
    step(e, t = !0) {
      return (this._step = e), (this._stepExplicit = t), this;
    }
    updateDisplay() {
      let e = this.getValue();
      if (this._hasSlider) {
        let t = (e - this._min) / (this._max - this._min);
        (t = Math.max(0, Math.min(t, 1))),
          (this.$fill.style.width = t * 100 + `%`);
      }
      return (
        this._inputFocused ||
          (this.$input.value =
            this._decimals === void 0 ? e : e.toFixed(this._decimals)),
        this
      );
    }
    _initInput() {
      (this.$input = document.createElement(`input`)),
        this.$input.setAttribute(`type`, `text`),
        this.$input.setAttribute(`aria-labelledby`, this.$name.id),
        window.matchMedia(`(pointer: coarse)`).matches &&
          (this.$input.setAttribute(`type`, `number`),
          this.$input.setAttribute(`step`, `any`)),
        this.$widget.appendChild(this.$input),
        (this.$disable = this.$input);
      let e = () => {
          let e = parseFloat(this.$input.value);
          isNaN(e) ||
            (this._stepExplicit && (e = this._snap(e)),
            this.setValue(this._clamp(e)));
        },
        t = (e) => {
          let t = parseFloat(this.$input.value);
          isNaN(t) ||
            (this._snapClampSetValue(t + e),
            (this.$input.value = this.getValue()));
        },
        n = (e) => {
          e.key === `Enter` && this.$input.blur(),
            e.code === `ArrowUp` &&
              (e.preventDefault(), t(this._step * this._arrowKeyMultiplier(e))),
            e.code === `ArrowDown` &&
              (e.preventDefault(),
              t(this._step * this._arrowKeyMultiplier(e) * -1));
        },
        r = (e) => {
          this._inputFocused &&
            (e.preventDefault(), t(this._step * this._normalizeMouseWheel(e)));
        },
        i = !1,
        a,
        o,
        s,
        c,
        l,
        u = (e) => {
          (a = e.clientX),
            (o = s = e.clientY),
            (i = !0),
            (c = this.getValue()),
            (l = 0),
            window.addEventListener(`mousemove`, d),
            window.addEventListener(`mouseup`, f);
        },
        d = (e) => {
          if (i) {
            let t = e.clientX - a,
              n = e.clientY - o;
            Math.abs(n) > 5
              ? (e.preventDefault(),
                this.$input.blur(),
                (i = !1),
                this._setDraggingStyle(!0, `vertical`))
              : Math.abs(t) > 5 && f();
          }
          if (!i) {
            let t = e.clientY - s;
            (l -= t * this._step * this._arrowKeyMultiplier(e)),
              c + l > this._max
                ? (l = this._max - c)
                : c + l < this._min && (l = this._min - c),
              this._snapClampSetValue(c + l);
          }
          s = e.clientY;
        },
        f = () => {
          this._setDraggingStyle(!1, `vertical`),
            this._callOnFinishChange(),
            window.removeEventListener(`mousemove`, d),
            window.removeEventListener(`mouseup`, f);
        };
      this.$input.addEventListener(`input`, e),
        this.$input.addEventListener(`keydown`, n),
        this.$input.addEventListener(`wheel`, r, { passive: !1 }),
        this.$input.addEventListener(`mousedown`, u),
        this.$input.addEventListener(`focus`, () => {
          this._inputFocused = !0;
        }),
        this.$input.addEventListener(`blur`, () => {
          (this._inputFocused = !1),
            this.updateDisplay(),
            this._callOnFinishChange();
        });
    }
    _initSlider() {
      (this._hasSlider = !0),
        (this.$slider = document.createElement(`div`)),
        this.$slider.classList.add(`lil-slider`),
        (this.$fill = document.createElement(`div`)),
        this.$fill.classList.add(`lil-fill`),
        this.$slider.appendChild(this.$fill),
        this.$widget.insertBefore(this.$slider, this.$input),
        this.domElement.classList.add(`lil-has-slider`);
      let e = (e, t, n, r, i) => ((e - t) / (n - t)) * (i - r) + r,
        t = (t) => {
          let n = this.$slider.getBoundingClientRect(),
            r = e(t, n.left, n.right, this._min, this._max);
          this._snapClampSetValue(r);
        },
        n = (e) => {
          this._setDraggingStyle(!0),
            t(e.clientX),
            window.addEventListener(`mousemove`, r),
            window.addEventListener(`mouseup`, i);
        },
        r = (e) => {
          t(e.clientX);
        },
        i = () => {
          this._callOnFinishChange(),
            this._setDraggingStyle(!1),
            window.removeEventListener(`mousemove`, r),
            window.removeEventListener(`mouseup`, i);
        },
        a = !1,
        o,
        s,
        c = (e) => {
          e.preventDefault(),
            this._setDraggingStyle(!0),
            t(e.touches[0].clientX),
            (a = !1);
        },
        l = (e) => {
          e.touches.length > 1 ||
            (this._hasScrollBar
              ? ((o = e.touches[0].clientX),
                (s = e.touches[0].clientY),
                (a = !0))
              : c(e),
            window.addEventListener(`touchmove`, u, { passive: !1 }),
            window.addEventListener(`touchend`, d));
        },
        u = (e) => {
          if (a) {
            let t = e.touches[0].clientX - o,
              n = e.touches[0].clientY - s;
            Math.abs(t) > Math.abs(n)
              ? c(e)
              : (window.removeEventListener(`touchmove`, u),
                window.removeEventListener(`touchend`, d));
          } else e.preventDefault(), t(e.touches[0].clientX);
        },
        d = () => {
          this._callOnFinishChange(),
            this._setDraggingStyle(!1),
            window.removeEventListener(`touchmove`, u),
            window.removeEventListener(`touchend`, d);
        },
        f = this._callOnFinishChange.bind(this),
        p;
      this.$slider.addEventListener(`mousedown`, n),
        this.$slider.addEventListener(`touchstart`, l, { passive: !1 }),
        this.$slider.addEventListener(
          `wheel`,
          (e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && this._hasScrollBar)
              return;
            e.preventDefault();
            let t = this._normalizeMouseWheel(e) * this._step;
            this._snapClampSetValue(this.getValue() + t),
              (this.$input.value = this.getValue()),
              clearTimeout(p),
              (p = setTimeout(f, 400));
          },
          { passive: !1 }
        );
    }
    _setDraggingStyle(e, t = `horizontal`) {
      this.$slider && this.$slider.classList.toggle(`lil-active`, e),
        document.body.classList.toggle(`lil-dragging`, e),
        document.body.classList.toggle(`lil-${t}`, e);
    }
    _getImplicitStep() {
      return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
    }
    _onUpdateMinMax() {
      !this._hasSlider &&
        this._hasMin &&
        this._hasMax &&
        (this._stepExplicit || this.step(this._getImplicitStep(), !1),
        this._initSlider(),
        this.updateDisplay());
    }
    _normalizeMouseWheel(e) {
      let { deltaX: t, deltaY: n } = e;
      return (
        Math.floor(e.deltaY) !== e.deltaY &&
          e.wheelDelta &&
          ((t = 0),
          (n = -e.wheelDelta / 120),
          (n *= this._stepExplicit ? 1 : 10)),
        t + -n
      );
    }
    _arrowKeyMultiplier(e) {
      let t = this._stepExplicit ? 1 : 10;
      return e.shiftKey ? (t *= 10) : e.altKey && (t /= 10), t;
    }
    _snap(e) {
      let t = 0;
      return (
        this._hasMin ? (t = this._min) : this._hasMax && (t = this._max),
        (e -= t),
        (e = Math.round(e / this._step) * this._step),
        (e += t),
        (e = parseFloat(e.toPrecision(15))),
        e
      );
    }
    _clamp(e) {
      return (
        e < this._min && (e = this._min), e > this._max && (e = this._max), e
      );
    }
    _snapClampSetValue(e) {
      this.setValue(this._clamp(this._snap(e)));
    }
    get _hasScrollBar() {
      let e = this.parent.root.$children;
      return e.scrollHeight > e.clientHeight;
    }
    get _hasMin() {
      return this._min !== void 0;
    }
    get _hasMax() {
      return this._max !== void 0;
    }
  },
  y = class extends l {
    constructor(e, t, n, r) {
      super(e, t, n, `lil-option`),
        (this.$select = document.createElement(`select`)),
        this.$select.setAttribute(`aria-labelledby`, this.$name.id),
        (this.$display = document.createElement(`div`)),
        this.$display.classList.add(`lil-display`),
        this.$select.addEventListener(`change`, () => {
          this.setValue(this._values[this.$select.selectedIndex]),
            this._callOnFinishChange();
        }),
        this.$select.addEventListener(`focus`, () => {
          this.$display.classList.add(`lil-focus`);
        }),
        this.$select.addEventListener(`blur`, () => {
          this.$display.classList.remove(`lil-focus`);
        }),
        this.$widget.appendChild(this.$select),
        this.$widget.appendChild(this.$display),
        (this.$disable = this.$select),
        this.options(r);
    }
    options(e) {
      return (
        (this._values = Array.isArray(e) ? e : Object.values(e)),
        (this._names = Array.isArray(e) ? e : Object.keys(e)),
        this.$select.replaceChildren(),
        this._names.forEach((e) => {
          let t = document.createElement(`option`);
          (t.textContent = e), this.$select.appendChild(t);
        }),
        this.updateDisplay(),
        this
      );
    }
    updateDisplay() {
      let e = this.getValue(),
        t = this._values.indexOf(e);
      return (
        (this.$select.selectedIndex = t),
        (this.$display.textContent = t === -1 ? e : this._names[t]),
        this
      );
    }
  },
  b = class extends l {
    constructor(e, t, n) {
      super(e, t, n, `lil-string`),
        (this.$input = document.createElement(`input`)),
        this.$input.setAttribute(`type`, `text`),
        this.$input.setAttribute(`spellcheck`, `false`),
        this.$input.setAttribute(`aria-labelledby`, this.$name.id),
        this.$input.addEventListener(`input`, () => {
          this.setValue(this.$input.value);
        }),
        this.$input.addEventListener(`keydown`, (e) => {
          e.code === `Enter` && this.$input.blur();
        }),
        this.$input.addEventListener(`blur`, () => {
          this._callOnFinishChange();
        }),
        this.$widget.appendChild(this.$input),
        (this.$disable = this.$input),
        this.updateDisplay();
    }
    updateDisplay() {
      return (this.$input.value = this.getValue()), this;
    }
  },
  x = `.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;
function S(e) {
  let t = document.createElement(`style`);
  t.innerHTML = e;
  let n = document.querySelector(`head link[rel=stylesheet], head style`);
  n ? document.head.insertBefore(t, n) : document.head.appendChild(t);
}
var C = !1,
  w = class e {
    constructor({
      parent: e,
      autoPlace: t = e === void 0,
      container: n,
      width: r,
      title: i = `Controls`,
      closeFolders: a = !1,
      injectStyles: o = !0,
      touchStyles: s = !0,
    } = {}) {
      if (
        ((this.parent = e),
        (this.root = e ? e.root : this),
        (this.children = []),
        (this.controllers = []),
        (this.folders = []),
        (this._closed = !1),
        (this._hidden = !1),
        (this.domElement = document.createElement(`div`)),
        this.domElement.classList.add(`lil-gui`),
        (this.$title = document.createElement(`button`)),
        this.$title.classList.add(`lil-title`),
        this.$title.setAttribute(`aria-expanded`, !0),
        this.$title.addEventListener(`click`, () =>
          this.openAnimated(this._closed)
        ),
        this.$title.addEventListener(`touchstart`, () => {}, { passive: !0 }),
        (this.$children = document.createElement(`div`)),
        this.$children.classList.add(`lil-children`),
        this.domElement.appendChild(this.$title),
        this.domElement.appendChild(this.$children),
        this.title(i),
        this.parent)
      ) {
        this.parent.children.push(this),
          this.parent.folders.push(this),
          this.parent.$children.appendChild(this.domElement);
        return;
      }
      this.domElement.classList.add(`lil-root`),
        s && this.domElement.classList.add(`lil-allow-touch-styles`),
        !C && o && (S(x), (C = !0)),
        n
          ? n.appendChild(this.domElement)
          : t &&
            (this.domElement.classList.add(`lil-auto-place`, `autoPlace`),
            document.body.appendChild(this.domElement)),
        r && this.domElement.style.setProperty(`--width`, r + `px`),
        (this._closeFolders = a);
    }
    add(e, t, n, r, i) {
      if (Object(n) === n) return new y(this, e, t, n);
      let a = e[t];
      switch (typeof a) {
        case `number`:
          return new v(this, e, t, n, r, i);
        case `boolean`:
          return new u(this, e, t);
        case `string`:
          return new b(this, e, t);
        case `function`:
          return new _(this, e, t);
      }
      console.error(
        `gui.add failed
	property:`,
        t,
        `
	object:`,
        e,
        `
	value:`,
        a
      );
    }
    addColor(e, t, n = 1) {
      return new g(this, e, t, n);
    }
    addFolder(t) {
      let n = new e({ parent: this, title: t });
      return this.root._closeFolders && n.close(), n;
    }
    load(e, t = !0) {
      return (
        e.controllers &&
          this.controllers.forEach((t) => {
            t instanceof _ ||
              (t._name in e.controllers && t.load(e.controllers[t._name]));
          }),
        t &&
          e.folders &&
          this.folders.forEach((t) => {
            t._title in e.folders && t.load(e.folders[t._title]);
          }),
        this
      );
    }
    save(e = !0) {
      let t = { controllers: {}, folders: {} };
      return (
        this.controllers.forEach((e) => {
          if (!(e instanceof _)) {
            if (e._name in t.controllers)
              throw Error(
                `Cannot save GUI with duplicate property "${e._name}"`
              );
            t.controllers[e._name] = e.save();
          }
        }),
        e &&
          this.folders.forEach((e) => {
            if (e._title in t.folders)
              throw Error(
                `Cannot save GUI with duplicate folder "${e._title}"`
              );
            t.folders[e._title] = e.save();
          }),
        t
      );
    }
    open(e = !0) {
      return (
        this._setClosed(!e),
        this.$title.setAttribute(`aria-expanded`, !this._closed),
        this.domElement.classList.toggle(`lil-closed`, this._closed),
        this
      );
    }
    close() {
      return this.open(!1);
    }
    _setClosed(e) {
      this._closed !== e && ((this._closed = e), this._callOnOpenClose(this));
    }
    show(e = !0) {
      return (
        (this._hidden = !e),
        (this.domElement.style.display = this._hidden ? `none` : ``),
        this
      );
    }
    hide() {
      return this.show(!1);
    }
    openAnimated(e = !0) {
      return (
        this._setClosed(!e),
        this.$title.setAttribute(`aria-expanded`, !this._closed),
        requestAnimationFrame(() => {
          let t = this.$children.clientHeight;
          (this.$children.style.height = t + `px`),
            this.domElement.classList.add(`lil-transition`);
          let n = (e) => {
            e.target === this.$children &&
              ((this.$children.style.height = ``),
              this.domElement.classList.remove(`lil-transition`),
              this.$children.removeEventListener(`transitionend`, n));
          };
          this.$children.addEventListener(`transitionend`, n);
          let r = e ? this.$children.scrollHeight : 0;
          this.domElement.classList.toggle(`lil-closed`, !e),
            requestAnimationFrame(() => {
              this.$children.style.height = r + `px`;
            });
        }),
        this
      );
    }
    title(e) {
      return (this._title = e), (this.$title.textContent = e), this;
    }
    reset(e = !0) {
      return (
        (e ? this.controllersRecursive() : this.controllers).forEach((e) =>
          e.reset()
        ),
        this
      );
    }
    onChange(e) {
      return (this._onChange = e), this;
    }
    _callOnChange(e) {
      this.parent && this.parent._callOnChange(e),
        this._onChange !== void 0 &&
          this._onChange.call(this, {
            object: e.object,
            property: e.property,
            value: e.getValue(),
            controller: e,
          });
    }
    onFinishChange(e) {
      return (this._onFinishChange = e), this;
    }
    _callOnFinishChange(e) {
      this.parent && this.parent._callOnFinishChange(e),
        this._onFinishChange !== void 0 &&
          this._onFinishChange.call(this, {
            object: e.object,
            property: e.property,
            value: e.getValue(),
            controller: e,
          });
    }
    onOpenClose(e) {
      return (this._onOpenClose = e), this;
    }
    _callOnOpenClose(e) {
      this.parent && this.parent._callOnOpenClose(e),
        this._onOpenClose !== void 0 && this._onOpenClose.call(this, e);
    }
    destroy() {
      this.parent &&
        (this.parent.children.splice(this.parent.children.indexOf(this), 1),
        this.parent.folders.splice(this.parent.folders.indexOf(this), 1)),
        this.domElement.parentElement &&
          this.domElement.parentElement.removeChild(this.domElement),
        Array.from(this.children).forEach((e) => e.destroy());
    }
    controllersRecursive() {
      let e = Array.from(this.controllers);
      return (
        this.folders.forEach((t) => {
          e = e.concat(t.controllersRecursive());
        }),
        e
      );
    }
    foldersRecursive() {
      let e = Array.from(this.folders);
      return (
        this.folders.forEach((t) => {
          e = e.concat(t.foldersRecursive());
        }),
        e
      );
    }
  };
function T(e, t, n) {
  let r = new w({ title: `Debug Panel` }),
    i = r.addFolder(`Save/Reset`);
  i
    .add(
      {
        save: () => {
          n.save(e);
        },
      },
      `save`
    )
    .name(`💾 Save`),
    i
      .add(
        {
          reset: () => {
            let e = confirm(
              `Settings cleared! Reload page to reset to defaults?`
            );
            n.reset(e);
          },
        },
        `reset`
      )
      .name(`🔄 Reset`),
    i.open();
  let a = r.addFolder(`System Options`),
    o = a
      .add(e, `count`)
      .min(10)
      .max(4e3)
      .step(1)
      .onFinishChange(() => {
        t.createParticles(0);
      });
  a.add(e, `spin`).min(0).max(0.01).step(0.001),
    a.add(e, `ring_interior_edge`).min(0).max(1).step(0.01),
    a
      .add(e, `blend_mode`, [
        `source-over`,
        `screen`,
        `lighter`,
        `multiply`,
        `overlay`,
        `color-dodge`,
        `color-burn`,
        `soft-light`,
        `hard-light`,
        `difference`,
        `exclusion`,
      ])
      .name(`Blend Mode`);
  let s = r.addFolder(`Particle Options`);
  s
    .add(e, `size`)
    .min(0.5)
    .max(10)
    .step(0.1)
    .onFinishChange(() => t.setParticleSize()),
    s.add(e, `speed`).min(1e-4).max(0.01).step(1e-4);
  let c = r.addFolder(`Color Options`);
  c.addColor(e, `color1`).onChange(() => t.updateColors()),
    c.addColor(e, `color2`).onChange(() => t.updateColors()),
    c.addColor(e, `bg_color`).onChange(() => {
      t.updateColors(),
        document
          .querySelector(`html`)
          .style.setProperty(`--hero-bg-color`, e.bg_color);
    }),
    c
      .add(e, `bg_color_alpha`)
      .min(0)
      .max(1)
      .step(0.01)
      .onChange(() => t.updateColors());
  let l = r.addFolder(`Pointer Options`);
  l.add(e, `pointer_range`).min(10).max(400).step(1),
    l.add(e, `pointer_action`, [`attract`, `repel`, `none`]),
    l.add(e, `pointer_strength`).min(0).max(1).step(0.01);
  let u = r.addFolder(`Radial Ease Options`);
  u.add(e, `radial_ease_type`, [
    `linear`,
    `quad`,
    `sine`,
    `expo`,
    `cubic`,
    `quart`,
    `quint`,
    `circ`,
    `back`,
  ]),
    u.add(e, `radial_ease_direction`, [`in`, `out`, `inOut`]),
    u.add(e, `radial_ease_strength`).min(0.01).max(1).step(0.01);
  let d = r.addFolder(`Silhouette Options`);
  return (
    d
      .add(e, `silhouette_blend`)
      .min(0)
      .max(1)
      .step(0.01)
      .name(`Blend (0=circle, 1=shape)`)
      .listen(),
    d
      .add(e, `edge_steering_strength`)
      .min(0)
      .max(1)
      .step(0.01)
      .name(`Edge Steering Strength`),
    d.add(e, `silhouette_hard_boundary`).name(`Hard Boundary Collision`),
    r.addFolder(`Debug`).add(e, `debug_val`).disable().listen(),
    window.addEventListener(`resize`, () => {
      o.updateDisplay();
    }),
    r
  );
}
function E(e) {
  if (e === void 0)
    throw ReferenceError(
      `this hasn't been initialised - super() hasn't been called`
    );
  return e;
}
function D(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    (e.__proto__ = t);
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var O = {
    autoSleep: 120,
    force3D: `auto`,
    nullTargetWarn: 1,
    units: { lineHeight: `` },
  },
  k = { duration: 0.5, overwrite: !1, delay: 0 },
  ee,
  A,
  j,
  M = 1e8,
  N = 1 / M,
  P = Math.PI * 2,
  F = P / 4,
  I = 0,
  L = Math.sqrt,
  te = Math.cos,
  ne = Math.sin,
  R = function (e) {
    return typeof e == `string`;
  },
  z = function (e) {
    return typeof e == `function`;
  },
  re = function (e) {
    return typeof e == `number`;
  },
  ie = function (e) {
    return e === void 0;
  },
  ae = function (e) {
    return typeof e == `object`;
  },
  B = function (e) {
    return e !== !1;
  },
  oe = function () {
    return typeof window < `u`;
  },
  se = function (e) {
    return z(e) || R(e);
  },
  ce =
    (typeof ArrayBuffer == `function` && ArrayBuffer.isView) || function () {},
  V = Array.isArray,
  le = /(?:-?\.?\d|\.)+/gi,
  ue = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  de = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  fe = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  pe = /[+-]=-?[.\d]+/,
  me = /[^,'"\[\]\s]+/gi,
  he = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  H,
  ge,
  _e,
  ve,
  ye = {},
  be = {},
  xe,
  Se = function (e) {
    return (be = Ze(e, ye)) && Q;
  },
  Ce = function (e, t) {
    return console.warn(
      `Invalid property`,
      e,
      `set to`,
      t,
      `Missing plugin? gsap.registerPlugin()`
    );
  },
  we = function (e, t) {
    return !t && console.warn(e);
  },
  Te = function (e, t) {
    return (e && (ye[e] = t) && be && (be[e] = t)) || ye;
  },
  Ee = function () {
    return 0;
  },
  De = { suppressEvents: !0, isStart: !0, kill: !1 },
  Oe = { suppressEvents: !0, kill: !1 },
  ke = { suppressEvents: !0 },
  Ae = {},
  je = [],
  Me = {},
  Ne,
  Pe = {},
  Fe = {},
  Ie = 30,
  Le = [],
  Re = ``,
  ze = function (e) {
    var t = e[0],
      n,
      r;
    if ((ae(t) || z(t) || (e = [e]), !(n = (t._gsap || {}).harness))) {
      for (r = Le.length; r-- && !Le[r].targetTest(t); );
      n = Le[r];
    }
    for (r = e.length; r--; )
      (e[r] && (e[r]._gsap || (e[r]._gsap = new Tn(e[r], n)))) ||
        e.splice(r, 1);
    return e;
  },
  Be = function (e) {
    return e._gsap || ze(Nt(e))[0]._gsap;
  },
  Ve = function (e, t, n) {
    return (n = e[t]) && z(n)
      ? e[t]()
      : (ie(n) && e.getAttribute && e.getAttribute(t)) || n;
  },
  U = function (e, t) {
    return (e = e.split(`,`)).forEach(t) || e;
  },
  W = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  G = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  He = function (e, t) {
    var n = t.charAt(0),
      r = parseFloat(t.substr(2));
    return (
      (e = parseFloat(e)),
      n === `+` ? e + r : n === `-` ? e - r : n === `*` ? e * r : e / r
    );
  },
  Ue = function (e, t) {
    for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n; );
    return r < n;
  },
  We = function () {
    var e = je.length,
      t = je.slice(0),
      n,
      r;
    for (Me = {}, je.length = 0, n = 0; n < e; n++)
      (r = t[n]),
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
  },
  Ge = function (e) {
    return !!(e._initted || e._startAt || e.add);
  },
  Ke = function (e, t, n, r) {
    je.length && !A && We(),
      e.render(t, n, r || !!(A && t < 0 && Ge(e))),
      je.length && !A && We();
  },
  qe = function (e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + ``).match(me).length < 2
      ? t
      : R(e)
      ? e.trim()
      : e;
  },
  Je = function (e) {
    return e;
  },
  Ye = function (e, t) {
    for (var n in t) n in e || (e[n] = t[n]);
    return e;
  },
  Xe = function (e) {
    return function (t, n) {
      for (var r in n)
        r in t || (r === `duration` && e) || r === `ease` || (t[r] = n[r]);
    };
  },
  Ze = function (e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  },
  Qe = function e(t, n) {
    for (var r in n)
      r !== `__proto__` &&
        r !== `constructor` &&
        r !== `prototype` &&
        (t[r] = ae(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
    return t;
  },
  $e = function (e, t) {
    var n = {},
      r;
    for (r in e) r in t || (n[r] = e[r]);
    return n;
  },
  et = function (e) {
    var t = e.parent || H,
      n = e.keyframes ? Xe(V(e.keyframes)) : Ye;
    if (B(e.inherit))
      for (; t; ) n(e, t.vars.defaults), (t = t.parent || t._dp);
    return e;
  },
  tt = function (e, t) {
    for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n]; );
    return n < 0;
  },
  nt = function (e, t, n, r, i) {
    n === void 0 && (n = `_first`), r === void 0 && (r = `_last`);
    var a = e[r],
      o;
    if (i) for (o = t[i]; a && a[i] > o; ) a = a._prev;
    return (
      a ? ((t._next = a._next), (a._next = t)) : ((t._next = e[n]), (e[n] = t)),
      t._next ? (t._next._prev = t) : (e[r] = t),
      (t._prev = a),
      (t.parent = t._dp = e),
      t
    );
  },
  rt = function (e, t, n, r) {
    n === void 0 && (n = `_first`), r === void 0 && (r = `_last`);
    var i = t._prev,
      a = t._next;
    i ? (i._next = a) : e[n] === t && (e[n] = a),
      a ? (a._prev = i) : e[r] === t && (e[r] = i),
      (t._next = t._prev = t.parent = null);
  },
  it = function (e, t) {
    e.parent &&
      (!t || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0);
  },
  at = function (e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var n = e; n; ) (n._dirty = 1), (n = n.parent);
    return e;
  },
  ot = function (e) {
    for (var t = e.parent; t && t.parent; )
      (t._dirty = 1), t.totalDuration(), (t = t.parent);
    return e;
  },
  st = function (e, t, n, r) {
    return (
      e._startAt &&
      (A
        ? e._startAt.revert(Oe)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(t, !0, r))
    );
  },
  ct = function e(t) {
    return !t || (t._ts && e(t.parent));
  },
  lt = function (e) {
    return e._repeat ? ut(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  ut = function (e, t) {
    var n = Math.floor((e = G(e / t)));
    return e && n === e ? n - 1 : n;
  },
  dt = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    );
  },
  ft = function (e) {
    return (e._end = G(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || N) || 0)
    ));
  },
  pt = function (e, t) {
    var n = e._dp;
    return (
      n &&
        n.smoothChildTiming &&
        e._ts &&
        ((e._start = G(
          n._time -
            (e._ts > 0
              ? t / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
        )),
        ft(e),
        n._dirty || at(n, e)),
      e
    );
  },
  mt = function (e, t) {
    var n;
    if (
      ((t._time ||
        (!t._dur && t._initted) ||
        (t._start < e._time && (t._dur || !t.add))) &&
        ((n = dt(e.rawTime(), t)),
        (!t._dur || Ot(0, t.totalDuration(), n) - t._tTime > N) &&
          t.render(n, !0)),
      at(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (n = e; n._dp; )
          n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
      e._zTime = -N;
    }
  },
  ht = function (e, t, n, r) {
    return (
      t.parent && it(t),
      (t._start = G(
        (re(n) ? n : n || e !== H ? Tt(e, n, t) : e._time) + t._delay
      )),
      (t._end = G(
        t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
      )),
      nt(e, t, `_first`, `_last`, e._sort ? `_start` : 0),
      yt(t) || (e._recent = t),
      r || mt(e, t),
      e._ts < 0 && pt(e, e._tTime),
      e
    );
  },
  gt = function (e, t) {
    return (
      (ye.ScrollTrigger || Ce(`scrollTrigger`, t)) &&
      ye.ScrollTrigger.create(t, e)
    );
  },
  _t = function (e, t, n, r, i) {
    if ((Nn(e, t, i), !e._initted)) return 1;
    if (
      !n &&
      e._pt &&
      !A &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      Ne !== dn.frame
    )
      return je.push(e), (e._lazy = [i, r]), 1;
  },
  vt = function e(t) {
    var n = t.parent;
    return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n));
  },
  yt = function (e) {
    var t = e.data;
    return t === `isFromStart` || t === `isStart`;
  },
  bt = function (e, t, n, r) {
    var i = e.ratio,
      a =
        t < 0 ||
        (!t &&
          ((!e._start && vt(e) && !(!e._initted && yt(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !yt(e))))
          ? 0
          : 1,
      o = e._rDelay,
      s = 0,
      c,
      l,
      u;
    if (
      (o &&
        e._repeat &&
        ((s = Ot(0, e._tDur, t)),
        (l = ut(s, o)),
        e._yoyo && l & 1 && (a = 1 - a),
        l !== ut(e._tTime, o) &&
          ((i = 1 - a), e.vars.repeatRefresh && e._initted && e.invalidate())),
      a !== i || A || r || e._zTime === N || (!t && e._zTime))
    ) {
      if (!e._initted && _t(e, t, r, n, s)) return;
      for (
        u = e._zTime,
          e._zTime = t || (n ? N : 0),
          n ||= t && !u,
          e.ratio = a,
          e._from && (a = 1 - a),
          e._time = 0,
          e._tTime = s,
          c = e._pt;
        c;

      )
        c.r(a, c.d), (c = c._next);
      t < 0 && st(e, t, n, !0),
        e._onUpdate && !n && Xt(e, `onUpdate`),
        s && e._repeat && !n && e.parent && Xt(e, `onRepeat`),
        (t >= e._tDur || t < 0) &&
          e.ratio === a &&
          (a && it(e, 1),
          !n &&
            !A &&
            (Xt(e, a ? `onComplete` : `onReverseComplete`, !0),
            e._prom && e._prom()));
    } else e._zTime ||= t;
  },
  xt = function (e, t, n) {
    var r;
    if (n > t)
      for (r = e._first; r && r._start <= n; ) {
        if (r.data === `isPause` && r._start > t) return r;
        r = r._next;
      }
    else
      for (r = e._last; r && r._start >= n; ) {
        if (r.data === `isPause` && r._start < t) return r;
        r = r._prev;
      }
  },
  St = function (e, t, n, r) {
    var i = e._repeat,
      a = G(t) || 0,
      o = e._tTime / e._tDur;
    return (
      o && !r && (e._time *= a / e._dur),
      (e._dur = a),
      (e._tDur = i ? (i < 0 ? 1e10 : G(a * (i + 1) + e._rDelay * i)) : a),
      o > 0 && !r && pt(e, (e._tTime = e._tDur * o)),
      e.parent && ft(e),
      n || at(e.parent, e),
      e
    );
  },
  Ct = function (e) {
    return e instanceof Y ? at(e) : St(e, e._dur);
  },
  wt = { _start: 0, endTime: Ee, totalDuration: Ee },
  Tt = function e(t, n, r) {
    var i = t.labels,
      a = t._recent || wt,
      o = t.duration() >= M ? a.endTime(!1) : t._dur,
      s,
      c,
      l;
    return R(n) && (isNaN(n) || n in i)
      ? ((c = n.charAt(0)),
        (l = n.substr(-1) === `%`),
        (s = n.indexOf(`=`)),
        c === `<` || c === `>`
          ? (s >= 0 && (n = n.replace(/=/, ``)),
            (c === `<` ? a._start : a.endTime(a._repeat >= 0)) +
              (parseFloat(n.substr(1)) || 0) *
                (l ? (s < 0 ? a : r).totalDuration() / 100 : 1))
          : s < 0
          ? (n in i || (i[n] = o), i[n])
          : ((c = parseFloat(n.charAt(s - 1) + n.substr(s + 1))),
            l && r && (c = (c / 100) * (V(r) ? r[0] : r).totalDuration()),
            s > 1 ? e(t, n.substr(0, s - 1), r) + c : o + c))
      : n == null
      ? o
      : +n;
  },
  Et = function (e, t, n) {
    var r = re(t[1]),
      i = (r ? 2 : 1) + (e < 2 ? 0 : 1),
      a = t[i],
      o,
      s;
    if ((r && (a.duration = t[1]), (a.parent = n), e)) {
      for (o = a, s = n; s && !(`immediateRender` in o); )
        (o = s.vars.defaults || {}), (s = B(s.vars.inherit) && s.parent);
      (a.immediateRender = B(o.immediateRender)),
        e < 2 ? (a.runBackwards = 1) : (a.startAt = t[i - 1]);
    }
    return new X(t[0], a, t[i + 1]);
  },
  Dt = function (e, t) {
    return e || e === 0 ? t(e) : t;
  },
  Ot = function (e, t, n) {
    return n < e ? e : n > t ? t : n;
  },
  K = function (e, t) {
    return !R(e) || !(t = he.exec(e)) ? `` : t[1];
  },
  kt = function (e, t, n) {
    return Dt(n, function (n) {
      return Ot(e, t, n);
    });
  },
  At = [].slice,
  jt = function (e, t) {
    return (
      e &&
      ae(e) &&
      `length` in e &&
      ((!t && !e.length) || (e.length - 1 in e && ae(e[0]))) &&
      !e.nodeType &&
      e !== ge
    );
  },
  Mt = function (e, t, n) {
    return (
      n === void 0 && (n = []),
      e.forEach(function (e) {
        var r;
        return (R(e) && !t) || jt(e, 1)
          ? (r = n).push.apply(r, Nt(e))
          : n.push(e);
      }) || n
    );
  },
  Nt = function (e, t, n) {
    return j && !t && j.selector
      ? j.selector(e)
      : R(e) && !n && (_e || !fn())
      ? At.call((t || ve).querySelectorAll(e), 0)
      : V(e)
      ? Mt(e, n)
      : jt(e)
      ? At.call(e, 0)
      : e
      ? [e]
      : [];
  },
  Pt = function (e) {
    return (
      (e = Nt(e)[0] || we(`Invalid scope`) || {}),
      function (t) {
        var n = e.current || e.nativeElement || e;
        return Nt(
          t,
          n.querySelectorAll
            ? n
            : n === e
            ? we(`Invalid scope`) || ve.createElement(`div`)
            : e
        );
      }
    );
  },
  Ft = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  It = function (e) {
    if (z(e)) return e;
    var t = ae(e) ? e : { each: e },
      n = bn(t.ease),
      r = t.from || 0,
      i = parseFloat(t.base) || 0,
      a = {},
      o = r > 0 && r < 1,
      s = isNaN(r) || o,
      c = t.axis,
      l = r,
      u = r;
    return (
      R(r)
        ? (l = u = { center: 0.5, edges: 0.5, end: 1 }[r] || 0)
        : !o && s && ((l = r[0]), (u = r[1])),
      function (e, o, d) {
        var f = (d || t).length,
          p = a[f],
          m,
          h,
          g,
          _,
          v,
          y,
          b,
          x,
          S;
        if (!p) {
          if (((S = t.grid === `auto` ? 0 : (t.grid || [1, M])[1]), !S)) {
            for (
              b = -M;
              b < (b = d[S++].getBoundingClientRect().left) && S < f;

            );
            S < f && S--;
          }
          for (
            p = a[f] = [],
              m = s ? Math.min(S, f) * l - 0.5 : r % S,
              h = S === M ? 0 : s ? (f * u) / S - 0.5 : (r / S) | 0,
              b = 0,
              x = M,
              y = 0;
            y < f;
            y++
          )
            (g = (y % S) - m),
              (_ = h - ((y / S) | 0)),
              (p[y] = v = c ? Math.abs(c === `y` ? _ : g) : L(g * g + _ * _)),
              v > b && (b = v),
              v < x && (x = v);
          r === `random` && Ft(p),
            (p.max = b - x),
            (p.min = x),
            (p.v = f =
              (parseFloat(t.amount) ||
                parseFloat(t.each) *
                  (S > f
                    ? f - 1
                    : c
                    ? c === `y`
                      ? f / S
                      : S
                    : Math.max(S, f / S)) ||
                0) * (r === `edges` ? -1 : 1)),
            (p.b = f < 0 ? i - f : i),
            (p.u = K(t.amount || t.each) || 0),
            (n = n && f < 0 ? vn(n) : n);
        }
        return (
          (f = (p[e] - p.min) / p.max || 0), G(p.b + (n ? n(f) : f) * p.v) + p.u
        );
      }
    );
  },
  Lt = function (e) {
    var t = 10 ** ((e + ``).split(`.`)[1] || ``).length;
    return function (n) {
      var r = G(Math.round(parseFloat(n) / e) * e * t);
      return (r - (r % 1)) / t + (re(n) ? 0 : K(n));
    };
  },
  Rt = function (e, t) {
    var n = V(e),
      r,
      i;
    return (
      !n &&
        ae(e) &&
        ((r = n = e.radius || M),
        e.values
          ? ((e = Nt(e.values)), (i = !re(e[0])) && (r *= r))
          : (e = Lt(e.increment))),
      Dt(
        t,
        n
          ? z(e)
            ? function (t) {
                return (i = e(t)), Math.abs(i - t) <= r ? i : t;
              }
            : function (t) {
                for (
                  var n = parseFloat(i ? t.x : t),
                    a = parseFloat(i ? t.y : 0),
                    o = M,
                    s = 0,
                    c = e.length,
                    l,
                    u;
                  c--;

                )
                  i
                    ? ((l = e[c].x - n), (u = e[c].y - a), (l = l * l + u * u))
                    : (l = Math.abs(e[c] - n)),
                    l < o && ((o = l), (s = c));
                return (
                  (s = !r || o <= r ? e[s] : t),
                  i || s === t || re(t) ? s : s + K(t)
                );
              }
          : Lt(e)
      )
    );
  },
  zt = function (e, t, n, r) {
    return Dt(V(e) ? !t : n === !0 ? !!(n = 0) : !r, function () {
      return V(e)
        ? e[~~(Math.random() * e.length)]
        : (n ||= 1e-5) &&
            (r = n < 1 ? 10 ** ((n + ``).length - 2) : 1) &&
            Math.floor(
              Math.round((e - n / 2 + Math.random() * (t - e + n * 0.99)) / n) *
                n *
                r
            ) / r;
    });
  },
  Bt = function () {
    var e = [...arguments];
    return function (t) {
      return e.reduce(function (e, t) {
        return t(e);
      }, t);
    };
  },
  Vt = function (e, t) {
    return function (n) {
      return e(parseFloat(n)) + (t || K(n));
    };
  },
  Ht = function (e, t, n) {
    return qt(e, t, 0, 1, n);
  },
  Ut = function (e, t, n) {
    return Dt(n, function (n) {
      return e[~~t(n)];
    });
  },
  Wt = function e(t, n, r) {
    var i = n - t;
    return V(t)
      ? Ut(t, e(0, t.length), n)
      : Dt(r, function (e) {
          return ((i + ((e - t) % i)) % i) + t;
        });
  },
  Gt = function e(t, n, r) {
    var i = n - t,
      a = i * 2;
    return V(t)
      ? Ut(t, e(0, t.length - 1), n)
      : Dt(r, function (e) {
          return (e = (a + ((e - t) % a)) % a || 0), t + (e > i ? a - e : e);
        });
  },
  Kt = function (e) {
    for (var t = 0, n = ``, r, i, a, o; ~(r = e.indexOf(`random(`, t)); )
      (a = e.indexOf(`)`, r)),
        (o = e.charAt(r + 7) === `[`),
        (i = e.substr(r + 7, a - r - 7).match(o ? me : le)),
        (n +=
          e.substr(t, r - t) + zt(o ? i : +i[0], o ? 0 : +i[1], +i[2] || 1e-5)),
        (t = a + 1);
    return n + e.substr(t, e.length - t);
  },
  qt = function (e, t, n, r, i) {
    var a = t - e,
      o = r - n;
    return Dt(i, function (t) {
      return n + (((t - e) / a) * o || 0);
    });
  },
  Jt = function e(t, n, r, i) {
    var a = isNaN(t + n)
      ? 0
      : function (e) {
          return (1 - e) * t + e * n;
        };
    if (!a) {
      var o = R(t),
        s = {},
        c,
        l,
        u,
        d,
        f;
      if ((r === !0 && (i = 1) && (r = null), o))
        (t = { p: t }), (n = { p: n });
      else if (V(t) && !V(n)) {
        for (u = [], d = t.length, f = d - 2, l = 1; l < d; l++)
          u.push(e(t[l - 1], t[l]));
        d--,
          (a = function (e) {
            e *= d;
            var t = Math.min(f, ~~e);
            return u[t](e - t);
          }),
          (r = n);
      } else i || (t = Ze(V(t) ? [] : {}, t));
      if (!u) {
        for (c in n) On.call(s, t, c, `get`, n[c]);
        a = function (e) {
          return Jn(e, s) || (o ? t.p : t);
        };
      }
    }
    return Dt(r, a);
  },
  Yt = function (e, t, n) {
    var r = e.labels,
      i = M,
      a,
      o,
      s;
    for (a in r)
      (o = r[a] - t),
        o < 0 == !!n && o && i > (o = Math.abs(o)) && ((s = a), (i = o));
    return s;
  },
  Xt = function (e, t, n) {
    var r = e.vars,
      i = r[t],
      a = j,
      o = e._ctx,
      s,
      c,
      l;
    if (i)
      return (
        (s = r[t + `Params`]),
        (c = r.callbackScope || e),
        n && je.length && We(),
        o && (j = o),
        (l = s ? i.apply(c, s) : i.call(c)),
        (j = a),
        l
      );
  },
  Zt = function (e) {
    return (
      it(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!A),
      e.progress() < 1 && Xt(e, `onInterrupt`),
      e
    );
  },
  Qt,
  $t = [],
  en = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), oe() || e.headless)) {
        var t = e.name,
          n = z(e),
          r =
            t && !n && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          i = {
            init: Ee,
            render: Jn,
            add: On,
            kill: Xn,
            modifier: Yn,
            rawVars: 0,
          },
          a = {
            targetTest: 0,
            get: 0,
            getSetter: Wn,
            aliases: {},
            register: 0,
          };
        if ((fn(), e !== r)) {
          if (Pe[t]) return;
          Ye(r, Ye($e(e, i), a)),
            Ze(r.prototype, Ze(i, $e(e, a))),
            (Pe[(r.prop = t)] = r),
            e.targetTest && (Le.push(r), (Ae[t] = 1)),
            (t =
              (t === `css` ? `CSS` : t.charAt(0).toUpperCase() + t.substr(1)) +
              `Plugin`);
        }
        Te(t, r), e.register && e.register(Q, r, Z);
      } else $t.push(e);
  },
  q = 255,
  tn = {
    aqua: [0, q, q],
    lime: [0, q, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, q],
    navy: [0, 0, 128],
    white: [q, q, q],
    olive: [128, 128, 0],
    yellow: [q, q, 0],
    orange: [q, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [q, 0, 0],
    pink: [q, 192, 203],
    cyan: [0, q, q],
    transparent: [q, q, q, 0],
  },
  nn = function (e, t, n) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (n - t) * e * 6
        : e < 0.5
        ? n
        : e * 3 < 2
        ? t + (n - t) * (2 / 3 - e) * 6
        : t) *
        q +
        0.5) |
        0
    );
  },
  rn = function (e, t, n) {
    var r = e ? (re(e) ? [e >> 16, (e >> 8) & q, e & q] : 0) : tn.black,
      i,
      a,
      o,
      s,
      c,
      l,
      u,
      d,
      f,
      p;
    if (!r) {
      if ((e.substr(-1) === `,` && (e = e.substr(0, e.length - 1)), tn[e]))
        r = tn[e];
      else if (e.charAt(0) === `#`) {
        if (
          (e.length < 6 &&
            ((i = e.charAt(1)),
            (a = e.charAt(2)),
            (o = e.charAt(3)),
            (e =
              `#` +
              i +
              i +
              a +
              a +
              o +
              o +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ``))),
          e.length === 9)
        )
          return (
            (r = parseInt(e.substr(1, 6), 16)),
            [r >> 16, (r >> 8) & q, r & q, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (r = [e >> 16, (e >> 8) & q, e & q]);
      } else if (e.substr(0, 3) === `hsl`) {
        if (((r = p = e.match(le)), !t))
          (s = (r[0] % 360) / 360),
            (c = r[1] / 100),
            (l = r[2] / 100),
            (a = l <= 0.5 ? l * (c + 1) : l + c - l * c),
            (i = l * 2 - a),
            r.length > 3 && (r[3] *= 1),
            (r[0] = nn(s + 1 / 3, i, a)),
            (r[1] = nn(s, i, a)),
            (r[2] = nn(s - 1 / 3, i, a));
        else if (~e.indexOf(`=`))
          return (r = e.match(ue)), n && r.length < 4 && (r[3] = 1), r;
      } else r = e.match(le) || tn.transparent;
      r = r.map(Number);
    }
    return (
      t &&
        !p &&
        ((i = r[0] / q),
        (a = r[1] / q),
        (o = r[2] / q),
        (u = Math.max(i, a, o)),
        (d = Math.min(i, a, o)),
        (l = (u + d) / 2),
        u === d
          ? (s = c = 0)
          : ((f = u - d),
            (c = l > 0.5 ? f / (2 - u - d) : f / (u + d)),
            (s =
              u === i
                ? (a - o) / f + (a < o ? 6 : 0)
                : u === a
                ? (o - i) / f + 2
                : (i - a) / f + 4),
            (s *= 60)),
        (r[0] = ~~(s + 0.5)),
        (r[1] = ~~(c * 100 + 0.5)),
        (r[2] = ~~(l * 100 + 0.5))),
      n && r.length < 4 && (r[3] = 1),
      r
    );
  },
  an = function (e) {
    var t = [],
      n = [],
      r = -1;
    return (
      e.split(sn).forEach(function (e) {
        var i = e.match(de) || [];
        t.push.apply(t, i), n.push((r += i.length + 1));
      }),
      (t.c = n),
      t
    );
  },
  on = function (e, t, n) {
    var r = ``,
      i = (e + r).match(sn),
      a = t ? `hsla(` : `rgba(`,
      o = 0,
      s,
      c,
      l,
      u;
    if (!i) return e;
    if (
      ((i = i.map(function (e) {
        return (
          (e = rn(e, t, 1)) &&
          a +
            (t ? e[0] + `,` + e[1] + `%,` + e[2] + `%,` + e[3] : e.join(`,`)) +
            `)`
        );
      })),
      n && ((l = an(e)), (s = n.c), s.join(r) !== l.c.join(r)))
    )
      for (c = e.replace(sn, `1`).split(de), u = c.length - 1; o < u; o++)
        r +=
          c[o] +
          (~s.indexOf(o)
            ? i.shift() || a + `0,0,0,0)`
            : (l.length ? l : i.length ? i : n).shift());
    if (!c)
      for (c = e.split(sn), u = c.length - 1; o < u; o++) r += c[o] + i[o];
    return r + c[u];
  },
  sn = (function () {
    var e = `(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,
      t;
    for (t in tn) e += `|` + t + `\\b`;
    return RegExp(e + `)`, `gi`);
  })(),
  cn = /hsl[a]?\(/,
  ln = function (e) {
    var t = e.join(` `),
      n;
    if (((sn.lastIndex = 0), sn.test(t)))
      return (
        (n = cn.test(t)),
        (e[1] = on(e[1], n)),
        (e[0] = on(e[0], n, an(e[1]))),
        !0
      );
  },
  un,
  dn = (function () {
    var e = Date.now,
      t = 500,
      n = 33,
      r = e(),
      i = r,
      a = 1e3 / 240,
      o = a,
      s = [],
      c,
      l,
      u,
      d,
      f,
      p,
      m = function u(m) {
        var h = e() - i,
          g = m === !0,
          _,
          v,
          y,
          b;
        if (
          ((h > t || h < 0) && (r += h - n),
          (i += h),
          (y = i - r),
          (_ = y - o),
          (_ > 0 || g) &&
            ((b = ++d.frame),
            (f = y - d.time * 1e3),
            (d.time = y /= 1e3),
            (o += _ + (_ >= a ? 4 : a - _)),
            (v = 1)),
          g || (c = l(u)),
          v)
        )
          for (p = 0; p < s.length; p++) s[p](y, f, b, m);
      };
    return (
      (d = {
        time: 0,
        frame: 0,
        tick: function () {
          m(!0);
        },
        deltaRatio: function (e) {
          return f / (1e3 / (e || 60));
        },
        wake: function () {
          xe &&
            (!_e &&
              oe() &&
              ((ge = _e = window),
              (ve = ge.document || {}),
              (ye.gsap = Q),
              (ge.gsapVersions ||= []).push(Q.version),
              Se(be || ge.GreenSockGlobals || (!ge.gsap && ge) || {}),
              $t.forEach(en)),
            (u = typeof requestAnimationFrame < `u` && requestAnimationFrame),
            c && d.sleep(),
            (l =
              u ||
              function (e) {
                return setTimeout(e, (o - d.time * 1e3 + 1) | 0);
              }),
            (un = 1),
            m(2));
        },
        sleep: function () {
          (u ? cancelAnimationFrame : clearTimeout)(c), (un = 0), (l = Ee);
        },
        lagSmoothing: function (e, r) {
          (t = e || 1 / 0), (n = Math.min(r || 33, t));
        },
        fps: function (e) {
          (a = 1e3 / (e || 240)), (o = d.time * 1e3 + a);
        },
        add: function (e, t, n) {
          var r = t
            ? function (t, n, i, a) {
                e(t, n, i, a), d.remove(r);
              }
            : e;
          return d.remove(e), s[n ? `unshift` : `push`](r), fn(), r;
        },
        remove: function (e, t) {
          ~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--;
        },
        _listeners: s,
      }),
      d
    );
  })(),
  fn = function () {
    return !un && dn.wake();
  },
  J = {},
  pn = /^[\d.\-M][\d.\-,\s]/,
  mn = /["']/g,
  hn = function (e) {
    for (
      var t = {},
        n = e.substr(1, e.length - 3).split(`:`),
        r = n[0],
        i = 1,
        a = n.length,
        o,
        s,
        c;
      i < a;
      i++
    )
      (s = n[i]),
        (o = i === a - 1 ? s.length : s.lastIndexOf(`,`)),
        (c = s.substr(0, o)),
        (t[r] = isNaN(c) ? c.replace(mn, ``).trim() : +c),
        (r = s.substr(o + 1).trim());
    return t;
  },
  gn = function (e) {
    var t = e.indexOf(`(`) + 1,
      n = e.indexOf(`)`),
      r = e.indexOf(`(`, t);
    return e.substring(t, ~r && r < n ? e.indexOf(`)`, n + 1) : n);
  },
  _n = function (e) {
    var t = (e + ``).split(`(`),
      n = J[t[0]];
    return n && t.length > 1 && n.config
      ? n.config.apply(
          null,
          ~e.indexOf(`{`) ? [hn(t[1])] : gn(e).split(`,`).map(qe)
        )
      : J._CE && pn.test(e)
      ? J._CE(``, e)
      : n;
  },
  vn = function (e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
  yn = function e(t, n) {
    for (var r = t._first, i; r; )
      r instanceof Y
        ? e(r, n)
        : r.vars.yoyoEase &&
          (!r._yoyo || !r._repeat) &&
          r._yoyo !== n &&
          (r.timeline
            ? e(r.timeline, n)
            : ((i = r._ease),
              (r._ease = r._yEase),
              (r._yEase = i),
              (r._yoyo = n))),
        (r = r._next);
  },
  bn = function (e, t) {
    return (e && (z(e) ? e : J[e] || _n(e))) || t;
  },
  xn = function (e, t, n, r) {
    n === void 0 &&
      (n = function (e) {
        return 1 - t(1 - e);
      }),
      r === void 0 &&
        (r = function (e) {
          return e < 0.5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2;
        });
    var i = { easeIn: t, easeOut: n, easeInOut: r },
      a;
    return (
      U(e, function (e) {
        for (var t in ((J[e] = ye[e] = i), (J[(a = e.toLowerCase())] = n), i))
          J[
            a + (t === `easeIn` ? `.in` : t === `easeOut` ? `.out` : `.inOut`)
          ] = J[e + `.` + t] = i[t];
      }),
      i
    );
  },
  Sn = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
    };
  },
  Cn = function e(t, n, r) {
    var i = n >= 1 ? n : 1,
      a = (r || (t ? 0.3 : 0.45)) / (n < 1 ? n : 1),
      o = (a / P) * (Math.asin(1 / i) || 0),
      s = function (e) {
        return e === 1 ? 1 : i * 2 ** (-10 * e) * ne((e - o) * a) + 1;
      },
      c =
        t === `out`
          ? s
          : t === `in`
          ? function (e) {
              return 1 - s(1 - e);
            }
          : Sn(s);
    return (
      (a = P / a),
      (c.config = function (n, r) {
        return e(t, n, r);
      }),
      c
    );
  },
  wn = function e(t, n) {
    n === void 0 && (n = 1.70158);
    var r = function (e) {
        return e ? --e * e * ((n + 1) * e + n) + 1 : 0;
      },
      i =
        t === `out`
          ? r
          : t === `in`
          ? function (e) {
              return 1 - r(1 - e);
            }
          : Sn(r);
    return (
      (i.config = function (n) {
        return e(t, n);
      }),
      i
    );
  };
U(`Linear,Quad,Cubic,Quart,Quint,Strong`, function (e, t) {
  var n = t < 5 ? t + 1 : t;
  xn(
    e + `,Power` + (n - 1),
    t
      ? function (e) {
          return e ** +n;
        }
      : function (e) {
          return e;
        },
    function (e) {
      return 1 - (1 - e) ** n;
    },
    function (e) {
      return e < 0.5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2;
    }
  );
}),
  (J.Linear.easeNone = J.none = J.Linear.easeIn),
  xn(`Elastic`, Cn(`in`), Cn(`out`), Cn()),
  (function (e, t) {
    var n = 1 / t,
      r = 2 * n,
      i = 2.5 * n,
      a = function (a) {
        return a < n
          ? e * a * a
          : a < r
          ? e * (a - 1.5 / t) ** 2 + 0.75
          : a < i
          ? e * (a -= 2.25 / t) * a + 0.9375
          : e * (a - 2.625 / t) ** 2 + 0.984375;
      };
    xn(
      `Bounce`,
      function (e) {
        return 1 - a(1 - e);
      },
      a
    );
  })(7.5625, 2.75),
  xn(`Expo`, function (e) {
    return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e);
  }),
  xn(`Circ`, function (e) {
    return -(L(1 - e * e) - 1);
  }),
  xn(`Sine`, function (e) {
    return e === 1 ? 1 : -te(e * F) + 1;
  }),
  xn(`Back`, wn(`in`), wn(`out`), wn()),
  (J.SteppedEase =
    J.steps =
    ye.SteppedEase =
      {
        config: function (e, t) {
          e === void 0 && (e = 1);
          var n = 1 / e,
            r = e + (t ? 0 : 1),
            i = t ? 1 : 0,
            a = 1 - N;
          return function (e) {
            return (((r * Ot(0, a, e)) | 0) + i) * n;
          };
        },
      }),
  (k.ease = J[`quad.out`]),
  U(
    `onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,
    function (e) {
      return (Re += e + `,` + e + `Params,`);
    }
  );
var Tn = function (e, t) {
    (this.id = I++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : Ve),
      (this.set = t ? t.getSetter : Wn);
  },
  En = (function () {
    function e(e) {
      (this.vars = e),
        (this._delay = +e.delay || 0),
        (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
          ((this._rDelay = e.repeatDelay || 0),
          (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
        (this._ts = 1),
        St(this, +e.duration, 1, 1),
        (this.data = e.data),
        j && ((this._ctx = j), j.data.push(this)),
        un || dn.wake();
    }
    var t = e.prototype;
    return (
      (t.delay = function (e) {
        return e || e === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + e - this._delay),
            (this._delay = e),
            this)
          : this._delay;
      }),
      (t.duration = function (e) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e
            )
          : this.totalDuration() && this._dur;
      }),
      (t.totalDuration = function (e) {
        return arguments.length
          ? ((this._dirty = 0),
            St(
              this,
              this._repeat < 0
                ? e
                : (e - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (t.totalTime = function (e, t) {
        if ((fn(), !arguments.length)) return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
          for (pt(this, e), !n._dp || n.parent || mt(n, this); n && n.parent; )
            n.parent._time !==
              n._start +
                (n._ts >= 0
                  ? n._tTime / n._ts
                  : (n.totalDuration() - n._tTime) / -n._ts) &&
              n.totalTime(n._tTime, !0),
              (n = n.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && e < this._tDur) ||
              (this._ts < 0 && e > 0) ||
              (!this._tDur && !e)) &&
            ht(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== e ||
            (!this._dur && !t) ||
            (this._initted && Math.abs(this._zTime) === N) ||
            (!e && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = e), Ke(this, e, t)),
          this
        );
      }),
      (t.time = function (e, t) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), e + lt(this)) %
                (this._dur + this._rDelay) || (e ? this._dur : 0),
              t
            )
          : this._time;
      }),
      (t.totalProgress = function (e, t) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * e, t)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.rawTime() >= 0 && this._initted
          ? 1
          : 0;
      }),
      (t.progress = function (e, t) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) +
                lt(this),
              t
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.rawTime() > 0
          ? 1
          : 0;
      }),
      (t.iteration = function (e, t) {
        var n = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (e - 1) * n, t)
          : this._repeat
          ? ut(this._tTime, n) + 1
          : 1;
      }),
      (t.timeScale = function (e, t) {
        if (!arguments.length) return this._rts === -N ? 0 : this._rts;
        if (this._rts === e) return this;
        var n =
          this.parent && this._ts ? dt(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +e || 0),
          (this._ts = this._ps || e === -N ? 0 : this._rts),
          this.totalTime(
            Ot(-Math.abs(this._delay), this.totalDuration(), n),
            t !== !1
          ),
          ft(this),
          ot(this)
        );
      }),
      (t.paused = function (e) {
        return arguments.length
          ? (this._ps !== e &&
              ((this._ps = e),
              e
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (fn(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== N &&
                      (this._tTime -= N)
                  ))),
            this)
          : this._ps;
      }),
      (t.startTime = function (e) {
        if (arguments.length) {
          this._start = e;
          var t = this.parent || this._dp;
          return (
            t && (t._sort || !this.parent) && ht(t, this, e - this._delay), this
          );
        }
        return this._start;
      }),
      (t.endTime = function (e) {
        return (
          this._start +
          (B(e) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (t.rawTime = function (e) {
        var t = this.parent || this._dp;
        return t
          ? e &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? dt(t.rawTime(e), this)
            : this._tTime
          : this._tTime;
      }),
      (t.revert = function (e) {
        e === void 0 && (e = ke);
        var t = A;
        return (
          (A = e),
          Ge(this) &&
            (this.timeline && this.timeline.revert(e),
            this.totalTime(-0.01, e.suppressEvents)),
          this.data !== `nested` && e.kill !== !1 && this.kill(),
          (A = t),
          this
        );
      }),
      (t.globalTime = function (e) {
        for (var t = this, n = arguments.length ? e : t.rawTime(); t; )
          (n = t._start + n / (Math.abs(t._ts) || 1)), (t = t._dp);
        return !this.parent && this._sat ? this._sat.globalTime(e) : n;
      }),
      (t.repeat = function (e) {
        return arguments.length
          ? ((this._repeat = e === 1 / 0 ? -2 : e), Ct(this))
          : this._repeat === -2
          ? 1 / 0
          : this._repeat;
      }),
      (t.repeatDelay = function (e) {
        if (arguments.length) {
          var t = this._time;
          return (this._rDelay = e), Ct(this), t ? this.time(t) : this;
        }
        return this._rDelay;
      }),
      (t.yoyo = function (e) {
        return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
      }),
      (t.seek = function (e, t) {
        return this.totalTime(Tt(this, e), B(t));
      }),
      (t.restart = function (e, t) {
        return (
          this.play().totalTime(e ? -this._delay : 0, B(t)),
          this._dur || (this._zTime = -N),
          this
        );
      }),
      (t.play = function (e, t) {
        return e != null && this.seek(e, t), this.reversed(!1).paused(!1);
      }),
      (t.reverse = function (e, t) {
        return (
          e != null && this.seek(e || this.totalDuration(), t),
          this.reversed(!0).paused(!1)
        );
      }),
      (t.pause = function (e, t) {
        return e != null && this.seek(e, t), this.paused(!0);
      }),
      (t.resume = function () {
        return this.paused(!1);
      }),
      (t.reversed = function (e) {
        return arguments.length
          ? (!!e !== this.reversed() &&
              this.timeScale(-this._rts || (e ? -N : 0)),
            this)
          : this._rts < 0;
      }),
      (t.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -N), this;
      }),
      (t.isActive = function () {
        var e = this.parent || this._dp,
          t = this._start,
          n;
        return !!(
          !e ||
          (this._ts &&
            this._initted &&
            e.isActive() &&
            (n = e.rawTime(!0)) >= t &&
            n < this.endTime(!0) - N)
        );
      }),
      (t.eventCallback = function (e, t, n) {
        var r = this.vars;
        return arguments.length > 1
          ? (t
              ? ((r[e] = t),
                n && (r[e + `Params`] = n),
                e === `onUpdate` && (this._onUpdate = t))
              : delete r[e],
            this)
          : r[e];
      }),
      (t.then = function (e) {
        var t = this;
        return new Promise(function (n) {
          var r = z(e) ? e : Je,
            i = function () {
              var e = t.then;
              (t.then = null),
                z(r) && (r = r(t)) && (r.then || r === t) && (t.then = e),
                n(r),
                (t.then = e);
            };
          (t._initted && t.totalProgress() === 1 && t._ts >= 0) ||
          (!t._tTime && t._ts < 0)
            ? i()
            : (t._prom = i);
        });
      }),
      (t.kill = function () {
        Zt(this);
      }),
      e
    );
  })();
Ye(En.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -N,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var Y = (function (e) {
  D(t, e);
  function t(t, n) {
    var r;
    return (
      t === void 0 && (t = {}),
      (r = e.call(this, t) || this),
      (r.labels = {}),
      (r.smoothChildTiming = !!t.smoothChildTiming),
      (r.autoRemoveChildren = !!t.autoRemoveChildren),
      (r._sort = B(t.sortChildren)),
      H && ht(t.parent || H, E(r), n),
      t.reversed && r.reverse(),
      t.paused && r.paused(!0),
      t.scrollTrigger && gt(E(r), t.scrollTrigger),
      r
    );
  }
  var n = t.prototype;
  return (
    (n.to = function (e, t, n) {
      return Et(0, arguments, this), this;
    }),
    (n.from = function (e, t, n) {
      return Et(1, arguments, this), this;
    }),
    (n.fromTo = function (e, t, n, r) {
      return Et(2, arguments, this), this;
    }),
    (n.set = function (e, t, n) {
      return (
        (t.duration = 0),
        (t.parent = this),
        et(t).repeatDelay || (t.repeat = 0),
        (t.immediateRender = !!t.immediateRender),
        new X(e, t, Tt(this, n), 1),
        this
      );
    }),
    (n.call = function (e, t, n) {
      return ht(this, X.delayedCall(0, e, t), n);
    }),
    (n.staggerTo = function (e, t, n, r, i, a, o) {
      return (
        (n.duration = t),
        (n.stagger = n.stagger || r),
        (n.onComplete = a),
        (n.onCompleteParams = o),
        (n.parent = this),
        new X(e, n, Tt(this, i)),
        this
      );
    }),
    (n.staggerFrom = function (e, t, n, r, i, a, o) {
      return (
        (n.runBackwards = 1),
        (et(n).immediateRender = B(n.immediateRender)),
        this.staggerTo(e, t, n, r, i, a, o)
      );
    }),
    (n.staggerFromTo = function (e, t, n, r, i, a, o, s) {
      return (
        (r.startAt = n),
        (et(r).immediateRender = B(r.immediateRender)),
        this.staggerTo(e, t, r, i, a, o, s)
      );
    }),
    (n.render = function (e, t, n) {
      var r = this._time,
        i = this._dirty ? this.totalDuration() : this._tDur,
        a = this._dur,
        o = e <= 0 ? 0 : G(e),
        s = this._zTime < 0 != e < 0 && (this._initted || !a),
        c,
        l,
        u,
        d,
        f,
        p,
        m,
        h,
        g,
        _,
        v,
        y;
      if (
        (this !== H && o > i && e >= 0 && (o = i), o !== this._tTime || n || s)
      ) {
        if (
          (r !== this._time &&
            a &&
            ((o += this._time - r), (e += this._time - r)),
          (c = o),
          (g = this._start),
          (h = this._ts),
          (p = !h),
          s && (a || (r = this._zTime), (e || !t) && (this._zTime = e)),
          this._repeat)
        ) {
          if (
            ((v = this._yoyo),
            (f = a + this._rDelay),
            this._repeat < -1 && e < 0)
          )
            return this.totalTime(f * 100 + e, t, n);
          if (
            ((c = G(o % f)),
            o === i
              ? ((d = this._repeat), (c = a))
              : ((_ = G(o / f)),
                (d = ~~_),
                d && d === _ && ((c = a), d--),
                c > a && (c = a)),
            (_ = ut(this._tTime, f)),
            !r &&
              this._tTime &&
              _ !== d &&
              this._tTime - _ * f - this._dur <= 0 &&
              (_ = d),
            v && d & 1 && ((c = a - c), (y = 1)),
            d !== _ && !this._lock)
          ) {
            var b = v && _ & 1,
              x = b === (v && d & 1);
            if (
              (d < _ && (b = !b),
              (r = b ? 0 : o % a ? a : o),
              (this._lock = 1),
              (this.render(r || (y ? 0 : G(d * f)), t, !a)._lock = 0),
              (this._tTime = o),
              !t && this.parent && Xt(this, `onRepeat`),
              this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1),
              (r && r !== this._time) ||
                p !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act) ||
                ((a = this._dur),
                (i = this._tDur),
                x &&
                  ((this._lock = 2),
                  (r = b ? a : -1e-4),
                  this.render(r, !0),
                  this.vars.repeatRefresh && !y && this.invalidate()),
                (this._lock = 0),
                !this._ts && !p))
            )
              return this;
            yn(this, y);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((m = xt(this, G(r), G(c))), m && (o -= c - (c = m._start))),
          (this._tTime = o),
          (this._time = c),
          (this._act = !h),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = e),
            (r = 0)),
          !r && o && !t && !_ && (Xt(this, `onStart`), this._tTime !== o))
        )
          return this;
        if (c >= r && e >= 0)
          for (l = this._first; l; ) {
            if (
              ((u = l._next), (l._act || c >= l._start) && l._ts && m !== l)
            ) {
              if (l.parent !== this) return this.render(e, t, n);
              if (
                (l.render(
                  l._ts > 0
                    ? (c - l._start) * l._ts
                    : (l._dirty ? l.totalDuration() : l._tDur) +
                        (c - l._start) * l._ts,
                  t,
                  n
                ),
                c !== this._time || (!this._ts && !p))
              ) {
                (m = 0), u && (o += this._zTime = -N);
                break;
              }
            }
            l = u;
          }
        else {
          l = this._last;
          for (var S = e < 0 ? e : c; l; ) {
            if (((u = l._prev), (l._act || S <= l._end) && l._ts && m !== l)) {
              if (l.parent !== this) return this.render(e, t, n);
              if (
                (l.render(
                  l._ts > 0
                    ? (S - l._start) * l._ts
                    : (l._dirty ? l.totalDuration() : l._tDur) +
                        (S - l._start) * l._ts,
                  t,
                  n || (A && Ge(l))
                ),
                c !== this._time || (!this._ts && !p))
              ) {
                (m = 0), u && (o += this._zTime = S ? -N : N);
                break;
              }
            }
            l = u;
          }
        }
        if (
          m &&
          !t &&
          (this.pause(),
          (m.render(c >= r ? 0 : -N)._zTime = c >= r ? 1 : -1),
          this._ts)
        )
          return (this._start = g), ft(this), this.render(e, t, n);
        this._onUpdate && !t && Xt(this, `onUpdate`, !0),
          ((o === i && this._tTime >= this.totalDuration()) || (!o && r)) &&
            (g === this._start || Math.abs(h) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((e || !a) &&
                ((o === i && this._ts > 0) || (!o && this._ts < 0)) &&
                it(this, 1),
              !t &&
                !(e < 0 && !r) &&
                (o || r || !i) &&
                (Xt(
                  this,
                  o === i && e >= 0 ? `onComplete` : `onReverseComplete`,
                  !0
                ),
                this._prom &&
                  !(o < i && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (n.add = function (e, t) {
      var n = this;
      if ((re(t) || (t = Tt(this, t, e)), !(e instanceof En))) {
        if (V(e))
          return (
            e.forEach(function (e) {
              return n.add(e, t);
            }),
            this
          );
        if (R(e)) return this.addLabel(e, t);
        if (z(e)) e = X.delayedCall(0, e);
        else return this;
      }
      return this === e ? this : ht(this, e, t);
    }),
    (n.getChildren = function (e, t, n, r) {
      e === void 0 && (e = !0),
        t === void 0 && (t = !0),
        n === void 0 && (n = !0),
        r === void 0 && (r = -M);
      for (var i = [], a = this._first; a; )
        a._start >= r &&
          (a instanceof X
            ? t && i.push(a)
            : (n && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, n)))),
          (a = a._next);
      return i;
    }),
    (n.getById = function (e) {
      for (var t = this.getChildren(1, 1, 1), n = t.length; n--; )
        if (t[n].vars.id === e) return t[n];
    }),
    (n.remove = function (e) {
      return R(e)
        ? this.removeLabel(e)
        : z(e)
        ? this.killTweensOf(e)
        : (e.parent === this && rt(this, e),
          e === this._recent && (this._recent = this._last),
          at(this));
    }),
    (n.totalTime = function (t, n) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = G(
              dn.time -
                (this._ts > 0
                  ? t / this._ts
                  : (this.totalDuration() - t) / -this._ts)
            )),
          e.prototype.totalTime.call(this, t, n),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (n.addLabel = function (e, t) {
      return (this.labels[e] = Tt(this, t)), this;
    }),
    (n.removeLabel = function (e) {
      return delete this.labels[e], this;
    }),
    (n.addPause = function (e, t, n) {
      var r = X.delayedCall(0, t || Ee, n);
      return (
        (r.data = `isPause`), (this._hasPause = 1), ht(this, r, Tt(this, e))
      );
    }),
    (n.removePause = function (e) {
      var t = this._first;
      for (e = Tt(this, e); t; )
        t._start === e && t.data === `isPause` && it(t), (t = t._next);
    }),
    (n.killTweensOf = function (e, t, n) {
      for (var r = this.getTweensOf(e, n), i = r.length; i--; )
        jn !== r[i] && r[i].kill(e, t);
      return this;
    }),
    (n.getTweensOf = function (e, t) {
      for (var n = [], r = Nt(e), i = this._first, a = re(t), o; i; )
        i instanceof X
          ? Ue(i._targets, r) &&
            (a
              ? (!jn || (i._initted && i._ts)) &&
                i.globalTime(0) <= t &&
                i.globalTime(i.totalDuration()) > t
              : !t || i.isActive()) &&
            n.push(i)
          : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o),
          (i = i._next);
      return n;
    }),
    (n.tweenTo = function (e, t) {
      t ||= {};
      var n = this,
        r = Tt(n, e),
        i = t,
        a = i.startAt,
        o = i.onStart,
        s = i.onStartParams,
        c = i.immediateRender,
        l,
        u = X.to(
          n,
          Ye(
            {
              ease: t.ease || `none`,
              lazy: !1,
              immediateRender: !1,
              time: r,
              overwrite: `auto`,
              duration:
                t.duration ||
                Math.abs(
                  (r - (a && `time` in a ? a.time : n._time)) / n.timeScale()
                ) ||
                N,
              onStart: function () {
                if ((n.pause(), !l)) {
                  var e =
                    t.duration ||
                    Math.abs(
                      (r - (a && `time` in a ? a.time : n._time)) /
                        n.timeScale()
                    );
                  u._dur !== e && St(u, e, 0, 1).render(u._time, !0, !0),
                    (l = 1);
                }
                o && o.apply(u, s || []);
              },
            },
            t
          )
        );
      return c ? u.render(0) : u;
    }),
    (n.tweenFromTo = function (e, t, n) {
      return this.tweenTo(t, Ye({ startAt: { time: Tt(this, e) } }, n));
    }),
    (n.recent = function () {
      return this._recent;
    }),
    (n.nextLabel = function (e) {
      return e === void 0 && (e = this._time), Yt(this, Tt(this, e));
    }),
    (n.previousLabel = function (e) {
      return e === void 0 && (e = this._time), Yt(this, Tt(this, e), 1);
    }),
    (n.currentLabel = function (e) {
      return arguments.length
        ? this.seek(e, !0)
        : this.previousLabel(this._time + N);
    }),
    (n.shiftChildren = function (e, t, n) {
      n === void 0 && (n = 0);
      for (var r = this._first, i = this.labels, a; r; )
        r._start >= n && ((r._start += e), (r._end += e)), (r = r._next);
      if (t) for (a in i) i[a] >= n && (i[a] += e);
      return at(this);
    }),
    (n.invalidate = function (t) {
      var n = this._first;
      for (this._lock = 0; n; ) n.invalidate(t), (n = n._next);
      return e.prototype.invalidate.call(this, t);
    }),
    (n.clear = function (e) {
      e === void 0 && (e = !0);
      for (var t = this._first, n; t; ) (n = t._next), this.remove(t), (t = n);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        e && (this.labels = {}),
        at(this)
      );
    }),
    (n.totalDuration = function (e) {
      var t = 0,
        n = this,
        r = n._last,
        i = M,
        a,
        o,
        s;
      if (arguments.length)
        return n.timeScale(
          (n._repeat < 0 ? n.duration() : n.totalDuration()) /
            (n.reversed() ? -e : e)
        );
      if (n._dirty) {
        for (s = n.parent; r; )
          (a = r._prev),
            r._dirty && r.totalDuration(),
            (o = r._start),
            o > i && n._sort && r._ts && !n._lock
              ? ((n._lock = 1), (ht(n, r, o - r._delay, 1)._lock = 0))
              : (i = o),
            o < 0 &&
              r._ts &&
              ((t -= o),
              ((!s && !n._dp) || (s && s.smoothChildTiming)) &&
                ((n._start += o / n._ts), (n._time -= o), (n._tTime -= o)),
              n.shiftChildren(-o, !1, -1 / 0),
              (i = 0)),
            r._end > t && r._ts && (t = r._end),
            (r = a);
        St(n, n === H && n._time > t ? n._time : t, 1, 1), (n._dirty = 0);
      }
      return n._tDur;
    }),
    (t.updateRoot = function (e) {
      if ((H._ts && (Ke(H, dt(e, H)), (Ne = dn.frame)), dn.frame >= Ie)) {
        Ie += O.autoSleep || 120;
        var t = H._first;
        if ((!t || !t._ts) && O.autoSleep && dn._listeners.length < 2) {
          for (; t && !t._ts; ) t = t._next;
          t || dn.sleep();
        }
      }
    }),
    t
  );
})(En);
Ye(Y.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var Dn = function (e, t, n, r, i, a, o) {
    var s = new Z(this._pt, e, t, 0, 1, qn, null, i),
      c = 0,
      l = 0,
      u,
      d,
      f,
      p,
      m,
      h,
      g,
      _;
    for (
      s.b = n,
        s.e = r,
        n += ``,
        r += ``,
        (g = ~r.indexOf(`random(`)) && (r = Kt(r)),
        a && ((_ = [n, r]), a(_, e, t), (n = _[0]), (r = _[1])),
        d = n.match(fe) || [];
      (u = fe.exec(r));

    )
      (p = u[0]),
        (m = r.substring(c, u.index)),
        f ? (f = (f + 1) % 5) : m.substr(-5) === `rgba(` && (f = 1),
        p !== d[l++] &&
          ((h = parseFloat(d[l - 1]) || 0),
          (s._pt = {
            _next: s._pt,
            p: m || l === 1 ? m : `,`,
            s: h,
            c: p.charAt(1) === `=` ? He(h, p) - h : parseFloat(p) - h,
            m: f && f < 4 ? Math.round : 0,
          }),
          (c = fe.lastIndex));
    return (
      (s.c = c < r.length ? r.substring(c, r.length) : ``),
      (s.fp = o),
      (pe.test(r) || g) && (s.e = 0),
      (this._pt = s),
      s
    );
  },
  On = function (e, t, n, r, i, a, o, s, c, l) {
    z(r) && (r = r(i || 0, e, a));
    var u = e[t],
      d =
        n === `get`
          ? z(u)
            ? c
              ? e[
                  t.indexOf(`set`) || !z(e[`get` + t.substr(3)])
                    ? t
                    : `get` + t.substr(3)
                ](c)
              : e[t]()
            : u
          : n,
      f = z(u) ? (c ? Hn : Vn) : Bn,
      p;
    if (
      (R(r) &&
        (~r.indexOf(`random(`) && (r = Kt(r)),
        r.charAt(1) === `=` &&
          ((p = He(d, r) + (K(d) || 0)), (p || p === 0) && (r = p))),
      !l || d !== r || Mn)
    )
      return !isNaN(d * r) && r !== ``
        ? ((p = new Z(
            this._pt,
            e,
            t,
            +d || 0,
            r - (d || 0),
            typeof u == `boolean` ? Kn : Gn,
            0,
            f
          )),
          c && (p.fp = c),
          o && p.modifier(o, this, e),
          (this._pt = p))
        : (!u && !(t in e) && Ce(t, r),
          Dn.call(this, e, t, d, r, f, s || O.stringFilter, c));
  },
  kn = function (e, t, n, r, i) {
    if (
      (z(e) && (e = Ln(e, i, t, n, r)),
      !ae(e) || (e.style && e.nodeType) || V(e) || ce(e))
    )
      return R(e) ? Ln(e, i, t, n, r) : e;
    var a = {},
      o;
    for (o in e) a[o] = Ln(e[o], i, t, n, r);
    return a;
  },
  An = function (e, t, n, r, i, a) {
    var o, s, c, l;
    if (
      Pe[e] &&
      (o = new Pe[e]()).init(
        i,
        o.rawVars ? t[e] : kn(t[e], r, i, a, n),
        n,
        r,
        a
      ) !== !1 &&
      ((n._pt = s = new Z(n._pt, i, e, 0, 1, o.render, o, 0, o.priority)),
      n !== Qt)
    )
      for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--; )
        c[o._props[l]] = s;
    return o;
  },
  jn,
  Mn,
  Nn = function e(t, n, r) {
    var i = t.vars,
      a = i.ease,
      o = i.startAt,
      s = i.immediateRender,
      c = i.lazy,
      l = i.onUpdate,
      u = i.runBackwards,
      d = i.yoyoEase,
      f = i.keyframes,
      p = i.autoRevert,
      m = t._dur,
      h = t._startAt,
      g = t._targets,
      _ = t.parent,
      v = _ && _.data === `nested` ? _.vars.targets : g,
      y = t._overwrite === `auto` && !ee,
      b = t.timeline,
      x,
      S,
      C,
      w,
      T,
      E,
      D,
      O,
      j,
      P,
      F,
      I,
      L;
    if (
      (b && (!f || !a) && (a = `none`),
      (t._ease = bn(a, k.ease)),
      (t._yEase = d ? vn(bn(d === !0 ? a : d, k.ease)) : 0),
      d &&
        t._yoyo &&
        !t._repeat &&
        ((d = t._yEase), (t._yEase = t._ease), (t._ease = d)),
      (t._from = !b && !!i.runBackwards),
      !b || (f && !i.stagger))
    ) {
      if (
        ((O = g[0] ? Be(g[0]).harness : 0),
        (I = O && i[O.prop]),
        (x = $e(i, Ae)),
        h &&
          (h._zTime < 0 && h.progress(1),
          n < 0 && u && s && !p ? h.render(-1, !0) : h.revert(u && m ? Oe : De),
          (h._lazy = 0)),
        o)
      ) {
        if (
          (it(
            (t._startAt = X.set(
              g,
              Ye(
                {
                  data: `isStart`,
                  overwrite: !1,
                  parent: _,
                  immediateRender: !0,
                  lazy: !h && B(c),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    l &&
                    function () {
                      return Xt(t, `onUpdate`);
                    },
                  stagger: 0,
                },
                o
              )
            ))
          ),
          (t._startAt._dp = 0),
          (t._startAt._sat = t),
          n < 0 && (A || (!s && !p)) && t._startAt.revert(Oe),
          s && m && n <= 0 && r <= 0)
        ) {
          n && (t._zTime = n);
          return;
        }
      } else if (u && m && !h) {
        if (
          (n && (s = !1),
          (C = Ye(
            {
              overwrite: !1,
              data: `isFromStart`,
              lazy: s && !h && B(c),
              immediateRender: s,
              stagger: 0,
              parent: _,
            },
            x
          )),
          I && (C[O.prop] = I),
          it((t._startAt = X.set(g, C))),
          (t._startAt._dp = 0),
          (t._startAt._sat = t),
          n < 0 && (A ? t._startAt.revert(Oe) : t._startAt.render(-1, !0)),
          (t._zTime = n),
          !s)
        )
          e(t._startAt, N, N);
        else if (!n) return;
      }
      for (
        t._pt = t._ptCache = 0, c = (m && B(c)) || (c && !m), S = 0;
        S < g.length;
        S++
      ) {
        if (
          ((T = g[S]),
          (D = T._gsap || ze(g)[S]._gsap),
          (t._ptLookup[S] = P = {}),
          Me[D.id] && je.length && We(),
          (F = v === g ? S : v.indexOf(T)),
          O &&
            (j = new O()).init(T, I || x, t, F, v) !== !1 &&
            ((t._pt = w =
              new Z(t._pt, T, j.name, 0, 1, j.render, j, 0, j.priority)),
            j._props.forEach(function (e) {
              P[e] = w;
            }),
            j.priority && (E = 1)),
          !O || I)
        )
          for (C in x)
            Pe[C] && (j = An(C, x, t, F, T, v))
              ? j.priority && (E = 1)
              : (P[C] = w =
                  On.call(t, T, C, `get`, x[C], F, v, 0, i.stringFilter));
        t._op && t._op[S] && t.kill(T, t._op[S]),
          y &&
            t._pt &&
            ((jn = t),
            H.killTweensOf(T, P, t.globalTime(n)),
            (L = !t.parent),
            (jn = 0)),
          t._pt && c && (Me[D.id] = 1);
      }
      E && Qn(t), t._onInit && t._onInit(t);
    }
    (t._onUpdate = l),
      (t._initted = (!t._op || t._pt) && !L),
      f && n <= 0 && b.render(M, !0, !0);
  },
  Pn = function (e, t, n, r, i, a, o, s) {
    var c = ((e._pt && e._ptCache) || (e._ptCache = {}))[t],
      l,
      u,
      d,
      f;
    if (!c)
      for (
        c = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length;
        f--;

      ) {
        if (((l = d[f][t]), l && l.d && l.d._pt))
          for (l = l.d._pt; l && l.p !== t && l.fp !== t; ) l = l._next;
        if (!l)
          return (
            (Mn = 1),
            (e.vars[t] = `+=0`),
            Nn(e, o),
            (Mn = 0),
            s ? we(t + ` not eligible for reset`) : 1
          );
        c.push(l);
      }
    for (f = c.length; f--; )
      (u = c[f]),
        (l = u._pt || u),
        (l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c),
        (l.c = n - l.s),
        (u.e &&= W(n) + K(u.e)),
        (u.b &&= l.s + K(u.b));
  },
  Fn = function (e, t) {
    var n = e[0] ? Be(e[0]).harness : 0,
      r = n && n.aliases,
      i,
      a,
      o,
      s;
    if (!r) return t;
    for (a in ((i = Ze({}, t)), r))
      if (a in i) for (s = r[a].split(`,`), o = s.length; o--; ) i[s[o]] = i[a];
    return i;
  },
  In = function (e, t, n, r) {
    var i = t.ease || r || `power1.inOut`,
      a,
      o;
    if (V(t))
      (o = n[e] || (n[e] = [])),
        t.forEach(function (e, n) {
          return o.push({ t: (n / (t.length - 1)) * 100, v: e, e: i });
        });
    else
      for (a in t)
        (o = n[a] || (n[a] = [])),
          a === `ease` || o.push({ t: parseFloat(e), v: t[a], e: i });
  },
  Ln = function (e, t, n, r, i) {
    return z(e)
      ? e.call(t, n, r, i)
      : R(e) && ~e.indexOf(`random(`)
      ? Kt(e)
      : e;
  },
  Rn = Re + `repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert`,
  zn = {};
U(Rn + `,id,stagger,delay,duration,paused,scrollTrigger`, function (e) {
  return (zn[e] = 1);
});
var X = (function (e) {
  D(t, e);
  function t(t, n, r, i) {
    var a;
    typeof n == `number` && ((r.duration = n), (n = r), (r = null)),
      (a = e.call(this, i ? n : et(n)) || this);
    var o = a.vars,
      s = o.duration,
      c = o.delay,
      l = o.immediateRender,
      u = o.stagger,
      d = o.overwrite,
      f = o.keyframes,
      p = o.defaults,
      m = o.scrollTrigger,
      h = o.yoyoEase,
      g = n.parent || H,
      _ = (V(t) || ce(t) ? re(t[0]) : `length` in n) ? [t] : Nt(t),
      v,
      y,
      b,
      x,
      S,
      C,
      w,
      T;
    if (
      ((a._targets = _.length
        ? ze(_)
        : we(
            `GSAP target ` + t + ` not found. https://gsap.com`,
            !O.nullTargetWarn
          ) || []),
      (a._ptLookup = []),
      (a._overwrite = d),
      f || u || se(s) || se(c))
    ) {
      if (
        ((n = a.vars),
        (v = a.timeline =
          new Y({
            data: `nested`,
            defaults: p || {},
            targets: g && g.data === `nested` ? g.vars.targets : _,
          })),
        v.kill(),
        (v.parent = v._dp = E(a)),
        (v._start = 0),
        u || se(s) || se(c))
      ) {
        if (((x = _.length), (w = u && It(u)), ae(u)))
          for (S in u) ~Rn.indexOf(S) && ((T ||= {}), (T[S] = u[S]));
        for (y = 0; y < x; y++)
          (b = $e(n, zn)),
            (b.stagger = 0),
            h && (b.yoyoEase = h),
            T && Ze(b, T),
            (C = _[y]),
            (b.duration = +Ln(s, E(a), y, C, _)),
            (b.delay = (+Ln(c, E(a), y, C, _) || 0) - a._delay),
            !u &&
              x === 1 &&
              b.delay &&
              ((a._delay = c = b.delay), (a._start += c), (b.delay = 0)),
            v.to(C, b, w ? w(y, C, _) : 0),
            (v._ease = J.none);
        v.duration() ? (s = c = 0) : (a.timeline = 0);
      } else if (f) {
        et(Ye(v.vars.defaults, { ease: `none` })),
          (v._ease = bn(f.ease || n.ease || `none`));
        var D = 0,
          k,
          A,
          j;
        if (V(f))
          f.forEach(function (e) {
            return v.to(_, e, `>`);
          }),
            v.duration();
        else {
          for (S in ((b = {}), f))
            S === `ease` || S === `easeEach` || In(S, f[S], b, f.easeEach);
          for (S in b)
            for (
              k = b[S].sort(function (e, t) {
                return e.t - t.t;
              }),
                D = 0,
                y = 0;
              y < k.length;
              y++
            )
              (A = k[y]),
                (j = {
                  ease: A.e,
                  duration: ((A.t - (y ? k[y - 1].t : 0)) / 100) * s,
                }),
                (j[S] = A.v),
                v.to(_, j, D),
                (D += j.duration);
          v.duration() < s && v.to({}, { duration: s - v.duration() });
        }
      }
      s || a.duration((s = v.duration()));
    } else a.timeline = 0;
    return (
      d === !0 && !ee && ((jn = E(a)), H.killTweensOf(_), (jn = 0)),
      ht(g, E(a), r),
      n.reversed && a.reverse(),
      n.paused && a.paused(!0),
      (l ||
        (!s &&
          !f &&
          a._start === G(g._time) &&
          B(l) &&
          ct(E(a)) &&
          g.data !== `nested`)) &&
        ((a._tTime = -N), a.render(Math.max(0, -c) || 0)),
      m && gt(E(a), m),
      a
    );
  }
  var n = t.prototype;
  return (
    (n.render = function (e, t, n) {
      var r = this._time,
        i = this._tDur,
        a = this._dur,
        o = e < 0,
        s = e > i - N && !o ? i : e < N ? 0 : e,
        c,
        l,
        u,
        d,
        f,
        p,
        m,
        h,
        g;
      if (!a) bt(this, e, t, n);
      else if (
        s !== this._tTime ||
        !e ||
        n ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== o) ||
        this._lazy
      ) {
        if (((c = s), (h = this.timeline), this._repeat)) {
          if (((d = a + this._rDelay), this._repeat < -1 && o))
            return this.totalTime(d * 100 + e, t, n);
          if (
            ((c = G(s % d)),
            s === i
              ? ((u = this._repeat), (c = a))
              : ((f = G(s / d)),
                (u = ~~f),
                u && u === f ? ((c = a), u--) : c > a && (c = a)),
            (p = this._yoyo && u & 1),
            p && ((g = this._yEase), (c = a - c)),
            (f = ut(this._tTime, d)),
            c === r && !n && this._initted && u === f)
          )
            return (this._tTime = s), this;
          u !== f &&
            (h && this._yEase && yn(h, p),
            this.vars.repeatRefresh &&
              !p &&
              !this._lock &&
              c !== d &&
              this._initted &&
              ((this._lock = n = 1),
              (this.render(G(d * u), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (_t(this, o ? e : c, n, t, s)) return (this._tTime = 0), this;
          if (r !== this._time && !(n && this.vars.repeatRefresh && u !== f))
            return this;
          if (a !== this._dur) return this.render(e, t, n);
        }
        if (
          ((this._tTime = s),
          (this._time = c),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = m = (g || this._ease)(c / a)),
          this._from && (this.ratio = m = 1 - m),
          !r && s && !t && !f && (Xt(this, `onStart`), this._tTime !== s))
        )
          return this;
        for (l = this._pt; l; ) l.r(m, l.d), (l = l._next);
        (h && h.render(e < 0 ? e : h._dur * h._ease(c / this._dur), t, n)) ||
          (this._startAt && (this._zTime = e)),
          this._onUpdate &&
            !t &&
            (o && st(this, e, t, n), Xt(this, `onUpdate`)),
          this._repeat &&
            u !== f &&
            this.vars.onRepeat &&
            !t &&
            this.parent &&
            Xt(this, `onRepeat`),
          (s === this._tDur || !s) &&
            this._tTime === s &&
            (o && !this._onUpdate && st(this, e, !0, !0),
            (e || !a) &&
              ((s === this._tDur && this._ts > 0) || (!s && this._ts < 0)) &&
              it(this, 1),
            !t &&
              !(o && !r) &&
              (s || r || p) &&
              (Xt(this, s === i ? `onComplete` : `onReverseComplete`, !0),
              this._prom && !(s < i && this.timeScale() > 0) && this._prom()));
      }
      return this;
    }),
    (n.targets = function () {
      return this._targets;
    }),
    (n.invalidate = function (t) {
      return (
        (!t || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(t),
        e.prototype.invalidate.call(this, t)
      );
    }),
    (n.resetTo = function (e, t, n, r, i) {
      un || dn.wake(), this._ts || this.play();
      var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        o;
      return (
        this._initted || Nn(this, a),
        (o = this._ease(a / this._dur)),
        Pn(this, e, t, n, r, o, a, i)
          ? this.resetTo(e, t, n, r, 1)
          : (pt(this, 0),
            this.parent ||
              nt(
                this._dp,
                this,
                `_first`,
                `_last`,
                this._dp._sort ? `_start` : 0
              ),
            this.render(0))
      );
    }),
    (n.kill = function (e, t) {
      if ((t === void 0 && (t = `all`), !e && (!t || t === `all`)))
        return (
          (this._lazy = this._pt = 0),
          this.parent
            ? Zt(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!A),
          this
        );
      if (this.timeline) {
        var n = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(e, t, jn && jn.vars.overwrite !== !0)
            ._first || Zt(this),
          this.parent &&
            n !== this.timeline.totalDuration() &&
            St(this, (this._dur * this.timeline._tDur) / n, 0, 1),
          this
        );
      }
      var r = this._targets,
        i = e ? Nt(e) : r,
        a = this._ptLookup,
        o = this._pt,
        s,
        c,
        l,
        u,
        d,
        f,
        p;
      if ((!t || t === `all`) && tt(r, i))
        return t === `all` && (this._pt = 0), Zt(this);
      for (
        s = this._op = this._op || [],
          t !== `all` &&
            (R(t) &&
              ((d = {}),
              U(t, function (e) {
                return (d[e] = 1);
              }),
              (t = d)),
            (t = Fn(r, t))),
          p = r.length;
        p--;

      )
        if (~i.indexOf(r[p]))
          for (d in ((c = a[p]),
          t === `all`
            ? ((s[p] = t), (u = c), (l = {}))
            : ((l = s[p] = s[p] || {}), (u = t)),
          u))
            (f = c && c[d]),
              f &&
                ((!(`kill` in f.d) || f.d.kill(d) === !0) && rt(this, f, `_pt`),
                delete c[d]),
              l !== `all` && (l[d] = 1);
      return this._initted && !this._pt && o && Zt(this), this;
    }),
    (t.to = function (e, n) {
      return new t(e, n, arguments[2]);
    }),
    (t.from = function (e, t) {
      return Et(1, arguments);
    }),
    (t.delayedCall = function (e, n, r, i) {
      return new t(n, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: e,
        onComplete: n,
        onReverseComplete: n,
        onCompleteParams: r,
        onReverseCompleteParams: r,
        callbackScope: i,
      });
    }),
    (t.fromTo = function (e, t, n) {
      return Et(2, arguments);
    }),
    (t.set = function (e, n) {
      return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new t(e, n);
    }),
    (t.killTweensOf = function (e, t, n) {
      return H.killTweensOf(e, t, n);
    }),
    t
  );
})(En);
Ye(X.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
  U(`staggerTo,staggerFrom,staggerFromTo`, function (e) {
    X[e] = function () {
      var t = new Y(),
        n = At.call(arguments, 0);
      return n.splice(e === `staggerFromTo` ? 5 : 4, 0, 0), t[e].apply(t, n);
    };
  });
var Bn = function (e, t, n) {
    return (e[t] = n);
  },
  Vn = function (e, t, n) {
    return e[t](n);
  },
  Hn = function (e, t, n, r) {
    return e[t](r.fp, n);
  },
  Un = function (e, t, n) {
    return e.setAttribute(t, n);
  },
  Wn = function (e, t) {
    return z(e[t]) ? Vn : ie(e[t]) && e.setAttribute ? Un : Bn;
  },
  Gn = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
  },
  Kn = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t);
  },
  qn = function (e, t) {
    var n = t._pt,
      r = ``;
    if (!e && t.b) r = t.b;
    else if (e === 1 && t.e) r = t.e;
    else {
      for (; n; )
        (r =
          n.p +
          (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) +
          r),
          (n = n._next);
      r += t.c;
    }
    t.set(t.t, t.p, r, t);
  },
  Jn = function (e, t) {
    for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next);
  },
  Yn = function (e, t, n, r) {
    for (var i = this._pt, a; i; )
      (a = i._next), i.p === r && i.modifier(e, t, n), (i = a);
  },
  Xn = function (e) {
    for (var t = this._pt, n, r; t; )
      (r = t._next),
        (t.p === e && !t.op) || t.op === e
          ? rt(this, t, `_pt`)
          : t.dep || (n = 1),
        (t = r);
    return !n;
  },
  Zn = function (e, t, n, r) {
    r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
  },
  Qn = function (e) {
    for (var t = e._pt, n, r, i, a; t; ) {
      for (n = t._next, r = i; r && r.pr > t.pr; ) r = r._next;
      (t._prev = r ? r._prev : a) ? (t._prev._next = t) : (i = t),
        (t._next = r) ? (r._prev = t) : (a = t),
        (t = n);
    }
    e._pt = i;
  },
  Z = (function () {
    function e(e, t, n, r, i, a, o, s, c) {
      (this.t = t),
        (this.s = r),
        (this.c = i),
        (this.p = n),
        (this.r = a || Gn),
        (this.d = o || this),
        (this.set = s || Bn),
        (this.pr = c || 0),
        (this._next = e),
        e && (e._prev = this);
    }
    var t = e.prototype;
    return (
      (t.modifier = function (e, t, n) {
        (this.mSet = this.mSet || this.set),
          (this.set = Zn),
          (this.m = e),
          (this.mt = n),
          (this.tween = t);
      }),
      e
    );
  })();
U(
  Re +
    `parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger`,
  function (e) {
    return (Ae[e] = 1);
  }
),
  (ye.TweenMax = ye.TweenLite = X),
  (ye.TimelineLite = ye.TimelineMax = Y),
  (H = new Y({
    sortChildren: !1,
    defaults: k,
    autoRemoveChildren: !0,
    id: `root`,
    smoothChildTiming: !0,
  })),
  (O.stringFilter = ln);
var $n = [],
  er = {},
  tr = [],
  nr = 0,
  rr = 0,
  ir = function (e) {
    return (er[e] || tr).map(function (e) {
      return e();
    });
  },
  ar = function () {
    var e = Date.now(),
      t = [];
    e - nr > 2 &&
      (ir(`matchMediaInit`),
      $n.forEach(function (e) {
        var n = e.queries,
          r = e.conditions,
          i,
          a,
          o,
          s;
        for (a in n)
          (i = ge.matchMedia(n[a]).matches),
            i && (o = 1),
            i !== r[a] && ((r[a] = i), (s = 1));
        s && (e.revert(), o && t.push(e));
      }),
      ir(`matchMediaRevert`),
      t.forEach(function (e) {
        return e.onMatch(e, function (t) {
          return e.add(null, t);
        });
      }),
      (nr = e),
      ir(`matchMedia`));
  },
  or = (function () {
    function e(e, t) {
      (this.selector = t && Pt(t)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = rr++),
        e && this.add(e);
    }
    var t = e.prototype;
    return (
      (t.add = function (e, t, n) {
        z(e) && ((n = t), (t = e), (e = z));
        var r = this,
          i = function () {
            var e = j,
              i = r.selector,
              a;
            return (
              e && e !== r && e.data.push(r),
              n && (r.selector = Pt(n)),
              (j = r),
              (a = t.apply(r, arguments)),
              z(a) && r._r.push(a),
              (j = e),
              (r.selector = i),
              (r.isReverted = !1),
              a
            );
          };
        return (
          (r.last = i),
          e === z
            ? i(r, function (e) {
                return r.add(null, e);
              })
            : e
            ? (r[e] = i)
            : i
        );
      }),
      (t.ignore = function (e) {
        var t = j;
        (j = null), e(this), (j = t);
      }),
      (t.getTweens = function () {
        var t = [];
        return (
          this.data.forEach(function (n) {
            return n instanceof e
              ? t.push.apply(t, n.getTweens())
              : n instanceof X &&
                  !(n.parent && n.parent.data === `nested`) &&
                  t.push(n);
          }),
          t
        );
      }),
      (t.clear = function () {
        this._r.length = this.data.length = 0;
      }),
      (t.kill = function (e, t) {
        var n = this;
        if (
          (e
            ? (function () {
                for (var t = n.getTweens(), r = n.data.length, i; r--; )
                  (i = n.data[r]),
                    i.data === `isFlip` &&
                      (i.revert(),
                      i.getChildren(!0, !0, !1).forEach(function (e) {
                        return t.splice(t.indexOf(e), 1);
                      }));
                for (
                  t
                    .map(function (e) {
                      return {
                        g:
                          e._dur ||
                          e._delay ||
                          (e._sat && !e._sat.vars.immediateRender)
                            ? e.globalTime(0)
                            : -1 / 0,
                        t: e,
                      };
                    })
                    .sort(function (e, t) {
                      return t.g - e.g || -1 / 0;
                    })
                    .forEach(function (t) {
                      return t.t.revert(e);
                    }),
                    r = n.data.length;
                  r--;

                )
                  (i = n.data[r]),
                    i instanceof Y
                      ? i.data !== `nested` &&
                        (i.scrollTrigger && i.scrollTrigger.revert(), i.kill())
                      : !(i instanceof X) && i.revert && i.revert(e);
                n._r.forEach(function (t) {
                  return t(e, n);
                }),
                  (n.isReverted = !0);
              })()
            : this.data.forEach(function (e) {
                return e.kill && e.kill();
              }),
          this.clear(),
          t)
        )
          for (var r = $n.length; r--; )
            $n[r].id === this.id && $n.splice(r, 1);
      }),
      (t.revert = function (e) {
        this.kill(e || {});
      }),
      e
    );
  })(),
  sr = (function () {
    function e(e) {
      (this.contexts = []), (this.scope = e), j && j.data.push(this);
    }
    var t = e.prototype;
    return (
      (t.add = function (e, t, n) {
        ae(e) || (e = { matches: e });
        var r = new or(0, n || this.scope),
          i = (r.conditions = {}),
          a,
          o,
          s;
        for (o in (j && !r.selector && (r.selector = j.selector),
        this.contexts.push(r),
        (t = r.add(`onMatch`, t)),
        (r.queries = e),
        e))
          o === `all`
            ? (s = 1)
            : ((a = ge.matchMedia(e[o])),
              a &&
                ($n.indexOf(r) < 0 && $n.push(r),
                (i[o] = a.matches) && (s = 1),
                a.addListener
                  ? a.addListener(ar)
                  : a.addEventListener(`change`, ar)));
        return (
          s &&
            t(r, function (e) {
              return r.add(null, e);
            }),
          this
        );
      }),
      (t.revert = function (e) {
        this.kill(e || {});
      }),
      (t.kill = function (e) {
        this.contexts.forEach(function (t) {
          return t.kill(e, !0);
        });
      }),
      e
    );
  })(),
  cr = {
    registerPlugin: function () {
      [...arguments].forEach(function (e) {
        return en(e);
      });
    },
    timeline: function (e) {
      return new Y(e);
    },
    getTweensOf: function (e, t) {
      return H.getTweensOf(e, t);
    },
    getProperty: function (e, t, n, r) {
      R(e) && (e = Nt(e)[0]);
      var i = Be(e || {}).get,
        a = n ? Je : qe;
      return (
        n === `native` && (n = ``),
        e &&
          (t
            ? a(((Pe[t] && Pe[t].get) || i)(e, t, n, r))
            : function (t, n, r) {
                return a(((Pe[t] && Pe[t].get) || i)(e, t, n, r));
              })
      );
    },
    quickSetter: function (e, t, n) {
      if (((e = Nt(e)), e.length > 1)) {
        var r = e.map(function (e) {
            return Q.quickSetter(e, t, n);
          }),
          i = r.length;
        return function (e) {
          for (var t = i; t--; ) r[t](e);
        };
      }
      e = e[0] || {};
      var a = Pe[t],
        o = Be(e),
        s = (o.harness && (o.harness.aliases || {})[t]) || t,
        c = a
          ? function (t) {
              var r = new a();
              (Qt._pt = 0),
                r.init(e, n ? t + n : t, Qt, 0, [e]),
                r.render(1, r),
                Qt._pt && Jn(1, Qt);
            }
          : o.set(e, s);
      return a
        ? c
        : function (t) {
            return c(e, s, n ? t + n : t, o, 1);
          };
    },
    quickTo: function (e, t, n) {
      var r,
        i = Q.to(
          e,
          Ye(
            ((r = {}), (r[t] = `+=0.1`), (r.paused = !0), (r.stagger = 0), r),
            n || {}
          )
        ),
        a = function (e, n, r) {
          return i.resetTo(t, e, n, r);
        };
      return (a.tween = i), a;
    },
    isTweening: function (e) {
      return H.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = bn(e.ease, k.ease)), Qe(k, e || {});
    },
    config: function (e) {
      return Qe(O, e || {});
    },
    registerEffect: function (e) {
      var t = e.name,
        n = e.effect,
        r = e.plugins,
        i = e.defaults,
        a = e.extendTimeline;
      (r || ``).split(`,`).forEach(function (e) {
        return (
          e && !Pe[e] && !ye[e] && we(t + ` effect requires ` + e + ` plugin.`)
        );
      }),
        (Fe[t] = function (e, t, r) {
          return n(Nt(e), Ye(t || {}, i), r);
        }),
        a &&
          (Y.prototype[t] = function (e, n, r) {
            return this.add(Fe[t](e, ae(n) ? n : (r = n) && {}, this), r);
          });
    },
    registerEase: function (e, t) {
      J[e] = bn(t);
    },
    parseEase: function (e, t) {
      return arguments.length ? bn(e, t) : J;
    },
    getById: function (e) {
      return H.getById(e);
    },
    exportRoot: function (e, t) {
      e === void 0 && (e = {});
      var n = new Y(e),
        r,
        i;
      for (
        n.smoothChildTiming = B(e.smoothChildTiming),
          H.remove(n),
          n._dp = 0,
          n._time = n._tTime = H._time,
          r = H._first;
        r;

      )
        (i = r._next),
          (t ||
            !(
              !r._dur &&
              r instanceof X &&
              r.vars.onComplete === r._targets[0]
            )) &&
            ht(n, r, r._start - r._delay),
          (r = i);
      return ht(H, n, 0), n;
    },
    context: function (e, t) {
      return e ? new or(e, t) : j;
    },
    matchMedia: function (e) {
      return new sr(e);
    },
    matchMediaRefresh: function () {
      return (
        $n.forEach(function (e) {
          var t = e.conditions,
            n,
            r;
          for (r in t) t[r] && ((t[r] = !1), (n = 1));
          n && e.revert();
        }) || ar()
      );
    },
    addEventListener: function (e, t) {
      var n = er[e] || (er[e] = []);
      ~n.indexOf(t) || n.push(t);
    },
    removeEventListener: function (e, t) {
      var n = er[e],
        r = n && n.indexOf(t);
      r >= 0 && n.splice(r, 1);
    },
    utils: {
      wrap: Wt,
      wrapYoyo: Gt,
      distribute: It,
      random: zt,
      snap: Rt,
      normalize: Ht,
      getUnit: K,
      clamp: kt,
      splitColor: rn,
      toArray: Nt,
      selector: Pt,
      mapRange: qt,
      pipe: Bt,
      unitize: Vt,
      interpolate: Jt,
      shuffle: Ft,
    },
    install: Se,
    effects: Fe,
    ticker: dn,
    updateRoot: Y.updateRoot,
    plugins: Pe,
    globalTimeline: H,
    core: {
      PropTween: Z,
      globals: Te,
      Tween: X,
      Timeline: Y,
      Animation: En,
      getCache: Be,
      _removeLinkedListItem: rt,
      reverting: function () {
        return A;
      },
      context: function (e) {
        return e && j && (j.data.push(e), (e._ctx = j)), j;
      },
      suppressOverwrites: function (e) {
        return (ee = e);
      },
    },
  };
U(`to,from,fromTo,delayedCall,set,killTweensOf`, function (e) {
  return (cr[e] = X[e]);
}),
  dn.add(Y.updateRoot),
  (Qt = cr.to({}, { duration: 0 }));
var lr = function (e, t) {
    for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
      n = n._next;
    return n;
  },
  ur = function (e, t) {
    var n = e._targets,
      r,
      i,
      a;
    for (r in t)
      for (i = n.length; i--; )
        (a = e._ptLookup[i][r]),
          (a &&= a.d) &&
            (a._pt && (a = lr(a, r)),
            a && a.modifier && a.modifier(t[r], e, n[i], r));
  },
  dr = function (e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (e, n, r) {
        r._onInit = function (e) {
          var r, i;
          if (
            (R(n) &&
              ((r = {}),
              U(n, function (e) {
                return (r[e] = 1);
              }),
              (n = r)),
            t)
          ) {
            for (i in ((r = {}), n)) r[i] = t(n[i]);
            n = r;
          }
          ur(e, n);
        };
      },
    };
  },
  Q =
    cr.registerPlugin(
      {
        name: `attr`,
        init: function (e, t, n, r, i) {
          var a, o, s;
          for (a in ((this.tween = n), t))
            (s = e.getAttribute(a) || ``),
              (o = this.add(
                e,
                `setAttribute`,
                (s || 0) + ``,
                t[a],
                r,
                i,
                0,
                0,
                a
              )),
              (o.op = a),
              (o.b = s),
              this._props.push(a);
        },
        render: function (e, t) {
          for (var n = t._pt; n; )
            A ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), (n = n._next);
        },
      },
      {
        name: `endArray`,
        headless: 1,
        init: function (e, t) {
          for (var n = t.length; n--; )
            this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
        },
      },
      dr(`roundProps`, Lt),
      dr(`modifiers`),
      dr(`snap`, Rt)
    ) || cr;
(X.version = Y.version = Q.version = `3.13.0`),
  (xe = 1),
  oe() && fn(),
  J.Power0,
  J.Power1,
  J.Power2,
  J.Power3,
  J.Power4,
  J.Linear,
  J.Quad,
  J.Cubic,
  J.Quart,
  J.Quint,
  J.Strong,
  J.Elastic,
  J.Back,
  J.SteppedEase,
  J.Bounce,
  J.Sine,
  J.Expo,
  J.Circ;
var fr,
  pr,
  mr,
  hr,
  gr,
  _r,
  vr,
  yr = function () {
    return typeof window < `u`;
  },
  br = {},
  xr = 180 / Math.PI,
  Sr = Math.PI / 180,
  Cr = Math.atan2,
  wr = 1e8,
  Tr = /([A-Z])/g,
  Er = /(left|right|width|margin|padding|x)/i,
  Dr = /[\s,\(]\S/,
  Or = {
    autoAlpha: `opacity,visibility`,
    scale: `scaleX,scaleY`,
    alpha: `opacity`,
  },
  kr = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
  },
  Ar = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    );
  },
  jr = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  Mr = function (e, t) {
    var n = t.s + t.c * e;
    t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t);
  },
  Nr = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t);
  },
  Pr = function (e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : t.b, t);
  },
  Fr = function (e, t, n) {
    return (e.style[t] = n);
  },
  Ir = function (e, t, n) {
    return e.style.setProperty(t, n);
  },
  Lr = function (e, t, n) {
    return (e._gsap[t] = n);
  },
  Rr = function (e, t, n) {
    return (e._gsap.scaleX = e._gsap.scaleY = n);
  },
  zr = function (e, t, n, r, i) {
    var a = e._gsap;
    (a.scaleX = a.scaleY = n), a.renderTransform(i, a);
  },
  Br = function (e, t, n, r, i) {
    var a = e._gsap;
    (a[t] = n), a.renderTransform(i, a);
  },
  $ = `transform`,
  Vr = $ + `Origin`,
  Hr = function e(t, n) {
    var r = this,
      i = this.target,
      a = i.style,
      o = i._gsap;
    if (t in br && a) {
      if (((this.tfm = this.tfm || {}), t !== `transform`))
        (t = Or[t] || t),
          ~t.indexOf(`,`)
            ? t.split(`,`).forEach(function (e) {
                return (r.tfm[e] = si(i, e));
              })
            : (this.tfm[t] = o.x ? o[t] : si(i, t)),
          t === Vr && (this.tfm.zOrigin = o.zOrigin);
      else
        return Or.transform.split(`,`).forEach(function (t) {
          return e.call(r, t, n);
        });
      if (this.props.indexOf($) >= 0) return;
      o.svg &&
        ((this.svgo = i.getAttribute(`data-svg-origin`)),
        this.props.push(Vr, n, ``)),
        (t = $);
    }
    (a || n) && this.props.push(t, n, a[t]);
  },
  Ur = function (e) {
    e.translate &&
      (e.removeProperty(`translate`),
      e.removeProperty(`scale`),
      e.removeProperty(`rotate`));
  },
  Wr = function () {
    var e = this.props,
      t = this.target,
      n = t.style,
      r = t._gsap,
      i,
      a;
    for (i = 0; i < e.length; i += 3)
      e[i + 1]
        ? e[i + 1] === 2
          ? t[e[i]](e[i + 2])
          : (t[e[i]] = e[i + 2])
        : e[i + 2]
        ? (n[e[i]] = e[i + 2])
        : n.removeProperty(
            e[i].substr(0, 2) === `--`
              ? e[i]
              : e[i].replace(Tr, `-$1`).toLowerCase()
          );
    if (this.tfm) {
      for (a in this.tfm) r[a] = this.tfm[a];
      r.svg &&
        (r.renderTransform(),
        t.setAttribute(`data-svg-origin`, this.svgo || ``)),
        (i = vr()),
        (!i || !i.isStart) &&
          !n[$] &&
          (Ur(n),
          r.zOrigin &&
            n[Vr] &&
            ((n[Vr] += ` ` + r.zOrigin + `px`),
            (r.zOrigin = 0),
            r.renderTransform()),
          (r.uncache = 1));
    }
  },
  Gr = function (e, t) {
    var n = { target: e, props: [], revert: Wr, save: Hr };
    return (
      e._gsap || Q.core.getCache(e),
      t &&
        e.style &&
        e.nodeType &&
        t.split(`,`).forEach(function (e) {
          return n.save(e);
        }),
      n
    );
  },
  Kr,
  qr = function (e, t) {
    var n = pr.createElementNS
      ? pr.createElementNS(
          (t || `http://www.w3.org/1999/xhtml`).replace(/^https/, `http`),
          e
        )
      : pr.createElement(e);
    return n && n.style ? n : pr.createElement(e);
  },
  Jr = function e(t, n, r) {
    var i = getComputedStyle(t);
    return (
      i[n] ||
      i.getPropertyValue(n.replace(Tr, `-$1`).toLowerCase()) ||
      i.getPropertyValue(n) ||
      (!r && e(t, Xr(n) || n, 1)) ||
      ``
    );
  },
  Yr = `O,Moz,ms,Ms,Webkit`.split(`,`),
  Xr = function (e, t, n) {
    var r = (t || gr).style,
      i = 5;
    if (e in r && !n) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      i-- && !(Yr[i] + e in r);

    );
    return i < 0 ? null : (i === 3 ? `ms` : i >= 0 ? Yr[i] : ``) + e;
  },
  Zr = function () {
    yr() &&
      window.document &&
      ((fr = window),
      (pr = fr.document),
      (mr = pr.documentElement),
      (gr = qr(`div`) || { style: {} }),
      qr(`div`),
      ($ = Xr($)),
      (Vr = $ + `Origin`),
      (gr.style.cssText = `border-width:0;line-height:0;position:absolute;padding:0`),
      (Kr = !!Xr(`perspective`)),
      (vr = Q.core.reverting),
      (hr = 1));
  },
  Qr = function (e) {
    var t = e.ownerSVGElement,
      n = qr(
        `svg`,
        (t && t.getAttribute(`xmlns`)) || `http://www.w3.org/2000/svg`
      ),
      r = e.cloneNode(!0),
      i;
    (r.style.display = `block`), n.appendChild(r), mr.appendChild(n);
    try {
      i = r.getBBox();
    } catch {}
    return n.removeChild(r), mr.removeChild(n), i;
  },
  $r = function (e, t) {
    for (var n = t.length; n--; )
      if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
  },
  ei = function (e) {
    var t, n;
    try {
      t = e.getBBox();
    } catch {
      (t = Qr(e)), (n = 1);
    }
    return (
      (t && (t.width || t.height)) || n || (t = Qr(e)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +$r(e, [`x`, `cx`, `x1`]) || 0,
            y: +$r(e, [`y`, `cy`, `y1`]) || 0,
            width: 0,
            height: 0,
          }
        : t
    );
  },
  ti = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ei(e));
  },
  ni = function (e, t) {
    if (t) {
      var n = e.style,
        r;
      t in br && t !== Vr && (t = $),
        n.removeProperty
          ? ((r = t.substr(0, 2)),
            (r === `ms` || t.substr(0, 6) === `webkit`) && (t = `-` + t),
            n.removeProperty(
              r === `--` ? t : t.replace(Tr, `-$1`).toLowerCase()
            ))
          : n.removeAttribute(t);
    }
  },
  ri = function (e, t, n, r, i, a) {
    var o = new Z(e._pt, t, n, 0, 1, a ? Pr : Nr);
    return (e._pt = o), (o.b = r), (o.e = i), e._props.push(n), o;
  },
  ii = { deg: 1, rad: 1, turn: 1 },
  ai = { grid: 1, flex: 1 },
  oi = function e(t, n, r, i) {
    var a = parseFloat(r) || 0,
      o = (r + ``).trim().substr((a + ``).length) || `px`,
      s = gr.style,
      c = Er.test(n),
      l = t.tagName.toLowerCase() === `svg`,
      u = (l ? `client` : `offset`) + (c ? `Width` : `Height`),
      d = 100,
      f = i === `px`,
      p = i === `%`,
      m,
      h,
      g,
      _;
    if (i === o || !a || ii[i] || ii[o]) return a;
    if (
      (o !== `px` && !f && (a = e(t, n, r, `px`)),
      (_ = t.getCTM && ti(t)),
      (p || o === `%`) && (br[n] || ~n.indexOf(`adius`)))
    )
      return (
        (m = _ ? t.getBBox()[c ? `width` : `height`] : t[u]),
        W(p ? (a / m) * d : (a / 100) * m)
      );
    if (
      ((s[c ? `width` : `height`] = d + (f ? o : i)),
      (h =
        (i !== `rem` && ~n.indexOf(`adius`)) ||
        (i === `em` && t.appendChild && !l)
          ? t
          : t.parentNode),
      _ && (h = (t.ownerSVGElement || {}).parentNode),
      (!h || h === pr || !h.appendChild) && (h = pr.body),
      (g = h._gsap),
      g && p && g.width && c && g.time === dn.time && !g.uncache)
    )
      return W((a / g.width) * d);
    if (p && (n === `height` || n === `width`)) {
      var v = t.style[n];
      (t.style[n] = d + i), (m = t[u]), v ? (t.style[n] = v) : ni(t, n);
    } else
      (p || o === `%`) &&
        !ai[Jr(h, `display`)] &&
        (s.position = Jr(t, `position`)),
        h === t && (s.position = `static`),
        h.appendChild(gr),
        (m = gr[u]),
        h.removeChild(gr),
        (s.position = `absolute`);
    return (
      c && p && ((g = Be(h)), (g.time = dn.time), (g.width = h[u])),
      W(f ? (m * a) / d : m && a ? (d / m) * a : 0)
    );
  },
  si = function (e, t, n, r) {
    var i;
    return (
      hr || Zr(),
      t in Or &&
        t !== `transform` &&
        ((t = Or[t]), ~t.indexOf(`,`) && (t = t.split(`,`)[0])),
      br[t] && t !== `transform`
        ? ((i = yi(e, r)),
          (i =
            t === `transformOrigin`
              ? i.svg
                ? i.origin
                : bi(Jr(e, Vr)) + ` ` + i.zOrigin + `px`
              : i[t]))
        : ((i = e.style[t]),
          (!i || i === `auto` || r || ~(i + ``).indexOf(`calc(`)) &&
            (i =
              (fi[t] && fi[t](e, t, n)) ||
              Jr(e, t) ||
              Ve(e, t) ||
              (t === `opacity` ? 1 : 0))),
      n && !~(i + ``).trim().indexOf(` `) ? oi(e, t, i, n) + n : i
    );
  },
  ci = function (e, t, n, r) {
    if (!n || n === `none`) {
      var i = Xr(t, e, 1),
        a = i && Jr(e, i, 1);
      a && a !== n
        ? ((t = i), (n = a))
        : t === `borderColor` && (n = Jr(e, `borderTopColor`));
    }
    var o = new Z(this._pt, e.style, t, 0, 1, qn),
      s = 0,
      c = 0,
      l,
      u,
      d,
      f,
      p,
      m,
      h,
      g,
      _,
      v,
      y,
      b;
    if (
      ((o.b = n),
      (o.e = r),
      (n += ``),
      (r += ``),
      r.substring(0, 6) === `var(--` &&
        (r = Jr(e, r.substring(4, r.indexOf(`)`)))),
      r === `auto` &&
        ((m = e.style[t]),
        (e.style[t] = r),
        (r = Jr(e, t) || r),
        m ? (e.style[t] = m) : ni(e, t)),
      (l = [n, r]),
      ln(l),
      (n = l[0]),
      (r = l[1]),
      (d = n.match(de) || []),
      (b = r.match(de) || []),
      b.length)
    ) {
      for (; (u = de.exec(r)); )
        (h = u[0]),
          (_ = r.substring(s, u.index)),
          p
            ? (p = (p + 1) % 5)
            : (_.substr(-5) === `rgba(` || _.substr(-5) === `hsla(`) && (p = 1),
          h !== (m = d[c++] || ``) &&
            ((f = parseFloat(m) || 0),
            (y = m.substr((f + ``).length)),
            h.charAt(1) === `=` && (h = He(f, h) + y),
            (g = parseFloat(h)),
            (v = h.substr((g + ``).length)),
            (s = de.lastIndex - v.length),
            v ||
              ((v = v || O.units[t] || y),
              s === r.length && ((r += v), (o.e += v))),
            y !== v && (f = oi(e, t, m, v) || 0),
            (o._pt = {
              _next: o._pt,
              p: _ || c === 1 ? _ : `,`,
              s: f,
              c: g - f,
              m: (p && p < 4) || t === `zIndex` ? Math.round : 0,
            }));
      o.c = s < r.length ? r.substring(s, r.length) : ``;
    } else o.r = t === `display` && r === `none` ? Pr : Nr;
    return pe.test(r) && (o.e = 0), (this._pt = o), o;
  },
  li = { top: `0%`, bottom: `100%`, left: `0%`, right: `100%`, center: `50%` },
  ui = function (e) {
    var t = e.split(` `),
      n = t[0],
      r = t[1] || `50%`;
    return (
      (n === `top` || n === `bottom` || r === `left` || r === `right`) &&
        ((e = n), (n = r), (r = e)),
      (t[0] = li[n] || n),
      (t[1] = li[r] || r),
      t.join(` `)
    );
  },
  di = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var n = t.t,
        r = n.style,
        i = t.u,
        a = n._gsap,
        o,
        s,
        c;
      if (i === `all` || i === !0) (r.cssText = ``), (s = 1);
      else
        for (i = i.split(`,`), c = i.length; --c > -1; )
          (o = i[c]),
            br[o] && ((s = 1), (o = o === `transformOrigin` ? Vr : $)),
            ni(n, o);
      s &&
        (ni(n, $),
        a &&
          (a.svg && n.removeAttribute(`transform`),
          (r.scale = r.rotate = r.translate = `none`),
          yi(n, 1),
          (a.uncache = 1),
          Ur(r)));
    }
  },
  fi = {
    clearProps: function (e, t, n, r, i) {
      if (i.data !== `isFromStart`) {
        var a = (e._pt = new Z(e._pt, t, n, 0, 0, di));
        return (a.u = r), (a.pr = -10), (a.tween = i), e._props.push(n), 1;
      }
    },
  },
  pi = [1, 0, 0, 1, 0, 0],
  mi = {},
  hi = function (e) {
    return e === `matrix(1, 0, 0, 1, 0, 0)` || e === `none` || !e;
  },
  gi = function (e) {
    var t = Jr(e, $);
    return hi(t) ? pi : t.substr(7).match(ue).map(W);
  },
  _i = function (e, t) {
    var n = e._gsap || Be(e),
      r = e.style,
      i = gi(e),
      a,
      o,
      s,
      c;
    return n.svg && e.getAttribute(`transform`)
      ? ((s = e.transform.baseVal.consolidate().matrix),
        (i = [s.a, s.b, s.c, s.d, s.e, s.f]),
        i.join(`,`) === `1,0,0,1,0,0` ? pi : i)
      : (i === pi &&
          !e.offsetParent &&
          e !== mr &&
          !n.svg &&
          ((s = r.display),
          (r.display = `block`),
          (a = e.parentNode),
          (!a || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((c = 1), (o = e.nextElementSibling), mr.appendChild(e)),
          (i = gi(e)),
          s ? (r.display = s) : ni(e, `display`),
          c &&
            (o
              ? a.insertBefore(e, o)
              : a
              ? a.appendChild(e)
              : mr.removeChild(e))),
        t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i);
  },
  vi = function (e, t, n, r, i, a) {
    var o = e._gsap,
      s = i || _i(e, !0),
      c = o.xOrigin || 0,
      l = o.yOrigin || 0,
      u = o.xOffset || 0,
      d = o.yOffset || 0,
      f = s[0],
      p = s[1],
      m = s[2],
      h = s[3],
      g = s[4],
      _ = s[5],
      v = t.split(` `),
      y = parseFloat(v[0]) || 0,
      b = parseFloat(v[1]) || 0,
      x,
      S,
      C,
      w;
    n
      ? s !== pi &&
        (S = f * h - p * m) &&
        ((C = y * (h / S) + b * (-m / S) + (m * _ - h * g) / S),
        (w = y * (-p / S) + b * (f / S) - (f * _ - p * g) / S),
        (y = C),
        (b = w))
      : ((x = ei(e)),
        (y = x.x + (~v[0].indexOf(`%`) ? (y / 100) * x.width : y)),
        (b = x.y + (~(v[1] || v[0]).indexOf(`%`) ? (b / 100) * x.height : b))),
      r || (r !== !1 && o.smooth)
        ? ((g = y - c),
          (_ = b - l),
          (o.xOffset = u + (g * f + _ * m) - g),
          (o.yOffset = d + (g * p + _ * h) - _))
        : (o.xOffset = o.yOffset = 0),
      (o.xOrigin = y),
      (o.yOrigin = b),
      (o.smooth = !!r),
      (o.origin = t),
      (o.originIsAbsolute = !!n),
      (e.style[Vr] = `0px 0px`),
      a &&
        (ri(a, o, `xOrigin`, c, y),
        ri(a, o, `yOrigin`, l, b),
        ri(a, o, `xOffset`, u, o.xOffset),
        ri(a, o, `yOffset`, d, o.yOffset)),
      e.setAttribute(`data-svg-origin`, y + ` ` + b);
  },
  yi = function (e, t) {
    var n = e._gsap || new Tn(e);
    if (`x` in n && !t && !n.uncache) return n;
    var r = e.style,
      i = n.scaleX < 0,
      a = `px`,
      o = `deg`,
      s = getComputedStyle(e),
      c = Jr(e, Vr) || `0`,
      l = (u = d = m = h = g = _ = v = y = 0),
      u,
      d,
      f = (p = 1),
      p,
      m,
      h,
      g,
      _,
      v,
      y,
      b,
      x,
      S,
      C,
      w,
      T,
      E,
      D,
      k,
      ee,
      A,
      j,
      M,
      N,
      P,
      F,
      I,
      L,
      te,
      ne,
      R;
    return (
      (n.svg = !!(e.getCTM && ti(e))),
      s.translate &&
        ((s.translate !== `none` ||
          s.scale !== `none` ||
          s.rotate !== `none`) &&
          (r[$] =
            (s.translate === `none`
              ? ``
              : `translate3d(` +
                (s.translate + ` 0 0`).split(` `).slice(0, 3).join(`, `) +
                `) `) +
            (s.rotate === `none` ? `` : `rotate(` + s.rotate + `) `) +
            (s.scale === `none`
              ? ``
              : `scale(` + s.scale.split(` `).join(`,`) + `) `) +
            (s[$] === `none` ? `` : s[$])),
        (r.scale = r.rotate = r.translate = `none`)),
      (S = _i(e, n.svg)),
      n.svg &&
        (n.uncache
          ? ((N = e.getBBox()),
            (c = n.xOrigin - N.x + `px ` + (n.yOrigin - N.y) + `px`),
            (M = ``))
          : (M = !t && e.getAttribute(`data-svg-origin`)),
        vi(e, M || c, !!M || n.originIsAbsolute, n.smooth !== !1, S)),
      (b = n.xOrigin || 0),
      (x = n.yOrigin || 0),
      S !== pi &&
        ((E = S[0]),
        (D = S[1]),
        (k = S[2]),
        (ee = S[3]),
        (l = A = S[4]),
        (u = j = S[5]),
        S.length === 6
          ? ((f = Math.sqrt(E * E + D * D)),
            (p = Math.sqrt(ee * ee + k * k)),
            (m = E || D ? Cr(D, E) * xr : 0),
            (_ = k || ee ? Cr(k, ee) * xr + m : 0),
            _ && (p *= Math.abs(Math.cos(_ * Sr))),
            n.svg && ((l -= b - (b * E + x * k)), (u -= x - (b * D + x * ee))))
          : ((R = S[6]),
            (te = S[7]),
            (F = S[8]),
            (I = S[9]),
            (L = S[10]),
            (ne = S[11]),
            (l = S[12]),
            (u = S[13]),
            (d = S[14]),
            (C = Cr(R, L)),
            (h = C * xr),
            C &&
              ((w = Math.cos(-C)),
              (T = Math.sin(-C)),
              (M = A * w + F * T),
              (N = j * w + I * T),
              (P = R * w + L * T),
              (F = A * -T + F * w),
              (I = j * -T + I * w),
              (L = R * -T + L * w),
              (ne = te * -T + ne * w),
              (A = M),
              (j = N),
              (R = P)),
            (C = Cr(-k, L)),
            (g = C * xr),
            C &&
              ((w = Math.cos(-C)),
              (T = Math.sin(-C)),
              (M = E * w - F * T),
              (N = D * w - I * T),
              (P = k * w - L * T),
              (ne = ee * T + ne * w),
              (E = M),
              (D = N),
              (k = P)),
            (C = Cr(D, E)),
            (m = C * xr),
            C &&
              ((w = Math.cos(C)),
              (T = Math.sin(C)),
              (M = E * w + D * T),
              (N = A * w + j * T),
              (D = D * w - E * T),
              (j = j * w - A * T),
              (E = M),
              (A = N)),
            h &&
              Math.abs(h) + Math.abs(m) > 359.9 &&
              ((h = m = 0), (g = 180 - g)),
            (f = W(Math.sqrt(E * E + D * D + k * k))),
            (p = W(Math.sqrt(j * j + R * R))),
            (C = Cr(A, j)),
            (_ = Math.abs(C) > 2e-4 ? C * xr : 0),
            (y = ne ? 1 / (ne < 0 ? -ne : ne) : 0)),
        n.svg &&
          ((M = e.getAttribute(`transform`)),
          (n.forceCSS = e.setAttribute(`transform`, ``) || !hi(Jr(e, $))),
          M && e.setAttribute(`transform`, M))),
      Math.abs(_) > 90 &&
        Math.abs(_) < 270 &&
        (i
          ? ((f *= -1), (_ += m <= 0 ? 180 : -180), (m += m <= 0 ? 180 : -180))
          : ((p *= -1), (_ += _ <= 0 ? 180 : -180))),
      (t ||= n.uncache),
      (n.x =
        l -
        ((n.xPercent =
          l &&
          ((!t && n.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-l) ? -50 : 0)))
          ? (e.offsetWidth * n.xPercent) / 100
          : 0) +
        a),
      (n.y =
        u -
        ((n.yPercent =
          u &&
          ((!t && n.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0)))
          ? (e.offsetHeight * n.yPercent) / 100
          : 0) +
        a),
      (n.z = d + a),
      (n.scaleX = W(f)),
      (n.scaleY = W(p)),
      (n.rotation = W(m) + o),
      (n.rotationX = W(h) + o),
      (n.rotationY = W(g) + o),
      (n.skewX = _ + o),
      (n.skewY = v + o),
      (n.transformPerspective = y + a),
      (n.zOrigin = parseFloat(c.split(` `)[2]) || (!t && n.zOrigin) || 0) &&
        (r[Vr] = bi(c)),
      (n.xOffset = n.yOffset = 0),
      (n.force3D = O.force3D),
      (n.renderTransform = n.svg ? Di : Kr ? Ei : Si),
      (n.uncache = 0),
      n
    );
  },
  bi = function (e) {
    return (e = e.split(` `))[0] + ` ` + e[1];
  },
  xi = function (e, t, n) {
    var r = K(t);
    return W(parseFloat(t) + parseFloat(oi(e, `x`, n + `px`, r))) + r;
  },
  Si = function (e, t) {
    (t.z = `0px`),
      (t.rotationY = t.rotationX = `0deg`),
      (t.force3D = 0),
      Ei(e, t);
  },
  Ci = `0deg`,
  wi = `0px`,
  Ti = `) `,
  Ei = function (e, t) {
    var n = t || this,
      r = n.xPercent,
      i = n.yPercent,
      a = n.x,
      o = n.y,
      s = n.z,
      c = n.rotation,
      l = n.rotationY,
      u = n.rotationX,
      d = n.skewX,
      f = n.skewY,
      p = n.scaleX,
      m = n.scaleY,
      h = n.transformPerspective,
      g = n.force3D,
      _ = n.target,
      v = n.zOrigin,
      y = ``,
      b = (g === `auto` && e && e !== 1) || g === !0;
    if (v && (u !== Ci || l !== Ci)) {
      var x = parseFloat(l) * Sr,
        S = Math.sin(x),
        C = Math.cos(x),
        w;
      (x = parseFloat(u) * Sr),
        (w = Math.cos(x)),
        (a = xi(_, a, S * w * -v)),
        (o = xi(_, o, -Math.sin(x) * -v)),
        (s = xi(_, s, C * w * -v + v));
    }
    h !== wi && (y += `perspective(` + h + Ti),
      (r || i) && (y += `translate(` + r + `%, ` + i + `%) `),
      (b || a !== wi || o !== wi || s !== wi) &&
        (y +=
          s !== wi || b
            ? `translate3d(` + a + `, ` + o + `, ` + s + `) `
            : `translate(` + a + `, ` + o + Ti),
      c !== Ci && (y += `rotate(` + c + Ti),
      l !== Ci && (y += `rotateY(` + l + Ti),
      u !== Ci && (y += `rotateX(` + u + Ti),
      (d !== Ci || f !== Ci) && (y += `skew(` + d + `, ` + f + Ti),
      (p !== 1 || m !== 1) && (y += `scale(` + p + `, ` + m + Ti),
      (_.style[$] = y || `translate(0, 0)`);
  },
  Di = function (e, t) {
    var n = t || this,
      r = n.xPercent,
      i = n.yPercent,
      a = n.x,
      o = n.y,
      s = n.rotation,
      c = n.skewX,
      l = n.skewY,
      u = n.scaleX,
      d = n.scaleY,
      f = n.target,
      p = n.xOrigin,
      m = n.yOrigin,
      h = n.xOffset,
      g = n.yOffset,
      _ = n.forceCSS,
      v = parseFloat(a),
      y = parseFloat(o),
      b,
      x,
      S,
      C,
      w;
    (s = parseFloat(s)),
      (c = parseFloat(c)),
      (l = parseFloat(l)),
      l && ((l = parseFloat(l)), (c += l), (s += l)),
      s || c
        ? ((s *= Sr),
          (c *= Sr),
          (b = Math.cos(s) * u),
          (x = Math.sin(s) * u),
          (S = Math.sin(s - c) * -d),
          (C = Math.cos(s - c) * d),
          c &&
            ((l *= Sr),
            (w = Math.tan(c - l)),
            (w = Math.sqrt(1 + w * w)),
            (S *= w),
            (C *= w),
            l &&
              ((w = Math.tan(l)),
              (w = Math.sqrt(1 + w * w)),
              (b *= w),
              (x *= w))),
          (b = W(b)),
          (x = W(x)),
          (S = W(S)),
          (C = W(C)))
        : ((b = u), (C = d), (x = S = 0)),
      ((v && !~(a + ``).indexOf(`px`)) || (y && !~(o + ``).indexOf(`px`))) &&
        ((v = oi(f, `x`, a, `px`)), (y = oi(f, `y`, o, `px`))),
      (p || m || h || g) &&
        ((v = W(v + p - (p * b + m * S) + h)),
        (y = W(y + m - (p * x + m * C) + g))),
      (r || i) &&
        ((w = f.getBBox()),
        (v = W(v + (r / 100) * w.width)),
        (y = W(y + (i / 100) * w.height))),
      (w =
        `matrix(` + b + `,` + x + `,` + S + `,` + C + `,` + v + `,` + y + `)`),
      f.setAttribute(`transform`, w),
      _ && (f.style[$] = w);
  },
  Oi = function (e, t, n, r, i) {
    var a = 360,
      o = R(i),
      s = parseFloat(i) * (o && ~i.indexOf(`rad`) ? xr : 1) - r,
      c = r + s + `deg`,
      l,
      u;
    return (
      o &&
        ((l = i.split(`_`)[1]),
        l === `short` && ((s %= a), s !== s % (a / 2) && (s += s < 0 ? a : -a)),
        l === `cw` && s < 0
          ? (s = ((s + a * wr) % a) - ~~(s / a) * a)
          : l === `ccw` && s > 0 && (s = ((s - a * wr) % a) - ~~(s / a) * a)),
      (e._pt = u = new Z(e._pt, t, n, r, s, Ar)),
      (u.e = c),
      (u.u = `deg`),
      e._props.push(n),
      u
    );
  },
  ki = function (e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  },
  Ai = function (e, t, n) {
    var r = ki({}, n._gsap),
      i = `perspective,force3D,transformOrigin,svgOrigin`,
      a = n.style,
      o,
      s,
      c,
      l,
      u,
      d,
      f,
      p;
    for (s in (r.svg
      ? ((c = n.getAttribute(`transform`)),
        n.setAttribute(`transform`, ``),
        (a[$] = t),
        (o = yi(n, 1)),
        ni(n, $),
        n.setAttribute(`transform`, c))
      : ((c = getComputedStyle(n)[$]), (a[$] = t), (o = yi(n, 1)), (a[$] = c)),
    br))
      (c = r[s]),
        (l = o[s]),
        c !== l &&
          i.indexOf(s) < 0 &&
          ((f = K(c)),
          (p = K(l)),
          (u = f === p ? parseFloat(c) : oi(n, s, c, p)),
          (d = parseFloat(l)),
          (e._pt = new Z(e._pt, o, s, u, d - u, kr)),
          (e._pt.u = p || 0),
          e._props.push(s));
    ki(o, r);
  };
U(`padding,margin,Width,Radius`, function (e, t) {
  var n = `Top`,
    r = `Right`,
    i = `Bottom`,
    a = `Left`,
    o = (t < 3 ? [n, r, i, a] : [n + a, n + r, i + r, i + a]).map(function (n) {
      return t < 2 ? e + n : `border` + n + e;
    });
  fi[t > 1 ? `border` + e : e] = function (e, t, n, r, i) {
    var a, s;
    if (arguments.length < 4)
      return (
        (a = o.map(function (t) {
          return si(e, t, n);
        })),
        (s = a.join(` `)),
        s.split(a[0]).length === 5 ? a[0] : s
      );
    (a = (r + ``).split(` `)),
      (s = {}),
      o.forEach(function (e, t) {
        return (s[e] = a[t] = a[t] || a[((t - 1) / 2) | 0]);
      }),
      e.init(t, s, i);
  };
});
var ji = {
  name: `css`,
  register: Zr,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, t, n, r, i) {
    var a = this._props,
      o = e.style,
      s = n.vars.startAt,
      c,
      l,
      u,
      d,
      f,
      p,
      m,
      h,
      g,
      _,
      v,
      y,
      b,
      x,
      S,
      C;
    for (m in (hr || Zr(),
    (this.styles = this.styles || Gr(e)),
    (C = this.styles.props),
    (this.tween = n),
    t))
      if (m !== `autoRound` && ((l = t[m]), !(Pe[m] && An(m, t, n, r, e, i)))) {
        if (
          ((f = typeof l),
          (p = fi[m]),
          f === `function` && ((l = l.call(n, r, e, i)), (f = typeof l)),
          f === `string` && ~l.indexOf(`random(`) && (l = Kt(l)),
          p)
        )
          p(this, e, m, l, n) && (S = 1);
        else if (m.substr(0, 2) === `--`)
          (c = (getComputedStyle(e).getPropertyValue(m) + ``).trim()),
            (l += ``),
            (sn.lastIndex = 0),
            sn.test(c) || ((h = K(c)), (g = K(l))),
            g ? h !== g && (c = oi(e, m, c, g) + g) : h && (l += h),
            this.add(o, `setProperty`, c, l, r, i, 0, 0, m),
            a.push(m),
            C.push(m, 0, o[m]);
        else if (f !== `undefined`) {
          if (
            (s && m in s
              ? ((c = typeof s[m] == `function` ? s[m].call(n, r, e, i) : s[m]),
                R(c) && ~c.indexOf(`random(`) && (c = Kt(c)),
                K(c + ``) ||
                  c === `auto` ||
                  (c += O.units[m] || K(si(e, m)) || ``),
                (c + ``).charAt(1) === `=` && (c = si(e, m)))
              : (c = si(e, m)),
            (d = parseFloat(c)),
            (_ = f === `string` && l.charAt(1) === `=` && l.substr(0, 2)),
            _ && (l = l.substr(2)),
            (u = parseFloat(l)),
            m in Or &&
              (m === `autoAlpha` &&
                (d === 1 && si(e, `visibility`) === `hidden` && u && (d = 0),
                C.push(`visibility`, 0, o.visibility),
                ri(
                  this,
                  o,
                  `visibility`,
                  d ? `inherit` : `hidden`,
                  u ? `inherit` : `hidden`,
                  !u
                )),
              m !== `scale` &&
                m !== `transform` &&
                ((m = Or[m]), ~m.indexOf(`,`) && (m = m.split(`,`)[0]))),
            (v = m in br),
            v)
          ) {
            if (
              (this.styles.save(m),
              f === `string` &&
                l.substring(0, 6) === `var(--` &&
                ((l = Jr(e, l.substring(4, l.indexOf(`)`)))),
                (u = parseFloat(l))),
              y ||
                ((b = e._gsap),
                (b.renderTransform && !t.parseTransform) ||
                  yi(e, t.parseTransform),
                (x = t.smoothOrigin !== !1 && b.smooth),
                (y = this._pt =
                  new Z(this._pt, o, $, 0, 1, b.renderTransform, b, 0, -1)),
                (y.dep = 1)),
              m === `scale`)
            )
              (this._pt = new Z(
                this._pt,
                b,
                `scaleY`,
                b.scaleY,
                (_ ? He(b.scaleY, _ + u) : u) - b.scaleY || 0,
                kr
              )),
                (this._pt.u = 0),
                a.push(`scaleY`, m),
                (m += `X`);
            else if (m === `transformOrigin`) {
              C.push(Vr, 0, o[Vr]),
                (l = ui(l)),
                b.svg
                  ? vi(e, l, 0, x, 0, this)
                  : ((g = parseFloat(l.split(` `)[2]) || 0),
                    g !== b.zOrigin && ri(this, b, `zOrigin`, b.zOrigin, g),
                    ri(this, o, m, bi(c), bi(l)));
              continue;
            } else if (m === `svgOrigin`) {
              vi(e, l, 1, x, 0, this);
              continue;
            } else if (m in mi) {
              Oi(this, b, m, d, _ ? He(d, _ + l) : l);
              continue;
            } else if (m === `smoothOrigin`) {
              ri(this, b, `smooth`, b.smooth, l);
              continue;
            } else if (m === `force3D`) {
              b[m] = l;
              continue;
            } else if (m === `transform`) {
              Ai(this, l, e);
              continue;
            }
          } else m in o || (m = Xr(m) || m);
          if (v || ((u || u === 0) && (d || d === 0) && !Dr.test(l) && m in o))
            (h = (c + ``).substr((d + ``).length)),
              (u ||= 0),
              (g = K(l) || (m in O.units ? O.units[m] : h)),
              h !== g && (d = oi(e, m, c, g)),
              (this._pt = new Z(
                this._pt,
                v ? b : o,
                m,
                d,
                (_ ? He(d, _ + u) : u) - d,
                !v && (g === `px` || m === `zIndex`) && t.autoRound !== !1
                  ? Mr
                  : kr
              )),
              (this._pt.u = g || 0),
              h !== g && g !== `%` && ((this._pt.b = c), (this._pt.r = jr));
          else if (m in o) ci.call(this, e, m, c, _ ? _ + l : l);
          else if (m in e) this.add(e, m, c || e[m], _ ? _ + l : l, r, i);
          else if (m !== `parseTransform`) {
            Ce(m, l);
            continue;
          }
          v ||
            (m in o
              ? C.push(m, 0, o[m])
              : typeof e[m] == `function`
              ? C.push(m, 2, e[m]())
              : C.push(m, 1, c || e[m])),
            a.push(m);
        }
      }
    S && Qn(this);
  },
  render: function (e, t) {
    if (t.tween._time || !vr())
      for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next);
    else t.styles.revert();
  },
  get: si,
  aliases: Or,
  getSetter: function (e, t, n) {
    var r = Or[t];
    return (
      r && r.indexOf(`,`) < 0 && (t = r),
      t in br && t !== Vr && (e._gsap.x || si(e, `x`))
        ? n && _r === n
          ? t === `scale`
            ? Rr
            : Lr
          : (_r = n || {}) && (t === `scale` ? zr : Br)
        : e.style && !ie(e.style[t])
        ? Fr
        : ~t.indexOf(`-`)
        ? Ir
        : Wn(e, t)
    );
  },
  core: { _removeProperty: ni, _getMatrix: _i },
};
(Q.utils.checkPrefix = Xr),
  (Q.core.getStyleSaver = Gr),
  (function (e, t, n, r) {
    var i = U(e + `,` + t + `,` + n, function (e) {
      br[e] = 1;
    });
    U(t, function (e) {
      (O.units[e] = `deg`), (mi[e] = 1);
    }),
      (Or[i[13]] = e + `,` + t),
      U(r, function (e) {
        var t = e.split(`:`);
        Or[t[1]] = i[t[0]];
      });
  })(
    `x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,
    `rotation,rotationX,rotationY,skewX,skewY`,
    `transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,
    `0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`
  ),
  U(
    `x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,
    function (e) {
      O.units[e] = `px`;
    }
  ),
  Q.registerPlugin(ji);
var Mi = Q.registerPlugin(ji) || Q;
Mi.core.Tween;
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
var Ni,
  Pi,
  Fi,
  Ii = () => Fi || Qi.register(window.gsap),
  Li = typeof Intl < `u` ? new Intl.Segmenter() : 0,
  Ri = (e) =>
    typeof e == `string`
      ? Ri(document.querySelectorAll(e))
      : `length` in e
      ? Array.from(e)
      : [e],
  zi = (e) => Ri(e).filter((e) => e instanceof HTMLElement),
  Bi = [],
  Vi = function () {},
  Hi = /\s+/g,
  Ui = RegExp(
    `\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.`,
    `gu`
  ),
  Wi = { left: 0, top: 0, width: 0, height: 0 },
  Gi = (e, t) => {
    if (t) {
      let n = new Set(e.join(``).match(t) || Bi),
        r = e.length,
        i,
        a,
        o,
        s;
      if (n.size)
        for (; --r > -1; ) {
          a = e[r];
          for (o of n)
            if (o.startsWith(a) && o.length > a.length) {
              for (
                i = 0, s = a;
                o.startsWith((s += e[r + ++i])) && s.length < o.length;

              );
              if (i && s.length === o.length) {
                (e[r] = o), e.splice(r + 1, i);
                break;
              }
            }
        }
    }
    return e;
  },
  Ki = (e) =>
    window.getComputedStyle(e).display === `inline` &&
    (e.style.display = `inline-block`),
  qi = (e, t, n) =>
    t.insertBefore(typeof e == `string` ? document.createTextNode(e) : e, n),
  Ji = (e, t, n) => {
    let r = t[e + `sClass`] || ``,
      { tag: i = `div`, aria: a = `auto`, propIndex: o = !1 } = t,
      s = e === `line` ? `block` : `inline-block`,
      c = r.indexOf(`++`) > -1,
      l = (t) => {
        let l = document.createElement(i),
          u = n.length + 1;
        return (
          r && (l.className = r + (c ? ` ` + r + u : ``)),
          o && l.style.setProperty(`--` + e, u + ``),
          a !== `none` && l.setAttribute(`aria-hidden`, `true`),
          i !== `span` &&
            ((l.style.position = `relative`), (l.style.display = s)),
          (l.textContent = t),
          n.push(l),
          l
        );
      };
    return c && (r = r.replace(`++`, ``)), (l.collection = n), l;
  },
  Yi = (e, t, n, r) => {
    let i = Ji(`line`, n, r),
      a = window.getComputedStyle(e).textAlign || `left`;
    return (n, r) => {
      let o = i(``);
      for (o.style.textAlign = a, e.insertBefore(o, t[n]); n < r; n++)
        o.appendChild(t[n]);
      o.normalize();
    };
  },
  Xi = (e, t, n, r, i, a, o, s, c, l) => {
    var u;
    let d = Array.from(e.childNodes),
      f = 0,
      { wordDelimiter: p, reduceWhiteSpace: m = !0, prepareText: h } = t,
      g = e.getBoundingClientRect(),
      _ = g,
      v = !m && window.getComputedStyle(e).whiteSpace.substring(0, 3) === `pre`,
      y = 0,
      b = n.collection,
      x,
      S,
      C,
      w,
      T,
      E,
      D,
      O,
      k,
      ee,
      A,
      j,
      M,
      N,
      P,
      F,
      I,
      L;
    for (
      typeof p == `object`
        ? ((C = p.delimiter || p), (S = p.replaceWith || ``))
        : (S = p === `` ? `` : p || ` `),
        x = S !== ` `;
      f < d.length;
      f++
    )
      if (((w = d[f]), w.nodeType === 3)) {
        for (
          P = w.textContent || ``,
            m
              ? (P = P.replace(Hi, ` `))
              : v &&
                (P = P.replace(
                  /\n/g,
                  S +
                    `
`
                )),
            h && (P = h(P, e)),
            w.textContent = P,
            T = S || C ? P.split(C || S) : P.match(s) || Bi,
            I = T[T.length - 1],
            O = x ? I.slice(-1) === ` ` : !I,
            I || T.pop(),
            _ = g,
            D = x ? T[0].charAt(0) === ` ` : !T[0],
            D && qi(` `, e, w),
            T[0] || T.shift(),
            Gi(T, c),
            (a && l) || (w.textContent = ``),
            k = 1;
          k <= T.length;
          k++
        )
          if (
            ((F = T[k - 1]),
            !m &&
              v &&
              F.charAt(0) ===
                `
` &&
              ((u = w.previousSibling) == null || u.remove(),
              qi(document.createElement(`br`), e, w),
              (F = F.slice(1))),
            !m && F === ``)
          )
            qi(S, e, w);
          else if (F === ` `) e.insertBefore(document.createTextNode(` `), w);
          else {
            if (
              (x && F.charAt(0) === ` ` && qi(` `, e, w),
              y && k === 1 && !D && b.indexOf(y.parentNode) > -1
                ? ((E = b[b.length - 1]),
                  E.appendChild(document.createTextNode(r ? `` : F)))
                : ((E = n(r ? `` : F)),
                  qi(E, e, w),
                  y && k === 1 && !D && E.insertBefore(y, E.firstChild)),
              r)
            )
              for (
                A = Li
                  ? Gi(
                      [...Li.segment(F)].map((e) => e.segment),
                      c
                    )
                  : F.match(s) || Bi,
                  L = 0;
                L < A.length;
                L++
              )
                E.appendChild(
                  A[L] === ` ` ? document.createTextNode(` `) : r(A[L])
                );
            if (a && l) {
              if (
                ((P = w.textContent = P.substring(F.length + 1, P.length)),
                (ee = E.getBoundingClientRect()),
                ee.top > _.top && ee.left <= _.left)
              ) {
                for (j = e.cloneNode(), M = e.childNodes[0]; M && M !== E; )
                  (N = M), (M = M.nextSibling), j.appendChild(N);
                e.parentNode.insertBefore(j, e), i && Ki(j);
              }
              _ = ee;
            }
            (k < T.length || O) &&
              qi(
                k >= T.length ? ` ` : x && F.slice(-1) === ` ` ? ` ` + S : S,
                e,
                w
              );
          }
        e.removeChild(w), (y = 0);
      } else
        w.nodeType === 1 &&
          (o && o.indexOf(w) > -1
            ? (b.indexOf(w.previousSibling) > -1 &&
                b[b.length - 1].appendChild(w),
              (y = w))
            : (Xi(w, t, n, r, i, a, o, s, c, !0), (y = 0)),
          i && Ki(w));
  },
  Zi = class e {
    constructor(e, t) {
      (this.isSplit = !1),
        Ii(),
        (this.elements = zi(e)),
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.masks = []),
        (this.vars = t),
        (this._split = () => this.isSplit && this.split(this.vars));
      let n = [],
        r,
        i = () => {
          let e = n.length,
            t;
          for (; e--; ) {
            t = n[e];
            let r = t.element.offsetWidth;
            if (r !== t.width) {
              (t.width = r), this._split();
              return;
            }
          }
        };
      (this._data = {
        orig: n,
        obs:
          typeof ResizeObserver < `u` &&
          new ResizeObserver(() => {
            clearTimeout(r), (r = setTimeout(i, 200));
          }),
      }),
        Vi(this),
        this.split(t);
    }
    split(e) {
      this.isSplit && this.revert(), (this.vars = e = e || this.vars || {});
      let {
          type: t = `chars,words,lines`,
          aria: n = `auto`,
          deepSlice: r = !0,
          smartWrap: i,
          onSplit: a,
          autoSplit: o = !1,
          specialChars: s,
          mask: c,
        } = this.vars,
        l = t.indexOf(`lines`) > -1,
        u = t.indexOf(`chars`) > -1,
        d = t.indexOf(`words`) > -1,
        f = u && !d && !l,
        p = s && (`push` in s ? RegExp(`(?:` + s.join(`|`) + `)`, `gu`) : s),
        m = p ? RegExp(p.source + `|` + Ui.source, `gu`) : Ui,
        h = !!e.ignore && zi(e.ignore),
        { orig: g, animTime: _, obs: v } = this._data,
        y;
      return (
        (u || d || l) &&
          (this.elements.forEach((t, a) => {
            (g[a] = {
              element: t,
              html: t.innerHTML,
              ariaL: t.getAttribute(`aria-label`),
              ariaH: t.getAttribute(`aria-hidden`),
            }),
              n === `auto`
                ? t.setAttribute(`aria-label`, (t.textContent || ``).trim())
                : n === `hidden` && t.setAttribute(`aria-hidden`, `true`);
            let o = [],
              s = [],
              c = [],
              _ = u ? Ji(`char`, e, o) : null,
              v = Ji(`word`, e, s),
              y,
              b,
              x,
              S;
            if ((Xi(t, e, v, _, f, r && (l || f), h, m, p, !1), l)) {
              let n = Ri(t.childNodes),
                r = Yi(t, n, e, c),
                i,
                a = [],
                o = 0,
                s = n.map((e) =>
                  e.nodeType === 1 ? e.getBoundingClientRect() : Wi
                ),
                l = Wi;
              for (y = 0; y < n.length; y++)
                (i = n[y]),
                  i.nodeType === 1 &&
                    (i.nodeName === `BR`
                      ? (a.push(i), r(o, y + 1), (o = y + 1), (l = s[o]))
                      : (y &&
                          s[y].top > l.top &&
                          s[y].left <= l.left &&
                          (r(o, y), (o = y)),
                        (l = s[y])));
              o < y && r(o, y), a.forEach((e) => e.parentNode?.removeChild(e));
            }
            if (!d) {
              for (y = 0; y < s.length; y++)
                if (
                  ((b = s[y]),
                  u || !b.nextSibling || b.nextSibling.nodeType !== 3)
                )
                  if (i && !l) {
                    for (
                      x = document.createElement(`span`),
                        x.style.whiteSpace = `nowrap`;
                      b.firstChild;

                    )
                      x.appendChild(b.firstChild);
                    b.replaceWith(x);
                  } else b.replaceWith(...b.childNodes);
                else
                  (S = b.nextSibling),
                    S &&
                      S.nodeType === 3 &&
                      ((S.textContent =
                        (b.textContent || ``) + (S.textContent || ``)),
                      b.remove());
              (s.length = 0), t.normalize();
            }
            this.lines.push(...c), this.words.push(...s), this.chars.push(...o);
          }),
          c &&
            this[c] &&
            this.masks.push(
              ...this[c].map((e) => {
                let t = e.cloneNode();
                return (
                  e.replaceWith(t),
                  t.appendChild(e),
                  e.className &&
                    (t.className = e.className.replace(
                      /(\b\w+\b)/g,
                      `$1-mask`
                    )),
                  (t.style.overflow = `clip`),
                  t
                );
              })
            )),
        (this.isSplit = !0),
        Pi &&
          (o
            ? Pi.addEventListener(`loadingdone`, this._split)
            : Pi.status === `loading` &&
              console.warn(`SplitText called before fonts loaded`)),
        (y = a && a(this)) &&
          y.totalTime &&
          (this._data.anim = _ ? y.totalTime(_) : y),
        l &&
          o &&
          this.elements.forEach((e, t) => {
            (g[t].width = e.offsetWidth), v && v.observe(e);
          }),
        this
      );
    }
    revert() {
      var e, t;
      let { orig: n, anim: r, obs: i } = this._data;
      return (
        i && i.disconnect(),
        n.forEach(({ element: e, html: t, ariaL: n, ariaH: r }) => {
          (e.innerHTML = t),
            n
              ? e.setAttribute(`aria-label`, n)
              : e.removeAttribute(`aria-label`),
            r
              ? e.setAttribute(`aria-hidden`, r)
              : e.removeAttribute(`aria-hidden`);
        }),
        (this.chars.length =
          this.words.length =
          this.lines.length =
          n.length =
          this.masks.length =
            0),
        (this.isSplit = !1),
        Pi?.removeEventListener(`loadingdone`, this._split),
        r && ((this._data.animTime = r.totalTime()), r.revert()),
        (t = (e = this.vars).onRevert) == null || t.call(e, this),
        this
      );
    }
    static create(t, n) {
      return new e(t, n);
    }
    static register(e) {
      (Ni = Ni || e || window.gsap),
        Ni && ((Ri = Ni.utils.toArray), (Vi = Ni.core.context || Vi)),
        !Fi && window.innerWidth > 0 && ((Pi = document.fonts), (Fi = !0));
    }
  };
Zi.version = `3.13.0`;
var Qi = Zi,
  $i = class {
    constructor(e, t = {}) {
      (this.gsap_ctx = null), (this.config = e), (this.callbacks = t);
    }
    async init() {
      await document.fonts.ready,
        (this.gsap_ctx = Mi.context(() => {
          this.createArrowTimeline(),
            this.createIntroAnimation(),
            this.createScrollTriggerAnimation();
        }));
    }
    createIntroAnimation() {
      let e = document.querySelector(`.hero-anim-sections__arrow-line`),
        t = 0;
      e && (t = parseFloat(getComputedStyle(e).getPropertyValue(`--len`)));
      let n = document.querySelector(`.hero-anim-sections__arrow-head--right`),
        r = n ? n.getTotalLength() : 0,
        i = document.querySelector(`.hero-anim-sections__arrow-head--left`),
        a = i ? i.getTotalLength() : 0;
      (this.soulTextSplit = new Qi(`.hero-area__text--soul`, {
        type: `chars`,
      })),
        Mi.timeline()
          .to(`.hero-anim-sections__intro-cover`, {
            duration: 2,
            autoAlpha: 0,
            force3D: !0,
            ease: `circ.out`,
          })
          .from(
            this.config,
            { ring_interior_edge: 0, duration: 4, ease: `expo.inOut` },
            `<+.5`
          )
          .from(
            `.hero-area__text--we-give`,
            { alpha: 0, duration: 1.5, xPercent: -30, ease: `expo.out` },
            `<+2`
          )
          .from(
            this.soulTextSplit.chars,
            {
              alpha: 0,
              scale: 1.5,
              stagger: 0.1,
              duration: 1.5,
              ease: `expo.out`,
            },
            `>-.25`
          )
          .from(
            `.hero-anim-sections__arrow-line`,
            { strokeDashoffset: t, duration: 0.75, ease: `circ.out` },
            `+=.25`
          )
          .from(
            `.hero-anim-sections__arrow-head--right`,
            { strokeDashoffset: r, duration: 0.5, ease: `expo.inOut` },
            `>-.3`
          )
          .from(
            `.hero-anim-sections__arrow-head--left`,
            { strokeDashoffset: a, duration: 0.5, ease: `expo.inOut` },
            `<`
          )
          .add(() => this.arrow_loop_tl.play(), `+=2`);
    }
    createArrowTimeline() {
      this.arrow_loop_tl = Mi.timeline({ paused: !0, repeat: -1, yoyo: !0 })
        .to(`.hero-anim-sections__arrow-line`, {
          scaleY: 0.7,
          transformOrigin: `center top`,
          duration: 1,
          ease: `sine.inOut`,
        })
        .to(
          [
            `.hero-anim-sections__arrow-head--left`,
            `.hero-anim-sections__arrow-head--right`,
          ],
          { yPercent: -65, duration: 1, ease: `sine.inOut` },
          `<`
        );
    }
    createScrollTriggerAnimation() {
      let e = new Qi(`.meaning-area__text`, { type: `words,chars` }).chars;
      Mi.timeline({
        scrollTrigger: {
          trigger: `.hero-anim-sections`,
          start: `top top`,
          end: `+=800%`,
          scrub: 2.5,
          pin: !0,
          anticipatePin: 1,
          snap: {
            snapTo: `labels`,
            duration: { min: 2, max: 3 },
            delay: 0.15,
            ease: `power1.inOut`,
          },
          onRefresh: () => this.callbacks.onRefresh?.(),
        },
      })
        .addLabel(`Ring Heading Tween - Beginning of ScrollTrigger Animation`)
        .to(`.hero-area__textwrap--we-give`, {
          xPercent: -60,
          duration: 3,
          ease: `power2.inOut`,
        })
        .to(
          `.hero-area__textwrap--we-give`,
          { alpha: 0, duration: 1.5, ease: `power2.inOut` },
          `<`
        )
        .addLabel(`Soul Text Centered`)
        .to(
          `.hero-area__textwrap--soul`,
          {
            x: (e, t, n) => {
              let r = document.querySelector(`.hero-area__content`);
              if (!r) return 0;
              let i = r.offsetLeft + r.offsetWidth / 2,
                a = t.offsetLeft + t.offsetWidth / 2;
              return i - a;
            },
            scale: 1.8,
            duration: 3,
            ease: `power2.inOut`,
          },
          `<+.1`
        )
        .to(
          `.hero-area__text--soul`,
          { color: `white`, duration: 0.75, ease: `power2.inOut` },
          `<`
        )
        .addLabel(`Begin Ring to Silhouette Blend`)
        .to(
          this.config,
          { tweened_radius_adj: 0, ease: `power4.inOut`, duration: 7 },
          `<`
        )
        .to(
          `.hero-area__textwrap--soul`,
          { alpha: 0, scale: 0.1, duration: 3, ease: `power4.inOut` },
          `<+2.5`
        )
        .to(
          this.config,
          { silhouette_blend: 0.75, ease: `power4.inOut`, duration: 8 },
          `<`
        )
        .addLabel(`Half Blend`, `<+4`)
        .to(
          this.config,
          {
            edge_steering_strength: 0.85,
            spin: 0.001,
            speed: 0.005,
            ease: `circ.in`,
            duration: 5,
          },
          `>-1`
        )
        .set(this.config, { pointer_action: `attract` }, `<`)
        .addLabel(`Silhoutte full effect`)
        .to(this.config, {
          size: 5,
          spin: 0.001,
          duration: 4,
          ease: `power1.inOut`,
        })
        .addLabel(`Particles Big`)
        .to(this.config, { duration: 3 })
        .to(
          `.meaning-area__text-blur-cover`,
          {
            "--bg-alpha": 95,
            "--blur-amt": 20,
            duration: 2,
            ease: `power2.inOut`,
          },
          `>-.5`
        )
        .to(
          this.config,
          { speed: 0.001, duration: 2, ease: `power2.inOut` },
          `<+1`
        )
        .from(
          [`.meaning-area__heading`, e],
          {
            yPercent: 100,
            alpha: 0,
            stagger: 0.005,
            duration: 3,
            ease: `power2.out`,
          },
          `<`
        )
        .addLabel(`Meaning Text Content In`)
        .to([`.meaning-area__heading`, e], {
          yPercent: -100,
          autoAlpha: 0,
          duration: 5,
          stagger: 0.005,
          ease: `circ.in`,
        })
        .to(
          `.meaning-area__text-blur-cover`,
          { "--bg-alpha": 100, duration: 2, ease: `power2.in` },
          `>+1`
        )
        .to(
          `.particle__container`,
          { alpha: 0, force3D: !0, duration: 2, ease: `power2.in` },
          `<`
        )
        .to(`.particle__container`, { duration: 4 });
    }
    destroy() {
      this.gsap_ctx && this.gsap_ctx.revert();
    }
  },
  ea = class {
    constructor(e = 300) {
      (this.defaultDelay = e), (this.timeout = null);
    }
    run(e, t = this.defaultDelay) {
      clearTimeout(this.timeout), (this.timeout = setTimeout(e, t));
    }
    cancel() {
      clearTimeout(this.timeout), (this.timeout = null);
    }
    isPending() {
      return this.timeout !== null;
    }
    destroy() {
      this.cancel();
    }
  },
  ta = class {
    constructor(t) {
      (this.configManager = t),
        (this.CONFIG = this.configManager.get()),
        (this.pointer = {
          vel: 0,
          pos: e.createVector(),
          last: e.createVector(),
          norm: e.createVector(),
          cent: e.createVector(),
          centNorm: e.createVector(),
        }),
        (this.heroAreaInView = !0),
        (this.isAnimating = !1),
        (this.rafId = null),
        (this.TIMESTEP = 1e3 / 60),
        (this.accumulator = 0),
        (this.lastFrameTime = 0),
        (this.frameCount = 0),
        (this.scrollAnimation = null),
        (this.debugPanel = null),
        (this.resizeDebouncer = new ea(250)),
        (this.ready = this.init()),
        (this.start_debug_manager_closed = !0);
    }
    async init() {
      let e = this.CONFIG.silhouetteConfig || null;
      (this.particle_system = new c(
        document.getElementById(`particle__canvas`),
        document.querySelector(`.hero-area__ps-positioner`),
        this.CONFIG,
        this.pointer,
        e
      )),
        await this.particle_system.ready,
        this.setupEventListeners(),
        (this.scrollAnimation = new $i(this.CONFIG, {
          onRefresh: () => this.particle_system.sizeCanvas(),
        })),
        await this.scrollAnimation.init(),
        this.CONFIG.useDebugPanel &&
          ((this.debugPanel = T(
            this.CONFIG,
            this.particle_system,
            this.configManager
          )),
          this.start_debug_manager_closed && this.debugPanel.close()),
        this.start();
    }
    setupEventListeners() {
      (this.lastWidth = window.innerWidth),
        (this.lastHeight = window.innerHeight),
        (this.resizeHandler = () => {
          this.resizeDebouncer.run(() => {
            let e = window.innerWidth,
              t = window.innerHeight,
              n = Math.abs(e - this.lastWidth),
              r = Math.abs(t - this.lastHeight);
            n > 0 || r > 150
              ? ((this.lastWidth = e),
                (this.lastHeight = t),
                (this.CONFIG.count = parseFloat(
                  getComputedStyle(
                    document.querySelector(`.particle__container`)
                  ).getPropertyValue(`--num-particles`)
                )),
                this.particle_system.init(this.frameCount))
              : this.particle_system.resizeCanvasOnly();
          });
        }),
        window.addEventListener(`resize`, this.resizeHandler),
        (this.pointerMoveHandler = (e) => {
          (this.pointer.pos.x = e.clientX),
            (this.pointer.pos.y = e.clientY),
            (this.pointer.norm.x = e.clientX / window.innerWidth),
            (this.pointer.norm.y = e.clientY / window.innerHeight),
            (this.pointer.cent.x = e.clientX - window.innerWidth / 2),
            (this.pointer.cent.y = e.clientY - window.innerHeight / 2),
            (this.pointer.centNorm.x = this.pointer.cent.x / window.innerWidth),
            (this.pointer.centNorm.y =
              this.pointer.cent.y / window.innerHeight);
        }),
        window.addEventListener(`pointermove`, this.pointerMoveHandler);
    }
    start() {
      if (this.isAnimating) return;
      (this.isAnimating = !0),
        (this.lastFrameTime = performance.now()),
        (this.accumulator = 0);
      let t = (n) => {
        if (!this.isAnimating) return;
        let r = n - this.lastFrameTime;
        if (
          ((this.lastFrameTime = n),
          (this.accumulator += Math.min(r, 100)),
          this.heroAreaInView)
        ) {
          for (
            this.pointer.vel = e.dist(this.pointer.last, this.pointer.pos),
              this.pointer.last = e.copy(this.pointer.pos);
            this.accumulator >= this.TIMESTEP;

          )
            this.particle_system.update(this.frameCount),
              this.frameCount++,
              (this.accumulator -= this.TIMESTEP);
          this.particle_system.draw();
        }
        this.rafId = requestAnimationFrame(t);
      };
      this.rafId = requestAnimationFrame(t);
    }
    stop() {
      (this.isAnimating = !1),
        (this.rafId &&= (cancelAnimationFrame(this.rafId), null));
    }
    reset() {
      (this.time = 0), this.particle_system.init(this.time);
    }
    destroy() {
      this.stop(),
        this.resizeDebouncer && this.resizeDebouncer.destroy(),
        this.resizeHandler &&
          window.removeEventListener(`resize`, this.resizeHandler),
        this.pointerMoveHandler &&
          window.removeEventListener(`pointermove`, this.pointerMoveHandler),
        this.scrollAnimation && this.scrollAnimation.destroy(),
        this.debugPanel && this.debugPanel.destroy();
    }
  },
  na = class {
    constructor(e, t = `particleSketchConfig`) {
      (this.defaultConfig = { ...e }),
        (this.storageKey = t),
        (this.config = this.load());
    }
    load() {
      try {
        let e = localStorage.getItem(this.storageKey);
        if (e) {
          let t = JSON.parse(e);
          return (
            console.log(`✅ Loaded saved settings from localStorage`),
            { ...this.defaultConfig, ...t }
          );
        }
      } catch (e) {
        console.error(`❌ Failed to load saved settings:`, e);
      }
      return { ...this.defaultConfig };
    }
    save(e = null) {
      try {
        let t = e || this.config;
        return (
          localStorage.setItem(this.storageKey, JSON.stringify(t)),
          console.log(`✅ Settings saved to localStorage`),
          !0
        );
      } catch (e) {
        return console.error(`❌ Failed to save settings:`, e), !1;
      }
    }
    reset(e = !1) {
      try {
        return (
          localStorage.removeItem(this.storageKey),
          (this.config = { ...this.defaultConfig }),
          console.log(`✅ Settings cleared from localStorage`),
          e && window.location.reload(),
          !0
        );
      } catch (e) {
        return console.error(`❌ Failed to clear settings:`, e), !1;
      }
    }
    get() {
      return this.config;
    }
    set(e, t) {
      this.config[e] = t;
    }
    update(e) {
      this.config = { ...this.config, ...e };
    }
    getValue(e) {
      return this.config[e];
    }
    getDefaults() {
      return { ...this.defaultConfig };
    }
  };
Mi.registerPlugin(Qi);
var ra = document.querySelector(`.particle__container`),
  ia = document.querySelector(`body`),
  aa = (e, t, n) => {
    if (e)
      try {
        let n = getComputedStyle(e).getPropertyValue(t).trim();
        return t === `--num-particles` ? parseFloat(n) : n;
      } catch (e) {
        console.error(`Error reading computed style for ${t}:`, e);
      }
    return n;
  },
  oa = {
    useDebugPanel: !1,
    count: aa(ra, `--num-particles`, 500),
    bg_color: aa(ia, `--hero-bg-color`, `#000000`),
    size: 2,
    ring_interior_edge: 0.5,
    tweened_radius_adj: 1,
    speed: 0.003,
    color1: `#deca84`,
    color2: `#ffffff`,
    bg_color_alpha: 0.5,
    blend_mode: `screen`,
    pointer_action: `repel`,
    spin: 0.001,
    pointer_range: 100,
    pointer_strength: 0.1,
    radial_ease_type: `expo`,
    radial_ease_direction: `in`,
    radial_ease_strength: 0.75,
    silhouette_blend: 0,
    edge_steering_strength: 0.3,
    silhouette_hard_boundary: !1,
    silhouetteConfig: {
      imgSelector: `.hero-area__img`,
      imgUrl: document.querySelector(`.hero-area__img`)?.src || ``,
      threshold: 127,
    },
    debug_val: 0,
  },
  sa = new na(oa),
  ca = new ta(sa);
oa.useDebugPanel && (window.apostle_hero = ca);
