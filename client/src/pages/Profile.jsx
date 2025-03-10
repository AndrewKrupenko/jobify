import { useOutletContext, Form } from 'react-router-dom'

import { FormRow, SubmitBtn } from 'components'
import Wrapper from 'assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user } = useOutletContext()

  const { name, lastName, email, location } = user

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="Last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
