import express from 'express';


import { searchUser } from '../../controller/userController.js'

const router = express.Router();


router.post("/user",searchUser);

export default router;
