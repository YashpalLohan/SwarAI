import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import EditorSidebar from './EditorSidebar';
import EditorHeader from './EditorHeader';
import TranscriptSidebar from './TranscriptSidebar';
import VideoUploader from '../VideoUploader';
import './Editor.css';

const EditorWrapper = () => {
  const [captions, setCaptions] = useState([]);
  const uploaderRef = useRef();
  
  const handleCaptionsGenerated = (generatedCaptions) => {
    setCaptions(generatedCaptions);
  };

  const handleEdit = (index, newText) => {
    const updated = [...captions];
    updated[index].text = newText;
    setCaptions(updated);
  };

  const handleDelete = (index) => {
    setCaptions(captions.filter((_, i) => i !== index));
  };

  const triggerGeneration = () => {
    if (uploaderRef.current) {
      uploaderRef.current.triggerGeneration();
    }
  };

  const handleExport = () => {
    if (uploaderRef.current) uploaderRef.current.exportSRT();
  };

  return (
    <div className="editor-container">
      <EditorSidebar />
      <EditorHeader projectName="Summer Memories - Day 3" onExport={handleExport} />
      
      <main className="editor-workspace">
        <div className="player-preview">
          <div className="preview-title">
            <span>Video Player</span>
            <button className="generate-btn" onClick={triggerGeneration}>
              <Sparkles size={16} style={{ marginRight: '8px' }} />
              Generate Captions (AI)
            </button>
          </div>
          <VideoUploader 
            ref={uploaderRef}
            minimal={true} 
            onCaptionsGenerated={handleCaptionsGenerated} 
          />
        </div>
        
        <div className="timeline-section">
          <div className="timeline-header">
            <span>Video Timeline</span>
            <div className="timeline-controls">
               {/* Controls mockup */}
            </div>
          </div>
          <div className="timeline-visual">
            <div className="audio-wave"></div>
            <div className="video-frames"></div>
            <div className="caption-tracks">
               {captions.map((cap, i) => (
                 <div key={i} className="timeline-caption-block" style={{
                   left: `${(cap.start / 100) * 100}%`,
                   width: `${((cap.end - cap.start) / 100) * 100}%`
                 }}></div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <TranscriptSidebar 
        captions={captions} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default EditorWrapper;
