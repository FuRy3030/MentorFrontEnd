import { proxy } from 'valtio';
import CheckIfTokenIsValid from '../../helpers/auth/CheckIfTokenIsValid';

const AuthState = proxy({ IsLogged: CheckIfTokenIsValid() });

export default AuthState;