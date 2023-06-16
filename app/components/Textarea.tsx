import type { HTMLAttributes } from 'react';

export type TextareaProps = HTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  errorFeedback?: string;
  rows?: number;
  readOnly?: boolean;
};

const inputStyles =
  'w-full appearance-none border px-3 py-2 leading-tight text-brand focus:outline-none rounded-2xl';
const focusInputStyles = 'focus:border-brand focus:border-opacity-80';
const hoverInputStyles = 'hover:border-brand hover:border-opacity-40';
const readOnlyStyles = 'read-only:opacity-50';

export const Textarea = ({
  label,
  name,
  errorFeedback,
  ...rest
}: TextareaProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-brand" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={`${inputStyles} ${
          errorFeedback
            ? 'border-red-500'
            : `${hoverInputStyles} ${focusInputStyles} ${readOnlyStyles}`
        }`}
        {...rest}
      />
      {!errorFeedback ? (
        <p className="text-xs italic text-red-500">{errorFeedback}</p>
      ) : null}
    </div>
  );
};
