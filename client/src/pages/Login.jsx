import { Form, Link, useNavigate } from 'react-router-dom'

import { Logo, FormRow, SubmitBtn } from 'components'
import Wrapper from 'assets/wrappers/RegisterAndLoginPage'
import { loginDemoUser } from 'utils/actions'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />

        <SubmitBtn />

        <button
          type="button"
          className="btn btn-block"
          onClick={() => loginDemoUser({ navigate })}
        >
          Explore the app
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
