import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Public Pages
import HomePage from './pages/HomePage';
import ReportLostItem from './pages/ReportLostItem';
import ReportFoundItem from './pages/ReportFoundItem';
import WarehouseItems from './pages/WarehouseItems';
import BorrowableItems from './pages/BorrowableItems';
import ClaimItem from './pages/ClaimItem';
import MyItems from './pages/MyItems';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageWarehouse from './pages/admin/ManageWarehouse';
import ApproveClaims from './pages/admin/ApproveClaims';
import BorrowRecords from './pages/admin/BorrowRecords';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/report-lost" element={<ReportLostItem />} />
          <Route path="/report-found" element={<ReportFoundItem />} />
          <Route path="/warehouse" element={<WarehouseItems />} />
          <Route path="/borrowable" element={<BorrowableItems />} />
          <Route path="/claim" element={<ClaimItem />} />
          <Route path="/my-items" element={<MyItems />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/warehouse" element={<ManageWarehouse />} />
          <Route path="/admin/claims" element={<ApproveClaims />} />
          <Route path="/admin/borrows" element={<BorrowRecords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
