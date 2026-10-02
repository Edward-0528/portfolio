import React, { useState } from 'react';

/**
 * A device frame around a real Core+ screenshot.
 *
 * The screenshots are 1179-wide iPhone captures, so the frame is sized by
 * width and lets the 19.5:9 aspect ratio set the height. The inner image
 * fades in on decode — a half-painted screenshot inside a phone bezel looks
 * broken in a way an empty bezel does not.
 */
const PhoneFrame = ({ src, alt, className = '', priority = false, children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2.2rem] bg-[#1A1A2E] p-[3px] shadow-[0_24px_60px_-12px_rgba(26,26,46,0.35),0_8px_20px_-6px_rgba(26,26,46,0.2)]">
        {/* Bezel highlight — a thin light edge sells the glass */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/15" />

        <div className="relative overflow-hidden rounded-[2rem] bg-[#F4F5F3] aspect-[1179/2277]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[1.5%] z-20 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#1A1A2E]" />

          {src && (
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              className={`h-full w-full object-cover object-top transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
