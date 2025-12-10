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
  A,
  j,
  M,
  N = 1e8,
  P = 1 / N,
  F = Math.PI * 2,
  I = F / 4,
  ee = 0,
  te = Math.sqrt,
  ne = Math.cos,
  re = Math.sin,
  L = function (e) {
    return typeof e == `string`;
  },
  R = function (e) {
    return typeof e == `function`;
  },
  z = function (e) {
    return typeof e == `number`;
  },
  ie = function (e) {
    return e === void 0;
  },
  ae = function (e) {
    return typeof e == `object`;
  },
  oe = function (e) {
    return e !== !1;
  },
  B = function () {
    return typeof window < `u`;
  },
  se = function (e) {
    return R(e) || L(e);
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
  ge,
  H,
  U,
  _e,
  W = {},
  ve = {},
  ye,
  be = function (e) {
    return (ve = Ze(e, W)) && gr;
  },
  xe = function (e, t) {
    return console.warn(
      `Invalid property`,
      e,
      `set to`,
      t,
      `Missing plugin? gsap.registerPlugin()`
    );
  },
  Se = function (e, t) {
    return !t && console.warn(e);
  },
  Ce = function (e, t) {
    return (e && (W[e] = t) && ve && (ve[e] = t)) || W;
  },
  we = function () {
    return 0;
  },
  Te = { suppressEvents: !0, isStart: !0, kill: !1 },
  Ee = { suppressEvents: !0, kill: !1 },
  De = { suppressEvents: !0 },
  G = {},
  Oe = [],
  ke = {},
  Ae,
  je = {},
  Me = {},
  Ne = 30,
  Pe = [],
  Fe = ``,
  Ie = function (e) {
    var t = e[0],
      n,
      r;
    if ((ae(t) || R(t) || (e = [e]), !(n = (t._gsap || {}).harness))) {
      for (r = Pe.length; r-- && !Pe[r].targetTest(t); );
      n = Pe[r];
    }
    for (r = e.length; r--; )
      (e[r] && (e[r]._gsap || (e[r]._gsap = new En(e[r], n)))) ||
        e.splice(r, 1);
    return e;
  },
  Le = function (e) {
    return e._gsap || Ie(Pt(e))[0]._gsap;
  },
  Re = function (e, t, n) {
    return (n = e[t]) && R(n)
      ? e[t]()
      : (ie(n) && e.getAttribute && e.getAttribute(t)) || n;
  },
  ze = function (e, t) {
    return (e = e.split(`,`)).forEach(t) || e;
  },
  Be = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Ve = function (e) {
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
    var e = Oe.length,
      t = Oe.slice(0),
      n,
      r;
    for (ke = {}, Oe.length = 0, n = 0; n < e; n++)
      (r = t[n]),
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
  },
  Ge = function (e) {
    return !!(e._initted || e._startAt || e.add);
  },
  Ke = function (e, t, n, r) {
    Oe.length && !j && We(),
      e.render(t, n, r || !!(j && t < 0 && Ge(e))),
      Oe.length && !j && We();
  },
  qe = function (e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + ``).match(me).length < 2
      ? t
      : L(e)
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
    var t = e.parent || ge,
      n = e.keyframes ? Xe(V(e.keyframes)) : Ye;
    if (oe(e.inherit))
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
      (j
        ? e._startAt.revert(Ee)
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
    var n = Math.floor((e = Ve(e / t)));
    return e && n === e ? n - 1 : n;
  },
  dt = function (e, t) {
    return (
      (e - t._start) * t._ts +
      (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    );
  },
  ft = function (e) {
    return (e._end = Ve(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || P) || 0)
    ));
  },
  pt = function (e, t) {
    var n = e._dp;
    return (
      n &&
        n.smoothChildTiming &&
        e._ts &&
        ((e._start = Ve(
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
        (!t._dur || Ot(0, t.totalDuration(), n) - t._tTime > P) &&
          t.render(n, !0)),
      at(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (n = e; n._dp; )
          n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
      e._zTime = -P;
    }
  },
  ht = function (e, t, n, r) {
    return (
      t.parent && it(t),
      (t._start = Ve(
        (z(n) ? n : n || e !== ge ? Tt(e, n, t) : e._time) + t._delay
      )),
      (t._end = Ve(
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
      (W.ScrollTrigger || xe(`scrollTrigger`, t)) &&
      W.ScrollTrigger.create(t, e)
    );
  },
  _t = function (e, t, n, r, i) {
    if ((Fn(e, t, i), !e._initted)) return 1;
    if (
      !n &&
      e._pt &&
      !j &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      Ae !== fn.frame
    )
      return Oe.push(e), (e._lazy = [i, r]), 1;
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
      a !== i || j || r || e._zTime === P || (!t && e._zTime))
    ) {
      if (!e._initted && _t(e, t, r, n, s)) return;
      for (
        u = e._zTime,
          e._zTime = t || (n ? P : 0),
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
        e._onUpdate && !n && Zt(e, `onUpdate`),
        s && e._repeat && !n && e.parent && Zt(e, `onRepeat`),
        (t >= e._tDur || t < 0) &&
          e.ratio === a &&
          (a && it(e, 1),
          !n &&
            !j &&
            (Zt(e, a ? `onComplete` : `onReverseComplete`, !0),
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
      a = Ve(t) || 0,
      o = e._tTime / e._tDur;
    return (
      o && !r && (e._time *= a / e._dur),
      (e._dur = a),
      (e._tDur = i ? (i < 0 ? 1e10 : Ve(a * (i + 1) + e._rDelay * i)) : a),
      o > 0 && !r && pt(e, (e._tTime = e._tDur * o)),
      e.parent && ft(e),
      n || at(e.parent, e),
      e
    );
  },
  Ct = function (e) {
    return e instanceof On ? at(e) : St(e, e._dur);
  },
  wt = { _start: 0, endTime: we, totalDuration: we },
  Tt = function e(t, n, r) {
    var i = t.labels,
      a = t._recent || wt,
      o = t.duration() >= N ? a.endTime(!1) : t._dur,
      s,
      c,
      l;
    return L(n) && (isNaN(n) || n in i)
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
    var r = z(t[1]),
      i = (r ? 2 : 1) + (e < 2 ? 0 : 1),
      a = t[i],
      o,
      s;
    if ((r && (a.duration = t[1]), (a.parent = n), e)) {
      for (o = a, s = n; s && !(`immediateRender` in o); )
        (o = s.vars.defaults || {}), (s = oe(s.vars.inherit) && s.parent);
      (a.immediateRender = oe(o.immediateRender)),
        e < 2 ? (a.runBackwards = 1) : (a.startAt = t[i - 1]);
    }
    return new Hn(t[0], a, t[i + 1]);
  },
  Dt = function (e, t) {
    return e || e === 0 ? t(e) : t;
  },
  Ot = function (e, t, n) {
    return n < e ? e : n > t ? t : n;
  },
  kt = function (e, t) {
    return !L(e) || !(t = he.exec(e)) ? `` : t[1];
  },
  At = function (e, t, n) {
    return Dt(n, function (n) {
      return Ot(e, t, n);
    });
  },
  jt = [].slice,
  Mt = function (e, t) {
    return (
      e &&
      ae(e) &&
      `length` in e &&
      ((!t && !e.length) || (e.length - 1 in e && ae(e[0]))) &&
      !e.nodeType &&
      e !== H
    );
  },
  Nt = function (e, t, n) {
    return (
      n === void 0 && (n = []),
      e.forEach(function (e) {
        var r;
        return (L(e) && !t) || Mt(e, 1)
          ? (r = n).push.apply(r, Pt(e))
          : n.push(e);
      }) || n
    );
  },
  Pt = function (e, t, n) {
    return M && !t && M.selector
      ? M.selector(e)
      : L(e) && !n && (U || !pn())
      ? jt.call((t || _e).querySelectorAll(e), 0)
      : V(e)
      ? Nt(e, n)
      : Mt(e)
      ? jt.call(e, 0)
      : e
      ? [e]
      : [];
  },
  Ft = function (e) {
    return (
      (e = Pt(e)[0] || Se(`Invalid scope`) || {}),
      function (t) {
        var n = e.current || e.nativeElement || e;
        return Pt(
          t,
          n.querySelectorAll
            ? n
            : n === e
            ? Se(`Invalid scope`) || _e.createElement(`div`)
            : e
        );
      }
    );
  },
  It = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  Lt = function (e) {
    if (R(e)) return e;
    var t = ae(e) ? e : { each: e },
      n = xn(t.ease),
      r = t.from || 0,
      i = parseFloat(t.base) || 0,
      a = {},
      o = r > 0 && r < 1,
      s = isNaN(r) || o,
      c = t.axis,
      l = r,
      u = r;
    return (
      L(r)
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
          if (((S = t.grid === `auto` ? 0 : (t.grid || [1, N])[1]), !S)) {
            for (
              b = -N;
              b < (b = d[S++].getBoundingClientRect().left) && S < f;

            );
            S < f && S--;
          }
          for (
            p = a[f] = [],
              m = s ? Math.min(S, f) * l - 0.5 : r % S,
              h = S === N ? 0 : s ? (f * u) / S - 0.5 : (r / S) | 0,
              b = 0,
              x = N,
              y = 0;
            y < f;
            y++
          )
            (g = (y % S) - m),
              (_ = h - ((y / S) | 0)),
              (p[y] = v = c ? Math.abs(c === `y` ? _ : g) : te(g * g + _ * _)),
              v > b && (b = v),
              v < x && (x = v);
          r === `random` && It(p),
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
            (p.u = kt(t.amount || t.each) || 0),
            (n = n && f < 0 ? yn(n) : n);
        }
        return (
          (f = (p[e] - p.min) / p.max || 0),
          Ve(p.b + (n ? n(f) : f) * p.v) + p.u
        );
      }
    );
  },
  Rt = function (e) {
    var t = 10 ** ((e + ``).split(`.`)[1] || ``).length;
    return function (n) {
      var r = Ve(Math.round(parseFloat(n) / e) * e * t);
      return (r - (r % 1)) / t + (z(n) ? 0 : kt(n));
    };
  },
  zt = function (e, t) {
    var n = V(e),
      r,
      i;
    return (
      !n &&
        ae(e) &&
        ((r = n = e.radius || N),
        e.values
          ? ((e = Pt(e.values)), (i = !z(e[0])) && (r *= r))
          : (e = Rt(e.increment))),
      Dt(
        t,
        n
          ? R(e)
            ? function (t) {
                return (i = e(t)), Math.abs(i - t) <= r ? i : t;
              }
            : function (t) {
                for (
                  var n = parseFloat(i ? t.x : t),
                    a = parseFloat(i ? t.y : 0),
                    o = N,
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
                  i || s === t || z(t) ? s : s + kt(t)
                );
              }
          : Rt(e)
      )
    );
  },
  Bt = function (e, t, n, r) {
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
  Vt = function () {
    var e = [...arguments];
    return function (t) {
      return e.reduce(function (e, t) {
        return t(e);
      }, t);
    };
  },
  Ht = function (e, t) {
    return function (n) {
      return e(parseFloat(n)) + (t || kt(n));
    };
  },
  Ut = function (e, t, n) {
    return Jt(e, t, 0, 1, n);
  },
  Wt = function (e, t, n) {
    return Dt(n, function (n) {
      return e[~~t(n)];
    });
  },
  Gt = function e(t, n, r) {
    var i = n - t;
    return V(t)
      ? Wt(t, e(0, t.length), n)
      : Dt(r, function (e) {
          return ((i + ((e - t) % i)) % i) + t;
        });
  },
  Kt = function e(t, n, r) {
    var i = n - t,
      a = i * 2;
    return V(t)
      ? Wt(t, e(0, t.length - 1), n)
      : Dt(r, function (e) {
          return (e = (a + ((e - t) % a)) % a || 0), t + (e > i ? a - e : e);
        });
  },
  qt = function (e) {
    for (var t = 0, n = ``, r, i, a, o; ~(r = e.indexOf(`random(`, t)); )
      (a = e.indexOf(`)`, r)),
        (o = e.charAt(r + 7) === `[`),
        (i = e.substr(r + 7, a - r - 7).match(o ? me : le)),
        (n +=
          e.substr(t, r - t) + Bt(o ? i : +i[0], o ? 0 : +i[1], +i[2] || 1e-5)),
        (t = a + 1);
    return n + e.substr(t, e.length - t);
  },
  Jt = function (e, t, n, r, i) {
    var a = t - e,
      o = r - n;
    return Dt(i, function (t) {
      return n + (((t - e) / a) * o || 0);
    });
  },
  Yt = function e(t, n, r, i) {
    var a = isNaN(t + n)
      ? 0
      : function (e) {
          return (1 - e) * t + e * n;
        };
    if (!a) {
      var o = L(t),
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
        for (c in n) An.call(s, t, c, `get`, n[c]);
        a = function (e) {
          return Zn(e, s) || (o ? t.p : t);
        };
      }
    }
    return Dt(r, a);
  },
  Xt = function (e, t, n) {
    var r = e.labels,
      i = N,
      a,
      o,
      s;
    for (a in r)
      (o = r[a] - t),
        o < 0 == !!n && o && i > (o = Math.abs(o)) && ((s = a), (i = o));
    return s;
  },
  Zt = function (e, t, n) {
    var r = e.vars,
      i = r[t],
      a = M,
      o = e._ctx,
      s,
      c,
      l;
    if (i)
      return (
        (s = r[t + `Params`]),
        (c = r.callbackScope || e),
        n && Oe.length && We(),
        o && (M = o),
        (l = s ? i.apply(c, s) : i.call(c)),
        (M = a),
        l
      );
  },
  Qt = function (e) {
    return (
      it(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!j),
      e.progress() < 1 && Zt(e, `onInterrupt`),
      e
    );
  },
  $t,
  en = [],
  tn = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), B() || e.headless)) {
        var t = e.name,
          n = R(e),
          r =
            t && !n && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          i = {
            init: we,
            render: Zn,
            add: An,
            kill: $n,
            modifier: Qn,
            rawVars: 0,
          },
          a = {
            targetTest: 0,
            get: 0,
            getSetter: qn,
            aliases: {},
            register: 0,
          };
        if ((pn(), e !== r)) {
          if (je[t]) return;
          Ye(r, Ye($e(e, i), a)),
            Ze(r.prototype, Ze(i, $e(e, a))),
            (je[(r.prop = t)] = r),
            e.targetTest && (Pe.push(r), (G[t] = 1)),
            (t =
              (t === `css` ? `CSS` : t.charAt(0).toUpperCase() + t.substr(1)) +
              `Plugin`);
        }
        Ce(t, r), e.register && e.register(gr, r, nr);
      } else en.push(e);
  },
  K = 255,
  nn = {
    aqua: [0, K, K],
    lime: [0, K, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, K],
    navy: [0, 0, 128],
    white: [K, K, K],
    olive: [128, 128, 0],
    yellow: [K, K, 0],
    orange: [K, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [K, 0, 0],
    pink: [K, 192, 203],
    cyan: [0, K, K],
    transparent: [K, K, K, 0],
  },
  rn = function (e, t, n) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? t + (n - t) * e * 6
        : e < 0.5
        ? n
        : e * 3 < 2
        ? t + (n - t) * (2 / 3 - e) * 6
        : t) *
        K +
        0.5) |
        0
    );
  },
  an = function (e, t, n) {
    var r = e ? (z(e) ? [e >> 16, (e >> 8) & K, e & K] : 0) : nn.black,
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
      if ((e.substr(-1) === `,` && (e = e.substr(0, e.length - 1)), nn[e]))
        r = nn[e];
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
            [r >> 16, (r >> 8) & K, r & K, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (r = [e >> 16, (e >> 8) & K, e & K]);
      } else if (e.substr(0, 3) === `hsl`) {
        if (((r = p = e.match(le)), !t))
          (s = (r[0] % 360) / 360),
            (c = r[1] / 100),
            (l = r[2] / 100),
            (a = l <= 0.5 ? l * (c + 1) : l + c - l * c),
            (i = l * 2 - a),
            r.length > 3 && (r[3] *= 1),
            (r[0] = rn(s + 1 / 3, i, a)),
            (r[1] = rn(s, i, a)),
            (r[2] = rn(s - 1 / 3, i, a));
        else if (~e.indexOf(`=`))
          return (r = e.match(ue)), n && r.length < 4 && (r[3] = 1), r;
      } else r = e.match(le) || nn.transparent;
      r = r.map(Number);
    }
    return (
      t &&
        !p &&
        ((i = r[0] / K),
        (a = r[1] / K),
        (o = r[2] / K),
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
  on = function (e) {
    var t = [],
      n = [],
      r = -1;
    return (
      e.split(cn).forEach(function (e) {
        var i = e.match(de) || [];
        t.push.apply(t, i), n.push((r += i.length + 1));
      }),
      (t.c = n),
      t
    );
  },
  sn = function (e, t, n) {
    var r = ``,
      i = (e + r).match(cn),
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
          (e = an(e, t, 1)) &&
          a +
            (t ? e[0] + `,` + e[1] + `%,` + e[2] + `%,` + e[3] : e.join(`,`)) +
            `)`
        );
      })),
      n && ((l = on(e)), (s = n.c), s.join(r) !== l.c.join(r)))
    )
      for (c = e.replace(cn, `1`).split(de), u = c.length - 1; o < u; o++)
        r +=
          c[o] +
          (~s.indexOf(o)
            ? i.shift() || a + `0,0,0,0)`
            : (l.length ? l : i.length ? i : n).shift());
    if (!c)
      for (c = e.split(cn), u = c.length - 1; o < u; o++) r += c[o] + i[o];
    return r + c[u];
  },
  cn = (function () {
    var e = `(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,
      t;
    for (t in nn) e += `|` + t + `\\b`;
    return RegExp(e + `)`, `gi`);
  })(),
  ln = /hsl[a]?\(/,
  un = function (e) {
    var t = e.join(` `),
      n;
    if (((cn.lastIndex = 0), cn.test(t)))
      return (
        (n = ln.test(t)),
        (e[1] = sn(e[1], n)),
        (e[0] = sn(e[0], n, on(e[1]))),
        !0
      );
  },
  dn,
  fn = (function () {
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
          ye &&
            (!U &&
              B() &&
              ((H = U = window),
              (_e = H.document || {}),
              (W.gsap = gr),
              (H.gsapVersions ||= []).push(gr.version),
              be(ve || H.GreenSockGlobals || (!H.gsap && H) || {}),
              en.forEach(tn)),
            (u = typeof requestAnimationFrame < `u` && requestAnimationFrame),
            c && d.sleep(),
            (l =
              u ||
              function (e) {
                return setTimeout(e, (o - d.time * 1e3 + 1) | 0);
              }),
            (dn = 1),
            m(2));
        },
        sleep: function () {
          (u ? cancelAnimationFrame : clearTimeout)(c), (dn = 0), (l = we);
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
          return d.remove(e), s[n ? `unshift` : `push`](r), pn(), r;
        },
        remove: function (e, t) {
          ~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--;
        },
        _listeners: s,
      }),
      d
    );
  })(),
  pn = function () {
    return !dn && fn.wake();
  },
  q = {},
  mn = /^[\d.\-M][\d.\-,\s]/,
  hn = /["']/g,
  gn = function (e) {
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
        (t[r] = isNaN(c) ? c.replace(hn, ``).trim() : +c),
        (r = s.substr(o + 1).trim());
    return t;
  },
  _n = function (e) {
    var t = e.indexOf(`(`) + 1,
      n = e.indexOf(`)`),
      r = e.indexOf(`(`, t);
    return e.substring(t, ~r && r < n ? e.indexOf(`)`, n + 1) : n);
  },
  vn = function (e) {
    var t = (e + ``).split(`(`),
      n = q[t[0]];
    return n && t.length > 1 && n.config
      ? n.config.apply(
          null,
          ~e.indexOf(`{`) ? [gn(t[1])] : _n(e).split(`,`).map(qe)
        )
      : q._CE && mn.test(e)
      ? q._CE(``, e)
      : n;
  },
  yn = function (e) {
    return function (t) {
      return 1 - e(1 - t);
    };
  },
  bn = function e(t, n) {
    for (var r = t._first, i; r; )
      r instanceof On
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
  xn = function (e, t) {
    return (e && (R(e) ? e : q[e] || vn(e))) || t;
  },
  Sn = function (e, t, n, r) {
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
      ze(e, function (e) {
        for (var t in ((q[e] = W[e] = i), (q[(a = e.toLowerCase())] = n), i))
          q[
            a + (t === `easeIn` ? `.in` : t === `easeOut` ? `.out` : `.inOut`)
          ] = q[e + `.` + t] = i[t];
      }),
      i
    );
  },
  Cn = function (e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
    };
  },
  wn = function e(t, n, r) {
    var i = n >= 1 ? n : 1,
      a = (r || (t ? 0.3 : 0.45)) / (n < 1 ? n : 1),
      o = (a / F) * (Math.asin(1 / i) || 0),
      s = function (e) {
        return e === 1 ? 1 : i * 2 ** (-10 * e) * re((e - o) * a) + 1;
      },
      c =
        t === `out`
          ? s
          : t === `in`
          ? function (e) {
              return 1 - s(1 - e);
            }
          : Cn(s);
    return (
      (a = F / a),
      (c.config = function (n, r) {
        return e(t, n, r);
      }),
      c
    );
  },
  Tn = function e(t, n) {
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
          : Cn(r);
    return (
      (i.config = function (n) {
        return e(t, n);
      }),
      i
    );
  };
ze(`Linear,Quad,Cubic,Quart,Quint,Strong`, function (e, t) {
  var n = t < 5 ? t + 1 : t;
  Sn(
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
  (q.Linear.easeNone = q.none = q.Linear.easeIn),
  Sn(`Elastic`, wn(`in`), wn(`out`), wn()),
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
    Sn(
      `Bounce`,
      function (e) {
        return 1 - a(1 - e);
      },
      a
    );
  })(7.5625, 2.75),
  Sn(`Expo`, function (e) {
    return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e);
  }),
  Sn(`Circ`, function (e) {
    return -(te(1 - e * e) - 1);
  }),
  Sn(`Sine`, function (e) {
    return e === 1 ? 1 : -ne(e * I) + 1;
  }),
  Sn(`Back`, Tn(`in`), Tn(`out`), Tn()),
  (q.SteppedEase =
    q.steps =
    W.SteppedEase =
      {
        config: function (e, t) {
          e === void 0 && (e = 1);
          var n = 1 / e,
            r = e + (t ? 0 : 1),
            i = t ? 1 : 0,
            a = 1 - P;
          return function (e) {
            return (((r * Ot(0, a, e)) | 0) + i) * n;
          };
        },
      }),
  (k.ease = q[`quad.out`]),
  ze(
    `onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,
    function (e) {
      return (Fe += e + `,` + e + `Params,`);
    }
  );
var En = function (e, t) {
    (this.id = ee++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = t),
      (this.get = t ? t.get : Re),
      (this.set = t ? t.getSetter : qn);
  },
  Dn = (function () {
    function e(e) {
      (this.vars = e),
        (this._delay = +e.delay || 0),
        (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
          ((this._rDelay = e.repeatDelay || 0),
          (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
        (this._ts = 1),
        St(this, +e.duration, 1, 1),
        (this.data = e.data),
        M && ((this._ctx = M), M.data.push(this)),
        dn || fn.wake();
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
        if ((pn(), !arguments.length)) return this._tTime;
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
            (this._initted && Math.abs(this._zTime) === P) ||
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
        if (!arguments.length) return this._rts === -P ? 0 : this._rts;
        if (this._rts === e) return this;
        var n =
          this.parent && this._ts ? dt(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +e || 0),
          (this._ts = this._ps || e === -P ? 0 : this._rts),
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
                : (pn(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== P &&
                      (this._tTime -= P)
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
          (oe(e) ? this.totalDuration() : this.duration()) /
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
        e === void 0 && (e = De);
        var t = j;
        return (
          (j = e),
          Ge(this) &&
            (this.timeline && this.timeline.revert(e),
            this.totalTime(-0.01, e.suppressEvents)),
          this.data !== `nested` && e.kill !== !1 && this.kill(),
          (j = t),
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
        return this.totalTime(Tt(this, e), oe(t));
      }),
      (t.restart = function (e, t) {
        return (
          this.play().totalTime(e ? -this._delay : 0, oe(t)),
          this._dur || (this._zTime = -P),
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
              this.timeScale(-this._rts || (e ? -P : 0)),
            this)
          : this._rts < 0;
      }),
      (t.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -P), this;
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
            n < this.endTime(!0) - P)
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
          var r = R(e) ? e : Je,
            i = function () {
              var e = t.then;
              (t.then = null),
                R(r) && (r = r(t)) && (r.then || r === t) && (t.then = e),
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
        Qt(this);
      }),
      e
    );
  })();
Ye(Dn.prototype, {
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
  _zTime: -P,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var On = (function (e) {
  D(t, e);
  function t(t, n) {
    var r;
    return (
      t === void 0 && (t = {}),
      (r = e.call(this, t) || this),
      (r.labels = {}),
      (r.smoothChildTiming = !!t.smoothChildTiming),
      (r.autoRemoveChildren = !!t.autoRemoveChildren),
      (r._sort = oe(t.sortChildren)),
      ge && ht(t.parent || ge, E(r), n),
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
        new Hn(e, t, Tt(this, n), 1),
        this
      );
    }),
    (n.call = function (e, t, n) {
      return ht(this, Hn.delayedCall(0, e, t), n);
    }),
    (n.staggerTo = function (e, t, n, r, i, a, o) {
      return (
        (n.duration = t),
        (n.stagger = n.stagger || r),
        (n.onComplete = a),
        (n.onCompleteParams = o),
        (n.parent = this),
        new Hn(e, n, Tt(this, i)),
        this
      );
    }),
    (n.staggerFrom = function (e, t, n, r, i, a, o) {
      return (
        (n.runBackwards = 1),
        (et(n).immediateRender = oe(n.immediateRender)),
        this.staggerTo(e, t, n, r, i, a, o)
      );
    }),
    (n.staggerFromTo = function (e, t, n, r, i, a, o, s) {
      return (
        (r.startAt = n),
        (et(r).immediateRender = oe(r.immediateRender)),
        this.staggerTo(e, t, r, i, a, o, s)
      );
    }),
    (n.render = function (e, t, n) {
      var r = this._time,
        i = this._dirty ? this.totalDuration() : this._tDur,
        a = this._dur,
        o = e <= 0 ? 0 : Ve(e),
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
        (this !== ge && o > i && e >= 0 && (o = i), o !== this._tTime || n || s)
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
            ((c = Ve(o % f)),
            o === i
              ? ((d = this._repeat), (c = a))
              : ((_ = Ve(o / f)),
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
              (this.render(r || (y ? 0 : Ve(d * f)), t, !a)._lock = 0),
              (this._tTime = o),
              !t && this.parent && Zt(this, `onRepeat`),
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
            bn(this, y);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((m = xt(this, Ve(r), Ve(c))), m && (o -= c - (c = m._start))),
          (this._tTime = o),
          (this._time = c),
          (this._act = !h),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = e),
            (r = 0)),
          !r && o && !t && !_ && (Zt(this, `onStart`), this._tTime !== o))
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
                (m = 0), u && (o += this._zTime = -P);
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
                  n || (j && Ge(l))
                ),
                c !== this._time || (!this._ts && !p))
              ) {
                (m = 0), u && (o += this._zTime = S ? -P : P);
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
          (m.render(c >= r ? 0 : -P)._zTime = c >= r ? 1 : -1),
          this._ts)
        )
          return (this._start = g), ft(this), this.render(e, t, n);
        this._onUpdate && !t && Zt(this, `onUpdate`, !0),
          ((o === i && this._tTime >= this.totalDuration()) || (!o && r)) &&
            (g === this._start || Math.abs(h) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((e || !a) &&
                ((o === i && this._ts > 0) || (!o && this._ts < 0)) &&
                it(this, 1),
              !t &&
                !(e < 0 && !r) &&
                (o || r || !i) &&
                (Zt(
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
      if ((z(t) || (t = Tt(this, t, e)), !(e instanceof Dn))) {
        if (V(e))
          return (
            e.forEach(function (e) {
              return n.add(e, t);
            }),
            this
          );
        if (L(e)) return this.addLabel(e, t);
        if (R(e)) e = Hn.delayedCall(0, e);
        else return this;
      }
      return this === e ? this : ht(this, e, t);
    }),
    (n.getChildren = function (e, t, n, r) {
      e === void 0 && (e = !0),
        t === void 0 && (t = !0),
        n === void 0 && (n = !0),
        r === void 0 && (r = -N);
      for (var i = [], a = this._first; a; )
        a._start >= r &&
          (a instanceof Hn
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
      return L(e)
        ? this.removeLabel(e)
        : R(e)
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
            (this._start = Ve(
              fn.time -
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
      var r = Hn.delayedCall(0, t || we, n);
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
        Nn !== r[i] && r[i].kill(e, t);
      return this;
    }),
    (n.getTweensOf = function (e, t) {
      for (var n = [], r = Pt(e), i = this._first, a = z(t), o; i; )
        i instanceof Hn
          ? Ue(i._targets, r) &&
            (a
              ? (!Nn || (i._initted && i._ts)) &&
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
        u = Hn.to(
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
                P,
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
      return e === void 0 && (e = this._time), Xt(this, Tt(this, e));
    }),
    (n.previousLabel = function (e) {
      return e === void 0 && (e = this._time), Xt(this, Tt(this, e), 1);
    }),
    (n.currentLabel = function (e) {
      return arguments.length
        ? this.seek(e, !0)
        : this.previousLabel(this._time + P);
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
        i = N,
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
        St(n, n === ge && n._time > t ? n._time : t, 1, 1), (n._dirty = 0);
      }
      return n._tDur;
    }),
    (t.updateRoot = function (e) {
      if ((ge._ts && (Ke(ge, dt(e, ge)), (Ae = fn.frame)), fn.frame >= Ne)) {
        Ne += O.autoSleep || 120;
        var t = ge._first;
        if ((!t || !t._ts) && O.autoSleep && fn._listeners.length < 2) {
          for (; t && !t._ts; ) t = t._next;
          t || fn.sleep();
        }
      }
    }),
    t
  );
})(Dn);
Ye(On.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var kn = function (e, t, n, r, i, a, o) {
    var s = new nr(this._pt, e, t, 0, 1, Xn, null, i),
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
        (g = ~r.indexOf(`random(`)) && (r = qt(r)),
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
  An = function (e, t, n, r, i, a, o, s, c, l) {
    R(r) && (r = r(i || 0, e, a));
    var u = e[t],
      d =
        n === `get`
          ? R(u)
            ? c
              ? e[
                  t.indexOf(`set`) || !R(e[`get` + t.substr(3)])
                    ? t
                    : `get` + t.substr(3)
                ](c)
              : e[t]()
            : u
          : n,
      f = R(u) ? (c ? Gn : Wn) : Un,
      p;
    if (
      (L(r) &&
        (~r.indexOf(`random(`) && (r = qt(r)),
        r.charAt(1) === `=` &&
          ((p = He(d, r) + (kt(d) || 0)), (p || p === 0) && (r = p))),
      !l || d !== r || Pn)
    )
      return !isNaN(d * r) && r !== ``
        ? ((p = new nr(
            this._pt,
            e,
            t,
            +d || 0,
            r - (d || 0),
            typeof u == `boolean` ? Yn : Jn,
            0,
            f
          )),
          c && (p.fp = c),
          o && p.modifier(o, this, e),
          (this._pt = p))
        : (!u && !(t in e) && xe(t, r),
          kn.call(this, e, t, d, r, f, s || O.stringFilter, c));
  },
  jn = function (e, t, n, r, i) {
    if (
      (R(e) && (e = zn(e, i, t, n, r)),
      !ae(e) || (e.style && e.nodeType) || V(e) || ce(e))
    )
      return L(e) ? zn(e, i, t, n, r) : e;
    var a = {},
      o;
    for (o in e) a[o] = zn(e[o], i, t, n, r);
    return a;
  },
  Mn = function (e, t, n, r, i, a) {
    var o, s, c, l;
    if (
      je[e] &&
      (o = new je[e]()).init(
        i,
        o.rawVars ? t[e] : jn(t[e], r, i, a, n),
        n,
        r,
        a
      ) !== !1 &&
      ((n._pt = s = new nr(n._pt, i, e, 0, 1, o.render, o, 0, o.priority)),
      n !== $t)
    )
      for (c = n._ptLookup[n._targets.indexOf(i)], l = o._props.length; l--; )
        c[o._props[l]] = s;
    return o;
  },
  Nn,
  Pn,
  Fn = function e(t, n, r) {
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
      y = t._overwrite === `auto` && !A,
      b = t.timeline,
      x,
      S,
      C,
      w,
      T,
      E,
      D,
      O,
      M,
      F,
      I,
      ee,
      te;
    if (
      (b && (!f || !a) && (a = `none`),
      (t._ease = xn(a, k.ease)),
      (t._yEase = d ? yn(xn(d === !0 ? a : d, k.ease)) : 0),
      d &&
        t._yoyo &&
        !t._repeat &&
        ((d = t._yEase), (t._yEase = t._ease), (t._ease = d)),
      (t._from = !b && !!i.runBackwards),
      !b || (f && !i.stagger))
    ) {
      if (
        ((O = g[0] ? Le(g[0]).harness : 0),
        (ee = O && i[O.prop]),
        (x = $e(i, G)),
        h &&
          (h._zTime < 0 && h.progress(1),
          n < 0 && u && s && !p ? h.render(-1, !0) : h.revert(u && m ? Ee : Te),
          (h._lazy = 0)),
        o)
      ) {
        if (
          (it(
            (t._startAt = Hn.set(
              g,
              Ye(
                {
                  data: `isStart`,
                  overwrite: !1,
                  parent: _,
                  immediateRender: !0,
                  lazy: !h && oe(c),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    l &&
                    function () {
                      return Zt(t, `onUpdate`);
                    },
                  stagger: 0,
                },
                o
              )
            ))
          ),
          (t._startAt._dp = 0),
          (t._startAt._sat = t),
          n < 0 && (j || (!s && !p)) && t._startAt.revert(Ee),
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
              lazy: s && !h && oe(c),
              immediateRender: s,
              stagger: 0,
              parent: _,
            },
            x
          )),
          ee && (C[O.prop] = ee),
          it((t._startAt = Hn.set(g, C))),
          (t._startAt._dp = 0),
          (t._startAt._sat = t),
          n < 0 && (j ? t._startAt.revert(Ee) : t._startAt.render(-1, !0)),
          (t._zTime = n),
          !s)
        )
          e(t._startAt, P, P);
        else if (!n) return;
      }
      for (
        t._pt = t._ptCache = 0, c = (m && oe(c)) || (c && !m), S = 0;
        S < g.length;
        S++
      ) {
        if (
          ((T = g[S]),
          (D = T._gsap || Ie(g)[S]._gsap),
          (t._ptLookup[S] = F = {}),
          ke[D.id] && Oe.length && We(),
          (I = v === g ? S : v.indexOf(T)),
          O &&
            (M = new O()).init(T, ee || x, t, I, v) !== !1 &&
            ((t._pt = w =
              new nr(t._pt, T, M.name, 0, 1, M.render, M, 0, M.priority)),
            M._props.forEach(function (e) {
              F[e] = w;
            }),
            M.priority && (E = 1)),
          !O || ee)
        )
          for (C in x)
            je[C] && (M = Mn(C, x, t, I, T, v))
              ? M.priority && (E = 1)
              : (F[C] = w =
                  An.call(t, T, C, `get`, x[C], I, v, 0, i.stringFilter));
        t._op && t._op[S] && t.kill(T, t._op[S]),
          y &&
            t._pt &&
            ((Nn = t),
            ge.killTweensOf(T, F, t.globalTime(n)),
            (te = !t.parent),
            (Nn = 0)),
          t._pt && c && (ke[D.id] = 1);
      }
      E && tr(t), t._onInit && t._onInit(t);
    }
    (t._onUpdate = l),
      (t._initted = (!t._op || t._pt) && !te),
      f && n <= 0 && b.render(N, !0, !0);
  },
  In = function (e, t, n, r, i, a, o, s) {
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
            (Pn = 1),
            (e.vars[t] = `+=0`),
            Fn(e, o),
            (Pn = 0),
            s ? Se(t + ` not eligible for reset`) : 1
          );
        c.push(l);
      }
    for (f = c.length; f--; )
      (u = c[f]),
        (l = u._pt || u),
        (l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c),
        (l.c = n - l.s),
        (u.e &&= Be(n) + kt(u.e)),
        (u.b &&= l.s + kt(u.b));
  },
  Ln = function (e, t) {
    var n = e[0] ? Le(e[0]).harness : 0,
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
  Rn = function (e, t, n, r) {
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
  zn = function (e, t, n, r, i) {
    return R(e)
      ? e.call(t, n, r, i)
      : L(e) && ~e.indexOf(`random(`)
      ? qt(e)
      : e;
  },
  Bn = Fe + `repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert`,
  Vn = {};
ze(Bn + `,id,stagger,delay,duration,paused,scrollTrigger`, function (e) {
  return (Vn[e] = 1);
});
var Hn = (function (e) {
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
      g = n.parent || ge,
      _ = (V(t) || ce(t) ? z(t[0]) : `length` in n) ? [t] : Pt(t),
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
        ? Ie(_)
        : Se(
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
          new On({
            data: `nested`,
            defaults: p || {},
            targets: g && g.data === `nested` ? g.vars.targets : _,
          })),
        v.kill(),
        (v.parent = v._dp = E(a)),
        (v._start = 0),
        u || se(s) || se(c))
      ) {
        if (((x = _.length), (w = u && Lt(u)), ae(u)))
          for (S in u) ~Bn.indexOf(S) && ((T ||= {}), (T[S] = u[S]));
        for (y = 0; y < x; y++)
          (b = $e(n, Vn)),
            (b.stagger = 0),
            h && (b.yoyoEase = h),
            T && Ze(b, T),
            (C = _[y]),
            (b.duration = +zn(s, E(a), y, C, _)),
            (b.delay = (+zn(c, E(a), y, C, _) || 0) - a._delay),
            !u &&
              x === 1 &&
              b.delay &&
              ((a._delay = c = b.delay), (a._start += c), (b.delay = 0)),
            v.to(C, b, w ? w(y, C, _) : 0),
            (v._ease = q.none);
        v.duration() ? (s = c = 0) : (a.timeline = 0);
      } else if (f) {
        et(Ye(v.vars.defaults, { ease: `none` })),
          (v._ease = xn(f.ease || n.ease || `none`));
        var D = 0,
          k,
          j,
          M;
        if (V(f))
          f.forEach(function (e) {
            return v.to(_, e, `>`);
          }),
            v.duration();
        else {
          for (S in ((b = {}), f))
            S === `ease` || S === `easeEach` || Rn(S, f[S], b, f.easeEach);
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
              (j = k[y]),
                (M = {
                  ease: j.e,
                  duration: ((j.t - (y ? k[y - 1].t : 0)) / 100) * s,
                }),
                (M[S] = j.v),
                v.to(_, M, D),
                (D += M.duration);
          v.duration() < s && v.to({}, { duration: s - v.duration() });
        }
      }
      s || a.duration((s = v.duration()));
    } else a.timeline = 0;
    return (
      d === !0 && !A && ((Nn = E(a)), ge.killTweensOf(_), (Nn = 0)),
      ht(g, E(a), r),
      n.reversed && a.reverse(),
      n.paused && a.paused(!0),
      (l ||
        (!s &&
          !f &&
          a._start === Ve(g._time) &&
          oe(l) &&
          ct(E(a)) &&
          g.data !== `nested`)) &&
        ((a._tTime = -P), a.render(Math.max(0, -c) || 0)),
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
        s = e > i - P && !o ? i : e < P ? 0 : e,
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
            ((c = Ve(s % d)),
            s === i
              ? ((u = this._repeat), (c = a))
              : ((f = Ve(s / d)),
                (u = ~~f),
                u && u === f ? ((c = a), u--) : c > a && (c = a)),
            (p = this._yoyo && u & 1),
            p && ((g = this._yEase), (c = a - c)),
            (f = ut(this._tTime, d)),
            c === r && !n && this._initted && u === f)
          )
            return (this._tTime = s), this;
          u !== f &&
            (h && this._yEase && bn(h, p),
            this.vars.repeatRefresh &&
              !p &&
              !this._lock &&
              c !== d &&
              this._initted &&
              ((this._lock = n = 1),
              (this.render(Ve(d * u), !0).invalidate()._lock = 0)));
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
          !r && s && !t && !f && (Zt(this, `onStart`), this._tTime !== s))
        )
          return this;
        for (l = this._pt; l; ) l.r(m, l.d), (l = l._next);
        (h && h.render(e < 0 ? e : h._dur * h._ease(c / this._dur), t, n)) ||
          (this._startAt && (this._zTime = e)),
          this._onUpdate &&
            !t &&
            (o && st(this, e, t, n), Zt(this, `onUpdate`)),
          this._repeat &&
            u !== f &&
            this.vars.onRepeat &&
            !t &&
            this.parent &&
            Zt(this, `onRepeat`),
          (s === this._tDur || !s) &&
            this._tTime === s &&
            (o && !this._onUpdate && st(this, e, !0, !0),
            (e || !a) &&
              ((s === this._tDur && this._ts > 0) || (!s && this._ts < 0)) &&
              it(this, 1),
            !t &&
              !(o && !r) &&
              (s || r || p) &&
              (Zt(this, s === i ? `onComplete` : `onReverseComplete`, !0),
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
      dn || fn.wake(), this._ts || this.play();
      var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        o;
      return (
        this._initted || Fn(this, a),
        (o = this._ease(a / this._dur)),
        In(this, e, t, n, r, o, a, i)
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
            ? Qt(this)
            : this.scrollTrigger && this.scrollTrigger.kill(!!j),
          this
        );
      if (this.timeline) {
        var n = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(e, t, Nn && Nn.vars.overwrite !== !0)
            ._first || Qt(this),
          this.parent &&
            n !== this.timeline.totalDuration() &&
            St(this, (this._dur * this.timeline._tDur) / n, 0, 1),
          this
        );
      }
      var r = this._targets,
        i = e ? Pt(e) : r,
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
        return t === `all` && (this._pt = 0), Qt(this);
      for (
        s = this._op = this._op || [],
          t !== `all` &&
            (L(t) &&
              ((d = {}),
              ze(t, function (e) {
                return (d[e] = 1);
              }),
              (t = d)),
            (t = Ln(r, t))),
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
      return this._initted && !this._pt && o && Qt(this), this;
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
      return ge.killTweensOf(e, t, n);
    }),
    t
  );
})(Dn);
Ye(Hn.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
  ze(`staggerTo,staggerFrom,staggerFromTo`, function (e) {
    Hn[e] = function () {
      var t = new On(),
        n = jt.call(arguments, 0);
      return n.splice(e === `staggerFromTo` ? 5 : 4, 0, 0), t[e].apply(t, n);
    };
  });
var Un = function (e, t, n) {
    return (e[t] = n);
  },
  Wn = function (e, t, n) {
    return e[t](n);
  },
  Gn = function (e, t, n, r) {
    return e[t](r.fp, n);
  },
  Kn = function (e, t, n) {
    return e.setAttribute(t, n);
  },
  qn = function (e, t) {
    return R(e[t]) ? Wn : ie(e[t]) && e.setAttribute ? Kn : Un;
  },
  Jn = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
  },
  Yn = function (e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t);
  },
  Xn = function (e, t) {
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
  Zn = function (e, t) {
    for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next);
  },
  Qn = function (e, t, n, r) {
    for (var i = this._pt, a; i; )
      (a = i._next), i.p === r && i.modifier(e, t, n), (i = a);
  },
  $n = function (e) {
    for (var t = this._pt, n, r; t; )
      (r = t._next),
        (t.p === e && !t.op) || t.op === e
          ? rt(this, t, `_pt`)
          : t.dep || (n = 1),
        (t = r);
    return !n;
  },
  er = function (e, t, n, r) {
    r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
  },
  tr = function (e) {
    for (var t = e._pt, n, r, i, a; t; ) {
      for (n = t._next, r = i; r && r.pr > t.pr; ) r = r._next;
      (t._prev = r ? r._prev : a) ? (t._prev._next = t) : (i = t),
        (t._next = r) ? (r._prev = t) : (a = t),
        (t = n);
    }
    e._pt = i;
  },
  nr = (function () {
    function e(e, t, n, r, i, a, o, s, c) {
      (this.t = t),
        (this.s = r),
        (this.c = i),
        (this.p = n),
        (this.r = a || Jn),
        (this.d = o || this),
        (this.set = s || Un),
        (this.pr = c || 0),
        (this._next = e),
        e && (e._prev = this);
    }
    var t = e.prototype;
    return (
      (t.modifier = function (e, t, n) {
        (this.mSet = this.mSet || this.set),
          (this.set = er),
          (this.m = e),
          (this.mt = n),
          (this.tween = t);
      }),
      e
    );
  })();
