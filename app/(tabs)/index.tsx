import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Activity, Brain, Moon } from 'lucide-react-native';
import { BiometricCard } from '@/components/BiometricCard';
import { StressIndicator } from '@/components/StressIndicator';
import { TradingStatus } from '@/components/TradingStatus';
import { useBiometricData } from '@/hooks/useBiometricData';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { heartRate, hrv, stressLevel, gsr, movement, sleep } = useBiometricData();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>MoodTrade</Text>
            <Text style={styles.subtitle}>Emotional Trading Intelligence</Text>
          </View>

          <StressIndicator stressLevel={stressLevel} />

          <TradingStatus stressLevel={stressLevel} />

          <View style={styles.metricsGrid}>
            <BiometricCard
              icon={<Heart size={24} color="#EF4444" />}
              title="Heart Rate"
              value={`${heartRate}`}
              unit="BPM"
              trend={2.1}
              color="#EF4444"
            />
            <BiometricCard
              icon={<Activity size={24} color="#8B5CF6" />}
              title="HRV"
              value={`${hrv}`}
              unit="ms"
              trend={-1.3}
              color="#8B5CF6"
            />
            <BiometricCard
              icon={<Brain size={24} color="#F59E0B" />}
              title="GSR"
              value={`${gsr.toFixed(1)}`}
              unit="μS"
              trend={0.8}
              color="#F59E0B"
            />
            <BiometricCard
              icon={<Moon size={24} color="#06B6D4" />}
              title="Sleep Quality"
              value={`${sleep}`}
              unit="/10"
              trend={1.2}
              color="#06B6D4"
            />
          </View>

          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>Today's Insights</Text>
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>
                Your stress levels are elevated. Consider reducing position sizes by 25% and implementing longer stop-losses.
              </Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>
                Heart rate variability is improving. Your trading decisions are likely more balanced today.
              </Text>
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
  metricsGrid: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  insightCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
});