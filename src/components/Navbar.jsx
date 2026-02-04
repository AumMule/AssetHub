import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Package, ShoppingBag, FileCheck, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('user'); // 'user' or 'admin'
    const location = useLocation();

    const userLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/warehouse', label: 'Warehouse', icon: Package },
        { path: '/borrowable', label: 'Borrowable', icon: ShoppingBag },
        { path: '/claim', label: 'Claim', icon: FileCheck },
        { path: '/my-items', label: 'My Items', icon: User }
    ];

    const adminLinks = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/warehouse', label: 'Warehouse', icon: Package },
        { path: '/admin/claims', label: 'Claims', icon: FileCheck },
        { path: '/admin/borrows', label: 'Borrows', icon: ShoppingBag }
    ];

    const links = role === 'admin' ? adminLinks : userLinks;

    const toggleRole = () => {
        setRole(role === 'user' ? 'admin' : 'user');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                            <Package className="text-white" size={18} />
                        </div>
                        <span className="text-lg font-semibold text-gray-900">AssetHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'text-indigo-600'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{link.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-indigo-50 rounded-lg -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Role Switcher */}
                        <button
                            onClick={toggleRole}
                            className="ml-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            {role === 'user' ? '👤 User' : '⚡ Admin'}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-1">
                                {links.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span>{link.label}</span>
                                        </Link>
                                    );
                                })}

                                <button
                                    onClick={toggleRole}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors text-left"
                                >
                                    Switch to {role === 'user' ? 'Admin' : 'User'} View
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
