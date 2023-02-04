import React from "react";

export default function PropositionDetailNavButton({
  propertyName,
  selectedTab,
  setSelectedTab,
}) {
  const isSelected = selectedTab === propertyName;

  return (
    <button
      type="button"
      className={`${
        isSelected
          ? "bg-white font-bold  border-b-0"
          : "bg-gray-200 font-normal"
      }  p-4 w-full border-[1px] border-gray-400 rounded-sm`}
      onClick={() => setSelectedTab(propertyName)}
    >
      {propertyName}
    </button>
  );
}
