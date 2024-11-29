const mongoose = require('mongoose');

// Schéma de chaque personne
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Créer le modèle basé sur le schéma
const Person = mongoose.model('Person', personSchema);

module.exports = Person;