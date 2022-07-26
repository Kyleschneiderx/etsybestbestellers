require("dotenv").config()


const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.REACT_APP_MONGODB_URI
    },
    defualt: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.REACT_APP_MONGODB_URI

    }

}

exports.get = function get(env){
    return config[env] || config.defualt
}