class NeuralPipeline {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.beams = [];
    this.mouse = { x: 0.5, y: 0.5 };
    this.rotation = 0;
    this.time = 0;
    this.dpr = 1;
    this.bounds = null;
    this.running = true;
    this._destroyed = false;
    this.init();
  }

  init() {
    this.resize();
    this.createTopology();
    this.bindEvents();
    this.initObserver();
    this.animate();
  }

  initObserver() {
    if ('IntersectionObserver' in window) {
      this._observer = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          this.running = true;
          this.animate();
        } else {
          this.running = false;
        }
      }.bind(this), { threshold: 0 });
      this._observer.observe(this.canvas);
    }
  }

  resize() {
    var rect = this.canvas.parentElement.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;
    if (w === 0 || h === 0) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.bounds = { cx: w / 2, cy: h / 2, w: w, h: h };
  }

  project(x, y, z) {
    var fov = 500;
    var s = fov / (fov + z);
    return {
      x: this.bounds.cx + (x - this.bounds.cx) * s,
      y: this.bounds.cy + (y - this.bounds.cy) * s,
      z: z,
      s: s
    };
  }

  createTopology() {
    var m = this.bounds.w < 768;
    var spread = Math.min(this.bounds.w * 0.35, 340);
    var height = Math.min(this.bounds.h * 0.28, 220);
    var depth = 300;
    var cols = m ? 2 : 4, rows = m ? 2 : 3;

    var layers = [
      { z: -depth * 0.44, color: '#E4582C' },
      { z: -depth * 0.22, color: '#A9F600' },
      { z: 0,             color: '#E4582C' },
      { z: depth * 0.22,  color: '#A9F600' },
      { z: depth * 0.44,  color: '#E4582C' }
    ];

    var npl = cols * rows;
    for (var li = 0; li < layers.length; li++) {
      var ly = layers[li];
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = (c / (cols - 1 || 1) - 0.5) * spread * 2 + (Math.random() - 0.5) * 6;
          var y = (r / (rows - 1 || 1) - 0.5) * height * 1.8 + (Math.random() - 0.5) * 6;
          var z = ly.z + (Math.random() - 0.5) * 8;
          var flowPhase = Math.random() * Math.PI * 2;
          this.nodes.push({
            x: x, y: y, z: z,
            baseX: x, baseY: y, baseZ: z,
            vx: 0, vy: 0, vz: 0,
            color: ly.color,
            radius: 3.5 + Math.random() * 2,
            pulsePhase: li * 0.8 + Math.random() * 2,
            pulseSpeed: 0.2 + Math.random() * 0.3,
            flowPhase: flowPhase,
            layerIdx: li
          });
        }
      }
    }

    for (var li = 0; li < layers.length - 1; li++) {
      for (var i = 0; i < npl; i++) {
        var fromNode = this.nodes[li * npl + i];
        var toNode = this.nodes[(li + 1) * npl + Math.floor(Math.random() * npl)];
        this.edges.push({ from: fromNode, to: toNode, color: layers[li].color });
      }
    }
    for (var i = 0; i < npl; i++) {
      var fromNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      var toNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      if (fromNode !== toNode) this.edges.push({ from: fromNode, to: toNode, color: 'rgba(255,255,255,0.06)' });
    }

    for (var li = 0; li < layers.length - 1; li++) {
      var a = this.nodes.slice(li * npl, (li + 1) * npl);
      var b = this.nodes.slice((li + 1) * npl, (li + 2) * npl);
      var caX = 0, caY = 0;
      for (var i = 0; i < a.length; i++) { caX += a[i].baseX; caY += a[i].baseY; }
      var cbX = 0, cbY = 0;
      for (var i = 0; i < b.length; i++) { cbX += b[i].baseX; cbY += b[i].baseY; }
      this.beams.push({
        from: { x: caX / a.length, y: caY / a.length, z: a[0].baseZ },
        to: { x: cbX / b.length, y: cbY / b.length, z: b[0].baseZ },
        color: layers[li].color
      });
    }

  }

  bindEvents() {
    window.addEventListener('mousemove', function (e) {
      var r = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - r.left) / r.width;
      this.mouse.y = (e.clientY - r.top) / r.height;
    }.bind(this), { passive: true });
    window.addEventListener('resize', function () { this.resize(); }.bind(this), { passive: true });
  }

  animate() {
    if (!this.running || this._destroyed) return;
    this.time++;
    var ctx = this.ctx;
    var w = this.bounds.w;
    var h = this.bounds.h;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    this.rotation += 0.0004;
    var c = Math.cos(this.rotation);
    var s = Math.sin(this.rotation);

    var stiffness = 0.06;
    var damping = 0.78;
    var cursorRadius = 80;
    var cursorForce = 0.8;
    var flowAmp = 3;

    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];
      var flowX = Math.sin(this.time * 0.002 + n.flowPhase) * flowAmp;
      var flowY = Math.cos(this.time * 0.0025 + n.flowPhase * 0.7) * flowAmp * 0.4;

      var rx = n.x * c - n.z * s;
      var rz = n.x * s + n.z * c;
      var sp = this.project(rx, n.y, rz);
      var dx = sp.x - this.mouse.x * w;
      var dy = sp.y - this.mouse.y * h;
      var dist = Math.sqrt(dx * dx + dy * dy);

      n.vx += (n.baseX + flowX - n.x) * stiffness;
      n.vy += (n.baseY + flowY - n.y) * stiffness;
      n.vz += (n.baseZ - n.z) * stiffness;

      if (dist < cursorRadius && dist > 0) {
        var f = (1 - dist / cursorRadius) * cursorForce;
        var invCos = Math.cos(-this.rotation);
        var invSin = Math.sin(-this.rotation);
        var norm = Math.sqrt(dx * dx + dy * dy) || 1;
        var pushX = (dx / norm) * f * 0.4;
        var pushY = (dy / norm) * f * 0.4;
        n.vx -= pushX * invCos;
        n.vz -= pushX * invSin;
        n.vy -= pushY;
      }

      n.vx *= damping;
      n.vy *= damping;
      n.vz *= damping;

      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
    }

    var projected = [];
    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];
      var rx = n.x * c - n.z * s;
      var rz = n.x * s + n.z * c;
      var p = this.project(rx, n.y, rz);
      projected.push({ x: p.x, y: p.y, z: p.z, s: p.s, node: n });
    }
    projected.sort(function (a, b) { return a.z - b.z; });

    var projMap = new Map();
    for (var i = 0; i < projected.length; i++) {
      projMap.set(projected[i].node, projected[i]);
    }

    var minZ = projected[0] ? projected[0].z : 0;
    var maxZ = projected[projected.length - 1] ? projected[projected.length - 1].z : 1;
    var zRange = maxZ - minZ || 1;

    var avgY = 0;
    for (var i = 0; i < projected.length; i++) { avgY += projected[i].y; }
    avgY = avgY / projected.length + 80;

    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 0.5;
    var gridSize = 100, gridLines = 7;
    var gcx = this.bounds.cx;
    for (var gi = -gridLines; gi <= gridLines; gi++) {
      var gx = gcx + gi * gridSize - 200, gz = 400;
      var p1 = this.project(gx * c - (-gz) * s, avgY, gx * s + (-gz) * c);
      var p2 = this.project(gx * c - gz * s, avgY, gx * s + gz * c);
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      var gy = gcx + gi * gridSize - 200;
      var p3 = this.project((-gz) * c - gy * s, avgY, (-gz) * s + gy * c);
      var p4 = this.project(gz * c - gy * s, avgY, gz * s + gy * c);
      ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
    }

    for (var bi = 0; bi < this.beams.length; bi++) {
      var b = this.beams[bi];
      var bp1 = this.project(b.from.x * c - b.from.z * s, b.from.y, b.from.x * s + b.from.z * c);
      var bp2 = this.project(b.to.x * c - b.to.z * s, b.to.y, b.to.x * s + b.to.z * c);
      var pulse = Math.sin(this.time * 0.015 + bi) * 0.3 + 0.7;
      ctx.strokeStyle = b.color;
      ctx.globalAlpha = 0.05 * pulse;
      ctx.lineWidth = 2.5 * pulse;
      ctx.beginPath(); ctx.moveTo(bp1.x, bp1.y); ctx.lineTo(bp2.x, bp2.y); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    var edgeMaxDist = Math.min(w, h) * 0.35;
    for (var ei = 0; ei < this.edges.length; ei++) {
      var edge = this.edges[ei];
      var fp = projMap.get(edge.from);
      var tp = projMap.get(edge.to);
      if (fp && tp) {
        var edx = fp.x - tp.x;
        var edy = fp.y - tp.y;
        var edgeDist = Math.sqrt(edx * edx + edy * edy);
        var edgeAlpha = 1 - Math.min(edgeDist / edgeMaxDist, 1);
        if (edgeAlpha > 0.02) {
          ctx.strokeStyle = edge.color;
          ctx.globalAlpha = edgeAlpha * 0.35;
          ctx.lineWidth = 0.4 + edgeAlpha * 0.4;
          ctx.beginPath(); ctx.moveTo(fp.x, fp.y); ctx.lineTo(tp.x, tp.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = 'source-over';
    for (var ni = 0; ni < projected.length; ni++) {
      var pj = projected[ni];
      var pulse = Math.sin(this.time * 0.025 * pj.node.pulseSpeed + pj.node.pulsePhase) * 0.2 + 0.8;
      var rad = pj.node.radius * pj.s * pulse;
      var df = 1 - (pj.z - minZ) / zRange;
      ctx.beginPath(); ctx.arc(pj.x, pj.y, rad * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = pj.node.color; ctx.globalAlpha = 0.035 * df; ctx.fill();
      ctx.beginPath(); ctx.arc(pj.x, pj.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = '#121212'; ctx.globalAlpha = 1; ctx.fill();
      ctx.strokeStyle = pj.node.color; ctx.lineWidth = (1.2 + df) * pj.s;
      ctx.globalAlpha = 0.35 + 0.65 * df; ctx.stroke();
      ctx.beginPath(); ctx.arc(pj.x, pj.y, rad * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = pj.node.color; ctx.globalAlpha = 0.5 * pulse * df; ctx.fill();
      ctx.globalAlpha = 1;
    }

    var labels = ['EDGE', 'LB', 'GPU', 'CACHE', 'EGRESS'];
    var nPerLabel = this.nodes.length / labels.length;
    for (var li = 0; li < labels.length; li++) {
      var idx = Math.floor(li * nPerLabel + nPerLabel / 2);
      if (idx < this.nodes.length) {
        var lp = projMap.get(this.nodes[idx]);
        if (lp) {
          var ldf = 1 - (lp.z - minZ) / zRange;
          ctx.font = Math.round(7 + 3 * ldf) + 'px "Orbitron",sans-serif';
          ctx.fillStyle = lp.node.color;
          ctx.globalAlpha = 0.12 + 0.2 * ldf;
          ctx.textAlign = 'center';
          ctx.fillText(labels[li], lp.x, lp.y - lp.node.radius * lp.s * 2.5 - 6);
          ctx.globalAlpha = 1;
        }
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    var self = this;
    this._raf = requestAnimationFrame(function () { self.animate(); });
  }

  destroy() {
    this.running = false;
    this._destroyed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._observer) this._observer.disconnect();
  }
}
