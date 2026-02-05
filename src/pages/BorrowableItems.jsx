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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="text-indigo-600" size={24} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Borrowable Assets
                    </h1>
                    <p className="text-lg text-gray-600">
                        Items available for temporary borrowing
                    </p>
                </motion.div>

                {/* Items Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 text-sm">Searching available assets...</p>
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

                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
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
                        <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Borrowing Asset</p>
                            <p className="text-lg font-bold text-gray-900">{selectedItem.name}</p>
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
                                <div className="text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Shield className="text-emerald-600" size={18} />
                                        <p className="font-bold text-emerald-800 text-sm uppercase tracking-wider">Identity Verification</p>
                                    </div>
                                    <p className="text-xs text-emerald-700 leading-relaxed">
                                        A 6-digit security code has been sent to<br />
                                        <span className="font-bold">{formData.phone}</span>
                                    </p>
                                </div>

                                {/* OTP Input */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">
                                        Enter 6-Digit Code
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
                                                className="w-12 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 focus:outline-none transition-all duration-200 text-gray-900"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                                    >
                                        Resend Code
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
