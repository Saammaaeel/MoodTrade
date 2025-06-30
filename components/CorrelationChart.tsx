import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;
const chartHeight = 200;

export function CorrelationChart() {
  // Simulated data points for stress vs performance correlation
  const dataPoints = [
    { stress: 1, performance: 12 },
    { stress: 2, performance: 15 },
    { stress: 3, performance: 18 },
    { stress: 4, performance: 16 },
    { stress: 5, performance: 14 },
    { stress: 6, performance: 10 },
    { stress: 7, performance: 6 },
    { stress: 8, performance: 2 },
    { stress: 9, performance: -4 },
    { stress: 10, performance: -8 },
  ];

  const maxStress = 10;
  const maxPerformance = 20;
  const minPerformance = -10;

  const getPointPosition = (stress: number, performance: number) => {
    const x = (stress / maxStress) * (chartWidth - 40) + 20;
    const y = chartHeight - 20 - ((performance - minPerformance) / (maxPerformance - minPerformance)) * (chartHeight - 40);
    return { x, y };
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Grid lines */}
        <View style={styles.gridContainer}>
          {[0, 2, 4, 6, 8, 10].map((value) => (
            <View
              key={`vertical-${value}`}
              style={[
                styles.gridLine,
                {
                  left: (value / maxStress) * (chartWidth - 40) + 20,
                  height: chartHeight - 40,
                  top: 20,
                  width: 1,
                }
              ]}
            />
          ))}
          {[-10, -5, 0, 5, 10, 15, 20].map((value) => (
            <View
              key={`horizontal-${value}`}
              style={[
                styles.gridLine,
                {
                  top: chartHeight - 20 - ((value - minPerformance) / (maxPerformance - minPerformance)) * (chartHeight - 40),
                  left: 20,
                  width: chartWidth - 40,
                  height: 1,
                }
              ]}
            />
          ))}
        </View>

        {/* Data points */}
        {dataPoints.map((point, index) => {
          const position = getPointPosition(point.stress, point.performance);
          return (
            <View
              key={index}
              style={[
                styles.dataPoint,
                {
                  left: position.x - 4,
                  top: position.y - 4,
                  backgroundColor: point.performance >= 0 ? '#10B981' : '#EF4444',
                }
              ]}
            />
          );
        })}

        {/* Trend line */}
        <View style={styles.trendLine} />

        {/* Axes labels */}
        <Text style={[styles.axisLabel, styles.xAxisLabel]}>Stress Level</Text>
        <Text style={[styles.axisLabel, styles.yAxisLabel]}>Performance (%)</Text>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Positive Returns</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Negative Returns</Text>
        </View>
      </View>

      <View style={styles.insight}>
        <Text style={styles.insightText}>
          Correlation: -0.87 • Strong negative correlation between stress and performance
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chartContainer: {
    width: chartWidth,
    height: chartHeight,
    position: 'relative',
    marginBottom: 16,
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#374151',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  trendLine: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: chartWidth - 40,
    height: 2,
    backgroundColor: '#8B5CF6',
    transform: [{ rotate: '-15deg' }],
    opacity: 0.7,
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  xAxisLabel: {
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  yAxisLabel: {
    left: 5,
    top: '50%',
    transform: [{ translateY: -10 }, { rotate: '-90deg' }],
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
  insight: {
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    borderRadius: 8,
    padding: 12,
  },
  insightText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});