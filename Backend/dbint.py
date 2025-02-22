import structs
import sqlite3, os

os.chdir("\\".join(__file__.split("\\")[:-1]))

class users:
    def insert(email : str, username : str, password : str ):
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
    def insert(uniqueID : str, animal : str, animalType : str, longitude : float, latitude : float, time : int, verified : bool, token : str, extra : str = None):
        pass

    def get():
        pass

    def check():
        pass

    def modify():
        pass

    def remove():
        pass
