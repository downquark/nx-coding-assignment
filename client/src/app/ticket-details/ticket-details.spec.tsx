import {cleanup, fireEvent, render} from '@testing-library/react';

import TicketDetails from "./ticket-details";

describe("TicketDetails", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TicketDetails />);
    expect(baseElement).toBeTruthy();
  });afterEach(cleanup);

  it('CheckboxWithLabel changes the text after click', () => {
    const {queryByLabelText, getByLabelText} = render(
      <TicketDetails />,
    );
  
    expect(queryByLabelText(/completed/i)).toBeTruthy();
  
    fireEvent.click(getByLabelText(/completed/i));
  
    expect(queryByLabelText(/completed/i)).toBeTruthy();
  });
});
