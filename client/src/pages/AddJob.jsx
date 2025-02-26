import { Form, useNavigation } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import { FormRow } from 'components'
import Wrapper from 'assets/wrappers/DashboardFormPage'
import { FormRowSelect } from 'components/index'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants.js'

const AddJob = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>

        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="Job location"
            name="jobLocation"
            defaultValue={user.location}
          />

          <div className="form-row">
            <FormRowSelect
              labelText="Job status"
              name="jobStatus"
              defaultValue={JOB_STATUS.PENDING}
              list={Object.values(JOB_STATUS)}
            />
            <FormRowSelect
              name="jobType"
              labelText="Job type"
              defaultValue={JOB_TYPE.FULL_TIME}
              list={Object.values(JOB_TYPE)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
