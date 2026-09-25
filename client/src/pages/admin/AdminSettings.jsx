import React, { useState, useEffect } from 'react';
import { Settings, Save, Store, ShieldCheck, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Mutahir Hardware Store',
    businessCategory: 'Hardware Store / Tool Store / Building & Home Improvement Supplies',
    phone: '+92 308 6236092',
    address: 'Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan',
    announcementText: 'Hardware • Tools • Workshop Essentials',
    demoPriceNotice: 'DEMO PRICE — VERIFY BEFORE LAUNCH',
    baseDeliveryFee: 250,
    freeDeliveryThreshold: 5000,
    isDemoModeActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (err) {
        console.error('Failed to load store settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', settings);
      success('Store settings updated successfully.');
    } catch (err) {
      toastError('Failed to update store settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader text="Loading Settings..." />;
  }

  return (
    <div className="space-y-6 font-mono text-xs max-w-3xl">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Store Configuration & <span className="text-orange-500">Settings</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Verified business details, announcements, and delivery pricing rules
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Verified Business Parameters (Readonly/Protected) */}
        <div className="bg-[#161616] p-6 rounded border border-zinc-800 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-orange-500" />
            <span>Verified Physical Store Parameters</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Business Name</label>
              <input
                type="text"
                disabled
                value={settings.storeName}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-zinc-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Verified Phone Hotline
              </label>
              <input
                type="text"
                disabled
                value={settings.phone}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-zinc-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Verified Multan Store Address
              </label>
              <input
                type="text"
                disabled
                value={settings.address}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-zinc-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Operational & Pricing Thresholds */}
        <div className="bg-[#161616] p-6 rounded border border-zinc-800 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white">
            Operational & Announcement Settings
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">
                  Base Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.baseDeliveryFee}
                  onChange={(e) => setSettings({ ...settings, baseDeliveryFee: Number(e.target.value) })}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">
                  Free Delivery Threshold (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Demo Price Notice Text
              </label>
              <input
                type="text"
                value={settings.demoPriceNotice}
                onChange={(e) => setSettings({ ...settings, demoPriceNotice: e.target.value })}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase rounded flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
