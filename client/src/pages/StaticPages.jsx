import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Truck, RotateCcw, Shield, FileText, ChevronRight, Phone } from 'lucide-react';

export const FAQPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white border border-brand-border rounded p-8 shadow-sm space-y-6">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-heading font-black text-brand-black">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-xs font-mono text-zinc-500 mt-1">Common inquiries about ordering, payments, and store operations</p>
      </div>

      <div className="space-y-4 font-mono text-xs divide-y divide-zinc-100">
        <div className="pt-3 first:pt-0">
          <h3 className="font-bold text-zinc-900 text-sm mb-1">What payment methods do you accept?</h3>
          <p className="text-zinc-600 font-sans text-xs">
            We accept Cash on Delivery (COD) for orders delivered within Multan and surrounding areas, as well as direct cash payment at our Haqbaho Market store counter.
          </p>
        </div>

        <div className="pt-3">
          <h3 className="font-bold text-zinc-900 text-sm mb-1">Can I inspect the tool before payment?</h3>
          <p className="text-zinc-600 font-sans text-xs">
            Yes. With Cash on Delivery, you may inspect the package seal and model markings upon arrival before settling the cash payment with the delivery rider.
          </p>
        </div>

        <div className="pt-3">
          <h3 className="font-bold text-zinc-900 text-sm mb-1">What does "Demo Price — Verify Before Launch" mean?</h3>
          <p className="text-zinc-600 font-sans text-xs">
            During software deployment, prices reflect catalog benchmarks. Final in-store purchase prices are confirmed in accordance with prevailing wholesale market rates.
          </p>
        </div>

        <div className="pt-3">
          <h3 className="font-bold text-zinc-900 text-sm mb-1">How can I confirm stock for large contractor orders?</h3>
          <p className="text-zinc-600 font-sans text-xs">
            For commercial contractor volumes, please call our primary store phone directly at +92 308 6236092.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ShippingPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white border border-brand-border rounded p-8 shadow-sm space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-heading font-black text-brand-black">SHIPPING & DISPATCH INFORMATION</h1>
        <p className="text-xs text-zinc-500 mt-1">Multan local delivery and dispatch policies</p>
      </div>

      <div className="space-y-4 text-zinc-700 font-sans">
        <p>
          <strong>Local Delivery:</strong> Standard delivery within Multan has a base fee of PKR 250. Orders totaling PKR 5,000 or above qualify for <strong>FREE DELIVERY</strong>.
        </p>
        <p>
          <strong>Dispatch Timeline:</strong> Orders placed during normal business hours are queued for processing and dispatched via local courier riders. Our team will verify delivery details via phone call before dispatch.
        </p>
        <p>
          <strong>Self-Collection:</strong> You may also choose <em>In-Store Pickup</em> at checkout to collect your items directly from our counter at Haqbaho Market, Vehari Chowk, Multan with zero handling charges.
        </p>
      </div>
    </div>
  </div>
);

export const ReturnsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white border border-brand-border rounded p-8 shadow-sm space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-heading font-black text-brand-black">RETURNS & VERIFICATION POLICY</h1>
        <p className="text-xs text-zinc-500 mt-1">Hardware return criteria and inspection requirements</p>
      </div>

      <div className="space-y-4 text-zinc-700 font-sans">
        <p>
          <strong>Package Verification:</strong> If a tool delivered to you does not match the model number, brand, or specifications ordered, please notify our team within 24 hours of delivery by calling +92 308 6236092.
        </p>
        <p>
          <strong>Condition Requirements:</strong> Returned hardware items must remain in un-operated, brand-new condition with complete original boxes, chuck keys, manuals, and accessories.
        </p>
        <p>
          <strong>Consumables:</strong> Cutting discs, sandpaper, sealant tapes, and fasteners that have been opened or partially consumed are non-returnable.
        </p>
      </div>
    </div>
  </div>
);

export const PrivacyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white border border-brand-border rounded p-8 shadow-sm space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-heading font-black text-brand-black">PRIVACY NOTICE</h1>
        <p className="text-xs text-zinc-500 mt-1">How customer data is processed by Mutahir Hardware Store</p>
      </div>

      <div className="space-y-4 text-zinc-700 font-sans">
        <p>
          We respect customer privacy. Information collected during checkout (such as recipient name, contact phone number, and delivery street address) is utilized exclusively to route, dispatch, and fulfill your orders.
        </p>
        <p>
          We do not sell, rent, or lease customer contact information to third-party marketing companies. Password data is hashed using industry standard bcrypt encryption.
        </p>
      </div>
    </div>
  </div>
);

export const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white border border-brand-border rounded p-8 shadow-sm space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-heading font-black text-brand-black">TERMS OF SERVICE</h1>
        <p className="text-xs text-zinc-500 mt-1">Platform terms of operation</p>
      </div>

      <div className="space-y-4 text-zinc-700 font-sans">
        <p>
          By accessing or submitting orders on this platform, you agree to comply with standard trade verification. Orders submitted via Cash on Delivery represent a binding agreement to accept and pay for verified deliveries.
        </p>
        <p>
          Product specifications and photos reflect authentic manufacturer benchmarks. For safety compliance, users must review all operating manuals before operating high-voltage or rotary machinery.
        </p>
      </div>
    </div>
  </div>
);
