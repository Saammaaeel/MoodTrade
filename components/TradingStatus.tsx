import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activity, Shield, Target, AlertTriangle } from 'lucide-react-native';

interface TradingStatusProps {
  stressLevel: number;
}

export function TradingStatus({ stressLevel }: TradingStatusProps) {
  const getStatusColor = (level: number) => {
    if (level <= 3) return '#10B981';
    if (level <= 6) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusText = (level: number) => {
    if (level <= 3) return 'Optimal Trading';
    if (level <= 6) return 'Cautious Trading';
    return 'Trading Paused';
  };

  const getStatusIcon = (level: number) => {
    if (level <= 3) return <Activity size={20} color="#10B981" />;
    if (level <= 6) return <Shield size={20} color="#F59E0B" />;
    return <AlertTriangle size={20} color="#EF4444" />;
  };

  const color = getStatusColor(stressLevel);
  const positionSize = Math.max(20, 100 - (stressLevel * 20));
  const riskLevel = Math.min(stressLevel * 0.5, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
          {getStatusIcon(stressLevel)}
          <Text style={[styles.statusText, { color }]}>
            {getStatusText(stressLevel)}
          </Text>
        </View>
      </View>

      <View style={styles.parametersRow}>
        <View style={styles.parameter}>
          <Target size={16} color="#8B5CF6" />
          <Text style={styles.parameterLabel}>Position Size</Text>
          <Text style={styles.parameterValue}>{positionSize.toFixed(0)}%</Text>
        </View>
        <View style={styles.parameter}>
          <Shield size={16} color="#EF4444" />
          <Text style={styles.parameterLabel}>Risk Level</Text>
          <Text style={styles.parameterValue}>{riskLevel.toFixed(1)}%</Text>
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
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  header: {
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  parametersRow: {
    flexDirection: 'row',
    gap: 16,
  },
  parameter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  parameterLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    flex: 1,
  },
  parameterValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});