import eel
import manager
import json

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
        project = manager.Project()
        project.name = name
        for tag in tags:
            project.add_tag(tag)
        project.save()

    @staticmethod
    @eel.expose
    def parseJoinData(login: str, pin: str):
        manager.System.update_auth_data(login, pin)
    
    @staticmethod
    @eel.expose
    def verifyPin(pin: str):
        print(f"{pin}")

    @staticmethod
    @eel.expose
    def ifJoinDataExist():
        with open("./data/data.json") as jsonFile:
            jsonData = json.load(jsonFile)
            if jsonData['login'] == "" or jsonData['password'] == "":
                return False
            return True
        
    @staticmethod
    @eel.expose
    def returnSingleProject(id):
        print_text = []
        project = manager.Project()
        project.find(id)
        print_text.append(["id:", str(project.id)])
        print_text.append(["name:", project.name])
        print_text.append(["tasks:", str(project.tasks)])
        print_text.append(["tags:", str(project.tags)])
        return print_text

    @staticmethod
    @eel.expose
    def getNameById(id: int):
        project = manager.Project()
        project.find(id)
        return project.name

# FILES Class. Class containing functions, which make us able to read lines from files out of the `assets` directory
class FILES:
    @staticmethod
    @eel.expose
    def getProjects():
        with open("./assets/projects.json") as data:
            print(data.read())
            return data.read()
        
    @staticmethod
    @eel.expose
    def convertProjectsToOneJson():
        """Function, which merges projects into one `info_projects.json` file and converts it into the ul and li html element."""
        returnValue = "["
        with open('./data/data.json') as data:
            jsonData = json.load(data)
            for index in range(1, jsonData["last_project_id"]+1):
                with open(f"./data/{manager.System.formatid(index)}/info.json") as file:
                    returnValue = f"{returnValue}{file.readline()}"
                if not index == jsonData["last_project_id"]:
                    returnValue = f"{returnValue},"
        returnValue = f"{returnValue}]"
        with open("./assets/projects.json", "w") as projects:
            projects.write(returnValue);

if __name__ == '__main__':
    FILES.convertProjectsToOneJson()
    GUI.init()