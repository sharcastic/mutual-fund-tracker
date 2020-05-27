# MUTUAL FUND TRACKER

This project is currently hosted at [http://mutual-fund-tracker.now.sh/](http://mutual-fund-tracker.now.sh/).

To run this locally, you would need configuration values to connect with firebase. These are currently being added as an environmental variable. Please let me know if you need these values.

This project was built with Create React App. 

## There are some assumptions that were made to complete this application. I'm mentioning them below :

- The email and password is stored in Firebase and the application is not currently validating if the email actually belongs to the user.
- The password can be anything with 6 or more characters.
- The data for the mutual funds is coming from [https://www.mfapi.in/](https://www.mfapi.in/) which has a few limitations on its own.
  - The search endpoint only returns the name of the Mutual Fund. Due to this, I have had to mock the price changes and some mutual fund details like the fund house for that particular mutual fund. This mocking is picked randomly from a handful of items that are previously defined.
  - The fund specific endpoint returns price values but these are quite haphazard and irregular. Some might have values for only one year from 2005 to 2006 but some might have values from the last 10 years. Due to this uncertainty, not a lot of features could be added to the chart component itself.
- The user doesn't automatically get signed out everytime he closes or navigates away from the application. 

