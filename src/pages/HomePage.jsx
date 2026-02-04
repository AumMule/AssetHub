import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Search, ArrowRight, FileText, Target, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E0D7FF] via-white to-[#FFD233]/20">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-[#2B1B60] mb-6 leading-tight">
                        Welcome to <span className="text-[#7C5DFA]">AssetHub</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Your central hub for managing lost and found items. Report, track, and reclaim your belongings with ease.
                    </p>

                    {/* Main Action Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                        {/* Report Lost Item Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <Link to="/report-lost">
                                <Card className="h-full hover:shadow-[#7C5DFA]/20 bg-gradient-to-br from-white to-[#E0D7FF]/30">
                                    <div className="flex flex-col items-center text-center p-8">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                                            <AlertCircle className="text-white" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#2B1B60] mb-4">
                                            Report Lost Item
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Lost something? Let us help you find it. Report your missing item and we'll notify you if it's found.
                                        </p>
                                        <Button variant="primary" icon={ArrowRight}>
                                            Report Now
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Report Found Item Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            <Link to="/report-found">
                                <Card className="h-full hover:shadow-[#FFD233]/20 bg-gradient-to-br from-white to-[#FFD233]/20">
                                    <div className="flex flex-col items-center text-center p-8">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD233] to-[#ffc700] rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                                            <Search className="text-[#2B1B60]" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#2B1B60] mb-4">
                                            Report Found Item
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Found something? Help reunite it with its owner. Report the item you found here.
                                        </p>
                                        <Button variant="secondary" icon={ArrowRight}>
                                            Report Now
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E0D7FF] rounded-full mb-6">
                            <Sparkles className="text-[#7C5DFA]" size={18} />
                            <span className="text-sm font-semibold text-[#7C5DFA]">How It Works</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-6">
                            Simple, Efficient, Secure
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three easy steps to reunite you with your belongings
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                title: "Report Items",
                                description: "Quickly report lost or found items with detailed descriptions and photos. Our intuitive form makes it easy.",
                                icon: FileText,
                                gradient: "from-[#7C5DFA] to-[#6a4de0]",
                                bgGradient: "from-[#E0D7FF]/50 to-[#E0D7FF]/20"
                            },
                            {
                                title: "Track & Match",
                                description: "Our intelligent system automatically matches lost items with found items, notifying you instantly.",
                                icon: Target,
                                gradient: "from-[#FFD233] to-[#ffc700]",
                                bgGradient: "from-[#FFD233]/30 to-[#FFD233]/10"
                            },
                            {
                                title: "Claim & Retrieve",
                                description: "Verify ownership securely with OTP verification and reclaim your items with complete peace of mind.",
                                icon: CheckCircle,
                                gradient: "from-[#10b981] to-[#059669]",
                                bgGradient: "from-green-100/50 to-green-50/20"
                            }
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
                                >
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`relative h-full bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl p-8 border-2 border-white shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                                    >
                                        {/* Step Number */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-gray-100">
                                            <span className="text-xl font-bold text-[#2B1B60]">{index + 1}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                            <Icon className="text-white" size={32} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold text-[#2B1B60] mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Why Choose AssetHub Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-[#2B1B60] to-[#1a0f3d] rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C5DFA] rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD233] rounded-full blur-3xl opacity-10"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Why Choose AssetHub?
                                </h2>
                                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                                    Built with security, efficiency, and user experience in mind
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: Shield,
                                        title: "Secure & Private",
                                        description: "Your data is protected with enterprise-grade security"
                                    },
                                    {
                                        icon: Zap,
                                        title: "Lightning Fast",
                                        description: "Instant notifications when your items are found"
                                    },
                                    {
                                        icon: Sparkles,
                                        title: "Smart Matching",
                                        description: "AI-powered system to match lost and found items"
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
                                            className="text-center"
                                        >
                                            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                                                <Icon className="text-[#FFD233]" size={28} />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-gray-300 text-sm">{item.description}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
