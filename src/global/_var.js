require('dotenv').config()

/******** SERVER ******/

const PORT  =  process.env.PORT

/******** DATABASE ********/

const PG_USER  =  process.env._USER
const PG_PASS  =  process.env._PASS
const PG_HOST  =  process.env._HOST
const PG_NAME  =  process.env._NAME

/******** KEY **********/ 

const KEY  =  process.env.KEY

/******** ROUTES **********/ 

const LOGIN  =  process.env.LOGIN

/******** EXPORTS **********/

module.exports = {
    //server
    PORT,
    //database
    PG_USER,
    PG_PASS,
    PG_HOST,
    PG_NAME,
    //key
    KEY,
    //routes
    LOGIN
}