interface BmiValues {
	height: number;
	weight: number;
}

/**
 * returns the body-mass index
 * @param height centimeters
 * @param weight kilograms
 */
export function calculateBmi(height: number, weight: number) {
	const bmi = weight / Math.pow(height / 100, 2);

	if (bmi < 18.5) {
		return 'Underweight';
	} else if (18.5 <= bmi && bmi <= 24.9) {
		return 'Normal';
	} else if (25 <= bmi && bmi <= 29.9) {
		return 'Overweight';
	} else {
		return 'Obese';
	}
}

const parseBmiArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

try {
	const { height, weight } = parseBmiArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
