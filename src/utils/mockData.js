// Mock data for AssetHub application

export const mockItems = [
    {
        id: 1,
        name: "Black Leather Wallet",
        description: "Black leather wallet with credit cards inside",
        location: "Library - 2nd Floor",
        date: "2026-01-28",
        status: "lost",
        category: "personal",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
        userId: "user1",
        userName: "John Doe"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        description: "Space gray iPhone 15 Pro with purple case",
        location: "Cafeteria",
        date: "2026-01-29",
        status: "found",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1678652197950-d4c0268e1b78?w=400&h=300&fit=crop",
        userId: "user2",
        userName: "Jane Smith"
    },
    {
        id: 3,
        name: "Blue Water Bottle",
        description: "Stainless steel water bottle with university logo",
        location: "Warehouse - Shelf A3",
        date: "2026-01-25",
        status: "warehouse",
        category: "personal",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        userId: null,
        userName: null
    },
    {
        id: 4,
        name: "Laptop Charger",
        description: "MacBook Pro charger with USB-C cable",
        location: "Computer Lab",
        date: "2026-01-30",
        status: "lost",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
        userId: "user1",
        userName: "John Doe"
    },
    {
        id: 5,
        name: "Textbook - Physics 101",
        description: "Physics textbook with notes inside",
        location: "Warehouse - Shelf B2",
        date: "2026-01-20",
        status: "borrowable",
        category: "books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        userId: null,
        userName: null,
        available: true
    },
    {
        id: 6,
        name: "Red Backpack",
        description: "Red Jansport backpack with laptop compartment",
        location: "Gym",
        date: "2026-01-27",
        status: "found",
        category: "bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        userId: "user3",
        userName: "Mike Johnson"
    },
    {
        id: 7,
        name: "Wireless Headphones",
        description: "Sony WH-1000XM4 black headphones",
        location: "Warehouse - Shelf C1",
        date: "2026-01-22",
        status: "borrowable",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop",
        userId: null,
        userName: null,
        available: true
    },
    {
        id: 8,
        name: "Car Keys",
        description: "Toyota car keys with blue keychain",
        location: "Parking Lot B",
        date: "2026-01-31",
        status: "lost",
        category: "personal",
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop",
        userId: "user4",
        userName: "Sarah Williams"
    },
    {
        id: 9,
        name: "Scientific Calculator",
        description: "TI-84 Plus graphing calculator",
        location: "Warehouse - Shelf A1",
        date: "2026-01-18",
        status: "borrowable",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400&h=300&fit=crop",
        userId: null,
        userName: null,
        available: false
    },
    {
        id: 10,
        name: "Sunglasses",
        description: "Ray-Ban aviator sunglasses with case",
        location: "Student Center",
        date: "2026-01-26",
        status: "found",
        category: "personal",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        userId: "user2",
        userName: "Jane Smith"
    }
];

export const mockBorrowRecords = [
    {
        id: 1,
        itemId: 5,
        itemName: "Textbook - Physics 101",
        userId: "user1",
        userName: "John Doe",
        borrowDate: "2026-01-25",
        dueDate: "2026-02-08",
        returnDate: null,
        status: "active"
    },
    {
        id: 2,
        itemId: 7,
        itemName: "Wireless Headphones",
        userId: "user3",
        userName: "Mike Johnson",
        borrowDate: "2026-01-20",
        dueDate: "2026-01-27",
        returnDate: null,
        status: "overdue"
    },
    {
        id: 3,
        itemId: 9,
        itemName: "Scientific Calculator",
        userId: "user4",
        userName: "Sarah Williams",
        borrowDate: "2026-01-28",
        dueDate: "2026-02-11",
        returnDate: null,
        status: "active"
    }
];

export const mockClaims = [
    {
        id: 1,
        itemId: 2,
        itemName: "iPhone 15 Pro",
        userId: "user5",
        userName: "Alex Brown",
        claimDate: "2026-01-30",
        status: "pending",
        description: "This is my phone, I lost it in the cafeteria yesterday"
    },
    {
        id: 2,
        itemId: 6,
        itemName: "Red Backpack",
        userId: "user6",
        userName: "Emily Davis",
        claimDate: "2026-01-29",
        status: "pending",
        description: "My backpack with my student ID inside"
    }
];

export const mockUsers = [
    { id: "user1", name: "John Doe", email: "john@example.com", role: "user" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: "user3", name: "Mike Johnson", email: "mike@example.com", role: "user" },
    { id: "user4", name: "Sarah Williams", email: "sarah@example.com", role: "user" },
    { id: "admin1", name: "Admin User", email: "admin@example.com", role: "admin" }
];

export const mockStats = {
    totalItems: 10,
    lostItems: 3,
    foundItems: 4,
    warehouseItems: 3,
    borrowableItems: 3,
    pendingClaims: 2,
    overdueItems: 1,
    activeBorrows: 3
};
