'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

interface LessonAudioPlayerProps {
  content: string;
  lessonTitle: string;
}

export default function LessonAudioPlayer({ content, lessonTitle }: LessonAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported('speechSynthesis' in window);
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (text: string): string => {
    // Remove markdown formatting
    return text
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/^[-*+]\s/gm, '') // Remove list markers
      .replace(/^\d+\.\s/gm, '') // Remove numbered list markers
      .trim();
  };

  const startSpeaking = () => {
    if (!isSupported || !content) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(content);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure voice settings
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;
    
    // Try to use a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onboundary = (event) => {
      // Update progress based on character position
      const progressPercent = (event.charIndex / cleanText.length) * 100;
      setProgress(progressPercent);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const resumeSpeaking = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const skipForward = () => {
    stopSpeaking();
    // Could implement chapter-based skipping if we parse the content
  };

  const skipBackward = () => {
    stopSpeaking();
    startSpeaking();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    // If currently playing, restart with new rate
    if (isPlaying || isPaused) {
      stopSpeaking();
      setTimeout(startSpeaking, 100);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p>🔊 Audio playback is not supported in your browser. Try Chrome, Safari, or Edge.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Listen to Lesson</h3>
            <p className="text-sm text-gray-600">Audio narration of this lesson</p>
          </div>
        </div>
        
        {/* Playback speed */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Speed:</span>
          <select
            value={rate}
            onChange={(e) => handleRateChange({ target: { value: e.target.value } } as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {/* Progress bar */}
      {(isPlaying || isPaused) && (
        <div className="mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Skip back */}
          <button
            onClick={skipBackward}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-lg hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Restart"
          >
            <SkipBack className="w-5 h-5 text-gray-700" />
          </button>

          {/* Play/Pause */}
          {!isPlaying && !isPaused ? (
            <button
              onClick={startSpeaking}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors shadow-lg"
              title="Play"
            >
              <Play className="w-6 h-6 text-white fill-white" />
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeSpeaking}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors shadow-lg"
              title="Resume"
            >
              <Play className="w-6 h-6 text-white fill-white" />
            </button>
          ) : (
            <button
              onClick={pauseSpeaking}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors shadow-lg"
              title="Pause"
            >
              <Pause className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Stop */}
          {(isPlaying || isPaused) && (
            <button
              onClick={stopSpeaking}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Stop
            </button>
          )}
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-700" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>

      {(isPlaying || isPaused) && (
        <p className="text-xs text-gray-600 mt-3 text-center">
          {isPlaying ? '🔊 Playing...' : '⏸️ Paused'} • {lessonTitle}
        </p>
      )}
    </div>
  );
}
