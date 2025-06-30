import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, TrendingUp, TrendingDown, Heart, Brain } from 'lucide-react-native';

interface TradeEntryData {
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

interface TradeEntryProps {
  entry: TradeEntryData;
}

export function TradeEntry({ entry }: TradeEntryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <Clock size={16} color="#9CA3AF" />
          <Text style={styles.timeText}>
            {formatTime(entry.timestamp)} • {formatDate(entry.timestamp)}
          </Text>
        </View>
        <View style={[styles.typeBadge, entry.type === 'auto' && styles.autoBadge]}>
          <Text style={[styles.typeText, entry.type === 'auto' && styles.autoText]}>
            {entry.type === 'auto' ? 'AUTO' : 'MANUAL'}
          </Text>
        </View>
      </View>

      <Text style={styles.entryText}>{entry.text}</Text>

      {entry.trade && (
        <View style={styles.tradeDetails}>
          <View style={styles.tradeHeader}>
            <Text style={styles.tradeSymbol}>{entry.trade.symbol}</Text>
            <View style={[
              styles.directionBadge,
              entry.trade.direction === 'long' ? styles.longBadge : styles.shortBadge
            ]}>
              {entry.trade.direction === 'long' ? (
                <TrendingUp size={14} color="#10B981" />
              ) : (
                <TrendingDown size={14} color="#EF4444" />
              )}
              <Text style={[
                styles.directionText,
                { color: entry.trade.direction === 'long' ? '#10B981' : '#EF4444' }
              ]}>
                {entry.trade.direction.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.tradeStats}>
            <View style={styles.tradeStat}>
              <Text style={styles.tradeLabel}>Size</Text>
              <Text style={styles.tradeValue}>{entry.trade.size}</Text>
            </View>
            <View style={styles.tradeStat}>
              <Text style={styles.tradeLabel}>P&L</Text>
              <Text style={[
                styles.tradeValue,
                { color: entry.trade.pnl >= 0 ? '#10B981' : '#EF4444' }
              ]}>
                {entry.trade.pnl >= 0 ? '+' : ''}${entry.trade.pnl}
              </Text>
            </View>
          </View>
        </View>
      )}

      {entry.emotions && (
        <View style={styles.emotionsContainer}>
          <View style={styles.emotionStat}>
            <Heart size={16} color="#EF4444" />
            <Text style={styles.emotionLabel}>Pre-Stress</Text>
            <Text style={styles.emotionValue}>{entry.emotions.preStress}/10</Text>
          </View>
          <View style={styles.emotionStat}>
            <Heart size={16} color="#EF4444" />
            <Text style={styles.emotionLabel}>Post-Stress</Text>
            <Text style={styles.emotionValue}>{entry.emotions.postStress}/10</Text>
          </View>
          <View style={styles.emotionStat}>
            <Brain size={16} color="#8B5CF6" />
            <Text style={styles.emotionLabel}>Confidence</Text>
            <Text style={styles.emotionValue}>{entry.emotions.confidence}/10</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  typeBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  autoBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  typeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  autoText: {
    color: '#10B981',
  },
  entryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
    marginBottom: 12,
  },
  tradeDetails: {
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tradeSymbol: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  directionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  longBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  shortBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  directionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  tradeStats: {
    flexDirection: 'row',
    gap: 20,
  },
  tradeStat: {
    flex: 1,
  },
  tradeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  tradeValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  emotionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  emotionStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emotionLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    flex: 1,
  },
  emotionValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});