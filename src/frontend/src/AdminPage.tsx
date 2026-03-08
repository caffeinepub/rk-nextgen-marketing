import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Search,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { SEOSettings, SiteContent } from "./backend.d";
import { useActor } from "./hooks/useActor";
import {
  useAdminLogin,
  useAdminLogout,
  useDeleteAllSubmissions,
  useDeleteSubmission,
  useGetAllSubmissions,
  useGetSeoSettings,
  useGetSiteContent,
  useSaveSeoSettings,
  useSaveSiteContent,
} from "./hooks/useQueries";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ADMIN_TOKEN_KEY = "rk_admin_token";

function formatTimestamp(ts: bigint): string {
  // Motoko timestamps are in nanoseconds
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Default content ───────────────────────────────────────────────────────────

const DEFAULT_SEO: SEOSettings = {
  title: "RK NextGen Marketing | Scale Smart. Grow Digital.",
  metaDescription:
    "India's next-gen digital marketing agency helping businesses scale online with data-driven strategies, paid ads, SEO, social media & more.",
  metaKeywords:
    "digital marketing, SEO, Google Ads, Meta Ads, social media management, content marketing, WhatsApp marketing",
  ogImageUrl: "",
};

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    backgroundImageUrl: "",
    headline1: "Scale Smart.",
    headline2: "Grow Digital.",
    subheadline:
      "We help businesses grow online with data-driven strategies, innovative campaigns, and measurable results that actually move the needle.",
    ctaText: "Get Started Today",
  },
  services: {
    badgeText: "What We Do",
    heading: "Our Services",
    subheading: "Full-spectrum digital marketing to accelerate your growth",
    services: [
      {
        name: "Meta & Google Ads",
        description: "Drive targeted traffic with paid ad campaigns",
        imageUrl: "",
      },
      {
        name: "Social Media Management",
        description: "Build and grow your brand presence online",
        imageUrl: "",
      },
      {
        name: "Search Engine Optimization",
        description: "Rank higher and get found on Google",
        imageUrl: "",
      },
      {
        name: "Content Marketing",
        description: "Engage your audience with compelling content",
        imageUrl: "",
      },
      {
        name: "Brand Identity & Design",
        description: "Create a brand that stands out",
        imageUrl: "",
      },
      {
        name: "WhatsApp Marketing",
        description: "Reach customers directly on WhatsApp",
        imageUrl: "",
      },
      {
        name: "Performance Analytics",
        description: "Data insights to optimize your growth",
        imageUrl: "",
      },
    ],
  },
  whyUs: {
    heading: "Why Choose RK NextGen?",
    subheading:
      "Creativity meets analytics — digital marketing that actually delivers results",
    features: [
      {
        title: "Results-Driven Approach",
        description:
          "We focus on ROI, not just vanity metrics. Every campaign is built to deliver measurable business impact.",
        iconUrl: "",
      },
      {
        title: "Expert Team",
        description:
          "Experienced professionals across all digital channels — from paid media to SEO and content.",
        iconUrl: "",
      },
      {
        title: "Transparent Reporting",
        description:
          "Real-time dashboards and weekly reports so you're always in the loop on performance.",
        iconUrl: "",
      },
      {
        title: "Custom Strategies",
        description:
          "Tailored plans built for your specific business goals — not cookie-cutter solutions.",
        iconUrl: "",
      },
    ],
  },
  about: {
    heading: "About RK NextGen",
    paragraph1:
      "RK NextGen Marketing is a forward-thinking digital marketing agency dedicated to helping businesses scale their online presence. From startups to established brands, we deliver measurable results through innovative strategies and cutting-edge tools.",
    paragraph2:
      "Our team of passionate digital experts brings together expertise in paid advertising, SEO, content, and brand building — all under one roof. We don't just run campaigns; we build growth engines for your business.",
    ctaText: "Work With Us",
  },
  contact: {
    heading: "Get In Touch",
    subheading:
      "Ready to scale your business? Let's discuss your goals and build a strategy that delivers results.",
    phone: "+91 7993549944",
    email: "rknextgenmedia@gmail.com",
  },
  footer: {
    tagline: "Scale Smart. Grow Digital.",
    copyright: "© {year} RK NextGen Marketing. All rights reserved.",
  },
};

