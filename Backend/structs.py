class encounter:
    def __init__(self, data : list):
        self.uniqueID = data[0]
        self.animal = data[1] 
        self.animalType = data[2]
        self.longitude = data[3]
        self.latitude = data[4]
        self.time = data[5]
        self.userID = data[6]
        self.verified =  data[7]
        self.extra = data[8]