# AI Tools Directory

A modern web application for discovering, browsing, and managing AI tools. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Browse AI Tools**: View a comprehensive collection of AI tools with detailed information
- **Smart Filtering**: Filter tools by category with case-insensitive search
- **Search Functionality**: Search tools by name, category, or description
- **Favorites System**: Save and manage your favorite AI tools
- **Analytics Dashboard**: Visualize tool distribution by category
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Responsive**: Optimized for all device sizes
- **Confetti Animation**: Celebrate when adding favorites

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-tools-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── ToolCard.tsx    # Individual tool card component
│   ├── ToolsList.tsx   # Tools listing with filters
│   ├── FavoritesList.tsx # Favorites management
│   ├── CategoryChart.tsx # Analytics chart
│   └── Confetti.tsx    # Confetti animation
├── services/           # API services
│   └── mockApi.ts      # Mock API implementation
├── types/              # TypeScript type definitions
│   └── types.ts        # Application types
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
```

## 🎯 API Endpoints

The application uses a mock API service that simulates the following endpoints:

- `GET /api/tools` - Get all AI tools
- `GET /api/tools?category=Writing` - Filter tools by category
- `POST /api/favorites` - Add a tool to favorites
- `GET /api/favorites` - Get all favorite tools

## 🎨 Customization

### Adding New Tools

To add new AI tools, edit the `aiToolsData` array in `src/services/mockApi.ts`:

```typescript
{
  id: 13,
  name: "Your AI Tool",
  category: "Your Category",
  description: "Tool description",
  url: "https://your-tool.com",
  pricing: "Free/Premium",
  features: ["Feature 1", "Feature 2"]
}
```

### Styling

The application uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts`.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
