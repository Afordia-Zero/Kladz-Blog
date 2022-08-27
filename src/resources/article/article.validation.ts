import Joi from 'joi';


const create = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    photo: Joi.string().required(),
    categories: Joi.string().required()
})

const update = Joi.object({
    title: Joi.string(),
    desc: Joi.string(),
    photo: Joi.string(),
})

export default {create, update};