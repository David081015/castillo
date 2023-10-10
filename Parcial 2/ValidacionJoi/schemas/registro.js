const Joi = require('joi');
module.exports = {
    registroSchema : Joi.object({
        Nombre:Joi.string().required(),
        Apellido:Joi.string().required(),
        NumControl:Joi.number()
        .integer()
        .min(8)
        .required(),
        Correo:Joi.string()
        .email({minDomainSegments:2,tlds:{allow:['com','net']}})
        .required(),
    }),
};