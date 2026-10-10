import React, { useState, useEffect } from 'react';
import { runFullImageValidation } from '../../utils/imageValidator';
import SafeServiceImage from '../common/SafeServiceImage';

export default function ImageValidationModal({ isOpen, onClose }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      runFullImageValidation().then((res) => {
        setReport(res);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredResults = report?.results?.filter(r => {
    if (filter === 'valid') return r.isValid;
    if (filter === 'invalid') return !r.isValid;
    return true;
  }) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-[#DCE1D8] rounded-2xl shadow-2xl overflow-hidden text-[#10110F] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#10110F] flex items-center gap-2">
              <span>Service Image Validation System</span>
              {report?.isEverythingValid && (
                <span className="text-xs bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                  100% PASS
                </span>
              )}
            </h2>
            <p className="text-xs text-[#6B7068] mt-1">
              Automatic scanner for all 72 master service images
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white border border-[#DCE1D8] text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Report Summary Cards */}
        {loading ? (
          <div className="p-12 text-center text-[#6B7068]">
            <div className="animate-spin w-8 h-8 border-2 border-[#263D2B] border-t-transparent rounded-full mx-auto mb-4" />
            Scanning 72 service image files and loading paths...
          </div>
        ) : (
          <>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#F7F4ED]/50 border-b border-[#DCE1D8]">
              <div className="p-3 bg-white rounded-xl border border-[#DCE1D8]">
                <div className="text-[11px] text-[#6B7068] font-medium uppercase tracking-wider">Total Services</div>
                <div className="text-2xl font-serif font-bold text-[#10110F] mt-1">{report.totalServices}</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[11px] text-emerald-800 font-medium uppercase tracking-wider">Images Found</div>
                <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">{report.imagesFound}</div>
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-[11px] text-orange-800 font-medium uppercase tracking-wider">Missing Images</div>
                <div className="text-2xl font-serif font-bold text-orange-700 mt-1">{report.missingImages}</div>
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <div className="text-[11px] text-red-800 font-medium uppercase tracking-wider">Broken Paths</div>
                <div className="text-2xl font-serif font-bold text-red-700 mt-1">{report.brokenPaths}</div>
              </div>

              <div className="p-3 bg-[#263D2B]/10 rounded-xl border border-[#263D2B]/20">
                <div className="text-[11px] text-[#263D2B] font-medium uppercase tracking-wider">Duplicates</div>
                <div className="text-2xl font-serif font-bold text-[#263D2B] mt-1">{report.duplicateMappings}</div>
              </div>
            </div>

            {/* Overall Status Banner */}
            <div className="px-6 py-3 bg-[#F7F4ED] border-b border-[#DCE1D8] flex items-center justify-between">
              <span className="font-semibold text-sm text-[#10110F]">
                Status: <span className={report.isEverythingValid ? 'text-emerald-700' : 'text-orange-700'}>{report.summaryText}</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-[#263D2B] text-white' : 'bg-white text-[#6B7068] border border-[#DCE1D8]'}`}
                >
                  All (72)
                </button>
                <button
                  onClick={() => setFilter('valid')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'valid' ? 'bg-emerald-600 text-white' : 'bg-white text-[#6B7068] border border-[#DCE1D8]'}`}
                >
                  Valid ({report.validCount})
                </button>
                <button
                  onClick={() => setFilter('invalid')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'invalid' ? 'bg-red-600 text-white' : 'bg-white text-[#6B7068] border border-[#DCE1D8]'}`}
                >
                  Issues ({report.totalServices - report.validCount})
                </button>
              </div>
            </div>

            {/* Results Table / List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-3">
              {filteredResults.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 bg-white border border-[#DCE1D8] rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#DCE1D8] shrink-0 bg-[#F7F4ED]">
                      <SafeServiceImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#10110F] flex items-center gap-2">
                        <span>{idx + 1}. {item.name}</span>
                        <span className="text-[10px] text-[#465640] uppercase px-2 py-0.5 rounded bg-[#263D2B]/10 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[#263D2B] mt-0.5">
                        {item.image}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-right">
                      <span className="text-emerald-700">✓ Service exists</span>
                      <span className="text-emerald-700">✓ Image path exists</span>
                      <span className={item.imageFileExists ? 'text-emerald-700' : 'text-red-600'}>
                        {item.imageFileExists ? '✓' : '✗'} Image file exists
                      </span>
                      <span className={item.canLoad ? 'text-emerald-700' : 'text-red-600'}>
                        {item.canLoad ? '✓' : '✗'} Image can be loaded
                      </span>
                    </div>

                    <div className="pl-3 border-l border-[#DCE1D8]">
                      {item.isValid ? (
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 rounded-full font-medium text-xs">
                          VALID
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-red-500/20 text-red-700 border border-red-500/30 rounded-full font-medium text-xs">
                          INVALID
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
