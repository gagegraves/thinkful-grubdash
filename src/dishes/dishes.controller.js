const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function dishExists(req, res, next) {
  const dishId = Number(req.params.dishId);
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  }
  next({
    status: 404,
    message: `URL not found: ${req.originalUrl}`,
  });
}

function bodyHasRequiredProperties(req, res, next) {

  const { data: { name } = {} } = req.body;
  const { data: { description } = {} } = req.body;
  const { data: { price } = {} } = req.body;
  const { data: { image_url } = {} } = req.body;

  if (!name) {
    next({
      status: 400,
      message: "Dish must include a name",
    });
  } else if (!description) {
    next({
      status: 400,
      message: "Dish must include a description",
    });
  } else if (!price) {
    next({
      status: 400,
      message: "Dish must have a price that is an integer greater than 0",
    });
  } else if (!image_url) {
    next({
      status: 400,
      message: "Dish must include a image_url",
    });
  } else next();
}

function list(req, res) {
  res.json({ data: dishes });
}

function create(req, res) {
  const { data: { name } = {} } = req.body;
  const newUrl = {
    id: ++lastUrlId,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

module.exports = {
  list,
  create: [bodyHasRequiredProperties, create],
};
