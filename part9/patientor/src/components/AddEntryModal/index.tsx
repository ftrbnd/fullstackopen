import {
	Dialog,
	DialogTitle,
	DialogContent,
	Divider,
	Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { Diagnosis, NewJournalEntry } from '../../types';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: NewJournalEntry) => void;
	error?: string;
	diagnoses: Diagnosis[];
}

const AddEntryModal = ({
	modalOpen,
	onClose,
	onSubmit,
	error,
	diagnoses,
}: Props) => (
	<Dialog
		fullWidth={true}
		open={modalOpen}
		onClose={() => onClose()}>
		<DialogTitle>New Journal Entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity='error'>{error}</Alert>}
			<AddEntryForm
				onSubmit={onSubmit}
				onCancel={onClose}
				diagnoses={diagnoses}
			/>
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
