import React, { useState } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Save 
} from 'lucide-react';
import { getWhatsAppConfig, formatDisplayPhone } from '../../utils/whatsapp';
import { SALON_INFO } from '../../data/salonData';

export default function AdminSettings() {
  const { phoneNumber: currentEnvPhone, rawPhone, salonName, salonLocation } = getWhatsAppConfig();
  const [copiedTemplate, setCopiedTemplate] = useState(null);

  const templates = [
    {
      id: 'confirm',
      title: 'Booking Confirmation Template',
      desc: 'Sent immediately when an appointment is confirmed.',
      text: `Hello [Guest Name]! 🌿\nYour appointment at ${salonName} (Ottawa) is confirmed for [Date] at [Time] for [Service Name].\nStudio Address: ${salonLocation}.\nWe look forward to pampering you!`
    },
    {
      id: 'reminder',
      title: '24-Hour Appointment Reminder',
      desc: 'Sent the morning before the guest\'s scheduled session.',
      text: `Dear [Guest Name]! 🌿 Friendly reminder of your beauty appointment at ${salonName} tomorrow at [Time] for [Service Name].\nPlease reply if you need to adjust your time. See you soon!`
    },
    {
      id: 'thankyou',
      title: 'Post-Visit Care & Review',
      desc: 'Sent after a treatment for aftercare advice & feedback.',
      text: `Thank you for visiting ${salonName} today, [Guest Name]! 🌿 We hope you loved your treatment. If you have a moment, we’d cherish your review on Google. Have a radiant day!`
    }
  ];

  const handleCopy = (t) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(t.text);
      setCopiedTemplate(t.id);
      setTimeout(() => setCopiedTemplate(null), 2500);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl text-[#10110F]">
      
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">Salon & WhatsApp Settings</h2>
        <p className="text-[#6B7068] text-xs sm:text-sm mt-1">Manage studio communications, WhatsApp integrations, and client messaging templates.</p>
      </div>

      {/* WhatsApp Configuration Status Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#DCE1D8]">
          <div className="w-12 h-12 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center border border-[#263D2B]/20">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#10110F] text-lg">WhatsApp Concierge Integration</h3>
            <p className="text-xs text-[#6B7068]">Online appointment dispatch destination</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
            <span className="text-[11px] text-[#6B7068] uppercase font-semibold">Active Receiving Number</span>
            <div className="font-mono text-base font-bold text-[#263D2B]">
              {formatDisplayPhone(currentEnvPhone)}
            </div>
            <div className="text-[10px] text-[#6B7068] font-mono">
              Raw ENV: {rawPhone}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1.5">
            <span className="text-[11px] text-[#6B7068] uppercase font-semibold">Universal wa.me Protocol</span>
            <div className="font-semibold text-[#10110F] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#263D2B]" />
              <span>Instant Universal Deep-Link Enabled</span>
            </div>
            <p className="text-[11px] text-[#6B7068]">
              Dispatches directly to WhatsApp Web on PC/Mac & native WhatsApp on iOS/Android.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#263D2B]/10 border border-[#263D2B]/20 text-xs text-[#263D2B] flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#263D2B] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">How to update the receiving WhatsApp number:</span>
            <span className="text-[#465640]">Update the <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#10110F] border border-[#DCE1D8]">VITE_WHATSAPP_PHONE_NUMBER</code> variable in the <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#10110F] border border-[#DCE1D8]">.env</code> file.</span>
          </div>
        </div>
      </div>

      {/* Admin Portal Dynamic Credentials Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#DCE1D8]">
          <div className="w-12 h-12 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center border border-[#263D2B]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#10110F] text-lg">Admin Authentication (.env Driven)</h3>
            <p className="text-xs text-[#6B7068]">Dynamic login credentials configured in environment variables</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
            <span className="text-[11px] text-[#6B7068] uppercase font-semibold">Configured Admin Email</span>
            <div className="font-mono text-sm font-semibold text-[#10110F]">
              {import.meta.env.VITE_ADMIN_EMAIL || 'admin@girlookedforyou.ca'}
            </div>
            <div className="text-[10px] text-[#6B7068] font-mono">
              Key: VITE_ADMIN_EMAIL
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-1">
            <span className="text-[11px] text-[#6B7068] uppercase font-semibold">Configured Admin Password</span>
            <div className="font-mono text-sm font-semibold text-[#10110F]">
              •••••••••••• (Protected in .env)
            </div>
            <div className="text-[10px] text-[#6B7068] font-mono">
              Key: VITE_ADMIN_PASSWORD
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs text-[#6B7068] space-y-1">
          <span className="font-bold text-[#10110F] block">To change your login email or password:</span>
          <p>
            Edit <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#263D2B] border border-[#DCE1D8]">VITE_ADMIN_EMAIL</code> and <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#263D2B] border border-[#DCE1D8]">VITE_ADMIN_PASSWORD</code> inside your project's <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#10110F] border border-[#DCE1D8]">.env</code> file.
          </p>
        </div>
      </div>

      {/* Canned WhatsApp Message Templates */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-6">
        <div>
          <h3 className="font-serif font-bold text-[#10110F] text-lg">Canned WhatsApp Templates</h3>
          <p className="text-xs text-[#6B7068]">Quick-copy messaging templates for client communications.</p>
        </div>

        <div className="space-y-4">
          {templates.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#10110F] text-xs sm:text-sm">{t.title}</h4>
                  <p className="text-[11px] text-[#6B7068]">{t.desc}</p>
                </div>
                <button
                  onClick={() => handleCopy(t)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#263D2B] hover:text-white text-[#10110F] border border-[#DCE1D8] text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedTemplate === t.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl font-mono text-[11px] text-[#10110F]/90 whitespace-pre-line border border-[#DCE1D8]">
                {t.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Contact Information Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE1D8] shadow-sm space-y-4 text-xs">
        <h3 className="font-serif font-bold text-[#10110F] text-lg">Studio Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[#6B7068]">Studio Address</span>
            <div className="font-medium text-[#10110F] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#263D2B]" />
              <span>{SALON_INFO.address}, {SALON_INFO.city}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[#6B7068]">Studio Phone</span>
            <div className="font-medium text-[#10110F] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#263D2B]" />
              <span>{SALON_INFO.phone}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[#6B7068]">Studio Email</span>
            <div className="font-medium text-[#10110F] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#263D2B]" />
              <span>{SALON_INFO.email}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[#6B7068]">Operating Hours</span>
            <div className="font-medium text-[#10110F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#263D2B]" />
              <span>Mon-Sat: 9:30 AM – 7:30 PM • Sun: 10:00 AM – 5:30 PM</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
