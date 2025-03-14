import { useLoaderData, Form } from 'react-router-dom'

import { FormRow, FormRowSelect, SubmitBtn } from 'components'
import Wrapper from 'assets/wrappers/DashboardFormPage'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants' // BE constants

const EditJob = () => {
  const { job } = useLoaderData()

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="Job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="Job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
