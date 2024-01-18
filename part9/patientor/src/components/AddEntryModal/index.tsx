import {
	Dialog,
	DialogTitle,
	DialogContent,
	Divider,
	Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { NewJournalEntry } from '../../types';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: NewJournalEntry) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
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
			/>
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
