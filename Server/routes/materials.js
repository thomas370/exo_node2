const router = require('express').Router();
const Material = require('../models/Material');

// Ajout d'un matériau

router.post('/', async (req, res) => {
    const newMaterial = new Material(req.body);
    try {
        const savedMaterial = await newMaterial.save();
        res.status(200).json(savedMaterial);
    } catch(err) {
        res.status(500).json(err);
    }
});

//Modification d'un materiau

router.put('/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        await Material.updateOne({ $set: req.body });
        res.status(200).json('La catégorie à bien été modifié !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Suppression d'un materiau

router.delete('/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        await material.deleteOne();
        res.status(200).json('La catégorie à bien été supprimé !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Récupération d'un materiau

router.get('/:id', async (req, res) => {
    try {
        const material = await Material.findOne({ name: req.params.id });
        res.status(200).json(material);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Récupération de tous les materiaux

router.get('/all/list', async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;