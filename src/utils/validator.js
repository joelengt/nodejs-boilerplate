var debug = require('debug')('utils:validator')
const Joi = require('joi')

// Validate uri param
export const validateParam = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.params, schema)
    if (result.error) {
      return res['400']({success: false, validator: result.error}, 'Los campos nos son validos')
    }

    if (!req.value) {
      req.value = {}
    }

    if (!req.value['params']) {
      req.value['params'] = {}
    }

    req.params = result.value
    next()
  }
}

// Validate body attributes
export const validateBody = (schemas) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schemas)
    if (result.error) {
      return res['400']({success: false, validator: result.error}, 'Los campos nos son validos')
    }

    if (!req.value) {
      req.value = {}
    }

    if (!req.value['body']) {
      req.value['body'] = {}
    }

    req.body = result.value
    next()
  }
}

// schemas
export const schemas = {
  partnerIDSchema: Joi.object().keys({
    partnerID: Joi.number().required(),
    userID: Joi.number().required()
  }),
  productSlugifySchema: Joi.object().keys({
    productSlugify: Joi.string().required(),
    partnerID: Joi.number().required()
  }),
  productIDSchema: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    partnerID: Joi.number().required()
  }),
  brandIDSchema: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  companyIDSchema: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  productSchema: Joi.object().keys({
    brand: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    sku: Joi.string().required(),
    name: Joi.string().required(),
    nameSlugify: Joi.string().required(),
    photo: Joi.string().required(),
    presentation: Joi.string().required(),
    description: Joi.string().required(),
    seoDescription: Joi.string().required(),
    timeLife: Joi.string(),
    offer: Joi.string(), // $
    price: Joi.string(), // $
    unitPrice: Joi.string(), // $
    suggestedPrice: Joi.string(), // $
    stock: Joi.number().integer().min(0).max(999999), // length 6
    popularity: Joi.number().integer().min(0).max(99999),  // length 5
    order: Joi.number().integer().min(0).max(9999), // length 4
    needPerception: Joi.boolean().strict(),
    isAlwaysInStock: Joi.boolean().strict(),
    isFeatured: Joi.boolean().strict(),
    isArchived: Joi.boolean().strict()
  }),
  productOptionalSchema: Joi.object().keys({
    brand: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    sku: Joi.string(),
    name: Joi.string(),
    nameSlugify: Joi.string(),
    photo: Joi.string(),
    presentation: Joi.string(),
    description: Joi.string(),
    seoDescription: Joi.string(),
    timeLife: Joi.string(),
    offer: Joi.string(), // $
    price: Joi.string(), // $
    unitPrice: Joi.string(), // $
    suggestedPrice: Joi.string(), // $
    stock: Joi.number().integer().min(0).max(999999), // length 6
    popularity: Joi.number().integer().min(0).max(99999),  // length 5
    order: Joi.number().integer().min(0).max(9999), // length 4
    needPerception: Joi.boolean().strict(),
    isAlwaysInStock: Joi.boolean().strict(),
    isFeatured: Joi.boolean().strict(),
    isArchived: Joi.boolean().strict()
  }),
  brandSchema: Joi.object().keys({
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    name: Joi.string().required(),
    nameSlugify: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    seoDescription: Joi.string().required(),
    order: Joi.number().integer().min(0).max(9999), // length 4
    isFeatured: Joi.boolean().strict(),
    isArchived: Joi.boolean().strict()
  }),
  brandUpdateSchema: Joi.object().keys({
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().required(),
    nameSlugify: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    seoDescription: Joi.string().required(),
    order: Joi.number().integer().min(0).max(9999), // length 4
    isFeatured: Joi.boolean().strict(),
    isArchived: Joi.boolean().strict()
  }),
  brandOptionalSchema: Joi.object().keys({
    company: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string(),
    nameSlugify: Joi.string(),
    photo: Joi.string(),
    description: Joi.string(),
    seoDescription: Joi.string(),
    order: Joi.number().integer().min(0).max(9999), // length 4
    isFeatured: Joi.boolean().strict(),
    isArchived: Joi.boolean().strict()
  }),
  orderSchema: Joi.object().keys({
    name: Joi.string()
  })
}
