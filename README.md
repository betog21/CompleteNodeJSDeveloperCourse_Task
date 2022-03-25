Task app from the course: ["The Complete Node.js Developer Course (3rd Edition)"](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)

## Requeriments:

1. MongoDB Community: please install acording to your operating system.
   Check the [oficial documentation](https://www.mongodb.com/try/download/community) for more details.
2. Robo 3t: please download from the [oficial page](https://robomongo.org/download).

## Setup:

1. Clone the code.
2. Run:

```
npm i
```

3. Create .env file on the rooth folder with this environment values:

```sh
# Set the enviroments variables
SECRETWORD="YOUR_SECRET_WORD"
MONGO_URL=mongodb://127.0.0.1:27017/nameOfYourDataBase
```

4. Create .env.test file on the rooth folder with this environment values:

```sh
# Set the enviroments variables
SECRETWORD="YOUR_SECRET_WORD"
MONGO_URL=mongodb://127.0.0.1:27017/nameOfYourTestDataBase
```

## Aditional notes:

### Run roboto3t on ubuntu:

1. Change directory to Robo3t bin:

```sh
cd /usr/local/bin/robo3t/bin
```

2. Run robo3:

```sh
Run robot 3t
./robo3t
```

### Check status mongodb:

```sh
sudo systemctl status mongodb
```

### Run mongodb on mac:

```sh
brew services start mongodb-community@5.0
```

### Stop mongodb on mac:

```sh
brew services stop mongodb-community@5.0
```

### Promise status:

```js
//                       FULLFIELD
//                       /
//Promise -- PENDING -->
//                       \
//                       REJECTED
```
