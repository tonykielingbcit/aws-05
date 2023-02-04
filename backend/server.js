"use strict";
import express from 'express';
import bcrypt from "bcrypt";
import * as database from "./DB/database.js";
import * as jwt from "./helpers/jwt.js";

const app = express();
app.use(express.json());


// middleware to detect bad json format and proceed accordingly
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error("bad json:::::::::::", err);
        return res.status(404).send({ message: err.message }); // Bad request
    }
    next();
});


// login route
app.post("/api/login", async (req, res) => {
    try {
        console.log("sign in", req.body)
          const { email, password } = req.body;
      
        // frontend does that too
        if (!email || !password)
            throw ({
                message: "Login error. Try again, please.",
                code: 412
            });
    
        // get user from DB
        const user = await database.getUserWithEmail(email);
      
        // check password
        const passwordOK = await bcrypt.compare(password, user.password);
    
        if (!passwordOK)
            throw ({
                message: "Login error. Try again, please.",
                code: 401
            });
      
        // user validated OK
        // send JWT
        const userInfo = {
            id: user.id,
            name: user.displayName,
            image: user.profileImage
        };
        const token = jwt.generateToken(userInfo);

        return res.send({ 
            message: "POST login. User got logged in!",
            token
        });

    } catch(error) {
        console.error(`###ERROR on Login: ${error.message || error}`);
        return res.status(error.code || 500).json({error: error.message || error});   
    }
})


// signup route
app.post("/api/signup", async (req, res) => {
    try {
        const { email, password, name, picture } = req.body;
        
        if (!email || !password || !name)
            throw ({ 
                message: "missing info",
                code: 400
            });

        const emailExist = await database.getUserWithEmail(email);
        if (emailExist)
            throw ({ 
                message: "Try another email, please",
                code: 409
            });

    
        const hashedPassword = await bcrypt.hash(password, 13);
        database.createUser({email, password: hashedPassword, displayName: name, profileImage: picture});
    
        return res.send({ message: "POST signup all good!" })

    } catch(error) {
        console.error(`###ERROR on SignUp: ${error.message || error}`);
        return res.status(error.code || 500).json({error: error.message || error});
    }
})


// modify displayName route
app.put("/api/users/:id/displayName", async (req, res) => {
    try {
        const userId = req.params.id;
        
        const { newDisplayName } = req.body;
        if (!newDisplayName)
            throw ({ 
                code: 400,
                message: "missing info"
            });


        const user = await database.updateUserDisplayName(userId, newDisplayName);
        const message = user.changedRows > 0 ? "Info updated" : "No changes applied";

        return res.send({ message });

    } catch(error) {
        console.error(`###ERROR on change displayName: ${error.message || error}`);
        return res.status(error.code || 500).json({error: error.message || error});
    }
});


// modify profileImgae route
app.put("/api/users/:id/profileImage", jwt.authorizeUser, async (req, res) => {
    try {
        // check whether the user token is the same as the asker
        const userId = req.params.id;
        
        const { newProfileImage } = req.body;
        if (!newProfileImage)
            throw ({ 
                code: 400,
                message: "missing info"
            });

        const updateImage = await database.updateUserProfileImage(userId, newProfileImage);
        const message = updateImage.changedRows > 0 ? "Info updated" : "No changes applied";

        return res.send({ message });

    } catch(error) {
        console.error(`###ERROR on change displayName: ${error.message || error}`);
        return res.status(error.code || 500).json({error: error.message || error});
    }
})


// default route
app.use((req, res) => res.json({message: "no route has been found"}));



const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Server running at ${port} port`));

