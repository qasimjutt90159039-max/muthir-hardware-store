import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Tag,
  Warehouse,
  ClipboardList,
  Users,
  Star,
  TicketPercent,
  Mail,
  BarChart3,
  Settings,
  ArrowLeft,
  Wrench,
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const adminLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Boxes },
    { label: 'Brands', path: '/admin/brands', icon: Tag },
    { label: 'Inventory & Alerts', path: '/admin/inventory', icon: Warehouse },
    { label: 'Orders Pipeline', path: '/admin/orders', icon: ClipboardList },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Review Moderation', path: '/admin/reviews', icon: Star },
    { label: 'Coupons Engine', path: '/admin/coupons', icon: TicketPercent },
    { label: 'Customer Messages', path: '/admin/messages', icon: Mail },
    { label: 'Sales Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111111] text-zinc-300 border-r border-zinc-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Admin Header / Logo */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-zinc-950 font-black">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-heading font-extrabold text-white">
                  MUTAHIR <span className="text-orange-500">ADMIN</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">CONTROL CENTER</div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="py-4 px-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] text-xs font-mono">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-zinc-950 font-bold shadow-sm'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Back to Store */}
        <div className="p-3 border-t border-zinc-800 bg-[#0d0d0d]">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded text-xs font-mono text-zinc-400 hover:text-orange-400 hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Store</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
