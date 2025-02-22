import structs
import sqlite3, typing, os

os.chdir("\\".join(__file__.split("\\")[:-1]))

def encode(text : typing.Union[int, list]):
    #"   %22
    #'   %27
    #\   %5C
    #-   %2D
    #%   %25
    if type(text) == list:
        new = []
        for entry in text:
            if type(entry) == str:
                new.append(entry.replace("%", "%25").replace("-", "%2D").replace("\\", "%5C").replace("'", "%27").replace('"', "%22"))
            else:
                new.append(entry)
        return new
    elif type(text) == str:
        text = text.replace("%", "%25").replace("-", "%2D").replace("\\", "%5C").replace("'", "%27").replace('"', "%22")
        return text

def decode(text : typing.Union[int, list]):
    if type(text) == list:
        new = []
        for entry in text:
            if type(entry) == str:
                new.append(entry.replace("%22", '"').replace("%27", "'").replace("%5C", "\\").replace("%2D", "-").replace("%25", "%"))
            else:
                new.append(entry)
        return new
    elif type(text) == str:
        text = text.replace("%22", '"').replace("%27", "'").replace("%5C", "\\").replace("%2D", "-").replace("%25", "%")
        return text

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
    def insert(animal : str, animalType : str, longitude : float, latitude : float, time : int, verified : bool, token : str, extra : str = None):
        pass

    def get(uniqueID : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID = encode(uniqueID)

        encounter = list(cursor.execute(f"select * from encounters where uniqueID = '{uniqueID}'").fetchall()[0])

        encounter[0] = decode(encounter[0])

        return encounter

    def check():
        pass

    def fetch():
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        encounters = cursor.execute(f"select * from encounters order by time desc limit 10").fetchall()

        encounters = [list(encounter) for encounter in encounters]

        for encounter in encounters:
            encounter[0] = decode(encounter[0])

        return [dict(zip(["uniqueID", "animal", "animalType", "longitude", "latitude", "time", "userID", "verified", "extra"], encounter)) for encounter in encounters]

    def modify():
        pass

    def remove():
        pass
