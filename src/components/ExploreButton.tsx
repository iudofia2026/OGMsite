'use client';

interface ExploreButtonProps {
  href: string;
}

export default function ExploreButton({ href }: ExploreButtonProps) {
  return (
    <a
      href={href}
      className="group relative inline-block font-goldenbook text-[1.2em] tracking-[0.2em] uppercase cursor-pointer"
      style={{
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255, 255, 255, 0.6)',
      } as React.CSSProperties}
    >
      <span className="relative z-10 block whitespace-nowrap">
        Explore
      </span>
      <span
        className="absolute left-0 top-0 z-0 whitespace-nowrap overflow-hidden transition-all duration-500 ease-out w-0 group-hover:w-full group-hover:drop-shadow-[0_0_23px_#D4AF37] border-r-[2px] border-r-[#D4AF37]"
        style={{
          color: '#D4AF37',
          WebkitTextStroke: '1px #D4AF37',
        } as React.CSSProperties}
      >
        Explore
      </span>
    </a>
  );
}
