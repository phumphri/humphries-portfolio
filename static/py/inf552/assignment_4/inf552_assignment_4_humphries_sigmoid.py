#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import statistics
get_ipython().run_line_magic('matplotlib', 'inline')


# In[ ]:


def preamble():
    print(' ')
    print('Logistic Regression Algorithm')
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
    print('In order to calculate the best accuracy with the')
    print('minimum weight values, all 7,000 iterations are run.')
    print('When the program is done, "Done!" will be displayed.')
    print(' ')


# In[ ]:


def load_data():
    '''
    Load the attributes into vector X, which contains three columns,
    one for each column in the input file.
    
    Load the labels from the fifth column into vector L.
    
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
    
    # Create a vector for the weights.
    W = np.zeros(3)
    
    # Display control totals.
    print('Negative Values:', negative_values, round((negative_values/total_values),4))
    print('Positive Values:', positive_values, round((positive_values/total_values),4))
    print('Total Values:', total_values)
    
    # Return the input data and corresponding lables.
    return (X,L,W)


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
    for dimensions in X:   
        
        x = dimensions[0]
        y = dimensions[1]
        z = dimensions[2]
        
        if L[i] < 0:
            ax.scatter(x, y, z, color='b')
        else:
            ax.scatter(x, y, z, color='r')
            
        i += 1
        
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')

    plt.show()


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


def sklearn_perceptron():
    from sklearn.datasets import load_digits
    from sklearn.linear_model import Perceptron
    X, y = load_digits(return_X_y=True)
    clf = Perceptron(tol=1e-3, random_state=0)
    clf.fit(X, y)

    print(' ')
    print('sklearn perceptron')
    print('clf.score(X, y):', clf.score(X, y))


# In[ ]:


def calculate_model(X,L,W,I,R):
    '''
    Use training data (X) and labels (L) to refine weights (W)
    until there is no change in weights or the limit of 
    iterations (I) is reached.
    
    Return dictionary B which contains the best accuracy and 
    the associated weights.  Iterations and misses are used
    to plot misses versus iterations outside of this function.
    '''
    # Since the label values are either +1 or -1, the decision point
    # is assumed to be zero.
    decision_point = 0.5

    # Return a dictionary of the best accuracy and the associated weights.
    B = {"accuracy":0.0, 
         "weights": np.zeros(3),
         "iterations": [],
         "misclassified": []
        }
    
    # Used in messages and limiting processing.
    iteration = 0
    
    # Calculate weights.
    for iteration in range(I):
        for i in range(len(X)):
            x = X[i]
            l = L[i] 
            y = x @ W
            d = l - y
            for j in range(len(W)):
                W[j] = W[j] + R * d * x[j]

        #  Make predictions and compare to labels.
        count = 0
        correct = 0
        i = 0
        for x in X:
            count += 1
            y = x @ W
            sigmoid = np.exp(y)/(1 + np.exp(y))
            if sigmoid < decision_point:
                prediction = -1
            else:
                prediction = +1
            if prediction == L[i]:
                correct += 1
            i += 1
            
        # Calculate accuracy.
        accuracy = correct / count
        
        # Update the best accuracy when greater is detected.
        # Update the weights if lower weights are detected.
        if accuracy > B["accuracy"]:
            B["accuracy"] = accuracy
            B["weights"] = np.copy(W)
            B["iteration"] = iteration
        elif accuracy == B["accuracy"]:
            if np.less(W, B["weights"]).all():
                B["weights"] = np.copy(W)
                B["iteration"] = iteration
        
        # Count the misclassified per iteration.
        # This is to be plotted later.
        B["iterations"].append(iteration)
        misclassified = 2000 - correct
        B["misclassified"].append(misclassified)

        # Display progress.
        if iteration % 1000 == 0:
            print('Iteration:', iteration, 'Accuracy:', B["accuracy"], 'Weights:', B["weights"])
             
    # Return the best accuracy and associated weights.
    return B


# In[ ]:


def plot_missclassified(B,n):
    
    x = B["iterations"]
    y = B["misclassified"]
    
    x = x[:n]
    y = y[:n]
    
    fig, ax = plt.subplots()
    ax.plot(x,y)
    ax.set_title('Misclassified by Iteration')

    # This is used in Jupyter Notebook while using the "monokai" theme
    # so the labels are visible.
    if False:
        fig.savefig("test.png")
        image = mpimg.imread("test.png")
        plt.imshow(image)
        
    plt.show()


# In[ ]:


# main:  All processing is contolled from here.

# Print identification data.
if True:
    preamble()

# Load training data and initialize differences.
(X,L,W) = load_data()

# Check visually if the data could be bifurcated.
if True:
    title = 'Sanity Check:  There Are No Apparent Regions'
    plot_data_3d(X,L,title)
    plot_data_2d(X,L,0,1)
    plot_data_2d(X,L,0,2)
    plot_data_2d(X,L,1,2)

# Calculate the weights.
# X:  Training data.
# L:  Training labels.
# W:  Weights.
# I:  Maximum iterations allowed.
# R:  Learning Rate
if True:
    I = 7001
    R = 0.000002
    B = calculate_model(X,L,W,I,R)
    print(' ')
    print('Best Accuracy:', B["accuracy"])
    print('Weights:', B["weights"])
    print('Iteration:', B["iteration"])
    print('Misclassified:', B["misclassified"][B["iteration"]])
    print('Iterations:', I)
    print('Learning Rate:', R)
    print(' ')

# Plot miclassified versus iterations.
if True:
    # Limit the number of data points.
    n = 7000
    plot_missclassified(B,n)

# Run the sklearn.linear_model.Perceptron package.
if True:
    sklearn_perceptron()

print(' ')
print('Done!')

