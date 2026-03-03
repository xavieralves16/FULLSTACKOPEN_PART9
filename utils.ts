export const parseArguments = (args: string[]): number[] => {
  if (args.length < 1) throw new Error('Not enough arguments');

  const numbers = args.map(a => {
    const value = Number(a);
    if (isNaN(value)) {
      throw new Error('Provided values were not numbers!');
    }
    return value;
  });

  return numbers;
};