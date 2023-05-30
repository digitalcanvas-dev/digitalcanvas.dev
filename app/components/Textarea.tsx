import type { HTMLAttributes } from 'react';

export type TextareaProps = HTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  errorFeedback?: string;
};

const inputStyles =
  'w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none';
const focusInputStyles = 'focus:border-teal-300 focus:border-opacity-80';
const hoverInputStyles = 'hover:border-teal-300 hover:border-opacity-30';

export const Textarea = ({
  label,
  name,
  errorFeedback,
  ...rest
}: TextareaProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-700" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
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
