import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import EditorSidebar from './EditorSidebar';
import EditorHeader from './EditorHeader';
import TranscriptSidebar from './TranscriptSidebar';
import VideoUploader from '../VideoUploader';
import './Editor.css';

const EditorWrapper = () => {
  const [activeTab, setActiveTab] = useState('Projects');
  const [captions, setCaptions] = useState([]);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const uploaderRef = useRef();
  
  const handleReset = () => {
    setCaptions([]);
    setIsVideoUploaded(false);
    setProjectName('');
    setCurrentTime(0);
  };
  
  const handleFileSelect = (file) => {
    setIsVideoUploaded(true);
    setProjectName(file.name);
    setCaptions([]);
  };

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

  const handleExportAudio = () => {
    if (uploaderRef.current) uploaderRef.current.exportAudio();
  };

  const hasCaptions = captions && captions.length > 0;

  return (
    <div className="editor-container">
      <EditorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <EditorHeader 
        projectName={
          activeTab === 'Projects' 
            ? (isVideoUploaded ? projectName : "New Project") 
            : activeTab
        } 
        onExport={handleExport} 
        onExportAudio={handleExportAudio}
        onReset={handleReset}
        exportDisabled={activeTab !== 'Projects' || !hasCaptions}
      />
      
      {activeTab === 'Projects' ? (
        <>
          <main className="editor-workspace" style={{ gridColumn: hasCaptions ? '2' : '2 / 4' }}>
            <div className="player-preview">
              <div className="preview-title">
                <span>Video Player</span>
                {isVideoUploaded && !hasCaptions && (
                  <button className="generate-btn" onClick={triggerGeneration}>
                    Generate Captions (AI)
                  </button>
                )}
              </div>
              <VideoUploader 
                ref={uploaderRef}
                minimal={true} 
                onFileSelect={handleFileSelect}
                onCaptionsGenerated={handleCaptionsGenerated} 
                onTimeUpdate={setCurrentTime}
              />
            </div>
            

          </main>

          {hasCaptions && (
            <TranscriptSidebar 
              captions={captions} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              currentTime={currentTime}
            />
          )}
        </>
      ) : (
        <main className="editor-workspace" style={{ gridColumn: '2 / 4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <h2>{activeTab} Content</h2>
            <p>This feature is coming soon to SwarAI.</p>
          </div>
        </main>
      )}
    </div>
  );
};

export default EditorWrapper;
