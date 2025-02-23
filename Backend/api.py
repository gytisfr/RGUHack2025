import fastapi, typing, os
from fastapi.middleware.cors import CORSMiddleware
import dbint

os.chdir("\\".join(__file__.split("\\")[:-1]))

api = fastapi.FastAPI(
    title = "Nature",
    description = "Team 4 RGUHack 2025 Project, Go Team!",
    version = "0.0.1",
    openapi_tags = [],
    terms_of_service = "https://www.mcdonalds.com/gb/en-gb/terms-and-conditions.html"
)

origins = ["*"]

with open("hostIPs.txt", "r+") as f:
    for el in f:
        origins.append("http://" + el.rstrip("\n") + ":50891/")
        origins.append("http://" + el.rstrip("\n") + ":50891")

api.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@api.get("/")
def root():
    return {"code": 200}

class users:
    @api.post("/user")
    def createUser(email, username, password):
        pass

class encounters:
    @api.post("/encounter")
    def createEncounter(animal : str, animalType : str, longitude : float, latitude : float, extra : str = None): #token/authentication
        token = 1
        dbint.encounters.insert(animal, animalType, longitude, latitude, token, extra)

    @api.get("/encounter")
    def getEncounter(uniqueID : str):
        encounter = dbint.encounters.get(uniqueID)
        return encounter

    @api.get("/encounter/fetch")
    def fetchEncounters():
        encounters = dbint.encounters.fetch()
        return encounters

import uvicorn
uvicorn.run(api, port=50892, host="0.0.0.0")
"""
Status Codes
200 - OK
201 - Created
400 - Bad Request - Client error, server can/will not process request
401 - Unauthorized - Unauthenticated, no credentials attached
403 - Forbidden - Authenticated, unpermitted
404 - Not Found - Server cannot find requested resource
"""