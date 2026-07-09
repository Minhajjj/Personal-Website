import Link from "next/link";
import FooterAnimationInit from "@/components/FooterAnimationInit";

const Footer = () => {
  const name = "MINHAJ";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#211E1F] min-h-screen font-sans flex flex-col text-white footer-animation relative z-0">
      <FooterAnimationInit />

      <h1 className="gradient-text bg-clip-text text-transparent text-[clamp(5rem,25vw,16rem)] sm:text-[clamp(10.5rem,19vw,16rem)] md:text-[clamp(8rem,25vw,18rem)] lg:text-[clamp(10rem,25vw,24rem)] font-semibold mb-20 tracking-wide leading-[0.9] m-0 p-0 block overflow-hidden">
        {name}
      </h1>

      <div className="mt-auto mb-24 md:mb-20 px-4">
        <p className="text-sm text-[#C4C2B7] mb-6 tracking-widest">SITEMAP</p>
        <nav className="flex flex-col text-left text-xl md:text-2xl font-medium space-y-3">
          <Link
            href="/#about"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to About section"
          >
            About
          </Link>
          <Link
            href="/#services"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Services section"
          >
            Services
          </Link>
          <Link
            href="/projects"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Projects page"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#D9D7AF] transition-colors duration-300"
            aria-label="Navigate to Contact page"
          >
            Contact
          </Link>
        </nav>
      </div>

      <p className="text-sm text-[#C4C2B7] mb-6 px-4 self-end">
        © {currentYear} {name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
