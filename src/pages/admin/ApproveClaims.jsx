import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Check, X } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { getClaims, approveClaim, denyClaim } from '../../utils/api';

const ApproveClaims = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        loadClaims();
    }, []);

    const loadClaims = async () => {
        setLoading(true);
        try {
            const data = await getClaims('pending');
            setClaims(data);
        } catch (error) {
            console.error('Error loading claims:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (claimId) => {
        await approveClaim(claimId);
        loadClaims();
    };

    const handleDeny = async (claimId) => {
        await denyClaim(claimId);
        loadClaims();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FFD233] to-[#ffc700] rounded-3xl flex items-center justify-center shadow-xl">
                            <FileCheck className="text-[#2B1B60]" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#2B1B60]">Approve Claims</h1>
                            <p className="text-gray-600">Review and approve item claims</p>
                        </div>
                    </div>
                </motion.div>

                {/* Claims List */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading claims...</p>
                    </div>
                ) : claims.length === 0 ? (
                    <Card hoverable={false} className="text-center py-20">
                        <div className="text-6xl mb-4">✅</div>
                        <p className="text-xl text-gray-600">No pending claims</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {claims.map((claim, index) => (
                            <motion.div
                                key={claim.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hoverable={false}>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Claim Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#2B1B60] mb-2">
                                                        {claim.itemName}
                                                    </h3>
                                                    <Badge status="pending" />
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <p className="text-sm text-gray-600">
                                                    <strong>Claimant:</strong> {claim.userName}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Claim Date:</strong> {claim.claimDate}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Description:</strong> {claim.description}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setSelectedClaim(claim);
                                                    setShowDetailsModal(true);
                                                }}
                                                className="text-[#7C5DFA] text-sm font-semibold hover:underline"
                                            >
                                                View Full Details →
                                            </button>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex md:flex-col gap-3 md:w-40">
                                            <Button
                                                variant="primary"
                                                icon={Check}
                                                onClick={() => handleApprove(claim.id)}
                                                className="flex-1 bg-green-500 hover:bg-green-600"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="outline"
                                                icon={X}
                                                onClick={() => handleDeny(claim.id)}
                                                className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                                            >
                                                Deny
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <Modal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                title="Claim Details"
            >
                {selectedClaim && (
                    <div className="py-4 space-y-3">
                        <div>
                            <p className="text-sm text-gray-500">Item Name</p>
                            <p className="font-semibold text-[#2B1B60]">{selectedClaim.itemName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Claimant</p>
                            <p className="font-semibold text-[#2B1B60]">{selectedClaim.userName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Claim Date</p>
                            <p className="font-semibold text-[#2B1B60]">{selectedClaim.claimDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-gray-700">{selectedClaim.description}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ApproveClaims;
