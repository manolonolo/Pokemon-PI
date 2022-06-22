const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemon = require('./PokemonRoutes.js') ;
const Type = require('./TypeRoutes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', Pokemon);
router.use('/types', Type);

module.exports = router;