// ── Login Screen ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useAdminLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      const token = await loginMutation.mutateAsync({ username, password });
      if (token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        onLogin(token);
      }
    } catch {
      // error shown from mutation state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.085_0.018_255)]">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 215) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.22 295) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Card */}
        <div className="bg-[oklch(0.11_0.02_255)] border border-[oklch(0.22_0.035_255)] rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-glow-blue">
              <Shield size={24} className="text-white" />
            </div>
          </div>

          <h1 className="font-display font-black text-2xl text-white text-center mb-1">
            Admin Access
          </h1>
          <p className="text-[oklch(0.55_0.04_240)] text-sm text-center mb-8">
            Secure login required
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="admin-username"
                className="text-[oklch(0.70_0.04_240)] text-sm mb-1.5 block"
              >
                Username
              </Label>
              <Input
                id="admin-username"
                data-ocid="admin.username.input"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl h-11"
              />
            </div>

            <div>
              <Label
                htmlFor="admin-password"
                className="text-[oklch(0.70_0.04_240)] text-sm mb-1.5 block"
              >
                Password
              </Label>
              <Input
                id="admin-password"
                data-ocid="admin.password.input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl h-11"
              />
            </div>

            {loginMutation.isError && (
              <div
                data-ocid="admin.login.error_state"
                className="flex items-center gap-2 text-sm text-[oklch(0.72_0.20_15)] bg-[oklch(0.577_0.245_27/0.12)] border border-[oklch(0.577_0.245_27/0.3)] rounded-lg px-4 py-3"
              >
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>Invalid credentials. Please try again.</span>
              </div>
            )}

            <Button
              type="submit"
              data-ocid="admin.login.submit_button"
              disabled={loginMutation.isPending}
              className="w-full gradient-bg text-white font-semibold rounded-xl border-0 h-11 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Leads Tab ─────────────────────────────────────────────────────────────────

function LeadsTab({ token }: { token: string }) {
  const { data: submissions, isLoading, isError } = useGetAllSubmissions(token);
  const deleteMutation = useDeleteSubmission();
  const deleteAllMutation = useDeleteAllSubmissions();

  if (isLoading) {
    return (
      <div
        data-ocid="admin.leads.loading_state"
        className="flex items-center justify-center py-20 text-[oklch(0.55_0.04_240)]"
      >
        <Loader2 size={24} className="animate-spin mr-3" />
        Loading submissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-ocid="admin.leads.error_state"
        className="flex items-center gap-3 py-16 justify-center text-[oklch(0.70_0.20_15)]"
      >
        <AlertCircle size={20} />
        <span>Failed to load submissions. Check your session.</span>
      </div>
    );
  }

  const list = submissions ?? [];

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display font-bold text-white text-xl">
            Contact Leads
          </h2>
          <Badge
            variant="secondary"
            className="bg-[oklch(0.72_0.19_215/0.15)] text-[oklch(0.80_0.16_215)] border-[oklch(0.72_0.19_215/0.3)]"
          >
            {list.length} total
          </Badge>
        </div>

        {list.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                data-ocid="admin.leads.delete_all.button"
                variant="destructive"
                size="sm"
                className="bg-[oklch(0.577_0.245_27/0.15)] text-[oklch(0.72_0.20_15)] border border-[oklch(0.577_0.245_27/0.4)] hover:bg-[oklch(0.577_0.245_27/0.25)] rounded-lg"
              >
                <Trash2 size={14} className="mr-1.5" />
                Delete All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[oklch(0.11_0.02_255)] border-[oklch(0.22_0.035_255)]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white font-display">
                  Delete All Submissions?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[oklch(0.60_0.04_240)]">
                  This will permanently delete all {list.length} contact
                  submissions. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  data-ocid="admin.leads.delete_all.cancel_button"
                  className="bg-[oklch(0.15_0.025_255)] border-[oklch(0.25_0.04_255)] text-[oklch(0.75_0.04_240)] hover:bg-[oklch(0.18_0.03_255)]"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  data-ocid="admin.leads.delete_all.confirm_button"
                  onClick={() => deleteAllMutation.mutate(token)}
                  disabled={deleteAllMutation.isPending}
                  className="bg-[oklch(0.577_0.245_27)] text-white hover:bg-[oklch(0.50_0.245_27)]"
                >
                  {deleteAllMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin mr-2" />
                  ) : null}
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Table or empty state */}
      {list.length === 0 ? (
        <div
          data-ocid="admin.leads.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[oklch(0.72_0.19_215/0.1)] flex items-center justify-center mb-4">
            <Users size={28} className="text-[oklch(0.60_0.10_215)]" />
          </div>
          <h3 className="font-display font-semibold text-white text-lg mb-1">
            No submissions yet
          </h3>
          <p className="text-[oklch(0.55_0.04_240)] text-sm">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div
          data-ocid="admin.leads.table"
          className="rounded-xl border border-[oklch(0.22_0.035_255)] overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-[oklch(0.22_0.035_255)] hover:bg-transparent">
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold">
                  #
                </TableHead>
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold">
                  Phone
                </TableHead>
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold">
                  Message
                </TableHead>
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold">
                  Date &amp; Time
                </TableHead>
                <TableHead className="text-[oklch(0.55_0.04_240)] font-semibold text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((sub, i) => {
                const rowOcid = `admin.leads.row.item.${i + 1}`;
                const deleteOcid = `admin.leads.delete_button.${i + 1}`;
                return (
                  <TableRow
                    key={String(sub.timestamp)}
                    data-ocid={rowOcid}
                    className="border-[oklch(0.18_0.028_255)] hover:bg-[oklch(0.13_0.022_255)] transition-colors"
                  >
                    <TableCell className="text-[oklch(0.50_0.03_240)] text-sm w-10">
                      {i + 1}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {sub.name}
                    </TableCell>
                    <TableCell className="text-[oklch(0.75_0.04_240)]">
                      {sub.phone}
                    </TableCell>
                    <TableCell className="text-[oklch(0.68_0.04_240)] max-w-xs">
                      <p className="line-clamp-2 text-sm">{sub.message}</p>
                    </TableCell>
                    <TableCell className="text-[oklch(0.55_0.04_240)] text-sm whitespace-nowrap">
                      {formatTimestamp(sub.timestamp)}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            data-ocid={deleteOcid}
                            variant="ghost"
                            size="sm"
                            className="text-[oklch(0.65_0.15_15)] hover:text-[oklch(0.72_0.20_15)] hover:bg-[oklch(0.577_0.245_27/0.1)] rounded-lg"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[oklch(0.11_0.02_255)] border-[oklch(0.22_0.035_255)]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white font-display">
                              Delete this submission?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[oklch(0.60_0.04_240)]">
                              This will permanently delete the submission from{" "}
                              <span className="text-white font-medium">
                                {sub.name}
                              </span>
                              . This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-[oklch(0.15_0.025_255)] border-[oklch(0.25_0.04_255)] text-[oklch(0.75_0.04_240)] hover:bg-[oklch(0.18_0.03_255)]">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteMutation.mutate({
                                  token,
                                  index: BigInt(i),
                                })
                              }
                              disabled={deleteMutation.isPending}
                              className="bg-[oklch(0.577_0.245_27)] text-white hover:bg-[oklch(0.50_0.245_27)]"
                            >
                              {deleteMutation.isPending ? (
                                <Loader2
                                  size={14}
                                  className="animate-spin mr-2"
                                />
                              ) : null}
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── SEO Tab ───────────────────────────────────────────────────────────────────

function SeoTab({ token }: { token: string }) {
  const { data: seoData, isLoading } = useGetSeoSettings();
  const saveMutation = useSaveSeoSettings();

  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (seoData) {
      setSeo(seoData);
    }
  }, [seoData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    try {
      await saveMutation.mutateAsync({ token, seo });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // error from mutation state
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="admin.seo.loading_state"
        className="flex items-center justify-center py-20 text-[oklch(0.55_0.04_240)]"
      >
        <Loader2 size={24} className="animate-spin mr-3" />
        Loading SEO settings...
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">
          SEO Settings
        </h2>
        <p className="text-[oklch(0.55_0.04_240)] text-sm">
          Control how your website appears in search engines and social media.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <Label
            htmlFor="seo-title"
            className="text-[oklch(0.72_0.04_240)] text-sm mb-1.5 block"
          >
            Page Title
          </Label>
          <Input
            id="seo-title"
            data-ocid="admin.seo.title.input"
            value={seo.title}
            onChange={(e) => setSeo((p) => ({ ...p, title: e.target.value }))}
            placeholder="RK NextGen Marketing | Tagline"
            className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl"
          />
          <p className="text-xs text-[oklch(0.45_0.03_240)] mt-1">
            Ideal length: 50–60 characters
          </p>
        </div>

        <div>
          <Label
            htmlFor="seo-description"
            className="text-[oklch(0.72_0.04_240)] text-sm mb-1.5 block"
          >
            Meta Description
          </Label>
          <Textarea
            id="seo-description"
            data-ocid="admin.seo.description.textarea"
            value={seo.metaDescription}
            onChange={(e) =>
              setSeo((p) => ({ ...p, metaDescription: e.target.value }))
            }
            placeholder="Brief description of your website for search results..."
            rows={3}
            className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl resize-none"
          />
          <p className="text-xs text-[oklch(0.45_0.03_240)] mt-1">
            Ideal length: 150–160 characters ({seo.metaDescription.length} used)
          </p>
        </div>

        <div>
          <Label
            htmlFor="seo-keywords"
            className="text-[oklch(0.72_0.04_240)] text-sm mb-1.5 block"
          >
            Meta Keywords
          </Label>
          <Input
            id="seo-keywords"
            data-ocid="admin.seo.keywords.input"
            value={seo.metaKeywords}
            onChange={(e) =>
              setSeo((p) => ({ ...p, metaKeywords: e.target.value }))
            }
            placeholder="keyword1, keyword2, keyword3..."
            className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl"
          />
          <p className="text-xs text-[oklch(0.45_0.03_240)] mt-1">
            Comma-separated keywords
          </p>
        </div>

        <div>
          <Label
            htmlFor="seo-ogimage"
            className="text-[oklch(0.72_0.04_240)] text-sm mb-1.5 block"
          >
            OG Image URL
          </Label>
          <Input
            id="seo-ogimage"
            data-ocid="admin.seo.ogimage.input"
            type="url"
            value={seo.ogImageUrl}
            onChange={(e) =>
              setSeo((p) => ({ ...p, ogImageUrl: e.target.value }))
            }
            placeholder="https://yourdomain.com/og-image.jpg"
            className="bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl"
          />
          <p className="text-xs text-[oklch(0.45_0.03_240)] mt-1">
            Recommended: 1200×630px for social sharing
          </p>
        </div>

        {/* Feedback */}
        {saved && (
          <div
            data-ocid="admin.seo.success_state"
            className="flex items-center gap-2 text-sm text-[oklch(0.78_0.18_145)] bg-[oklch(0.60_0.18_145/0.12)] border border-[oklch(0.60_0.18_145/0.3)] rounded-lg px-4 py-3"
          >
            <CheckCircle2 size={15} className="flex-shrink-0" />
            <span>SEO settings saved successfully.</span>
          </div>
        )}
        {saveMutation.isError && !saved && (
          <div
            data-ocid="admin.seo.error_state"
            className="flex items-center gap-2 text-sm text-[oklch(0.72_0.20_15)] bg-[oklch(0.577_0.245_27/0.12)] border border-[oklch(0.577_0.245_27/0.3)] rounded-lg px-4 py-3"
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>Failed to save SEO settings. Please try again.</span>
          </div>
        )}

        <Button
          type="submit"
          data-ocid="admin.seo.save.submit_button"
          disabled={saveMutation.isPending}
          className="gradient-bg text-white font-semibold rounded-xl border-0 h-11 px-8 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saveMutation.isPending ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save SEO Settings"
          )}
        </Button>
      </form>
    </div>
  );
}

