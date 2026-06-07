type LogoMarkProps = {
  alt?: string;
  className?: string;
  imageClassName?: string;
  src?: string;
};

export default function LogoMark({
  alt = '',
  className = '',
  imageClassName = '',
  src = '/smps-logo-transparent.png',
}: LogoMarkProps) {
  return (
    <span className={`brand-logo-frame ${className}`} aria-hidden={alt ? undefined : true}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`brand-logo-image ${imageClassName}`} />
    </span>
  );
}
