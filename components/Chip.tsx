export default function Chip({ children, href }) {
  return (
    <div className="bg-white text-gray-800 px-4 py-1 border-gray-500 rounded-full text-sm border-1">
      {children}
    </div>
  );
}
