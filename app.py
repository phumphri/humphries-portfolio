
print('Updating libraries.')
import os
if True:
    os.system("python -m pip install --upgrade pip")
    os.system("python -m pip install --upgrade flask")
    os.system("python -m pip install --upgrade flask_cors")
    os.system("python -m pip install --upgrade flask_bootstrap")
    os.system("python -m pip install --upgrade flask_moment")
    os.system("python -m pip install --upgrade datetime")
    os.system("python -m pip install --upgrade werkzeug")
    os.system("python -m pip install --upgrade werkzeug.execeptions")

print('Importing libraries.')
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
from werkzeug.exceptions import NotFound, InternalServerError, NotImplemented
from flask_moment import Moment
import datetime

# Assigning the Flask framework.
app = Flask(__name__)


# INF554:  Information Visualization
@app.route('/inf554/<assignment>', methods=['GET'])
def inf554(assignment):


    if assignment == 'index':
        return render_template('inf554/index.html', 
            project_name="Information Visualization", 
            current_time=datetime.datetime.utcnow()), 200
    elif assignment == 'assignment_1':
        return render_template('inf554/assignment_1.html', 
            project_name="South America Energy", 
            current_time=datetime.datetime.utcnow()), 200
    elif assignment == 'assignment_2':
        return render_template('inf554/assignment_2.html', 
            project_name="South America Energy", 
            current_time=datetime.datetime.utcnow()), 200
    else:
        raise  NotImplemented()

# INF552:  Introduction to Machine Learning
@app.route('/inf552/<assignment>', methods=['GET'])
def inf552(assignment):

    if assignment == 'index':
        return render_template('inf552/index.html', 
            project_name="Machine Learning", 
            current_time=datetime.datetime.utcnow()), 200
    else:
        raise  NotImplemented()

# INF553:  Foundations and Applications of Data Mining
@app.route('/inf553/<assignment>', methods=['GET'])
def inf553(assignment):

    if assignment == 'index':
        return render_template('inf553/index.html', 
            project_name="Data Mining", 
            current_time=datetime.datetime.utcnow()), 200
    elif assignment == 'assignment_1':
        return render_template('inf553/assignment_1.html', 
            project_name="Data Mining", 
            current_time=datetime.datetime.utcnow()), 200
    else:
        raise  NotImplemented()

# INF555:  Interaction Design and Usability Testing
@app.route('/inf555/<assignment>', methods=['GET'])
def inf555(assignment):

    if assignment == 'index':
        return render_template('inf555/index.html', 
            project_name="Design and Testing", 
            current_time=datetime.datetime.utcnow()), 200
    else:
        raise  NotImplemented()


# quickstart
@app.route('/quickstart', methods=['GET'])
def quickstart():

    return render_template('quickstart.html'), 200

# South America Energy
@app.route('/sae', methods=['GET'])
def sae():

    return render_template('sae.html', 
        project_name="South America Energy", 
        message_from_the_application = 'Step One.',
        current_time=datetime.datetime.utcnow()), 200

@app.route('/sae_2', methods=['GET'])
def sae_2():

    return render_template('sae_2.html'), 200
    
# Index page.
@app.route("/")
def home():
    return render_template("index.html", project_name="Portfolio", current_time=datetime.datetime.utcnow())

@app.errorhandler(404)
def page_not_found(e):
    print("type(e):", type(e))
    return render_template('404.html', 
        project_name="Oops!", 
        message_from_the_application = e,
        current_time=datetime.datetime.utcnow()), 404

@app.route("/oops")
def simulate_page_not_found():
    message_from_the_application = 'Relax.  This was only a test.'
    raise NotFound(message_from_the_application)
 
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html', 
        project_name="Bummer!", 
        message_from_the_application = e,
        current_time=datetime.datetime.utcnow()), 500

@app.route("/bummer")
def simulate_internal_server_error():
    message_from_the_application = 'Relax.  This was only a test.'
    raise InternalServerError(message_from_the_application)

@app.errorhandler(501)
def not_implemented(e):
    return render_template('501.html', 
        project_name="Not Implemented", 
        current_time=datetime.datetime.utcnow()), 501

@app.route("/not_implemented")
def raise_not_implemented():
    raise  NotImplemented()


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
            data_string = app.request.get_data().decode('utf-8')
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
    moment = Moment(app)
    

    if (hostname == 'XPS'):
        app.run(debug=False, use_reloader=True)
    elif (hostname == 'DESKTOP-S08TN4O'):  
        app.run(debug=False, use_reloader=True)
    else:
        print("Port", os.environ.get("PORT", "Not Found"))
        app.run(debug=False, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

    

