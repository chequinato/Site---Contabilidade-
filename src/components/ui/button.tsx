type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
    >
      {children}
    </button>
  );
}
