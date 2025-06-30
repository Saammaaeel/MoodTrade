import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Shield, Smartphone, Database, HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoAdaptation, setAutoAdaptation] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const SettingItem = ({ icon, title, description, value, onValueChange, type = 'switch' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#374151', true: '#10B981' }}
          thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
        />
      )}
      {type === 'arrow' && (
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Customize Your Experience</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <SettingItem
              icon={<Bell size={24} color="#10B981" />}
              title="Push Notifications"
              description="Receive alerts for stress levels and trading signals"
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trading</Text>
            <SettingItem
              icon={<Shield size={24} color="#8B5CF6" />}
              title="Auto-Adaptation"
              description="Automatically adjust trading parameters based on stress"
              value={autoAdaptation}
              onValueChange={setAutoAdaptation}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Biometric Data</Text>
            <SettingItem
              icon={<Smartphone size={24} color="#F59E0B" />}
              title="Device Sensors"
              description="Connect to smartwatch and phone sensors"
              type="arrow"
            />
            <SettingItem
              icon={<Database size={24} color="#06B6D4" />}
              title="Data Sharing"
              description="Share anonymized data for research purposes"
              value={dataSharing}
              onValueChange={setDataSharing}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <SettingItem
              icon={<Shield size={24} color="#EF4444" />}
              title="Biometric Authentication"
              description="Use fingerprint or face unlock for app access"
              value={biometricAuth}
              onValueChange={setBiometricAuth}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <SettingItem
              icon={<HelpCircle size={24} color="#9CA3AF" />}
              title="Help & FAQ"
              description="Get help with app features and troubleshooting"
              type="arrow"
            />
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>TU</Text>
                </View>
                <View>
                  <Text style={styles.profileName}>Trading User</Text>
                  <Text style={styles.profileEmail}>trader@example.com</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.logoutButton}>
                <LogOut size={20} color="#EF4444" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.version}>MoodTrade v1.0.0</Text>
            <Text style={styles.copyright}>© 2025 MoodTrade. All rights reserved.</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    marginHorizontal: 20,
    marginBottom: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    lineHeight: 18,
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  version: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
  },
});