import type { HTMLAttributes } from 'react';

export type InputTextProps = HTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'email';
  name: string;
  label: string;
  errorFeedback?: string;
};

const inputStyles =
  'w-full appearance-none border px-3 py-2 leading-tight text-brand focus:outline-none rounded-3xl';
const focusInputStyles = 'focus:border-brand focus:border-opacity-80';
const hoverInputStyles = 'hover:border-brand hover:border-opacity-40';

export const InputText = ({
  label,
  name,
  errorFeedback,
  type = 'text',
  ...rest
}: InputTextProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-brand" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`${inputStyles} ${
          errorFeedback
            ? 'border-red-500'
            : `${hoverInputStyles} ${focusInputStyles}`
        }`}
        {...rest}
      />
      {!errorFeedback ? (
        <p className="text-xs italic text-red-500">{errorFeedback}</p>
      ) : null}
    </div>
  );
};
