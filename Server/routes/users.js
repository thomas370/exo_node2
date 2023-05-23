const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({mail: req.body.mail});
    if(!user){
        return res.status(404).json('Utilisateur non trouvé !');
    }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            return res.status(400).json("Mot de passe incorrect !");
        }

        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/getusers', async (req, res) => {
   const user = await User.find();
   !user && res.status(404).json('Aucun utilisateur');
   res.status(200).json(user);
});

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;