# 🔬 ResearchPilot AI

<p align="center">
  <img src="https://img.shields.io/badge/AI-Research%20Assistant-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/RAG-Powered-06B6D4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

<p align="center">
  <strong>AI-powered research assistant for reading, searching, and understanding research papers with citation-grounded answers.</strong>
</p>

<p align="center">
  <a href="https://research-pilot-orcin.vercel.app">
    <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-Visit%20ResearchPilot-00C7B7?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <a href="https://research-pilot-orcin.vercel.app">🌐 Live Demo</a>
  •
  <a href="#-features">Features</a>
  •
  <a href="#-architecture">Architecture</a>
  •
  <a href="#-rag-pipeline">RAG Pipeline</a>
  •
  <a href="#-tech-stack">Tech Stack</a>
  •
  <a href="#-installation">Installation</a>
</p>

---

## 🌐 Live Demo

### 🚀 Try ResearchPilot AI

**Live Application:**
https://research-pilot-orcin.vercel.app

> ResearchPilot AI is deployed as a full-stack application with a React/Vite frontend and production backend infrastructure.

---

## 🧠 What is ResearchPilot AI?

**ResearchPilot AI** is a full-stack AI research assistant that helps researchers work with academic papers using **Retrieval-Augmented Generation (RAG)**.

Instead of asking an LLM a question without context, ResearchPilot allows users to upload their own research papers and ask questions based specifically on those documents.

### Core workflow

```text
Research Paper
      ↓
PDF Upload
      ↓
Text Extraction
      ↓
Document Chunking
      ↓
Embedding Generation
      ↓
Vector Database
      ↓
Semantic Search
      ↓
Relevant Research Context
      ↓
Gemini
      ↓
AI Answer + Sources
```

---

# ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Persistent sessions
* Logout
* User profile

### 📚 Research Collections

Create separate collections to organize research.

```text
ResearchPilot
│
├── Deepfake Detection
│   ├── Paper 01.pdf
│   ├── Paper 02.pdf
│   └── Paper 03.pdf
│
├── AI Agents
│   ├── MCP Research.pdf
│   └── Agentic AI.pdf
│
└── Machine Learning
    ├── Transformer.pdf
    └── CNN.pdf
```

### 📄 PDF Research Papers

Upload research papers and automatically process them for AI-powered retrieval.

The system performs:

```text
PDF
 ↓
Text Extraction
 ↓
Chunking
 ↓
Embeddings
 ↓
Vector Storage
```

### 🧩 Document Chunking

Large documents are divided into smaller meaningful chunks so the retrieval system can identify the most relevant portions of a paper.

### 🔎 Semantic Search

ResearchPilot uses vector embeddings to search by **meaning**, rather than only matching exact keywords.

```text
User Question
      ↓
Query Embedding
      ↓
Vector Similarity Search
      ↓
Relevant Document Chunks
```

### 🤖 RAG Research Chat

The retrieved research content is supplied to Gemini as context before generating the answer.

```text
Question
   ↓
Semantic Retrieval
   ↓
Relevant Chunks
   ↓
RAG Context
   ↓
Gemini
   ↓
Grounded Answer
```

### 📖 Source Citations

AI responses can reference the research content used to construct the answer, making the system more suitable for research-oriented workflows.

### 💬 Conversation History

Research conversations are persisted so users can continue previous research sessions.

### 📊 Dashboard

The dashboard provides access to:

* Research collections
* Documents
* AI research chat
* Research activity
* Quick actions

### ⚙️ Settings

Account and application settings are available through a dedicated settings interface.

---

# 🏗️ System Architecture

```text
                         ┌───────────────────┐
                         │       USER        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ React + Vite      │
                         │ TypeScript        │
                         └─────────┬─────────┘
                                   │
                                REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Node.js + Express │
                         │ TypeScript        │
                         └─────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │ PostgreSQL  │      │  Supabase   │      │   Gemini    │
       │ + pgvector  │      │   Storage   │      │    API      │
       └─────────────┘      └─────────────┘      └─────────────┘
              │                    │                    │
              ▼                    ▼                    ▼
         Metadata +            PDF Files         Embeddings +
         Vector Data                              AI Generation
```

---

# 🧠 RAG Pipeline

## 1. PDF Ingestion

```text
PDF
 ↓
Upload
 ↓
Text Extraction
```

## 2. Chunking

```text
Research Paper
      ↓
 ┌─────────────┐
 │ Chunk 1     │
 ├─────────────┤
 │ Chunk 2     │
 ├─────────────┤
 │ Chunk 3     │
 ├─────────────┤
 │ ...         │
 ├─────────────┤
 │ Chunk N     │
 └─────────────┘
```

## 3. Embedding Generation

ResearchPilot converts document chunks into vector representations using:

```text
gemini-embedding-001
```

The implementation uses **768-dimensional embeddings**.

```text
Text Chunk
    ↓
Embedding Model
    ↓
[0.023, -0.184, 0.921, ...]
```

## 4. Vector Storage

The embeddings are stored in PostgreSQL using:

```text
pgvector
```

## 5. Semantic Retrieval

When the user asks a question:

```text
Question
   ↓
Query Embedding
   ↓
pgvector Similarity Search
   ↓
Top Relevant Chunks
```

## 6. Context Construction

The retrieved chunks are combined into a context for the LLM.

```text
Chunk 1
Chunk 2
Chunk 3
  ↓
RAG Context
```

## 7. AI Generation

```text
User Question + Research Context
                ↓
              Gemini
                ↓
       Grounded AI Response
                ↓
             Citations
```

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose             |
| ------------ | ------------------- |
| React        | User interface      |
| TypeScript   | Type safety         |
| Vite         | Frontend tooling    |
| React Router | Application routing |
| Zustand      | State management    |
| Axios        | API communication   |

