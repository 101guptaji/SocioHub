import { Router } from 'express';
import * as ctrl from './controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

router.post('/', auth, ctrl.createPost);
router.get('/feed', auth, ctrl.getFeed);
router.get('/:id', auth, ctrl.getPostById); 

export default router;
