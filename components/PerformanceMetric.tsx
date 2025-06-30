import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface PerformanceMetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export function PerformanceMetric({ icon, title, value, change, positive }: PerformanceMetricProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.changeContainer}>
          {positive ? (
            <TrendingUp size={16} color="#10B981" />
          ) : (
            <TrendingDown size={16} color="#EF4444" />
          )}
          <Text style={[styles.changeText, { color: positive ? '#10B981' : '#EF4444' }]}>
            {change}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
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
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});