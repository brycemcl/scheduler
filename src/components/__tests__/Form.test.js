import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByTestId } = render(<Form interviewers={interviewers} />);
    expect(getByTestId('student-name-input')).toHaveValue('');
  });
  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByTestId, getByText } = render(
      <Form interviewers={interviewers} name="" onSave={onSave} />
    );
    expect(getByTestId('student-name-input')).toHaveValue('');
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));
    expect(
      getByText(/Please enter your name & select an interviewer./i)
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave function when the name is defined', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText, getByText, getByTestId } = render(
      <Form
        id={1}
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        interviewer={interviewers[0]}
        onSave={onSave}
      />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(
      queryByText(/Please enter your name & select an interviewer./i)
    ).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Lydia Miller-Jones' })
    );
  });
});
