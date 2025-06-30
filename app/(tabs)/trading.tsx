import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, DollarSign, Shield, Target, Pause } from 'lucide-react-native';
import { TradingParameterCard } from '@/components/TradingParameterCard';
import { useBiometricData } from '@/hooks/useBiometricData';

export default function TradingScreen() {
  const { stressLevel } = useBiometricData();
  const [isAutoModeEnabled, setIsAutoModeEnabled] = useState(true);

  // Calculate adaptive parameters based on stress level
  const maxPositionSize = Math.max(20, 100 - (stressLevel * 20));
  const maxLeverage = Math.max(1, 5 - Math.floor(stressLevel * 1.5));
  const stopLossRange = Math.min(2 + (stressLevel * 0.5), 5);
  const takeProfitRange = Math.max(1.5, 3 - (stressLevel * 0.3));

  const tradingPaused = stressLevel > 8;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Trading Parameters</Text>
            <Text style={styles.subtitle}>Adaptive Risk Management</Text>
          </View>

          <View style={styles.autoModeCard}>
            <View style={styles.autoModeHeader}>
              <Text style={styles.autoModeTitle}>Auto-Adaptation</Text>
              <TouchableOpacity
                style={[styles.toggleButton, isAutoModeEnabled && styles.toggleButtonActive]}
                onPress={() => setIsAutoModeEnabled(!isAutoModeEnabled)}
              >
                <Text style={[styles.toggleText, isAutoModeEnabled && styles.toggleTextActive]}>
                  {isAutoModeEnabled ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.autoModeDescription}>
              Parameters automatically adjust based on your emotional state and stress levels
            </Text>
          </View>

          {tradingPaused && (
            <View style={styles.pauseAlert}>
              <Pause size={24} color="#EF4444" />
              <View style={styles.pauseTextContainer}>
                <Text style={styles.pauseTitle}>Trading Paused</Text>
                <Text style={styles.pauseDescription}>
                  High stress detected. Trading is temporarily paused for your protection.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.parametersGrid}>
            <TradingParameterCard
              icon={<DollarSign size={24} color="#10B981" />}
              title="Max Position Size"
              value={`${maxPositionSize.toFixed(0)}%`}
              description="of available capital"
              color="#10B981"
              stress={stressLevel}
              disabled={tradingPaused}
            />
            <TradingParameterCard
              icon={<TrendingUp size={24} color="#8B5CF6" />}
              title="Max Leverage"
              value={`${maxLeverage}x`}
              description="maximum multiplier"
              color="#8B5CF6"
              stress={stressLevel}
              disabled={tradingPaused}
            />
            <TradingParameterCard
              icon={<Shield size={24} color="#EF4444" />}
              title="Stop Loss Range"
              value={`${stopLossRange.toFixed(1)}%`}
              description="risk per trade"
              color="#EF4444"
              stress={stressLevel}
              disabled={tradingPaused}
            />
            <TradingParameterCard
              icon={<Target size={24} color="#F59E0B" />}
              title="Take Profit"
              value={`${takeProfitRange.toFixed(1)}x`}
              description="risk-reward ratio"
              color="#F59E0B"
              stress={stressLevel}
              disabled={tradingPaused}
            />
          </View>

          <View style={styles.currentPositions}>
            <Text style={styles.sectionTitle}>Current Positions</Text>
            <View style={styles.positionCard}>
              <View style={styles.positionHeader}>
                <Text style={styles.positionSymbol}>BTC/USD</Text>
                <View style={[styles.positionType, styles.longPosition]}>
                  <TrendingUp size={16} color="#10B981" />
                  <Text style={styles.positionTypeText}>LONG</Text>
                </View>
              </View>
              <View style={styles.positionDetails}>
                <View style={styles.positionStat}>
                  <Text style={styles.positionLabel}>Size</Text>
                  <Text style={styles.positionValue}>0.5 BTC</Text>
                </View>
                <View style={styles.positionStat}>
                  <Text style={styles.positionLabel}>P&L</Text>
                  <Text style={[styles.positionValue, styles.profitText]}>+$1,245</Text>
                </View>
              </View>
            </View>
            <View style={styles.positionCard}>
              <View style={styles.positionHeader}>
                <Text style={styles.positionSymbol}>ETH/USD</Text>
                <View style={[styles.positionType, styles.shortPosition]}>
                  <TrendingDown size={16} color="#EF4444" />
                  <Text style={styles.positionTypeText}>SHORT</Text>
                </View>
              </View>
              <View style={styles.positionDetails}>
                <View style={styles.positionStat}>
                  <Text style={styles.positionLabel}>Size</Text>
                  <Text style={styles.positionValue}>2.1 ETH</Text>
                </View>
                <View style={styles.positionStat}>
                  <Text style={styles.positionLabel}>P&L</Text>
                  <Text style={[styles.positionValue, styles.lossText]}>-$320</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  autoModeCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 20,
  },
  autoModeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  autoModeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  toggleButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#10B981',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  autoModeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
  pauseAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  pauseTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  pauseTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginBottom: 4,
  },
  pauseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FECACA',
  },
  parametersGrid: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  currentPositions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  positionCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  positionSymbol: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  positionType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  longPosition: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  shortPosition: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  positionTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  positionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionStat: {
    flex: 1,
  },
  positionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  positionValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  profitText: {
    color: '#10B981',
  },
  lossText: {
    color: '#EF4444',
  },
});