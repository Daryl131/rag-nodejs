# rag-nodejs

A lightweight Node.js backend for Retrieval-Augmented Generation (RAG), providing API endpoints for document embedding, storage, and vector search using HuggingFace Transformers and Chroma DB.

## Features

- **Add Document:** Generate and store document embeddings.
- **Add Multiple Documents:** Bulk document embedding and storage.
- **Semantic Query:** Query stored documents via semantic similarity.
- **Health Check:** Quick health status for the API.

## Tech Stack

- **Node.js** + **Express**
- **ChromaDB** for vector storage
- **HuggingFace Transformers** for text embedding
- **@chroma-core/default-embed** for embedding initialization
- **Winston** & **Morgan** for logging
- **dotenv** for environment management

## API Endpoints

### Health
- `GET /` – Returns API status

### Document Operations (prefix: `/docs`)
- `POST /add-doc` – Add a single document 
  - Body: `{ id: string, text: string }`
- `POST /add-docs` – Add multiple documents
  - Body: `{ ids: string[], texts: string[] }` _(arrays must be the same length)_
- `POST /query` – Query documents
  - Body: `{ question: string }`

## Getting Started

### Prerequisites
- Node.js >= 18
- Chroma DB instance (see [Chroma docs](https://docs.trychroma.com/))

### Installation
```bash
npm install
```

### Configuration
Create a `.env` file in the root directory (see `.env.example`):
```
PORT=3000
MODEL_CACHE=./.cache
CHROMA_URL=http://localhost:8000
```
- `CHROMA_URL` should point to your running Chroma instance.
- `MODEL_CACHE` directory must exist and be writable.

### Running ChromaDB with Docker Compose

To run ChromaDB locally as the backend vector database, use the included docker-compose file:

```bash
docker-compose up -d
```

This starts the ChromaDB service on port 8000 and stores its data inside the `chroma_db` directory (mounted as a Docker volume).  
Ensure ChromaDB is running before starting your Node.js server.

### Running the Server
- Production:
  ```bash
  npm start
  ```
- Development (auto-reloads):
  ```bash
  npm run dev
  ```

### Example Request
Add a document:
```bash
curl -X POST http://localhost:3000/docs/add-doc \
  -H "Content-Type: application/json" \
  -d '{ "id": "doc1", "text": "Hello world" }'
```

## Project Structure
- `src/app.js` – Express app setup
- `src/index.js` – App entry and initialization
- `src/routes/` – API route handlers
- `src/services/` – External service layer for embedding and vector DB ops
- `src/utils/` – Utilities and common helpers
- `src/middlewares/` – Express middleware functions

## License
ISC
