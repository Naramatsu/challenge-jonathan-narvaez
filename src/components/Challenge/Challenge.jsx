import React from 'react';

const Challenge = () => (
  <div className="task">
    <h3>The Task</h3>
    <p>
      Imagine you've been hired to write an app that will allow people to
      perform searches to know the distance of a route that may consist of 2 or
      more cities, to allow them to plan their travel.
    </p>
    <br />
    <p>
      Imagine that the backend API can <b>NOT</b> return you the full list of
      cities, and you'll need to search the cities with a keyword.
    </p>
    <br />
    <p>
      The app should consist of two pages: the search form (home page) and the
      search results.
    </p>
    <br />
    <p>
      <b>On the home page </b>there should be a search form. The form should
      consist of the following fields:
    </p>
    <ol>
      <li>
        City of origin. Required to fill. A searchable dropdown (combobox) with
        a list of cities. The list of cities should be requested and searched
        asynchronously with the loading indication.
      </li>
      <li>
        Intermediate cities. Same as <b>City of origin</b>. There should be a
        way to add/remove multiple intermediate cities. No intermediate cities
        should be shown when the page is first loaded. If an intermediate city
        is added it has to be filled.
      </li>
      <li>
        City of destination. Required to fill. Same as <b>City of origin</b>.
      </li>
      <li>
        Date of the trip. Required to fill. Should be a date in the future.
      </li>
      <li>
        Number of passengers. Required to fill. Should be a number greater than
        0.
      </li>
    </ol>
    <br />
    <p>
      The form should be validated. If some field has an invalid value the error
      should be shown around the problematic field and the submit button should
      be disabled. The submit button when clicked should navigate to the search
      results page.
    </p>
    <br />
    <p>
      The home page should allow deep-linking: form data should store in the
      URL, so when a user copy and share the link, the form can be pre-filled
      with the data from the URL parameters.
    </p>
    <br />
    <p>
      <b>On the search results page</b> all the fields filled on the home page
      should be displayed. The distance of the route (in kilometers) should be
      calculated and displayed: between subsequent cities of the route and the
      total distance. The distance calculation should be performed
      asynchronously with loading indication and error handling.
    </p>
    <br />
    <p>
      The search results page should take all parameters from the URL, meaning
      that the link to a particular search result can be shared with others.
    </p>
    <br />
    <h3>Technical Requirements</h3>
    <p>
      The application should be implemented as a SPA (single page application)
      using React. Usage of libraries to speed up the development and app
      quality is very welcome, as well as usage of a design system of your
      choice to provide the best user experience possible in the shortest time
      frame. Usage of a typing system (TypeScript, Flow Types) is a big plus.
    </p>
    <br />
    <p>
      To implement a cities database hardcode the list of cities and simulate
      the delay of requesting the cities. You can find an example list of cities
      in the Appendix A. The fake backend should have two endpoints (functions).
      The first endpoint receives a keyword and returns a list of cities that
      match the keyword. The second endpoint receives a list of cities and
      calculates the distances.
    </p>
    <br />
    <p>
      When a user attempts to find cities using the phrase “fail”
      (case-insensitive) the mocked API should fail to return results to
      demonstrate the error handling abilities of the UI.
    </p>
    <br />
    <p>
      To implement the distance calculation use Haversine distance formula and
      simulate the delay of the calculation. When “Dijon” city is involved the
      distance calculation should fail to demonstrate the error handling
      abilities of the UI.
    </p>
    <br />
    <p>
      Deploy your app to the place of your choice, share a link that we can open
      to play with the app. Publish your source code to GitHub/GitLab/Bitbucket
      and share the publicly accessible link to the repository so we can analyze
      the code.
    </p>
    <br />
    <p>
      You will have bonus points if you will demonstrate how the app can be
      tested using unit tests and e2e tests, no full coverage required.
    </p>
    <br />
    <p>We hope you will enjoy working on the project.</p> <br />
    <p>Good luck!</p> <br />
  </div>
);

export default Challenge;
