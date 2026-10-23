import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  ShieldCheck, 
  Sliders, 
  Clock, 
  Layers, 
  Tag, 
  X,
  Printer
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminDownloadableMenu() {
  const [services, setServices] = useState(() => salonDB.getServices());
  const [comboPackages, setComboPackages] = useState(() => salonDB.getActiveComboPackages());
  const [seasonalHighlights, setSeasonalHighlights] = useState(() => salonDB.getPublicSeasonalHighlights());
  const [settings, setSettings] = useState(() => salonDB.getSettings());

  // Form State
  const [editionVersion, setEditionVersion] = useState(settings.downloadableMenuVersion || 'Fall / Winter 2026 Edition');
  const [menuEnabled, setMenuEnabled] = useState(settings.downloadableMenuEnabled !== false);
  const [seasonalEnabled, setSeasonalEnabled] = useState(settings.downloadableMenuSeasonalEnabled !== false);
  const [customDisclaimer, setCustomDisclaimer] = useState(
    settings.downloadableMenuNote || 'Prices and availability subject to change. Advance reservation recommended.'
  );

  // Status & Feedback
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Sync DB
  const refreshAll = () => {
    setServices(salonDB.getServices());
    setComboPackages(salonDB.getActiveComboPackages());
    setSeasonalHighlights(salonDB.getPublicSeasonalHighlights());
    const s = salonDB.getSettings();
    setSettings(s);
  };

  useEffect(() => {
    refreshAll();
    const unsub = salonDB.subscribe(refreshAll);
    return () => unsub();
  }, []);

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      salonDB.updateSettings({
        downloadableMenuVersion: editionVersion,
        downloadableMenuEnabled: menuEnabled,
        downloadableMenuSeasonalEnabled: seasonalEnabled,
        downloadableMenuNote: customDisclaimer,
        downloadableMenuLastGenerated: new Date().toISOString()
      });

      setSaveSuccess(true);
      setActionMessage('Downloadable Beauty Menu settings saved & published successfully.');
      setTimeout(() => {
        setSaveSuccess(false);
        setActionMessage('');
      }, 4000);
    } catch (err) {
      console.error('Error saving menu settings:', err);
    }
  };

  // Generate & Download PDF as Admin
  const handleAdminGeneratePDF = async (type = 'complete') => {
    setIsGenerating(true);
    setActionMessage('');

    try {
      if (type === 'complete') {
        const { generateBeautyMenuPDF } = await import('../../utils/pdfGenerator');
        const doc = await generateBeautyMenuPDF({
          services,
          comboPackages,
          seasonalHighlights: seasonalEnabled ? seasonalHighlights : [],
          settings: { ...settings, downloadableMenuVersion: editionVersion, downloadableMenuNote: customDisclaimer },
          editionTitle: editionVersion
        });
        doc.save(`Glam-Girl-Beauty-Menu-${editionVersion.replace(/[^a-zA-Z0-9]+/g, '-')}.pdf`);
        setActionMessage('Generated complete Beauty Menu PDF successfully.');
      } else {
        const { generateSeasonalMenuPDF } = await import('../../utils/pdfGenerator');
        const doc = await generateSeasonalMenuPDF({
          seasonalHighlights,
          settings,
          seasonName: 'Fall / Winter 2026'
        });
        doc.save('Glam-Girl-Seasonal-Menu.pdf');
        setActionMessage('Generated Seasonal Beauty Menu PDF successfully.');
      }

      salonDB.updateSettings({
        downloadableMenuLastGenerated: new Date().toISOString()
      });

      setTimeout(() => setActionMessage(''), 5000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setActionMessage('Failed to generate PDF. Please check your data.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#10110F]">
      
      {/* 1. Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE1D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-[11px] font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>PDF MENU GOVERNANCE</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
            Downloadable Beauty Menu Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7068] font-light max-w-2xl">
            Configure, preview, and generate the official PDF menu for GLAM GIRL BY JANKI. Synchronizes automatically with the 72 catalog services and approved seasonal rituals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="global-button-secondary !py-2.5 !px-4 text-xs uppercase font-bold flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#263D2B]" />
            <span>Preview Menu</span>
          </button>

          <button
            type="button"
            onClick={() => handleAdminGeneratePDF('complete')}
            disabled={isGenerating}
            className="global-button !py-2.5 !px-5 text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
            <span>{isGenerating ? 'Generating PDF...' : 'Generate Latest PDF'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage('')} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Live Data Source of Truth Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Catalog Treatments</span>
          <span className="text-2xl font-serif font-bold text-[#10110F]">{services.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">100% Synchronized</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Combo Packages</span>
          <span className="text-2xl font-serif font-bold text-[#263D2B]">{comboPackages.length}</span>
          <span className="text-[10px] text-[#6B7068] block mt-0.5">Active Bundles</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Seasonal Rituals</span>
          <span className="text-2xl font-serif font-bold text-[#B48C3C]">{seasonalHighlights.length}</span>
          <span className="text-[10px] text-amber-600 font-bold block mt-0.5">Approved Offers Only</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DCE1D8] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Public Status</span>
          <span className={`text-base font-bold block mt-1 ${menuEnabled ? 'text-[#263D2B]' : 'text-neutral-500'}`}>
            {menuEnabled ? 'Published on Services' : 'Disabled'}
          </span>
          <span className="text-[10px] text-[#6B7068] block">Live Download Link</span>
        </div>
      </div>

      {/* 3. Main Form & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE1D8] shadow-xs space-y-6">
          <div className="border-b border-[#DCE1D8] pb-4">
            <h3 className="font-serif text-xl font-bold text-[#10110F]">
              PDF Menu Parameters & Branding
            </h3>
            <p className="text-xs text-[#6B7068]">
              Configure edition identifiers, inclusion rules, and custom studio disclaimers.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                Edition Version Title *
              </label>
              <input
                type="text"
                value={editionVersion}
                onChange={(e) => setEditionVersion(e.target.value)}
                placeholder="e.g. Fall / Winter 2026 Edition"
                className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              />
              <p className="text-[10.5px] text-[#6B7068] mt-1">
                Printed on the PDF cover page and used in generated filenames.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] block">
                Publication Availability
              </span>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuEnabled}
                  onChange={(e) => setMenuEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-[#10110F] block">Enable Download Section on Services Page</span>
                  <span className="text-[10.5px] text-[#6B7068]">Clients can download complete PDF and view online menu.</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-[#DCE1D8]/60">
                <input
                  type="checkbox"
                  checked={seasonalEnabled}
                  onChange={(e) => setSeasonalEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#263D2B] focus:ring-[#263D2B] cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-[#10110F] block">Include Seasonal Menu in Full PDF & Standalone Download</span>
                  <span className="text-[10.5px] text-[#6B7068]">Embeds published seasonal highlights and provides seasonal download button.</span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#10110F] mb-1.5">
                Studio Disclaimer / Notes
              </label>
              <textarea
                rows="3"
                value={customDisclaimer}
                onChange={(e) => setCustomDisclaimer(e.target.value)}
                className="w-full p-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              />
              <p className="text-[10.5px] text-[#6B7068] mt-1">
                Appears on the concluding page and running footer of all generated PDF menus.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#6B7068]">
                Changes apply instantly across all client downloads.
              </span>
              <button
                type="submit"
                className="global-button !py-2.5 !px-6 text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Security & Data Integrity Audit (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DCE1D8] shadow-xs space-y-5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#263D2B]" />
              <h3 className="font-serif text-lg font-bold text-[#10110F]">
                Data Integrity Safeguards
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#6B7068]">
              <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>No Unpublished Content:</strong> Draft services and inactive combo packages are excluded from the PDF.</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>No Expired Offers:</strong> Seasonal items past their valid-until dates are never included.</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Exact CAD Rates:</strong> Prices reflect the master unified database without discrepancies.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE1D8] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7068] block">Quick Generation Actions</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAdminGeneratePDF('complete')}
                  className="global-button-secondary !py-2 text-[11px] font-bold uppercase"
                >
                  Full Menu PDF
                </button>
                <button
                  type="button"
                  onClick={() => handleAdminGeneratePDF('seasonal')}
                  className="global-button-secondary !py-2 text-[11px] font-bold uppercase"
                >
                  Seasonal PDF
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Full Screen Live Menu Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-[#DCE1D8] shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
            <div className="p-4 sm:p-5 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B]">
                  EXECUTIVE CATALOG AUDIT
                </span>
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Atelier Beauty Menu Content Preview
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-full hover:bg-black/5 text-[#6B7068]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-sm text-[#10110F] block">
                    {editionVersion}
                  </span>
                  <span className="text-[#6B7068]">GLAM GIRL BY JANKI • 405 Euphoria Crescent, Ottawa</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdminGeneratePDF('complete')}
                  className="global-button !py-2 !px-4 text-xs font-bold uppercase"
                >
                  Download PDF
                </button>
              </div>

              <div className="space-y-4">
                <span className="font-bold text-[#263D2B] uppercase tracking-wider block">Included Categories ({services.length} Total Services)</span>
                {Array.from(new Set(services.map(s => s.categoryName || s.category))).map((cat, i) => {
                  const catItems = services.filter(s => (s.categoryName || s.category) === cat);
                  return (
                    <div key={i} className="p-3 bg-white rounded-xl border border-[#DCE1D8] flex items-center justify-between">
                      <span className="font-serif font-bold text-[#10110F]">{cat}</span>
                      <span className="font-mono text-[#263D2B] font-bold">{catItems.length} items</span>
                    </div>
                  );
                })}
              </div>

              {seasonalHighlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                  <span className="font-bold text-[#B48C3C] uppercase tracking-wider block">Included Seasonal Highlights ({seasonalHighlights.length})</span>
                  {seasonalHighlights.map(sh => (
                    <div key={sh.id} className="p-2.5 rounded-lg bg-[#F7F4ED] flex items-center justify-between text-xs">
                      <span>{sh.title} <span className="text-[#6B7068]">({sh.seasonalLabel})</span></span>
                      <span className="font-mono font-bold text-[#263D2B]">${sh.effectivePrice} CAD</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F7F4ED] border-t border-[#DCE1D8] flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="global-button !py-2 !px-5 text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
