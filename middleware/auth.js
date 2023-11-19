const jwt = require('jsonwebtoken');
const Prisma = require('@prisma/client');

const prisma = new Prisma.PrismaClient();
const verifyLogin = (req, res, next) => {
    try {
        const token = req.headers['authtoken'];
        // console.log(token);
        if (!token) return res.status(401).json({ ms: "Token หายไป" });

        const decode = jwt.verify(token, "secretkey");
        // console.log(decode);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ ms: "เกิดข้อผิดพลาดในการตรวจสอบ Token" });
    }
};

const checkAdmin = async (req,res,next) => {
    try {
        const userID = req.user.id
        const user = await prisma.user.findFirst({
            where : {
                id : userID
            },
            select : {
                role: true
            }
        });
        if(user.role != 'admin'){
            res.json({
                ms : "คุณไม่ใช้ admin"
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    verifyLogin,
    checkAdmin
};
