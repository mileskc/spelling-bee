const {Router} = require('express')
const controllers = require('../controllers')
const router = Router()
const restrict = require('../helpers')

router.get('/', (req,res) => res.send('this is root'))

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)
router.get('/verify-user', controllers.verifyUser)
router.post('/change-pw', controllers.changePassword)




router.get('/games', controllers.getAllGames)
router.post('/games', restrict, controllers.createGame)




router.get('/games/:id', controllers.getGameByNum)

router.put('/games/:id', restrict, controllers.updateGame)

router.delete('/games/:id', restrict, controllers.deleteGame)

router.get('/users/:id', controllers.getUserById)
router.put('/users/:id', controllers.addCompletedGameToUser)

module.exports = router