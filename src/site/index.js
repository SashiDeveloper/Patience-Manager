const path = require("path");
const session = require("express-session");
const SQLiteStore = require('connect-sqlite3')(session);
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-discord").Strategy;
const _ = require("lodash");
const axios = require("axios");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => new Promise((resolve) => {
    
    const server = client.server,
    app = client.express;

    app.use(require("helmet")());
    app.disable('x-powered-by');

    app.use(require("express").json());
    app.use(require("express").urlencoded({ extended: false }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, "pages"));
    app.use('/static', express.static(path.join(__dirname, "css")));
    app.use('/assets', express.static(path.join(__dirname, "assets")));

    /* Authentication */
    //bindAuth(app, client); // onde isso é declarado?

    /* Home */
    app.get("/", (req, res) => (res.render("home.ejs", )));
});
