const Prisma = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new Prisma.PrismaClient();
const saltRounds = 10;
const { registerUserSchema, loginSchema } = require("./validateSchema");
const jwt = require("jsonwebtoken");

const UserRegister = async (req, res) => {
  const { error, value } = registerUserSchema.validate(req.body);
  const { name, password, email } = value;
  if (error) {
    return res.status(400).json({
      err: error.details[0].message,
    });
  }
  try {
    const emailExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExist) {
      return res.status(400).json({ message: "มีอีเมลนี้แล้ว" });
    }

    const passHash = bcrypt.hashSync(password, saltRounds, function (
      err,
      hash
    ) {
      if (err) throw err;
      return hash;
    });
    await prisma.user.create({
      data: {
        name,
        email,
        password: passHash,
        role : 'user'
      },
    });
    return res.json({
      ms: "สมัครเรียบร้อย",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(500).json(error);
  const { email, password } = value;
  const emailExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!emailExist)
    return res.status(500).json({ ms: "no have user with this email!!" });
  const passConrrect = bcrypt.compareSync(password, emailExist.password);
  if (!passConrrect)
    return res.status(500).json({ ms: "password not Conrrect" });

  const payload = {
    id: emailExist.id,
    name: emailExist.name,
    email: emailExist.email,
  };

  jwt.sign(payload, "secretkey", { expiresIn: 20 }, (err, token) => {
    if (err) throw err;
    res.json({
      userdata: payload,
      token,
    });
  });
};

module.exports = {
  UserRegister,
  login,
};
