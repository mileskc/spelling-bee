const db = require('../db')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const users = [
        {
            username: "test",
            email: "test@email.com",
            password_digest: "thisisalongstring",
        },
        {
            username: "admin",
            email: "admin@email.com",
            password_digest: "heresanotherstring"
        }
    ]
    

    await User.insertMany(users)
    console.log("Created users!")
}
const run = async () => {
    await main()
    db.close()
}

run()