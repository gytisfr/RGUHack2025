import structs
import sqlite3, os

os.chdir("\\".join(__file__.split("\\")[:-1]))

class users:
    def insert(id : int):
        pass

    def get():
        pass

    def check():
        pass

    def modify():
        pass

    def remove(id : int):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        cursor.execute(f"delete from users where id = {id}")

class encounters:
    def insert(uid, animal, animalType, location, time, extra, token):
        pass