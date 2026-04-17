import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Image as ImageIcon, 
  Repeat, 
  Share, 
  Users, 
  Settings 
} from 'lucide-react';

const EditorSidebar = () => {
  return (
    <aside className="editor-sidebar">
      <div className="sidebar-brand">
        <div className="logo-icon-wrapper">
          <div className="logo-icon"></div>
        </div>
        <span>SimoraAi</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <LayoutDashboard size={18} /> Dashboard
          </li>
          <li className="nav-item active">
            <Video size={18} /> Projects
          </li>
          <li className="nav-item">
            <ImageIcon size={18} /> Media
          </li>
          <li className="nav-item">
            <Repeat size={18} /> Style Sync
          </li>
          <li className="nav-item">
            <Share size={18} /> Export
          </li>
          <li className="nav-item">
            <Users size={18} /> Team
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <Settings size={18} /> Settings
        </div>
      </div>
    </aside>
  );
};

export default EditorSidebar;
