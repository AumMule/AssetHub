import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    onClick,
    hoverable = true,
    ...props
}) => {
    const baseStyles = "bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200";

    const motionProps = hoverable ? {
        whileHover: { y: -2 },
        className: `${baseStyles} hover:shadow-md hover:border-gray-200 ${onClick ? 'cursor-pointer' : ''} ${className}`
    } : {
        className: `${baseStyles} ${className}`
    };

    return (
        <motion.div
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            <div className="p-5 h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
