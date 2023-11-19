const Prisma = require('@prisma/client');

const prisma = new Prisma.PrismaClient();

const getAlluser = async (req,res) => {
    const users = await prisma.user.findMany();
    res.json(users);
}
const getUser = async (req,res) => {
    const userID = req.params.id
    const user = await prisma.user.findFirst({
        where : {
            id : parseInt(userID)
        }
    })
    res.json(user);
}

module.exports = {
    getAlluser,
    getUser
}