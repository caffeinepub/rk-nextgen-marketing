# RK NextGen Marketing

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full landing page for RK NextGen Marketing digital agency
- Hero section with logo, headline "Scale Smart. Grow Digital", sub-headline, and dual CTAs (Get Started -- scrolls to contact, WhatsApp -- opens wa.me link)
- Services section with 7 service cards: Meta & Google Ads, Social Media Management, Search Engine Optimization, Content Marketing, Brand Identity & Design, WhatsApp Marketing, Performance Analytics
- Why Choose Us section with 3-4 key differentiators (results-driven, expert team, transparent reporting, custom strategies)
- Contact section with phone (7993549944), email (rknextgenmedia@gmail.com), WhatsApp link, and a contact form (name, phone, message, submit)
- Floating WhatsApp chat button fixed to bottom-right corner linking to wa.me/917993549944
- Sticky navbar with logo, nav links (Home, Services, Why Us, Contact), and a CTA button
- Footer with logo, tagline, quick links, and contact info
- Smooth scroll behavior between sections

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan
1. Backend: Simple contact form submission storage (name, phone, message, timestamp)
2. Frontend:
   - index.css: deep navy dark theme, electric blue (#38bdf8) + purple (#a855f7) gradient accents, Inter/Poppins font
   - App.tsx: single-page layout with all sections
   - Navbar component: sticky, transparent-to-solid on scroll, logo image, nav links, CTA
   - Hero component: full-viewport, logo image, animated headline, tagline, dual CTAs
   - Services component: 7 service cards in responsive grid with icons and hover effects
   - WhyUs component: 4 feature highlight cards
   - Contact component: contact info + form wired to backend
   - FloatingWhatsApp component: fixed bottom-right button
   - Footer component: brand info, links, contact
3. Assets: use uploaded logo (/assets/uploads/ChatGPT-Image-Feb-22-2026-08_44_35-PM-1.png) in navbar and hero
