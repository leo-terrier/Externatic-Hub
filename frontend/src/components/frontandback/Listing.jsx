export default function Listing({ children }) {
  return (
    <li>
      <div className="group cursor-pointer mx-auto p-[20px] border-[1px] border-slate-400 text-rose-600 rounded-lg relative bg-white">
        {children}
      </div>
    </li>
  );
}
