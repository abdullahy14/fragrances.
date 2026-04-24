import bcrypt from 'bcryptjs';
import { db, createId } from '../data/db.js';
import { USER_STATUS } from '../utils/enums.js';

export const userService = {
  listUsers: () => db.users,
  createUser({ name, email, password, role = 'CUSTOMER' }) {
    const exists = db.users.find((u) => u.email === email);
    if (exists) throw new Error('Email already exists');
    const user = {
      id: createId('usr'),
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      role,
      status: USER_STATUS.ACTIVE,
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    return user;
  },
  updateStatus(userId, status) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;
    user.status = status;
    return user;
  },
  changeRole(userId, role) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;
    user.role = role;
    return user;
  },
  adminResetPassword(adminId, userId, password) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;
    user.passwordHash = bcrypt.hashSync(password, 10);
    db.emailLogs.push({ id: createId('log'), type: 'ADMIN_PASSWORD_RESET', adminId, userId, createdAt: new Date().toISOString() });
    return true;
  }
};
