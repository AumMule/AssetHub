const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    className = '',
    rows = 4,
    ...props
}) => {
    const baseInputStyles = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm";

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    className={`${baseInputStyles} resize-none`}
                    {...props}
                />
            ) : type === 'date' ? (
                <input
                    type="date"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={baseInputStyles}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={baseInputStyles}
                    {...props}
                />
            )}

            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </div>
    );
};

export default Input;
