import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    request.user = { isAuthenticated: false };

    try {
        const authHeader = request.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) return next();

        const decoded = await jwt.verify(token, process.env.SECRET);

        const user = await User.findByUserName(decoded.username);

        if (user) {
            request.user = { ...user.toObject(), isAuthenticated: true };
        }

        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        next();
    }
};

export default authenticate;