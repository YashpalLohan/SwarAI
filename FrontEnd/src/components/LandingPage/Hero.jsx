import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Zap } from 'lucide-react';
import captionMockup from '../../assets/caption-mockup.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1>Effortless AI <br /><span>Video Captions</span></h1>
          <p className="hero-subtitle">
            Experience the future of video content with SimoraAi. Our advanced AI automatically generates highly accurate captions and subtitles, helping you reach more viewers and increase engagement instantly.
          </p>
          <div className="hero-btns">
            <Link to="/editor" className="btn btn-primary">Try Live Demo</Link>
            <button className="btn btn-outline">Learn More ↗</button>
          </div>
        </div>
        
        <div className="hero-mockup">
          <div className="mockup-img-wrapper">
             <img src={captionMockup} alt="SimoraAi Caption Editor Mockup" />
             <div className="mockup-overlay-card top-left">
                <div className="avatar">
                  <PlayCircle size={20} color="#10b981" />
                </div>
                <div>
                  <h4>Auto-Generated Captions</h4>
                  <p>99.2% Accuracy</p>
                </div>
             </div>
             <div className="mockup-overlay-card bottom-right">
                <div className="avatar">
                  <Zap size={20} color="#10b981" />
                </div>
                <div>
                  <h4>Processing Speed</h4>
                  <p>10x Faster</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
