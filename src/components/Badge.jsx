const Badge = ({ status, children, className = '' }) => {
    const statusStyles = {
        lost: 'bg-red-100 text-red-700 border-red-200',
        found: 'bg-green-100 text-green-700 border-green-200',
        warehouse: 'bg-blue-100 text-blue-700 border-blue-200',
        borrowable: 'bg-purple-100 text-purple-700 border-purple-200',
        active: 'bg-blue-100 text-blue-700 border-blue-200',
        overdue: 'bg-red-100 text-red-700 border-red-200',
        returned: 'bg-gray-100 text-gray-700 border-gray-200',
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        approved: 'bg-green-100 text-green-700 border-green-200',
        denied: 'bg-red-100 text-red-700 border-red-200'
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border-2 inline-block ${statusStyles[status] || statusStyles.pending} ${className}`}
        >
            {children || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default Badge;
