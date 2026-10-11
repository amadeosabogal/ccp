import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface FontSizeContextType {
  fontSize: number; // in pixels (default 16)
  fontScale: number; // scale ratio (default 1)
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
}

const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 26;
const STEP = 2;
const STORAGE_KEY = 'ccb_app_font_size';

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= MIN_FONT_SIZE && parsed <= MAX_FONT_SIZE) {
          return parsed;
        }
      }
    } catch {
      // localStorage might fail in private browsing
    }
    return DEFAULT_FONT_SIZE;
  });

  const fontScale = fontSize / DEFAULT_FONT_SIZE;

  // Apply font scale CSS variables dynamically to route content, without resizing root document
  useEffect(() => {
    // Ensure document root font size is never overridden so header, navbar, and footer stay default size
    document.documentElement.style.removeProperty('font-size');

    // Set proportional scale variable (1.0 = default 16px)
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
    document.documentElement.style.setProperty('--route-font-size', `${fontSize}px`);

    try {
      localStorage.setItem(STORAGE_KEY, fontSize.toString());
    } catch {
      // ignore
    }
  }, [fontSize, fontScale]);

  const increaseFont = () => {
    setFontSize(prev => Math.min(prev + STEP, MAX_FONT_SIZE));
  };

  const decreaseFont = () => {
    setFontSize(prev => Math.max(prev - STEP, MIN_FONT_SIZE));
  };

  const resetFont = () => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, fontScale, increaseFont, decreaseFont, resetFont }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
