const { error } = require("console");
const jwt = require("jsonwebtoken");

const middlewareController = {

    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(error, user)=>{
                if(error){
                   return res.status(403).json("token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
          return  res.status(401).json("You're not authenticated");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.admin) {
                next();
            }
            else{
               return res.status(403).json("you're not allowed to delete other");
            }
        });
    },
};

module.exports = middlewareController;