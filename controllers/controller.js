module.exports.home = (req, res) => {
    res.status(200).json({
        message : "Hi this is Homepage API"
    });
}