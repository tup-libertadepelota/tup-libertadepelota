import { getAuth } from 'firebase-admin/auth';
import '../src/config/firebase.js';

const [email, role] = process.argv.slice(2);
const allowedRoles = ['admin', 'user'];

if (!email || !allowedRoles.includes(role)) {
  console.error('Usage: node scripts/set-user-role.js <email> <admin|user>');
  process.exitCode = 1;
} else {
  try {
    const auth = getAuth();
    const user = await auth.getUserByEmail(email);

    await auth.setCustomUserClaims(user.uid, {
      ...user.customClaims,
      role,
    });

    console.log(`Role "${role}" assigned to ${email}`);
  } catch (error) {
    console.error('Could not assign the user role:', error.message);
    process.exitCode = 1;
  }
}
