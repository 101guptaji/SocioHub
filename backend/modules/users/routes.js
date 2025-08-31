import {Router} from 'express';
import * as userController from './controller.js';
import {auth} from '../../middleware/auth.js'

const router = Router();

router.get('/me', auth, userController.getMyProfile);
router.put('/me', auth, userController.updateProfile);

router.get('/search', auth, userController.searchUsers);
router.get('/:username', auth, userController.getUserByUsername);


export default router;