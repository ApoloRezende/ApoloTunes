import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// import Header from '../components/Header';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnD: true,
      inputValue: '',
      loading: false,
    };
    this.valInputLogin = this.valInputLogin.bind(this);
    this.valInput = this.valInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  valInputLogin({ target: { value } }) {
    this.setState({ inputValue: value }, () => this.valInput());
  }

  valInput() {
    const { inputValue } = this.state;
    const minInput = 3;
    if (inputValue.length >= minInput) {
      this.setState({ btnD: false });
    }
  }

  async submitForm() {
    this.setState(
      { loading: true },
      async () => {
        const { inputValue } = this.state;
        const userInfo = { name: inputValue };
        const { history } = this.props;
        await createUser(userInfo);
        this.setState({ loading: false });
        history.push('/search');
      },
    );
  }

  render() {
    const { btnD, inputValue, loading } = this.state;

    return (
      loading ? <Loading /> : (
        <div data-testid="page-login">
          <form>
            <input
              onChange={ this.valInputLogin }
              data-testid="login-name-input"
              type="text"
              value={ inputValue }
              name="inputValue"
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ btnD }
              onClick={ this.submitForm }
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
