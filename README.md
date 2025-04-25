# Dify Web Client

A lightweight Dify AI application client built with React and Next.js, supporting multiple application switching and conversation management.

## Introduction

Dify Web Client is an open-source web client for connecting to and using AI applications developed with [Dify](https://dify.ai). It provides a clean, user-friendly interface that allows users to easily converse and interact with multiple Dify AI applications.

## Features

- 📱 Responsive design, compatible with various devices
- 👥 Support for adding and managing multiple Dify applications
- 💬 Chat session saving and history recording
- 🖼️ Image upload and display functionality
- 🔄 Real-time streaming responses
- 🌈 Clean and attractive UI interface
- 📦 Local data storage, no backend service required

## Tech Stack

- **Frontend Framework**: React 18, Next.js 14
- **State Management**: Zustand
- **Styling Solution**: TailwindCSS, Emotion
- **HTTP Client**: Axios
- **Markdown Rendering**: React Markdown
- **Development Tools**: TypeScript, ESLint

## Installation and Usage

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/yourusername/dify-web-client.git
cd dify-web-client
```

2. Install dependencies

```bash
npm install
# or using yarn
yarn install
```

3. Start the development server

```bash
npm run dev
# or using yarn
yarn dev
```

4. Build for production

```bash
npm run build
npm run start
# or using yarn
yarn build
yarn start
```

## User Guide

1. Initialize the system and create a user account when using for the first time
2. To add a Dify application, provide the following information:
   - Application group name
   - Application name
   - Backend service API URL
   - API Key
3. After adding an application, you can start conversing with the AI
4. Support for uploading images and other files to interact with AI (if the Dify application supports it)
5. Conversation history is automatically saved locally

## Development Guide

### Project Structure

```
src/
├── components/     # Components
│   ├── chat/       # Chat-related components
│   ├── common/     # Common components
│   ├── icons/      # Icon components
│   ├── layout/     # Layout components
│   └── ui/         # UI components
├── lib/            # Utility libraries
│   └── storage/    # Local storage related
├── pages/          # Pages
├── store/          # State management
├── styles/         # Styles
├── types/          # Type definitions
└── utils/          # Utility functions
```

### Customization and Extension

1. Add new UI components: Create in the `src/components/ui` directory
2. Modify styles: Use TailwindCSS class names or add custom styles in `src/styles`
3. Add new features: Extend existing components and state management as needed

## Contribution Guidelines

Contributions of code, issue reporting, or suggestions are welcome. Please follow these steps:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
