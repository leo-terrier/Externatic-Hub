export default function FrontOfficeListing({ children }) {
  return (
    <li>
      <div className="group cursor-pointer w-3/5 mx-auto p-[20px] border-[1px] border-slate-400 text-rose-600 rounded-lg relative bg-white">
        {children}
      </div>
    </li>
  );
}
