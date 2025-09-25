const logger = (req, res, next) => {
    console.log("miauw");
    next();
};

module.exports = logger;
