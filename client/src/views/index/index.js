import { useHistory } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css" ;
import "bootswatch/dist/cosmo/bootstrap.min.css";
import Logo from '../../images/inss-logo.jpg'

export default function Index() {
  const history = useHistory()
  const handleClickLogin = () => history.push('/login')
  const handleClickRegister = () => history.push('/register')

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body text-center">
          <img src={Logo}/>
          <h1><i className="fas fa-home fa-4x"></i></h1>
          <p>Criar uma conta ou logar</p>
          <button onClick={handleClickRegister} className="btn btn-primary btn-block mb-2"> Cadastrar </button>
          <button onClick={handleClickLogin} className="btn btn-secondary btn-block"> Login </button>
        </div>
      </div>
    </div>
  )

}