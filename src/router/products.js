import { Router } from 'express';
import { userById } from '../controllers/user'
import { create, list, read, remove, search, update } from '../controllers/product';
import { checkAuth, isAdmin, isAuth, requireSignin } from '../middlewares/checkAuth' 
const router = Router();


// product
router.get('/products', checkAuth, list);
router.get('/products/:id', checkAuth, read);
router.post('/products/:userId',requireSignin ,isAuth ,isAdmin , create);
router.delete('/products/:id/:userId',requireSignin ,isAuth ,isAdmin , remove);
router.patch("/products/:id/:userId",requireSignin ,isAuth ,isAdmin , update );

router.param("userId", userById)

router.post("/search", search)
export default router;