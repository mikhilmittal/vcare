# VCare - Home Healthcare Website

A modern, simple website for home healthcare services with WhatsApp booking integration.

## Features

- 🏠 Clean, modern design
- 📱 Responsive layout for all devices
- 💬 WhatsApp integration for booking coordination
- ⚡ Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Navigate to the project directory:
```bash
cd vcare
```

2. Install dependencies:
```bash
npm install
```

3. **Important:** Update WhatsApp number in `components/BookNowModal.tsx`:
   - Find the line: `const whatsappNumber = "1234567890";`
   - Replace with your WhatsApp Business number (with country code, no + or spaces)
   - Example: `"919876543210"` for an Indian number (91 is country code)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

When a user clicks "Book Now":
1. A modal opens asking for their name and phone number
2. After submission, it opens WhatsApp with a pre-filled message
3. The message includes the user's name and phone number
4. You can then coordinate with them via WhatsApp

## Customization

### Change WhatsApp Number

Edit `components/BookNowModal.tsx` and update the `whatsappNumber` variable:
```typescript
const whatsappNumber = "YOUR_WHATSAPP_NUMBER"; // e.g., "919876543210"
```

### Modify Services

Edit the `services` array in `components/Services.tsx` to add, remove, or modify services.

### Update Colors

Modify the color scheme in `tailwind.config.ts` under the `primary` color palette.

### Update Content

- Hero section: `components/Hero.tsx`
- Stats section: `components/Stats.tsx`
- Footer: `components/Footer.tsx`

## Build for Production

```bash
npm run build
npm start
```

## Deploy

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended) or any Node.js hosting

## Project Structure

```
vcare/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BookNowModal.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Services.tsx
│   └── Stats.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## License

MIT

