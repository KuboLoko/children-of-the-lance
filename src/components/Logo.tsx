import { useEffect, useRef, useState } from "react";
import { COTL_LOGO } from "../data/site";

/**
 * Shows the official Dragonlance logo image. Until that file exists at
 * public/images/logo/dragonlance-logo.png, it falls back to a plain text
 * wordmark so nothing looks broken.
 *
 * @param className         Applied to the <img>.
 * @param fallbackClassName Applied to the <span> wordmark when the image is missing.
 */
export function Logo({
  className,
  fallbackClassName,
}: {
  className?: string;
  fallbackClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    // If it finished loading but has no size, the file 404'd.
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return <span className={fallbackClassName ?? className}>Dragonlance</span>;
  }

  return (
    <img
      ref={imgRef}
      className={className}
      src={COTL_LOGO}
      alt="Dragonlance"
      onError={() => setFailed(true)}
    />
  );
}
