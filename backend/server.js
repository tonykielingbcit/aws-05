"use strict";
import express from 'express';
import bcrypt from "bcrypt";
import * as database from "./DB/database.js";
// import * as helpers from "./helpers.js";

const app = express();
app.use(express.json());


app.post("/api/login", async (req, res) => {
    try {
        console.log("sign in", req.body)
          const { email, password } = req.body;
      
        // frontend does that too
        if (!email || !password)
            return res.json({error: "Login error. Try again, please."});
    
        // get user from DB
        const user = await database.getUserWithEmail(email);
      
        // check password
        const passwordOK = await bcrypt.compare(password, user.password);
    
        if (!passwordOK)
            return res.json({error: "Login error. Try again, please."});
      
        // user validated OK
        // send JWT
        return res.send({ message: "POST login. User got logged in!" });

    } catch(error) {
        console.error(`###ERROR on Login: ${error.message || error}`);
        return res.json({error: error.message || error});   
    }
})



app.post("/api/signup", async (req, res) => {
    try {
        const { email, password, name, picture } = req.body;
        
        if (!email || !password || !name)
            return res.json({ error: "missing info" });

        const emailExist = await database.getUserWithEmail(email);
        if (emailExist)
            return res.json({ error: "Try another email, please" });

    
        const hashedPassword = await bcrypt.hash(password, 13);
        database.createUser({email, password: hashedPassword, displayName: name, profileImage: picture});
    
        return res.send({ message: "POST signup all good!" })

    } catch(error) {
        console.error(`###ERROR on SignUp: ${error.message || error}`);
        return res.json({error: error.message || error});
    }
})



app.put("/api/users/:id/displayName", async (req, res) => {
    try {
        console.log("update displayName", req.body, req.params.id, req.query)
    
        const userId = req.params.id;
        const { newDisplayName } = req.body;
    
        const user = await database.updateUserDisplayName(userId, newDisplayName);
        const message = user.changedRows > 0 ? "Info updated" : "No changes applied";

        return res.send({ message });

    } catch(error) {
        console.error(`###ERROR on change displayName: ${error.message || error}`);
        return res.json({error: error.message || error});
    }
});



app.put("/api/users/:id/profileImage", async (req, res) => {
  console.log("update profile image", req.body)

    try {
        console.log("update displayName", req.body, req.params.id, req.query)

        const userId = req.params.id;
        const { newProfileImage } = req.body;

        const updateImage = await database.updateUserProfileImage(userId, newProfileImage);
        const message = updateImage.changedRows > 0 ? "Info updated" : "No changes applied";

        return res.send({ message });

    } catch(error) {
        console.error(`###ERROR on change displayName: ${error.message || error}`);
        return res.json({error: error.message || error});
    }
})



app.use((req, res) => res.json({message: "no route has been found"}));



const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Server running at ${port} port`));

