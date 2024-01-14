import { useState, useEffect } from 'react';
import './index.css';
import { getAllDiaries } from './services/diaryEntryService';
import DiaryEntryDetail from './components/DiaryEntry';
import { DiaryEntry } from './types';
import NewEntry from './components/NewEntry';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	return (
		<div>
			<h1>Diary entries</h1>
			{diaries.map((diary) => (
				<DiaryEntryDetail
					key={diary.id}
					entry={diary}
				/>
			))}

			<NewEntry setDiaries={setDiaries} />
		</div>
	);
};

export default App;
