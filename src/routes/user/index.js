const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const app = express()
const signUpHandler = require("./controller/signup")

app.use("/signup",signUpHandler)

module.exports = app