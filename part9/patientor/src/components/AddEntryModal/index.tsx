import {
	Dialog,
	DialogTitle,
	DialogContent,
	Divider,
	Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { HealthCheckEntryFormValues } from '../../types';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HealthCheckEntryFormValues) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Dialog
		fullWidth={true}
		open={modalOpen}
		onClose={() => onClose()}>
		<DialogTitle>New HealthCheck Entry</DialogTitle>
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
