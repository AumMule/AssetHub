import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Package, ShoppingBag, FileCheck, User, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('user'); // 'user' or 'admin'
    const location = useLocation();

    const userLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/warehouse', label: 'Warehouse', icon: Package },
        { path: '/borrowable', label: 'Borrowable', icon: ShoppingBag },
        { path: '/claim', label: 'Claim Item', icon: FileCheck },
        { path: '/my-items', label: 'My Items', icon: User }
    ];

    const adminLinks = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/warehouse', label: 'Manage Warehouse', icon: Package },
        { path: '/admin/claims', label: 'Approve Claims', icon: FileCheck },
        { path: '/admin/borrows', label: 'Borrow Records', icon: ShoppingBag }
    ];

    const links = role === 'admin' ? adminLinks : userLinks;

    const toggleRole = () => {
        setRole(role === 'user' ? 'admin' : 'user');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-30 border-b-2 border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#7C5DFA] to-[#FFD233] rounded-xl flex items-center justify-center">
                            <Package className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-[#2B1B60]">AssetHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${isActive
                                            ? 'bg-[#7C5DFA] text-white'
                                            : 'text-gray-600 hover:bg-[#E0D7FF] hover:text-[#7C5DFA]'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Role Switcher */}
                        <button
                            onClick={toggleRole}
                            className="px-4 py-2 rounded-full bg-[#FFD233] text-[#2B1B60] font-semibold hover:bg-[#ffc700] transition-all"
                        >
                            {role === 'user' ? '👤 User' : '👨‍💼 Admin'}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-[#2B1B60] p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4"
                    >
                        <div className="flex flex-col gap-2">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${isActive
                                                ? 'bg-[#7C5DFA] text-white'
                                                : 'text-gray-600 hover:bg-[#E0D7FF]'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}

                            <button
                                onClick={toggleRole}
                                className="px-4 py-3 rounded-2xl bg-[#FFD233] text-[#2B1B60] font-semibold hover:bg-[#ffc700] transition-all text-left"
                            >
                                Switch to {role === 'user' ? 'Admin' : 'User'} View
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
