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
    const baseInputStyles = "w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#7C5DFA] focus:outline-none transition-all duration-300 text-[#2B1B60] placeholder-gray-400";

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label htmlFor={name} className="text-sm font-semibold text-[#2B1B60]">
                    {label} {required && <span className="text-red-500">*</span>}
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
