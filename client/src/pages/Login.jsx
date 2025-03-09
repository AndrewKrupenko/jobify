import { Form, Link } from 'react-router-dom'

import { Logo, FormRow, SubmitBtn } from 'components'
import Wrapper from 'assets/wrappers/RegisterAndLoginPage'

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />

        <SubmitBtn />

        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
