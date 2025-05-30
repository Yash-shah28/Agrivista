import express from 'express';
import { showCropYeildPrediction, resultCropYeildPrediction } from '../contollers/CropYeildPrediction.controller.js';

const cropYeildPredictionRouter = express.Router();

cropYeildPredictionRouter.get('/crop_yeild_predictor', showCropYeildPrediction);
cropYeildPredictionRouter.post('/predict', resultCropYeildPrediction);

export default cropYeildPredictionRouter;