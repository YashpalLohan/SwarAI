import { ChevronDown, CheckCircle, Music, RotateCcw } from 'lucide-react';

const EditorHeader = ({ projectName = "Untitled Project", onExport, onExportAudio, onReset, exportDisabled }) => {
  return (
    <header className="editor-header">
      <div className="header-left">
        <span className="project-title">
          Project: {projectName} <ChevronDown size={14} style={{ marginLeft: '4px' }} />
        </span>
        {!exportDisabled && (
          <button className="btn-reset" onClick={() => {
            if(window.confirm('Reset this project? This will clear all current captions.')) onReset();
          }}>
            <RotateCcw size={14} />
            Reset
          </button>
        )}
      </div>
      
      <div className="header-right">
        <span className="save-status">
          <CheckCircle size={14} style={{ marginRight: '6px' }} />
          Saved to Cloud
        </span>
        {!exportDisabled && (
          <div className="header-actions-group">
            <button 
              className="btn btn-secondary-outline" 
              onClick={onExportAudio}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Music size={14} />
              Download Audio
            </button>
            <button 
              className="btn btn-export" 
              onClick={onExport}
            >
              Export SRT
            </button>
          </div>
        )}
        <div className="user-profile">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          <span>Sarah J.</span>
        </div>

      </div>
    </header>
  );
};

export default EditorHeader;
