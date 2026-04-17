import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const CaptionEditModal = ({ isOpen, onClose, onSave, initialText }) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content caption-edit-modal">
        <div className="modal-header">
          <h3>Edit Caption</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <textarea
            className="edit-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your caption here..."
          />
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-save" onClick={() => onSave(text)}>
            <Save size={16} style={{ marginRight: '8px' }} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptionEditModal;
