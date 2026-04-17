# SwarAI Backend

An Express.js backend service that receives audio files, processes them using a local Whisper model, and generates SRT captions compatible with Remotion.

## Features

- Audio file upload endpoint
- Local Whisper model integration for transcription
- SRT file generation compatible with Remotion
- CORS enabled for frontend integration
- Error handling and validation

## Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Install Python dependencies (Required for Whisper & Hinglish support):
```bash
pip3 install openai-whisper setuptools-rust librosa transformers soundfile scipy
```

3. **macOS Troubleshooting**: If Whisper fails to download models with an SSL error, run the certificate installer provided by Python:
```bash
/Applications/Python\ 3.x/Install\ Certificates.command
```

4. Install FFmpeg:
```bash
# macOS
brew install ffmpeg
# Windows
# Download from ffmpeg.org and add to PATH
```

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`
You can verify it's working by visiting `http://localhost:3001/health`

## API Endpoints

### POST `/api/upload-audio`
Uploads an audio file and returns SRT captions.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: audio file (supported formats: mp3, wav, m4a, ogg)

**Response:**
```json
{
  "success": true,
  "srt": "SRT formatted captions",
  "filename": "uploaded_file.mp3",
  "duration": 120.5
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Video Caption Backend is running",
  "timestamp": "2025-09-28T12:00:00.000Z"
}
```

## Project Structure

```
swarai-backend/
├── src/
│   ├── server.js          # Main server file
│   ├── routes/
│   │   └── upload.js      # Audio upload routes
│   ├── utils/
│   │   ├── whisper.js     # Whisper integration
│   │   └── srt.js         # SRT generation utilities
│   └── middleware/
│       └── upload.js      # File upload middleware
├── uploads/               # Temporary audio file storage
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3001
MAX_FILE_SIZE=100MB
WHISPER_MODEL=base
```