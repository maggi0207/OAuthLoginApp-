Update the Averaging Schedule table loading behavior.

Currently, when the API call is in progress after clicking **Generate Schedule**, the table area appears empty while the API is loading. Once the API response is received, the data suddenly appears.

### Requirement

* Show a proper **loading indicator** in the Generated Averaging Schedule table/container while the API request is in progress.
* The loading indicator should remain visible until the API response is completed.
* Do not show an empty table during the loading state.
* Once the API succeeds, hide the loading indicator and display the returned schedule data.
* Handle the loading state correctly if the API returns an error as well.

### Important

* **Reuse the existing loading indicator/component already available in the application.**
* Follow the **existing coding pattern and implementation approach** used elsewhere in the codebase for API loading states.
* Do not introduce a new loading component or a different loading mechanism unless absolutely necessary.
* First inspect the existing codebase to identify:

  1. The API call responsible for generating/loading the averaging schedule.
  2. The existing loading indicator/component.
  3. Existing examples of how loading state is handled for similar API calls and tables.
* Implement the fix consistently with those existing patterns.
* Keep the change minimal and avoid unrelated code changes.

The expected behavior is:

**API call starts → Existing loading indicator is displayed → API response received → Loading indicator disappears → Schedule data is displayed.**
