import sqlite3, bcrypt, typing, datetime, random, jwt, os

os.chdir("\\".join(__file__.split("\\")[:-1]))

chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

secret = "5a13f6c8-7927-40c8-8ff7-f29ba1935aa3"

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
    def insert(email : str, username : str, password : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        email, username = encode([email, username])

        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(password, salt)
        hash = encode(hash)

        try:
            cursor.execute(f"insert into users values('{email}', '{username}', '{password}')")
        except Exception as e:
            return str(type(e)).removeprefix("<class '").removesuffix("'>") + ": " + str(e)

        cursor.commit()
    
    def login(username : str, password : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        username = encode(username)

        passwordHash = cursor.execute(f"select password from users where username = '{username}'").fetchall()

        if not passwordHash:
            return False

        passwordHashDecoded = decode(passwordHash)
        bcrypt.checkpw(password, passwordHashDecoded)

        username = decode(username)

        preToken = {"username": username, "timestamp": datetime.datetime.now().timestamp()}
        token = jwt.encode(preToken, secret, algorithm="HS256")

        return token
    
    def logout(token : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        token = encode(token)

        cursor.execute(f"update user where token = '{token}' set token = ''")

    def check(username : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        username = encode(username)

        check = cursor.execute(f"select * from users where username = '{username}'").fetchall()
        
        return (check)

    def modify(username : str, what : str, to : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        username, what, to = encode([username, what, to])

        try:
            cursor.execute(f"update users set {what} = '{to}' where username = '{username}'")
        except Exception as e:
            return str(type(e)).removeprefix("<class '").removesuffix("'>") + ": " + str(e)
        
        cursor.commit()

    def remove(username : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        username = encode(username)

        cursor.execute(f"delete from users where username = {username}")
        cursor.commit()

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

        return dict(zip(["uniqueID", "animal", "type", "lng", "lat", "time", "username", "verified", "extra"], encounter))

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

        return [dict(zip(["uniqueID", "animal", "type", "lng", "lat", "time", "username", "verified", "extra"], encounter)) for encounter in encounters]

    def modify(uniqueID : str, what : str, to : typing.Union[str, int, float, bool]):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID, what = encode([uniqueID, what])

        if type(to) == str:
            to = encode(to)
        
        try:
            cursor.execute(f"""update encounters set {what} = {"'" if type(to) == str else ""}{to}{"'" if type(to) == str else ""} where uniqueID = '{uniqueID}'""")
        except Exception as e:
            return str(type(e)).removeprefix("<class '").removesuffix("'>") + ": " + str(e)

        cursor.commit()
        return True

    def remove(uniqueID : str):
        connection = sqlite3.connect("db.sqlite3")
        cursor = connection.cursor()

        uniqueID = encode(uniqueID)
        
        cursor.execute(f"delete from encounters where uniqueID = '{uniqueID}'")