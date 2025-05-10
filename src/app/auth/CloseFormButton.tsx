export default function CloseFormButton({
  closeModal,
  disabled = false,
}: {
  closeModal: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={closeModal}
      disabled={disabled}
      className={`card__face--closeBtn ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
}
