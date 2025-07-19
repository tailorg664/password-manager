function Button({ children, ...props }) {
  return (
    <button
      className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 font-semibold text-slate-50 shadow transition hover:from-blue-600 hover:to-blue-800"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
