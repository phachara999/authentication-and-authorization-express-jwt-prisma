const Joi = require("joi");
// const validator = require("express-joi-validation").createValidator({});

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "รหัสผ่านไม่ตรงกัน" }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {
  registerUserSchema,
  loginSchema
};
