import { useState } from 'react';

interface JournalEntry {
  id: string;
  timestamp: Date;
  text: string;
  type: 'manual' | 'auto';
  trade?: {
    symbol: string;
    direction: 'long' | 'short';
    size: number;
    pnl: number;
  };
  emotions?: {
    preStress: number;
    postStress: number;
    confidence: number;
  };
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      text: 'Opened BTC long position at $42,850. Market sentiment appears bullish with strong volume. Feeling confident but keeping position size moderate due to elevated morning stress levels.',
      type: 'manual',
      trade: {
        symbol: 'BTC/USD',
        direction: 'long',
        size: 0.5,
        pnl: 1245,
      },
      emotions: {
        preStress: 6.2,
        postStress: 4.8,
        confidence: 7.5,
      },
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      text: 'System automatically reduced position size from 75% to 45% due to elevated stress response. Heart rate spike detected during market volatility.',
      type: 'auto',
      emotions: {
        preStress: 4.1,
        postStress: 7.8,
        confidence: 5.2,
      },
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      text: 'Closed ETH short position with decent profit. Sleep quality was poor last night (5.2/10) which affected decision-making speed. Need to prioritize better sleep schedule.',
      type: 'manual',
      trade: {
        symbol: 'ETH/USD',
        direction: 'short',
        size: 2.1,
        pnl: 830,
      },
      emotions: {
        preStress: 5.5,
        postStress: 3.9,
        confidence: 6.8,
      },
    },
  ]);

  const addEntry = (entryData: Partial<JournalEntry>) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      text: entryData.text || '',
      type: entryData.type || 'manual',
      trade: entryData.trade,
      emotions: entryData.emotions || {
        preStress: Math.random() * 10,
        postStress: Math.random() * 10,
        confidence: Math.random() * 10,
      },
    };

    setEntries(prev => [newEntry, ...prev]);
  };

  return {
    entries,
    addEntry,
  };
}