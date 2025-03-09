import { useOutletContext, useNavigation, Form } from 'react-router-dom'

import { FormRow } from 'components'
import Wrapper from 'assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()

  const { name, lastName, email, location } = user
  const isSubmitting = navigation.state === 'submitting'

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
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
