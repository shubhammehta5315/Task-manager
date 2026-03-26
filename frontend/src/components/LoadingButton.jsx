export default function LoadingButton({ loading, onClick, children, className = "" }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}