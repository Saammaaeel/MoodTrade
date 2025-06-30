import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react-native';
import { CorrelationChart } from '@/components/CorrelationChart';
import { PerformanceMetric } from '@/components/PerformanceMetric';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const periods = [
    { label: '1D', value: '1d' },
    { label: '7D', value: '7d' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Performance & Correlations</Text>
          </View>

          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.value}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.value && styles.periodButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.value)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.value && styles.periodTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.metricsGrid}>
            <PerformanceMetric
              icon={<DollarSign size={24} color="#10B981" />}
              title="Total P&L"
              value="$8,450"
              change="+12.5%"
              positive={true}
            />
            <PerformanceMetric
              icon={<TrendingUp size={24} color="#8B5CF6" />}
              title="Win Rate"
              value="68%"
              change="+3.2%"
              positive={true}
            />
            <PerformanceMetric
              icon={<Activity size={24} color="#F59E0B" />}
              title="Avg Stress"
              value="4.2/10"
              change="-0.8"
              positive={true}
            />
            <PerformanceMetric
              icon={<TrendingDown size={24} color="#EF4444" />}
              title="Max Drawdown"
              value="-8.3%"
              change="+2.1%"
              positive={true}
            />
          </View>

          <View style={styles.correlationSection}>
            <Text style={styles.sectionTitle}>Stress vs Performance</Text>
            <CorrelationChart />
          </View>

          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>Key Insights</Text>
            
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightTitle}>Optimal Trading Hours</Text>
                <Text style={styles.insightValue}>9-11 AM</Text>
              </View>
              <Text style={styles.insightDescription}>
                Your best performance occurs when stress levels are below 5.0 during morning hours.
              </Text>
            </View>

            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightTitle}>Position Size Sweet Spot</Text>
                <Text style={styles.insightValue}>35-50%</Text>
              </View>
              <Text style={styles.insightDescription}>
                Medium position sizes correlate with your highest risk-adjusted returns.
              </Text>
            </View>

            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightTitle}>Sleep Impact</Text>
                <Text style={styles.insightValue}>+15% ROI</Text>
              </View>
              <Text style={styles.insightDescription}>
                Trading after 7+ hours of sleep improves performance by an average of 15%.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            
            <View style={styles.recommendationCard}>
              <View style={styles.recommendationIcon}>
                <Activity size={20} color="#10B981" />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Stress Management</Text>
                <Text style={styles.recommendationDescription}>
                  Consider implementing a 5-minute meditation routine before trading sessions.
                </Text>
              </View>
            </View>

            <View style={styles.recommendationCard}>
              <View style={styles.recommendationIcon}>
                <TrendingUp size={20} color="#8B5CF6" />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Position Management</Text>
                <Text style={styles.recommendationDescription}>
                  Reduce position sizes when stress levels exceed 7.0 for better risk management.
                </Text>
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
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#10B981',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  correlationSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  insightValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  insightDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
  recommendationsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
});