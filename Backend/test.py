import dbint
import os

os.chdir("\\".join(__file__.split("\\")[:-1]))

#a = dbint.encounters.get("w68l-08s9")
a = dbint.encounters.fetch()

print(a)

input()