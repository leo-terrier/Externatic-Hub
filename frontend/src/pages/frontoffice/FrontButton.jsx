export default function FrontButton({
  isPrimary,
  tailwindClass,
  onClick,
  content,
}) {
  return (
    <button
      type="button"
      className={`${
        isPrimary
          ? "bg-blue-600 hover:bg-blue-500"
          : "bg-green-600 hover:bg-green-500"
      } px-4 py-2 text-center font-bold text-white rounded ${tailwindClass}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
