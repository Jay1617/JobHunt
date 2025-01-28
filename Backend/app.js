import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './database/dbConnection.js';

const app = express();
dotenv.config({path: './config/.env'});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dbConnection();

export default app;