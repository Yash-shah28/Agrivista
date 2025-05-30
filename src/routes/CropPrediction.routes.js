import express from 'express';
import { showCropPrediction, resultCropPrediction } from '../contollers/CropPrediction.controllers.js';

const cropPredictionRouter = express.Router();

cropPredictionRouter.get('/crop_prediction', showCropPrediction);
cropPredictionRouter.post('/predict-crop', resultCropPrediction);

export default cropPredictionRouter;