ze(
  Fe +
    `parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger`,
  function (e) {
    return (G[e] = 1);
  }
),
  (W.TweenMax = W.TweenLite = Hn),
  (W.TimelineLite = W.TimelineMax = On),
  (ge = new On({
    sortChildren: !1,
    defaults: k,
    autoRemoveChildren: !0,
    id: `root`,
    smoothChildTiming: !0,
  })),
  (O.stringFilter = un);
var rr = [],
  ir = {},
  ar = [],
  or = 0,
  sr = 0,
  cr = function (e) {
    return (ir[e] || ar).map(function (e) {
      return e();
    });
  },
  lr = function () {
    var e = Date.now(),
      t = [];
    e - or > 2 &&
      (cr(`matchMediaInit`),
      rr.forEach(function (e) {
        var n = e.queries,
          r = e.conditions,
          i,
          a,
          o,
          s;
        for (a in n)
          (i = H.matchMedia(n[a]).matches),
            i && (o = 1),
            i !== r[a] && ((r[a] = i), (s = 1));
        s && (e.revert(), o && t.push(e));
      }),
      cr(`matchMediaRevert`),
      t.forEach(function (e) {
        return e.onMatch(e, function (t) {
          return e.add(null, t);
        });
      }),
      (or = e),
      cr(`matchMedia`));
  },
  ur = (function () {
    function e(e, t) {
      (this.selector = t && Ft(t)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = sr++),
        e && this.add(e);
    }
    var t = e.prototype;
    return (
      (t.add = function (e, t, n) {
        R(e) && ((n = t), (t = e), (e = R));
        var r = this,
          i = function () {
            var e = M,
              i = r.selector,
              a;
            return (
              e && e !== r && e.data.push(r),
              n && (r.selector = Ft(n)),
              (M = r),
              (a = t.apply(r, arguments)),
              R(a) && r._r.push(a),
              (M = e),
              (r.selector = i),
              (r.isReverted = !1),
              a
            );
          };
        return (
          (r.last = i),
          e === R
            ? i(r, function (e) {
                return r.add(null, e);
              })
            : e
            ? (r[e] = i)
            : i
        );
      }),
      (t.ignore = function (e) {
        var t = M;
        (M = null), e(this), (M = t);
      }),
      (t.getTweens = function () {
        var t = [];
        return (
          this.data.forEach(function (n) {
            return n instanceof e
              ? t.push.apply(t, n.getTweens())
              : n instanceof Hn &&
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
                    i instanceof On
                      ? i.data !== `nested` &&
                        (i.scrollTrigger && i.scrollTrigger.revert(), i.kill())
                      : !(i instanceof Hn) && i.revert && i.revert(e);
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
          for (var r = rr.length; r--; )
            rr[r].id === this.id && rr.splice(r, 1);
      }),
      (t.revert = function (e) {
        this.kill(e || {});
      }),
      e
    );
  })(),
  dr = (function () {
    function e(e) {
      (this.contexts = []), (this.scope = e), M && M.data.push(this);
    }
    var t = e.prototype;
    return (
      (t.add = function (e, t, n) {
        ae(e) || (e = { matches: e });
        var r = new ur(0, n || this.scope),
          i = (r.conditions = {}),
          a,
          o,
          s;
        for (o in (M && !r.selector && (r.selector = M.selector),
        this.contexts.push(r),
        (t = r.add(`onMatch`, t)),
        (r.queries = e),
        e))
          o === `all`
            ? (s = 1)
            : ((a = H.matchMedia(e[o])),
              a &&
                (rr.indexOf(r) < 0 && rr.push(r),
                (i[o] = a.matches) && (s = 1),
                a.addListener
                  ? a.addListener(lr)
                  : a.addEventListener(`change`, lr)));
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
  fr = {
    registerPlugin: function () {
      [...arguments].forEach(function (e) {
        return tn(e);
      });
    },
    timeline: function (e) {
      return new On(e);
    },
    getTweensOf: function (e, t) {
      return ge.getTweensOf(e, t);
    },
    getProperty: function (e, t, n, r) {
      L(e) && (e = Pt(e)[0]);
      var i = Le(e || {}).get,
        a = n ? Je : qe;
      return (
        n === `native` && (n = ``),
        e &&
          (t
            ? a(((je[t] && je[t].get) || i)(e, t, n, r))
            : function (t, n, r) {
                return a(((je[t] && je[t].get) || i)(e, t, n, r));
              })
      );
    },
    quickSetter: function (e, t, n) {
      if (((e = Pt(e)), e.length > 1)) {
        var r = e.map(function (e) {
            return gr.quickSetter(e, t, n);
          }),
          i = r.length;
        return function (e) {
          for (var t = i; t--; ) r[t](e);
        };
      }
      e = e[0] || {};
      var a = je[t],
        o = Le(e),
        s = (o.harness && (o.harness.aliases || {})[t]) || t,
        c = a
          ? function (t) {
              var r = new a();
              ($t._pt = 0),
                r.init(e, n ? t + n : t, $t, 0, [e]),
                r.render(1, r),
                $t._pt && Zn(1, $t);
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
        i = gr.to(
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
      return ge.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = xn(e.ease, k.ease)), Qe(k, e || {});
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
          e && !je[e] && !W[e] && Se(t + ` effect requires ` + e + ` plugin.`)
        );
      }),
        (Me[t] = function (e, t, r) {
          return n(Pt(e), Ye(t || {}, i), r);
        }),
        a &&
          (On.prototype[t] = function (e, n, r) {
            return this.add(Me[t](e, ae(n) ? n : (r = n) && {}, this), r);
          });
    },
    registerEase: function (e, t) {
      q[e] = xn(t);
    },
    parseEase: function (e, t) {
      return arguments.length ? xn(e, t) : q;
    },
    getById: function (e) {
      return ge.getById(e);
    },
    exportRoot: function (e, t) {
      e === void 0 && (e = {});
      var n = new On(e),
        r,
        i;
      for (
        n.smoothChildTiming = oe(e.smoothChildTiming),
          ge.remove(n),
          n._dp = 0,
          n._time = n._tTime = ge._time,
          r = ge._first;
        r;

      )
        (i = r._next),
          (t ||
            !(
              !r._dur &&
              r instanceof Hn &&
              r.vars.onComplete === r._targets[0]
            )) &&
            ht(n, r, r._start - r._delay),
          (r = i);
      return ht(ge, n, 0), n;
    },
    context: function (e, t) {
      return e ? new ur(e, t) : M;
    },
    matchMedia: function (e) {
      return new dr(e);
    },
    matchMediaRefresh: function () {
      return (
        rr.forEach(function (e) {
          var t = e.conditions,
            n,
            r;
          for (r in t) t[r] && ((t[r] = !1), (n = 1));
          n && e.revert();
        }) || lr()
      );
    },
    addEventListener: function (e, t) {
      var n = ir[e] || (ir[e] = []);
      ~n.indexOf(t) || n.push(t);
    },
    removeEventListener: function (e, t) {
      var n = ir[e],
        r = n && n.indexOf(t);
      r >= 0 && n.splice(r, 1);
    },
    utils: {
      wrap: Gt,
      wrapYoyo: Kt,
      distribute: Lt,
      random: Bt,
      snap: zt,
      normalize: Ut,
      getUnit: kt,
      clamp: At,
      splitColor: an,
      toArray: Pt,
      selector: Ft,
      mapRange: Jt,
      pipe: Vt,
      unitize: Ht,
      interpolate: Yt,
      shuffle: It,
    },
    install: be,
    effects: Me,
    ticker: fn,
    updateRoot: On.updateRoot,
    plugins: je,
    globalTimeline: ge,
    core: {
      PropTween: nr,
      globals: Ce,
      Tween: Hn,
      Timeline: On,
      Animation: Dn,
      getCache: Le,
      _removeLinkedListItem: rt,
      reverting: function () {
        return j;
      },
      context: function (e) {
        return e && M && (M.data.push(e), (e._ctx = M)), M;
      },
      suppressOverwrites: function (e) {
        return (A = e);
      },
    },
  };
ze(`to,from,fromTo,delayedCall,set,killTweensOf`, function (e) {
  return (fr[e] = Hn[e]);
}),
  fn.add(On.updateRoot),
  ($t = fr.to({}, { duration: 0 }));
var pr = function (e, t) {
    for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
      n = n._next;
    return n;
  },
  mr = function (e, t) {
    var n = e._targets,
      r,
      i,
      a;
    for (r in t)
      for (i = n.length; i--; )
        (a = e._ptLookup[i][r]),
          (a &&= a.d) &&
            (a._pt && (a = pr(a, r)),
            a && a.modifier && a.modifier(t[r], e, n[i], r));
  },
  hr = function (e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function (e, n, r) {
        r._onInit = function (e) {
          var r, i;
          if (
            (L(n) &&
              ((r = {}),
              ze(n, function (e) {
                return (r[e] = 1);
              }),
              (n = r)),
            t)
          ) {
            for (i in ((r = {}), n)) r[i] = t(n[i]);
            n = r;
          }
          mr(e, n);
        };
      },
    };
  },
  gr =
    fr.registerPlugin(
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
            j ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), (n = n._next);
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
      hr(`roundProps`, Rt),
      hr(`modifiers`),
      hr(`snap`, zt)
    ) || fr;
(Hn.version = On.version = gr.version = `3.13.0`),
  (ye = 1),
  B() && pn(),
  q.Power0,
  q.Power1,
  q.Power2,
  q.Power3,
  q.Power4,
  q.Linear,
  q.Quad,
  q.Cubic,
  q.Quart,
  q.Quint,
  q.Strong,
  q.Elastic,
  q.Back,
  q.SteppedEase,
  q.Bounce,
  q.Sine,
  q.Expo,
  q.Circ;
var _r,
  vr,
  yr,
  br,
  xr,
  Sr,
  Cr,
  wr = function () {
    return typeof window < `u`;
  },
  Tr = {},
  Er = 180 / Math.PI,
  Dr = Math.PI / 180,
  Or = Math.atan2,
  kr = 1e8,
  Ar = /([A-Z])/g,
  jr = /(left|right|width|margin|padding|x)/i,
  Mr = /[\s,\(]\S/,
  Nr = {
    autoAlpha: `opacity,visibility`,
    scale: `scaleX,scaleY`,
    alpha: `opacity`,
  },
  Pr = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
  },
  Fr = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u,
      t
    );
  },
  Ir = function (e, t) {
    return t.set(
      t.t,
      t.p,
      e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b,
      t
    );
  },
  Lr = function (e, t) {
    var n = t.s + t.c * e;
    t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t);
  },
  Rr = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t);
  },
  zr = function (e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : t.b, t);
  },
  Br = function (e, t, n) {
    return (e.style[t] = n);
  },
  Vr = function (e, t, n) {
    return e.style.setProperty(t, n);
  },
  Hr = function (e, t, n) {
    return (e._gsap[t] = n);
  },
  Ur = function (e, t, n) {
    return (e._gsap.scaleX = e._gsap.scaleY = n);
  },
  Wr = function (e, t, n, r, i) {
    var a = e._gsap;
    (a.scaleX = a.scaleY = n), a.renderTransform(i, a);
  },
  Gr = function (e, t, n, r, i) {
    var a = e._gsap;
    (a[t] = n), a.renderTransform(i, a);
  },
  Kr = `transform`,
  qr = Kr + `Origin`,
  Jr = function e(t, n) {
    var r = this,
      i = this.target,
      a = i.style,
      o = i._gsap;
    if (t in Tr && a) {
      if (((this.tfm = this.tfm || {}), t !== `transform`))
        (t = Nr[t] || t),
          ~t.indexOf(`,`)
            ? t.split(`,`).forEach(function (e) {
                return (r.tfm[e] = pi(i, e));
              })
            : (this.tfm[t] = o.x ? o[t] : pi(i, t)),
          t === qr && (this.tfm.zOrigin = o.zOrigin);
      else
        return Nr.transform.split(`,`).forEach(function (t) {
          return e.call(r, t, n);
        });
      if (this.props.indexOf(Kr) >= 0) return;
      o.svg &&
        ((this.svgo = i.getAttribute(`data-svg-origin`)),
        this.props.push(qr, n, ``)),
        (t = Kr);
    }
    (a || n) && this.props.push(t, n, a[t]);
  },
  Yr = function (e) {
    e.translate &&
      (e.removeProperty(`translate`),
      e.removeProperty(`scale`),
      e.removeProperty(`rotate`));
  },
  Xr = function () {
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
              : e[i].replace(Ar, `-$1`).toLowerCase()
          );
    if (this.tfm) {
      for (a in this.tfm) r[a] = this.tfm[a];
      r.svg &&
        (r.renderTransform(),
        t.setAttribute(`data-svg-origin`, this.svgo || ``)),
        (i = Cr()),
        (!i || !i.isStart) &&
          !n[Kr] &&
          (Yr(n),
          r.zOrigin &&
            n[qr] &&
            ((n[qr] += ` ` + r.zOrigin + `px`),
            (r.zOrigin = 0),
            r.renderTransform()),
          (r.uncache = 1));
    }
  },
  Zr = function (e, t) {
    var n = { target: e, props: [], revert: Xr, save: Jr };
    return (
      e._gsap || gr.core.getCache(e),
      t &&
        e.style &&
        e.nodeType &&
        t.split(`,`).forEach(function (e) {
          return n.save(e);
        }),
      n
    );
  },
  Qr,
  $r = function (e, t) {
    var n = vr.createElementNS
      ? vr.createElementNS(
          (t || `http://www.w3.org/1999/xhtml`).replace(/^https/, `http`),
          e
        )
      : vr.createElement(e);
    return n && n.style ? n : vr.createElement(e);
  },
  ei = function e(t, n, r) {
    var i = getComputedStyle(t);
    return (
      i[n] ||
      i.getPropertyValue(n.replace(Ar, `-$1`).toLowerCase()) ||
      i.getPropertyValue(n) ||
      (!r && e(t, ni(n) || n, 1)) ||
      ``
    );
  },
  ti = `O,Moz,ms,Ms,Webkit`.split(`,`),
  ni = function (e, t, n) {
    var r = (t || xr).style,
      i = 5;
    if (e in r && !n) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      i-- && !(ti[i] + e in r);

    );
    return i < 0 ? null : (i === 3 ? `ms` : i >= 0 ? ti[i] : ``) + e;
  },
  ri = function () {
    wr() &&
      window.document &&
      ((_r = window),
      (vr = _r.document),
      (yr = vr.documentElement),
      (xr = $r(`div`) || { style: {} }),
      $r(`div`),
      (Kr = ni(Kr)),
      (qr = Kr + `Origin`),
      (xr.style.cssText = `border-width:0;line-height:0;position:absolute;padding:0`),
      (Qr = !!ni(`perspective`)),
      (Cr = gr.core.reverting),
      (br = 1));
  },
  ii = function (e) {
    var t = e.ownerSVGElement,
      n = $r(
        `svg`,
        (t && t.getAttribute(`xmlns`)) || `http://www.w3.org/2000/svg`
      ),
      r = e.cloneNode(!0),
      i;
    (r.style.display = `block`), n.appendChild(r), yr.appendChild(n);
    try {
      i = r.getBBox();
    } catch {}
    return n.removeChild(r), yr.removeChild(n), i;
  },
  ai = function (e, t) {
    for (var n = t.length; n--; )
      if (e.hasAttribute(t[n])) return e.getAttribute(t[n]);
  },
  oi = function (e) {
    var t, n;
    try {
      t = e.getBBox();
    } catch {
      (t = ii(e)), (n = 1);
    }
    return (
      (t && (t.width || t.height)) || n || (t = ii(e)),
      t && !t.width && !t.x && !t.y
        ? {
            x: +ai(e, [`x`, `cx`, `x1`]) || 0,
            y: +ai(e, [`y`, `cy`, `y1`]) || 0,
            width: 0,
            height: 0,
          }
        : t
    );
  },
  si = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && oi(e));
  },
  ci = function (e, t) {
    if (t) {
      var n = e.style,
        r;
      t in Tr && t !== qr && (t = Kr),
        n.removeProperty
          ? ((r = t.substr(0, 2)),
            (r === `ms` || t.substr(0, 6) === `webkit`) && (t = `-` + t),
            n.removeProperty(
              r === `--` ? t : t.replace(Ar, `-$1`).toLowerCase()
            ))
          : n.removeAttribute(t);
    }
  },
  li = function (e, t, n, r, i, a) {
    var o = new nr(e._pt, t, n, 0, 1, a ? zr : Rr);
    return (e._pt = o), (o.b = r), (o.e = i), e._props.push(n), o;
  },
  ui = { deg: 1, rad: 1, turn: 1 },
  di = { grid: 1, flex: 1 },
  fi = function e(t, n, r, i) {
    var a = parseFloat(r) || 0,
      o = (r + ``).trim().substr((a + ``).length) || `px`,
      s = xr.style,
      c = jr.test(n),
      l = t.tagName.toLowerCase() === `svg`,
      u = (l ? `client` : `offset`) + (c ? `Width` : `Height`),
      d = 100,
      f = i === `px`,
      p = i === `%`,
      m,
      h,
      g,
      _;
    if (i === o || !a || ui[i] || ui[o]) return a;
    if (
      (o !== `px` && !f && (a = e(t, n, r, `px`)),
      (_ = t.getCTM && si(t)),
      (p || o === `%`) && (Tr[n] || ~n.indexOf(`adius`)))
    )
      return (
        (m = _ ? t.getBBox()[c ? `width` : `height`] : t[u]),
        Be(p ? (a / m) * d : (a / 100) * m)
      );
    if (
      ((s[c ? `width` : `height`] = d + (f ? o : i)),
      (h =
        (i !== `rem` && ~n.indexOf(`adius`)) ||
        (i === `em` && t.appendChild && !l)
          ? t
          : t.parentNode),
      _ && (h = (t.ownerSVGElement || {}).parentNode),
      (!h || h === vr || !h.appendChild) && (h = vr.body),
      (g = h._gsap),
      g && p && g.width && c && g.time === fn.time && !g.uncache)
    )
      return Be((a / g.width) * d);
    if (p && (n === `height` || n === `width`)) {
      var v = t.style[n];
      (t.style[n] = d + i), (m = t[u]), v ? (t.style[n] = v) : ci(t, n);
    } else
      (p || o === `%`) &&
        !di[ei(h, `display`)] &&
        (s.position = ei(t, `position`)),
        h === t && (s.position = `static`),
        h.appendChild(xr),
        (m = xr[u]),
        h.removeChild(xr),
        (s.position = `absolute`);
    return (
      c && p && ((g = Le(h)), (g.time = fn.time), (g.width = h[u])),
      Be(f ? (m * a) / d : m && a ? (d / m) * a : 0)
    );
  },
  pi = function (e, t, n, r) {
    var i;
    return (
      br || ri(),
      t in Nr &&
        t !== `transform` &&
        ((t = Nr[t]), ~t.indexOf(`,`) && (t = t.split(`,`)[0])),
      Tr[t] && t !== `transform`
        ? ((i = Ti(e, r)),
          (i =
            t === `transformOrigin`
              ? i.svg
                ? i.origin
                : Ei(ei(e, qr)) + ` ` + i.zOrigin + `px`
              : i[t]))
        : ((i = e.style[t]),
          (!i || i === `auto` || r || ~(i + ``).indexOf(`calc(`)) &&
            (i =
              (vi[t] && vi[t](e, t, n)) ||
              ei(e, t) ||
              Re(e, t) ||
              (t === `opacity` ? 1 : 0))),
      n && !~(i + ``).trim().indexOf(` `) ? fi(e, t, i, n) + n : i
    );
  },
  mi = function (e, t, n, r) {
    if (!n || n === `none`) {
      var i = ni(t, e, 1),
        a = i && ei(e, i, 1);
      a && a !== n
        ? ((t = i), (n = a))
        : t === `borderColor` && (n = ei(e, `borderTopColor`));
    }
    var o = new nr(this._pt, e.style, t, 0, 1, Xn),
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
        (r = ei(e, r.substring(4, r.indexOf(`)`)))),
      r === `auto` &&
        ((m = e.style[t]),
        (e.style[t] = r),
        (r = ei(e, t) || r),
        m ? (e.style[t] = m) : ci(e, t)),
      (l = [n, r]),
      un(l),
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
            y !== v && (f = fi(e, t, m, v) || 0),
            (o._pt = {
              _next: o._pt,
              p: _ || c === 1 ? _ : `,`,
              s: f,
              c: g - f,
              m: (p && p < 4) || t === `zIndex` ? Math.round : 0,
            }));
      o.c = s < r.length ? r.substring(s, r.length) : ``;
    } else o.r = t === `display` && r === `none` ? zr : Rr;
    return pe.test(r) && (o.e = 0), (this._pt = o), o;
  },
  hi = { top: `0%`, bottom: `100%`, left: `0%`, right: `100%`, center: `50%` },
  gi = function (e) {
    var t = e.split(` `),
      n = t[0],
      r = t[1] || `50%`;
    return (
      (n === `top` || n === `bottom` || r === `left` || r === `right`) &&
        ((e = n), (n = r), (r = e)),
      (t[0] = hi[n] || n),
      (t[1] = hi[r] || r),
      t.join(` `)
    );
  },
  _i = function (e, t) {
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
            Tr[o] && ((s = 1), (o = o === `transformOrigin` ? qr : Kr)),
            ci(n, o);
      s &&
        (ci(n, Kr),
        a &&
          (a.svg && n.removeAttribute(`transform`),
          (r.scale = r.rotate = r.translate = `none`),
          Ti(n, 1),
          (a.uncache = 1),
          Yr(r)));
    }
  },
  vi = {
    clearProps: function (e, t, n, r, i) {
      if (i.data !== `isFromStart`) {
        var a = (e._pt = new nr(e._pt, t, n, 0, 0, _i));
        return (a.u = r), (a.pr = -10), (a.tween = i), e._props.push(n), 1;
      }
    },
  },
  yi = [1, 0, 0, 1, 0, 0],
  bi = {},
  xi = function (e) {
    return e === `matrix(1, 0, 0, 1, 0, 0)` || e === `none` || !e;
  },
  Si = function (e) {
    var t = ei(e, Kr);
    return xi(t) ? yi : t.substr(7).match(ue).map(Be);
  },
  Ci = function (e, t) {
    var n = e._gsap || Le(e),
      r = e.style,
      i = Si(e),
      a,
      o,
      s,
      c;
    return n.svg && e.getAttribute(`transform`)
      ? ((s = e.transform.baseVal.consolidate().matrix),
        (i = [s.a, s.b, s.c, s.d, s.e, s.f]),
        i.join(`,`) === `1,0,0,1,0,0` ? yi : i)
      : (i === yi &&
          !e.offsetParent &&
          e !== yr &&
          !n.svg &&
          ((s = r.display),
          (r.display = `block`),
          (a = e.parentNode),
          (!a || (!e.offsetParent && !e.getBoundingClientRect().width)) &&
            ((c = 1), (o = e.nextElementSibling), yr.appendChild(e)),
          (i = Si(e)),
          s ? (r.display = s) : ci(e, `display`),
          c &&
            (o
              ? a.insertBefore(e, o)
              : a
              ? a.appendChild(e)
              : yr.removeChild(e))),
        t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i);
  },
  wi = function (e, t, n, r, i, a) {
    var o = e._gsap,
      s = i || Ci(e, !0),
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
      ? s !== yi &&
        (S = f * h - p * m) &&
        ((C = y * (h / S) + b * (-m / S) + (m * _ - h * g) / S),
        (w = y * (-p / S) + b * (f / S) - (f * _ - p * g) / S),
        (y = C),
        (b = w))
      : ((x = oi(e)),
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
      (e.style[qr] = `0px 0px`),
      a &&
        (li(a, o, `xOrigin`, c, y),
        li(a, o, `yOrigin`, l, b),
        li(a, o, `xOffset`, u, o.xOffset),
        li(a, o, `yOffset`, d, o.yOffset)),
      e.setAttribute(`data-svg-origin`, y + ` ` + b);
  },
  Ti = function (e, t) {
    var n = e._gsap || new En(e);
    if (`x` in n && !t && !n.uncache) return n;
    var r = e.style,
      i = n.scaleX < 0,
      a = `px`,
      o = `deg`,
      s = getComputedStyle(e),
      c = ei(e, qr) || `0`,
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
      A,
      j,
      M,
      N,
      P,
      F,
      I,
      ee,
      te,
      ne,
      re,
      L;
    return (
      (n.svg = !!(e.getCTM && si(e))),
      s.translate &&
        ((s.translate !== `none` ||
          s.scale !== `none` ||
          s.rotate !== `none`) &&
          (r[Kr] =
            (s.translate === `none`
              ? ``
              : `translate3d(` +
                (s.translate + ` 0 0`).split(` `).slice(0, 3).join(`, `) +
                `) `) +
            (s.rotate === `none` ? `` : `rotate(` + s.rotate + `) `) +
            (s.scale === `none`
              ? ``
              : `scale(` + s.scale.split(` `).join(`,`) + `) `) +
            (s[Kr] === `none` ? `` : s[Kr])),
        (r.scale = r.rotate = r.translate = `none`)),
      (S = Ci(e, n.svg)),
      n.svg &&
        (n.uncache
          ? ((P = e.getBBox()),
            (c = n.xOrigin - P.x + `px ` + (n.yOrigin - P.y) + `px`),
            (N = ``))
          : (N = !t && e.getAttribute(`data-svg-origin`)),
        wi(e, N || c, !!N || n.originIsAbsolute, n.smooth !== !1, S)),
      (b = n.xOrigin || 0),
      (x = n.yOrigin || 0),
      S !== yi &&
        ((E = S[0]),
        (D = S[1]),
        (k = S[2]),
        (A = S[3]),
        (l = j = S[4]),
        (u = M = S[5]),
        S.length === 6
          ? ((f = Math.sqrt(E * E + D * D)),
            (p = Math.sqrt(A * A + k * k)),
            (m = E || D ? Or(D, E) * Er : 0),
            (_ = k || A ? Or(k, A) * Er + m : 0),
            _ && (p *= Math.abs(Math.cos(_ * Dr))),
            n.svg && ((l -= b - (b * E + x * k)), (u -= x - (b * D + x * A))))
          : ((L = S[6]),
            (ne = S[7]),
            (I = S[8]),
            (ee = S[9]),
            (te = S[10]),
            (re = S[11]),
            (l = S[12]),
            (u = S[13]),
            (d = S[14]),
            (C = Or(L, te)),
            (h = C * Er),
            C &&
              ((w = Math.cos(-C)),
              (T = Math.sin(-C)),
              (N = j * w + I * T),
              (P = M * w + ee * T),
              (F = L * w + te * T),
              (I = j * -T + I * w),
              (ee = M * -T + ee * w),
              (te = L * -T + te * w),
              (re = ne * -T + re * w),
              (j = N),
              (M = P),
              (L = F)),
            (C = Or(-k, te)),
            (g = C * Er),
            C &&
              ((w = Math.cos(-C)),
              (T = Math.sin(-C)),
              (N = E * w - I * T),
              (P = D * w - ee * T),
              (F = k * w - te * T),
              (re = A * T + re * w),
              (E = N),
              (D = P),
              (k = F)),
            (C = Or(D, E)),
            (m = C * Er),
            C &&
              ((w = Math.cos(C)),
              (T = Math.sin(C)),
              (N = E * w + D * T),
              (P = j * w + M * T),
              (D = D * w - E * T),
              (M = M * w - j * T),
              (E = N),
              (j = P)),
            h &&
              Math.abs(h) + Math.abs(m) > 359.9 &&
              ((h = m = 0), (g = 180 - g)),
            (f = Be(Math.sqrt(E * E + D * D + k * k))),
            (p = Be(Math.sqrt(M * M + L * L))),
            (C = Or(j, M)),
            (_ = Math.abs(C) > 2e-4 ? C * Er : 0),
            (y = re ? 1 / (re < 0 ? -re : re) : 0)),
        n.svg &&
          ((N = e.getAttribute(`transform`)),
          (n.forceCSS = e.setAttribute(`transform`, ``) || !xi(ei(e, Kr))),
          N && e.setAttribute(`transform`, N))),
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
      (n.scaleX = Be(f)),
      (n.scaleY = Be(p)),
      (n.rotation = Be(m) + o),
      (n.rotationX = Be(h) + o),
      (n.rotationY = Be(g) + o),
      (n.skewX = _ + o),
      (n.skewY = v + o),
      (n.transformPerspective = y + a),
      (n.zOrigin = parseFloat(c.split(` `)[2]) || (!t && n.zOrigin) || 0) &&
        (r[qr] = Ei(c)),
      (n.xOffset = n.yOffset = 0),
      (n.force3D = O.force3D),
      (n.renderTransform = n.svg ? Ni : Qr ? Mi : Oi),
      (n.uncache = 0),
      n
    );
  },
  Ei = function (e) {
    return (e = e.split(` `))[0] + ` ` + e[1];
  },
  Di = function (e, t, n) {
    var r = kt(t);
    return Be(parseFloat(t) + parseFloat(fi(e, `x`, n + `px`, r))) + r;
  },
  Oi = function (e, t) {
    (t.z = `0px`),
      (t.rotationY = t.rotationX = `0deg`),
      (t.force3D = 0),
      Mi(e, t);
  },
  ki = `0deg`,
  Ai = `0px`,
  ji = `) `,
  Mi = function (e, t) {
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
    if (v && (u !== ki || l !== ki)) {
      var x = parseFloat(l) * Dr,
        S = Math.sin(x),
        C = Math.cos(x),
        w;
      (x = parseFloat(u) * Dr),
        (w = Math.cos(x)),
        (a = Di(_, a, S * w * -v)),
        (o = Di(_, o, -Math.sin(x) * -v)),
        (s = Di(_, s, C * w * -v + v));
    }
    h !== Ai && (y += `perspective(` + h + ji),
      (r || i) && (y += `translate(` + r + `%, ` + i + `%) `),
      (b || a !== Ai || o !== Ai || s !== Ai) &&
        (y +=
          s !== Ai || b
            ? `translate3d(` + a + `, ` + o + `, ` + s + `) `
            : `translate(` + a + `, ` + o + ji),
      c !== ki && (y += `rotate(` + c + ji),
      l !== ki && (y += `rotateY(` + l + ji),
      u !== ki && (y += `rotateX(` + u + ji),
      (d !== ki || f !== ki) && (y += `skew(` + d + `, ` + f + ji),
      (p !== 1 || m !== 1) && (y += `scale(` + p + `, ` + m + ji),
      (_.style[Kr] = y || `translate(0, 0)`);
  },
  Ni = function (e, t) {
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
        ? ((s *= Dr),
          (c *= Dr),
          (b = Math.cos(s) * u),
          (x = Math.sin(s) * u),
          (S = Math.sin(s - c) * -d),
          (C = Math.cos(s - c) * d),
          c &&
            ((l *= Dr),
            (w = Math.tan(c - l)),
            (w = Math.sqrt(1 + w * w)),
            (S *= w),
            (C *= w),
            l &&
              ((w = Math.tan(l)),
              (w = Math.sqrt(1 + w * w)),
              (b *= w),
              (x *= w))),
          (b = Be(b)),
          (x = Be(x)),
          (S = Be(S)),
          (C = Be(C)))
        : ((b = u), (C = d), (x = S = 0)),
      ((v && !~(a + ``).indexOf(`px`)) || (y && !~(o + ``).indexOf(`px`))) &&
        ((v = fi(f, `x`, a, `px`)), (y = fi(f, `y`, o, `px`))),
      (p || m || h || g) &&
        ((v = Be(v + p - (p * b + m * S) + h)),
        (y = Be(y + m - (p * x + m * C) + g))),
      (r || i) &&
        ((w = f.getBBox()),
        (v = Be(v + (r / 100) * w.width)),
        (y = Be(y + (i / 100) * w.height))),
      (w =
        `matrix(` + b + `,` + x + `,` + S + `,` + C + `,` + v + `,` + y + `)`),
      f.setAttribute(`transform`, w),
      _ && (f.style[Kr] = w);
  },
  Pi = function (e, t, n, r, i) {
    var a = 360,
      o = L(i),
      s = parseFloat(i) * (o && ~i.indexOf(`rad`) ? Er : 1) - r,
      c = r + s + `deg`,
      l,
      u;
    return (
      o &&
        ((l = i.split(`_`)[1]),
        l === `short` && ((s %= a), s !== s % (a / 2) && (s += s < 0 ? a : -a)),
        l === `cw` && s < 0
          ? (s = ((s + a * kr) % a) - ~~(s / a) * a)
          : l === `ccw` && s > 0 && (s = ((s - a * kr) % a) - ~~(s / a) * a)),
      (e._pt = u = new nr(e._pt, t, n, r, s, Fr)),
      (u.e = c),
      (u.u = `deg`),
      e._props.push(n),
      u
    );
  },
  Fi = function (e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  },
  Ii = function (e, t, n) {
    var r = Fi({}, n._gsap),
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
        (a[Kr] = t),
        (o = Ti(n, 1)),
        ci(n, Kr),
        n.setAttribute(`transform`, c))
      : ((c = getComputedStyle(n)[Kr]),
        (a[Kr] = t),
        (o = Ti(n, 1)),
        (a[Kr] = c)),
    Tr))
      (c = r[s]),
        (l = o[s]),
        c !== l &&
          i.indexOf(s) < 0 &&
          ((f = kt(c)),
          (p = kt(l)),
          (u = f === p ? parseFloat(c) : fi(n, s, c, p)),
          (d = parseFloat(l)),
          (e._pt = new nr(e._pt, o, s, u, d - u, Pr)),
          (e._pt.u = p || 0),
          e._props.push(s));
    Fi(o, r);
  };
