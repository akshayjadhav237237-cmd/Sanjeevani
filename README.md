<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Caduceus.svg/120px-Caduceus.svg.png" alt="Sanjeevani Logo" width="80" />

  # Sanjeevani ⚕️
  
  **When Every Second Matters.**
  
  *An AI-powered emergency healthcare platform connecting patients to hospitals, ambulances, and doctors in real time.*

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Sanjeevani-success?style=for-the-badge)](https://web-bvnagd1qr-akshay-jadhavs-projects-b3a18432.vercel.app)

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

## 🎯 Applications & Use Cases

Sanjeevani is designed to serve multiple stakeholders in the healthcare ecosystem:

### 1. For Patients
- **Emergency Response**: Instantly trigger an SOS to alert nearby hospitals and family members.
- **AI Triage & Symptom Checker**: Describe symptoms to the AI assistant for preliminary guidance before reaching a doctor.
- **Hospital Finder**: Locate the nearest hospitals with available ICU beds or specific specialists, avoiding wasted time during critical moments.
- **Ambulance Booking**: Request and track an ambulance with live ETA updates.

### 2. For Hospitals & Clinics
- **Emergency Preparedness**: Receive advance alerts about incoming emergency patients, including their symptoms and estimated arrival time.
- **Resource Management**: Automatically update bed availability and specialized equipment status to direct patients effectively.
- **Digital Records Access**: Quickly access a patient's critical medical history (allergies, blood type, past surgeries) upon arrival.

### 3. For Ambulance Drivers & Paramedics
- **Optimized Routing**: Receive the fastest route to the patient and the destination hospital, avoiding traffic bottlenecks.
- **Patient Handoff**: Transmit vital signs and preliminary data to the hospital en route.

---

## 🏗️ Architecture & System Design

Sanjeevani leverages a highly scalable **Monorepo Architecture** powered by Turborepo. This approach allows seamless code sharing, rapid iteration, and unified dependency management across all platform microservices and frontends.

### System Components
- **Frontend (Web App)**: Built on the cutting-edge Next.js 16 (App Router) with React 18. It provides a highly responsive, SSR-optimized, and accessible user interface. The UI is crafted using Tailwind CSS and Framer Motion, delivering a sleek, glassmorphic design with intuitive micro-animations that reduce cognitive load during high-stress emergency situations.
- **Backend (API Services)**: A robust Node.js and Express.js microservice layer handles core business logic, including authentication, SOS geofenced routing, real-time data synchronization, and third-party API integrations.
- **Database Layer**: MongoDB (via Mongoose) serves as the primary NoSQL data store. Its flexible document structure perfectly accommodates the varied nature of patient health records, hospital inventory schemas, and dynamic real-time telemetry from ambulances.
- **AI Inference Engine**: The Groq API is integrated at the application edge, utilizing the Llama 3.1 LLM model. By leveraging Groq's LPU (Language Processing Unit) technology, Sanjeevani provides ultra-fast, sub-second latency for context-aware medical insights and natural language symptom checking.
- **Authentication & Authorization**: Secured by modern OAuth 2.0 flows and JWT-based session management (via Supabase), ensuring strict patient data privacy, role-based access control (RBAC), and HIPAA-compliant data handling principles.

### 🔄 Core Workflows

**1. The SOS Trigger Flow**
When a patient initiates an SOS, the system captures their precise GPS coordinates. A geospatial query (using MongoDB's `$nearSphere`) instantly identifies the top 3 nearest hospitals equipped to handle emergencies. Websocket connections simultaneously ping these hospitals with the patient's preliminary data and dispatch the nearest available ambulance.

**2. AI-Assisted Triage**
A user inputs their symptoms via voice or text. The frontend streams this to the Next.js API route, which constructs a medical prompt context and securely queries the Groq Llama 3.1 model. The AI responds instantly with a preliminary severity assessment (e.g., "Critical: Suspected Myocardial Infarction") and advises immediate actions while simultaneously prompting the user to trigger an SOS if necessary.

**3. Real-Time Resource Sync**
Hospitals use a dedicated dashboard to update bed availability. These updates are broadcasted via Server-Sent Events (SSE) or WebSockets to all active users in the vicinity, ensuring that patients and ambulances do not waste time traveling to at-capacity facilities.

---

## ⚡ Scalability & Performance

In emergency healthcare, downtime is unacceptable. Sanjeevani is engineered with the following performance considerations:
- **Edge Caching**: Static assets and semi-dynamic data (like hospital directories) are aggressively cached at the edge using Next.js caching strategies and CDNs.
- **Low Latency AI**: By utilizing Groq instead of traditional cloud GPU providers, AI inference times are reduced from seconds to milliseconds, a crucial factor when a user is panicking.
- **Optimized Database Queries**: Critical paths like geospatial hospital lookups are heavily indexed (2dsphere indexes in MongoDB) to guarantee sub-100ms response times even under high concurrent load.
- **Mobile-First Responsiveness**: The entire application is optimized for low-end mobile devices and unstable 3G networks, ensuring the platform remains usable in remote or congested areas.

---

## 🔒 Data Privacy & Security

Handling sensitive PHI (Protected Health Information) requires the highest standards of security:
- **End-to-End Encryption**: All data transmitted between the client, server, and database is encrypted in transit using TLS 1.3.
- **Data Anonymization**: AI triage requests are stripped of PII (Personally Identifiable Information) before being sent to external LLM providers.
- **Strict RBAC**: Ambulance drivers only see patient details relevant to transport; hospitals only see full medical histories once a patient is actively routed to them.

---

## 🗺️ Future Roadmap

Our vision for Sanjeevani extends far beyond the current feature set. Upcoming milestones include:
- **[Q3 2026] Wearable Integration**: Direct sync with Apple Health and Google Fit to automatically trigger SOS alerts based on abnormal heart rate or fall detection.
- **[Q4 2026] Live Telemedicine**: Integrated WebRTC video calls allowing paramedics to stream live footage to emergency room doctors while en route.
- **[Q1 2027] National Blood Bank API**: Real-time tracking of specific blood type availability across regional blood banks.
- **[Q2 2027] Multi-Lingual Voice AI**: Expanding the AI assistant to support voice interactions in 15+ regional languages to improve accessibility for non-English speakers.

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

## 📄 License & Code of Conduct

- **License:** Distributed under the **Apache License 2.0**. See [LICENSE](LICENSE) for details.
- **Code of Conduct:** We expect all participants to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).
 
