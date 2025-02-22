class encounter:
    def __init__(self, data : list):
        self.uid = data[0]
        self.animal = data[1] 
        self.animaltype = data[2]
        self.userid = data[3]
        self.location = data[4]
        self.time = data[5]
        self.extra = data[6]
        self.verified =  data[7]