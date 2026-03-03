import { parseArguments } from './utils';

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

try {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Provide exactly 2 arguments');
  }

  const [height, weight] = parseArguments(args);

  console.log(calculateBmi(height, weight));

} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}