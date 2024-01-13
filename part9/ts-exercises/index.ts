import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	const bmi = calculateBmi(Number(height), Number(weight));

	return res.json({
		weight,
		height,
		bmi,
	});
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { dailyExercises, target } = req.body;

	if (!dailyExercises || target == undefined) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	if (!Array.isArray(dailyExercises)) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	let badParams = false;
	dailyExercises.forEach((val) => {
		if (isNaN(Number(val))) badParams = true;
	});

	if (badParams || isNaN(Number(target))) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const results = calculateExercises(dailyExercises, Number(target));
	return res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
