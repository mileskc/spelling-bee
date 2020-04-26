const {Router} = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req,res) => res.send('this is root'))

router.get('/games', controllers.getAllGames)
router.post('/games', controllers.createGame)

router.get('/games/:id', controllers.getGameById)

router.put('/games/:id', controllers.updateGame)

router.delete('/games/:id', controllers.deleteGame)

module.exports = router