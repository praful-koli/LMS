import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
  // Create a JWT token with user ID and role
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET_KEY, // Secret key for signing the token
    {
      expiresIn: '1d', // Token expiration time
    }
  );

  // Set the token in the response cookie
  return res.status(200).cookie('token', token, {
    httpOnly: true, // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  }).json({
    success: true,
    message,
    user
  });

 
};