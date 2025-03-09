import { Form, Link } from 'react-router-dom'

import { Logo, FormRow, SubmitBtn } from 'components'
import Wrapper from 'assets/wrappers/RegisterAndLoginPage'

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="smith"
        />
        <FormRow type="text" name="location" defaultValue="my city" />
        <FormRow type="email" name="email" defaultValue="john@gmail.com" />

        <FormRow type="password" name="password" defaultValue="secret123" />

        <SubmitBtn />

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
