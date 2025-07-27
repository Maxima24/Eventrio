class Clock:
    def __init__(self,seconds=0,minutes=0,hours=0):
        self.hours =hours%24
        self.minutes = minutes%60
        self.seconds = seconds%60
    def tick(self):
        self.seconds +=1
        if self.seconds ==60:
            self.minutes = 1
            self.seconds =0
            if self.minutes ==1:
                self.minutes =0
                self.hours = 1
                if self.hours ==1:
                    self.hours = 0      
    def __str__(self):
        return f"{self.hours:02}:{self.minutes:02}:{self.seconds:02}"      
            
clock = Clock(23,59,59)
print(clock)
clock.tick()            
print(clock)