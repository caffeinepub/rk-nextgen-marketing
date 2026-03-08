# RK NextGen Marketing

## Current State
- Single-page landing website with Navbar, Hero, Services, Why Us, About, Contact sections
- Backend stores contact form submissions (name, phone, message, timestamp)
- No admin panel exists; no way to view or delete submissions
- No SEO configuration; no editable content system

## Requested Changes (Diff)

### Add
- **Admin login page** at `/admin` (hidden URL, not linked anywhere on the public site)
  - Username: `admin`, Password: `Mission@2026` (hashed/verified on backend)
  - Session token stored in localStorage; auto-expires after 24 hours
- **Admin dashboard** with sidebar navigation:
  - **Leads** tab: table of all contact submissions (name, phone, message, date/time), with delete button per row and bulk delete
  - **SEO Settings** tab: editable fields for page title, meta description, meta keywords, OG image URL; saved to backend and injected into `<head>`
  - **Content Editor** tab: editable fields for each section of the landing page:
    - Hero: headline line 1, headline line 2, subheadline, CTA button text
    - Services: section badge text, section heading, section subheading; per-service name and description
    - Why Us: section heading, section subheading; per-feature title and description
    - About: section heading, body paragraph 1, body paragraph 2, CTA button text
    - Contact: section heading, subheading, contact phone, contact email
    - Footer: tagline text, copyright text
  - **Logout** button
- Backend APIs:
  - `adminLogin(username, password)` → returns session token
  - `verifyAdminToken(token)` → returns Bool
  - `deleteSubmission(token, index)` → deletes a submission by index
  - `deleteAllSubmissions(token)` → clears all submissions
  - `getSeoSettings(token)` → returns SEO record
  - `saveSeoSettings(token, settings)` → saves SEO record
  - `getSiteContent(token)` → returns full content record
  - `saveSiteContent(token, content)` → saves full content record
  - `getPublicSiteContent()` → public query, no auth, returns content for frontend rendering
  - `getPublicSeoSettings()` → public query, returns SEO for head injection

### Modify
- Frontend `App.tsx`: all hardcoded text replaced with values from `getPublicSiteContent()` (falls back to defaults if not set)
- `<head>` SEO tags (title, meta description, keywords, OG) dynamically set from `getPublicSeoSettings()`
- Router added: `/` = landing page, `/admin` = admin panel (hidden)

### Remove
- Nothing removed from public site visually

## Implementation Plan
1. Regenerate backend (`main.mo`) with all new APIs: admin auth (hashed password compare), session token, CRUD for submissions, SEO settings storage, site content storage, public getters
2. Add React Router; create `AdminPage` component with login gate
3. Admin login form (username + password, validates against backend)
4. Admin dashboard with 3 tabs: Leads, SEO Settings, Content Editor
5. Leads tab: fetch all submissions, display in table, delete per row + delete all
6. SEO Settings tab: form fields, save to backend, apply to document head via useEffect
7. Content Editor tab: grouped form sections per landing page section, save to backend
8. Update App.tsx to fetch public content on load and use it for all text rendering (with defaults)
9. Inject SEO meta tags dynamically from public SEO settings
