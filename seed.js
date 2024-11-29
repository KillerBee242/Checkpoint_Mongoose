require('dotenv').config({ path: './secret.env' });
const mongoose = require('mongoose');
const Person = require('./models/person');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI
            // Déprécié: , { useNewUrlParser: true, useUnifiedTopology: true}
    );
        console.log('✅ Connexion MongoDB Atlas réussie !');
    } catch (err) {
        console.error('❌ Erreur de connexion :', err);
    }
}

// Fonction de création de personnes
async function seedDatabase() {
    await connectDB();

    const people = [
        { name: 'Charlie', age: 35, favoriteFoods: ['pasta', 'salad'] },
        { name: 'Daisy', age: 28, favoriteFoods: ['ice cream', 'burritos'] },
        { name: 'Mary', age: 22, favoriteFoods: ['tacos', 'burritos'] },
        { name: 'Richard', age: 19, favoriteFoods: ['sandwich', 'cafe'] },
        { name: 'Bryan', age: 23, favoriteFoods: ['steak', 'burritos'] },
        { name: 'Brenda', age: 41, favoriteFoods: ['pizza', 'chocolate'] }
    ];

    try {
        await Person.insertMany(people);
        console.log('Personnes enregistrées :', people);
    } catch (err) {
        console.error('Erreur de création de plusieurs personnes :', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();