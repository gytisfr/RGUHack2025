import structs
import sqlite3, typing, random, os

os.chdir("\\".join(__file__.split("\\")[:-1]))

chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

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

def validateToken(token : str):
    connection = sqlite3.connect("db.sqlite3")
    cursor = connection.cursor()

    token = encode(token)

    details = cursor.execute(f"select username from users where token = '{token}'").fetchall()

    if not details:
        return False

    return details[0][0]

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
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        username = validateToken(token)

        if not username:
            return False

        animal, animalType = encode([animal, animalType])

        if extra:
            extra = encode(extra)

        uniqueID = encode(encounters.generateUniqueID())

        try:
            cursor.execute(f"insert into encounters values('{uniqueID}', '{animal}', '{animalType}', {longitude}, {latitude}, {time}, '{username}', {verified}, '{extra}')")
        except Exception as e:
            return str(type(e)).removeprefix("<class '").removesuffix("'>") + ": " + str(e)

        cursor.commit()
        return True

    def get(uniqueID : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID = encode(uniqueID)

        encounter = list(cursor.execute(f"select * from encounters where uniqueID = '{uniqueID}'").fetchall()[0])

        encounter[0] = decode(encounter[0])

        return dict(zip(["uniqueID", "animal", "type", "lng", "lat", "time", "userID", "verified", "extra"], encounter))

    def check(uniqueID : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID = encode(uniqueID)

        check = cursor.execute(f"select * from encounters where uniqueID = '{uniqueID}'").fetchall()

        return (check)
    
    def generateUniqueID():
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        isin = True
        while isin:
            uniqueID = encode(random.choice(chars) + random.choice(chars) + random.choice(chars) + random.choice(chars) + "-" + random.choice(chars) + random.choice(chars) + random.choice(chars) + random.choice(chars))
            check = cursor.execute(f"select * from encounters where uniqueID = '{uniqueID}'").fetchall()
            if not check:
                isin = False
        
        return decode(uniqueID)

    def fetch():
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        encounters = cursor.execute(f"select * from encounters order by time desc limit 20").fetchall()

        encounters = [list(encounter) for encounter in encounters]

        for encounter in encounters:
            encounter[0] = decode(encounter[0])

        return [dict(zip(["uniqueID", "animal", "type", "lng", "lat", "time", "userID", "verified", "extra"], encounter)) for encounter in encounters]

    def modify(uniqueID : str, what : str, to : typing.Union[str, int, float, bool]):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID, what = encode([uniqueID, what])

        if type(to) == str:
            to = encode(to)
        
        try:
            encounters = cursor.execute(f"""update encounters set {what} = {"'" if type(to) == str else ""}{to}{"'" if type(to) == str else ""} where uniqueID = '{uniqueID}'""")
        except Exception as e:
            return str(type(e)).removeprefix("<class '").removesuffix("'>") + ": " + str(e)

        cursor.commit()
        return True

    def remove(uniqueID : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID = encode(uniqueID)
        
        cursor.execute(f"delete from encounters where uniqueID = '{uniqueID}'")