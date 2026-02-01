import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, ArrowRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { claimItem } from '../utils/api';

const ClaimItem = () => {
    const [formData, setFormData] = useState({
        itemId: '',
        userName: '',
        email: '',
        phone: '',
        otp: ''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await claimItem(formData);
            if (result.success) {
                setShowSuccess(true);
                setFormData({
                    itemId: '',
                    userName: '',
                    email: '',
                    phone: '',
                    otp: ''
                });
            } else {
                setErrorMessage(result.message);
                setShowError(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E0D7FF] via-white to-white py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <FileCheck className="text-white" size={40} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                            Claim Your Item
                        </h1>
                        <p className="text-lg text-gray-600">
                            Verify your identity to claim your item
                        </p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border-2 border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Item ID"
                                name="itemId"
                                value={formData.itemId}
                                onChange={handleChange}
                                placeholder="Enter the item ID"
                                required
                            />

                            <Input
                                label="Your Name"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                                required
                            />

                            <div className="pt-4 pb-2">
                                <div className="bg-[#E0D7FF] rounded-2xl p-4 mb-4">
                                    <p className="text-sm text-[#2B1B60] font-medium">
                                        📱 For demo purposes, use OTP: <strong>123456</strong>
                                    </p>
                                </div>

                                <Input
                                    label="OTP Verification Code"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter 6-digit OTP"
                                    required
                                    maxLength={6}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    icon={ArrowRight}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? 'Verifying...' : 'Submit Claim'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Claim Approved!"
            >
                <div className="text-center py-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-lg text-gray-600 mb-4">
                        Your claim has been submitted successfully!
                    </p>
                    <p className="text-sm text-gray-500">
                        You'll receive a notification when your claim is approved.
                    </p>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal
                isOpen={showError}
                onClose={() => setShowError(false)}
                title="Claim Failed"
            >
                <div className="text-center py-4">
                    <div className="text-6xl mb-4">❌</div>
                    <p className="text-lg text-gray-600 mb-4">
                        {errorMessage}
                    </p>
                    <p className="text-sm text-gray-500">
                        Please check your details and try again.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ClaimItem;
