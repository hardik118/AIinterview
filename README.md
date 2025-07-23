# AI Interview Screening Platform

Voice-based AI screening platform that conducts technical and behavioral interviews, summarizes responses, and helps recruiters make faster, unbiased hiring decisions.

---

## 🎯 Project Overview

The **AI Interview Screening Platform** streamlines the initial interview process using conversational AI. It simulates realistic interview sessions, evaluates candidate responses, and generates structured summaries to assist recruiters in making objective decisions.

---

## ✅ Key Features

- **🎙️ Voice-Based Interviews:** Candidates interact in real-time via voice.
- **📋 Custom Interview Templates:** Configure technical + behavioral questions for each role (e.g., dev, design, marketing).
- **🤖 LLM Evaluation:** Uses GPT models to assess logic, communication, and correctness.
- **📊 Summarized Reports:** Auto-generated summaries and a grading rubric for recruiters.
- **🧑‍💼 Multiple User Roles:** Admin, recruiter, and candidate accounts.
- **🔒 Secure & Scalable:** Built on a serverless backend using Hono.

---

## ⚙️ Tech Stack

| Frontend        | Backend           | AI / ML     | Database     | DevOps                   |
|:---------------:|:----------------:|:-----------:|:------------:|:------------------------:|
| Next.js         | Hono             | OpenAI      | PostgreSQL   | Vercel / Cloudflare      |
| Tailwind CSS    | REST APIs        | Whisper (TBD)| Prisma ORM   | Docker (Planned)         |

---

## 🧩 Microservices & AI Models

### Python Microservices

- **`speech_service/`**:  
  Standalone Python-based microservice dedicated to speech processing (voice input, speech-to-text, audio handling, etc).
  - Integrates with the main platform via REST or similar APIs.
  - Designed for scalability and easy Docker deployment (roadmap).
  - Planned integration with OpenAI Whisper for advanced speech-to-text capabilities.

### AI Model Integration

- **OpenAI API**:  
  Core platform uses GPT models for interview evaluation, scoring, and response summarization.
- **Speech-to-Text**:  
  The Python microservice will leverage Whisper or other models to transcribe candidate responses, which are then analyzed by LLMs.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or [Neon](https://neon.tech))
- OpenAI API Key

### Installation

```bash
git clone https://github.com/hardik118/AIinterview.git
cd AIinterview
npm install
```

### Environment Setup

Create a `.env` file in the root:

```env
OPENAI_API_KEY=your-openai-key
DATABASE_URL=your-database-url
```

### Run Locally

```bash
# Run both frontend & backend (monorepo or separate, as per setup)
npm run dev
```

---

## 🛣️ Roadmap

- User authentication and onboarding
- AI-based question delivery
- Voice recording and transcription
- OpenAI scoring & summarization
- Recruiter dashboard
- Whisper integration
- Docker support & CI/CD

---

## 📸 Demo

*(Demo coming soon!)*

---

## 🙋‍♂️ Who's This For?

- Recruiters tired of resume spam
- Startups needing fast screening
- Candidates preferring async interviews
- Developers exploring LLM + voice tech

---

## 🤝 Contributing

Got ideas or want to help? Open an [issue](https://github.com/hardik118/AIinterview/issues) or submit a PR!  
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

[MIT](./LICENSE)
