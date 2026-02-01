import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    onClick,
    hoverable = true,
    ...props
}) => {
    const baseStyles = "bg-white rounded-[2rem] border-2 border-gray-100 shadow-2xl shadow-black/5 p-6 transition-all duration-300";

    const motionProps = hoverable ? {
        whileHover: { scale: 1.05, y: -5 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
    } : {};

    return (
        <motion.div
            className={`${baseStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
