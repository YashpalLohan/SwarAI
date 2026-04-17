import React from 'react';
import { MoreHorizontal, Pencil, Trash2, Zap } from 'lucide-react';

const TranscriptSidebar = ({ captions, onEdit, onDelete }) => {
  return (
    <div className="transcript-sidebar">
      <div className="transcript-header">
        <h3>Transcript</h3>
        <span className="dots"><MoreHorizontal size={18} /></span>
      </div>
      
      <div className="transcript-list">
        {captions && captions.length > 0 ? (
          captions.map((cap, i) => (
            <div key={i} className={`transcript-item ${i === 2 ? 'active' : ''}`}>
              <div className="item-header">
                <span className="timestamp">[{Math.floor(cap.start / 60).toString().padStart(2, '0')}:{(cap.start % 60).toFixed(0).padStart(2, '0')}]</span>
                <span className="speaker">Speaker {i % 2 + 1}</span>
                <span className="dots"><MoreHorizontal size={14} /></span>
              </div>
              <p className="caption-text">{cap.text}</p>
              <div className="item-actions">
                <button className="action-btn" onClick={() => {
                  const newText = prompt('Edit caption:', cap.text);
                  if (newText !== null) onEdit(i, newText);
                }}>
                  <Pencil size={12} /> Edit
                </button>
                <button className="action-btn" onClick={() => onDelete(i)}>
                  <Trash2 size={12} /> Delete
                </button>
                <button className="action-btn">
                  <Zap size={12} /> AI Sync
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-transcript">
            <p>No captions generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptSidebar;
