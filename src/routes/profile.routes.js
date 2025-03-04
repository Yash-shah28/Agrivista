import express from 'express'
import {saveprofile,addprofile,showprofile,puteditprofile,editprofile} from '../contollers/profile.controller.js'

const profilerouter  = express.Router();

profilerouter.get('/profile',addprofile)

profilerouter.get('/showprofile',showprofile)

profilerouter.post('/profile',saveprofile)

profilerouter.put('/profile/:id',puteditprofile)

profilerouter.get('/profile/:id/edit',editprofile)

export default profilerouter