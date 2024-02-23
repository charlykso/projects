import mysql.connector

# Connect to the database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Password",
    database="demo_db"
)
mycursor = mydb.cursor()
# mycursor.execute("CREATE DATABASE demo_db")
mycursor.execute("USE demo_db")
# mycursor.execute("CREATE TABLE users (name VARCHAR(255), email VARCHAR(255), id INTEGER AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")

mycursor.execute("SHOW TABLES")
for x in mycursor:
    print(x)
