const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_TOKEN } = process.env;

const { Users } = require("../models/Users");
exports.checkUsername = async (req, res, next) => {
  const isNewUser = await Users.isUsernameAvailable(req.params.username);
  if (!isNewUser)
    res.status(400).json({ message: "username is not available" });
  else next();
};
exports.newUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.username || !req.body.password)
      res.status(400).json({ message: "please fill in all fields" });
    else {
      const isNewUser = await Users.isUsernameAvailable(req.body.username);
      if (!isNewUser)
        res
          .status(400)
          .json({ message: "Sorry this username is not available" });
      else {
        //hash user password
        const hashedPw = bcrypt.hashSync(req.body.password, 5);
        //create new user
        const newUser = new Users({
          name: req.body.name,
          username: req.body.username,
          password: hashedPw,
        });
        const results = await newUser.save();
        const resObj = {
          url: `/users/${results.id}`,
          data: results,
        };
        res.set("content-location", `/users/${results._id}`);
        res.status(201).send(resObj);
      }
    }
  } catch {
    (error) => {
      res.status(500).error("couldn't create new user", error);
    };
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username }).exec();
    if (!user) res.status(200).send("no such user found");
    else {
      //user validation and create access token
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (isMatch) {
        const accessToken = jwt.sign({ username: user.username }, SECRET_TOKEN);
        res.status(200).json({ message: "login success", token: accessToken });
      } else {
        res.status(400).send({message:"login failed: incorrect username/ password"});
      }
    }
  } catch {
    (error) => {
      res.status(500).error("couldn't login user", error);
    };
  }
};
exports.verifyUser = (req, res, next) => {
  if (!req.headers.authorization) next();
  else {
    const token = req.headers.authorization.split(" ")[1];
    if (token && jwt.verify(token, SECRET_TOKEN)) {
      req.user = jwt.decode(token);
      next();
    } else {
      next();
    }
  }
};
exports.getUser = async (req, res) => {
  try {
    if (req.user) {
      const results = await Users.findOne({
        username: req.user.username,
      }).exec();
      if (!results)
        res.status(400).json({ message: "couldn't find user by username" });
      else {
        res.status(200).send(results);
      }
    } else res.status(401).send("invalid user token");
  } catch {
    (error) => {
      res.status(500).error("couldn't find user", error);
    };
  }
};
exports.editUser = async (req, res) => {
  try {
    if (req.user) {
      const updateUser = {
        name: req.body.name,
        password: req.body.password,
      };
      const results = await Users.findOneAndUpdate(
        { username: req.user.username },
        updateUser,
        { new: true }
      ).exec();
      if (results) res.status(200).send(results);
      else res.status(400).send("error updating user");
    } else res.status(401).send("invalid user token");
  } catch {
    (error) => {
      res.status(500).error("couldn't edit user", error);
    };
  }
};
