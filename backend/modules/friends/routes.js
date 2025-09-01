import { Router } from 'express';
import * as ctrl from './controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

router.post('/requests', auth, ctrl.sendRequest);
router.get('/requests', auth, ctrl.listRequests);
router.post('/requests/:id/accept', auth, ctrl.acceptRequest);
router.post('/requests/:id/reject', auth, ctrl.rejectRequest);
router.delete('/:userId', auth, ctrl.unfriend);

export default router;
