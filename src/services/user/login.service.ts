import { User } from '../../repositories/user.repository';
import bcrypt from 'bcrypt';

export async function login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
        console.log('User not found');
        return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        console.log('Password does not match');
        return false;
    }

    return user;
}
