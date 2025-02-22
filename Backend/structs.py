class encounter:
    def __init__(self, data : list):
        self.uid = data[0]
        self.location = data[1]
        self.time = data[2]
        self.extra = data[3]