import {Router} from 'express';
import * as userController from './controller.js';
import {auth} from '../../middleware/auth.js'

const router = Router();

router.get('/search', auth, userController.searchUsers);
router.get('/friends', auth, userController.getFriends);
router.get('/me', auth, userController.getMyProfile);
router.put('/me', auth, userController.updateProfile);

// public profile
router.get('/:username', userController.getUserByUsername);


export default router;