import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Eye,
  FileText,
  Lightbulb,
  Loader2,
  Mail,
  Menu,
  MessageSquare,
  Palette,
  Phone,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useSubmitContactForm } from "./hooks/useQueries";

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Particle component ────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animClass: ["animate-float-1", "animate-float-2", "animate-float-3"][i % 3],
    delay: `${(i * 0.4) % 3}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.animClass}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `oklch(0.72 0.19 215 / ${p.opacity})`,
            animationDelay: p.delay,
            boxShadow: `0 0 ${p.size * 3}px oklch(0.72 0.19 215 / 0.3)`,
          }}
        />
      ))}
      {/* Glowing orbs */}
      <div
        className="absolute rounded-full animate-float-1"
        style={{
          width: "300px",
          height: "300px",
          left: "10%",
          top: "20%",
          background:
            "radial-gradient(circle, oklch(0.72 0.19 215 / 0.06) 0%, transparent 70%)",
          animationDuration: "15s",
        }}
      />
      <div
        className="absolute rounded-full animate-float-2"
        style={{
          width: "400px",
          height: "400px",
          right: "5%",
          top: "10%",
          background:
            "radial-gradient(circle, oklch(0.52 0.22 295 / 0.08) 0%, transparent 70%)",
          animationDuration: "20s",
        }}
      />
      <div
        className="absolute rounded-full animate-float-3"
        style={{
          width: "250px",
          height: "250px",
          left: "40%",
          bottom: "10%",
          background:
            "radial-gradient(circle, oklch(0.72 0.19 215 / 0.05) 0%, transparent 70%)",
          animationDuration: "18s",
        }}
      />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", target: "hero", ocid: "nav.home.link" },
    { label: "Services", target: "services", ocid: "nav.services.link" },
    { label: "Why Us", target: "why-us", ocid: "nav.whyus.link" },
    { label: "Contact", target: "contact", ocid: "nav.contact.link" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-blur bg-[oklch(0.085_0.018_255/0.95)] border-b border-[oklch(0.25_0.04_255)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex-shrink-0"
          >
            <img
              src="/assets/uploads/ChatGPT-Image-Feb-22-2026-08_44_35-PM-1.png"
              alt="RK NextGen Marketing"
              className="h-14 w-auto object-contain"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.target}
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium text-[oklch(0.75_0.04_240)] hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px gradient-bg transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button
              data-ocid="nav.cta.button"
              onClick={() => scrollTo("contact")}
              className="gradient-bg text-white font-semibold px-6 py-2 rounded-full border-0 hover:opacity-90 transition-opacity shadow-glow-blue"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-blur bg-[oklch(0.085_0.018_255/0.98)] border-t border-[oklch(0.25_0.04_255)] px-4 py-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.target}
                data-ocid={link.ocid}
                onClick={() => {
                  scrollTo(link.target);
                  setMenuOpen(false);
                }}
                className="text-left text-base font-medium text-[oklch(0.75_0.04_240)] hover:text-white transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.cta.button"
              onClick={() => {
                scrollTo("contact");
                setMenuOpen(false);
              }}
              className="gradient-bg text-white font-semibold rounded-full border-0 w-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, oklch(0.15 0.04 255) 0%, oklch(0.085 0.018 255) 60%)",
      }}
    >
      <Particles />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.19 215) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.19 215) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Left-aligned headline block */}
        <div className="max-w-3xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.72_0.19_215/0.4)] bg-[oklch(0.72_0.19_215/0.08)] text-sm text-[oklch(0.80_0.16_215)] mb-8">
            <Star size={14} className="fill-current" />
            <span>India's Next-Gen Digital Marketing Agency</span>
          </div>

          {/* Main headline — asymmetric weight contrast */}
          <h1 className="font-display leading-none tracking-tight mb-8 animate-fade-in-up delay-100">
            <span className="block font-medium text-3xl sm:text-4xl md:text-5xl text-[oklch(0.65_0.06_215)] mb-2 tracking-widest uppercase">
              Scale Smart.
            </span>
            <span className="block font-black text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] gradient-text leading-none">
              Grow Digital.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[oklch(0.68_0.04_240)] max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200">
            We help businesses grow online with data-driven strategies,
            innovative campaigns, and measurable results that actually move the
            needle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start animate-fade-in-up delay-300">
            <Button
              data-ocid="hero.cta.primary_button"
              onClick={() => scrollTo("contact")}
              className="gradient-bg text-white font-semibold px-8 py-3 text-base rounded-full border-0 hover:opacity-90 transition-all duration-200 shadow-glow-blue h-auto"
            >
              Get Started Today
              <ChevronRight size={18} className="ml-1" />
            </Button>

            <a
              href="https://wa.me/917993549944"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.cta.secondary_button"
            >
              <Button
                variant="outline"
                className="border-[#25D366] text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 font-semibold px-8 py-3 text-base rounded-full h-auto transition-all duration-200"
              >
                <SiWhatsapp size={18} className="mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in-up delay-400">
          {[
            { value: "100+", label: "Happy Clients" },
            { value: "500+", label: "Campaigns Run" },
            { value: "5+", label: "Years Experience" },
            { value: "95%", label: "Client Retention" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-[oklch(0.12_0.022_255/0.7)] border border-[oklch(0.25_0.04_255)] gradient-border backdrop-blur-sm"
            >
              <div className="font-display font-black text-3xl gradient-text mb-0.5">
                {stat.value}
              </div>
              <div className="text-sm text-[oklch(0.60_0.04_240)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[oklch(0.72_0.19_215/0.4)] flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full gradient-bg" />
        </div>
      </div>
    </section>
  );
}

// ── Services Section ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Target,
    name: "Meta & Google Ads",
    desc: "Drive targeted traffic with paid ad campaigns",
    color: "215",
  },
  {
    icon: Share2,
    name: "Social Media Management",
    desc: "Build and grow your brand presence online",
    color: "270",
  },
  {
    icon: Search,
    name: "Search Engine Optimization",
    desc: "Rank higher and get found on Google",
    color: "215",
  },
  {
    icon: FileText,
    name: "Content Marketing",
    desc: "Engage your audience with compelling content",
    color: "295",
  },
  {
    icon: Palette,
    name: "Brand Identity & Design",
    desc: "Create a brand that stands out",
    color: "270",
  },
  {
    icon: MessageSquare,
    name: "WhatsApp Marketing",
    desc: "Reach customers directly on WhatsApp",
    color: "215",
  },
  {
    icon: BarChart3,
    name: "Performance Analytics",
    desc: "Data insights to optimize your growth",
    color: "295",
  },
];

function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-24 relative"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.085 0.018 255) 0%, oklch(0.10 0.02 255) 50%, oklch(0.085 0.018 255) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-start gap-6 md:gap-10">
            <div
              className="flex-shrink-0 font-display font-black text-7xl md:text-9xl gradient-text leading-none opacity-30 select-none"
              aria-hidden="true"
            >
              01
            </div>
            <div className="pt-2 md:pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.72_0.19_215/0.3)] bg-[oklch(0.72_0.19_215/0.06)] text-sm text-[oklch(0.80_0.16_215)] mb-3">
                What We Do
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-3 leading-tight">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-[oklch(0.62_0.04_240)] text-lg max-w-lg">
                Full-spectrum digital marketing to accelerate your growth
              </p>
            </div>
          </div>
        </div>

        {/* Cards grid — featured first card + 3-col rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isFeatured = i === 0;
            return (
              <div
                key={service.name}
                className={`relative group rounded-2xl transition-all duration-300 card-glow overflow-hidden ${
                  isFeatured
                    ? "sm:col-span-2 lg:col-span-1 p-8 bg-gradient-to-br from-[oklch(0.15_0.04_215)] to-[oklch(0.12_0.022_255)] border border-[oklch(0.72_0.19_215/0.3)] shadow-glow-blue"
                    : "p-6 bg-[oklch(0.12_0.022_255)] border border-[oklch(0.25_0.04_255)]"
                }`}
              >
                {/* Left border accent (featured only) */}
                {isFeatured && (
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1 gradient-bg rounded-l-2xl"
                    aria-hidden="true"
                  />
                )}
                {/* Top border accent (standard cards) */}
                {!isFeatured && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] gradient-bg opacity-50 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <div
                  className={`rounded-xl flex items-center justify-center mb-4 ${isFeatured ? "w-16 h-16" : "w-12 h-12"}`}
                  style={{
                    background: `oklch(0.72 0.19 ${service.color} / ${isFeatured ? "0.2" : "0.15"})`,
                  }}
                >
                  <Icon
                    size={isFeatured ? 28 : 22}
                    style={{ color: `oklch(0.80 0.16 ${service.color})` }}
                  />
                </div>

                <h3
                  className={`font-display font-bold text-white leading-tight mb-2 ${isFeatured ? "text-2xl" : "text-lg"}`}
                >
                  {service.name}
                </h3>
                <p
                  className={`text-[oklch(0.62_0.04_240)] leading-relaxed ${isFeatured ? "text-base mb-5" : "text-sm"}`}
                >
                  {service.desc}
                </p>

                {/* Featured card stat pull */}
                {isFeatured && (
                  <div className="flex items-center gap-3 pt-4 border-t border-[oklch(0.72_0.19_215/0.2)]">
                    <div className="font-display font-black text-2xl gradient-text">
                      3×
                    </div>
                    <div className="text-sm text-[oklch(0.60_0.04_240)]">
                      avg. ROAS for our ad clients
                    </div>
                  </div>
                )}

                {/* Hover shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, oklch(0.72 0.19 215 / 0.04) 0%, transparent 70%)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const WHY_FEATURES = [
  {
    icon: TrendingUp,
    title: "Results-Driven Approach",
    desc: "We focus on ROI, not just vanity metrics. Every campaign is built to deliver measurable business impact.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Experienced professionals across all digital channels — from paid media to SEO and content.",
  },
  {
    icon: Eye,
    title: "Transparent Reporting",
    desc: "Real-time dashboards and weekly reports so you're always in the loop on performance.",
  },
  {
    icon: Lightbulb,
    title: "Custom Strategies",
    desc: "Tailored plans built for your specific business goals — not cookie-cutter solutions.",
  },
];

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="py-24 relative"
      style={{
        background:
          "radial-gradient(ellipse at 80% 50%, oklch(0.13 0.03 255) 0%, oklch(0.085 0.018 255) 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial section header — magazine number anchor */}
        <div className="mb-16">
          <div className="flex items-start gap-6 md:gap-10">
            <div
              className="flex-shrink-0 font-display font-black text-7xl md:text-9xl gradient-text leading-none opacity-30 select-none"
              aria-hidden="true"
            >
              02
            </div>
            <div className="pt-2 md:pt-4">
              <div className="text-xs text-[oklch(0.52_0.12_215)] uppercase tracking-[0.25em] font-semibold mb-3">
                Our Advantage
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-3 leading-tight">
                Why Choose <span className="gradient-text">RK NextGen?</span>
              </h2>
              <p className="text-[oklch(0.62_0.04_240)] text-lg max-w-lg">
                Creativity meets analytics — digital marketing that actually
                delivers results
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const gradients = [
              "oklch(0.72 0.19 215 / 0.2)",
              "oklch(0.52 0.22 295 / 0.2)",
              "oklch(0.52 0.22 295 / 0.2)",
              "oklch(0.72 0.19 215 / 0.2)",
            ];
            const iconColors = [
              "oklch(0.80 0.16 215)",
              "oklch(0.70 0.20 295)",
              "oklch(0.70 0.20 295)",
              "oklch(0.80 0.16 215)",
            ];
            return (
              <div
                key={feature.title}
                className="flex gap-5 p-6 rounded-2xl bg-[oklch(0.12_0.022_255)] border border-[oklch(0.25_0.04_255)] group hover:border-[oklch(0.35_0.08_255)] transition-all duration-300 card-glow"
              >
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: gradients[i] }}
                >
                  <Icon size={26} style={{ color: iconColors[i] }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[oklch(0.62_0.04_240)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── About Us Section ──────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.02 255) 0%, oklch(0.085 0.018 255) 100%)",
      }}
    >
      {/* Decorative element */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.19 215 / 0.4), oklch(0.52 0.22 295 / 0.4), transparent)",
        }}
      />

      {/* Typographic watermark behind content */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[20vw] gradient-text whitespace-nowrap select-none"
          style={{ opacity: 0.03, letterSpacing: "-0.05em" }}
        >
          RKNEXTGEN
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="text-xs text-[oklch(0.52_0.12_215)] uppercase tracking-[0.25em] font-semibold mb-4">
              Our Story
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              About <span className="gradient-text">RK NextGen</span>
            </h2>
            <p className="text-[oklch(0.68_0.04_240)] text-lg leading-relaxed mb-6">
              RK NextGen Marketing is a forward-thinking digital marketing
              agency dedicated to helping businesses scale their online
              presence. From startups to established brands, we deliver
              measurable results through innovative strategies and cutting-edge
              tools.
            </p>
            <p className="text-[oklch(0.62_0.04_240)] leading-relaxed mb-8">
              Our team of passionate digital experts brings together expertise
              in paid advertising, SEO, content, and brand building — all under
              one roof. We don't just run campaigns; we build growth engines for
              your business.
            </p>
            <Button
              onClick={() => scrollTo("contact")}
              className="gradient-bg text-white font-semibold px-7 py-3 rounded-full border-0 h-auto hover:opacity-90 transition-opacity"
            >
              Work With Us
              <ChevronRight size={18} className="ml-1" />
            </Button>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "100+", label: "Happy Clients", icon: Users },
              { value: "500+", label: "Campaigns Run", icon: Target },
              { value: "5+", label: "Years Experience", icon: Star },
              { value: "95%", label: "Client Retention", icon: TrendingUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-[oklch(0.12_0.022_255)] border border-[oklch(0.25_0.04_255)] gradient-border text-center group hover:border-[oklch(0.35_0.08_255)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="font-display font-black text-3xl gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[oklch(0.60_0.04_240)]">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.52 0.22 295 / 0.4), oklch(0.72 0.19 215 / 0.4), transparent)",
        }}
      />
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    try {
      await submitMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch {
      // error state shown below
    }
  };

  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, oklch(0.13 0.03 270) 0%, oklch(0.085 0.018 255) 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.52_0.22_295/0.3)] bg-[oklch(0.52_0.22_295/0.06)] text-sm text-[oklch(0.70_0.20_295)] mb-4">
            Let's Talk
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="text-[oklch(0.65_0.04_240)] text-lg max-w-xl mx-auto">
            Ready to scale your business? Let's discuss your goals and build a
            strategy that delivers results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[oklch(0.12_0.022_255)] border border-[oklch(0.25_0.04_255)]">
              <h3 className="font-display font-bold text-white text-xl mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:7993549944"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[oklch(0.72_0.19_215/0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[oklch(0.72_0.19_215/0.25)] transition-colors">
                    <Phone size={20} className="text-[oklch(0.80_0.16_215)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[oklch(0.55_0.04_240)] uppercase tracking-widest mb-0.5">
                      Phone
                    </div>
                    <div className="text-white font-medium group-hover:text-[oklch(0.80_0.16_215)] transition-colors">
                      +91 7993549944
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:rknextgenmedia@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[oklch(0.52_0.22_295/0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[oklch(0.52_0.22_295/0.25)] transition-colors">
                    <Mail size={20} className="text-[oklch(0.70_0.20_295)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[oklch(0.55_0.04_240)] uppercase tracking-widest mb-0.5">
                      Email
                    </div>
                    <div className="text-white font-medium group-hover:text-[oklch(0.70_0.20_295)] transition-colors break-all">
                      rknextgenmedia@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917993549944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                    <SiWhatsapp size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-xs text-[oklch(0.55_0.04_240)] uppercase tracking-widest mb-0.5">
                      WhatsApp
                    </div>
                    <div className="text-white font-medium group-hover:text-[#25D366] transition-colors">
                      Chat with us directly
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Tagline card */}
            <div
              className="p-6 rounded-2xl gradient-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 215 / 0.1), oklch(0.52 0.22 295 / 0.1))",
                borderColor: "transparent",
              }}
            >
              <p className="font-display font-bold text-white text-lg leading-relaxed">
                "Ready to take your brand to the next level? We're just a
                message away."
              </p>
              <p className="text-[oklch(0.60_0.04_240)] text-sm mt-2">
                — RK NextGen Marketing Team
              </p>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="p-6 md:p-8 rounded-2xl bg-[oklch(0.12_0.022_255)] border border-[oklch(0.25_0.04_255)]">
            <h3 className="font-display font-bold text-white text-xl mb-6">
              Send us a Message
            </h3>

            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[oklch(0.72_0.19_215/0.15)] flex items-center justify-center mb-4">
                  <CheckCircle
                    size={32}
                    className="text-[oklch(0.80_0.16_215)]"
                  />
                </div>
                <h4 className="font-display font-bold text-white text-xl mb-2">
                  Message Sent!
                </h4>
                <p className="text-[oklch(0.62_0.04_240)]">
                  We'll get back to you within 24 hours. Thank you for reaching
                  out!
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-6 border-[oklch(0.35_0.06_255)] text-[oklch(0.75_0.04_240)] hover:bg-[oklch(0.15_0.025_255)] rounded-full"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[oklch(0.70_0.04_240)] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.name.input"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="bg-[oklch(0.10_0.02_255)] border-[oklch(0.25_0.04_255)] text-white placeholder:text-[oklch(0.45_0.03_255)] focus:border-[oklch(0.72_0.19_215)] focus:ring-[oklch(0.72_0.19_215/0.3)] rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-[oklch(0.70_0.04_240)] mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <Input
                    id="contact-phone"
                    data-ocid="contact.phone.input"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    className="bg-[oklch(0.10_0.02_255)] border-[oklch(0.25_0.04_255)] text-white placeholder:text-[oklch(0.45_0.03_255)] focus:border-[oklch(0.72_0.19_215)] focus:ring-[oklch(0.72_0.19_215/0.3)] rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[oklch(0.70_0.04_240)] mb-1.5"
                  >
                    Your Message *
                  </label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.message.textarea"
                    placeholder="Tell us about your project or goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="bg-[oklch(0.10_0.02_255)] border-[oklch(0.25_0.04_255)] text-white placeholder:text-[oklch(0.45_0.03_255)] focus:border-[oklch(0.72_0.19_215)] focus:ring-[oklch(0.72_0.19_215/0.3)] rounded-xl resize-none"
                  />
                </div>

                {submitMutation.isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-2 text-sm text-[oklch(0.70_0.20_15)] bg-[oklch(0.577_0.245_27/0.1)] border border-[oklch(0.577_0.245_27/0.3)] rounded-lg px-4 py-3"
                  >
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submitMutation.isPending}
                  className="w-full gradient-bg text-white font-semibold py-3 rounded-xl border-0 h-auto hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ChevronRight size={18} className="ml-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Floating WhatsApp Button ───────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917993549944"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.floating.button"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg animate-whatsapp-pulse hover:scale-110 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} className="text-white" />
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background: "oklch(0.07 0.015 255)",
        borderTop: "1px solid oklch(0.25 0.04 255)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img
              src="/assets/uploads/ChatGPT-Image-Feb-22-2026-08_44_35-PM-1.png"
              alt="RK NextGen Marketing"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-[oklch(0.58_0.04_240)] text-sm leading-relaxed mb-4">
              India's next-gen digital marketing agency helping businesses scale
              their online presence with data-driven strategies.
            </p>
            <p className="gradient-text font-display font-bold text-sm tracking-wider">
              Scale Smart. Grow Digital.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", target: "hero" },
                { label: "Services", target: "services" },
                { label: "Why Choose Us", target: "why-us" },
                { label: "About Us", target: "about" },
                { label: "Contact", target: "contact" },
              ].map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.target)}
                    className="text-[oklch(0.58_0.04_240)] hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[oklch(0.72_0.19_215)]"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:7993549944"
                  className="text-[oklch(0.58_0.04_240)] hover:text-white text-sm transition-colors flex items-center gap-2"
                >
                  <Phone size={14} className="text-[oklch(0.72_0.19_215)]" />
                  +91 7993549944
                </a>
              </li>
              <li>
                <a
                  href="mailto:rknextgenmedia@gmail.com"
                  className="text-[oklch(0.58_0.04_240)] hover:text-white text-sm transition-colors flex items-center gap-2 break-all"
                >
                  <Mail size={14} className="text-[oklch(0.70_0.20_295)]" />
                  rknextgenmedia@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917993549944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[oklch(0.58_0.04_240)] hover:text-[#25D366] text-sm transition-colors flex items-center gap-2"
                >
                  <SiWhatsapp size={14} className="text-[#25D366]" />
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[oklch(0.20_0.03_255)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[oklch(0.50_0.03_240)] text-sm">
            © {year} RK NextGen Marketing. All rights reserved.
          </p>
          <p className="text-[oklch(0.45_0.03_240)] text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[oklch(0.72_0.19_215)] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (_entries) => {
        // Intersection observer for future animation hooks
      },
      { threshold: 0.1 },
    );

    const sections = document.querySelectorAll("section[id]");
    for (const s of sections) {
      observerRef.current?.observe(s);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