ze(`padding,margin,Width,Radius`, function (e, t) {
  var n = `Top`,
    r = `Right`,
    i = `Bottom`,
    a = `Left`,
    o = (t < 3 ? [n, r, i, a] : [n + a, n + r, i + r, i + a]).map(function (n) {
      return t < 2 ? e + n : `border` + n + e;
    });
  vi[t > 1 ? `border` + e : e] = function (e, t, n, r, i) {
    var a, s;
    if (arguments.length < 4)
      return (
        (a = o.map(function (t) {
          return pi(e, t, n);
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
var Li = {
  name: `css`,
  register: ri,
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
    for (m in (br || ri(),
    (this.styles = this.styles || Zr(e)),
    (C = this.styles.props),
    (this.tween = n),
    t))
      if (m !== `autoRound` && ((l = t[m]), !(je[m] && Mn(m, t, n, r, e, i)))) {
        if (
          ((f = typeof l),
          (p = vi[m]),
          f === `function` && ((l = l.call(n, r, e, i)), (f = typeof l)),
          f === `string` && ~l.indexOf(`random(`) && (l = qt(l)),
          p)
        )
          p(this, e, m, l, n) && (S = 1);
        else if (m.substr(0, 2) === `--`)
          (c = (getComputedStyle(e).getPropertyValue(m) + ``).trim()),
            (l += ``),
            (cn.lastIndex = 0),
            cn.test(c) || ((h = kt(c)), (g = kt(l))),
            g ? h !== g && (c = fi(e, m, c, g) + g) : h && (l += h),
            this.add(o, `setProperty`, c, l, r, i, 0, 0, m),
            a.push(m),
            C.push(m, 0, o[m]);
        else if (f !== `undefined`) {
          if (
            (s && m in s
              ? ((c = typeof s[m] == `function` ? s[m].call(n, r, e, i) : s[m]),
                L(c) && ~c.indexOf(`random(`) && (c = qt(c)),
                kt(c + ``) ||
                  c === `auto` ||
                  (c += O.units[m] || kt(pi(e, m)) || ``),
                (c + ``).charAt(1) === `=` && (c = pi(e, m)))
              : (c = pi(e, m)),
            (d = parseFloat(c)),
            (_ = f === `string` && l.charAt(1) === `=` && l.substr(0, 2)),
            _ && (l = l.substr(2)),
            (u = parseFloat(l)),
            m in Nr &&
              (m === `autoAlpha` &&
                (d === 1 && pi(e, `visibility`) === `hidden` && u && (d = 0),
                C.push(`visibility`, 0, o.visibility),
                li(
                  this,
                  o,
                  `visibility`,
                  d ? `inherit` : `hidden`,
                  u ? `inherit` : `hidden`,
                  !u
                )),
              m !== `scale` &&
                m !== `transform` &&
                ((m = Nr[m]), ~m.indexOf(`,`) && (m = m.split(`,`)[0]))),
            (v = m in Tr),
            v)
          ) {
            if (
              (this.styles.save(m),
              f === `string` &&
                l.substring(0, 6) === `var(--` &&
                ((l = ei(e, l.substring(4, l.indexOf(`)`)))),
                (u = parseFloat(l))),
              y ||
                ((b = e._gsap),
                (b.renderTransform && !t.parseTransform) ||
                  Ti(e, t.parseTransform),
                (x = t.smoothOrigin !== !1 && b.smooth),
                (y = this._pt =
                  new nr(this._pt, o, Kr, 0, 1, b.renderTransform, b, 0, -1)),
                (y.dep = 1)),
              m === `scale`)
            )
              (this._pt = new nr(
                this._pt,
                b,
                `scaleY`,
                b.scaleY,
                (_ ? He(b.scaleY, _ + u) : u) - b.scaleY || 0,
                Pr
              )),
                (this._pt.u = 0),
                a.push(`scaleY`, m),
                (m += `X`);
            else if (m === `transformOrigin`) {
              C.push(qr, 0, o[qr]),
                (l = gi(l)),
                b.svg
                  ? wi(e, l, 0, x, 0, this)
                  : ((g = parseFloat(l.split(` `)[2]) || 0),
                    g !== b.zOrigin && li(this, b, `zOrigin`, b.zOrigin, g),
                    li(this, o, m, Ei(c), Ei(l)));
              continue;
            } else if (m === `svgOrigin`) {
              wi(e, l, 1, x, 0, this);
              continue;
            } else if (m in bi) {
              Pi(this, b, m, d, _ ? He(d, _ + l) : l);
              continue;
            } else if (m === `smoothOrigin`) {
              li(this, b, `smooth`, b.smooth, l);
              continue;
            } else if (m === `force3D`) {
              b[m] = l;
              continue;
            } else if (m === `transform`) {
              Ii(this, l, e);
              continue;
            }
          } else m in o || (m = ni(m) || m);
          if (v || ((u || u === 0) && (d || d === 0) && !Mr.test(l) && m in o))
            (h = (c + ``).substr((d + ``).length)),
              (u ||= 0),
              (g = kt(l) || (m in O.units ? O.units[m] : h)),
              h !== g && (d = fi(e, m, c, g)),
              (this._pt = new nr(
                this._pt,
                v ? b : o,
                m,
                d,
                (_ ? He(d, _ + u) : u) - d,
                !v && (g === `px` || m === `zIndex`) && t.autoRound !== !1
                  ? Lr
                  : Pr
              )),
              (this._pt.u = g || 0),
              h !== g && g !== `%` && ((this._pt.b = c), (this._pt.r = Ir));
          else if (m in o) mi.call(this, e, m, c, _ ? _ + l : l);
          else if (m in e) this.add(e, m, c || e[m], _ ? _ + l : l, r, i);
          else if (m !== `parseTransform`) {
            xe(m, l);
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
    S && tr(this);
  },
  render: function (e, t) {
    if (t.tween._time || !Cr())
      for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next);
    else t.styles.revert();
  },
  get: pi,
  aliases: Nr,
  getSetter: function (e, t, n) {
    var r = Nr[t];
    return (
      r && r.indexOf(`,`) < 0 && (t = r),
      t in Tr && t !== qr && (e._gsap.x || pi(e, `x`))
        ? n && Sr === n
          ? t === `scale`
            ? Ur
            : Hr
          : (Sr = n || {}) && (t === `scale` ? Wr : Gr)
        : e.style && !ie(e.style[t])
        ? Br
        : ~t.indexOf(`-`)
        ? Vr
        : qn(e, t)
    );
  },
  core: { _removeProperty: ci, _getMatrix: Ci },
};
(gr.utils.checkPrefix = ni),
  (gr.core.getStyleSaver = Zr),
  (function (e, t, n, r) {
    var i = ze(e + `,` + t + `,` + n, function (e) {
      Tr[e] = 1;
    });
    ze(t, function (e) {
      (O.units[e] = `deg`), (bi[e] = 1);
    }),
      (Nr[i[13]] = e + `,` + t),
      ze(r, function (e) {
        var t = e.split(`:`);
        Nr[t[1]] = i[t[0]];
      });
  })(
    `x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,
    `rotation,rotationX,rotationY,skewX,skewY`,
    `transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,
    `0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`
  ),
  ze(
    `x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,
    function (e) {
      O.units[e] = `px`;
    }
  ),
  gr.registerPlugin(Li);
var Ri = gr.registerPlugin(Li) || gr;
Ri.core.Tween;
/*!
 * SplitText 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle
 */
var zi,
  Bi,
  Vi,
  Hi = () => Vi || ia.register(window.gsap),
  Ui = typeof Intl < `u` ? new Intl.Segmenter() : 0,
  Wi = (e) =>
    typeof e == `string`
      ? Wi(document.querySelectorAll(e))
      : `length` in e
      ? Array.from(e)
      : [e],
  Gi = (e) => Wi(e).filter((e) => e instanceof HTMLElement),
  Ki = [],
  qi = function () {},
  Ji = /\s+/g,
  Yi = RegExp(
    `\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.`,
    `gu`
  ),
  Xi = { left: 0, top: 0, width: 0, height: 0 },
  Zi = (e, t) => {
    if (t) {
      let n = new Set(e.join(``).match(t) || Ki),
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
  Qi = (e) =>
    window.getComputedStyle(e).display === `inline` &&
    (e.style.display = `inline-block`),
  $i = (e, t, n) =>
    t.insertBefore(typeof e == `string` ? document.createTextNode(e) : e, n),
  ea = (e, t, n) => {
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
  ta = (e, t, n, r) => {
    let i = ea(`line`, n, r),
      a = window.getComputedStyle(e).textAlign || `left`;
    return (n, r) => {
      let o = i(``);
      for (o.style.textAlign = a, e.insertBefore(o, t[n]); n < r; n++)
        o.appendChild(t[n]);
      o.normalize();
    };
  },
  na = (e, t, n, r, i, a, o, s, c, l) => {
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
      A,
      j,
      M,
      N,
      P,
      F,
      I,
      ee,
      te;
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
          F = w.textContent || ``,
            m
              ? (F = F.replace(Ji, ` `))
              : v &&
                (F = F.replace(
                  /\n/g,
                  S +
                    `
`
                )),
            h && (F = h(F, e)),
            w.textContent = F,
            T = S || C ? F.split(C || S) : F.match(s) || Ki,
            ee = T[T.length - 1],
            O = x ? ee.slice(-1) === ` ` : !ee,
            ee || T.pop(),
            _ = g,
            D = x ? T[0].charAt(0) === ` ` : !T[0],
            D && $i(` `, e, w),
            T[0] || T.shift(),
            Zi(T, c),
            (a && l) || (w.textContent = ``),
            k = 1;
          k <= T.length;
          k++
        )
          if (
            ((I = T[k - 1]),
            !m &&
              v &&
              I.charAt(0) ===
                `
` &&
              ((u = w.previousSibling) == null || u.remove(),
              $i(document.createElement(`br`), e, w),
              (I = I.slice(1))),
            !m && I === ``)
          )
            $i(S, e, w);
          else if (I === ` `) e.insertBefore(document.createTextNode(` `), w);
          else {
            if (
              (x && I.charAt(0) === ` ` && $i(` `, e, w),
              y && k === 1 && !D && b.indexOf(y.parentNode) > -1
                ? ((E = b[b.length - 1]),
                  E.appendChild(document.createTextNode(r ? `` : I)))
                : ((E = n(r ? `` : I)),
                  $i(E, e, w),
                  y && k === 1 && !D && E.insertBefore(y, E.firstChild)),
              r)
            )
              for (
                j = Ui
                  ? Zi(
                      [...Ui.segment(I)].map((e) => e.segment),
                      c
                    )
                  : I.match(s) || Ki,
                  te = 0;
                te < j.length;
                te++
              )
                E.appendChild(
                  j[te] === ` ` ? document.createTextNode(` `) : r(j[te])
                );
            if (a && l) {
              if (
                ((F = w.textContent = F.substring(I.length + 1, F.length)),
                (A = E.getBoundingClientRect()),
                A.top > _.top && A.left <= _.left)
              ) {
                for (M = e.cloneNode(), N = e.childNodes[0]; N && N !== E; )
                  (P = N), (N = N.nextSibling), M.appendChild(P);
                e.parentNode.insertBefore(M, e), i && Qi(M);
              }
              _ = A;
            }
            (k < T.length || O) &&
              $i(
                k >= T.length ? ` ` : x && I.slice(-1) === ` ` ? ` ` + S : S,
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
            : (na(w, t, n, r, i, a, o, s, c, !0), (y = 0)),
          i && Qi(w));
  },
  ra = class e {
    constructor(e, t) {
      (this.isSplit = !1),
        Hi(),
        (this.elements = Gi(e)),
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
        qi(this),
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
        m = p ? RegExp(p.source + `|` + Yi.source, `gu`) : Yi,
        h = !!e.ignore && Gi(e.ignore),
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
              _ = u ? ea(`char`, e, o) : null,
              v = ea(`word`, e, s),
              y,
              b,
              x,
              S;
            if ((na(t, e, v, _, f, r && (l || f), h, m, p, !1), l)) {
              let n = Wi(t.childNodes),
                r = ta(t, n, e, c),
                i,
                a = [],
                o = 0,
                s = n.map((e) =>
                  e.nodeType === 1 ? e.getBoundingClientRect() : Xi
                ),
                l = Xi;
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
        Bi &&
          (o
            ? Bi.addEventListener(`loadingdone`, this._split)
            : Bi.status === `loading` &&
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
        Bi?.removeEventListener(`loadingdone`, this._split),
        r && ((this._data.animTime = r.totalTime()), r.revert()),
        (t = (e = this.vars).onRevert) == null || t.call(e, this),
        this
      );
    }
    static create(t, n) {
      return new e(t, n);
    }
    static register(e) {
      (zi = zi || e || window.gsap),
        zi && ((Wi = zi.utils.toArray), (qi = zi.core.context || qi)),
        !Vi && window.innerWidth > 0 && ((Bi = document.fonts), (Vi = !0));
    }
  };
ra.version = `3.13.0`;
var ia = ra,
  aa = class {
    constructor(e, t = {}) {
      (this.gsap_ctx = null), (this.config = e), (this.callbacks = t);
    }
    async init() {
      await document.fonts.ready,
        (this.gsap_ctx = Ri.context(() => {
          this.createArrowTimeline(),
            this.createIntroAnimation(),
            this.createScrollTriggerAnimation();
        }));
    }
    createIntroAnimation() {
      let e = document.querySelector(`.hero-anim-sections__arrow-line`),
        t = parseFloat(getComputedStyle(e).getPropertyValue(`--len`)),
        n = document
          .querySelector(`.hero-anim-sections__arrow-head--right`)
          .getTotalLength(),
        r = document
          .querySelector(`.hero-anim-sections__arrow-head--left`)
          .getTotalLength();
      (this.soulTextSplit = new ia(`.hero-area__text--soul`, {
        type: `chars`,
      })),
        Ri.timeline()
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
            { strokeDashoffset: n, duration: 0.5, ease: `expo.inOut` },
            `>-.3`
          )
          .from(
            `.hero-anim-sections__arrow-head--left`,
            { strokeDashoffset: r, duration: 0.5, ease: `expo.inOut` },
            `<`
          )
          .add(() => this.arrow_loop_tl.play(), `+=2`);
    }
    createArrowTimeline() {
      this.arrow_loop_tl = Ri.timeline({ paused: !0, repeat: -1, yoyo: !0 })
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
      let e = new ia(`.meaning-area__text`, { type: `words,chars` }).chars;
      Ri.timeline({
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
  oa = class {
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
  sa = class {
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
        (this.resizeDebouncer = new oa(250)),
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
        (this.scrollAnimation = new aa(this.CONFIG, {
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
  ca = class {
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
function la(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      `value` in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function ua(e, t, n) {
  return t && la(e.prototype, t), n && la(e, n), e;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
var da,
  fa,
  pa,
  ma,
  ha,
  ga,
  _a,
  va,
  ya,
  ba,
  xa,
  Sa,
  Ca,
  wa = function () {
    return (
      da ||
      (typeof window < `u` && (da = window.gsap) && da.registerPlugin && da)
    );
  },
  Ta = 1,
  Ea = [],
  J = [],
  Da = [],
  Oa = Date.now,
  ka = function (e, t) {
    return t;
  },
  Aa = function () {
    var e = ya.core,
      t = e.bridge || {},
      n = e._scrollers,
      r = e._proxies;
    n.push.apply(n, J),
      r.push.apply(r, Da),
      (J = n),
      (Da = r),
      (ka = function (e, n) {
        return t[e](n);
      });
  },
  ja = function (e, t) {
    return ~Da.indexOf(e) && Da[Da.indexOf(e) + 1][t];
  },
  Ma = function (e) {
    return !!~ba.indexOf(e);
  },
  Na = function (e, t, n, r, i) {
    return e.addEventListener(t, n, { passive: r !== !1, capture: !!i });
  },
  Pa = function (e, t, n, r) {
    return e.removeEventListener(t, n, !!r);
  },
  Fa = `scrollLeft`,
  Ia = `scrollTop`,
  La = function () {
    return (xa && xa.isPressed) || J.cache++;
  },
  Ra = function (e, t) {
    var n = function n(r) {
      if (r || r === 0) {
        Ta && (pa.history.scrollRestoration = `manual`);
        var i = xa && xa.isPressed;
        (r = n.v = Math.round(r) || (xa && xa.iOS ? 1 : 0)),
          e(r),
          (n.cacheID = J.cache),
          i && ka(`ss`, r);
      } else
        (t || J.cache !== n.cacheID || ka(`ref`)) &&
          ((n.cacheID = J.cache), (n.v = e()));
      return n.v + n.offset;
    };
    return (n.offset = 0), e && n;
  },
  za = {
    s: Fa,
    p: `left`,
    p2: `Left`,
    os: `right`,
    os2: `Right`,
    d: `width`,
    d2: `Width`,
    a: `x`,
    sc: Ra(function (e) {
      return arguments.length
        ? pa.scrollTo(e, Ba.sc())
        : pa.pageXOffset || ma[Fa] || ha[Fa] || ga[Fa] || 0;
    }),
  },
  Ba = {
    s: Ia,
    p: `top`,
    p2: `Top`,
    os: `bottom`,
    os2: `Bottom`,
    d: `height`,
    d2: `Height`,
    a: `y`,
    op: za,
    sc: Ra(function (e) {
      return arguments.length
        ? pa.scrollTo(za.sc(), e)
        : pa.pageYOffset || ma[Ia] || ha[Ia] || ga[Ia] || 0;
    }),
  },
  Va = function (e, t) {
    return (
      ((t && t._ctx && t._ctx.selector) || da.utils.toArray)(e)[0] ||
      (typeof e == `string` && da.config().nullTargetWarn !== !1
        ? console.warn(`Element not found:`, e)
        : null)
    );
  },
  Ha = function (e, t) {
    for (var n = t.length; n--; ) if (t[n] === e || t[n].contains(e)) return !0;
    return !1;
  },
  Ua = function (e, t) {
    var n = t.s,
      r = t.sc;
    Ma(e) && (e = ma.scrollingElement || ha);
    var i = J.indexOf(e),
      a = r === Ba.sc ? 1 : 2;
    !~i && (i = J.push(e) - 1), J[i + a] || Na(e, `scroll`, La);
    var o = J[i + a],
      s =
        o ||
        (J[i + a] =
          Ra(ja(e, n), !0) ||
          (Ma(e)
            ? r
            : Ra(function (t) {
                return arguments.length ? (e[n] = t) : e[n];
              })));
    return (
      (s.target = e),
      o || (s.smooth = da.getProperty(e, `scrollBehavior`) === `smooth`),
      s
    );
  },
  Wa = function (e, t, n) {
    var r = e,
      i = e,
      a = Oa(),
      o = a,
      s = t || 50,
      c = Math.max(500, s * 3),
      l = function (e, t) {
        var c = Oa();
        t || c - a > s
          ? ((i = r), (r = e), (o = a), (a = c))
          : n
          ? (r += e)
          : (r = i + ((e - i) / (c - o)) * (a - o));
      };
    return {
      update: l,
      reset: function () {
        (i = r = n ? 0 : r), (o = a = 0);
      },
      getVelocity: function (e) {
        var t = o,
          s = i,
          u = Oa();
        return (
          (e || e === 0) && e !== r && l(e),
          a === o || u - o > c
            ? 0
            : ((r + (n ? s : -s)) / ((n ? u : a) - t)) * 1e3
        );
      },
    };
  },
  Ga = function (e, t) {
    return (
      t && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  },
  Ka = function (e) {
    var t = Math.max.apply(Math, e),
      n = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(n) ? t : n;
  },
  qa = function () {
    (ya = da.core.globals().ScrollTrigger), ya && ya.core && Aa();
  },
  Ja = function (e) {
    return (
      (da = e || wa()),
      !fa &&
        da &&
        typeof document < `u` &&
        document.body &&
        ((pa = window),
        (ma = document),
        (ha = ma.documentElement),
        (ga = ma.body),
        (ba = [pa, ma, ha, ga]),
        da.utils.clamp,
        (Ca = da.core.context || function () {}),
        (va = `onpointerenter` in ga ? `pointer` : `mouse`),
        (_a = Ya.isTouch =
          pa.matchMedia &&
          pa.matchMedia(`(hover: none), (pointer: coarse)`).matches
            ? 1
            : `ontouchstart` in pa ||
              navigator.maxTouchPoints > 0 ||
              navigator.msMaxTouchPoints > 0
            ? 2
            : 0),
        (Sa = Ya.eventTypes =
          (
            `ontouchstart` in ha
              ? `touchstart,touchmove,touchcancel,touchend`
              : `onpointerdown` in ha
              ? `pointerdown,pointermove,pointercancel,pointerup`
              : `mousedown,mousemove,mouseup,mouseup`
          ).split(`,`)),
        setTimeout(function () {
          return (Ta = 0);
        }, 500),
        qa(),
        (fa = 1)),
      fa
    );
  };
(za.op = Ba), (J.cache = 0);
var Ya = (function () {
  function e(e) {
    this.init(e);
  }
  var t = e.prototype;
  return (
    (t.init = function (e) {
      fa || Ja(da) || console.warn(`Please gsap.registerPlugin(Observer)`),
        ya || qa();
      var t = e.tolerance,
        n = e.dragMinimum,
        r = e.type,
        i = e.target,
        a = e.lineHeight,
        o = e.debounce,
        s = e.preventDefault,
        c = e.onStop,
        l = e.onStopDelay,
        u = e.ignore,
        d = e.wheelSpeed,
        f = e.event,
        p = e.onDragStart,
        m = e.onDragEnd,
        h = e.onDrag,
        g = e.onPress,
        _ = e.onRelease,
        v = e.onRight,
        y = e.onLeft,
        b = e.onUp,
        x = e.onDown,
        S = e.onChangeX,
        C = e.onChangeY,
        w = e.onChange,
        T = e.onToggleX,
        E = e.onToggleY,
        D = e.onHover,
        O = e.onHoverEnd,
        k = e.onMove,
        A = e.ignoreCheck,
        j = e.isNormalizer,
        M = e.onGestureStart,
        N = e.onGestureEnd,
        P = e.onWheel,
        F = e.onEnable,
        I = e.onDisable,
        ee = e.onClick,
        te = e.scrollSpeed,
        ne = e.capture,
        re = e.allowClicks,
        L = e.lockAxis,
        R = e.onLockAxis;
      (this.target = i = Va(i) || ha),
        (this.vars = e),
        (u &&= da.utils.toArray(u)),
        (t ||= 1e-9),
        (n ||= 0),
        (d ||= 1),
        (te ||= 1),
        (r ||= `wheel,touch,pointer`),
        (o = o !== !1),
        (a ||= parseFloat(pa.getComputedStyle(ga).lineHeight) || 22);
      var z,
        ie,
        ae,
        oe,
        B,
        se,
        ce,
        V = this,
        le = 0,
        ue = 0,
        de = e.passive || (!s && e.passive !== !1),
        fe = Ua(i, za),
        pe = Ua(i, Ba),
        me = fe(),
        he = pe(),
        ge =
          ~r.indexOf(`touch`) &&
          !~r.indexOf(`pointer`) &&
          Sa[0] === `pointerdown`,
        H = Ma(i),
        U = i.ownerDocument || ma,
        _e = [0, 0, 0],
        W = [0, 0, 0],
        ve = 0,
        ye = function () {
          return (ve = Oa());
        },
        be = function (e, t) {
          return (
            ((V.event = e) && u && Ha(e.target, u)) ||
            (t && ge && e.pointerType !== `touch`) ||
            (A && A(e, t))
          );
        },
        xe = function () {
          V._vx.reset(), V._vy.reset(), ie.pause(), c && c(V);
        },
        Se = function () {
          var e = (V.deltaX = Ka(_e)),
            n = (V.deltaY = Ka(W)),
            r = Math.abs(e) >= t,
            i = Math.abs(n) >= t;
          w && (r || i) && w(V, e, n, _e, W),
            r &&
              (v && V.deltaX > 0 && v(V),
              y && V.deltaX < 0 && y(V),
              S && S(V),
              T && V.deltaX < 0 != le < 0 && T(V),
              (le = V.deltaX),
              (_e[0] = _e[1] = _e[2] = 0)),
            i &&
              (x && V.deltaY > 0 && x(V),
              b && V.deltaY < 0 && b(V),
              C && C(V),
              E && V.deltaY < 0 != ue < 0 && E(V),
              (ue = V.deltaY),
              (W[0] = W[1] = W[2] = 0)),
            (oe || ae) &&
              (k && k(V),
              (ae &&= (p && ae === 1 && p(V), h && h(V), 0)),
              (oe = !1)),
            se && !(se = !1) && R && R(V),
            (B &&= (P(V), !1)),
            (z = 0);
        },
        Ce = function (e, t, n) {
          (_e[n] += e),
            (W[n] += t),
            V._vx.update(e),
            V._vy.update(t),
            o ? (z ||= requestAnimationFrame(Se)) : Se();
        },
        we = function (e, t) {
          L &&
            !ce &&
            ((V.axis = ce = Math.abs(e) > Math.abs(t) ? `x` : `y`), (se = !0)),
            ce !== `y` && ((_e[2] += e), V._vx.update(e, !0)),
            ce !== `x` && ((W[2] += t), V._vy.update(t, !0)),
            o ? (z ||= requestAnimationFrame(Se)) : Se();
        },
        Te = function (e) {
          if (!be(e, 1)) {
            e = Ga(e, s);
            var t = e.clientX,
              r = e.clientY,
              i = t - V.x,
              a = r - V.y,
              o = V.isDragging;
            (V.x = t),
              (V.y = r),
              (o ||
                ((i || a) &&
                  (Math.abs(V.startX - t) >= n ||
                    Math.abs(V.startY - r) >= n))) &&
                ((ae = o ? 2 : 1), o || (V.isDragging = !0), we(i, a));
          }
        },
        Ee = (V.onPress = function (e) {
          be(e, 1) ||
            (e && e.button) ||
            ((V.axis = ce = null),
            ie.pause(),
            (V.isPressed = !0),
            (e = Ga(e)),
            (le = ue = 0),
            (V.startX = V.x = e.clientX),
            (V.startY = V.y = e.clientY),
            V._vx.reset(),
            V._vy.reset(),
            Na(j ? i : U, Sa[1], Te, de, !0),
            (V.deltaX = V.deltaY = 0),
            g && g(V));
        }),
        De = (V.onRelease = function (e) {
          if (!be(e, 1)) {
            Pa(j ? i : U, Sa[1], Te, !0);
            var t = !isNaN(V.y - V.startY),
              n = V.isDragging,
              r =
                n &&
                (Math.abs(V.x - V.startX) > 3 || Math.abs(V.y - V.startY) > 3),
              a = Ga(e);
            !r &&
              t &&
              (V._vx.reset(),
              V._vy.reset(),
              s &&
                re &&
                da.delayedCall(0.08, function () {
                  if (Oa() - ve > 300 && !e.defaultPrevented) {
                    if (e.target.click) e.target.click();
                    else if (U.createEvent) {
                      var t = U.createEvent(`MouseEvents`);
                      t.initMouseEvent(
                        `click`,
                        !0,
                        !0,
                        pa,
                        1,
                        a.screenX,
                        a.screenY,
                        a.clientX,
                        a.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        e.target.dispatchEvent(t);
                    }
                  }
                })),
              (V.isDragging = V.isGesturing = V.isPressed = !1),
              c && n && !j && ie.restart(!0),
              ae && Se(),
              m && n && m(V),
              _ && _(V, r);
          }
        }),
        G = function (e) {
          return (
            e.touches &&
            e.touches.length > 1 &&
            (V.isGesturing = !0) &&
            M(e, V.isDragging)
          );
        },
        Oe = function () {
          return (V.isGesturing = !1) || N(V);
        },
        ke = function (e) {
          if (!be(e)) {
            var t = fe(),
              n = pe();
            Ce((t - me) * te, (n - he) * te, 1),
              (me = t),
              (he = n),
              c && ie.restart(!0);
          }
        },
        Ae = function (e) {
          if (!be(e)) {
            (e = Ga(e, s)), P && (B = !0);
            var t =
              (e.deltaMode === 1 ? a : e.deltaMode === 2 ? pa.innerHeight : 1) *
              d;
            Ce(e.deltaX * t, e.deltaY * t, 0), c && !j && ie.restart(!0);
          }
        },
        je = function (e) {
          if (!be(e)) {
            var t = e.clientX,
              n = e.clientY,
              r = t - V.x,
              i = n - V.y;
            (V.x = t),
              (V.y = n),
              (oe = !0),
              c && ie.restart(!0),
              (r || i) && we(r, i);
          }
        },
        Me = function (e) {
          (V.event = e), D(V);
        },
        Ne = function (e) {
          (V.event = e), O(V);
        },
        Pe = function (e) {
          return be(e) || (Ga(e, s) && ee(V));
        };
      (ie = V._dc = da.delayedCall(l || 0.25, xe).pause()),
        (V.deltaX = V.deltaY = 0),
        (V._vx = Wa(0, 50, !0)),
        (V._vy = Wa(0, 50, !0)),
        (V.scrollX = fe),
        (V.scrollY = pe),
        (V.isDragging = V.isGesturing = V.isPressed = !1),
        Ca(this),
        (V.enable = function (e) {
          return (
            V.isEnabled ||
              (Na(H ? U : i, `scroll`, La),
              r.indexOf(`scroll`) >= 0 && Na(H ? U : i, `scroll`, ke, de, ne),
              r.indexOf(`wheel`) >= 0 && Na(i, `wheel`, Ae, de, ne),
              ((r.indexOf(`touch`) >= 0 && _a) || r.indexOf(`pointer`) >= 0) &&
                (Na(i, Sa[0], Ee, de, ne),
                Na(U, Sa[2], De),
                Na(U, Sa[3], De),
                re && Na(i, `click`, ye, !0, !0),
                ee && Na(i, `click`, Pe),
                M && Na(U, `gesturestart`, G),
                N && Na(U, `gestureend`, Oe),
                D && Na(i, va + `enter`, Me),
                O && Na(i, va + `leave`, Ne),
                k && Na(i, va + `move`, je)),
              (V.isEnabled = !0),
              (V.isDragging = V.isGesturing = V.isPressed = oe = ae = !1),
              V._vx.reset(),
              V._vy.reset(),
              (me = fe()),
              (he = pe()),
              e && e.type && Ee(e),
              F && F(V)),
            V
          );
        }),
        (V.disable = function () {
          V.isEnabled &&
            (Ea.filter(function (e) {
              return e !== V && Ma(e.target);
            }).length || Pa(H ? U : i, `scroll`, La),
            V.isPressed &&
              (V._vx.reset(), V._vy.reset(), Pa(j ? i : U, Sa[1], Te, !0)),
            Pa(H ? U : i, `scroll`, ke, ne),
            Pa(i, `wheel`, Ae, ne),
            Pa(i, Sa[0], Ee, ne),
            Pa(U, Sa[2], De),
            Pa(U, Sa[3], De),
            Pa(i, `click`, ye, !0),
            Pa(i, `click`, Pe),
            Pa(U, `gesturestart`, G),
            Pa(U, `gestureend`, Oe),
            Pa(i, va + `enter`, Me),
            Pa(i, va + `leave`, Ne),
            Pa(i, va + `move`, je),
            (V.isEnabled = V.isPressed = V.isDragging = !1),
            I && I(V));
        }),
        (V.kill = V.revert =
          function () {
            V.disable();
            var e = Ea.indexOf(V);
            e >= 0 && Ea.splice(e, 1), xa === V && (xa = 0);
          }),
        Ea.push(V),
        j && Ma(i) && (xa = V),
        V.enable(f);
    }),
    ua(e, [
      {
        key: `velocityX`,
        get: function () {
          return this._vx.getVelocity();
        },
      },
      {
        key: `velocityY`,
        get: function () {
          return this._vy.getVelocity();
        },
      },
    ]),
    e
  );
})();
(Ya.version = `3.13.0`),
  (Ya.create = function (e) {
    return new Ya(e);
  }),
  (Ya.register = Ja),
  (Ya.getAll = function () {
    return Ea.slice();
  }),
  (Ya.getById = function (e) {
    return Ea.filter(function (t) {
      return t.vars.id === e;
    })[0];
  }),
  wa() && da.registerPlugin(Ya);
var Y,
  Xa,
  X,
  Za,
  Qa,
  Z,
  $a,
  eo,
  to,
  no,
  ro,
  io,
  ao,
  oo,
  so,
  co,
  lo,
  uo,
  fo,
  po,
  mo,
  ho,
  go,
  _o,
  vo,
  yo,
  bo,
  xo,
  So,
  Co,
  wo,
  To,
  Eo,
  Do,
  Oo = 1,
  ko = Date.now,
  Ao = ko(),
  jo = 0,
  Mo = 0,
  No = function (e, t, n) {
    var r = Yo(e) && (e.substr(0, 6) === `clamp(` || e.indexOf(`max`) > -1);
    return (n[`_` + t + `Clamp`] = r), r ? e.substr(6, e.length - 7) : e;
  },
  Po = function (e, t) {
    return t && (!Yo(e) || e.substr(0, 6) !== `clamp(`)
      ? `clamp(` + e + `)`
      : e;
  },
  Fo = function e() {
    return Mo && requestAnimationFrame(e);
  },
  Io = function () {
    return (oo = 1);
  },
  Lo = function () {
    return (oo = 0);
  },
  Ro = function (e) {
    return e;
  },
  zo = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  Bo = function () {
    return typeof window < `u`;
  },
  Vo = function () {
    return Y || (Bo() && (Y = window.gsap) && Y.registerPlugin && Y);
  },
  Ho = function (e) {
    return !!~$a.indexOf(e);
  },
  Uo = function (e) {
    return (
      (e === `Height` ? wo : X[`inner` + e]) ||
      Qa[`client` + e] ||
      Z[`client` + e]
    );
  },
  Wo = function (e) {
    return (
      ja(e, `getBoundingClientRect`) ||
      (Ho(e)
        ? function () {
            return (_c.width = X.innerWidth), (_c.height = wo), _c;
          }
        : function () {
            return Ss(e);
          })
    );
  },
  Go = function (e, t, n) {
    var r = n.d,
      i = n.d2,
      a = n.a;
    return (a = ja(e, `getBoundingClientRect`))
      ? function () {
          return a()[r];
        }
      : function () {
          return (t ? Uo(i) : e[`client` + i]) || 0;
        };
  },
  Ko = function (e, t) {
    return !t || ~Da.indexOf(e)
      ? Wo(e)
      : function () {
          return _c;
        };
  },
  qo = function (e, t) {
    var n = t.s,
      r = t.d2,
      i = t.d,
      a = t.a;
    return Math.max(
      0,
      (n = `scroll` + r) && (a = ja(e, n))
        ? a() - Wo(e)()[i]
        : Ho(e)
        ? (Qa[n] || Z[n]) - Uo(r)
        : e[n] - e[`offset` + r]
    );
  },
  Jo = function (e, t) {
    for (var n = 0; n < fo.length; n += 3)
      (!t || ~t.indexOf(fo[n + 1])) && e(fo[n], fo[n + 1], fo[n + 2]);
  },
  Yo = function (e) {
    return typeof e == `string`;
  },
  Xo = function (e) {
    return typeof e == `function`;
  },
  Zo = function (e) {
    return typeof e == `number`;
  },
  Qo = function (e) {
    return typeof e == `object`;
  },
  $o = function (e, t, n) {
    return e && e.progress(t ? 0 : 1) && n && e.pause();
  },
  es = function (e, t) {
    if (e.enabled) {
      var n = e._ctx
        ? e._ctx.add(function () {
            return t(e);
          })
        : t(e);
      n && n.totalTime && (e.callbackAnimation = n);
    }
  },
  ts = Math.abs,
  ns = `left`,
  rs = `top`,
  os = `right`,
  ss = `bottom`,
  cs = `width`,
  ls = `height`,
  us = `Right`,
  ds = `Left`,
  fs = `Top`,
  ps = `Bottom`,
  ms = `padding`,
  hs = `margin`,
  gs = `Width`,
  _s = `Height`,
  vs = `px`,
  ys = function (e) {
    return X.getComputedStyle(e);
  },
  bs = function (e) {
    var t = ys(e).position;
    e.style.position = t === `absolute` || t === `fixed` ? t : `relative`;
  },
  xs = function (e, t) {
    for (var n in t) n in e || (e[n] = t[n]);
    return e;
  },
  Ss = function (e, t) {
    var n =
        t &&
        ys(e)[so] !== `matrix(1, 0, 0, 1, 0, 0)` &&
        Y.to(e, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
        }).progress(1),
      r = e.getBoundingClientRect();
    return n && n.progress(0).kill(), r;
  },
  Cs = function (e, t) {
    var n = t.d2;
    return e[`offset` + n] || e[`client` + n] || 0;
  },
  ws = function (e) {
    var t = [],
      n = e.labels,
      r = e.duration(),
      i;
    for (i in n) t.push(n[i] / r);
    return t;
  },
  Ts = function (e) {
    return function (t) {
      return Y.utils.snap(ws(e), t);
    };
  },
  Es = function (e) {
    var t = Y.utils.snap(e),
      n =
        Array.isArray(e) &&
        e.slice(0).sort(function (e, t) {
          return e - t;
        });
    return n
      ? function (e, r, i) {
          i === void 0 && (i = 0.001);
          var a;
          if (!r) return t(e);
          if (r > 0) {
            for (e -= i, a = 0; a < n.length; a++) if (n[a] >= e) return n[a];
            return n[a - 1];
          } else for (a = n.length, e += i; a--; ) if (n[a] <= e) return n[a];
          return n[0];
        }
      : function (n, r, i) {
          i === void 0 && (i = 0.001);
          var a = t(n);
          return !r || Math.abs(a - n) < i || a - n < 0 == r < 0
            ? a
            : t(r < 0 ? n - e : n + e);
        };
  },
  Ds = function (e) {
    return function (t, n) {
      return Es(ws(e))(t, n.direction);
    };
  },
  Os = function (e, t, n, r) {
    return n.split(`,`).forEach(function (n) {
      return e(t, n, r);
    });
  },
  ks = function (e, t, n, r, i) {
    return e.addEventListener(t, n, { passive: !r, capture: !!i });
  },
  As = function (e, t, n, r) {
    return e.removeEventListener(t, n, !!r);
  },
  js = function (e, t, n) {
    (n &&= n.wheelHandler), n && (e(t, `wheel`, n), e(t, `touchmove`, n));
  },
  Ms = {
    startColor: `green`,
    endColor: `red`,
    indent: 0,
    fontSize: `16px`,
    fontWeight: `normal`,
  },
  Ns = { toggleActions: `play`, anticipatePin: 0 },
  Ps = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  Fs = function (e, t) {
    if (Yo(e)) {
      var n = e.indexOf(`=`),
        r = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0;
      ~n && (e.indexOf(`%`) > n && (r *= t / 100), (e = e.substr(0, n - 1))),
        (e =
          r +
          (e in Ps
            ? Ps[e] * t
            : ~e.indexOf(`%`)
            ? (parseFloat(e) * t) / 100
            : parseFloat(e) || 0));
    }
    return e;
  },
  Is = function (e, t, n, r, i, a, o, s) {
    var c = i.startColor,
      l = i.endColor,
      u = i.fontSize,
      d = i.indent,
      f = i.fontWeight,
      p = Za.createElement(`div`),
      m = Ho(n) || ja(n, `pinType`) === `fixed`,
      h = e.indexOf(`scroller`) !== -1,
      g = m ? Z : n,
      _ = e.indexOf(`start`) !== -1,
      v = _ ? c : l,
      y =
        `border-color:` +
        v +
        `;font-size:` +
        u +
        `;color:` +
        v +
        `;font-weight:` +
        f +
        `;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;
    return (
      (y += `position:` + ((h || s) && m ? `fixed;` : `absolute;`)),
      (h || s || !m) &&
        (y += (r === Ba ? os : ss) + `:` + (a + parseFloat(d)) + `px;`),
      o &&
        (y +=
          `box-sizing:border-box;text-align:left;width:` +
          o.offsetWidth +
          `px;`),
      (p._isStart = _),
      p.setAttribute(`class`, `gsap-marker-` + e + (t ? ` marker-` + t : ``)),
      (p.style.cssText = y),
      (p.innerText = t || t === 0 ? e + `-` + t : e),
      g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p),
      (p._offset = p[`offset` + r.op.d2]),
      Ls(p, 0, r, _),
      p
    );
  },
  Ls = function (e, t, n, r) {
    var i = { display: `block` },
      a = n[r ? `os2` : `p2`],
      o = n[r ? `p2` : `os2`];
    (e._isFlipped = r),
      (i[n.a + `Percent`] = r ? -100 : 0),
      (i[n.a] = r ? `1px` : 0),
      (i[`border` + a + gs] = 1),
      (i[`border` + o + gs] = 0),
      (i[n.p] = t + `px`),
      Y.set(e, i);
  },
  Q = [],
  Rs = {},
  zs,
  Bs = function () {
    return ko() - jo > 34 && (zs ||= requestAnimationFrame(cc));
  },
  Vs = function () {
    (!go || !go.isPressed || go.startX > Z.clientWidth) &&
      (J.cache++,
      go ? (zs ||= requestAnimationFrame(cc)) : cc(),
      jo || qs(`scrollStart`),
      (jo = ko()));
  },
  Hs = function () {
    (yo = X.innerWidth), (vo = X.innerHeight);
  },
  Us = function (e) {
    J.cache++,
      (e === !0 ||
        (!ao &&
          !ho &&
          !Za.fullscreenElement &&
          !Za.webkitFullscreenElement &&
          (!_o ||
            yo !== X.innerWidth ||
            Math.abs(X.innerHeight - vo) > X.innerHeight * 0.25))) &&
        eo.restart(!0);
  },
  Ws = {},
  Gs = [],
  Ks = function e() {
    return As($, `scrollEnd`, e) || ic(!0);
  },
  qs = function (e) {
    return (
      (Ws[e] &&
        Ws[e].map(function (e) {
          return e();
        })) ||
      Gs
    );
  },
  Js = [],
  Ys = function (e) {
    for (var t = 0; t < Js.length; t += 5)
      (!e || (Js[t + 4] && Js[t + 4].query === e)) &&
        ((Js[t].style.cssText = Js[t + 1]),
        Js[t].getBBox && Js[t].setAttribute(`transform`, Js[t + 2] || ``),
        (Js[t + 3].uncache = 1));
  },
  Xs = function (e, t) {
    var n;
    for (co = 0; co < Q.length; co++)
      (n = Q[co]),
        n && (!t || n._ctx === t) && (e ? n.kill(1) : n.revert(!0, !0));
    (To = !0), t && Ys(t), t || qs(`revert`);
  },
  Zs = function (e, t) {
    J.cache++,
      (t || !Qs) &&
        J.forEach(function (e) {
          return Xo(e) && e.cacheID++ && (e.rec = 0);
        }),
      Yo(e) && (X.history.scrollRestoration = So = e);
  },
  Qs,
  $s = 0,
  ec,
  tc = function () {
    if (ec !== $s) {
      var e = (ec = $s);
      requestAnimationFrame(function () {
        return e === $s && ic(!0);
      });
    }
  },
  nc = function () {
    Z.appendChild(Co),
      (wo = (!go && Co.offsetHeight) || X.innerHeight),
      Z.removeChild(Co);
  },
  rc = function (e) {
    return to(
      `.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`
    ).forEach(function (t) {
      return (t.style.display = e ? `none` : `block`);
    });
  },
  ic = function (e, t) {
    if (
      ((Qa = Za.documentElement),
      (Z = Za.body),
      ($a = [X, Za, Qa, Z]),
      jo && !e && !To)
    ) {
      ks($, `scrollEnd`, Ks);
      return;
    }
    nc(),
      (Qs = $.isRefreshing = !0),
      J.forEach(function (e) {
        return Xo(e) && ++e.cacheID && (e.rec = e());
      });
    var n = qs(`refreshInit`);
    po && $.sort(),
      t || Xs(),
      J.forEach(function (e) {
        Xo(e) && (e.smooth && (e.target.style.scrollBehavior = `auto`), e(0));
      }),
      Q.slice(0).forEach(function (e) {
        return e.refresh();
      }),
      (To = !1),
      Q.forEach(function (e) {
        if (e._subPinOffset && e.pin) {
          var t = e.vars.horizontal ? `offsetWidth` : `offsetHeight`,
            n = e.pin[t];
          e.revert(!0, 1), e.adjustPinSpacing(e.pin[t] - n), e.refresh();
        }
      }),
      (Eo = 1),
      rc(!0),
      Q.forEach(function (e) {
        var t = qo(e.scroller, e._dir),
          n = e.vars.end === `max` || (e._endClamp && e.end > t),
          r = e._startClamp && e.start >= t;
        (n || r) &&
          e.setPositions(
            r ? t - 1 : e.start,
            n ? Math.max(r ? t : e.start + 1, t) : e.end,
            !0
          );
      }),
      rc(!1),
      (Eo = 0),
      n.forEach(function (e) {
        return e && e.render && e.render(-1);
      }),
      J.forEach(function (e) {
        Xo(e) &&
          (e.smooth &&
            requestAnimationFrame(function () {
              return (e.target.style.scrollBehavior = `smooth`);
            }),
          e.rec && e(e.rec));
      }),
      Zs(So, 1),
      eo.pause(),
      $s++,
      (Qs = 2),
      cc(2),
      Q.forEach(function (e) {
        return Xo(e.vars.onRefresh) && e.vars.onRefresh(e);
      }),
      (Qs = $.isRefreshing = !1),
      qs(`refresh`);
  },
  ac = 0,
  oc = 1,
  sc,
  cc = function (e) {
    if (e === 2 || (!Qs && !To)) {
      ($.isUpdating = !0), sc && sc.update(0);
      var t = Q.length,
        n = ko(),
        r = n - Ao >= 50,
        i = t && Q[0].scroll();
      if (
        ((oc = ac > i ? -1 : 1),
        Qs || (ac = i),
        r &&
          (jo && !oo && n - jo > 200 && ((jo = 0), qs(`scrollEnd`)),
          (ro = Ao),
          (Ao = n)),
        oc < 0)
      ) {
        for (co = t; co-- > 0; ) Q[co] && Q[co].update(0, r);
        oc = 1;
      } else for (co = 0; co < t; co++) Q[co] && Q[co].update(0, r);
      $.isUpdating = !1;
    }
    zs = 0;
  },
  lc = [
    ns,
    rs,
    ss,
    os,
    hs + ps,
    hs + us,
    hs + fs,
    hs + ds,
    `display`,
    `flexShrink`,
    `float`,
    `zIndex`,
    `gridColumnStart`,
    `gridColumnEnd`,
    `gridRowStart`,
    `gridRowEnd`,
    `gridArea`,
    `justifySelf`,
    `alignSelf`,
    `placeSelf`,
    `order`,
  ],
  uc = lc.concat([
    cs,
    ls,
    `boxSizing`,
    `max` + gs,
    `max` + _s,
    `position`,
    hs,
    ms,
    ms + fs,
    ms + us,
    ms + ps,
    ms + ds,
  ]),
  dc = function (e, t, n) {
    mc(n);
    var r = e._gsap;
    if (r.spacerIsNative) mc(r.spacerState);
    else if (e._gsap.swappedIn) {
      var i = t.parentNode;
      i && (i.insertBefore(e, t), i.removeChild(t));
    }
    e._gsap.swappedIn = !1;
  },
  fc = function (e, t, n, r) {
    if (!e._gsap.swappedIn) {
      for (var i = lc.length, a = t.style, o = e.style, s; i--; )
        (s = lc[i]), (a[s] = n[s]);
      (a.position = n.position === `absolute` ? `absolute` : `relative`),
        n.display === `inline` && (a.display = `inline-block`),
        (o[ss] = o[os] = `auto`),
        (a.flexBasis = n.flexBasis || `auto`),
        (a.overflow = `visible`),
        (a.boxSizing = `border-box`),
        (a[cs] = Cs(e, za) + vs),
        (a[ls] = Cs(e, Ba) + vs),
        (a[ms] = o[hs] = o[rs] = o[ns] = `0`),
        mc(r),
        (o[cs] = o[`max` + gs] = n[cs]),
        (o[ls] = o[`max` + _s] = n[ls]),
        (o[ms] = n[ms]),
        e.parentNode !== t &&
          (e.parentNode.insertBefore(t, e), t.appendChild(e)),
        (e._gsap.swappedIn = !0);
    }
  },
  pc = /([A-Z])/g,
  mc = function (e) {
    if (e) {
      var t = e.t.style,
        n = e.length,
        r = 0,
        i,
        a;
      for ((e.t._gsap || Y.core.getCache(e.t)).uncache = 1; r < n; r += 2)
        (a = e[r + 1]),
          (i = e[r]),
          a
            ? (t[i] = a)
            : t[i] && t.removeProperty(i.replace(pc, `-$1`).toLowerCase());
    }
  },
  hc = function (e) {
    for (var t = uc.length, n = e.style, r = [], i = 0; i < t; i++)
      r.push(uc[i], n[uc[i]]);
    return (r.t = e), r;
  },
  gc = function (e, t, n) {
    for (var r = [], i = e.length, a = n ? 8 : 0, o; a < i; a += 2)
      (o = e[a]), r.push(o, o in t ? t[o] : e[a + 1]);
    return (r.t = e.t), r;
  },
  _c = { left: 0, top: 0 },
  vc = function (e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
    Xo(e) && (e = e(s)),
      Yo(e) &&
        e.substr(0, 3) === `max` &&
        (e = d + (e.charAt(4) === `=` ? Fs(`0` + e.substr(3), n) : 0));
    var m = f ? f.time() : 0,
      h,
      g,
      _;
    if ((f && f.seek(0), isNaN(e) || (e = +e), Zo(e)))
      f &&
        (e = Y.utils.mapRange(
          f.scrollTrigger.start,
          f.scrollTrigger.end,
          0,
          d,
          e
        )),
        o && Ls(o, n, r, !0);
    else {
      Xo(t) && (t = t(s));
      var v = (e || `0`).split(` `),
        y,
        b,
        x,
        S;
      (_ = Va(t, s) || Z),
        (y = Ss(_) || {}),
        (!y || (!y.left && !y.top)) &&
          ys(_).display === `none` &&
          ((S = _.style.display),
          (_.style.display = `block`),
          (y = Ss(_)),
          S ? (_.style.display = S) : _.style.removeProperty(`display`)),
        (b = Fs(v[0], y[r.d])),
        (x = Fs(v[1] || `0`, n)),
        (e = y[r.p] - c[r.p] - l + b + i - x),
        o && Ls(o, x, r, n - x < 20 || (o._isStart && x > 20)),
        (n -= n - x);
    }
    if ((p && ((s[p] = e || -0.001), e < 0 && (e = 0)), a)) {
      var C = e + n,
        w = a._isStart;
      (h = `scroll` + r.d2),
        Ls(
          a,
          C,
          r,
          (w && C > 20) ||
            (!w && (u ? Math.max(Z[h], Qa[h]) : a.parentNode[h]) <= C + 1)
        ),
        u &&
          ((c = Ss(o)),
          u && (a.style[r.op.p] = c[r.op.p] - r.op.m - a._offset + vs));
    }
    return (
      f &&
        _ &&
        ((h = Ss(_)),
        f.seek(d),
        (g = Ss(_)),
        (f._caScrollDist = h[r.p] - g[r.p]),
        (e = (e / f._caScrollDist) * d)),
      f && f.seek(m),
      f ? e : Math.round(e)
    );
  },
  yc = /(webkit|moz|length|cssText|inset)/i,
  bc = function (e, t, n, r) {
    if (e.parentNode !== t) {
      var i = e.style,
        a,
        o;
      if (t === Z) {
        for (a in ((e._stOrig = i.cssText), (o = ys(e)), o))
          !+a &&
            !yc.test(a) &&
            o[a] &&
            typeof i[a] == `string` &&
            a !== `0` &&
            (i[a] = o[a]);
        (i.top = n), (i.left = r);
      } else i.cssText = e._stOrig;
      (Y.core.getCache(e).uncache = 1), t.appendChild(e);
    }
  },
  xc = function (e, t, n) {
    var r = t,
      i = r;
    return function (t) {
      var a = Math.round(e());
      return (
        a !== r &&
          a !== i &&
          Math.abs(a - r) > 3 &&
          Math.abs(a - i) > 3 &&
          ((t = a), n && n()),
        (i = r),
        (r = Math.round(t)),
        r
      );
    };
  },
  Sc = function (e, t, n) {
    var r = {};
    (r[t.p] = `+=` + n), Y.set(e, r);
  },
  Cc = function (e, t) {
    var n = Ua(e, t),
      r = `_scroll` + t.p2,
      i = function t(i, a, o, s, c) {
        var l = t.tween,
          u = a.onComplete,
          d = {};
        o ||= n();
        var f = xc(n, o, function () {
          l.kill(), (t.tween = 0);
        });
        return (
          (c = (s && c) || 0),
          (s ||= i - o),
          l && l.kill(),
          (a[r] = i),
          (a.inherit = !1),
          (a.modifiers = d),
          (d[r] = function () {
            return f(o + s * l.ratio + c * l.ratio * l.ratio);
          }),
          (a.onUpdate = function () {
            J.cache++, t.tween && cc();
          }),
          (a.onComplete = function () {
            (t.tween = 0), u && u.call(l);
          }),
          (l = t.tween = Y.to(e, a)),
          l
        );
      };
    return (
      (e[r] = n),
      (n.wheelHandler = function () {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }),
      ks(e, `wheel`, n.wheelHandler),
      $.isTouch && ks(e, `touchmove`, n.wheelHandler),
      i
    );
  },
  $ = (function () {
    function e(t, n) {
      Xa ||
        e.register(Y) ||
        console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),
        xo(this),
        this.init(t, n);
    }
    var t = e.prototype;
    return (
      (t.init = function (t, n) {
        if (
          ((this.progress = this.start = 0),
          this.vars && this.kill(!0, !0),
          !Mo)
        ) {
          this.update = this.refresh = this.kill = Ro;
          return;
        }
        t = xs(Yo(t) || Zo(t) || t.nodeType ? { trigger: t } : t, Ns);
        var r = t,
          i = r.onUpdate,
          a = r.toggleClass,
          o = r.id,
          s = r.onToggle,
          c = r.onRefresh,
          l = r.scrub,
          u = r.trigger,
          d = r.pin,
          f = r.pinSpacing,
          p = r.invalidateOnRefresh,
          m = r.anticipatePin,
          h = r.onScrubComplete,
          g = r.onSnapComplete,
          _ = r.once,
          v = r.snap,
          y = r.pinReparent,
          b = r.pinSpacer,
          x = r.containerAnimation,
          S = r.fastScrollEnd,
          C = r.preventOverlaps,
          w =
            t.horizontal || (t.containerAnimation && t.horizontal !== !1)
              ? za
              : Ba,
          T = !l && l !== 0,
          E = Va(t.scroller || X),
          D = Y.core.getCache(E),
          O = Ho(E),
          k =
            (`pinType` in t
              ? t.pinType
              : ja(E, `pinType`) || (O && `fixed`)) === `fixed`,
          A = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
          j = T && t.toggleActions.split(` `),
          M = `markers` in t ? t.markers : Ns.markers,
          N = O ? 0 : parseFloat(ys(E)[`border` + w.p2 + gs]) || 0,
          P = this,
          F =
            t.onRefreshInit &&
            function () {
              return t.onRefreshInit(P);
            },
          I = Go(E, O, w),
          ee = Ko(E, O),
          te = 0,
          ne = 0,
          re = 0,
          L = Ua(E, w),
          R,
          z,
          ie,
          ae,
          oe,
          B,
          se,
          ce,
          V,
          le,
          ue,
          de,
          fe,
          pe,
          me,
          he,
          ge,
          H,
          U,
          _e,
          W,
          ve,
          ye,
          be,
          xe,
          Se,
          Ce,
          we,
          Te,
          Ee,
          De,
          G,
          Oe,
          ke,
          Ae,
          je,
          Me,
          Ne,
          Pe;
        if (
          ((P._startClamp = P._endClamp = !1),
          (P._dir = w),
          (m *= 45),
          (P.scroller = E),
          (P.scroll = x ? x.time.bind(x) : L),
          (ae = L()),
          (P.vars = t),
          (n ||= t.animation),
          `refreshPriority` in t &&
            ((po = 1), t.refreshPriority === -9999 && (sc = P)),
          (D.tweenScroll = D.tweenScroll || {
            top: Cc(E, Ba),
            left: Cc(E, za),
          }),
          (P.tweenTo = R = D.tweenScroll[w.p]),
          (P.scrubDuration = function (e) {
            (Oe = Zo(e) && e),
              Oe
                ? G
                  ? G.duration(e)
                  : (G = Y.to(n, {
                      ease: `expo`,
                      totalProgress: `+=0`,
                      inherit: !1,
                      duration: Oe,
                      paused: !0,
                      onComplete: function () {
                        return h && h(P);
                      },
                    }))
                : (G && G.progress(1).kill(), (G = 0));
          }),
          n &&
            ((n.vars.lazy = !1),
            (n._initted && !P.isReverted) ||
              (n.vars.immediateRender !== !1 &&
                t.immediateRender !== !1 &&
                n.duration() &&
                n.render(0, !0, !0)),
            (P.animation = n.pause()),
            (n.scrollTrigger = P),
            P.scrubDuration(l),
            (Ee = 0),
            (o ||= n.vars.id)),
          v &&
            ((!Qo(v) || v.push) && (v = { snapTo: v }),
            `scrollBehavior` in Z.style &&
              Y.set(O ? [Z, Qa] : E, { scrollBehavior: `auto` }),
            J.forEach(function (e) {
              return (
                Xo(e) &&
                e.target === (O ? Za.scrollingElement || Qa : E) &&
                (e.smooth = !1)
              );
            }),
            (ie = Xo(v.snapTo)
              ? v.snapTo
              : v.snapTo === `labels`
              ? Ts(n)
              : v.snapTo === `labelsDirectional`
              ? Ds(n)
              : v.directional === !1
              ? Y.utils.snap(v.snapTo)
              : function (e, t) {
                  return Es(v.snapTo)(e, ko() - ne < 500 ? 0 : t.direction);
                }),
            (ke = v.duration || { min: 0.1, max: 2 }),
            (ke = Qo(ke) ? no(ke.min, ke.max) : no(ke, ke)),
            (Ae = Y.delayedCall(v.delay || Oe / 2 || 0.1, function () {
              var e = L(),
                t = ko() - ne < 500,
                r = R.tween;
              if (
                (t || Math.abs(P.getVelocity()) < 10) &&
                !r &&
                !oo &&
                te !== e
              ) {
                var i = (e - B) / pe,
                  a = n && !T ? n.totalProgress() : i,
                  o = t ? 0 : ((a - De) / (ko() - ro)) * 1e3 || 0,
                  s = Y.utils.clamp(-i, 1 - i, (ts(o / 2) * o) / 0.185),
                  c = i + (v.inertia === !1 ? 0 : s),
                  l,
                  u,
                  d = v,
                  f = d.onStart,
                  p = d.onInterrupt,
                  m = d.onComplete;
                if (
                  ((l = ie(c, P)),
                  Zo(l) || (l = c),
                  (u = Math.max(0, Math.round(B + l * pe))),
                  e <= se && e >= B && u !== e)
                ) {
                  if (r && !r._initted && r.data <= ts(u - e)) return;
                  v.inertia === !1 && (s = l - i),
                    R(
                      u,
                      {
                        duration: ke(
                          ts(
                            (Math.max(ts(c - a), ts(l - a)) * 0.185) /
                              o /
                              0.05 || 0
                          )
                        ),
                        ease: v.ease || `power3`,
                        data: ts(u - e),
                        onInterrupt: function () {
                          return Ae.restart(!0) && p && p(P);
                        },
                        onComplete: function () {
                          P.update(),
                            (te = L()),
                            n &&
                              !T &&
                              (G
                                ? G.resetTo(
                                    `totalProgress`,
                                    l,
                                    n._tTime / n._tDur
                                  )
                                : n.progress(l)),
                            (Ee = De =
                              n && !T ? n.totalProgress() : P.progress),
                            g && g(P),
                            m && m(P);
                        },
                      },
                      e,
                      s * pe,
                      u - e - s * pe
                    ),
                    f && f(P, R.tween);
                }
              } else P.isActive && te !== e && Ae.restart(!0);
            }).pause())),
          o && (Rs[o] = P),
          (u = P.trigger = Va(u || (d !== !0 && d))),
          (Pe = u && u._gsap && u._gsap.stRevert),
          (Pe &&= Pe(P)),
          (d = d === !0 ? u : Va(d)),
          Yo(a) && (a = { targets: u, className: a }),
          d &&
            (f === !1 ||
              f === hs ||
              (f =
                !f &&
                d.parentNode &&
                d.parentNode.style &&
                ys(d.parentNode).display === `flex`
                  ? !1
                  : ms),
            (P.pin = d),
            (z = Y.core.getCache(d)),
            z.spacer
              ? (me = z.pinState)
              : (b &&
                  ((b = Va(b)),
                  b && !b.nodeType && (b = b.current || b.nativeElement),
                  (z.spacerIsNative = !!b),
                  b && (z.spacerState = hc(b))),
                (z.spacer = H = b || Za.createElement(`div`)),
                H.classList.add(`pin-spacer`),
                o && H.classList.add(`pin-spacer-` + o),
                (z.pinState = me = hc(d))),
            t.force3D !== !1 && Y.set(d, { force3D: !0 }),
            (P.spacer = H = z.spacer),
            (Te = ys(d)),
            (be = Te[f + w.os2]),
            (_e = Y.getProperty(d)),
            (W = Y.quickSetter(d, w.a, vs)),
            fc(d, H, Te),
            (ge = hc(d))),
          M)
        ) {
          (de = Qo(M) ? xs(M, Ms) : Ms),
            (le = Is(`scroller-start`, o, E, w, de, 0)),
            (ue = Is(`scroller-end`, o, E, w, de, 0, le)),
            (U = le[`offset` + w.op.d2]);
          var Fe = Va(ja(E, `content`) || E);
          (ce = this.markerStart = Is(`start`, o, Fe, w, de, U, 0, x)),
            (V = this.markerEnd = Is(`end`, o, Fe, w, de, U, 0, x)),
            x && (Ne = Y.quickSetter([ce, V], w.a, vs)),
            !k &&
              !(Da.length && ja(E, `fixedMarkers`) === !0) &&
              (bs(O ? Z : E),
              Y.set([le, ue], { force3D: !0 }),
              (Se = Y.quickSetter(le, w.a, vs)),
              (we = Y.quickSetter(ue, w.a, vs)));
        }
        if (x) {
          var Ie = x.vars.onUpdate,
            Le = x.vars.onUpdateParams;
          x.eventCallback(`onUpdate`, function () {
            P.update(0, 0, 1), Ie && Ie.apply(x, Le || []);
          });
        }
        if (
          ((P.previous = function () {
            return Q[Q.indexOf(P) - 1];
          }),
          (P.next = function () {
            return Q[Q.indexOf(P) + 1];
          }),
          (P.revert = function (e, t) {
            if (!t) return P.kill(!0);
            var r = e !== !1 || !P.enabled,
              i = ao;
            r !== P.isReverted &&
              (r &&
                ((je = Math.max(L(), P.scroll.rec || 0)),
                (re = P.progress),
                (Me = n && n.progress())),
              ce &&
                [ce, V, le, ue].forEach(function (e) {
                  return (e.style.display = r ? `none` : `block`);
                }),
              r && ((ao = P), P.update(r)),
              d &&
                (!y || !P.isActive) &&
                (r ? dc(d, H, me) : fc(d, H, ys(d), xe)),
              r || P.update(r),
              (ao = i),
              (P.isReverted = r));
          }),
          (P.refresh = function (r, i, a, o) {
            if (!((ao || !P.enabled) && !i)) {
              if (d && r && jo) {
                ks(e, `scrollEnd`, Ks);
                return;
              }
              !Qs && F && F(P),
                (ao = P),
                R.tween && !a && (R.tween.kill(), (R.tween = 0)),
                G && G.pause(),
                p &&
                  n &&
                  (n.revert({ kill: !1 }).invalidate(),
                  n.getChildren &&
                    n.getChildren(!0, !0, !1).forEach(function (e) {
                      return e.vars.immediateRender && e.render(0, !0, !0);
                    })),
                P.isReverted || P.revert(!0, !0),
                (P._subPinOffset = !1);
              var s = I(),
                l = ee(),
                m = x ? x.duration() : qo(E, w),
                h = pe <= 0.01 || !pe,
                g = 0,
                _ = o || 0,
                v = Qo(a) ? a.end : t.end,
                b = t.endTrigger || u,
                S = Qo(a)
                  ? a.start
                  : t.start || (t.start === 0 || !u ? 0 : d ? `0 0` : `0 100%`),
                C = (P.pinnedContainer =
                  t.pinnedContainer && Va(t.pinnedContainer, P)),
                D = (u && Math.max(0, Q.indexOf(P))) || 0,
                A = D,
                j,
                z,
                ie,
                de,
                U,
                W,
                be,
                Se,
                we,
                Te,
                Ee,
                De,
                Oe;
              for (
                M &&
                Qo(a) &&
                ((De = Y.getProperty(le, w.p)), (Oe = Y.getProperty(ue, w.p)));
                A-- > 0;

              )
                (W = Q[A]),
                  W.end || W.refresh(0, 1) || (ao = P),
                  (be = W.pin),
                  be &&
                    (be === u || be === d || be === C) &&
                    !W.isReverted &&
                    ((Te ||= []), Te.unshift(W), W.revert(!0, !0)),
                  W !== Q[A] && (D--, A--);
              for (
                Xo(S) && (S = S(P)),
                  S = No(S, `start`, P),
                  B =
                    vc(
                      S,
                      u,
                      s,
                      w,
                      L(),
                      ce,
                      le,
                      P,
                      l,
                      N,
                      k,
                      m,
                      x,
                      P._startClamp && `_startClamp`
                    ) || (d ? -0.001 : 0),
                  Xo(v) && (v = v(P)),
                  Yo(v) &&
                    !v.indexOf(`+=`) &&
                    (~v.indexOf(` `)
                      ? (v = (Yo(S) ? S.split(` `)[0] : ``) + v)
                      : ((g = Fs(v.substr(2), s)),
                        (v = Yo(S)
                          ? S
                          : (x
                              ? Y.utils.mapRange(
                                  0,
                                  x.duration(),
                                  x.scrollTrigger.start,
                                  x.scrollTrigger.end,
                                  B
                                )
                              : B) + g),
                        (b = u))),
                  v = No(v, `end`, P),
                  se =
                    Math.max(
                      B,
                      vc(
                        v || (b ? `100% 0` : m),
                        b,
                        s,
                        w,
                        L() + g,
                        V,
                        ue,
                        P,
                        l,
                        N,
                        k,
                        m,
                        x,
                        P._endClamp && `_endClamp`
                      )
                    ) || -0.001,
                  g = 0,
                  A = D;
                A--;

              )
                (W = Q[A]),
                  (be = W.pin),
                  be &&
                    W.start - W._pinPush <= B &&
                    !x &&
                    W.end > 0 &&
                    ((j =
                      W.end - (P._startClamp ? Math.max(0, W.start) : W.start)),
                    ((be === u && W.start - W._pinPush < B) || be === C) &&
                      isNaN(S) &&
                      (g += j * (1 - W.progress)),
                    be === d && (_ += j));
              if (
                ((B += g),
                (se += g),
                P._startClamp && (P._startClamp += g),
                P._endClamp &&
                  !Qs &&
                  ((P._endClamp = se || -0.001), (se = Math.min(se, qo(E, w)))),
                (pe = se - B || ((B -= 0.01) && 0.001)),
                h && (re = Y.utils.clamp(0, 1, Y.utils.normalize(B, se, je))),
                (P._pinPush = _),
                ce &&
                  g &&
                  ((j = {}),
                  (j[w.a] = `+=` + g),
                  C && (j[w.p] = `-=` + L()),
                  Y.set([ce, V], j)),
                d && !(Eo && P.end >= qo(E, w)))
              )
                (j = ys(d)),
                  (de = w === Ba),
                  (ie = L()),
                  (ve = parseFloat(_e(w.a)) + _),
                  !m &&
                    se > 1 &&
                    ((Ee = (O ? Za.scrollingElement || Qa : E).style),
                    (Ee = {
                      style: Ee,
                      value: Ee[`overflow` + w.a.toUpperCase()],
                    }),
                    O &&
                      ys(Z)[`overflow` + w.a.toUpperCase()] !== `scroll` &&
                      (Ee.style[`overflow` + w.a.toUpperCase()] = `scroll`)),
                  fc(d, H, j),
                  (ge = hc(d)),
                  (z = Ss(d, !0)),
                  (Se = k && Ua(E, de ? za : Ba)()),
                  f
                    ? ((xe = [f + w.os2, pe + _ + vs]),
                      (xe.t = H),
                      (A = f === ms ? Cs(d, w) + pe + _ : 0),
                      A &&
                        (xe.push(w.d, A + vs),
                        H.style.flexBasis !== `auto` &&
                          (H.style.flexBasis = A + vs)),
                      mc(xe),
                      C &&
                        Q.forEach(function (e) {
                          e.pin === C &&
                            e.vars.pinSpacing !== !1 &&
                            (e._subPinOffset = !0);
                        }),
                      k && L(je))
                    : ((A = Cs(d, w)),
                      A &&
                        H.style.flexBasis !== `auto` &&
                        (H.style.flexBasis = A + vs)),
                  k &&
                    ((U = {
                      top: z.top + (de ? ie - B : Se) + vs,
                      left: z.left + (de ? Se : ie - B) + vs,
                      boxSizing: `border-box`,
                      position: `fixed`,
                    }),
                    (U[cs] = U[`max` + gs] = Math.ceil(z.width) + vs),
                    (U[ls] = U[`max` + _s] = Math.ceil(z.height) + vs),
                    (U[hs] =
                      U[hs + fs] =
                      U[hs + us] =
                      U[hs + ps] =
                      U[hs + ds] =
                        `0`),
                    (U[ms] = j[ms]),
                    (U[ms + fs] = j[ms + fs]),
                    (U[ms + us] = j[ms + us]),
                    (U[ms + ps] = j[ms + ps]),
                    (U[ms + ds] = j[ms + ds]),
                    (he = gc(me, U, y)),
                    Qs && L(0)),
                  n
                    ? ((we = n._initted),
                      mo(1),
                      n.render(n.duration(), !0, !0),
                      (ye = _e(w.a) - ve + pe + _),
                      (Ce = Math.abs(pe - ye) > 1),
                      k && Ce && he.splice(he.length - 2, 2),
                      n.render(0, !0, !0),
                      we || n.invalidate(!0),
                      n.parent || n.totalTime(n.totalTime()),
                      mo(0))
                    : (ye = pe),
                  Ee &&
                    (Ee.value
                      ? (Ee.style[`overflow` + w.a.toUpperCase()] = Ee.value)
                      : Ee.style.removeProperty(`overflow-` + w.a));
              else if (u && L() && !x)
                for (z = u.parentNode; z && z !== Z; )
                  z._pinOffset && ((B -= z._pinOffset), (se -= z._pinOffset)),
                    (z = z.parentNode);
              Te &&
                Te.forEach(function (e) {
                  return e.revert(!1, !0);
                }),
                (P.start = B),
                (P.end = se),
                (ae = oe = Qs ? je : L()),
                !x && !Qs && (ae < je && L(je), (P.scroll.rec = 0)),
                P.revert(!1, !0),
                (ne = ko()),
                Ae && ((te = -1), Ae.restart(!0)),
                (ao = 0),
                n &&
                  T &&
                  (n._initted || Me) &&
                  n.progress() !== Me &&
                  n.progress(Me || 0, !0).render(n.time(), !0, !0),
                (h || re !== P.progress || x || p || (n && !n._initted)) &&
                  (n &&
                    !T &&
                    (n._initted || re || n.vars.immediateRender !== !1) &&
                    n.totalProgress(
                      x && B < -0.001 && !re ? Y.utils.normalize(B, se, 0) : re,
                      !0
                    ),
                  (P.progress = h || (ae - B) / pe === re ? 0 : re)),
                d && f && (H._pinOffset = Math.round(P.progress * ye)),
                G && G.invalidate(),
                isNaN(De) ||
                  ((De -= Y.getProperty(le, w.p)),
                  (Oe -= Y.getProperty(ue, w.p)),
                  Sc(le, w, De),
                  Sc(ce, w, De - (o || 0)),
                  Sc(ue, w, Oe),
                  Sc(V, w, Oe - (o || 0))),
                h && !Qs && P.update(),
                c && !Qs && !fe && ((fe = !0), c(P), (fe = !1));
            }
          }),
          (P.getVelocity = function () {
            return ((L() - oe) / (ko() - ro)) * 1e3 || 0;
          }),
          (P.endAnimation = function () {
            $o(P.callbackAnimation),
              n &&
                (G
                  ? G.progress(1)
                  : n.paused()
                  ? T || $o(n, P.direction < 0, 1)
                  : $o(n, n.reversed()));
          }),
          (P.labelToScroll = function (e) {
            return (
              (n &&
                n.labels &&
                (B || P.refresh() || B) + (n.labels[e] / n.duration()) * pe) ||
              0
            );
          }),
          (P.getTrailing = function (e) {
            var t = Q.indexOf(P),
              n = P.direction > 0 ? Q.slice(0, t).reverse() : Q.slice(t + 1);
            return (
              Yo(e)
                ? n.filter(function (t) {
                    return t.vars.preventOverlaps === e;
                  })
                : n
            ).filter(function (e) {
              return P.direction > 0 ? e.end <= B : e.start >= se;
            });
          }),
          (P.update = function (e, t, r) {
            if (!(x && !r && !e)) {
              var o = Qs === !0 ? je : P.scroll(),
                c = e ? 0 : (o - B) / pe,
                u = c < 0 ? 0 : c > 1 ? 1 : c || 0,
                p = P.progress,
                h,
                g,
                b,
                D,
                O,
                M,
                N,
                F;
              if (
                (t &&
                  ((oe = ae),
                  (ae = x ? L() : o),
                  v && ((De = Ee), (Ee = n && !T ? n.totalProgress() : u))),
                m &&
                  d &&
                  !ao &&
                  !Oo &&
                  jo &&
                  (!u && B < o + ((o - oe) / (ko() - ro)) * m
                    ? (u = 1e-4)
                    : u === 1 &&
                      se > o + ((o - oe) / (ko() - ro)) * m &&
                      (u = 0.9999)),
                u !== p && P.enabled)
              ) {
                if (
                  ((h = P.isActive = !!u && u < 1),
                  (g = !!p && p < 1),
                  (M = h !== g),
                  (O = M || !!u != !!p),
                  (P.direction = u > p ? 1 : -1),
                  (P.progress = u),
                  O &&
                    !ao &&
                    ((b = u && !p ? 0 : u === 1 ? 1 : p === 1 ? 2 : 3),
                    T &&
                      ((D = (!M && j[b + 1] !== `none` && j[b + 1]) || j[b]),
                      (F =
                        n && (D === `complete` || D === `reset` || D in n)))),
                  C &&
                    (M || F) &&
                    (F || l || !n) &&
                    (Xo(C)
                      ? C(P)
                      : P.getTrailing(C).forEach(function (e) {
                          return e.endAnimation();
                        })),
                  T ||
                    (G && !ao && !Oo
                      ? (G._dp._time - G._start !== G._time &&
                          G.render(G._dp._time - G._start),
                        G.resetTo
                          ? G.resetTo(`totalProgress`, u, n._tTime / n._tDur)
                          : ((G.vars.totalProgress = u),
                            G.invalidate().restart()))
                      : n && n.totalProgress(u, !!(ao && (ne || e)))),
                  d)
                ) {
                  if ((e && f && (H.style[f + w.os2] = be), !k))
                    W(zo(ve + ye * u));
                  else if (O) {
                    if (
                      ((N = !e && u > p && se + 1 > o && o + 1 >= qo(E, w)), y)
                    )
                      if (!e && (h || N)) {
                        var I = Ss(d, !0),
                          ee = o - B;
                        bc(
                          d,
                          Z,
                          I.top + (w === Ba ? ee : 0) + vs,
                          I.left + (w === Ba ? 0 : ee) + vs
                        );
                      } else bc(d, H);
                    mc(h || N ? he : ge),
                      (Ce && u < 1 && h) || W(ve + (u === 1 && !N ? ye : 0));
                  }
                }
                v && !R.tween && !ao && !Oo && Ae.restart(!0),
                  a &&
                    (M || (_ && u && (u < 1 || !Do))) &&
                    to(a.targets).forEach(function (e) {
                      return e.classList[h || _ ? `add` : `remove`](
                        a.className
                      );
                    }),
                  i && !T && !e && i(P),
                  O && !ao
                    ? (T &&
                        (F &&
                          (D === `complete`
                            ? n.pause().totalProgress(1)
                            : D === `reset`
                            ? n.restart(!0).pause()
                            : D === `restart`
                            ? n.restart(!0)
                            : n[D]()),
                        i && i(P)),
                      (M || !Do) &&
                        (s && M && es(P, s),
                        A[b] && es(P, A[b]),
                        _ && (u === 1 ? P.kill(!1, 1) : (A[b] = 0)),
                        M || ((b = u === 1 ? 1 : 3), A[b] && es(P, A[b]))),
                      S &&
                        !h &&
                        Math.abs(P.getVelocity()) > (Zo(S) ? S : 2500) &&
                        ($o(P.callbackAnimation),
                        G ? G.progress(1) : $o(n, D === `reverse` ? 1 : !u, 1)))
                    : T && i && !ao && i(P);
              }
              if (we) {
                var te = x ? (o / x.duration()) * (x._caScrollDist || 0) : o;
                Se(te + (le._isFlipped ? 1 : 0)), we(te);
              }
              Ne && Ne((-o / x.duration()) * (x._caScrollDist || 0));
            }
          }),
          (P.enable = function (t, n) {
            P.enabled ||
              ((P.enabled = !0),
              ks(E, `resize`, Us),
              O || ks(E, `scroll`, Vs),
              F && ks(e, `refreshInit`, F),
              t !== !1 && ((P.progress = re = 0), (ae = oe = te = L())),
              n !== !1 && P.refresh());
          }),
          (P.getTween = function (e) {
            return e && R ? R.tween : G;
          }),
          (P.setPositions = function (e, t, n, r) {
            if (x) {
              var i = x.scrollTrigger,
                a = x.duration(),
                o = i.end - i.start;
              (e = i.start + (o * e) / a), (t = i.start + (o * t) / a);
            }
            P.refresh(
              !1,
              !1,
              {
                start: Po(e, n && !!P._startClamp),
                end: Po(t, n && !!P._endClamp),
              },
              r
            ),
              P.update();
          }),
          (P.adjustPinSpacing = function (e) {
            if (xe && e) {
              var t = xe.indexOf(w.d) + 1;
              (xe[t] = parseFloat(xe[t]) + e + vs),
                (xe[1] = parseFloat(xe[1]) + e + vs),
                mc(xe);
            }
          }),
          (P.disable = function (t, n) {
            if (
              P.enabled &&
              (t !== !1 && P.revert(!0, !0),
              (P.enabled = P.isActive = !1),
              n || (G && G.pause()),
              (je = 0),
              z && (z.uncache = 1),
              F && As(e, `refreshInit`, F),
              Ae && (Ae.pause(), R.tween && R.tween.kill() && (R.tween = 0)),
              !O)
            ) {
              for (var r = Q.length; r--; )
                if (Q[r].scroller === E && Q[r] !== P) return;
              As(E, `resize`, Us), O || As(E, `scroll`, Vs);
            }
          }),
          (P.kill = function (e, r) {
            P.disable(e, r), G && !r && G.kill(), o && delete Rs[o];
            var i = Q.indexOf(P);
            i >= 0 && Q.splice(i, 1),
              i === co && oc > 0 && co--,
              (i = 0),
              Q.forEach(function (e) {
                return e.scroller === P.scroller && (i = 1);
              }),
              i || Qs || (P.scroll.rec = 0),
              n &&
                ((n.scrollTrigger = null),
                e && n.revert({ kill: !1 }),
                r || n.kill()),
              ce &&
                [ce, V, le, ue].forEach(function (e) {
                  return e.parentNode && e.parentNode.removeChild(e);
                }),
              sc === P && (sc = 0),
              d &&
                (z && (z.uncache = 1),
                (i = 0),
                Q.forEach(function (e) {
                  return e.pin === d && i++;
                }),
                i || (z.spacer = 0)),
              t.onKill && t.onKill(P);
          }),
          Q.push(P),
          P.enable(!1, !1),
          Pe && Pe(P),
          n && n.add && !pe)
        ) {
          var Re = P.update;
          (P.update = function () {
            (P.update = Re), J.cache++, B || se || P.refresh();
          }),
            Y.delayedCall(0.01, P.update),
            (pe = 0.01),
            (B = se = 0);
        } else P.refresh();
        d && tc();
      }),
      (e.register = function (t) {
        return (
          (Xa ||= ((Y = t || Vo()), Bo() && window.document && e.enable(), Mo)),
          Xa
        );
      }),
      (e.defaults = function (e) {
        if (e) for (var t in e) Ns[t] = e[t];
        return Ns;
      }),
      (e.disable = function (e, t) {
        (Mo = 0),
          Q.forEach(function (n) {
            return n[t ? `kill` : `disable`](e);
          }),
          As(X, `wheel`, Vs),
          As(Za, `scroll`, Vs),
          clearInterval(io),
          As(Za, `touchcancel`, Ro),
          As(Z, `touchstart`, Ro),
          Os(As, Za, `pointerdown,touchstart,mousedown`, Io),
          Os(As, Za, `pointerup,touchend,mouseup`, Lo),
          eo.kill(),
          Jo(As);
        for (var n = 0; n < J.length; n += 3)
          js(As, J[n], J[n + 1]), js(As, J[n], J[n + 2]);
      }),
      (e.enable = function () {
        if (
          ((X = window),
          (Za = document),
          (Qa = Za.documentElement),
          (Z = Za.body),
          Y &&
            ((to = Y.utils.toArray),
            (no = Y.utils.clamp),
            (xo = Y.core.context || Ro),
            (mo = Y.core.suppressOverwrites || Ro),
            (So = X.history.scrollRestoration || `auto`),
            (ac = X.pageYOffset || 0),
            Y.core.globals(`ScrollTrigger`, e),
            Z))
        ) {
          (Mo = 1),
            (Co = document.createElement(`div`)),
            (Co.style.height = `100vh`),
            (Co.style.position = `absolute`),
            nc(),
            Fo(),
            Ya.register(Y),
            (e.isTouch = Ya.isTouch),
            (bo =
              Ya.isTouch &&
              /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            (_o = Ya.isTouch === 1),
            ks(X, `wheel`, Vs),
            ($a = [X, Za, Qa, Z]),
            Y.matchMedia
              ? ((e.matchMedia = function (e) {
                  var t = Y.matchMedia(),
                    n;
                  for (n in e) t.add(n, e[n]);
                  return t;
                }),
                Y.addEventListener(`matchMediaInit`, function () {
                  return Xs();
                }),
                Y.addEventListener(`matchMediaRevert`, function () {
                  return Ys();
                }),
                Y.addEventListener(`matchMedia`, function () {
                  ic(0, 1), qs(`matchMedia`);
                }),
                Y.matchMedia().add(`(orientation: portrait)`, function () {
                  return Hs(), Hs;
                }))
              : console.warn(`Requires GSAP 3.11.0 or later`),
            Hs(),
            ks(Za, `scroll`, Vs);
          var t = Z.hasAttribute(`style`),
            n = Z.style,
            r = n.borderTopStyle,
            i = Y.core.Animation.prototype,
            a,
            o;
          for (
            i.revert ||
              Object.defineProperty(i, `revert`, {
                value: function () {
                  return this.time(-0.01, !0);
                },
              }),
              n.borderTopStyle = `solid`,
              a = Ss(Z),
              Ba.m = Math.round(a.top + Ba.sc()) || 0,
              za.m = Math.round(a.left + za.sc()) || 0,
              r ? (n.borderTopStyle = r) : n.removeProperty(`border-top-style`),
              t || (Z.setAttribute(`style`, ``), Z.removeAttribute(`style`)),
              io = setInterval(Bs, 250),
              Y.delayedCall(0.5, function () {
                return (Oo = 0);
              }),
              ks(Za, `touchcancel`, Ro),
              ks(Z, `touchstart`, Ro),
              Os(ks, Za, `pointerdown,touchstart,mousedown`, Io),
              Os(ks, Za, `pointerup,touchend,mouseup`, Lo),
              so = Y.utils.checkPrefix(`transform`),
              uc.push(so),
              Xa = ko(),
              eo = Y.delayedCall(0.2, ic).pause(),
              fo = [
                Za,
                `visibilitychange`,
                function () {
                  var e = X.innerWidth,
                    t = X.innerHeight;
                  Za.hidden
                    ? ((lo = e), (uo = t))
                    : (lo !== e || uo !== t) && Us();
                },
                Za,
                `DOMContentLoaded`,
                ic,
                X,
                `load`,
                ic,
                X,
                `resize`,
                Us,
              ],
              Jo(ks),
              Q.forEach(function (e) {
                return e.enable(0, 1);
              }),
              o = 0;
            o < J.length;
            o += 3
          )
            js(As, J[o], J[o + 1]), js(As, J[o], J[o + 2]);
        }
      }),
      (e.config = function (t) {
        `limitCallbacks` in t && (Do = !!t.limitCallbacks);
        var n = t.syncInterval;
        (n && clearInterval(io)) || ((io = n) && setInterval(Bs, n)),
          `ignoreMobileResize` in t &&
            (_o = e.isTouch === 1 && t.ignoreMobileResize),
          `autoRefreshEvents` in t &&
            (Jo(As) || Jo(ks, t.autoRefreshEvents || `none`),
            (ho = (t.autoRefreshEvents + ``).indexOf(`resize`) === -1));
      }),
      (e.scrollerProxy = function (e, t) {
        var n = Va(e),
          r = J.indexOf(n),
          i = Ho(n);
        ~r && J.splice(r, i ? 6 : 2),
          t && (i ? Da.unshift(X, t, Z, t, Qa, t) : Da.unshift(n, t));
      }),
      (e.clearMatchMedia = function (e) {
        Q.forEach(function (t) {
          return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
        });
      }),
      (e.isInViewport = function (e, t, n) {
        var r = (Yo(e) ? Va(e) : e).getBoundingClientRect(),
          i = r[n ? cs : ls] * t || 0;
        return n
          ? r.right - i > 0 && r.left + i < X.innerWidth
          : r.bottom - i > 0 && r.top + i < X.innerHeight;
      }),
      (e.positionInViewport = function (e, t, n) {
        Yo(e) && (e = Va(e));
        var r = e.getBoundingClientRect(),
          i = r[n ? cs : ls],
          a =
            t == null
              ? i / 2
              : t in Ps
              ? Ps[t] * i
              : ~t.indexOf(`%`)
              ? (parseFloat(t) * i) / 100
              : parseFloat(t) || 0;
        return n ? (r.left + a) / X.innerWidth : (r.top + a) / X.innerHeight;
      }),
      (e.killAll = function (e) {
        if (
          (Q.slice(0).forEach(function (e) {
            return e.vars.id !== `ScrollSmoother` && e.kill();
          }),
          e !== !0)
        ) {
          var t = Ws.killAll || [];
          (Ws = {}),
            t.forEach(function (e) {
              return e();
            });
        }
      }),
      e
    );
  })();
($.version = `3.13.0`),
  ($.saveStyles = function (e) {
    return e
      ? to(e).forEach(function (e) {
          if (e && e.style) {
            var t = Js.indexOf(e);
            t >= 0 && Js.splice(t, 5),
              Js.push(
                e,
                e.style.cssText,
                e.getBBox && e.getAttribute(`transform`),
                Y.core.getCache(e),
                xo()
              );
          }
        })
      : Js;
  }),
  ($.revert = function (e, t) {
    return Xs(!e, t);
  }),
  ($.create = function (e, t) {
    return new $(e, t);
  }),
  ($.refresh = function (e) {
    return e ? Us(!0) : (Xa || $.register()) && ic(!0);
  }),
  ($.update = function (e) {
    return ++J.cache && cc(e === !0 ? 2 : 0);
  }),
  ($.clearScrollMemory = Zs),
  ($.maxScroll = function (e, t) {
    return qo(e, t ? za : Ba);
  }),
  ($.getScrollFunc = function (e, t) {
    return Ua(Va(e), t ? za : Ba);
  }),
  ($.getById = function (e) {
    return Rs[e];
  }),
  ($.getAll = function () {
    return Q.filter(function (e) {
      return e.vars.id !== `ScrollSmoother`;
    });
  }),
  ($.isScrolling = function () {
    return !!jo;
  }),
  ($.snapDirectional = Es),
  ($.addEventListener = function (e, t) {
    var n = Ws[e] || (Ws[e] = []);
    ~n.indexOf(t) || n.push(t);
  }),
  ($.removeEventListener = function (e, t) {
    var n = Ws[e],
      r = n && n.indexOf(t);
    r >= 0 && n.splice(r, 1);
  }),
  ($.batch = function (e, t) {
    var n = [],
      r = {},
      i = t.interval || 0.016,
      a = t.batchMax || 1e9,
      o = function (e, t) {
        var n = [],
          r = [],
          o = Y.delayedCall(i, function () {
            t(n, r), (n = []), (r = []);
          }).pause();
        return function (e) {
          n.length || o.restart(!0),
            n.push(e.trigger),
            r.push(e),
            a <= n.length && o.progress(1);
        };
      },
      s;
    for (s in t)
      r[s] =
        s.substr(0, 2) === `on` && Xo(t[s]) && s !== `onRefreshInit`
          ? o(s, t[s])
          : t[s];
    return (
      Xo(a) &&
        ((a = a()),
        ks($, `refresh`, function () {
          return (a = t.batchMax());
        })),
      to(e).forEach(function (e) {
        var t = {};
        for (s in r) t[s] = r[s];
        (t.trigger = e), n.push($.create(t));
      }),
      n
    );
  });
var wc = function (e, t, n, r) {
    return (
      t > r ? e(r) : t < 0 && e(0),
      n > r ? (r - t) / (n - t) : n < 0 ? t / (t - n) : 1
    );
  },
  Tc = function e(t, n) {
    n === !0
      ? t.style.removeProperty(`touch-action`)
      : (t.style.touchAction =
          n === !0
            ? `auto`
            : n
            ? `pan-` + n + (Ya.isTouch ? ` pinch-zoom` : ``)
            : `none`),
      t === Qa && e(Z, n);
  },
  Ec = { auto: 1, scroll: 1 },
  Dc = function (e) {
    var t = e.event,
      n = e.target,
      r = e.axis,
      i = (t.changedTouches ? t.changedTouches[0] : t).target,
      a = i._gsap || Y.core.getCache(i),
      o = ko(),
      s;
    if (!a._isScrollT || o - a._isScrollT > 2e3) {
      for (
        ;
        i &&
        i !== Z &&
        ((i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth) ||
          !(Ec[(s = ys(i)).overflowY] || Ec[s.overflowX]));

      )
        i = i.parentNode;
      (a._isScroll =
        i &&
        i !== n &&
        !Ho(i) &&
        (Ec[(s = ys(i)).overflowY] || Ec[s.overflowX])),
        (a._isScrollT = o);
    }
    (a._isScroll || r === `x`) && (t.stopPropagation(), (t._gsapAllow = !0));
  },
  Oc = function (e, t, n, r) {
    return Ya.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: (r &&= Dc),
      onPress: r,
      onDrag: r,
      onScroll: r,
      onEnable: function () {
        return n && ks(Za, Ya.eventTypes[0], jc, !1, !0);
      },
      onDisable: function () {
        return As(Za, Ya.eventTypes[0], jc, !0);
      },
    });
  },
  kc = /(input|label|select|textarea)/i,
  Ac,
  jc = function (e) {
    var t = kc.test(e.target.tagName);
    (t || Ac) && ((e._gsapAllow = !0), (Ac = t));
  },
  Mc = function (e) {
    Qo(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      (e.type ||= `wheel,touch`),
      (e.debounce = !!e.debounce),
      (e.id = e.id || `normalizer`);
    var t = e,
      n = t.normalizeScrollX,
      r = t.momentum,
      i = t.allowNestedScroll,
      a = t.onRelease,
      o,
      s,
      c = Va(e.target) || Qa,
      l = Y.core.globals().ScrollSmoother,
      u = l && l.get(),
      d =
        bo &&
        ((e.content && Va(e.content)) ||
          (u && e.content !== !1 && !u.smooth() && u.content())),
      f = Ua(c, Ba),
      p = Ua(c, za),
      m = 1,
      h =
        (Ya.isTouch && X.visualViewport
          ? X.visualViewport.scale * X.visualViewport.width
          : X.outerWidth) / X.innerWidth,
      g = 0,
      _ = Xo(r)
        ? function () {
            return r(o);
          }
        : function () {
            return r || 2.8;
          },
      v,
      y,
      b = Oc(c, e.type, !0, i),
      x = function () {
        return (y = !1);
      },
      S = Ro,
      C = Ro,
      w = function () {
        (s = qo(c, Ba)),
          (C = no(bo ? 1 : 0, s)),
          n && (S = no(0, qo(c, za))),
          (v = $s);
      },
      T = function () {
        (d._gsap.y = zo(parseFloat(d._gsap.y) + f.offset) + `px`),
          (d.style.transform =
            `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ` +
            parseFloat(d._gsap.y) +
            `, 0, 1)`),
          (f.offset = f.cacheID = 0);
      },
      E = function () {
        if (y) {
          requestAnimationFrame(x);
          var e = zo(o.deltaY / 2),
            t = C(f.v - e);
          if (d && t !== f.v + f.offset) {
            f.offset = t - f.v;
            var n = zo((parseFloat(d && d._gsap.y) || 0) - f.offset);
            (d.style.transform =
              `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ` +
              n +
              `, 0, 1)`),
              (d._gsap.y = n + `px`),
              (f.cacheID = J.cache),
              cc();
          }
          return !0;
        }
        f.offset && T(), (y = !0);
      },
      D,
      O,
      k,
      A,
      j = function () {
        w(),
          D.isActive() &&
            D.vars.scrollY > s &&
            (f() > s ? D.progress(1) && f(s) : D.resetTo(`scrollY`, s));
      };
    return (
      d && Y.set(d, { y: `+=0` }),
      (e.ignoreCheck = function (e) {
        return (
          (bo && e.type === `touchmove` && E(e)) ||
          (m > 1.05 && e.type !== `touchstart`) ||
          o.isGesturing ||
          (e.touches && e.touches.length > 1)
        );
      }),
      (e.onPress = function () {
        y = !1;
        var e = m;
        (m = zo(((X.visualViewport && X.visualViewport.scale) || 1) / h)),
          D.pause(),
          e !== m && Tc(c, m > 1.01 ? !0 : n ? !1 : `x`),
          (O = p()),
          (k = f()),
          w(),
          (v = $s);
      }),
      (e.onRelease = e.onGestureStart =
        function (e, t) {
          if ((f.offset && T(), !t)) A.restart(!0);
          else {
            J.cache++;
            var r = _(),
              i,
              o;
            n &&
              ((i = p()),
              (o = i + (r * 0.05 * -e.velocityX) / 0.227),
              (r *= wc(p, i, o, qo(c, za))),
              (D.vars.scrollX = S(o))),
              (i = f()),
              (o = i + (r * 0.05 * -e.velocityY) / 0.227),
              (r *= wc(f, i, o, qo(c, Ba))),
              (D.vars.scrollY = C(o)),
              D.invalidate().duration(r).play(0.01),
              ((bo && D.vars.scrollY >= s) || i >= s - 1) &&
                Y.to({}, { onUpdate: j, duration: r });
          }
          a && a(e);
        }),
      (e.onWheel = function () {
        D._ts && D.pause(), ko() - g > 1e3 && ((v = 0), (g = ko()));
      }),
      (e.onChange = function (e, t, r, i, a) {
        if (
          ($s !== v && w(),
          t && n && p(S(i[2] === t ? O + (e.startX - e.x) : p() + t - i[1])),
          r)
        ) {
          f.offset && T();
          var o = a[2] === r,
            s = o ? k + e.startY - e.y : f() + r - a[1],
            c = C(s);
          o && s !== c && (k += c - s), f(c);
        }
        (r || t) && cc();
      }),
      (e.onEnable = function () {
        Tc(c, n ? !1 : `x`),
          $.addEventListener(`refresh`, j),
          ks(X, `resize`, j),
          (f.smooth &&=
            ((f.target.style.scrollBehavior = `auto`), (p.smooth = !1))),
          b.enable();
      }),
      (e.onDisable = function () {
        Tc(c, !0),
          As(X, `resize`, j),
          $.removeEventListener(`refresh`, j),
          b.kill();
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (o = new Ya(e)),
      (o.iOS = bo),
      bo && !f() && f(1),
      bo && Y.ticker.add(Ro),
      (A = o._dc),
      (D = Y.to(o, {
        ease: `power4`,
        paused: !0,
        inherit: !1,
        scrollX: n ? `+=0.1` : `+=0`,
        scrollY: `+=0.1`,
        modifiers: {
          scrollY: xc(f, f(), function () {
            return D.pause();
          }),
        },
        onUpdate: cc,
        onComplete: A.vars.onComplete,
      })),
      o
    );
  };
($.sort = function (e) {
  if (Xo(e)) return Q.sort(e);
  var t = X.pageYOffset || 0;
  return (
    $.getAll().forEach(function (e) {
      return (e._sortY = e.trigger
        ? t + e.trigger.getBoundingClientRect().top
        : e.start + X.innerHeight);
    }),
    Q.sort(
      e ||
        function (e, t) {
          return (
            (e.vars.refreshPriority || 0) * -1e6 +
            (e.vars.containerAnimation ? 1e6 : e._sortY) -
            ((t.vars.containerAnimation ? 1e6 : t._sortY) +
              (t.vars.refreshPriority || 0) * -1e6)
          );
        }
    )
  );
}),
  ($.observe = function (e) {
    return new Ya(e);
  }),
  ($.normalizeScroll = function (e) {
    if (e === void 0) return go;
    if (e === !0 && go) return go.enable();
    if (e === !1) {
      go && go.kill(), (go = e);
      return;
    }
    var t = e instanceof Ya ? e : Mc(e);
    return (
      go && go.target === t.target && go.kill(), Ho(t.target) && (go = t), t
    );
  }),
  ($.core = {
    _getVelocityProp: Wa,
    _inputObserver: Oc,
    _scrollers: J,
    _proxies: Da,
    bridge: {
      ss: function () {
        jo || qs(`scrollStart`), (jo = ko());
      },
      ref: function () {
        return ao;
      },
    },
  }),
  Vo() && Y.registerPlugin($),
  Ri.registerPlugin($, ia);
var Nc = {
    useDebugPanel: !1,
    count: parseFloat(
      getComputedStyle(
        document.querySelector(`.particle__container`)
      ).getPropertyValue(`--num-particles`)
    ),
    size: 2,
    ring_interior_edge: 0.5,
    tweened_radius_adj: 1,
    speed: 0.003,
    color1: `#deca84`,
    color2: `#ffffff`,
    bg_color: getComputedStyle(document.querySelector(`body`)).getPropertyValue(
      `--hero-bg-color`
    ),
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
      imgUrl: document.querySelector(`.hero-area__img`).src,
      threshold: 127,
    },
    debug_val: 0,
  },
  Pc = new ca(Nc),
  Fc = new sa(Pc);
Nc.useDebugPanel && (window.apostle_hero = Fc);
