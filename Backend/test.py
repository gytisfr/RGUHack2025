import jwt, datetime, os
import dbint

os.chdir("\\".join(__file__.split("\\")[:-1]))

secret = "5a13f6c8-7927-40c8-8ff7-f29ba1935aa3"
data = {"username": "gytisfr", "timestamp": datetime.datetime.now().timestamp()}

print(data)

encoded = jwt.encode(data, secret, algorithm="HS256")

print(encoded)

decoded = jwt.decode(encoded, secret, algorithms=["HS256"])

print(decoded)

input()