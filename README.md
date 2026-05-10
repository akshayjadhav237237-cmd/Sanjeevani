<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Caduceus.svg/120px-Caduceus.svg.png" alt="Sanjeevani Logo" width="80" />

  # Sanjeevani ⚕️
  
  *When Every Second Matters: An AI-powered emergency healthcare platform connecting patients to hospitals, ambulances, and doctors in real time.*

  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-success)](#)
</div>

## 📖 Overview
Sanjeevani is a comprehensive healthcare platform built to handle emergencies efficiently. It features an AI-powered assistant, real-time hospital discovery, SOS integration, and telemedicine capabilities to ensure help is always just a tap away.

## 🛠️ Tech Stack
- **Frontend**: Next.js 16, React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Groq (Llama 3.1)
- **Monorepo**: Turborepo / npm workspaces

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher - see `.nvmrc`)
- MongoDB (running locally or via Atlas)
- Groq API Key (for the AI Assistant)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Sanjeevani.git
   cd Sanjeevani
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create `.env` files in both the frontend and backend applications based on the provided examples.
   - `apps/server/.env`: Requires `MONGODB_URI`, `GROQ_API_KEY`, etc.
   - `apps/web/.env.local`: Environment variables for the Next.js client.

4. **Run the Application locally:**
   Start both the frontend and backend development servers.
   ```bash
   npm run dev
   ```

## 🤝 Contributing
We love contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## 🛡️ Security
If you discover a security vulnerability, please review our [Security Policy](SECURITY.md) for reporting instructions. Do not report security vulnerabilities on the public issue tracker.

## 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
