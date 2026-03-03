import express from 'express';
import { calculateBmi } from '../bmiCalculator';
import { calculateExercises } from '../exerciseCalculator';

const app = express();
const PORT = 3003;
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const body = req.body as unknown;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!('daily_exercises' in body) || !('target' in body)) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const { daily_exercises, target } = body as {
    daily_exercises: unknown;
    target: unknown;
  };

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== 'number' ||
    !daily_exercises.every(e => typeof e === 'number')
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});