import React from 'react';

import {
  render,
  // prettyDOM,
  getAllByTestId,
  cleanup,
  waitForElement,
  fireEvent,
  getByText as getByTextGlobal,
  // getByAltText,
} from '@testing-library/react';

import Application from 'components/Application';

describe('Application', () => {
  afterEach(cleanup);
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday'))
      .then(() => fireEvent.click(getByText('Tuesday')))
      .then(() => waitForElement(() => getByText('Monday')))
      .then(() => expect(getByText('Leopold Silvers')).toBeInTheDocument());
  });
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    // Render the Application.
    const {
      container,
      debug,
      getByText,
      getAllByAltText,
      getByAltText,
      getByPlaceholderText,
    } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText('Archie Cohen'));
    // console.log(prettyDOM(container));

    // Click the "Add" button on the first empty appointment.
    fireEvent.click(getAllByAltText('Add')[0]);
    await waitForElement(() => getByPlaceholderText('Enter Student Name'));
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText('Sylvia Palmer'));
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText('Save'));
    // Check that the element with the text "Saving" is displayed.
    expect(getByText('Saving')).toBeInTheDocument();
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText('Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      getByTextGlobal(day, 'Monday')
    );
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    await waitForElement(() => getByText('no spots remaining'));
    expect(getByTextGlobal(day, 'no spots remaining')).toBeInTheDocument();
    // debug();
  });
  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', () => {});
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', () => {});
  it('shows the save error when failing to save an appointment', () => {});
  it('shows the delete error when failing to delete an existing appointment', () => {});
});
