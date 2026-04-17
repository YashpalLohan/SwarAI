import React, { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2, Zap, Search } from 'lucide-react';
import CaptionEditModal from './CaptionEditModal';

const TranscriptSidebar = ({ captions, onEdit, onDelete, currentTime = 0 }) => {
  const activeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const activeIndex = captions.findIndex(c => currentTime >= c.start && currentTime <= c.end);
  const prevActiveIndex = useRef(-1);

  useEffect(() => {
    if (activeIndex !== -1 && activeIndex !== prevActiveIndex.current) {
      if (activeRef.current) {
        activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      prevActiveIndex.current = activeIndex;
    }
  }, [activeIndex]);

  const handleEditClick = (index, text) => {
    setEditingText(text);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = (newText) => {
    onEdit(editingIndex, newText);
    setIsModalOpen(false);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = Math.floor(s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="transcript-sidebar">
      <div className="transcript-header">
        <div className="header-top">
          <h3>Transcript</h3>
          <div className="header-actions">
            <span className="badge-ai">AI Corrected</span>
            <MoreHorizontal size={18} className="icon-btn-gray" />
          </div>
        </div>
        <div className="search-bar-mini">
          <Search size={14} />
          <input type="text" placeholder="Search in transcript..." />
        </div>
      </div>
      
      <div className="transcript-list">
        {captions && captions.length > 0 ? (
          captions.map((cap, i) => {
            const isActive = currentTime >= cap.start && currentTime <= cap.end;
            return (
              <div 
                key={i} 
                ref={isActive ? activeRef : null}
                className={`transcript-item ${isActive ? 'active' : ''}`}
                onClick={() => handleEditClick(i, cap.text)}
              >
                <div className="item-header">
                  <span className="timestamp">[{formatTime(cap.start)}]</span>
                  <span className="speaker">Speaker {i % 2 + 1}</span>
                  <div className="item-meta">
                    <span className="dots"><MoreHorizontal size={14} /></span>
                  </div>
                </div>
                <p className="caption-text">{cap.text}</p>
                <div className="item-actions">
                  <button className="action-btn" onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(i, cap.text);
                  }}>
                    <Pencil size={11} /> Edit
                  </button>
                  <button className="action-btn" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(i);
                  }}>
                    <Trash2 size={11} /> Delete
                  </button>
                  <button className="action-btn sync">
                    <Zap size={11} /> Sync
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-transcript">
            <Zap size={40} className="zap-icon" />
            <p>Your AI-generated transcript <br/> will appear here.</p>
          </div>
        )}
      </div>

      <CaptionEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialText={editingText}
      />
    </div>
  );
};

export default TranscriptSidebar;
