import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    icon: Icon,
    showArrow = false,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = "px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
        secondary: "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm",
        danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
        ghost: "text-gray-600 hover:bg-gray-100"
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            whileHover={disabled ? {} : { y: -1 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            {...props}
        >
            {Icon && <Icon size={18} className={variant === 'primary' || variant === 'danger' ? 'text-white/90' : 'text-gray-500'} />}
            <span>{children}</span>
            {showArrow && <ArrowRight size={16} className="ml-1 opacity-70" />}
        </motion.button>
    );
};

export default Button;
