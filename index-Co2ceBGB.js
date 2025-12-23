(function (e) {
  var t = Object.create,
    n = Object.defineProperty,
    r = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    a = Object.getPrototypeOf,
    o = Object.prototype.hasOwnProperty,
    s = (e, t, a, s) => {
      if ((t && typeof t == `object`) || typeof t == `function`)
        for (var c = i(t), l = 0, u = c.length, d; l < u; l++)
          (d = c[l]),
            !o.call(e, d) &&
              d !== a &&
              n(e, d, {
                get: ((e) => t[e]).bind(null, d),
                enumerable: !(s = r(t, d)) || s.enumerable,
              });
      return e;
    };
  e = ((e, r, i) => (
    (i = e == null ? {} : t(a(e))),
    s(
      r || !e || !e.__esModule
        ? n(i, `default`, { value: e, enumerable: !0 })
        : i,
      e
    )
  ))(e);
  let c = {
      createVector: (e = 0, t = 0, n = 0) => ({ x: e, y: t, z: n }),
      add: (e, t) => ({
        x: e.x + t.x,
        y: e.y + t.y,
        z: (e.z || 0) + (t.z || 0),
      }),
      sub: (e, t) => ({
        x: e.x - t.x,
        y: e.y - t.y,
        z: (e.z || 0) - (t.z || 0),
      }),
      mult: (e, t) => ({ x: e.x * t, y: e.y * t, z: (e.z || 0) * t }),
      mag: (e) => Math.sqrt(e.x * e.x + e.y * e.y + (e.z || 0) * (e.z || 0)),
      normalize: (e) => {
        let t = c.mag(e);
        return t
          ? { x: e.x / t, y: e.y / t, z: (e.z || 0) / t }
          : { x: 0, y: 0, z: 0 };
      },
      copy: (e) => ({ x: e.x, y: e.y, z: e.z || 0 }),
      dist: (e, t) => c.mag(c.sub(e, t)),
      lerp: (e, t, n) => ({
        x: e.x + (t.x - e.x) * n,
        y: e.y + (t.y - e.y) * n,
        z: (e.z || 0) + ((t.z || 0) - (e.z || 0)) * n,
      }),
      limit: (e, t) => {
        let n = c.mag(e);
        return n > t
          ? { x: (e.x / n) * t, y: (e.y / n) * t, z: ((e.z || 0) / n) * t }
          : { x: e.x, y: e.y, z: e.z || 0 };
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
      fromAngle: (e, t = 1) => ({
        x: Math.cos(e) * t,
        y: Math.sin(e) * t,
        z: 0,
      }),
      heading: (e) => Math.atan2(e.y, e.x),
    },
    l = {
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
  var u = class e {
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
  let d = {
      color(e) {
        if (e instanceof u) return e;
        if (typeof e == `object` && e)
          return new u(e.r ?? 0, e.g ?? 0, e.b ?? 0, e.a ?? 1);
        if (typeof e == `string`) {
          if (e.startsWith(`#`)) {
            let t = e.slice(1);
            return t.length === 8
              ? new u(
                  parseInt(t.slice(0, 2), 16),
                  parseInt(t.slice(2, 4), 16),
                  parseInt(t.slice(4, 6), 16),
                  parseInt(t.slice(6, 8), 16) / 255
                )
              : t.length === 3
              ? new u(
                  parseInt(t[0] + t[0], 16),
                  parseInt(t[1] + t[1], 16),
                  parseInt(t[2] + t[2], 16),
                  1
                )
              : new u(
                  (parseInt(t, 16) >> 16) & 255,
                  (parseInt(t, 16) >> 8) & 255,
                  parseInt(t, 16) & 255,
                  1
                );
          }
          let t = e.match(/[\d.]+/g);
          if (t)
            return new u(
              parseInt(t[0]),
              parseInt(t[1]),
              parseInt(t[2]),
              t[3] ? parseFloat(t[3]) : 1
            );
        }
        return new u(0, 0, 0, 1);
      },
      lerpColor(e, t, n) {
        return new u(
          (e.r + (t.r - e.r) * n) | 0,
          (e.g + (t.g - e.g) * n) | 0,
          (e.b + (t.b - e.b) * n) | 0,
          e.a + (t.a - e.a) * n
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
    f = {
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
    p = ({
      progress: e,
      inEnd: t = 0.25,
      holdEnd: n = 0.75,
      maxValue: r = 1,
      easeInFunc: i = `sine`,
      easeOutFunc: a = `sine`,
    }) => {
      let o;
      if (e <= t) {
        let n = e / t;
        o = f[a].out(n) * r;
      } else if (e < n) o = r;
      else {
        let t = (e - n) / (1 - n),
          a = f[i].in(t);
        o = r - a * r;
      }
      return o;
    };
  var m = class {
      constructor(e, t) {
        (this.idx = e),
          (this.system = t),
          (this.pointer = this.system.pointer),
          (this.size = this.system.CONFIG.size),
          (this.cnvW = this.system.cnv.width),
          (this.cnvH = this.system.cnv.height),
          (this.vel = c.createVector(0, 0)),
          (this.acc = c.createVector(0, 0)),
          (this.physics_pos = c.createVector(0, 0)),
          (this.radial_pos = c.createVector(0, 0)),
          (this.curr_pos = c.copy(this.system.center)),
          (this.start_progress = l.rand(0, 1)),
          (this.curr_progress = this.start_progress),
          (this.adjusted_progress = 0),
          (this.progress_speed = l.rand(0.9, 1)),
          (this.prev_progress = 0),
          (this.is_interacting_with_pointer = !1),
          (this.total_radius = this.system.ring_radius),
          (this.start_ang = l.rand(0, Math.PI * 2)),
          (this.ang_vel = 1),
          (this.center_dist = 0),
          (this.random_radius = l.rand(0.5, 1) * this.total_radius),
          (this.max_speed = 20),
          (this.max_force = 0.1),
          (this.silhouette_target = null);
      }
      update() {
        this.update_progress(),
          this.prev_progress > this.curr_progress &&
            ((this.curr_pos = c.copy(this.system.center)),
            (this.physics_pos = c.mult(this.physics_pos, 0)),
            (this.vel = c.mult(this.vel, 0)),
            (this.acc = c.mult(this.acc, 0)),
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
          (this.curr_pos = c.add(this.radial_pos, this.physics_pos));
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
        (this.vel = c.add(this.vel, this.acc)),
          (this.physics_pos = c.add(this.physics_pos, this.vel)),
          (this.acc = c.mult(this.acc, 0));
      }
      apply_force(e) {
        this.acc = c.add(this.acc, e);
      }
      pointer_interaction({
        activate_edge: e = 100,
        strength: t = 0.2,
        action: n = `attract`,
      }) {
        let r = c.sub(this.pointer.pos, this.curr_pos);
        if (c.mag(r) < e) {
          this.is_interacting_with_pointer = !0;
          let e = c.normalize(r),
            i = c.mult(e, t);
          if (n === `attract`) this.apply_force(i);
          else if (n === `repel`) {
            let e = c.mult(i, -1);
            this.apply_force(e);
          }
        } else this.is_interacting_with_pointer = !1;
      }
      seek_arrive({ target_vec: e, range: t = 350 }) {
        let n = c.sub(e, this.curr_pos),
          r = c.mag(n);
        if (r < t) {
          let e = l.map(r, 0, t, 0, this.max_speed);
          (n = c.normalize(n)), (n = c.mult(n, e));
        } else (n = c.normalize(n)), (n = c.mult(n, this.max_speed));
        let i = c.sub(n, this.vel);
        return (i = c.limit(i, this.max_force)), i;
      }
      calculate_blended_forces() {
        let e = this.system.CONFIG.silhouette_blend,
          t = this.seek_arrive({ target_vec: this.radial_pos }),
          n = c.createVector(0, 0);
        this.system.silhouette_bounds &&
          this.silhouette_target &&
          (n = this.seek_arrive({ target_vec: this.silhouette_target }));
        let r = c.lerp(t, n, e);
        this.apply_force(r), this.apply_edge_steering();
      }
      radial_motion() {
        let e = f[this.system.CONFIG.radial_ease_type][
            this.system.CONFIG.radial_ease_direction
          ](this.curr_progress),
          t = this.system.CONFIG.radial_ease_strength || 1,
          n = this.curr_progress * (1 - t) + e * t,
          r = this.system.frameCount * this.system.CONFIG.spin,
          i = this.start_ang + r,
          a = this.total_radius * this.system.CONFIG.ring_interior_edge;
        a *= this.system.CONFIG.tweened_radius_adj;
        let o = l.map(n, 0, 1, a, this.total_radius);
        (this.radial_pos.x = Math.cos(i) * o + this.system.center.x),
          (this.radial_pos.y = Math.sin(i) * o + this.system.center.y);
      }
      handle_boundary_collision() {
        if (
          !this.system.silhouette_bounds ||
          this.system.CONFIG.silhouette_blend <= 0
        )
          return;
        let e = c.add(this.curr_pos, this.vel);
        this.system.silhouette_bounds.isInsideBoundary(e.x, e.y) ||
          ((this.vel = c.mult(this.vel, -0.5)),
          (this.vel.x += l.rand(-0.5, 0.5)),
          (this.vel.y += l.rand(-0.5, 0.5)));
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
          let t = this.system.silhouette_bounds.getEdgeNormal(
              this.curr_pos.x,
              this.curr_pos.y
            ),
            n = l.map(e, -1, 0, 0, 1),
            r = l.clamp(0, n, 1),
            i = this.system.CONFIG.edge_steering_strength,
            a = { x: t.x * r * i, y: t.y * r * i };
          this.apply_force(a);
        }
      }
      calculate_size() {
        let e = p({
            progress: this.curr_progress,
            inEnd: 0.1,
            holdEnd: 0.65,
            maxValue: 1,
            easeInFunc: `circ`,
            easeOutFunc: `sine`,
          }),
          t = c.mag(c.mult(this.vel, 2)),
          n = l.map(t, 0.01, this.max_speed, 1, this.system.CONFIG.size * 1.5);
        (this.size = this.system.CONFIG.size * e * n),
          (this.size = l.clamp(0.1, this.size, this.system.CONFIG.size * 5));
      }
      calculate_color() {
        (this.color = d.lerpColor(
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
    h = class {
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
            this.validPoints[
              Math.floor(Math.random() * this.validPoints.length)
            ],
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
        (this.canvasWidth = e),
          (this.canvasHeight = t),
          this.updateImageBounds();
      }
    },
    g = class {
      constructor(e, t, n, r, i = null) {
        (this.particles = []),
          (this.cnv = e),
          (this.cnv_container = this.cnv.parentElement),
          (this.CONFIG = n),
          (this.pointer = r),
          (this.particle_positioner = t),
          (this.pp_dims = this.particle_positioner.getBoundingClientRect()),
          (this.ring_interior_edge = this.CONFIG.ring_interior_edge),
          (this.ctx = this.cnv.getContext(`2d`)),
          (this.center = c.createVector()),
          (this.frameCount = 0),
          (this.silhouetteConfig = i),
          (this.silhouette_bounds = null),
          (this.ready = this.init()),
          (this.introDone = !1),
          (this.introStarted = !1),
          this.updateColors();
      }
      updateColors() {
        (this.bgColor = d.color(this.CONFIG.bg_color)),
          this.bgColor.modA(this.CONFIG.bg_color_alpha),
          (this.bgColor = this.bgColor.toRGBA()),
          (this.color1 = d.color(this.CONFIG.color1)),
          (this.color2 = d.color(this.CONFIG.color2));
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
        let e = this.ring_center ? c.copy(this.ring_center) : null;
        this.ring_center = c.createVector(
          this.pp_dims.left + this.pp_dims.width / 2,
          this.pp_dims.top + this.pp_dims.height / 2
        );
        let t = !this.center.x && !this.center.y,
          n = e && c.dist(e, this.ring_center) > 50;
        (t || n) && (this.center = c.copy(this.ring_center)),
          this.silhouette_bounds &&
            this.silhouette_bounds.updateCanvasDims(
              this.cnv.width,
              this.cnv.height
            );
      }
      setParticleSize() {
        for (let e of this.particles) e.size = l.rand(0.1, this.CONFIG.size);
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
          ((this.silhouette_bounds = new h(e)),
          await this.silhouette_bounds.ready),
          (this.introStarted = !0);
      }
      systemIntro() {
        if (this.introStarted && !this.introDone)
          if (this.particles.length < this.CONFIG.count) {
            for (let e = 0; e < 50; e++)
              this.particles.push(
                new m(
                  this.particles.length - 1,
                  this,
                  this.CONFIG,
                  this.pointer
                )
              );
            this.particles.push(
              new m(this.particles.length - 1, this, this.CONFIG, this.pointer)
            );
          } else this.introDone = !1;
      }
      update(e) {
        (this.frameCount = e), this.systemIntro();
        let t;
        if (this.silhouette_bounds && this.CONFIG.silhouette_blend > 0) {
          let e = this.silhouette_bounds.getCenter();
          t = c.lerp(
            this.ring_center,
            c.createVector(e.x, e.y),
            this.CONFIG.silhouette_blend
          );
        } else t = c.copy(this.ring_center);
        this.center = c.lerp(this.center, t, 0.01);
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
    _ = class e {
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
          this.domElement.addEventListener(`keydown`, (e) =>
            e.stopPropagation()
          ),
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
          this._onChange !== void 0 &&
            this._onChange.call(this, this.getValue()),
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
        return (
          this.setValue(this.initialValue), this._callOnFinishChange(), this
        );
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
    v = class extends _ {
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
  function y(e) {
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
  var b = {
      isPrimitive: !0,
      match: (e) => typeof e == `string`,
      fromHexString: y,
      toHexString: y,
    },
    x = {
      isPrimitive: !0,
      match: (e) => typeof e == `number`,
      fromHexString: (e) => parseInt(e.substring(1), 16),
      toHexString: (e) => `#` + e.toString(16).padStart(6, 0),
    },
    S = [
      b,
      x,
      {
        isPrimitive: !1,
        match: (e) => Array.isArray(e) || ArrayBuffer.isView(e),
        fromHexString(e, t, n = 1) {
          let r = x.fromHexString(e);
          (t[0] = (((r >> 16) & 255) / 255) * n),
            (t[1] = (((r >> 8) & 255) / 255) * n),
            (t[2] = ((r & 255) / 255) * n);
        },
        toHexString([e, t, n], r = 1) {
          r = 255 / r;
          let i = ((e * r) << 16) ^ ((t * r) << 8) ^ ((n * r) << 0);
          return x.toHexString(i);
        },
      },
      {
        isPrimitive: !1,
        match: (e) => Object(e) === e,
        fromHexString(e, t, n = 1) {
          let r = x.fromHexString(e);
          (t.r = (((r >> 16) & 255) / 255) * n),
            (t.g = (((r >> 8) & 255) / 255) * n),
            (t.b = ((r & 255) / 255) * n);
        },
        toHexString({ r: e, g: t, b: n }, r = 1) {
          r = 255 / r;
          let i = ((e * r) << 16) ^ ((t * r) << 8) ^ ((n * r) << 0);
          return x.toHexString(i);
        },
      },
    ];
  function C(e) {
    return S.find((t) => t.match(e));
  }
  var w = class extends _ {
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
          (this._format = C(this.initialValue)),
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
            let e = y(this.$text.value);
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
    T = class extends _ {
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
          this.$button.addEventListener(`touchstart`, () => {}, {
            passive: !0,
          }),
          (this.$disable = this.$button);
      }
    },
    E = class extends _ {
      constructor(e, t, n, r, i, a) {
        super(e, t, n, `lil-number`),
          this._initInput(),
          this.min(r),
          this.max(i);
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
                (e.preventDefault(),
                t(this._step * this._arrowKeyMultiplier(e))),
              e.code === `ArrowDown` &&
                (e.preventDefault(),
                t(this._step * this._arrowKeyMultiplier(e) * -1));
          },
          r = (e) => {
            this._inputFocused &&
              (e.preventDefault(),
              t(this._step * this._normalizeMouseWheel(e)));
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
        return this._hasMin && this._hasMax
          ? (this._max - this._min) / 1e3
          : 0.1;
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
    D = class extends _ {
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
    O = class extends _ {
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
    k = `.lil-gui {
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
  function A(e) {
    let t = document.createElement(`style`);
    t.innerHTML = e;
    let n = document.querySelector(`head link[rel=stylesheet], head style`);
    n ? document.head.insertBefore(t, n) : document.head.appendChild(t);
  }
  var j = !1,
    M = class e {
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
          !j && o && (A(k), (j = !0)),
          n
            ? n.appendChild(this.domElement)
            : t &&
              (this.domElement.classList.add(`lil-auto-place`, `autoPlace`),
              document.body.appendChild(this.domElement)),
          r && this.domElement.style.setProperty(`--width`, r + `px`),
          (this._closeFolders = a);
      }
      add(e, t, n, r, i) {
        if (Object(n) === n) return new D(this, e, t, n);
        let a = e[t];
        switch (typeof a) {
          case `number`:
            return new E(this, e, t, n, r, i);
          case `boolean`:
            return new v(this, e, t);
          case `string`:
            return new O(this, e, t);
          case `function`:
            return new T(this, e, t);
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
        return new w(this, e, t, n);
      }
      addFolder(t) {
        let n = new e({ parent: this, title: t });
        return this.root._closeFolders && n.close(), n;
      }
      load(e, t = !0) {
        return (
          e.controllers &&
            this.controllers.forEach((t) => {
              t instanceof T ||
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
            if (!(e instanceof T)) {
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
  function N(e, t, n) {
    let r = new M({ title: `Debug Panel` }),
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
  /*!
   * SplitText 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
   * @author: Jack Doyle
   */
  var P,
    F,
    I,
    L = () => I || Q.register(window.gsap),
    R = typeof Intl < `u` ? new Intl.Segmenter() : 0,
    z = (e) =>
      typeof e == `string`
        ? z(document.querySelectorAll(e))
        : `length` in e
        ? Array.from(e)
        : [e],
    B = (e) => z(e).filter((e) => e instanceof HTMLElement),
    V = [],
    H = function () {},
    U = /\s+/g,
    W = RegExp(
      `\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.`,
      `gu`
    ),
    G = { left: 0, top: 0, width: 0, height: 0 },
    K = (e, t) => {
      if (t) {
        let n = new Set(e.join(``).match(t) || V),
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
    q = (e) =>
      window.getComputedStyle(e).display === `inline` &&
      (e.style.display = `inline-block`),
    J = (e, t, n) =>
      t.insertBefore(typeof e == `string` ? document.createTextNode(e) : e, n),
    Y = (e, t, n) => {
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
    ee = (e, t, n, r) => {
      let i = Y(`line`, n, r),
        a = window.getComputedStyle(e).textAlign || `left`;
      return (n, r) => {
        let o = i(``);
        for (o.style.textAlign = a, e.insertBefore(o, t[n]); n < r; n++)
          o.appendChild(t[n]);
        o.normalize();
      };
    },
    X = (e, t, n, r, i, a, o, s, c, l) => {
      var u;
      let d = Array.from(e.childNodes),
        f = 0,
        { wordDelimiter: p, reduceWhiteSpace: m = !0, prepareText: h } = t,
        g = e.getBoundingClientRect(),
        _ = g,
        v =
          !m && window.getComputedStyle(e).whiteSpace.substring(0, 3) === `pre`,
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
        L,
        z;
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
                ? (F = F.replace(U, ` `))
                : v &&
                  (F = F.replace(
                    /\n/g,
                    S +
                      `
`
                  )),
              h && (F = h(F, e)),
              w.textContent = F,
              T = S || C ? F.split(C || S) : F.match(s) || V,
              L = T[T.length - 1],
              O = x ? L.slice(-1) === ` ` : !L,
              L || T.pop(),
              _ = g,
              D = x ? T[0].charAt(0) === ` ` : !T[0],
              D && J(` `, e, w),
              T[0] || T.shift(),
              K(T, c),
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
                J(document.createElement(`br`), e, w),
                (I = I.slice(1))),
              !m && I === ``)
            )
              J(S, e, w);
            else if (I === ` `) e.insertBefore(document.createTextNode(` `), w);
            else {
              if (
                (x && I.charAt(0) === ` ` && J(` `, e, w),
                y && k === 1 && !D && b.indexOf(y.parentNode) > -1
                  ? ((E = b[b.length - 1]),
                    E.appendChild(document.createTextNode(r ? `` : I)))
                  : ((E = n(r ? `` : I)),
                    J(E, e, w),
                    y && k === 1 && !D && E.insertBefore(y, E.firstChild)),
                r)
              )
                for (
                  j = R
                    ? K(
                        [...R.segment(I)].map((e) => e.segment),
                        c
                      )
                    : I.match(s) || V,
                    z = 0;
                  z < j.length;
                  z++
                )
                  E.appendChild(
                    j[z] === ` ` ? document.createTextNode(` `) : r(j[z])
                  );
              if (a && l) {
                if (
                  ((F = w.textContent = F.substring(I.length + 1, F.length)),
                  (A = E.getBoundingClientRect()),
                  A.top > _.top && A.left <= _.left)
                ) {
                  for (M = e.cloneNode(), N = e.childNodes[0]; N && N !== E; )
                    (P = N), (N = N.nextSibling), M.appendChild(P);
                  e.parentNode.insertBefore(M, e), i && q(M);
                }
                _ = A;
              }
              (k < T.length || O) &&
                J(
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
              : (X(w, t, n, r, i, a, o, s, c, !0), (y = 0)),
            i && q(w));
    },
    Z = class e {
      constructor(e, t) {
        (this.isSplit = !1),
          L(),
          (this.elements = B(e)),
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
          H(this),
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
          m = p ? RegExp(p.source + `|` + W.source, `gu`) : W,
          h = !!e.ignore && B(e.ignore),
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
                _ = u ? Y(`char`, e, o) : null,
                v = Y(`word`, e, s),
                y,
                b,
                x,
                S;
              if ((X(t, e, v, _, f, r && (l || f), h, m, p, !1), l)) {
                let n = z(t.childNodes),
                  r = ee(t, n, e, c),
                  i,
                  a = [],
                  o = 0,
                  s = n.map((e) =>
                    e.nodeType === 1 ? e.getBoundingClientRect() : G
                  ),
                  l = G;
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
                o < y && r(o, y),
                  a.forEach((e) => e.parentNode?.removeChild(e));
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
              this.lines.push(...c),
                this.words.push(...s),
                this.chars.push(...o);
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
          F &&
            (o
              ? F.addEventListener(`loadingdone`, this._split)
              : F.status === `loading` &&
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
          F?.removeEventListener(`loadingdone`, this._split),
          r && ((this._data.animTime = r.totalTime()), r.revert()),
          (t = (e = this.vars).onRevert) == null || t.call(e, this),
          this
        );
      }
      static create(t, n) {
        return new e(t, n);
      }
      static register(e) {
        (P = P || e || window.gsap),
          P && ((z = P.utils.toArray), (H = P.core.context || H)),
          !I && window.innerWidth > 0 && ((F = document.fonts), (I = !0));
      }
    };
  Z.version = `3.13.0`;
  var Q = Z,
    te = class {
      constructor(e, t = {}) {
        (this.gsap_ctx = null), (this.config = e), (this.callbacks = t);
      }
      async init() {
        await document.fonts.ready,
          (this.gsap_ctx = e.default.context(() => {
            this.createArrowTimeline(),
              this.createIntroAnimation(),
              this.createScrollTriggerAnimation();
          }));
      }
      createIntroAnimation() {
        let t = document.querySelector(`.hero-anim-sections__arrow-line`),
          n = 0;
        t && (n = parseFloat(getComputedStyle(t).getPropertyValue(`--len`)));
        let r = document.querySelector(
            `.hero-anim-sections__arrow-head--right`
          ),
          i = r ? r.getTotalLength() : 0,
          a = document.querySelector(`.hero-anim-sections__arrow-head--left`),
          o = a ? a.getTotalLength() : 0;
        (this.soulTextSplit = new Q(`.hero-area__text--soul`, {
          type: `chars`,
        })),
          e.default
            .timeline()
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
              { strokeDashoffset: n, duration: 0.75, ease: `circ.out` },
              `+=.25`
            )
            .from(
              `.hero-anim-sections__arrow-head--right`,
              { strokeDashoffset: i, duration: 0.5, ease: `expo.inOut` },
              `>-.3`
            )
            .from(
              `.hero-anim-sections__arrow-head--left`,
              { strokeDashoffset: o, duration: 0.5, ease: `expo.inOut` },
              `<`
            )
            .add(() => this.arrow_loop_tl.play(), `+=2`);
      }
      createArrowTimeline() {
        this.arrow_loop_tl = e.default
          .timeline({ paused: !0, repeat: -1, yoyo: !0 })
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
        let t = new Q(`.meaning-area__text`, { type: `words,chars` }).chars;
        e.default
          .timeline({
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
            [`.meaning-area__heading`, t],
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
          .to([`.meaning-area__heading`, t], {
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
    ne = class {
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
    re = class {
      constructor(e) {
        (this.configManager = e),
          (this.CONFIG = this.configManager.get()),
          (this.pointer = {
            vel: 0,
            pos: c.createVector(),
            last: c.createVector(),
            norm: c.createVector(),
            cent: c.createVector(),
            centNorm: c.createVector(),
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
          (this.resizeDebouncer = new ne(250)),
          (this.ready = this.init()),
          (this.start_debug_manager_closed = !0);
      }
      async init() {
        let e = this.CONFIG.silhouetteConfig || null;
        (this.particle_system = new g(
          document.getElementById(`particle__canvas`),
          document.querySelector(`.hero-area__ps-positioner`),
          this.CONFIG,
          this.pointer,
          e
        )),
          await this.particle_system.ready,
          this.setupEventListeners(),
          (this.scrollAnimation = new te(this.CONFIG, {
            onRefresh: () => this.particle_system.sizeCanvas(),
          })),
          await this.scrollAnimation.init(),
          this.CONFIG.useDebugPanel &&
            ((this.debugPanel = N(
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
              (this.pointer.centNorm.x =
                this.pointer.cent.x / window.innerWidth),
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
        let e = (t) => {
          if (!this.isAnimating) return;
          let n = t - this.lastFrameTime;
          if (
            ((this.lastFrameTime = t),
            (this.accumulator += Math.min(n, 100)),
            this.heroAreaInView)
          ) {
            for (
              this.pointer.vel = c.dist(this.pointer.last, this.pointer.pos),
                this.pointer.last = c.copy(this.pointer.pos);
              this.accumulator >= this.TIMESTEP;

            )
              this.particle_system.update(this.frameCount),
                this.frameCount++,
                (this.accumulator -= this.TIMESTEP);
            this.particle_system.draw();
          }
          this.rafId = requestAnimationFrame(e);
        };
        this.rafId = requestAnimationFrame(e);
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
    ie = class {
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
  e.default.registerPlugin(Q);
  var ae = document.querySelector(`.particle__container`),
    oe = document.querySelector(`body`),
    $ = (e, t, n) => {
      if (e)
        try {
          let n = getComputedStyle(e).getPropertyValue(t).trim();
          return t === `--num-particles` ? parseFloat(n) : n;
        } catch (e) {
          console.error(`Error reading computed style for ${t}:`, e);
        }
      return n;
    },
    se = {
      useDebugPanel: !1,
      count: $(ae, `--num-particles`, 500),
      bg_color: $(oe, `--hero-bg-color`, `#000000`),
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
    ce = new ie(se);
  window.apostle_hero = new re(ce);
})(gsap);
