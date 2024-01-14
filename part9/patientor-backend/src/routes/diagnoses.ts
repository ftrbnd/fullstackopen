import express from 'express';
import diagnosisService from '../services/diagnosisService';

export const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res) => {
	res.send(diagnosisService.getEntries());
});

diagnosisRouter.post('/', (_req, res) => {
	res.send('Saving a diagnosis!');
});
