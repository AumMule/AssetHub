// Placeholder API functions with mock data
import { mockItems, mockBorrowRecords, mockClaims, mockStats } from './mockData';

// Simulate async API calls
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Items API
export const getItems = async (filter = 'all') => {
    await delay();
    if (filter === 'all') return mockItems;
    return mockItems.filter(item => item.status === filter);
};

export const getItemById = async (id) => {
    await delay();
    return mockItems.find(item => item.id === parseInt(id));
};

export const reportLostItem = async (itemData) => {
    await delay();
    const newItem = {
        id: mockItems.length + 1,
        ...itemData,
        status: 'lost',
        userId: 'user1', // Mock current user
        userName: 'Current User'
    };
    return { success: true, item: newItem };
};

export const reportFoundItem = async (itemData) => {
    await delay();
    const newItem = {
        id: mockItems.length + 1,
        ...itemData,
        status: 'found',
        userId: 'user1', // Mock current user
        userName: 'Current User'
    };
    return { success: true, item: newItem };
};

// Borrow API
export const getBorrowableItems = async () => {
    await delay();
    return mockItems.filter(item => item.status === 'borrowable');
};

export const borrowItem = async (itemId, userId) => {
    await delay();
    const item = mockItems.find(item => item.id === itemId);
    if (!item || !item.available) {
        return { success: false, message: 'Item not available' };
    }
    return { success: true, message: 'Item borrowed successfully' };
};

export const getBorrowRecords = async (filter = 'all') => {
    await delay();
    if (filter === 'all') return mockBorrowRecords;
    return mockBorrowRecords.filter(record => record.status === filter);
};

export const returnItem = async (recordId) => {
    await delay();
    return { success: true, message: 'Item returned successfully' };
};

// Claims API
export const claimItem = async (claimData) => {
    await delay();
    // Simulate OTP verification
    if (claimData.otp === '123456') {
        return { success: true, message: 'Claim submitted successfully' };
    }
    return { success: false, message: 'Invalid OTP' };
};

export const getClaims = async (status = 'all') => {
    await delay();
    if (status === 'all') return mockClaims;
    return mockClaims.filter(claim => claim.status === status);
};

export const approveClaim = async (claimId) => {
    await delay();
    return { success: true, message: 'Claim approved' };
};

export const denyClaim = async (claimId) => {
    await delay();
    return { success: true, message: 'Claim denied' };
};

// User Items API
export const getMyItems = async (userId) => {
    await delay();
    return {
        lost: mockItems.filter(item => item.userId === userId && item.status === 'lost'),
        found: mockItems.filter(item => item.userId === userId && item.status === 'found'),
        borrowed: mockBorrowRecords.filter(record => record.userId === userId && record.status === 'active')
    };
};

// Admin API
export const getStats = async () => {
    await delay();
    return mockStats;
};

export const addWarehouseItem = async (itemData) => {
    await delay();
    return { success: true, message: 'Item added to warehouse' };
};

export const updateWarehouseItem = async (itemId, itemData) => {
    await delay();
    return { success: true, message: 'Item updated' };
};

export const deleteWarehouseItem = async (itemId) => {
    await delay();
    return { success: true, message: 'Item deleted' };
};
