import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            res.status(401)
            throw new Error('Not authorized token failed')
        }
    }else{
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    if (user) {
        return res.status(200).json({
            user
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

export const logoutUser = async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({
        message: "Logout Berhasil"
    })
}

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}