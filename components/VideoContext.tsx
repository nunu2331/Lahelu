import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface VideoContextType {
  currentPlayingVideoId: string | null;
  setCurrentPlayingVideoId: (id: string | null) => void;
}

// Create context with default value
export const VideoContext = createContext<VideoContextType>({
  currentPlayingVideoId: null,
  setCurrentPlayingVideoId: () => {}
});

// Define the props for the provider component
interface VideoProviderProps {
  children: ReactNode;
}

// Create a provider component
export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ currentPlayingVideoId, setCurrentPlayingVideoId }}>
      {children}
    </VideoContext.Provider>
  );
};
