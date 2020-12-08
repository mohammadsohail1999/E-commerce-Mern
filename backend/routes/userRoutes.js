import express from 'express';


const router = express.Router()


import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,DeleteUser, AdminGetUserbyId,AdminUpdateUser} from '../controllers/userControllers.js'
import { protect,isAdmmin } from '../middleWare/authMiddleWare.js'

router.route('/')
.post(registerUser)
.get(protect,isAdmmin,getUsers)

router.post('/login',authUser)

router.route('/profile')
.get(protect,getUserProfile)
.patch(protect,updateUserProfile)



router.route('/:id')
.get(protect,isAdmmin,AdminGetUserbyId)
.patch(protect,isAdmmin,AdminUpdateUser)
.delete(protect,isAdmmin,DeleteUser)


export default router