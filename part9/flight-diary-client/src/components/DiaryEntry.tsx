import { DiaryEntry } from '../types';

interface DiaryProps {
	entry: DiaryEntry;
}

const DiaryEntryDetail = ({ entry }: DiaryProps) => {
	return (
		<div>
			<h2>{entry.date}</h2>
			<p>visibility: {entry.visibility}</p>
			<p>weather: {entry.weather}</p>
			<p>comments: {entry.comment}</p>
		</div>
	);
};

export default DiaryEntryDetail;
