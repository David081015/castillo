const validation = (schema) => {
    let joiValidation = (req, res, next) => {
        let error = schema.validate(req.body, { abortEarly: false });
        console.log(error);
        if (error) {
            let { details } = error;
            res.status(400).json({ error: details });
        } else {
            next();
        }
    }
    return joiValidation;
};
module.exports = validation;