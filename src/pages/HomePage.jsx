import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Search, ArrowRight, FileText, Target, CheckCircle, Shield, Zap, Clock } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full mb-8"
                    >
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-indigo-700">Lost & Found Management</span>
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                        Never lose track of
                        <br />
                        <span className="text-indigo-600">your belongings</span>
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md flex items-center gap-2 transition-all"
                            >
                                <AlertCircle size={18} />
                                Report Lost Item
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link to="/report-found">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:shadow-sm flex items-center gap-2 transition-all"
                            >
                                <Search size={18} />
                                Report Found Item
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-100"
                    >
                        {[
                            { label: 'Items Recovered', value: '1,247' },
                            { label: 'Active Users', value: '3,891' },
                            { label: 'Avg. Recovery Time', value: '2.3 days' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="relative py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            How it works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Three simple steps to reunite you with your belongings
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Report',
                                description: 'Submit a detailed report with photos and descriptions of your lost or found item.',
                                icon: FileText,
                                color: 'indigo'
                            },
                            {
                                step: '02',
                                title: 'Match',
                                description: 'Our system automatically matches lost items with found items and notifies you.',
                                icon: Target,
                                color: 'violet'
                            },
                            {
                                step: '03',
                                title: 'Reclaim',
                                description: 'Verify ownership through secure OTP verification and retrieve your item.',
                                icon: CheckCircle,
                                color: 'purple'
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
                                    className="relative"
                                >
                                    <div className="bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all h-full">
                                        {/* Step number */}
                                        <div className="text-sm font-semibold text-gray-400 mb-4">{item.step}</div>

                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                                            <Icon className="text-indigo-600" size={24} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
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
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
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
                                description: 'Enterprise-grade security to protect your data and ensure privacy.'
                            },
                            {
                                icon: Zap,
                                title: 'Instant Notifications',
                                description: 'Get notified immediately when your lost item is found.'
                            },
                            {
                                icon: Clock,
                                title: 'Fast Recovery',
                                description: 'Average recovery time of 2.3 days with our smart matching system.'
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
                                    className="text-center"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-gray-700" size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust AssetHub to keep track of their belongings.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/warehouse">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all"
                                >
                                    Browse Warehouse
                                </motion.button>
                            </Link>
                            <Link to="/my-items">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:shadow-sm transition-all"
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

