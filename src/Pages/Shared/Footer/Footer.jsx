import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Newsletter subscription API can be connected here.
    alert("Thank you for your interest in Abrar's Dine!");
    setEmail("");
  };

  const aboutLinks = [
    { name: "Home", path: "/" },
    { name: "All Foods", path: "/AllFood" },
    { name: "Contact", path: "/contact" },
    {
      name: "Why Abrar's Dine",
      path: "https://akmazhar2475.hashnode.dev/",
      external: true,
    },
  ];

  const supportLinks = [
    { name: "Support Center", path: "/support" },
    { name: "Feedback", path: "/feedback" },
    { name: "Our Services", path: "/service" },
    { name: "Accessibility", path: "/accessibility" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/akm_azhar",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 13.9 4.9 22H1.8l7.3-8.4L1.3 2h6.5l4.4 7.4L18.9 2Zm-1.1 18h1.7L6.8 3.9H5L17.8 20Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/watch?v=C8-eClpeH80",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/akm_azharabrartinni/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="overflow-hidden bg-[#174C3A] text-white">
      {/* Main Footer */}
      <div className="relative px-5 pb-12 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/5"></div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#D4A853]/10"></div>
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#D4A853]/5 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg shadow-black/10">
                <img
                  src="https://i.ibb.co/HhzCWjS/kiii.png"
                  alt="Abrar's Dine Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  Abrar's <span className="text-[#E8C77D]">Dine</span>
                </h2>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  Taste Beyond Ordinary
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/70">
              Indulge in a delightful culinary journey at Abrar's Dine. Discover
              an exquisite selection of Bangladeshi, Chinese, Japanese, Italian,
              Thai and Mexican cuisines — bringing exceptional flavours to your
              table at affordable prices.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4A853]"></span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C77D]">
                Made with Passion
              </span>
            </div>
          </div>

          {/* About Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-sm font-extrabold uppercase tracking-[0.16em] text-[#E8C77D]">
              Explore
            </h3>

            <ul className="space-y-4">
              {aboutLinks.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#E8C77D]"
                    >
                      {item.name}
                      <span className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#E8C77D]"
                    >
                      {item.name}
                      <span className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-sm font-extrabold uppercase tracking-[0.16em] text-[#E8C77D]">
              Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-[#E8C77D]"
                  >
                    {item.name}
                    <span className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#E8C77D]">
              Stay Connected
            </h3>

            <h4 className="text-2xl font-bold leading-snug text-white">
              Get delicious updates
              <br />
              <span className="text-[#E8C77D]">in your inbox.</span>
            </h4>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Subscribe to receive our latest food updates, special offers and
              delicious news.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label
                htmlFor="footer-email"
                className="mb-2 block text-xs font-semibold text-white/80"
              >
                Your Email Address
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[#D4A853] focus:bg-white/15 focus:ring-2 focus:ring-[#D4A853]/20"
                />

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A853] px-6 py-3.5 text-sm font-extrabold text-[#24382E] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8C77D] hover:shadow-xl hover:shadow-[#D4A853]/20 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#E8C77D] focus:ring-offset-2 focus:ring-offset-[#174C3A]"
                >
                  Subscribe
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <p className="mt-4 text-xs text-white/45">
              We respect your inbox. No unnecessary emails.
            </p>
          </div>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent"></div>
      </div>

      {/* Bottom Footer */}
      <div className="relative px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-medium text-white/75">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-[#E8C77D]">Abrar's Dine</span>.
              All rights reserved.
            </p>

            <p className="mt-1 text-xs text-white/45">
              Crafted with care by A K M Azhar.
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center gap-3">
            <span className="mr-2 hidden text-xs font-semibold uppercase tracking-widest text-white/50 sm:block">
              Follow Us
            </span>

            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#24382E] hover:shadow-lg hover:shadow-[#D4A853]/20 focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
              >
                <span className="h-5 w-5">{social.icon}</span>
              </a>
            ))}
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8C77D] transition-all duration-300 hover:text-white"
          >
            Back to Top
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D4A853]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#D4A853] group-hover:text-[#24382E]">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
