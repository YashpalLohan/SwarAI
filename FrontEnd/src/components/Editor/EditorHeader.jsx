import React from 'react';
import { ChevronDown, CheckCircle, Search } from 'lucide-react';

const EditorHeader = ({ projectName = "Untitled Project", onExport }) => {
  return (
    <header className="editor-header">
      <div className="header-left">
        <span className="project-title">
          Project: {projectName} <ChevronDown size={14} style={{ marginLeft: '4px' }} />
        </span>
      </div>
      
      <div className="header-right">
        <span className="save-status">
          <CheckCircle size={14} style={{ marginRight: '6px' }} />
          Saved to Cloud
        </span>
        <button className="btn btn-export" onClick={onExport}>Export Video</button>
        <div className="user-profile">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          <span>Sarah J.</span>
        </div>
        <div className="search-icon">
          <Search size={18} color="#6b7280" />
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
