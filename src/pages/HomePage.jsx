import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Search, ArrowRight, FileText, Target, CheckCircle, Shield, Zap, Clock } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full px-6 pt-24 pb-20 overflow-hidden bg-white border-b border-gray-100">

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full mb-8 border border-indigo-100"
                        >
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                            <span className="text-xs font-bold uppercase tracking-wider">Lost & Found Management</span>
                        </motion.div>

                        {/* Heading with gradient */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-gray-900">
                            Never lose track of
                            <br />
                            <span className="text-indigo-600">
                                your belongings
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            A simple, efficient system to report, track, and reclaim lost items.
                            Built for organizations that care about their people.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                            <Link to="/report-lost">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 flex items-center gap-2 transition-all"
                                >
                                    <AlertCircle size={18} />
                                    Report Lost Item
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/report-found">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
                                >
                                    <Search size={18} />
                                    Report Found Item
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>



            {/* How It Works */}
            <section className="relative py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How it works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to reunite you with your belongings
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: 'STEP 01',
                                title: 'Report Item',
                                description: 'Submit a detailed report with photos and descriptions of your lost or found item.',
                                icon: FileText,
                                color: 'text-indigo-600',
                                bgColor: 'bg-indigo-50'
                            },
                            {
                                step: 'STEP 02',
                                title: 'System Matching',
                                description: 'Our system automatically matches lost items with found items and notifies you.',
                                icon: Target,
                                color: 'text-indigo-600',
                                bgColor: 'bg-indigo-50'
                            },
                            {
                                step: 'STEP 03',
                                title: 'Reclaim Asset',
                                description: 'Verify ownership through secure OTP verification and retrieve your item.',
                                icon: CheckCircle,
                                color: 'text-indigo-600',
                                bgColor: 'bg-indigo-50'
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative h-full"
                                >
                                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all h-full">
                                        {/* Step number */}
                                        <div className={`text-xs font-bold ${item.color} mb-4 uppercase tracking-widest`}>{item.step}</div>

                                        {/* Icon */}
                                        <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                                            <Icon className={item.color} size={22} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Built for reliability
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage lost and found items efficiently
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: 'Secure & Private',
                                description: 'Enterprise-grade security to protect your data and ensure privacy.',
                                color: 'indigo'
                            },
                            {
                                icon: Zap,
                                title: 'Instant Notifications',
                                description: 'Get notified immediately when your lost item is found.',
                                color: 'purple'
                            },
                            {
                                icon: Clock,
                                title: 'Fast Recovery',
                                description: 'Quick matching system to reunite you with your belongings.',
                                color: 'pink'
                            }
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-indigo-600" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-indigo-600 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust AssetHub to keep track of their belongings.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/warehouse">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-all"
                                >
                                    Browse Warehouse
                                </motion.button>
                            </Link>
                            <Link to="/my-items">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-indigo-500 text-white border border-indigo-400 rounded-xl font-semibold hover:bg-indigo-400 transition-all shadow-sm"
                                >
                                    View My Items
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

