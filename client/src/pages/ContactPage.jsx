import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Send, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { success, error: toastError } = useToast();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toastError('Please fill in your name, phone number, and message inquiry.');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/contact', formData);
      setSubmitted(true);
      success('Thank you! Your message has been received by our store team.');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      toastError('Failed to send message. Please call our store phone directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-900">Contact Store</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Store Details & Call Button */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-border rounded p-6 md:p-8 shadow-sm space-y-4">
            <span className="px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-600 font-mono text-xs font-bold uppercase">
              STORE CONTACT HOTLINE
            </span>
            <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
              CONTACT MUTAHIR <span className="text-orange-600">HARDWARE STORE</span>
            </h1>
            <p className="text-xs text-zinc-600 font-sans leading-relaxed">
              Have inquiries about tool availability, bulk supply quotes for construction jobsites, or directions to our Multan shop? Reach out directly via phone or send an inquiry message below.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-200 font-mono text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-900 uppercase">Verified Phone Hotline:</div>
                  <a
                    href="tel:+923086236092"
                    className="text-sm font-bold text-orange-600 hover:underline"
                  >
                    +92 308 6236092
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-zinc-900 uppercase">Physical Store Address:</div>
                  <div className="text-zinc-600">
                    Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="tel:+923086236092"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-orange-glow"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store Now (+92 308 6236092)</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map embed */}
          <div className="bg-white border border-brand-border rounded p-4 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase text-zinc-800 mb-2">
              Physical Location Map: Vehari Chowk, Multan
            </h3>
            <div className="aspect-video w-full rounded overflow-hidden border border-zinc-200">
              <iframe
                title="Mutahir Hardware Location"
                src="https://maps.google.com/maps?q=Vehari%20Chowk,%20Multan,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="bg-white border border-brand-border rounded p-6 md:p-8 shadow-sm">
          <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 mb-2 pb-2 border-b border-zinc-200">
            Send an Inquiry to Our Counter
          </h2>
          <p className="text-xs font-mono text-zinc-500 mb-6">
            Leave your contact information and requirement. Our team will review your inquiry and follow up via phone call.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center font-mono space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-bold text-emerald-800 text-sm">Message Sent Successfully!</div>
              <p className="text-xs text-emerald-700">
                Our counter staff at Haqbaho Market has received your inquiry. We will contact you at your provided phone number shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-emerald-800 font-bold underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Your Active Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Your Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Inquiry Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Bulk Screw & Fastener Pricing"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Your Message & Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Specify tool models, sizes, quantities, or technical questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Message...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
