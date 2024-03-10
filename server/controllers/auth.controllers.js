/* The AdminController class handles the login functionality for admin users, including authentication
and token generation. */
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminController {
    /**
     * This async function handles user login authentication for an admin using a provided nickname and
     * password.
     * @param req - The `req` parameter in the `async login` function is typically an object
     * representing the HTTP request. It contains information about the request made by the client,
     * such as the request headers, body, parameters, and other details. In this specific function,
     * `req.body` is used to extract the
     * @param res - The `res` parameter in the `async login` function is the response object that will
     * be used to send a response back to the client making the request. It is typically used to send
     * HTTP responses with status codes, headers, and data.
     * @returns If the login process is successful, a JSON response will be returned with a token,
     * status code 200, message 'Admin authorized', and the user's nickname. If the admin is not found,
     * a response with status code 404 and message 'Admin not found' will be returned. If the password
     * is incorrect, a response with status code 400 and message 'Incorrect password' will be returned
     */
    async login(req, res) {
        try {
            const { nickname, password } = req.body;
            const user = await Admin.findOne({ nickname });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Admin not found', status: 404 });
            }
            const isPasswordCorrect = bcrypt.compareSync(
                password,
                user.password,
            );
            if (!isPasswordCorrect) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect password ', status: 400 });
            }
            const token = jwt.sign(
                { id: user.nickname },
                process.env.SECRET_KEY,
                { expiresIn: '1h' },
            );
            return res.json({
                token,
                status: 200,
                message: 'Admin authorized',
                user: {
                    nickname: user.nickname,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new AdminController();
