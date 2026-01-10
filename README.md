# OGMsite

A modern MVC-structured website for OGM with stunning scroll animations and responsive design.

## Features

- **MVC Architecture**: Clean separation of concerns with Models, Views, and Controllers
- **GSAP Animations**: Smooth scroll-triggered animations and interactive bottle animations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Express.js Backend**: Fast and minimal web application framework
- **EJS Templates**: Dynamic server-side rendering with layout support
- **Development Tools**: Hot reload with nodemon and webpack build system

## Project Structure

```
OGMsite/
├── src/
│   ├── controllers/        # Route handlers and business logic
│   ├── models/            # Data models and business entities
│   ├── views/             # EJS templates and layouts
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── index.js           # Main application entry point
├── public/
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Static images
├── dist/                  # Built files for production
└── package.json           # Dependencies and scripts
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd OGMsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run watch` - Watch files and rebuild on changes
- `npm run serve` - Serve built files with webpack dev server
- `npm test` - Run tests
- `npm run lint` - Lint JavaScript files
- `npm run format` - Format code with Prettier

## Development

### MVC Pattern

This project follows the Model-View-Controller (MVC) architectural pattern:

- **Models** (`src/models/`): Handle data logic and business rules
- **Views** (`src/views/`): Handle the presentation layer with EJS templates
- **Controllers** (`src/controllers/`): Handle user input and coordinate between models and views

### Adding New Features

1. **Create a Model**: Add data handling logic in `src/models/`
2. **Create a Controller**: Add route handlers in `src/controllers/`
3. **Create Views**: Add EJS templates in `src/views/`
4. **Update Routes**: Add new routes in the main application file

### Styling

The project uses:
- Custom CSS with CSS Grid and Flexbox
- Google Fonts (Arimo and Sail)
- Bootstrap Icons
- Responsive design with mobile-first approach

### Animations

GSAP (GreenSock Animation Platform) is used for:
- Scroll-triggered section animations
- Interactive bottle hover effects
- Responsive behavior for different screen sizes

## Deployment

### Production Build

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.
