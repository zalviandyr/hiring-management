# Hiring Management

## Project Overview

Hiring Management is an internal platform that centralizes job postings and recruitment workflows. It serves two user types: Recruiters (admin) who work from the `/admin` dashboard to publish openings, review applicants, and manage pipelines, and Job Seekers (applicants) who browse open roles, submit applications, and capture identity photos through the public flow.

## Tech Stack Used

- Next.js 15 + React 19
- TypeScript
- Tailwind CSS 4 + shadcn/ui
- TanStack Query
- Supabase
- Mediapipe Tasks Vision
- React Hook Form + Zod
- dnd-kit

## Folder Structure

```text
.
├─ app/                   # App Router entrypoints and layouts
│  ├─ (main)/             # Public job seeker flows and shared components
│  │  └─ [jobSlug]/       # Dynamic applicant-facing routes and media capture
│  ├─ admin/              # Recruiter dashboard pages and UI building blocks
│  └─ api/                # Route handlers (e.g., regencies lookup)
├─ components/            # Reusable UI primitives (inputs, form controls, etc.)
├─ features/              # Domain logic grouped by context (jobs, applicants, candidates)
├─ lib/                   # Cross-cutting utilities, Supabase client, validation
├─ public/                # Static assets, icons, and images
└─ (root configs)         # Next.js, TypeScript, Tailwind, and PostCSS configuration files
```

## How to Run Locally

1. **Prepare the environment**
   - Ensure Node.js 18 or newer is installed.
   - Copy environment variables from `.env.example` to `.env.local`, then fill in Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Start the development server**
   ```bash
   yarn dev
   ```
4. **Access the app**
   - Open `http://localhost:3000` in your browser.
   - Use the admin dashboard to manage job openings and applicants, and the public flow for candidate submissions.

## Potential Enhancements

- **Scrollable components**: Introduce a reusable scroll container that keeps headers sticky and maintains accessible keyboard navigation.
- **Job editing workflow**: Extend the admin dashboard with an edit modal or dedicated page to update job details without recreating entries.
- **Applicant table controls**: Add client-side sorting and pagination to the Manage Applicants view for faster screening.
- **Notification system**: Surface real-time toast or inbox-style notifications to flag new applicants and status changes.
- **Applicant email automation**: Trigger confirmation and status update emails to candidates directly from the platform.
- **Application capacity guardrails**: Enforce maximum candidate limits when new applicants submit their forms to prevent overbooking.
- **Salary currency selector**: Provide a currency dropdown to normalize salary inputs across international postings.
- **Responsive refinements**: Review layouts on tablet and mobile breakpoints to ensure key flows remain usable.
