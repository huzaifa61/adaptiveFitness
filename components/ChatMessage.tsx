import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { WorkoutPlanCard } from './WorkoutPlanCard';
import { TipsList } from './TipsList';
import { Message } from '@/types';
import { parseAIResponse } from '@/services/responseParser';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // For assistant messages, try to parse structured content
  if (!isUser) {
    const parsed = parseAIResponse(message.content);
    
    if (parsed.type === 'workout_plan' && parsed.workoutPlans) {
      return (
        <View style={[styles.container, styles.assistantContainer]}>
          <View style={styles.structuredContainer}>
            {/* Show intro text if exists */}
            {parsed.text.split(/(?:Day\s+\d+|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i)[0].trim() && (
              <ThemedView style={[styles.bubble, styles.assistantBubble]}>
                <ThemedText style={styles.text}>
                  {parsed.text.split(/(?:Day\s+\d+|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i)[0].trim()}
                </ThemedText>
              </ThemedView>
            )}
            
            {/* Render workout plan cards */}
            {parsed.workoutPlans.map((plan, index) => (
              <WorkoutPlanCard key={index} dayPlan={plan} />
            ))}
          </View>
        </View>
      );
    }
    
    if (parsed.type === 'tips_list' && parsed.tipsList) {
      return (
        <View style={[styles.container, styles.assistantContainer]}>
          <View style={styles.structuredContainer}>
            {/* Show intro text if exists */}
            {parsed.text.split(/(?:top\s+\d+\s+)?tips?[^\n:]*[:\n]/i)[0].trim() && (
              <ThemedView style={[styles.bubble, styles.assistantBubble]}>
                <ThemedText style={styles.text}>
                  {parsed.text.split(/(?:top\s+\d+\s+)?tips?[^\n:]*[:\n]/i)[0].trim()}
                </ThemedText>
              </ThemedView>
            )}
            
            {/* Render tips list */}
            <TipsList 
              title={parsed.tipsList.title}
              tips={parsed.tipsList.tips}
            />
          </View>
        </View>
      );
    }
  }

  // Default rendering for regular messages
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      <ThemedView style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <ThemedText style={[styles.text, isUser && styles.userText]}>
          {message.content}
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#4ECDC4',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  structuredContainer: {
    width: '95%',
    gap: 8,
  },
});
