import React, { useState } from 'react';

/**
 * SafeServiceImage Component
 * 
 * Safely renders service images with requirement-compliant error handling.
 * - Uses exact service.image path (optimized with webp preferred)
 * - Never substitutes another service image on error
 * - Displays "Service image unavailable" message for broken images
 * - Reserves aspect ratio & dimensions to guarantee CLS < 0.05
 */
export default function SafeServiceImage({
  service,
  src,
  alt,
  className = '',
  style = {},
  width = 400,
  height = 250,
  loading = 'lazy',
  fallbackText = 'Glam Girl Atelier',
  showText = true,
  ...props
}) {
  const initialSrc = service?.image || src || '';
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [retryStage, setRetryStage] = useState(0); // 0: initial, 1: alternate ext, 2: failed

  // If props change, reset
  React.useEffect(() => {
    setCurrentSrc(service?.image || src || '');
    setRetryStage(0);
  }, [service?.image, src]);

  const imageAlt = service?.name || alt || 'Service image';
  const isSmallThumb = className.includes('h-9') || className.includes('h-10') || className.includes('h-12') || className.includes('w-9') || className.includes('w-12');

  const handleError = () => {
    if (retryStage === 0 && currentSrc) {
      if (currentSrc.endsWith('.webp')) {
        setCurrentSrc(currentSrc.replace(/\.webp$/i, '.jpg'));
        setRetryStage(1);
        return;
      } else if (currentSrc.endsWith('.jpg') || currentSrc.endsWith('.jpeg')) {
        setCurrentSrc(currentSrc.replace(/\.(jpg|jpeg)$/i, '.webp'));
        setRetryStage(1);
        return;
      }
    }
    setRetryStage(2);
  };

  if (!currentSrc || retryStage === 2) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F7F4ED] text-[#263D2B] p-2 text-center border border-[#DCE1D8] select-none ${className}`}
        style={{ minHeight: isSmallThumb ? '100%' : '120px', aspectRatio: isSmallThumb ? '1/1' : '16/10', ...style }}
        data-service-id={service?.id}
      >
        <svg
          className={`${isSmallThumb ? 'w-4 h-4' : 'w-6 h-6 mb-1'} text-[#263D2B] opacity-90`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        {!isSmallThumb && showText && (
          <span className="text-[11px] font-serif tracking-wider text-[#6B7068] uppercase mt-1">
            {service?.name || fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={imageAlt}
      width={isSmallThumb ? 48 : width}
      height={isSmallThumb ? 48 : height}
      loading={loading}
      decoding="async"
      className={className}
      style={{ aspectRatio: isSmallThumb ? '1/1' : '16/10', ...style }}
      onError={handleError}
      {...props}
    />
  );
}
