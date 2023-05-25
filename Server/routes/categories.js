const router = require('express').Router();
const Category = require('../models/Category');

// Ajout d'une catégorie

router.post('/', async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch(err) {
        res.status(500).json(err);
    }
});

//Modification d'une catégorie

router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await Category.updateOne({ $set: req.body });
        res.status(200).json('La catégorie à bien été modifié !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Suppression d'une catégorie

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await category.deleteOne();
        res.status(200).json('La catégorie à bien été supprimé !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Récupération d'une catégorie

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Récupération de toutes les catégories

router.get('/all/list', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;