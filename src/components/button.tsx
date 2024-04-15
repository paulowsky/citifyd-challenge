export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 dark:bg-indigo-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {children}
    </button>
  );
}
