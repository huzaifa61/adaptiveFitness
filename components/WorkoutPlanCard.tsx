import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface Exercise {
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  notes?: string;
}

interface DayPlan {
  day: string;
  focus?: string;
  exercises: Exercise[];
  notes?: string;
}

interface WorkoutPlanCardProps {
  dayPlan: DayPlan;
}

export function WorkoutPlanCard({ dayPlan }: WorkoutPlanCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText style={styles.dayTitle}>{dayPlan.day}</ThemedText>
        {dayPlan.focus && (
          <ThemedText style={styles.focus}>{dayPlan.focus}</ThemedText>
        )}
      </View>

      <View style={styles.exercisesContainer}>
        {dayPlan.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseRow}>
            <View style={styles.exerciseNumber}>
              <ThemedText style={styles.exerciseNumberText}>{index + 1}</ThemedText>
            </View>
            <View style={styles.exerciseDetails}>
              <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
              {(exercise.sets || exercise.reps || exercise.duration) && (
                <View style={styles.exerciseStats}>
                  {exercise.sets && (
                    <View style={styles.statBadge}>
                      <ThemedText style={styles.statText}>
                        {exercise.sets} sets
                      </ThemedText>
                    </View>
                  )}
                  {exercise.reps && (
                    <View style={styles.statBadge}>
                      <ThemedText style={styles.statText}>
                        {exercise.reps} reps
                      </ThemedText>
                    </View>
                  )}
                  {exercise.duration && (
                    <View style={styles.statBadge}>
                      <ThemedText style={styles.statText}>
                        {exercise.duration}
                      </ThemedText>
                    </View>
                  )}
                </View>
              )}
              {exercise.notes && (
                <ThemedText style={styles.exerciseNotes}>{exercise.notes}</ThemedText>
              )}
            </View>
          </View>
        ))}
      </View>

      {dayPlan.notes && (
        <View style={styles.dayNotesContainer}>
          <ThemedText style={styles.dayNotes}>💡 {dayPlan.notes}</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  header: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#4ECDC4',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  focus: {
    fontSize: 14,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  exercisesContainer: {
    gap: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  statBadge: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  exerciseNotes: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 2,
  },
  dayNotesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(78, 205, 196, 0.2)',
  },
  dayNotes: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 18,
  },
});
