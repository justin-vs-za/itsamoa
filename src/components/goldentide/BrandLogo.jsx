/**
 * Official Golden Tide company mark — globe with three eastern circle-slices.
 * Asset: /golden-tide-logo.png (and .svg) in public/
 */
export default function BrandLogo({
  size = 36,
  className = "",
  alt = "Golden Tide",
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <img
      src="/golden-tide-logo.png"
      width={typeof size === "number" ? size : undefined}
      height={typeof size === "number" ? size : undefined}
      alt={alt}
      className={`shrink-0 rounded-lg object-cover ${className}`}
      style={{ width: px, height: px }}
      decoding="async"
    />
  );
}
