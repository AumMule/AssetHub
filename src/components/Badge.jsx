const Badge = ({ status, children, className = '' }) => {
    const statusStyles = {
        lost: 'bg-rose-50 text-rose-700 border-rose-100',
        found: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warehouse: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        borrowable: 'bg-violet-50 text-violet-700 border-violet-100',
        active: 'bg-blue-50 text-blue-700 border-blue-100',
        overdue: 'bg-amber-50 text-amber-700 border-amber-100',
        returned: 'bg-gray-50 text-gray-700 border-gray-200',
        pending: 'bg-orange-50 text-orange-700 border-orange-100',
        approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        denied: 'bg-rose-50 text-rose-700 border-rose-100'
    };

    return (
        <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-block uppercase tracking-wider ${statusStyles[status] || statusStyles.pending} ${className}`}
        >
            {children || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default Badge;
