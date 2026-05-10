<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Caduceus.svg/120px-Caduceus.svg.png" alt="Sanjeevani Logo" width="80" />

  # Sanjeevani ⚕️
  
  **When Every Second Matters.**
  
  *An AI-powered emergency healthcare platform connecting patients to hospitals, ambulances, and doctors in real time.*

  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-success)](#)
  [![Framework](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](#)
</div>

---

## 📖 What is Sanjeevani?

In medical emergencies, time is the difference between life and death. Finding the right hospital, booking an ambulance, or understanding sudden symptoms shouldn't be a struggle. 

**Sanjeevani** is a comprehensive, all-in-one healthcare platform designed to handle these critical moments efficiently. Whether you need immediate SOS assistance, real-time hospital bed availability, or a quick consultation with our AI health assistant, Sanjeevani ensures that medical help is always just a tap away.

---

## ✨ Key Features

- **🚨 One-Tap Emergency SOS**: Instantly alerts nearby hospitals and emergency contacts with your live location.
- **🏥 Real-Time Hospital Discovery**: Find nearby hospitals with verified, real-time data on ICU bed availability, specialist doctors, and estimated treatment costs.
- **🤖 Sanjeevani AI Assistant**: Powered by Groq & Llama 3.1, our medical AI helps you check symptoms, understand medical jargon, and find the right specialists.
- **🚑 Live Ambulance Tracking**: Book and track ambulances in real-time, directly integrated with local hospital dispatch systems.
- **💊 Medication Management**: AI-driven drug interaction checker and pill reminders.
- **📄 Digital Health Records**: Securely store and share your medical history, prescriptions, and lab reports with your doctors.

---

## 💻 Tech Stack

Sanjeevani is built for speed, reliability, and scale using a modern monorepo architecture.

* **Frontend**: Next.js 16, React, Tailwind CSS, Framer Motion (for fluid animations)
* **Backend**: Node.js, Express.js, TypeScript
* **Database**: MongoDB (Mongoose)
* **AI & Machine Learning**: Groq API (Llama 3.1 Model) for lightning-fast AI inferences
* **Architecture**: Turborepo / npm workspaces

---

## 🚀 Getting Started

Follow these instructions to set up Sanjeevani on your local machine for development and testing.

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/en/) (v20 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or via Atlas)
* A free [Groq API Key](https://console.groq.com/) (for the AI Assistant)

### 1. Clone the Repository
```bash
git clone https://github.com/akshayjadhav237237-cmd/Sanjeevani.git
cd Sanjeevani
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
You will need to create `.env` files in both the frontend and backend directories.

**Backend (`apps/server/.env`)**:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/sanjeevni
GROQ_API_KEY=your_groq_api_key_here
CLIENT_URL=http://localhost:3000
```

### 4. Run the Platform
You can start both the frontend and backend servers simultaneously from the root directory:
```bash
npm run dev
```
* The web application will be running at `http://localhost:3000`
* The backend API will be running at `http://localhost:5001`

---

## 📸 Screenshots

*(Maintainers: Drop screenshots of the Dashboard, AI Assistant, and Mobile view here to make the repository visually appealing!)*

|<img src="https://via.placeholder.com/400x250.png?text=Dashboard+Screenshot" alt="Dashboard" />|<img src="https://via.placeholder.com/400x250.png?text=AI+Assistant+Screenshot" alt="AI Assistant" />|
|:---:|:---:|
| *Patient Dashboard* | *Groq-powered AI Assistant* |

---

## 🤝 Contributing

We welcome contributions from the open-source community! 
1. Please read our [Contributing Guidelines](CONTRIBUTING.md) to learn how to propose bugfixes and improvements.
2. Review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 🛡️ Security

If you discover a security vulnerability within Sanjeevani, please refer to our [Security Policy](SECURITY.md) for instructions on how to responsibly disclose it.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
