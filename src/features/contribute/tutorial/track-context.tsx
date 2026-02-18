"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type Track = "new" | "improve";

interface TrackContextValue {
  track: Track;
  setTrack: (t: Track) => void;
}

const TrackCtx = createContext<TrackContextValue>({
  track: "new",
  setTrack: () => {},
});

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<Track>("new");
  const setTrack = useCallback((t: Track) => setTrackState(t), []);

  return (
    <TrackCtx.Provider value={{ track, setTrack }}>
      {children}
    </TrackCtx.Provider>
  );
}

export function useTrack() {
  return useContext(TrackCtx);
}
