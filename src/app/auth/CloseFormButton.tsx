export default function CloseFormButton({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <button onClick={closeModal} className="card__face--closeBtn">
      x
    </button>
  );
}