// ── Content Editor Tab ────────────────────────────────────────────────────────

function ContentTab({ token }: { token: string }) {
  const { data: contentData, isLoading } = useGetSiteContent();
  const saveMutation = useSaveSiteContent();

  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (contentData) {
      // Merge with defaults to handle any missing fields
      setContent({
        ...DEFAULT_CONTENT,
        ...contentData,
        hero: { ...DEFAULT_CONTENT.hero, ...contentData.hero },
        services: {
          ...DEFAULT_CONTENT.services,
          ...contentData.services,
          services:
            contentData.services?.services ?? DEFAULT_CONTENT.services.services,
        },
        whyUs: {
          ...DEFAULT_CONTENT.whyUs,
          ...contentData.whyUs,
          features:
            contentData.whyUs?.features ?? DEFAULT_CONTENT.whyUs.features,
        },
        about: { ...DEFAULT_CONTENT.about, ...contentData.about },
        contact: { ...DEFAULT_CONTENT.contact, ...contentData.contact },
        footer: { ...DEFAULT_CONTENT.footer, ...contentData.footer },
      });
    }
  }, [contentData]);

  const updateHero = (key: keyof SiteContent["hero"], val: string) =>
    setContent((p) => ({ ...p, hero: { ...p.hero, [key]: val } }));

  const updateServices = (
    key: keyof Omit<SiteContent["services"], "services">,
    val: string,
  ) =>
    setContent((p) => ({
      ...p,
      services: { ...p.services, [key]: val },
    }));

  const updateService = (
    idx: number,
    key: keyof SiteContent["services"]["services"][number],
    val: string,
  ) =>
    setContent((p) => {
      const updated = [...p.services.services];
      updated[idx] = { ...updated[idx], [key]: val };
      return { ...p, services: { ...p.services, services: updated } };
    });

  const updateWhyUs = (
    key: keyof Omit<SiteContent["whyUs"], "features">,
    val: string,
  ) =>
    setContent((p) => ({
      ...p,
      whyUs: { ...p.whyUs, [key]: val },
    }));

  const updateFeature = (
    idx: number,
    key: keyof SiteContent["whyUs"]["features"][number],
    val: string,
  ) =>
    setContent((p) => {
      const updated = [...p.whyUs.features];
      updated[idx] = { ...updated[idx], [key]: val };
      return { ...p, whyUs: { ...p.whyUs, features: updated } };
    });

  const updateAbout = (key: keyof SiteContent["about"], val: string) =>
    setContent((p) => ({ ...p, about: { ...p.about, [key]: val } }));

  const updateContact = (key: keyof SiteContent["contact"], val: string) =>
    setContent((p) => ({ ...p, contact: { ...p.contact, [key]: val } }));

  const updateFooter = (key: keyof SiteContent["footer"], val: string) =>
    setContent((p) => ({ ...p, footer: { ...p.footer, [key]: val } }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    try {
      await saveMutation.mutateAsync({ token, content });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // error from mutation state
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="admin.content.loading_state"
        className="flex items-center justify-center py-20 text-[oklch(0.55_0.04_240)]"
      >
        <Loader2 size={24} className="animate-spin mr-3" />
        Loading site content...
      </div>
    );
  }

  const inputClass =
    "bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl text-sm";
  const textareaClass =
    "bg-[oklch(0.08_0.015_255)] border-[oklch(0.22_0.035_255)] text-white placeholder:text-[oklch(0.40_0.03_255)] focus:border-[oklch(0.72_0.19_215)] rounded-xl text-sm resize-none";
  const labelClass = "text-[oklch(0.65_0.04_240)] text-xs mb-1 block";

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">
          Content Editor
        </h2>
        <p className="text-[oklch(0.55_0.04_240)] text-sm">
          Edit all visible text on the landing page. Changes take effect
          immediately after saving.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-2">
        {/* Hero Section */}
        <AccordionItem
          value="hero"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                H
              </div>
              Hero Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={labelClass}>Headline Line 1</Label>
                <Input
                  value={content.hero.headline1}
                  onChange={(e) => updateHero("headline1", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label className={labelClass}>Headline Line 2</Label>
                <Input
                  value={content.hero.headline2}
                  onChange={(e) => updateHero("headline2", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <Label className={labelClass}>Subheadline</Label>
              <Textarea
                value={content.hero.subheadline}
                onChange={(e) => updateHero("subheadline", e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </div>
            <div>
              <Label className={labelClass}>CTA Button Text</Label>
              <Input
                value={content.hero.ctaText}
                onChange={(e) => updateHero("ctaText", e.target.value)}
                className={inputClass}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Services Section */}
        <AccordionItem
          value="services"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                S
              </div>
              Services Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={labelClass}>Badge Text</Label>
                <Input
                  value={content.services.badgeText}
                  onChange={(e) => updateServices("badgeText", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label className={labelClass}>Section Heading</Label>
                <Input
                  value={content.services.heading}
                  onChange={(e) => updateServices("heading", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <Label className={labelClass}>Section Subheading</Label>
              <Input
                value={content.services.subheading}
                onChange={(e) => updateServices("subheading", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="border-t border-[oklch(0.18_0.028_255)] pt-4">
              <p className="text-xs text-[oklch(0.55_0.04_240)] mb-3 font-semibold uppercase tracking-wider">
                Individual Services
              </p>
              <div className="space-y-3">
                {content.services.services.map((svc, i) => (
                  <div
                    key={svc.name || `svc-slot-${i + 1}`}
                    className="p-3 rounded-lg bg-[oklch(0.085_0.015_255)] border border-[oklch(0.18_0.028_255)]"
                  >
                    <p className="text-xs text-[oklch(0.50_0.08_215)] font-semibold mb-2">
                      Service {i + 1}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className={labelClass}>Name</Label>
                        <Input
                          value={svc.name}
                          onChange={(e) =>
                            updateService(i, "name", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label className={labelClass}>Description</Label>
                        <Input
                          value={svc.description}
                          onChange={(e) =>
                            updateService(i, "description", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Why Choose Us */}
        <AccordionItem
          value="whyus"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                W
              </div>
              Why Choose Us Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div>
              <Label className={labelClass}>Section Heading</Label>
              <Input
                value={content.whyUs.heading}
                onChange={(e) => updateWhyUs("heading", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Section Subheading</Label>
              <Input
                value={content.whyUs.subheading}
                onChange={(e) => updateWhyUs("subheading", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="border-t border-[oklch(0.18_0.028_255)] pt-4">
              <p className="text-xs text-[oklch(0.55_0.04_240)] mb-3 font-semibold uppercase tracking-wider">
                Features
              </p>
              <div className="space-y-3">
                {content.whyUs.features.map((feat, i) => (
                  <div
                    key={feat.title || `feat-slot-${i + 1}`}
                    className="p-3 rounded-lg bg-[oklch(0.085_0.015_255)] border border-[oklch(0.18_0.028_255)]"
                  >
                    <p className="text-xs text-[oklch(0.50_0.08_215)] font-semibold mb-2">
                      Feature {i + 1}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Label className={labelClass}>Title</Label>
                        <Input
                          value={feat.title}
                          onChange={(e) =>
                            updateFeature(i, "title", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label className={labelClass}>Description</Label>
                        <Textarea
                          value={feat.description}
                          onChange={(e) =>
                            updateFeature(i, "description", e.target.value)
                          }
                          rows={2}
                          className={textareaClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Section */}
        <AccordionItem
          value="about"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              About Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div>
              <Label className={labelClass}>Section Heading</Label>
              <Input
                value={content.about.heading}
                onChange={(e) => updateAbout("heading", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Paragraph 1</Label>
              <Textarea
                value={content.about.paragraph1}
                onChange={(e) => updateAbout("paragraph1", e.target.value)}
                rows={3}
                className={textareaClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Paragraph 2</Label>
              <Textarea
                value={content.about.paragraph2}
                onChange={(e) => updateAbout("paragraph2", e.target.value)}
                rows={3}
                className={textareaClass}
              />
            </div>
            <div>
              <Label className={labelClass}>CTA Button Text</Label>
              <Input
                value={content.about.ctaText}
                onChange={(e) => updateAbout("ctaText", e.target.value)}
                className={inputClass}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Section */}
        <AccordionItem
          value="contact"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                C
              </div>
              Contact Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={labelClass}>Section Heading</Label>
                <Input
                  value={content.contact.heading}
                  onChange={(e) => updateContact("heading", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label className={labelClass}>Phone Number</Label>
                <Input
                  value={content.contact.phone}
                  onChange={(e) => updateContact("phone", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <Label className={labelClass}>Section Subheading</Label>
              <Textarea
                value={content.contact.subheading}
                onChange={(e) => updateContact("subheading", e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Email</Label>
              <Input
                type="email"
                value={content.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
                className={inputClass}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Footer Section */}
        <AccordionItem
          value="footer"
          className="border border-[oklch(0.22_0.035_255)] rounded-xl overflow-hidden bg-[oklch(0.10_0.018_255)]"
        >
          <AccordionTrigger className="px-5 py-4 text-white font-display font-semibold hover:no-underline hover:bg-[oklch(0.12_0.02_255)] data-[state=open]:bg-[oklch(0.12_0.02_255)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center text-xs font-bold text-white">
                F
              </div>
              Footer Section
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div>
              <Label className={labelClass}>Tagline</Label>
              <Input
                value={content.footer.tagline}
                onChange={(e) => updateFooter("tagline", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass}>Copyright Text</Label>
              <Input
                value={content.footer.copyright}
                onChange={(e) => updateFooter("copyright", e.target.value)}
                className={inputClass}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Feedback */}
      {saved && (
        <div
          data-ocid="admin.content.success_state"
          className="flex items-center gap-2 text-sm text-[oklch(0.78_0.18_145)] bg-[oklch(0.60_0.18_145/0.12)] border border-[oklch(0.60_0.18_145/0.3)] rounded-lg px-4 py-3"
        >
          <CheckCircle2 size={15} className="flex-shrink-0" />
          <span>Content saved successfully. Your website is now updated.</span>
        </div>
      )}
      {saveMutation.isError && !saved && (
        <div
          data-ocid="admin.content.error_state"
          className="flex items-center gap-2 text-sm text-[oklch(0.72_0.20_15)] bg-[oklch(0.577_0.245_27/0.12)] border border-[oklch(0.577_0.245_27/0.3)] rounded-lg px-4 py-3"
        >
          <AlertCircle size={15} className="flex-shrink-0" />
          <span>Failed to save content. Please try again.</span>
        </div>
      )}

      <Button
        type="submit"
        data-ocid="admin.content.save.submit_button"
        disabled={saveMutation.isPending}
        className="gradient-bg text-white font-semibold rounded-xl border-0 h-11 px-8 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saveMutation.isPending ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Saving Content...
          </>
        ) : (
          "Save All Content"
        )}
      </Button>
    </form>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────

type Tab = "leads" | "seo" | "content";

function AdminDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("leads");
  const logoutMutation = useAdminLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(token);
    } finally {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      onLogout();
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "leads",
      label: "Leads",
      icon: <Users size={16} />,
    },
    {
      id: "seo",
      label: "SEO Settings",
      icon: <Search size={16} />,
    },
    {
      id: "content",
      label: "Content Editor",
      icon: <FileText size={16} />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[oklch(0.075_0.015_255)]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[oklch(0.095_0.018_255)] border-r border-[oklch(0.18_0.028_255)]">
        {/* Logo area */}
        <div className="px-5 py-5 border-b border-[oklch(0.18_0.028_255)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight">
                Admin Panel
              </p>
              <p className="text-[oklch(0.50_0.05_215)] text-xs">RK NextGen</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`admin.${tab.id}.tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "gradient-bg text-white shadow-glow-blue"
                  : "text-[oklch(0.62_0.04_240)] hover:text-white hover:bg-[oklch(0.13_0.022_255)]"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <ChevronRight size={14} className="ml-auto opacity-60" />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[oklch(0.18_0.028_255)]">
          <button
            type="button"
            data-ocid="admin.logout.button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[oklch(0.65_0.15_15)] hover:text-[oklch(0.75_0.20_15)] hover:bg-[oklch(0.577_0.245_27/0.1)] transition-all duration-150 disabled:opacity-50"
          >
            {logoutMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogOut size={16} />
            )}
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {activeTab === "leads" && <LeadsTab token={token} />}
          {activeTab === "seo" && <SeoTab token={token} />}
          {activeTab === "content" && <ContentTab token={token} />}
        </div>
      </main>
    </div>
  );
}

// ── Admin Page Root ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const { actor } = useActor();

  const verifyToken = useCallback(
    async (storedToken: string) => {
      if (!actor) return;
      try {
        const valid = await actor.verifyAdminToken(storedToken);
        if (valid) {
          setToken(storedToken);
        } else {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      } finally {
        setChecking(false);
      }
    },
    [actor],
  );

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (stored && actor) {
      verifyToken(stored);
    } else if (actor) {
      setChecking(false);
    }
  }, [actor, verifyToken]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.085_0.018_255)]">
        <div className="flex items-center gap-3 text-[oklch(0.60_0.04_240)]">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return <AdminDashboard token={token} onLogout={() => setToken(null)} />;
}
