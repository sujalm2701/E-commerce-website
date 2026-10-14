import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import UserModel from "../model/user.model";
export const postSignUp = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name should not be empty.")
    .isLength({ min: 3, max: 50 })
    .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/)
    .withMessage("Name should only contain letters"),

  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("phoneNo")
    .matches(/^[6-9]\d(9)$/)
    .withMessage("Invalid phone no."),

  check("password")
    .matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  check("conformPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["user", "admin"])
    .withMessage("Invalid user type"),
  check("address").notEmpty().withMessage("Please enter your address"),

  // name, email, phoneNo, password, role(user,admin), address, cart, orders, orderHis
  async (req, res) => {
    const { name, email, phoneNo, password, role, address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors });
    } else {
      const hashedPassword = bcrypt.hash(password, 12);
      const user = await new UserModel.create({
        name,
        email,
        phoneNo,
        password: hashedPassword,
        role,
        address,
      });
      await user
        .save()
        .then(() => {
          req.session.isLoggedIn = true;
          req.session.role = user.role;
          req.session.userId = user._id.toString();
          res
            .json({ message: "user successfully saved" })
            .redirect("/api/auth/postSignIn");
        })
        .catch((err) => {
          res.json({ err });
        });
    }
  },
];
export async function postSignIn(req, res) {
  let { email, password, userName } = req.body;
  email = email.trim().toLowerCase();
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ err: "User not found." });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch || user.name !== userName) {
    return res.json({ err: "User not found." });
  }
  req.session.isLoggedIn = true;
  req.session.role = user.role;
  req.session.userId = user._id.toString();
  res.json({ user });
}
export async function postLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/api/auth/postSignIn");
  });
}
