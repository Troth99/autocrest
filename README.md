<div align="center">

# AutoCrest

**Your vehicles. Your records. One garage.**

A vehicle management web application for keeping vehicle details, photos, and mileage information together — built with drivers across Europe in mind.

![Status: In Development](https://img.shields.io/badge/Status-In_Development-A69AE8?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-1C2035?style=for-the-badge&logo=supabase&logoColor=3FCF8E)

[Overview](#overview) · [Features](#features) · [Design](#design) · [Technology](#technology) · [Project Structure](#project-structure) · [Roadmap](#roadmap)

</div>

---

## Overview

AutoCrest brings the information behind vehicle ownership into a personal digital garage. Owners can manage multiple vehicles, maintain their details, update odometer readings, and download a structured PDF report.

The project is growing toward a broader ownership companion, with maintenance records, expenses, fuel tracking, and reminders as future areas of development.

## Features

### Personal garage

- Manage multiple vehicles and choose a primary vehicle.
- View and edit vehicle details from a dedicated vehicle page.
- Permanently remove a vehicle and clean up its associated photos.

### Vehicle information

Keep identification, technical specifications, and ownership details together:

| Category | Information |
| --- | --- |
| Identity | Make, model, trim, year, nickname, colour, and vehicle type |
| Registration | Registration plate, VIN, certificate number, country, and first registration date |
| Specifications | Fuel type, transmission, drivetrain, engine capacity, power, emissions standard, and seats |
| Ownership | Purchase date, price, currency, vehicle use, and personal notes |

### Mileage management

- Update the current odometer reading and its recorded date.
- Record mileage corrections and odometer replacements with a reason.
- Use odometer photo scanning to assist with mileage entry, with editable results before saving.

### Private vehicle photos

Upload, replace, and remove vehicle photos. Photos are stored in a private Supabase Storage bucket and displayed through temporary signed URLs.

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

Supabase powers authentication and account functionality. Vehicle operations use authenticated ownership checks, with database Row Level Security policies controlling access to stored records.

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

## Project Structure

The codebase follows a feature-based structure, keeping domain logic close to its UI.

```text
src/
  app/          Pages, layouts, route groups, and API routes
  features/     Feature components, services, types, and validators
  shared/       Reusable UI, hooks, and styles
  lib/          Infrastructure and Supabase helpers
  proxy.ts      Request proxy
public/
  fonts/        Bundled PDF fonts and their license
  images/       Static image assets
supabase/
  migrations/   Versioned database migrations
```

## Roadmap

- [x] Personal garage and vehicle details
- [x] Primary vehicle selection
- [x] Vehicle photo management
- [x] Mileage updates, corrections, and replacement readings
- [x] Direct PDF vehicle report downloads
- [x] Vehicle deletion with a confirmation dialog
- [ ] Persistent maintenance and service history
- [ ] Expense and fuel tracking
- [ ] Vehicle reminders
- [ ] Historical activity in exported reports

> **Development status:** AutoCrest is under active development. Some maintenance dashboard sections display sample content, and unfinished actions are marked as coming soon. Implemented features still require validation against the configured live services.
