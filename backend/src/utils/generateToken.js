import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'glam_girl_janki_super_secret_jwt_key_2026_luxury_beauty',
    { expiresIn: '30d' }
  );
};
