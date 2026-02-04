import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Search, ArrowRight, FileText, Target, CheckCircle, Shield, Zap, Clock } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full px-6 pt-24 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

                {/* Animated background blobs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="max-w-6xl mx-auto">
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full mb-8 shadow-lg"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold">Lost & Found Management</span>
                        </motion.div>

                        {/* Heading with gradient */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                                Never lose track of
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-2 transition-all"
                                >
                                    <AlertCircle size={18} />
                                    Report Lost Item
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/report-found">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-medium hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 flex items-center gap-2 transition-all"
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
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
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
                                gradient: 'from-indigo-500 to-purple-500',
                                bgGradient: 'from-indigo-50 to-purple-50'
                            },
                            {
                                step: '02',
                                title: 'Match',
                                description: 'Our system automatically matches lost items with found items and notifies you.',
                                icon: Target,
                                gradient: 'from-purple-500 to-pink-500',
                                bgGradient: 'from-purple-50 to-pink-50'
                            },
                            {
                                step: '03',
                                title: 'Reclaim',
                                description: 'Verify ownership through secure OTP verification and retrieve your item.',
                                icon: CheckCircle,
                                gradient: 'from-pink-500 to-rose-500',
                                bgGradient: 'from-pink-50 to-rose-50'
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
                                    whileHover={{ y: -8 }}
                                    className="relative"
                                >
                                    <div className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-8 border-2 border-white shadow-lg hover:shadow-xl transition-all h-full`}>
                                        {/* Step number */}
                                        <div className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-4`}>{item.step}</div>

                                        {/* Icon */}
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                                            <Icon className="text-white" size={26} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
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
            <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-4">
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
                                    whileHover={{ y: -4 }}
                                    className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                        <Icon className="text-white" size={26} />
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
            <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

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
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Browse Warehouse
                                </motion.button>
                            </Link>
                            <Link to="/my-items">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
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

