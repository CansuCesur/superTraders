# Super Traders Project
Super Traders is a trading game. This project is backend code of this game. It is an example of basic usage of nodejs, docker and postgresql technologies together.

## Dependencies
1. You have to get **Docker** ( The entire project is suitable for running on Docker )
  - The own dependencies of this project in the docker container :
1. Sequalize
2. Sequelize-cli
3. Pg
4. Express
5. Validator
   
## How to Run Project
Please use the given instructions :
1. Clone the project using  **git clone**  command.
2. Open your terminal.
3. Go to project folder using  **cd**  command.
4. Run the project using  **docker compose up**  command. (If you have a problem with node module installations, use command in troubleshooting then try again docker compose up command.)

## API Tests
If you want to test with postman, you can download and import [api collection file for postman](/PostmanCollection.json).

## Troubleshooting
If node packages does not install porperly in docker container, run this command: **docker-compose run --rm app npm install**
