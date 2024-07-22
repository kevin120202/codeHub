// import bcrypt from "bcryptjs"

// export const hashPassword = async (req, res, next) => {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(req.body.password, salt)
//     req.body.password = hashedPassword
//     next()
// }