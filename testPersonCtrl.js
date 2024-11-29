const mongoose = require('mongoose');
require('dotenv').config({ path: './secret.env' });

const {
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
} = require('./controllers/personController');

// Fonction d'exécution des tests ou exemples
async function runTests() {

    // Vérification de la connection
        await mongoose.connect(process.env.MONGO_URI
            // Deprecated: , { useNewUrlParser: true, useUnifiedTopology: true}
        )
        .then(() => console.log('✅ Connexion MongoDB Atlas réussie !'))
        .catch(err => console.error('❌ Erreur de connexion:', err));
    
    // Trouver des personnes par nom
    await findPeopleByName('Daisy');

    // Trouver une personne par aliment favori
    await findOneByFood('chocolate');

    // Trouver une personne par ID
    await findPersonById(new mongoose.Types.ObjectId('674a01c0082d0cb5de3dd568'));

    // Mettre à jour une personne
    await findEditThenSave(new mongoose.Types.ObjectId('674a01c0082d0cb5de3dd565'));

    // Mettre à jour une personne par nom
    await findAndUpdate('Brenda');

    // Supprimer une personne par ID
    await removeById(new mongoose.Types.ObjectId('674a01c0082d0cb5de3dd568'));

    // Supprimer tous le documents au nom de "Mary"
    await removeManyPeople(); // Fonctionne uniquement avec plusieurs "Mary" dans les données

    // Requête en chaîne
    await queryChain();
}

runTests();