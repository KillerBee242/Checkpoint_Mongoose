const Person = require('../models/person');

// Création d'une personne
async function createPerson(name, age, favoriteFoods) {
    const person = new Person({
        name,
        age,
        favoriteFoods
    });

    try {
        const savedPerson = await person.save();
        console.log('Personne enregistrée :', savedPerson);
        return savedPerson;
    } catch (error) {
        console.error('Erreur de création :', error);
    }
}



// Création de plusieurs personnes
async function createManyPeople(arrayOfPeople) {
    try {
        const people = await Person.create(arrayOfPeople);
        console.log('Personne enregistrées :', people);
        return people;
    } catch (error) {
        console.error('Erreur de création de plusieurs personnes :', error);
    }
}



// Recherche par nom
async function findPeopleByName(personName) {
    try {
        const people = await Person.find({ name: personName });
        console.log('Personnes trouvées par nom :', people);
        return people;
    } catch (error) {
        console.error('Erreur de recherche par nom :', error);
    }
}



// Recherche par aliment favori
async function findOneByFood(food) {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log('Personne trouvée par aliment favori :', person);
        return person;
    } catch (error) {
        console.error('Erreur de recherche par aliment favori :', error);
    }
}



// Recherche par ID
async function findPersonById(personId) {
    try {
        const person = await Person.findById(personId);
        console.log('Personne trouvée par ID :', person);
        return person;
    } catch (error) {
        console.error('Erreur de recherche par ID :', error);
    }
}



// Mise à jour d'une personne
async function findEditThenSave(personId) {
    try {
        const person = await Person.findById(personId);
        if (!person) {
            console.error('Person not found !');
            return;
        }

        person.favoriteFoods.push('hamburger');
        const updatedPerson = await person.save();
        console.log('Personne mise à jour :', updatedPerson);
        return updatedPerson;
    } catch (err) {
        console.error('Erreur lors de la mise à jour et sauvegarde :', err);
    }
}



// Trouver une personne par nom et mettre à jour son âge
async function findAndUpdate(personName) {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },
            { age: 20 },
            { new: true }
        );
        console.log('Personne mise à jour avec findOneAndUpdate :', updatedPerson);
        return updatedPerson;
    } catch (err) {
        console.error('Erreur lors de la mise à jour avec findOneUpdate :', err);
    }
}



// Supprimer une personne par ID
async function removeById(personId) {
    try {
        const removedPerson = await Person.findByIdAndDelete(personId);
        console.log('Personne supprimée par ID :', removedPerson);
        return removedPerson;
    } catch (err) {
        console.error('Erreur lors de la suppression par ID :', err);
    }
}



// Supprimer toutes les personnes nommées "Mary"
async function removeManyPeople() {
    try {
        const result = await Person.deleteMany({ name: 'Mary' });
        console.log('Personnes supprimées nommées Mary :', result);
        return result;
    } catch (err) {
        console.error('Erreur lors de la suppression de plusieurs personnes :', err);
    }
}



// Trouver des personnes aimant les burritos, les trier par nom, limiter les résultats et masquer l'âge
async function queryChain() {
    try {
        const people = await Person.find({ favoriteFoods: 'burritos' })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec();
        console.log('Résultats de la requête en chaîne :', people);
        return people;
    } catch (err) {
        console.error('Erreur lors de la requête en chaîne :', err);
    }
}



module.exports = {
    createPerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
};