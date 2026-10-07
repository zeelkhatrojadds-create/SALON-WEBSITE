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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#140F11] border border-[#2D2326] rounded-2xl shadow-2xl overflow-hidden text-[#F5EBE6] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#2D2326] flex items-center justify-between bg-[#1A1416]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#D4A373] flex items-center gap-2">
              <span>Service Image Validation System</span>
              {report?.isEverythingValid && (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                  100% PASS
                </span>
              )}
            </h2>
            <p className="text-xs text-[#A6979A] mt-1">
              Automatic scanner for all 72 master service images
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#251D20] text-[#A6979A] hover:text-white hover:bg-[#34272B] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Report Summary Cards */}
        {loading ? (
          <div className="p-12 text-center text-[#A6979A]">
            <div className="animate-spin w-8 h-8 border-2 border-[#D4A373] border-t-transparent rounded-full mx-auto mb-4" />
            Scanning 72 service image files and loading paths...
          </div>
        ) : (
          <>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#171113] border-b border-[#2D2326]">
              <div className="p-3 bg-[#1F171A] rounded-xl border border-[#2D2326]">
                <div className="text-[11px] text-[#A6979A] font-medium uppercase tracking-wider">Total Services</div>
                <div className="text-2xl font-serif font-bold text-white mt-1">{report.totalServices}</div>
              </div>

              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40">
                <div className="text-[11px] text-emerald-400/90 font-medium uppercase tracking-wider">Images Found</div>
                <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">{report.imagesFound}</div>
              </div>

              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40">
                <div className="text-[11px] text-amber-400/90 font-medium uppercase tracking-wider">Missing Images</div>
                <div className="text-2xl font-serif font-bold text-amber-400 mt-1">{report.missingImages}</div>
              </div>

              <div className="p-3 bg-red-950/30 rounded-xl border border-red-800/40">
                <div className="text-[11px] text-red-400/90 font-medium uppercase tracking-wider">Broken Paths</div>
                <div className="text-2xl font-serif font-bold text-red-400 mt-1">{report.brokenPaths}</div>
              </div>

              <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40">
                <div className="text-[11px] text-purple-400/90 font-medium uppercase tracking-wider">Duplicates</div>
                <div className="text-2xl font-serif font-bold text-purple-400 mt-1">{report.duplicateMappings}</div>
              </div>
            </div>

            {/* Overall Status Banner */}
            <div className="px-6 py-3 bg-[#1C1618] border-b border-[#2D2326] flex items-center justify-between">
              <span className="font-semibold text-sm text-[#E0D3CE]">
                Status: <span className={report.isEverythingValid ? 'text-emerald-400' : 'text-amber-400'}>{report.summaryText}</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-[#D4A373] text-[#140F11]' : 'bg-[#251D20] text-[#A6979A]'}`}
                >
                  All (72)
                </button>
                <button
                  onClick={() => setFilter('valid')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'valid' ? 'bg-emerald-500 text-white' : 'bg-[#251D20] text-[#A6979A]'}`}
                >
                  Valid ({report.validCount})
                </button>
                <button
                  onClick={() => setFilter('invalid')}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === 'invalid' ? 'bg-red-500 text-white' : 'bg-[#251D20] text-[#A6979A]'}`}
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
                  className="p-3 bg-[#1C1618] border border-[#2D2326] rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#2D2326] shrink-0 bg-[#251D20]">
                      <SafeServiceImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white flex items-center gap-2">
                        <span>{idx + 1}. {item.name}</span>
                        <span className="text-[10px] text-[#A6979A] uppercase px-2 py-0.5 rounded bg-[#251D20]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[#D4A373] mt-0.5">
                        {item.image}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-right">
                      <span className="text-emerald-400">✓ Service exists</span>
                      <span className="text-emerald-400">✓ Image path exists</span>
                      <span className={item.imageFileExists ? 'text-emerald-400' : 'text-red-400'}>
                        {item.imageFileExists ? '✓' : '✗'} Image file exists
                      </span>
                      <span className={item.canLoad ? 'text-emerald-400' : 'text-red-400'}>
                        {item.canLoad ? '✓' : '✗'} Image can be loaded
                      </span>
                    </div>

                    <div className="pl-3 border-l border-[#2D2326]">
                      {item.isValid ? (
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-medium text-xs">
                          VALID
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full font-medium text-xs">
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
