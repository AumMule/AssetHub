import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    icon: Icon,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = "px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 flex items-center gap-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#7C5DFA] text-white hover:bg-[#6a4de0] shadow-lg hover:shadow-xl",
        secondary: "bg-[#FFD233] text-[#2B1B60] hover:bg-[#ffc700] shadow-lg hover:shadow-xl",
        outline: "border-2 border-[#7C5DFA] text-[#7C5DFA] hover:bg-[#7C5DFA] hover:text-white",
        ghost: "text-[#7C5DFA] hover:bg-[#E0D7FF]"
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...props}
        >
            <span>{children}</span>
            {Icon && (
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon size={14} />
                </span>
            )}
        </motion.button>
    );
};

export default Button;
