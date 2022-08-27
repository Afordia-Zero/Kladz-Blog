import Joi from 'joi';


const create = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    photo: Joi.string().required(),
    author: Joi.number().required()
})

const update = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    photo: Joi.string().required(),
})

export default {create, update};