#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from sklearn import linear_model
get_ipython().run_line_magic('matplotlib', 'inline')


# In[ ]:


def preamble():
    print(' ')
    print('sklearn')
    print('Patrick Humphries (pvhumphr@usc.edu)')
    print('University of Southern California')
    print('INF 552 Machine Learning for Data Science (32458)')
    print('Programming Assignment 4')
    print('Spring 2020')
    print(' ')
    print('Due to the large amount of data that was provided')
    print('please wait for the first graphic to display.')
    print('Canceling the current graphic will allow the next')
    print('graphic to be displayed.')
    print(' ')
    print('The process for maximizing accuracy and minimizing')
    print('weight change takes nearly 10,000 iterations.  ')
    print('Progress is displayed for every 1,000 iterations.')
    print('When the program is done, "Done!" will be displayed.')
    print(' ')


# In[ ]:


def load_regression_data():
    '''
    The first two columns contain the independent x and y variables.
    These columns are loaded into the X vector.
    
    The third column contains the dependent z variable.  It is 
    considered the label.  It is loaded into the L vector.
    
    Vector W contains weights for the x and y variables.
    '''
    # Define the coordinates training dataset.
    X = []
    
    # Define the labels training dataset.
    L = []
    
    # Create file reference.
    rows = open("linear-regression.txt", "r")
    
    # Define limits for unit testing.
    row_number = 0
    row_limit = 100000
    
    # Process the input file.
    for row in rows:
        row = row.strip()
        fields = row.split(',')
        
        # Add a set of independent variables to the training dataset.
        x = []
        x.append(float(fields[0]))
        x.append(float(fields[1]))
        X.append(x)
        
        # Add the corresponding label to the labels training dataset.
        l = float(fields[2])
        L.append(l)
        
        # Limit the number of rows for the training data.
        row_number += 1
        if row_number > row_limit:
            break
    
    # Convert to vectors.
    X = np.array(X)
    L = np.array(L)
    
    # Indicate the rows loaded.
    print('Rows Loaded:', row_number)
    
    # Return the input data and corresponding lables.
    return (X,L)    


# In[ ]:


def load_classification_data():
    '''
    Load the attributes into vector X, which contains three columns,
    one for each column in the input file.
    
    Load the labels from the fourth column into vector L.
    
    Create the weight vector containing all zeroes as W.
    
    Return X, L, and W.
    '''
    # Define the coordinates training dataset.
    X = []
    
    # Define the labels training dataset.
    L = []
    
    # Create file reference.
    rows = open("classification.txt", "r")
    
    # Define limits for unit testing.
    row_number = 0
    row_limit = 100000
    
    # Define control totals.
    negative_values = 0
    positive_values = 0
    total_values = 0
    
    # Process the input file.
    for row in rows:
        row = row.strip()
        fields = row.split(',')
        
        # Add a set a coordinates to the coordinates training dataset.
        x = []
        x.append(float(fields[0]))
        x.append(float(fields[1]))
        x.append(float(fields[2]))
        X.append(x)
        
        # Add the corresponding label to the labels training dataset.
        l = int(fields[3])
        L.append(l)
        
        # Update control totals.
        if l < 0:
            negative_values += 1
        else:
            positive_values += 1
        total_values += 1
        
        # Limit the number of rows for the training data.
        row_number += 1
        if row_number > row_limit:
            break
    
    # Convert to vectors.
    X = np.array(X)
    L = np.array(L)
    
    # Display control totals.
    print('Negative Values:', negative_values, round((negative_values/total_values),2))
    print('Positive Values:', positive_values, round((positive_values/total_values),2))
    print('Total Values:', total_values)
    
    # Return the input data and corresponding lables.
    return (X,L)


# In[ ]:


def load_logistic_data():
    
    # Define the feature training dataset.
    X = []
    
    # Define the labels training dataset.
    L = []
    
    # Create file reference.
    rows = open("classification.txt", "r")
    
    # Define limits for unit testing.
    row_number = 0
    row_limit = 100000
    
    # Define control totals.
    negative_values = 0
    positive_values = 0
    total_values = 0
    
    # Process the input file.
    for row in rows:
        row = row.strip()
        fields = row.split(',')
        
        # Add a set a coordinates to the coordinates training dataset.
        x = []
        x.append(float(fields[0]))
        x.append(float(fields[1]))
        x.append(float(fields[2]))
        X.append(x)
        
        # Add the corresponding label to the labels training dataset.
        l = int(fields[4])
        L.append(l)
        
        # Update control totals.
        if l < 0:
            negative_values += 1
        else:
            positive_values += 1
        total_values += 1
        
        # Limit the number of rows for the training data.
        row_number += 1
        if row_number > row_limit:
            break
    
    # Convert to vectors.
    X = np.array(X)
    L = np.array(L)
    
    # Display control totals.
    print('Negative Values:', negative_values, round((negative_values/total_values),2))
    print('Positive Values:', positive_values, round((positive_values/total_values),2))
    print('Total Values:', total_values)
    
    # Return the input data and corresponding lables.
    return (X,L)


