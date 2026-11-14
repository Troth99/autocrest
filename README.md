<div align="center">

# AutoCrest

**Your vehicles. Your records. One garage.**

A vehicle management web application for keeping vehicle details, photos, mileage, and service records together — built with drivers across Europe in mind.

![Status: In Development](https://img.shields.io/badge/Status-In_Development-A69AE8?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Supabase](https://img.shields.io/badge/Supabase-1C2035?style=for-the-badge&logo=supabase&logoColor=3FCF8E)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)

[Overview](#overview) · [Features](#features) · [Current Limitations](#current-limitations) · [Design](#design) · [Technology](#technology) · [Project Structure](#project-structure) · [Roadmap](#roadmap)

</div>

---

## Overview

AutoCrest brings the information behind vehicle ownership into a personal digital garage. Owners can manage multiple cars, maintain their details, update odometer readings, record maintenance and repairs, and download a structured PDF vehicle report.

Service history and upcoming service dates or mileage are based on saved records. Registration-document and odometer photo scanning assist with data entry, while profiles and authenticator-based two-factor authentication support account management.

The project is under active development, with expenses, fuel tracking, document storage, and broader reminders planned for future development.

## Features

### Personal garage

- Manage multiple vehicles and choose a primary vehicle.
- Search the garage by make, model, nickname, or registration plate.
- View and edit vehicle details from a dedicated vehicle page.
- Permanently remove a vehicle and clean up its associated photos.

The current add-vehicle interface supports cars. Other vehicle types appear as coming soon.

### Vehicle information

Keep identification, technical specifications, and ownership details together:

| Category | Information |
| --- | --- |
| Identity | Make, model, trim, year, nickname, colour, and vehicle type |
| Registration | Registration plate, VIN, certificate number, country, and first registration date |
| Specifications | Fuel type, transmission, drivetrain, engine capacity, power, emissions standard, and seats |
| Ownership | Purchase date, price, currency, vehicle use, and personal notes |

Make and model selectors use a database-backed vehicle catalog.

### Registration-document scanning

- Scan a Part I or Part II registration-document photograph to autofill readable vehicle details.
- Extract fields such as make, model, VIN, registration plate, first registration date, engine capacity, power, fuel type, colour, and seats.
- Accept JPEG, PNG, or WebP images up to 5 MB.
- Review and edit the filled fields before saving the vehicle.

Scanning uses Google Gemini through server-side services. The scan returns form values; it does not save the vehicle or archive the document image. Both document and odometer scanning require a configured Gemini API key and should be reviewed for extraction mistakes.

### Mileage management

- Update the current odometer reading and its recorded date.
- Record mileage corrections and odometer replacements with a reason.
- Use odometer photo scanning to assist with mileage entry, with editable results before saving.

### Private vehicle photos

Upload, replace, and remove vehicle photos. Photos are stored in a private Supabase Storage bucket and displayed through temporary signed URLs.

### Maintenance and service history

Add service records to a vehicle, browse them newest first, and open a dedicated details page for each record. Records are saved in Supabase rather than generated from sample data.

| Category | Information |
| --- | --- |
| Visit | Service category or custom description, visit reason, date, mileage, and provider |
| Work | Work performed, symptoms, service outcome, and notes |
| Costs | Parts cost, labour cost, and invoice number; history entries show the combined cost and stored currency |
| Replaced part | Name, brand, part number, and quantity |
| Fluids | Type or custom description, specification, and quantity |
| Warranty | Expiry date and mileage limit |
| Next service | Date, mileage, and recommended work |

Available service categories cover oil, brakes, tyres, battery, timing, transmission, drivetrain, suspension, air conditioning, cooling, electrical, engine, exhaust, bodywork, and other work.

### Upcoming service reminders

Vehicle details display reminders derived from saved service records with a next-service date or mileage. Dated entries appear first, ordered by date, with recommended work when provided.

This currently provides an on-page maintenance reference. Standalone reminder creation and email or push notifications are not implemented.

### PDF vehicle reports

Download a PDF directly from the vehicle actions menu, organized into:

1. Vehicle identity
2. Technical specifications
3. Registration and purchase
4. Mileage
5. Personal notes, when provided

Reports support Cyrillic text through bundled Noto Sans fonts.

> Reports currently summarize saved vehicle details and the current mileage reading. They do not contain a complete mileage or maintenance history.

### Accounts and access

- Email and password registration with a username-availability check.
- Password sign-in with a remember-me preference, plus Google and Facebook OAuth flows when configured in Supabase.
- Forgotten-password emails, a password-reset flow, and password changes for signed-in users.
- Authenticator-app two-factor authentication, including QR-code setup, code verification, and disabling an enrolled factor.
- MFA verification before access to protected dashboard pages when required by the account.

### Profiles

- View personal information, profile completion, sign-in method, and last sign-in.
- Edit full name, username, phone number, city, biography, and avatar.
- Upload profile avatars to Supabase Storage.

Supabase powers authentication and account functionality. Vehicle services check authenticated ownership, and protected server operations use a shared session and MFA guard. Database grants, Row Level Security, and Storage policies must also be configured in the target Supabase project; source inspection alone does not verify those deployed policies.

## Current Limitations

Some visible controls describe planned functionality. Their presence does not mean a complete workflow is available:

- Non-car vehicle types are marked as coming soon in the type selector.
- Standalone expenses, fuel entries, tyre-set management, document uploads, and insurance or inspection tracking are not connected.
- The global reminders menu is a placeholder. Vehicle-specific reminders come from service records; the separate **Add reminder** button has no creation flow.
- Service records can be added and viewed; editing and deleting them are not implemented.
- **View all services** has no separate navigation flow; the current history already renders the returned records.
- Some garage organiser cards and global Add-menu items still say coming soon, including service-related shortcuts, even though services can be added from a vehicle page.
- Account deletion is disabled.
- PDF exports contain vehicle details and current mileage, excluding saved service history.


## Design

AutoCrest uses a consistent visual system across its garage, vehicle details, and account pages:

- Light, dark, and system theme selection.
- Purple accents, subtle borders, and rounded panels.
- Responsive layouts and compact vehicle information sections.
- Shared buttons, form controls, and navigation components.
- Loading states, confirmation dialogs, and feedback for asynchronous actions.

## Technology

| Layer | Technology |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, feature styles, shared UI components |
| Authentication and data | Supabase Auth, PostgreSQL, Supabase Storage |
| Validation | Zod |
| UI primitives and icons | Base UI, Lucide |
| PDF generation | React PDF |
| Assisted image extraction | Google Gemini API, validated with Zod |

Server Components load page data, while Client Components handle interactive forms, uploads, previews, and feedback. Server Actions and feature services perform data operations; the odometer extraction endpoint lives under `src/app/api`.

## Project Structure

The codebase follows a feature-based structure, keeping domain logic close to its UI.

```text
src/
  app/          Pages, layouts, route groups, and API routes
  features/
    auth/       Registration, sign-in, recovery, passwords, and MFA
    garage/     Vehicles, catalog, photos, scanning, services, and PDF reports
    profile/    Profile display, editing, avatars, and security UI
    marketing/  Public homepage sections
  shared/       Reusable UI, hooks, and styles
  lib/          Infrastructure and Supabase helpers
  proxy.ts      Request proxy
public/
  fonts/        Bundled PDF fonts and their license
  images/       Static image assets
supabase/
  migrations/   Checked-in database migrations
.github/
  workflows/    CI checks and Vercel deployment
docs/           Deployment and password-recovery documentation
```

### Main application routes

| Route | Purpose |
| --- | --- |
| `/` | Public marketing homepage |
| `/register`, `/login` | Account registration and sign-in |
| `/forgot-password`, `/reset-password` | Password recovery |
| `/auth/callback` | OAuth and password-recovery callback |
| `/verify-2fa` | Authenticator verification |
| `/garrage` | Personal garage and search; spelling reflects the current URL |
| `/vehicles/add-vehicle` | Vehicle-type selection and add-car form |
| `/vehicles/[id]` | Vehicle details, service history, and upcoming maintenance |
| `/vehicles/[id]/edit-vehicle` | Edit saved vehicle details |
| `/vehicles/[id]/maintenance/add-record` | Add a service record |
| `/vehicles/[id]/maintenance/[recordId]` | View a saved service record |
| `/profile`, `/profile/edit` | Profile display and editing |
| `/change-password` | Change the signed-in account's password |

### Data and integrations

The app expects an existing Supabase schema with `profiles`, `vehicles`, `vehicle_photos`, `vehicle_services`, `vehicle_makes`, and `vehicle_models`, along with the `is_username_taken` and `set_primary_vehicle` database functions. Storage uses the private `vehicle-photos` bucket and the `avatars` bucket for public avatar URLs.

The checked-in migration folder currently contains the username-availability function migration, not a complete database bootstrap or catalog seed. Saving a migration locally does not apply it to Supabase.

### Related documentation and delivery

- [Shared style catalog](src/shared/styles/README.md): reusable styles and UI conventions.
- [Password recovery](docs/password-recovery.md): callback behavior, email-link requirements, and live verification steps.
- [Deployment](docs/deployment.md): GitHub Actions, Vercel configuration, and deployment requirements.

The CI workflow runs lint, Next.js route type generation, TypeScript checks, and a production build. After checks pass, branch pushes deploy through Vercel, with `main` targeting production and other branches targeting previews. Pull-request events run checks only. Supabase migrations are applied separately.

## Roadmap

- [x] Personal garage and vehicle details
- [x] Primary vehicle selection
- [x] Vehicle photo management
- [x] Mileage updates, corrections, and replacement readings
- [x] Direct PDF vehicle report downloads
- [x] Vehicle deletion with a confirmation dialog
- [x] Garage search
- [x] Registration-document autofill and odometer photo scanning
- [x] Persistent service records, history, and record details
- [x] Service costs, part and fluid details, and warranty fields
- [x] On-page reminders from next-service dates and mileage
- [x] Profile editing and avatar uploads
- [x] Password recovery and authenticator-based two-factor authentication

### Planned development

1. **Complete maintenance workflows:** service editing and deletion, standalone reminder creation, and connected garage-wide shortcuts.
2. **Documents and deadlines:** stored vehicle documents, insurance and inspection records, and notification delivery.
3. **Ownership costs:** dedicated expenses, fuel entries, receipts, and cost summaries.
4. **Broader garage support:** additional vehicle types and tyre-set management.
5. **History and portability:** service history in exported reports and broader data export.
6. **Account lifecycle:** account deletion and associated data cleanup.

> **Development status:** This README describes the current source implementation. Live authentication, email delivery, database access, Storage policies, and Gemini scanning still require verification against the configured services. Passing local checks or CI does not establish that those integrations work live.
