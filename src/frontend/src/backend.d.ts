import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSection {
    subheading: string;
    heading: string;
    email: string;
    phone: string;
}
export interface SEOSettings {
    metaDescription: string;
    title: string;
    metaKeywords: string;
    ogImageUrl: string;
}
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface WhyUsFeature {
    title: string;
    description: string;
    iconUrl: string;
}
export interface AboutSection {
    paragraph1: string;
    paragraph2: string;
    heading: string;
    ctaText: string;
}
export interface Service {
    name: string;
    description: string;
    imageUrl: string;
}
export interface WhyUsSection {
    subheading: string;
    features: Array<WhyUsFeature>;
    heading: string;
}
export interface SiteContent {
    contact: ContactSection;
    about: AboutSection;
    hero: HeroSection;
    whyUs: WhyUsSection;
    services: ServicesSection;
    footer: FooterSection;
}
export interface ServicesSection {
    subheading: string;
    badgeText: string;
    heading: string;
    services: Array<Service>;
}
export interface HeroSection {
    backgroundImageUrl: string;
    headline1: string;
    headline2: string;
    ctaText: string;
    subheadline: string;
}
export interface FooterSection {
    tagline: string;
    copyright: string;
}
export interface backendInterface {
    adminLogin(username: string, password: string): Promise<string>;
    adminLogout(token: string): Promise<boolean>;
    deleteAllSubmissions(token: string): Promise<void>;
    deleteSubmission(token: string, index: bigint): Promise<void>;
    getAllSubmissions(token: string): Promise<Array<ContactSubmission>>;
    getPublicSeoSettings(): Promise<SEOSettings | null>;
    getPublicSiteContent(): Promise<SiteContent | null>;
    saveSeoSettings(token: string, seo: SEOSettings): Promise<void>;
    saveSiteContent(token: string, content: SiteContent): Promise<void>;
    submitContactForm(name: string, phone: string, message: string): Promise<void>;
    verifyAdminToken(token: string): Promise<boolean>;
}
