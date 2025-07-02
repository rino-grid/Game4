# Persistent Object - Website

A visually striking website with dynamic WebGL shader effects.

## Project Structure

The project follows a clean, organized structure:

```
Persistent Object/
├── assets/
│   ├── css/
│   │   ├── styles.css    # Main stylesheet
│   │   └── print.css     # Print-specific styles
│   ├── js/
│   │   ├── shader.js     # WebGL shader implementation
│   │   └── main.js       # Main JavaScript functionality
│   └── images/           # Image assets
│       └── preview.jpg   # Preview image for social sharing
├── index.html            # Main HTML file
├── site.webmanifest      # Web app manifest
├── favicon.svg           # SVG favicon
└── README.md             # This file
```

## Features

- Dynamic WebGL shader background effect
- Responsive design that works on various screen sizes
- Clean, modern UI with a dark theme
- shadcn UI components including buttons, image cards, and accordion
- 2x2 grid of images
- Print-friendly styling

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- WebGL for shader effects
- Tailwind CSS (via CDN)
- shadcn UI components
- Inter font for UI elements

## Running the Project

Simply open the `index.html` file in a modern web browser. No build steps or server setup is required.

## Browser Compatibility

The application works best in modern browsers that support WebGL:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

### WebGL Shader

The project uses a custom WebGL shader to create the dynamic wave effect in the header. The shader implementation includes:

- Perlin noise functions for organic movement
- Dithering for a retro aesthetic
- Dynamic color mapping based on noise patterns

### UI Components

The UI uses shadcn UI components for a clean, modern look:

- Button variants:
  - Primary buttons for main actions
  - Secondary buttons for secondary actions
  - Ghost buttons for tertiary actions
  - Destructive buttons for potentially dangerous actions
- Image card grid with hover effects
- Accordion component for FAQ section
