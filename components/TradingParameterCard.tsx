import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TradingParameterCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  stress: number;
  disabled?: boolean;
}

export function TradingParameterCard({ 
  icon, 
  title, 
  value, 
  description, 
  color, 
  stress, 
  disabled = false 
}: TradingParameterCardProps) {
  const getStressIndicator = (stressLevel: number) => {
    if (stressLevel <= 3) return { color: '#10B981', text: 'Optimal' };
    if (stressLevel <= 6) return { color: '#F59E0B', text: 'Cautious' };
    return { color: '#EF4444', text: 'High Risk' };
  };

  const stressIndicator = getStressIndicator(stress);

  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          {icon}
        </View>
        <View style={[styles.stressIndicator, { backgroundColor: `${stressIndicator.color}20` }]}>
          <Text style={[styles.stressText, { color: stressIndicator.color }]}>
            {stressIndicator.text}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.title, disabled && styles.disabledText]}>{title}</Text>
      <Text style={[styles.value, { color: disabled ? '#6B7280' : color }]}>{value}</Text>
      <Text style={[styles.description, disabled && styles.disabledText]}>{description}</Text>
      
      {disabled && (
        <View style={styles.disabledOverlay}>
          <Text style={styles.disabledLabel}>PAUSED</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
    position: 'relative',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stressIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stressText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  disabledText: {
    color: '#6B7280',
  },
  disabledOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  disabledLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});