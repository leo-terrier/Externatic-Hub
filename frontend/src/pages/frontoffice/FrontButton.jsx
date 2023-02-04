export default function FrontButton({
  buttonType = "primary",
  tailwindClasses,
  onClick,
  content,
  disabled = false,
}) {
  let color;

  switch (buttonType) {
    case "primary":
      color = " bg-blue-600 disabled:bg-blue-600 hover:bg-blue-500 ";
      break;
    case "secondary":
      color = " bg-green-600 disabled:bg-green-600 hover:bg-green-500 ";
      break;
    case "warning":
      color = " bg-red-600 disabled:bg-red-600 hover:bg-red-500 ";
      break;
    default:
      color = " bg-blue-600 disabled:bg-blue-600 hover:bg-blue-500 ";
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${color} px-4 py-2 text-center font-bold text-white rounded disabled:opacity-50  ${tailwindClasses}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
