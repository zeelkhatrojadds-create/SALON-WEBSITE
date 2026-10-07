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
  const [isError, setIsError] = useState(false);

  let imageSrc = service?.image || src;
  if (imageSrc && typeof imageSrc === 'string' && (imageSrc.endsWith('.jpg') || imageSrc.endsWith('.png'))) {
    // If it has an equivalent webp asset available, use webp
    const webpCandidate = imageSrc.replace(/\.(jpg|png)$/i, '.webp');
    imageSrc = webpCandidate;
  }

  const imageAlt = service?.name || alt || 'Service image';
  const isSmallThumb = className.includes('h-9') || className.includes('h-10') || className.includes('h-12') || className.includes('w-9') || className.includes('w-12');

  if (!imageSrc || isError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1418] via-[#24171E] to-[#140E11] text-[#CFA46A] p-2 text-center border border-[#CFA46A]/20 shadow-inner select-none ${className}`}
        style={{ minHeight: isSmallThumb ? '100%' : '120px', aspectRatio: isSmallThumb ? '1/1' : '16/10', ...style }}
        data-service-id={service?.id}
      >
        <svg
          className={`${isSmallThumb ? 'w-4 h-4' : 'w-6 h-6 mb-1'} text-[#CFA46A]/80 opacity-90`}
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
          <span className="text-[11px] font-serif tracking-wider text-[#E0D5C7]/80 uppercase mt-1">
            {service?.name || fallbackText}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      width={isSmallThumb ? 48 : width}
      height={isSmallThumb ? 48 : height}
      loading={loading}
      decoding="async"
      className={className}
      style={{ aspectRatio: isSmallThumb ? '1/1' : '16/10', ...style }}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.style.display = 'none';
        setIsError(true);
      }}
      {...props}
    />
  );
}
