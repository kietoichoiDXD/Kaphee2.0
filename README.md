<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/784406df-90d8-41db-9761-4f25f888005b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Project Structure

This frontend follows a scalable React structure inspired by the HireTab layout, while keeping the existing pages and shared components in place.

```text
src/
├── app/              # App-level setup, providers, and routing helpers
├── assets/           # Static assets such as images, icons, and fonts
├── components/       # Shared UI building blocks
│   ├── sections/     # Page sections and composed blocks
│   └── ui/           # Reusable low-level UI components
├── core/             # Core constants, utilities, and business rules
├── hooks/            # Custom React hooks
├── lib/              # Library configs and helper wrappers
├── pages/            # Route-level pages
└── styles/           # Global styles and design tokens
```

The current `Navbar`, `Footer`, and pages remain available and can be gradually moved into this structure as the app grows.
