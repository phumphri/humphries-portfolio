
# Upgrade libraries.
# import os
# os.system("python -m pip install --upgrade pip")
# os.system("python -m pip install --upgrade flask")
# os.system("python -m pip install --upgrade flask_cors")


# os.system("pip install flask")
# os.system("pip install flask_cors")

# from requests.models import Response
import flask
import socket
import json
from flask import (
    Response,
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from werkzeug.exceptions import NotFound, InternalServerError
from flask_moment import Moment
import datetime

# Assigning the Flask framework.
app = Flask(__name__)

# Index page.
@app.route("/")
def home():
    return render_template("index.html", project_name="Portfolio", current_time=datetime.datetime.utcnow())

# Input parameter from URL and template returning the parameter.
@app.route("/user/<string:name>")
def user(name):
    user_name = name
    return render_template("user.html",name=user_name)

# Process the Sandbox 3 form.
@app.route('/sandbox_3', methods=['POST'])
def transaction():
    print('\nstart sandbox_3.transaction()')
    print(request.headers)

    if request.method == 'POST':
        print('Processing POST request')
        try:
            data_string = request.get_data().decode('utf-8')
            data_list = data_string.split('\r\n')
            for data_entry in data_list:
                print(data_entry)

        except UnicodeDecodeError as e:
            print(str(e))
            print(str(request))
        except Exception as f:
            print(str(f))
    else:
        print('POST was not found.')

    print('end sandbox_3.transaction()')
    return render_template("sandbox_3.html")

# Determine if running on home workstation, laptop, or from a deployment server.
if __name__ == "__main__":
    hostname = socket.gethostname()
    print("socket.hostname():", hostname)

    bootstrap = Bootstrap(app)
    print("type(bootstrap):", bootstrap)
    
    if (hostname == 'XPS'):
        app.run(debug=True)
    elif (hostname == 'DESKTOP-S08TN4O'):  
        app.run(debug=True)
    else:
        from os import environ
        print("Port", environ.get("PORT", "Not Found"))
        app.run(debug=False, host='0.0.0.0', port=int(environ.get("PORT", 5000)))

    

