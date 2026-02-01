import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Search, ArrowRight } from 'lucide-react';
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
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#2B1B60] mb-4">
                            How AssetHub Works
                        </h2>
                        <p className="text-xl text-gray-600">
                            Simple, efficient, and secure item management
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Report Items",
                                description: "Quickly report lost or found items with detailed descriptions and photos",
                                icon: "📝"
                            },
                            {
                                title: "Track & Match",
                                description: "Our system helps match lost items with found items automatically",
                                icon: "🔍"
                            },
                            {
                                title: "Claim & Retrieve",
                                description: "Verify ownership and reclaim your items securely with OTP verification",
                                icon: "✅"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Card hoverable={false} className="text-center p-8">
                                    <div className="text-6xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-[#2B1B60] mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
