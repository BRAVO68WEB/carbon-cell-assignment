# Carbon Cell Assignment

## Task 1: Create a API with JWT Authentication (User Creation, Login and Logout)

- /task1/register (POST) - To register a user
- /task1/login (POST) - To login a user
- /task1/logout (GET) - To logout a user

## Task 2: Create a filtered route to an external API

- /task2/fetch (GET) - To get the filtered data from an external API
    - Query Params:
        `pageNo`:  (default: 1) - Page number
        `category`: (default: '') - Category of the data
        `perPage`: (default: 10) - Number of data per page
        `searchTerm`: (default: '') - Search term
        `sortBy`: (default: 'id') - Sort by field
        `sortOrder`: (default: 'asc') - Sort order

## Task 3: Create Swagger Documentation for the API

- /task3 (GET) - To get the swagger documentation

## Task 4: Create a Secured API Endpoint for Authenticated Users

- /task4/secure (GET) - To get the secured data
    - Header:
        `Authorization`: Bearer <JWT>
- /task4/whoami (GET) - To get the user details
    - Header:
        `Authorization`: Bearer <JWT>
    
## Task 5: Create a route to Retrieve Ethereum Account Balance with web3.js

- /task5/balance/:address (GET) - To get the Ethereum account balance
    - Query Params:
        `address`: Ethereum address

