import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Mic, MicOff } from 'lucide-react-native';
import { TradeEntry } from '@/components/TradeEntry';
import { useJournal } from '@/hooks/useJournal';

export default function JournalScreen() {
  const { entries, addEntry } = useJournal();
  const [isRecording, setIsRecording] = useState(false);
  const [newEntryText, setNewEntryText] = useState('');
  const [showAddEntry, setShowAddEntry] = useState(false);

  const handleAddEntry = () => {
    if (newEntryText.trim()) {
      addEntry({
        text: newEntryText,
        type: 'manual',
      });
      setNewEntryText('');
      setShowAddEntry(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop voice recording
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Trade Journal</Text>
          <Text style={styles.subtitle}>Emotional Trading Insights</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddEntry(!showAddEntry)}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={toggleRecording}
          >
            {isRecording ? (
              <MicOff size={20} color="#FFFFFF" />
            ) : (
              <Mic size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>

        {showAddEntry && (
          <View style={styles.addEntryForm}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your trading thoughts, emotions, or market observations..."
              placeholderTextColor="#9CA3AF"
              value={newEntryText}
              onChangeText={setNewEntryText}
              multiline
              numberOfLines={4}
            />
            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddEntry(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddEntry}
              >
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.entriesContainer}>
            {entries.map((entry) => (
              <TradeEntry key={entry.id} entry={entry} />
            ))}
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
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  recordButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  recordButtonActive: {
    backgroundColor: '#DC2626',
  },
  addEntryForm: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textInput: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  entriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});