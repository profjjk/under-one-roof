import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '../services/auth.service';
import { SET_HOME } from '../utils/redux/constants/actions';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const setHome = home => {
        dispatch({ type: SET_HOME, home })
    }

    const login = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const response = await AuthService.login(formData.home, formData.password);
            if (response) {
                const home = { id: response.id, email: response.email, address: response.username };
                setHome(home);
                history.push('/home');
            }
        } catch (err) { console.error(err) }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container mx-auto my-5">
                <img
                    src="/assets/img/Login/loginICON-96.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="username">Home (street address)</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            name={'home'}
                            defaultValue={'12 Harbor Ave'}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={'password'}
                            className={'form-control'}
                            name={'password'}
                            defaultValue={'password'}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            <span>Login</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;