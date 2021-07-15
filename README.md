# node-api
A simple CRUD API, for users to read, create, update and delete todo list items.

# Run the program
1. run `npm i` to install dependencies
2. create a `.env` file at root directory
3. copy and paste the following contents into `.env` file:
```
NODE_ENV = development
PORT = 8000
MONGO_URI = mongodb://localhost:27017/node-api
TOKEN_SECRET = dalgkdfagwr
```
4. run `npm start` 

# Endpoints
This project has 7 endpoints:
1. `POST /api/auth/register` to register a user

Example body: 
```
{
    "username": "testuser",
    "password": "testtest"
}
```

2. `POST /api/auth/login` to login a user, <b>it will return a `auth-token`, and you will need to include it in the headers of all of the following endpoints</b>

Example body: same as above

3. `GET /api/item` to get all the items
4. `POST /api/item` to add an item

Example body: 
```
{
    "description": "buy a coffee",
    "category": "food"
}
```
5. `PUT /api/item/:id` to update an item

Example body: same as above

6. `DELETE /api/item/:id` to delete an item

7. `POST /api/item/search` to search for items that match the filter

Example body: 
```
{
    "description": "milk",
    "categories": ["entertainment", "food"],
    "owners": ["testuser2", "testuser3"]
}
```
Note: 
- this is an `OR` filter, which means it will return items that match any one of the above conditions
- `description` is a partial text search, it will return items in which the desciption contains the word "milk"
- both `categories` and `owners` are arrays, it will return items that match any one of the word inside the array. 
