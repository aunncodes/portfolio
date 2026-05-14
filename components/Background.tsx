export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 overflow-hidden bg-[var(--background)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(142deg,#050a13_0%,#061a25_42%,#101529_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,0.16),transparent_52%),radial-gradient(ellipse_at_bottom,rgba(94,234,212,0.12),transparent_58%)]" />
      <div className="aurora-band aurora-band-one" />
      <div className="aurora-band aurora-band-two" />
      <div className="ambient-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,10,19,0.12),rgba(5,10,19,0.54))]" />
    </div>
  );
}
