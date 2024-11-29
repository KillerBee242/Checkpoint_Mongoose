// Serveur + Base de données

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './secret.env' });

const app = express();
const port = process.env.PORT || 3000;

// Fonction asynchrone pour connecter à MongoDB

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI
            // Deprecated: , { useNewUrlParser: true, useUnifiedTopology: true}
        );
        console.log('✅ Connexion MongoDB Atlas réussie !');
    } catch (err) {
        console.error('❌ Erreur de connexion:', error);
    }
}

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World !');
});

app.listen(port, () => {
    console.log(`✅ Serveur en écoute sur le port ${port}`);
});