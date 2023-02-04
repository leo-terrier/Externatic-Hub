export default function AccountNavButton({
  propertyName,
  selectedTab,
  setSelectedTab,
  isLast,
}) {
  const isSelected = selectedTab === propertyName;

  return (
    <button
      type="button"
      className={`${
        isSelected ? "bg-white font-bold shadow " : "bg-slate-200 font-normal"
      } ${isSelected && !isLast ? "mb-1" : ""} p-4 w-full `}
      onClick={() => setSelectedTab(propertyName)}
    >
      {propertyName}
    </button>
  );
}
