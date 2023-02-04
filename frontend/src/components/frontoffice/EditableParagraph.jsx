import Boldify from "@components/frontandback/Boldify";

export default function EditableParagraph({
  isEditing,
  stateValue,
  stateSetter,
  label,
  isTextArea = false,
}) {
  return (
    <div className="flex  gap-4">
      <label className="flex items-center w-full" htmlFor={label}>
        <Boldify>{label} :</Boldify>
      </label>
      {!isEditing ? (
        <p className="mb-0 w-full flex items-center">{stateValue}</p>
      ) : !isTextArea ? (
        <input
          id={label}
          value={stateValue}
          onChange={(e) => stateSetter(e.target.value)}
        />
      ) : (
        <textarea
          id={label}
          value={stateValue}
          onChange={(e) => stateSetter(e.target.value)}
        />
      )}
    </div>
  );
}
