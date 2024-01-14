import express from 'express';
import patientService from '../services/patientService';

export const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

patientRouter.post('/', (_req, res) => {
	res.send('Saving a patient!');
});
