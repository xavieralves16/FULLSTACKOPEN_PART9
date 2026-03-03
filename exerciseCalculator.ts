import { parseArguments } from './utils';

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, target met!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'needs improvement, target not met';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// CLI handling
try {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    throw new Error('Not enough arguments');
  }

  const numbers = parseArguments(args);
  const target = numbers[0];
  const dailyHours = numbers.slice(1);

  console.log(calculateExercises(dailyHours, target));

} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}