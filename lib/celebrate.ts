const COLORS = ['#e8365a', '#ffc93c', '#12936f', '#6b4cff', '#ffffff'];

export const celebrate = async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { default: confetti } = await import('canvas-confetti');
  const shoot = (x: number, angle: number) =>
    confetti({ particleCount: 70, spread: 60, startVelocity: 55, angle, origin: { x, y: 0.75 }, colors: COLORS });
  shoot(0.1, 60);
  shoot(0.9, 120);
};
