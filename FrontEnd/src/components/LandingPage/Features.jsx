import React from 'react';
import { Mic, Wand2, Languages } from 'lucide-react';

const features = [
  {
    title: 'Precision Transcription',
    desc: 'Our AI reaches 99% accuracy in over 50 languages, handling diverse accents and technical jargon with ease.',
    icon: <Mic size={24} color="#10b981" />
  },
  {
    title: 'Automated Styling',
    desc: 'Choose from professional templates or create your own. Our AI intelligently styles captions for maximum readability.',
    icon: <Wand2 size={24} color="#10b981" />
  },
  {
    title: 'Global Translation',
    desc: 'Instantly translate your captions to reach a global audience. Support for all major international languages.',
    icon: <Languages size={24} color="#10b981" />
  }
];

const Features = () => {
  return (
    <section className="features-container" id="features">
      <div className="container">
        <div className="section-header">
          <h2>Powerful Features for <br />Modern Creators</h2>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