# In[ ]:


def plot_data_2d(X,L,a,b):
    '''
    Create a two-dimensional scatter plot using two of the three
    dimensions of the training data (X). 
    
    The color of the data point will be determined by the label
    in the label dataset (L).  Blue for negative labels and red
    for positive labels.
    
    Parameters "a" and "b" specify which two of the three dimensions
    to use.
    '''
    fig, ax = plt.subplots()
    
    for i in range(len(X)):
        x = X[i]
        if L[i] < 0:
            ax.scatter(x[a], x[b], c='b')
        else:
            ax.scatter(x[a], x[b], c='r')
            
    ax.set_title('Column ' + str(a) + ' vs. Column ' + str(b))

    # This is used in Jupyter Notebook while using the "monokai" theme
    # so the labels are visible.
    if False:
        fig.savefig("test.png")
        image = mpimg.imread("test.png")
        plt.imshow(image)
        
    plt.show()


# In[ ]:


def linear_regression():
    
    print(' ')
    print('===== Linear Regression =====')
    
   # Load training data and initialize differences.
    (X,L) = load_regression_data()

    # Instantiate and learn a linear regression model.
    # X:  Training data.
    # L:  Training labels.
    model = linear_model.LinearRegression()
    model.fit(X,L)

    # Determine the average error.
    total_error = 0.0
    predictions = []
    for i in range(len(X)):
        x = X[i].copy()
        x = x.tolist()
        y = []
        y.append(x)
        prediction = model.predict(y)
        predictions.append(prediction[0])
        total_error += abs(L[i] - prediction)

    #     total_error += (L[i] - model.predict(x))**2
    print(' ')
    print('Linear Regression Using Sklearn:')
    print('\tTotal Error:', total_error)
    print('\tAverage Error:', total_error / len(X))
    print(' ')
    print('Linear Regession from Scratch:')
    average_error = 0.0021377154805266294
    total_error = len(X) * average_error
    print('\tTotal Error:', total_error)
    print('\tAverage Error:', total_error / len(X))
    print(' ')
    
    
    title = 'Regression Data'
    plot_data_3d(X,L,title)
    
    title = 'Predictions'
    plot_data_3d(X,predictions,title)


# In[ ]:


def plot_data_3d(X,L,title):
    '''
    Plot a scatter plot with three-dimensional coordinates in
    each row of the training dataset (X).
    
    Set the color of each datapoint based on the entries in the
    label dataset (L).  Blue for negative values and red for positive.
    '''
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d', alpha=0.5)
    ax.set_title(title)
    
    i = 0
    x = []
    y = []
    z = []
    
    for i in range(len(X)):
        x.append(X[i][0])
        y.append(X[i][1])
        z.append(L[i])
                 
    ax.scatter(x, y, z, c=z)
        
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')

    plt.show()


# In[ ]:


def perceptron():
    
    print(' ')
    print('===== Perceptron =====')
    
    (X,L) = load_classification_data()
    
    
    # Instantiate and learn a linear regression model.
    # X:  Training data.
    # L:  Training labels.
    model = linear_model.Perceptron()
    model.fit(X,L)

    # Determine the average error.
    correct = 0
    predictions = []
    for i in range(len(X)):
        x = X[i].copy()
        x = x.tolist()
        y = []
        y.append(x)
        prediction = model.predict(y)
        if prediction < 0.0:
            prediction = -1
        else:
            prediction = +1
        if prediction == L[i]:
            correct += 1

    #     total_error += (L[i] - model.predict(x))**2
    print(' ')
    print('Perceptron using Sklearn:')
    print('\tAccuracy:', round((correct / len(X)),2))
    print(' ')
    print('Perceptron from Scratch:')
    print('\tAccuracy:', 0.99)
    print(' ')


# In[ ]:


def logistic():
    
    print(' ')
    print('===== Logistic =====')
    
    (X,L) = load_logistic_data()
    
    
    # Instantiate and learn a linear regression model.
    # X:  Training data.
    # L:  Training labels.
    model = linear_model.LogisticRegression(solver='lbfgs')
    model.fit(X,L)

    # Determine the average error.
    correct = 0
    predictions = []
    for i in range(len(X)):
        x = X[i].copy()
        x = x.tolist()
        y = []
        y.append(x)
        prediction = model.predict(y)
        if prediction < 0.0:
            prediction = -1
        else:
            prediction = +1
        if prediction == L[i]:
            correct += 1

    #     total_error += (L[i] - model.predict(x))**2
    print(' ')
    print('Logistic Classification using Sklearn:')
    print('\tAccuracy:', round((correct / len(X)),2))
    print(' ')
    print('Logistic Classification from Scratch:')
    print('\tAccuracy:', 0.5235)
    print(' ')


# In[ ]:


# main:  All processing is controlled here.

# Print identification data.
if False:
    preamble()
    
# Execute sklean models.
if True:
    perceptron()

if True:
    logistic()
    
if True:
    linear_regression()



# Run the sklearn.linear_model.Perceptron package.

print(' ')
print('Done!')

