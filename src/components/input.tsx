export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const inputStyleClasses =
  "block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2";

export function Input({ ...rest }: InputProps) {
  return <input {...rest} className={inputStyleClasses} />;
}
