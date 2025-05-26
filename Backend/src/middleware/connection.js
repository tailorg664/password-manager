import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const authenticateToken = async (req, res, next) => {
      try {
            const token =
              req.cookies?.jwt ||
              req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                  return res.status(401).json({ message: "Unauthorized" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                  return res.status(401).json({ message: "Unauthorized" });
            }
            const user = await User.findById(decoded._id);
            if(!user) {
                  return res.status(404).json({ message: "Not found" });
            }
            req.user = user;
            next();
      } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Unauthorized" });
      }
}
export default authenticateToken;
// This middleware function checks if the user is authenticated by verifying the JWT token.