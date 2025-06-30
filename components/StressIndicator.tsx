import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react-native';

interface StressIndicatorProps {
  stressLevel: number;
}

export function StressIndicator({ stressLevel }: StressIndicatorProps) {
  const getStressColor = (level: number) => {
    if (level <= 3) return '#10B981';
    if (level <= 6) return '#F59E0B';
    return '#EF4444';
  };

  const getStressIcon = (level: number) => {
    if (level <= 3) return <CheckCircle size={24} color="#10B981" />;
    if (level <= 6) return <AlertCircle size={24} color="#F59E0B" />;
    return <AlertTriangle size={24} color="#EF4444" />;
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return 'Low Stress';
    if (level <= 6) return 'Moderate Stress';
    return 'High Stress';
  };

  const color = getStressColor(stressLevel);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {getStressIcon(stressLevel)}
        <Text style={styles.title}>Current Stress Level</Text>
      </View>
      
      <View style={styles.levelContainer}>
        <Text style={[styles.levelText, { color }]}>
          {stressLevel.toFixed(1)}/10
        </Text>
        <Text style={[styles.labelText, { color }]}>
          {getStressLabel(stressLevel)}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(stressLevel / 10) * 100}%`,
                backgroundColor: color 
              }
            ]} 
          />
        </View>
        <View style={styles.markers}>
          <View style={[styles.marker, { left: '30%' }]} />
          <View style={[styles.marker, { left: '60%' }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  progressContainer: {
    position: 'relative',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  markers: {
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
    height: 12,
  },
  marker: {
    position: 'absolute',
    width: 2,
    height: 12,
    backgroundColor: '#6B7280',
    borderRadius: 1,
  },
});