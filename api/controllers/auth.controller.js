import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const userRole = role || 'USER';

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: userRole,
      },
    });

    // GENERATE TOKEN IMMEDIATELY AFTER REGISTRATION
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: newUser.id,
        isAdmin: newUser.role === "ADMIN",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // STORE TOKEN IN SESSION
    req.session.token = token;

    const { password: userPassword, ...userInfo } = newUser;

    // RETURN TOKEN AND USER INFO
    res.status(201).json({ token, ...userInfo });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        savedPosts: true,
      },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE TOKEN
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    // STORE TOKEN IN SESSION
    req.session.token = token;

    res.status(200).json({ token, ...userInfo });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  // No need to clear cookies. Just return a success message.
  res.status(200).json({ message: "Logout Successful" });
};
