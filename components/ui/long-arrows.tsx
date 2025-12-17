// Reusable long arrow icons used in carousels/controls
// Keep API minimal and consistent with previous inline versions

export const LongArrowLeft = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
  >
    <line x1="48" y1="6" x2="4" y2="6" />
    <polyline points="10,1 4,6 10,11" />
  </svg>
);

export const LongArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
  >
    <line x1="0" y1="6" x2="44" y2="6" />
    <polyline points="38,1 44,6 38,11" />
  </svg>
);

export default LongArrowRight;
