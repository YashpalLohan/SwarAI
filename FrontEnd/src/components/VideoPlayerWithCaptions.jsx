import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize2, Type } from 'lucide-react';

const VideoPlayerWithCaptions = ({ videoFile, captions, onTimeUpdate }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [duration, setDuration] = useState(0);
  const [processedCaptions, setProcessedCaptions] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  
  const fontOptions = [
    { value: 'Inter', label: 'Inter (Modern)' },
    { value: 'Outfit', label: 'Outfit (Sleek)' },
    { value: 'Georgia', label: 'Georgia (Elegant)' }
  ];

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate) onTimeUpdate(video.currentTime);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!captions || captions.length === 0) {
      setProcessedCaptions([]);
      return;
    }

    const processed = [];
    captions.forEach(caption => {
      const words = caption.text.split(' ');
      const wordsPerSegment = 8; // Increased for better stability
      const totalSegments = Math.ceil(words.length / wordsPerSegment);
      const segDuration = (caption.end - caption.start) / totalSegments;
      
      for (let i = 0; i < words.length; i += wordsPerSegment) {
        const segWords = words.slice(i, i + wordsPerSegment);
        const segmentIndex = i / wordsPerSegment;
        processed.push({
          start: caption.start + segmentIndex * segDuration,
          end: caption.start + (segmentIndex + 1) * segDuration,
          text: segWords.join(' '),
          words: segWords,
          originalEnd: caption.end
        });
      }
    });
    setProcessedCaptions(processed);
  }, [captions]);

  useEffect(() => {
    // Find the caption that should be active. 
    // We add a tiny 0.3s grace period to the end to prevent flickering in gaps
    const current = processedCaptions.find(c => 
      currentTime >= (c.start - 0.1) && currentTime <= (c.end + 0.3)
    );

    if (current) {
      setCurrentCaption(current.text);
      setCurrentWords(current.words);
      const progress = (currentTime - current.start) / (current.end - current.start);
      const idx = Math.floor(progress * current.words.length);
      setHighlightedWordIndex(Math.min(Math.max(0, idx), current.words.length - 1));
    } else {
      // Small optimization: only clear if we are significantly away from any caption
      setCurrentCaption('');
      setCurrentWords([]);
    }
  }, [currentTime, processedCaptions]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const togglePlayPause = () => {
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
  };

  const playerRef = useRef(null);

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  if (!videoFile) return null;

  return (
    <div className="premium-player" ref={playerRef}>
      <div className="player-top-bar">
        <div className="font-pill">
          <Type size={14} className="icon" />
          <select 
            value={selectedFont} 
            onChange={(e) => setSelectedFont(e.target.value)}
            className="font-select"
          >
            {fontOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
      </div>
      
      <div className="video-viewport">
        {videoUrl ? (
          <video ref={videoRef} src={videoUrl} className="main-video" onClick={togglePlayPause} />
        ) : (
          <div className="loading-state">Initializing Player...</div>
        )}
        
        {currentCaption && (
          <div className="glass-caption" style={{ fontFamily: selectedFont }}>
            {currentWords.map((word, i) => (
              <span key={i} className={`word ${i <= highlightedWordIndex ? 'active' : ''}`}>
                {word}{' '}
              </span>
            ))}
          </div>
        )}

        <div className="overlay-controls">
          <div className="progress-bar-container" onClick={handleSeek}>
            <div className="progress-track-bg"></div>
            <div 
              className="progress-track-fill" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
            <div 
              className="progress-handle"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          
          <div className="controls-row">
            <div className="left-controls">
              <button className="control-btn" onClick={togglePlayPause}>
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <div className="time-info">
                {formatTime(currentTime)} <span>/ {formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="right-controls">
              <button className="control-btn"><Volume2 size={20} /></button>
              <button className="control-btn" onClick={toggleFullscreen}>
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerWithCaptions;