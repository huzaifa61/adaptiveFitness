/**
 * Response Parser Service
 * Extracts structured content from AI responses
 */

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

interface ParsedResponse {
  type: 'text' | 'workout_plan' | 'tips_list' | 'mixed';
  text: string;
  workoutPlans?: DayPlan[];
  tipsList?: {
    title?: string;
    tips: string[];
  };
}

/**
 * Parse workout plans from AI response
 * Looks for day-wise workout patterns
 */
export function parseWorkoutPlan(text: string): DayPlan[] | null {
  const plans: DayPlan[] = [];
  
  // Pattern 1: "Day 1:", "Day 2:", etc.
  const dayPattern = /(?:^|\n)(?:##\s*)?(?:Day\s+\d+|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\s*-\s*([^\n]+))?[:\n]/gi;
  const matches = text.match(dayPattern);
  
  if (!matches || matches.length < 2) {
    return null; // Not a workout plan
  }
  
  // Split text by day headers
  const sections = text.split(dayPattern).filter(s => s.trim());
  
  for (let i = 0; i < matches.length; i++) {
    const dayHeader = matches[i].trim();
    const dayContent = sections[i + 1] || '';
    
    // Extract day name and focus
    const dayMatch = dayHeader.match(/(?:Day\s+\d+|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\s*-\s*([^\n:]+))?/i);
    const day = dayMatch ? dayMatch[0].replace(/[:\n]/g, '').trim() : `Day ${i + 1}`;
    const focus = dayMatch && dayMatch[1] ? dayMatch[1].trim() : undefined;
    
    // Extract exercises
    const exercises = parseExercises(dayContent);
    
    // Extract notes (usually at the end)
    const notesMatch = dayContent.match(/(?:note|tip|remember)[:\s]*([^\n]+)/i);
    const notes = notesMatch ? notesMatch[1].trim() : undefined;
    
    if (exercises.length > 0) {
      plans.push({
        day,
        focus,
        exercises,
        notes,
      });
    }
  }
  
  return plans.length > 0 ? plans : null;
}

/**
 * Parse exercises from text
 */
function parseExercises(text: string): Exercise[] {
  const exercises: Exercise[] = [];
  
  // Pattern: numbered list or bullet points with exercise details
  const lines = text.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 3) continue;
    
    // Match: "1. Push-ups - 3 sets x 15 reps"
    // Or: "- Squats: 4 sets of 12 reps"
    // Or: "• Plank (30 seconds)"
    const exerciseMatch = trimmed.match(/^(?:\d+\.|\-|\•|\*)\s*(.+)/);
    
    if (exerciseMatch) {
      const content = exerciseMatch[1].trim();
      const exercise = parseExerciseDetails(content);
      if (exercise) {
        exercises.push(exercise);
      }
    }
  }
  
  return exercises;
}

/**
 * Parse individual exercise details
 */
function parseExerciseDetails(text: string): Exercise | null {
  // Extract name (before - or : or () )
  const nameMatch = text.match(/^([^-:(]+)/);
  if (!nameMatch) return null;
  
  const name = nameMatch[1].trim();
  if (name.length < 2) return null;
  
  const exercise: Exercise = { name };
  
  // Extract sets
  const setsMatch = text.match(/(\d+)\s*(?:sets?|x)/i);
  if (setsMatch) {
    exercise.sets = setsMatch[1];
  }
  
  // Extract reps
  const repsMatch = text.match(/(?:x\s*)?(\d+)\s*reps?/i);
  if (repsMatch) {
    exercise.reps = repsMatch[1];
  }
  
  // Extract duration
  const durationMatch = text.match(/(\d+\s*(?:seconds?|mins?|minutes?))/i);
  if (durationMatch) {
    exercise.duration = durationMatch[1];
  }
  
  // Extract notes (text in parentheses or after "Note:")
  const notesMatch = text.match(/\(([^)]+)\)|note:\s*(.+)/i);
  if (notesMatch) {
    exercise.notes = (notesMatch[1] || notesMatch[2]).trim();
  }
  
  return exercise;
}

/**
 * Parse tips list from AI response
 */
export function parseTipsList(text: string): { title?: string; tips: string[] } | null {
  // Look for patterns like "Top 5 tips:", "Here are tips:", etc.
  const titleMatch = text.match(/(?:^|\n)((?:top\s+\d+\s+)?tips?[^\n:]*)[:\n]/i);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  
  // Extract bullet points or numbered items
  const tips: string[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Match: "1. Tip text" or "- Tip text" or "• Tip text"
    const tipMatch = trimmed.match(/^(?:\d+\.|\-|\•|\*)\s*(.+)/);
    
    if (tipMatch) {
      const tip = tipMatch[1].trim();
      if (tip.length > 5) {
        tips.push(tip);
      }
    }
  }
  
  // Only return if we found multiple tips (2+)
  return tips.length >= 2 ? { title, tips } : null;
}

/**
 * Main parsing function
 * Determines response type and extracts structured content
 */
export function parseAIResponse(text: string): ParsedResponse {
  // Try to parse workout plan
  const workoutPlans = parseWorkoutPlan(text);
  
  if (workoutPlans && workoutPlans.length > 0) {
    return {
      type: 'workout_plan',
      text,
      workoutPlans,
    };
  }
  
  // Try to parse tips list
  const tipsList = parseTipsList(text);
  
  if (tipsList && tipsList.tips.length > 0) {
    return {
      type: 'tips_list',
      text,
      tipsList,
    };
  }
  
  // Default to plain text
  return {
    type: 'text',
    text,
  };
}

/**
 * Check if text contains structured content
 */
export function hasStructuredContent(text: string): boolean {
  const parsed = parseAIResponse(text);
  return parsed.type !== 'text';
}
