import eel

#
# Main naming rules:
#
# In this file, we name classes using BIG letters, not small. That's because we want to distinguish which classes store only static functions (BIG classes),
# and which store... normal functions?
#

# Python script containing every necessary function to make WayApp up and running... visually

#
# Eel is OpenSource library allowing us to create the most beautiful GUI for WayApp.
# https://github.com/python-eel/Eel/
#

# GUI Class. Class containing functions, which will make us able to 
class GUI:
    @staticmethod
    @eel.expose
    def init():
        eel.init('assets')
        eel.start('index.html', port=2023)
    
    @staticmethod
    @eel.expose
    def joinWindow():
        eel.show('popup_join.html')

    @staticmethod
    @eel.expose
    def verifyPinWindow():
        eel.show('verify_pin.html')

# DATA Class. Class containing connections between the GUI and the... TUI? (I meant the backend)
class DATA:
    @staticmethod
    @eel.expose
    def parseCreateProjectData(name: str, tags):
        print(f"{name}")
        print(f"{tags}") 

    @staticmethod
    @eel.expose
    def parseJoinData(login: str, pin: str):
        print(f"{login}")
        print(f"{pin}")

    @staticmethod
    @eel.expose
    def verifyPin(pin: str):
        print(f"{pin}")

# FILES Class. Class containing functions, which make us able to read lines from files out of the `assets` directory
class FILES:
    @staticmethod
    @eel.expose
    def getProjects():
        with open("./projects.json") as data:
            print(data.read())
            return data.read()


if __name__ == '__main__':
    GUI.init()