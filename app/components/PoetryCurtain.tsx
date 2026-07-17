"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  baseX: number;
  baseY: number;
  restLength: number;
  t: number;
  pinned: boolean;
};

type Strand = {
  points: Point[];
  offset: number;
  fontSize: number;
  alpha: number;
  phase: number;
};

const poetryWords = [
  "gió",
  "qua",
  "miền",
  "đá",
  "sóng",
  "kể",
  "chuyện",
  "làng",
  "chuông",
  "chùa",
  "ngân",
  "sớm",
  "biển",
  "ôm",
  "bờ",
  "cát",
  "trăng",
  "nghiêng",
  "mái",
  "ngói",
  "nắng",
  "đậu",
  "hiên",
  "xưa",
  "mặn",
  "mà",
  "hương",
  "quê",
  "người",
  "về",
  "Cổ",
  "Thạch",
  "nhớ",
  "một",
  "bình",
  "minh",
  "khói",
  "lam",
  "dừng",
  "giữa",
  "gió",
  "đường",
  "xa",
  "vẫn",
  "gọi",
  "tên",
  "nhà",
];

const calligraphyFont =
  '"Style Script", "Apple Chancery", "Segoe Script", "Noto Sans", cursive';
const solemnInkColor = "#324640";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const seeded = (index: number, salt = 1) => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export default function PoetryCurtain() {
  const shellRef = useRef<HTMLDivElement>(null);
  const roofRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gustRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const shell = shellRef.current;
    const roof = roofRef.current;
    const canvas = canvasRef.current;
    if (!shell || !roof || !canvas) return;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      active: false,
      lastMove: 0,
    };

    let width = 1;
    let height = 1;
    let dpr = 1;
    let strands: Strand[] = [];
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let disposed = false;
    let resizeFrame = 0;
    let windEnergy = reducedMotion ? 0 : 0.4;
    let windDirection = 1;

    const buildCurtain = () => {
      const shellRect = shell.getBoundingClientRect();
      const roofRect = roof.getBoundingClientRect();
      width = Math.max(1, shellRect.width);
      height = Math.max(1, shellRect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.2 : 1.45);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;

      const roofLeft = roofRect.left - shellRect.left;
      const roofBottom = roofRect.bottom - shellRect.top;
      const anchorLeft = clamp(
        roofLeft + roofRect.width * 0.075,
        width * 0.035,
        width * 0.18,
      );
      const anchorRight = clamp(
        roofLeft + roofRect.width * 0.925,
        width * 0.82,
        width * 0.965,
      );
      const anchorY = clamp(roofBottom - roofRect.height * 0.105, 128, height * 0.52);
      const strandCount = width < 520 ? 17 : width < 820 ? 24 : 34;
      const usableHeight = Math.max(220, height - anchorY - 22);
      const pointCount = clamp(Math.round(usableHeight / 27), 11, 21);

      strands = Array.from({ length: strandCount }, (_, strandIndex) => {
        const normalized = strandIndex / Math.max(1, strandCount - 1);
        const centerOffset = normalized - 0.5;
        const anchorX = anchorLeft + normalized * (anchorRight - anchorLeft);
        const lengthScale = 0.78 + seeded(strandIndex, 4) * 0.2;
        const points: Point[] = [];

        for (let pointIndex = 0; pointIndex < pointCount; pointIndex += 1) {
          const t = pointIndex / Math.max(1, pointCount - 1);
          const fan = centerOffset * 28 * Math.pow(t, 1.35);
          const wave =
            Math.sin(t * Math.PI * 1.4 + seeded(strandIndex, 7) * 5) *
            (seeded(strandIndex, 8) - 0.5) *
            8 *
            t;
          const baseX = anchorX + fan + wave;
          const baseY =
            anchorY +
            t * usableHeight * lengthScale +
            Math.pow(Math.abs(centerOffset) * 2, 1.4) * 13 * t;
          const previous = points[pointIndex - 1];

          points.push({
            x: baseX,
            y: baseY,
            oldX: baseX,
            oldY: baseY,
            baseX,
            baseY,
            restLength: previous
              ? Math.hypot(baseX - previous.baseX, baseY - previous.baseY)
              : 0,
            t,
            pinned: pointIndex === 0,
          });
        }

        return {
          points,
          offset: Math.floor(seeded(strandIndex, 12) * poetryWords.length),
          fontSize:
            width < 520
              ? 13
              : Math.round(14 + seeded(strandIndex, 14) * 4),
          alpha: 0.6 + seeded(strandIndex, 15) * 0.25,
          phase: seeded(strandIndex, 16) * Math.PI * 2,
        };
      });
    };

    const applyPointer = (point: Point, now: number) => {
      if (!pointer.active || now - pointer.lastMove > 850) return;
      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const radius = width < 700 ? 82 : 118;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared <= 0.1 || distanceSquared >= radius * radius) return;

      const distance = Math.sqrt(distanceSquared);
      const falloff = Math.pow(1 - distance / radius, 2);
      const depth = 0.35 + point.t * 0.9;
      point.x +=
        ((dx / distance) * 13 + pointer.vx * 0.92) * falloff * depth;
      point.y +=
        ((dy / distance) * 3.2 + pointer.vy * 0.28) * falloff * depth;
    };

    const simulate = (now: number) => {
      const time = now * 0.001;
      for (const strand of strands) {
        const idleBreeze = reducedMotion
          ? 0
          : Math.sin(time * 0.72 + strand.phase) * 4.2;
        const activeGust =
          Math.sin(time * 3.1 + strand.phase * 0.7) *
          windEnergy *
          15 *
          windDirection;
        for (let index = 0; index < strand.points.length; index += 1) {
          const point = strand.points[index];
          const restX =
            point.baseX +
            (idleBreeze + activeGust) * Math.pow(point.t, 1.18);

          if (point.pinned) {
            point.x = restX;
            point.y = point.baseY;
            point.oldX = point.x;
            point.oldY = point.y;
            continue;
          }

          const velocityX = (point.x - point.oldX) * 0.965;
          const velocityY = (point.y - point.oldY) * 0.965;
          point.oldX = point.x;
          point.oldY = point.y;
          point.x += velocityX + (restX - point.x) * 0.018;
          point.y += velocityY + (point.baseY - point.y) * 0.016 + 0.012;
          applyPointer(point, now);
        }
      }

      for (let pass = 0; pass < 2; pass += 1) {
        for (const strand of strands) {
          for (let index = 1; index < strand.points.length; index += 1) {
            const previous = strand.points[index - 1];
            const point = strand.points[index];
            const dx = point.x - previous.x;
            const dy = point.y - previous.y;
            const distance = Math.max(0.01, Math.hypot(dx, dy));
            const correction = (distance - point.restLength) / distance;
            const correctionX = dx * correction * 0.5;
            const correctionY = dy * correction * 0.5;

            if (!previous.pinned) {
              previous.x += correctionX;
              previous.y += correctionY;
            }
            point.x -= correctionX;
            point.y -= correctionY;
          }
        }
      }

      windEnergy *= reducedMotion ? 0.955 : 0.972;
      if (windEnergy < 0.004) windEnergy = 0;
    };

    const draw = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.7;
      context.strokeStyle = "rgba(7, 59, 58, 0.095)";

      for (const strand of strands) {
        const points = strand.points;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let index = 1; index < points.length - 1; index += 1) {
          const point = points[index];
          const next = points[index + 1];
          context.quadraticCurveTo(
            point.x,
            point.y,
            (point.x + next.x) * 0.5,
            (point.y + next.y) * 0.5,
          );
        }
        const last = points[points.length - 1];
        context.lineTo(last.x, last.y);
        context.stroke();

        for (let index = 2; index < points.length - 1; index += 2) {
          const point = points[index];
          const before = points[index - 1];
          const after = points[index + 1];
          const angle =
            (Math.atan2(after.y - before.y, after.x - before.x) -
              Math.PI / 2) *
            0.58;
          const fade =
            clamp((point.t - 0.02) / 0.12, 0, 1) *
            clamp((1 - point.t) / 0.14, 0, 1);
          const word = poetryWords[(strand.offset + index) % poetryWords.length];

          context.save();
          context.translate(point.x, point.y);
          context.rotate(angle);
          context.globalAlpha = strand.alpha * fade;
          context.fillStyle = solemnInkColor;
          context.font = `400 ${strand.fontSize}px ${calligraphyFont}`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(word, 0, 0);
          context.restore();
        }
      }
      context.globalAlpha = 1;
    };

    const animate = (now: number) => {
      frame = window.requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const interval = reducedMotion
        ? 1000 / 24
        : width < 700
          ? 1000 / 30
          : 1000 / 42;
      if (now - lastFrame < interval) return;
      lastFrame = now;
      simulate(now);
      draw();
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.vx = pointer.active ? x - pointer.lastX : 0;
      pointer.vy = pointer.active ? y - pointer.lastY : 0;
      const pointerSpeed = Math.hypot(pointer.vx, pointer.vy);
      if (pointerSpeed > 0.4) {
        windDirection = pointer.vx === 0 ? windDirection : Math.sign(pointer.vx);
        windEnergy = Math.min(
          1.35,
          Math.max(windEnergy, 0.18 + pointerSpeed * 0.026),
        );
      }
      pointer.x = x;
      pointer.y = y;
      pointer.lastX = x;
      pointer.lastY = y;
      pointer.active = true;
      pointer.lastMove = performance.now();
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const scheduleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        buildCurtain();
        draw();
      });
    };

    gustRef.current = () => {
      windDirection *= -1;
      windEnergy = 1.7;
      strands.forEach((strand, strandIndex) => {
        strand.points.forEach((point, pointIndex) => {
          if (point.pinned) return;
          const variation = 0.72 + seeded(strandIndex + pointIndex, 32) * 0.42;
          const force = windDirection * 24 * variation * (0.25 + point.t * 0.9);
          point.oldX = point.x - force;
          point.oldY = point.y + Math.abs(force) * 0.08;
        });
      });
    };

    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(shell);
    resizeObserver.observe(roof);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.03 },
    );
    visibilityObserver.observe(shell);

    shell.addEventListener("pointerenter", updatePointer, { passive: true });
    shell.addEventListener("pointermove", updatePointer, { passive: true });
    shell.addEventListener("pointerleave", clearPointer, { passive: true });
    roof.addEventListener("load", scheduleResize, { once: true });

    buildCurtain();
    draw();
    frame = window.requestAnimationFrame(animate);

    if (document.fonts) {
      void document.fonts.load('400 24px "Style Script"').then(() => {
        if (!disposed) scheduleResize();
      });
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      shell.removeEventListener("pointerenter", updatePointer);
      shell.removeEventListener("pointermove", updatePointer);
      shell.removeEventListener("pointerleave", clearPointer);
      roof.removeEventListener("load", scheduleResize);
      gustRef.current = () => undefined;
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="poetry-curtain"
    >
      <img
        ref={roofRef}
        className="poetry-curtain__roof"
        src="/images/temple-roof.webp"
        alt=""
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="poetry-curtain__canvas"
        role="img"
        aria-label="Rèm thơ tiếng Việt chuyển động theo làn gió dưới mái chùa cách điệu"
      />
      <button
        className="poetry-curtain__gust"
        type="button"
        onClick={() => gustRef.current()}
      >
        Đánh thức làn gió
      </button>
      <span className="sr-only">
        Gió qua miền đá, sóng kể chuyện làng, chuông chùa ngân sớm, biển ôm
        bờ cát, người về Cổ Thạch nhớ một bình minh.
      </span>
    </div>
  );
}
