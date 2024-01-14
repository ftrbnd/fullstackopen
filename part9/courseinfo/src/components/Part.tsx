import { CoursePart } from '../types';

interface PartProps {
	part: CoursePart;
}

const Part = ({ part }: PartProps) => {
	/**
	 * Helper function for exhaustive type checking
	 */
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	switch (part.kind) {
		case 'basic':
			return (
				<div>
					<h4>
						{part.name} ({part.exerciseCount})
					</h4>
					<em>{part.description}</em>
				</div>
			);
		case 'group':
			return (
				<div>
					<h4>
						{part.name} ({part.exerciseCount})
					</h4>
					<p>group exercises: {part.groupProjectCount}</p>
				</div>
			);
		case 'background':
			return (
				<div>
					<h4>
						{part.name} ({part.exerciseCount})
					</h4>
					<em>{part.description}</em>
					<p>background material: {part.backgroundMaterial}</p>
				</div>
			);
		case 'special':
			return (
				<div>
					<h4>
						{part.name} ({part.exerciseCount})
					</h4>
					<em>{part.description}</em>
					<p>requirements: {part.requirements.toString()}</p>
				</div>
			);
		default:
			return assertNever(part);
	}
};

export default Part;
