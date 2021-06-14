const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ userId: id, name, ingredients, preparation}));
  return recipe.ops[0];
};

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipeById;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return false;
  const updatedById = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id)}, { $set: { name, ingredients, preparation } }));
  const updatedRecipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return updatedRecipe; 
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById
};

