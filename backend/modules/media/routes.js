import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { signUpload, confirmUpload, uploadFallback } from './controller.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/sign', auth, signUpload);                 // returns signature + params for direct upload
router.post('/confirm', auth, confirmUpload);         // client posts public_id + url after upload
router.post('/upload', auth, upload.single('file'), uploadFallback); // fallback server upload

export default router;
