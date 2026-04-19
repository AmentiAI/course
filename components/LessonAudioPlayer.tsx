'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';

interface LessonAudioPlayerProps {
  content: string;
  lessonTitle: string;
}

export default function LessonAudioPlayer({ content, lessonTitle }: LessonAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const generateAudio = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error(`Audio generation failed: ${response.status}`);
      }

      const blob = await response.blob();
      if (blob.size === 0) throw new Error('Empty audio file received');

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audio.volume = isMuted ? 0 : volume;
      audio.playbackRate = playbackRate;

      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audio.addEventListener('error', () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      });

      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio generation error:', err);
      setError('Failed to generate audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioUrl) {
      await generateAudio();
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted) setIsMuted(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-[#fafaf9] p-5 mb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-[#98753f]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-0.5">
              Audio Lecture
            </p>
            <p className="text-xs text-slate-500">
              Narrated reading{content.length > 4000 && ' · introductory preview'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 hidden sm:inline">
            Speed
          </span>
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="text-xs font-medium border border-slate-200 rounded-md px-2 py-1.5 bg-white text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/20"
            disabled={isLoading}
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <p className="text-sm text-rose-800">{error}</p>
        </div>
      )}

      {audioUrl && duration > 0 && (
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0a2540] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0a2540 0%, #0a2540 ${progressPercent}%, #e2e8f0 ${progressPercent}%, #e2e8f0 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="p-3 bg-[#0a2540] hover:bg-[#123258] disabled:opacity-60 rounded-md transition-colors disabled:cursor-not-allowed"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </button>

          {audioUrl && (
            <button
              onClick={handleStop}
              disabled={isLoading}
              className="px-3 py-2 bg-white hover:bg-[#f5ecd7] border border-[#b08d57] text-[#0a2540] rounded-md text-xs font-semibold tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Stop
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-md hover:bg-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-slate-600" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0a2540] [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {isPlaying && (
        <p className="text-xs text-slate-500 mt-3 text-center italic">
          Now playing &middot; {lessonTitle}
        </p>
      )}

      {isLoading && (
        <p className="text-xs text-[#98753f] mt-3 text-center font-semibold tracking-wide uppercase">
          Generating audio lecture…
        </p>
      )}
    </div>
  );
}
