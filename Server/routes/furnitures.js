const router = require('express').Router();
const Furniture = require('../models/Furniture');

// Ajout d'un meuble

router.post('/', async (req, res) => {
   const newFurniture = new Furniture(req.body);
   try {
       const savedFurniture = await newFurniture.save();
       res.status(200).json(savedFurniture);
   } catch(err) {
       res.status(500).json(err);
   }
});

//Modification d'un meuble

router.put('/:id', async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        await furniture.updateOne({ $set: req.body });
        res.status(200).json('Le meuble à bien été modifié !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Suppression d'un meuble

router.delete('/:id', async (req, res) => {
    try {
        const furniture = await Furniture.findByIdAndDelete(req.params.id);
        if (!furniture) {
            return res.status(404).json('Le meuble n\'existe pas.');
        }
        res.status(200).json('Le meuble à bien été supprimé !');
    } catch(err) {
        res.status(500).json(err);
    }
});

//Récupération d'un meuble

router.get('/:id', async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        res.status(200).json(furniture);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Récupération de tous les meubles

router.get('/all/list', async (req, res) => {
    try {
        const furnitures = await Furniture.find();
        res.status(200).json(furnitures);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;