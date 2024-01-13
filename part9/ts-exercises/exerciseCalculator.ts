interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ExerciseValues {
	dailyExerciseHours: number[];
	targetDailyHours: number;
}

export function calculateExercises(
	dailyExerciseHours: number[],
	targetDailyHours: number
): Result {
	const totalHours = dailyExerciseHours.reduce((a, b) => a + b, 0);
	const averageDailyHours = totalHours / dailyExerciseHours.length;

	const percentage = averageDailyHours / targetDailyHours;
	let rating = 0;
	let ratingDescription = '';

	if (percentage <= 0.5) {
		rating = 1;
		ratingDescription = 'pretty bad, do better';
	} else if (0.5 <= percentage && percentage <= 0.79) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else if (0.8 <= percentage) {
		rating = 3;
		ratingDescription = 'pretty good!';
	}

	return {
		periodLength: dailyExerciseHours.length,
		trainingDays: dailyExerciseHours.filter((hour) => hour > 0).length,
		success: averageDailyHours >= targetDailyHours,
		rating,
		ratingDescription,
		target: targetDailyHours,
		average: averageDailyHours,
	};
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
	if (args.length < 12) throw new Error('Not enough arguments');

	const dailyExerciseHours: number[] = [];

	args.forEach((val, i) => {
		if (i < 2) return;

		if (isNaN(Number(val))) {
			throw new Error('Provided values were not numbers!');
		}

		if (i > 2) {
			dailyExerciseHours.push(Number(val));
		}
	});

	return {
		dailyExerciseHours,
		targetDailyHours: Number(args[2]),
	};
};

try {
	const { dailyExerciseHours, targetDailyHours } = parseExerciseArguments(
		process.argv
	);
	console.log(calculateExercises(dailyExerciseHours, targetDailyHours));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
