# Gullible Giant

A modern website built with Astro and TinaCMS.

## Features

- 🚀 Astro for fast static site generation
- 📝 TinaCMS for content management
- 🎨 Modern UI with Bootstrap
- 📱 Responsive design
- ⚡ Fast performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alecasgari/gullible-giant.git
cd gullible-giant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your TinaCMS credentials
```

4. Start the development server:
```bash
npm run dev
```

## TinaCMS Setup

This project uses TinaCMS for content management. To set up TinaCMS:

1. Create a TinaCloud account at [tina.io](https://tina.io)
2. Create a new project
3. Get your Client ID and Token
4. Add them to your `.env` file
5. Run `npx tinacms build` to build the admin panel

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx tinacms build` - Build TinaCMS admin panel

## License

MIT