import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../middleware/asyncHandler.js"

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '6d'
    })
}

const createSendToken = (user, statusCode, res) => {
    
    const token = signToken(user._id)

    const isDev = process.env.NODE_ENV === 'development' ? false : true

    const cookieOption = {
        expire: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: isDev
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        data: user
    })
}

export const registerUser = asyncHandler(async (req, res) => {

    const isAdmin = (await User.countDocuments()) === 0

    const role = isAdmin ? 'admin' : 'user'

    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role
    })

    createSendToken(createUser, 201, res)
})

export const loginUser = asyncHandler(async (req, res) => {
    // validasi inputan email dan password
    if(!req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Please provide email and password')
    }

    // mencari user berdasarkan email
    const userData = await User.findOne({
        email: req.body.email
    })

    // check password
    if(userData && (await userData.comparePassword(req.body.password))) {
        createSendToken(userData, 200, res)
    } else {
        res.status(400)
        throw new Error('Invalid email or password')
    }
})