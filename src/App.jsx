import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminOverview from './pages/AdminOverview';
import DealersDashboard from './pages/DealersDashboard';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import TVDisplay from './pages/TVDisplay';

import OverviewAnalytics from './pages/OverviewAnalytics';
import OverviewInventory from './pages/OverviewInventory';
import OverviewKanban from './pages/OverviewKanban';
import Productssheet from './pages/Productssheet';
import AdminOverview2 from './pages/AdminOverview2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DealersDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="productsheet" element={<Productssheet />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<AdminOverview />} />
          <Route path="admin-v2" element={<AdminOverview2 />} />
          <Route path="overview-analytics" element={<OverviewAnalytics />} />
          <Route path="overview-inventory" element={<OverviewInventory />} />
          <Route path="overview-kanban" element={<OverviewKanban />} />
        </Route>
        {/* TV Display - No sidebar */}
        <Route path="/tv-display" element={<TVDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
