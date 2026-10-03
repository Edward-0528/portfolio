import { useState, useEffect } from 'react';

/**
 * Decides whether the hero should attempt WebGL at all.
 *
 * This lives in its own module on purpose: HeroSection needs the answer
 * before it decides whether to lazy-load the canvas, and importing it from
 * HeroCanvas would pull three.js into the main bundle and defeat the split.
 */
const useCanRender3D = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Phones pay the most for WebGL and benefit the least from it here.
    if (window.matchMedia('(max-width: 1023px)').matches) return;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return;

    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) return;
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '';
      // Software rasterisers run this at single-digit frame rates.
      if (/swiftshader|llvmpipe|softpipe/i.test(renderer)) return;
      setCanRender(true);
    } catch {
      /* leave it off */
    }
  }, []);

  return canRender;
};

export default useCanRender3D;