## Backend

| Technology | Purpose        |
| ---------- | -------------- |
| Node.js    | Runtime        |
| Express.js | REST API       |
| TypeScript | Type safety    |
| Prisma     | ORM            |
| JWT        | Authentication |
| Multer     | File upload    |

## Database & Storage

| Technology       | Purpose                  |
| ---------------- | ------------------------ |
| PostgreSQL       | Relational database      |
| Supabase         | Managed PostgreSQL       |
| pgvector         | Vector similarity search |
| Supabase Storage | PDF storage              |
| Prisma           | Database access          |

## AI

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Google Gemini     | Answer generation             |
| Gemini Embeddings | Document/query embeddings     |
| RAG               | Retrieval-grounded generation |

---

# 📁 Project Structure

```text
ResearchPilot/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Collections.tsx
│   │   │   ├── Collection.tsx
│   │   │   ├── Documents.tsx
│   │   │   ├── Chat.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── prisma.config.ts
│   └── package.json
│
└── README.md
```

---

# 🗄️ Database Architecture

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Collection    Conversation
 │
 ▼
Document
 │
 ▼
DocumentChunk
 │
 ▼
Embedding Vector
```

The primary entities include:

* `User`
* `Collection`
* `Document`
* `DocumentChunk`
* `Conversation`

---

# 🔐 Environment Variables

### Backend

```env
DATABASE_URL="your_supabase_database_url"

JWT_SECRET="your_jwt_secret"

GEMINI_API_KEY="your_gemini_api_key"

SUPABASE_URL="https://your-project.supabase.co"

SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

> ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend or commit it to GitHub.

---

# 🚀 Local Installation

## Prerequisites

* Node.js
* npm
* Supabase account
* Gemini API key
* Git

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/researchpilot-ai.git

cd researchpilot-ai
```

### Backend

```bash
cd server
npm install
```

Configure:

```text
server/.env
```

Then:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# ☁️ Deployment

ResearchPilot AI is designed around a cloud architecture:

```text
                     Internet
                         │
                         ▼
                ┌─────────────────┐
                │     Vercel      │
                │ React Frontend  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │     Render      │
                │ Express Backend │
                └────────┬────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
        Supabase     Supabase      Gemini
        PostgreSQL    Storage        API
        + pgvector
```

### Production Components

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Supabase PostgreSQL
* **Vector Search:** pgvector
* **File Storage:** Supabase Storage
* **AI:** Google Gemini

---

# 🔄 End-to-End Workflow

```text
                    USER
                      │
                      ▼
                Register / Login
                      │
                      ▼
                  Dashboard
                      │
                      ▼
              Create Collection
                      │
                      ▼
                  Upload PDF
                      │
                      ▼
              Supabase Storage
                      │
                      ▼
              Extract PDF Text
                      │
                      ▼
                  Chunk Text
                      │
                      ▼
             Generate Embeddings
                      │
                      ▼
             PostgreSQL + pgvector
                      │
                      ▼
                Ask Question
                      │
                      ▼
              Query Embedding
                      │
                      ▼
             Semantic Search
                      │
                      ▼
              Relevant Chunks
                      │
                      ▼
                 RAG Context
                      │
                      ▼
                  Gemini AI
                      │
                      ▼
              Grounded Answer
                      │
                      ▼
                 Citations
```

---

# 🛡️ Security

ResearchPilot AI follows several security practices:

* JWT authentication
* Protected API endpoints
* Environment-based secrets
* Server-side Gemini credentials
* Server-side Supabase service-role credentials
* User-specific resource access
* No API secrets in frontend code
* `.env` excluded from version control

---

# 🎯 Project Objectives

ResearchPilot AI demonstrates practical implementation of:

* Full-stack application development
* REST API architecture
* Authentication
* PostgreSQL
* Vector databases
* Semantic search
* Embeddings
* Retrieval-Augmented Generation
* LLM integration
* PDF processing
* Cloud storage
* AI-assisted research

---

# 🚧 Future Improvements

Potential improvements include:

* Streaming AI responses
* Advanced citation formatting
* Multi-paper comparison
* Research paper metadata extraction
* Automatic research summaries
* Citation highlighting
* Advanced document filtering
* Research report generation
* Export to PDF/Markdown
* Improved source visualization

---

# 🗺️ Development Progress

* [x] User authentication
* [x] JWT protected routes
* [x] User profile
* [x] Research collections
* [x] PDF upload
* [x] PDF text extraction
* [x] Document chunking
* [x] Gemini embeddings
* [x] PostgreSQL + pgvector
* [x] Semantic search
* [x] RAG context construction
* [x] Gemini answer generation
* [x] Source citations
* [x] Conversation persistence
* [x] Research dashboard
* [x] Frontend routing
* [x] Vercel frontend deployment
* [ ] Final production optimization

---

# 🌐 Live Project

<p align="center">

<a href="https://research-pilot-orcin.vercel.app">

<img src="https://img.shields.io/badge/🚀%20OPEN%20RESEARCHPILOT-Live%20Demo-8B5CF6?style=for-the-badge" />

</a>

</p>

<p align="center">
<strong>🔬 Research smarter. Retrieve faster. Understand deeper.</strong>
</p>

---

# 👨‍💻 Author

## Abdullah Firoj

**Software Developer | AI/ML Enthusiast | Researcher**

B.Sc. in Computer Science & Engineering

### Interests

* Artificial Intelligence
* Machine Learning
* Generative AI
* RAG Systems
* Full-Stack Development
* Computer Vision
* Research & Emerging Technologies

---

<p align="center">

### Built with ❤️ using React, Node.js, PostgreSQL, pgvector & Gemini

</p>
