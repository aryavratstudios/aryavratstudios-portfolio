# MASTER SYSTEM PROMPT
## Intelligent Screenshot-Based Client Project & Thumbnail Management System

Design and architect a full-scale, production-ready web application that functions as an advanced AI-powered project intelligence system for creative professionals (especially thumbnail designers and digital freelancers).

The system must allow users to manually upload screenshots (e.g., WhatsApp chats, Discord chats, emails, invoices, PayPal confirmations, references, design previews, etc.), automatically analyze them using AI, extract structured metadata, and convert everything into an organized, trackable, searchable project intelligence database.

This platform should act as a "Project Brain" that understands context, timelines, payments, revisions, deadlines, and business conversations — and transforms unstructured screenshots into actionable project dashboards.

---

# CORE OBJECTIVE

Build a system that:
1. Accepts multiple screenshots per project.
2. Extracts and analyzes metadata automatically.
3. Organizes information into structured project records.
4. Tracks revisions and builds a complete chronological timeline.
5. Tracks payments, invoices, price discussions, and financial status.
6. Maintains task status (to-dos, pending items, sent items).
7. Generates a clean overview dashboard for each project.
8. Allows pushing structured project data to a shared database called "Aryavrat HQ".
9. Provides a modern UI with smooth modals, rounded corners, animations, and intelligent alerts.

---

# SYSTEM ARCHITECTURE OVERVIEW

## 1. Upload & Processing Layer

### Screenshot Upload System
- Drag & Drop support
- Manual file selection
- Multi-image batch upload
- Supported formats: JPG, PNG, WEBP
- Automatic compression without losing text clarity

### AI Analysis Pipeline
When screenshots are uploaded:

1. Perform OCR (Optical Character Recognition).
2. Extract raw text.
3. Detect:
   - Dates
   - Time stamps
   - Usernames
   - Client name
   - Order details
   - Thumbnail references
   - Price discussions
   - Deadlines
   - Payment confirmations
   - Revisions
   - Delivery confirmations
   - Invoice mentions
   - Payment platform metadata

4. Convert extracted text into structured JSON format.
5. Classify screenshot type:
   - Order confirmation
   - Revision request
   - Payment proof
   - Deadline discussion
   - Reference sharing
   - Final delivery

6. Automatically attach parsed data to relevant project.

---

# PROJECT STRUCTURE

Each project must contain:

## Project Overview Fields
- Project ID (auto generated)
- Client Name
- Client Platform (Discord/WhatsApp/Email)
- Client Contact Identifier
- Project Title
- Order Date
- Final Deadline
- Current Status (Active / Waiting Payment / Delivered / Completed)
- Total Agreed Price
- Amount Received
- Amount Pending
- Currency

---

# TIMELINE ENGINE

Create an intelligent timeline builder that:

- Automatically arranges all extracted events chronologically.
- Groups messages by revision cycles.
- Marks payment events.
- Marks invoice sent events.
- Marks delivery events.
- Highlights overdue deadlines.

Timeline View Must Show:
- Date + Time
- Event Type
- Extracted Message Summary
- Linked Screenshot Preview
- Status Indicator Badge

Timeline must be interactive and expandable.

---

# REVISION TRACKING SYSTEM

The system must:

- Detect phrases like "change this", "revise", "make it brighter", etc.
- Count revision rounds.
- Link revision comments to specific thumbnail versions.
- Track:
  - Revision Requested Date
  - Revision Completed Date
  - Delay time

Generate:
- Total revisions count
- Average turnaround time per revision
- Pending revision alerts

---

# PAYMENT INTELLIGENCE MODULE

Extract and track:

- Agreed price
- Negotiated price changes
- Advance payments
- Final payments
- Payment platform (PayPal, UPI, Bank, etc.)
- Transaction ID
- Date and time

Calculate automatically:
- Total revenue per project
- Pending balance
- Late payment alerts
- Payment delay duration

Include visual progress bar for payment completion.

---

# TO-DO & STATUS TRACKER

System should detect and auto-create tasks like:
- Send invoice
- Deliver thumbnail
- Await client feedback
- Follow up for payment
- Send revision

Each task should have:
- Status (Pending / Done / Overdue)
- Linked screenshot reference
- Reminder support

---

# THUMBNAIL DATA ANALYSIS

For each thumbnail project:

Track:
- Number of thumbnails ordered
- Number delivered
- Versions created
- Delivery timestamps
- Design turnaround time
- Client response time

Generate insights:
- Average delivery time
- Fastest client
- Most revision-heavy client
- Revenue per thumbnail

---

# PROJECT OVERVIEW DASHBOARD UI

Design Requirements:
- Glassmorphism or soft shadow cards
- 16px+ rounded corners
- Smooth hover effects
- Animated modals
- Toast alerts
- Color-coded status badges
- Interactive charts

Dashboard Sections:
1. Project Summary Card
2. Financial Summary
3. Timeline Preview
4. Revision Stats
5. To-Do Checklist
6. Screenshot Gallery

Clicking any section opens modal with detailed data.

---

# ARYAVRAT HQ INTEGRATION

Each project must include a button:

"Push to Aryavrat HQ"

When clicked:

- Validate project completeness.
- Convert project into standardized JSON schema.
- Sync to shared central database.
- Show confirmation modal.
- Display sync status (Synced / Failed / Pending).

Must support:
- Conflict detection
- Version tracking
- Last synced timestamp

---

# DATABASE DESIGN

Use relational structure:

Tables:
- Projects
- Clients
- Screenshots
- ExtractedEvents
- Payments
- Revisions
- Tasks
- SyncLogs

Relationships must support:
- One client → many projects
- One project → many screenshots
- One project → many payments
- One project → many revisions

---

# INTELLIGENT ALERT SYSTEM

System must automatically generate alerts when:
- Deadline approaching within 24h
- Payment overdue
- Revision pending > 48h
- Invoice not sent
- Project inactive > 3 days

Alerts must be:
- Non-intrusive
- Dismissible
- Logged in alert history

---

# ANALYTICS PANEL

Global Dashboard must show:
- Total projects
- Active projects
- Total revenue
- Pending revenue
- Average revision count
- Average turnaround time
- Top paying client

Charts required:
- Revenue over time
- Project completion timeline
- Revision distribution

---

# SEARCH & FILTER ENGINE

Advanced filtering by:
- Client name
- Date range
- Payment status
- Deadline status
- Revision count
- Revenue amount

Include:
- Smart search (natural language)

Example:
"Show unpaid projects from last month"

---

# SECURITY & DATA SAFETY

- User authentication
- Encrypted screenshot storage
- Role-based access
- Audit logs
- Secure API communication

---

# PERFORMANCE REQUIREMENTS

- Lazy load screenshots
- Background AI processing queue
- Realtime updates
- Optimized queries
- Scalable architecture

---

# USER EXPERIENCE DETAILS

- Smooth transitions
- Minimal clutter
- Consistent typography
- Professional color system
- Clean navigation sidebar
- Responsive mobile support

---

# FUTURE EXPANSION CAPABILITIES

Design architecture so it can later support:
- Auto-invoice generation
- AI pricing suggestions
- Client reliability scoring
- Profit prediction model
- Auto reminder emails
- Integration with payment APIs

---

# FINAL EXPECTATION

The final system must not be a simple tracker.
It must function as:

A self-updating intelligent project assistant
that turns messy screenshots into structured business intelligence.

The system should feel premium, powerful, organized, and futuristic.

It must reduce manual tracking to near zero.

Everything must be automated, structured, searchable, analyzable, and syncable.

Build it scalable. Build it intelligent. Build it production-ready.

