import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { getBorrowableItems, borrowItem } from '../utils/api';

const BorrowableItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form states
    const [borrowStep, setBorrowStep] = useState('form'); // 'form', 'otp', 'success'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        duration: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await getBorrowableItems();
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate sending OTP
        setOtpSent(true);
        setBorrowStep('otp');
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOtp = () => {
        // Simulate OTP verification
        setBorrowStep('success');
        setShowSuccess(true);

        // Reset after 3 seconds
        setTimeout(() => {
            handleCloseModal();
        }, 3000);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setBorrowStep('form');
        setFormData({ name: '', email: '', phone: '', duration: '' });
        setOtp(['', '', '', '', '', '']);
        setOtpSent(false);
        setShowSuccess(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <ShoppingBag className="text-white" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                        Borrowable Items
                    </h1>
                    <p className="text-lg text-gray-600">
                        Items available for temporary borrowing
                    </p>
                </motion.div>

                {/* Items Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading items...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No borrowable items available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="h-full flex flex-col">
                                    {/* Image */}
                                    <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="mb-3 flex items-center gap-2">
                                            <Badge status="borrowable" />
                                            {item.available ? (
                                                <Badge status="active">Available</Badge>
                                            ) : (
                                                <Badge status="overdue">Borrowed</Badge>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-[#2B1B60] mb-2">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="text-xs text-gray-500 mb-4">
                                            📍 {item.location}
                                        </p>

                                        <div className="mt-auto">
                                            <Button
                                                variant="primary"
                                                icon={ArrowRight}
                                                className="w-full text-sm py-2"
                                                onClick={() => setSelectedItem(item)}
                                                disabled={!item.available}
                                            >
                                                {item.available ? 'Borrow Item' : 'Not Available'}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Borrow Form & OTP Modal */}
            <Modal
                isOpen={selectedItem !== null && !showSuccess}
                onClose={handleCloseModal}
                title={borrowStep === 'form' ? 'Borrow Request' : 'Verify OTP'}
                className="max-w-lg"
            >
                {selectedItem && (
                    <div className="py-4">
                        {/* Item Info */}
                        <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                            <p className="text-sm text-gray-600 mb-1">Borrowing:</p>
                            <p className="text-lg font-bold text-[#2B1B60]">{selectedItem.name}</p>
                        </div>

                        {/* Form Step */}
                        {borrowStep === 'form' && (
                            <motion.form
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onSubmit={handleFormSubmit}
                                className="space-y-4"
                            >
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="your.email@example.com"
                                    required
                                />

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                />

                                <Input
                                    label="Borrow Duration (days)"
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleFormChange}
                                    placeholder="e.g., 7"
                                    required
                                    min="1"
                                    max="30"
                                />

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCloseModal}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="flex-1"
                                    >
                                        Send OTP
                                    </Button>
                                </div>
                            </motion.form>
                        )}

                        {/* OTP Step */}
                        {borrowStep === 'otp' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* OTP Sent Message */}
                                <div className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Shield className="text-green-600" size={20} />
                                        <p className="font-semibold text-green-800">OTP Sent!</p>
                                    </div>
                                    <p className="text-sm text-green-700">
                                        We've sent a 6-digit code to<br />
                                        <strong>{formData.phone}</strong>
                                    </p>
                                </div>

                                {/* OTP Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2B1B60] mb-3 text-center">
                                        Enter OTP Code
                                    </label>
                                    <div className="flex gap-2 justify-center">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-[#7C5DFA] focus:outline-none transition-all duration-300 text-[#2B1B60]"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-[#7C5DFA] hover:text-[#6a4de0] font-medium transition-colors"
                                    >
                                        Resend OTP
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setBorrowStep('form')}
                                        className="flex-1"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleVerifyOtp}
                                        className="flex-1"
                                        disabled={otp.some(digit => !digit)}
                                    >
                                        Verify & Borrow
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccess}
                onClose={handleCloseModal}
                title="Success!"
            >
                <div className="text-center py-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-6xl mb-4"
                    >
                        ✅
                    </motion.div>
                    <p className="text-lg text-gray-600 mb-4">
                        Item borrowed successfully!
                    </p>
                    <p className="text-sm text-gray-500">
                        Please return it within the specified duration.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default BorrowableItems;
