import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN_SECRET;


// generate token
const generateToken = data => {
  const token = jwt.sign(data, secret, { expiresIn: "100000000000000000000000s" });
  return token;
};



// Custom jwt middleware function to check whether token is valid and if it is the same as the client/asker
const authorizeUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token)
      throw ({ 
        code: 401,
        message: "no token sent to server"
      });

    const decoded = jwt.verify(token, secret);    
    
    req.user = decoded;
    if (Number(req.params.id) !== Number(req.user.id))
      throw({
          code: 401,
          message: "User not authorized to proceed"
      });

    next()
  } catch(error) {
    console.error("###ERROR on authorizeUser: ", error.message || error );
    return res.status(error.code || 403).send({ error: error.message || "Invalid Token" });
  }
}

export {
  generateToken,
  authorizeUser
};
