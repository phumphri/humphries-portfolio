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
    print('Perceptron Learning Algorithm')
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


def load_data():
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
    
    # Create a vector for the weights.
    W = np.zeros(3)
    
    # Display control totals.
    print('Negative Values:', negative_values, round((negative_values/total_values),2))
    print('Positive Values:', positive_values, round((positive_values/total_values),2))
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


def plot_results(plot_parameters):
    from scipy.stats import norm
    
    # Define constants.
    mu_n = plot_parameters["negatives"]["mean"]
    sigma_n = plot_parameters["negatives"]["sigma"]
    x1_n = plot_parameters["negatives"]["min"]
    x2_n= plot_parameters["negatives"]["max"]
    
    mu_p = plot_parameters["positives"]["mean"]
    sigma_p = plot_parameters["positives"]["sigma"]
    x1_p = plot_parameters["positives"]["min"]
    x2_p= plot_parameters["positives"]["max"]
    
    dp = plot_parameters["decision point"]
    
    s = 'Negative: ' + str(round(mu_n,4)) + ', Decision: '         + str(round(dp, 4)) + ', Positive: ' + str(round(mu_p,4))  
    print(' ')
    print('Negatives:')
    print('\tMean:', round(mu_n, 4))
    print('\tSigma:', round(sigma_n, 4))
    print('\tMin:', round(x1_n, 4))
    print('\tMax:', round(x2_n, 4))
    print(' ')
    print('Positives:')
    print('\tMean:', round(mu_p, 4))
    print('\tSigma:', round(sigma_p, 4))
    print('\tMin:', round(x1_p, 4))
    print('\tMax:', round(x2_p, 4))
    print(' ')
    print('Decision Point:', round(dp, 4))
    
    # Calculate the z-transforms.
    z1_n = (x1_n - mu_n) / sigma_n
    z2_n = (x2_n - mu_n) / sigma_n
    
    z1_p = (x1_p - mu_p) / sigma_p
    z2_p = (x2_p - mu_p) / sigma_p
    
    # Range of x in specification.
    x_n = np.arange(z1_n, z2_n, 0.001)
    
    x_p = np.arange(z1_p, z2_p, 0.001)
    
    # Entire range of x, both in and out of speicification.
    x_all = np.arange(-2, 2, 0.001)
    
    # Calculate probability.
    y_n = norm.pdf(x_n, mu_n, 1)
    y2_n = norm.pdf(x_all, mu_n, 1)
    
    y_p = norm.pdf(x_p, mu_p, 1)
    y2_p = norm.pdf(x_all, mu_p, 1)
    
    fig, ax = plt.subplots()
    
    ax.plot(x_all, y2_n, c='blue')
    ax.plot(x_all, y2_p, c='red')
    ax.plot([dp,dp],[0,0.5])
    
    ax.set_title(s)

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


def calculate_model(X,L,W,I,R,O):
    '''
    Use training data (X) and labels (L) to refine weights (W)
    until there is no change in weights or the limit of 
    iterations (I) is reached.  The learning rate is R.
    '''
    print(' ')
    print('Calculating Model')
    print('\tIterations:', I)
    print('\tLearning Rate:', R)
    print('\tOverfitting:', O)
    print(' ')
    # Used in messages and limiting processing.
    iteration = 0
    
    # The labels are -1 and +1.  The bias changes that to 0 and 2,
    # positive numbers.
    bias = 0
    
    # This vector contains the weights from a previous iteration.
    W1 = np.zeros(W.shape)
    
    # Values for plotting prediction are contained here.
    plot_parameters = {}

    # Iterate until there is no more changes to the weights.
    for iteration in range(I):
        for i in range(len(X)):
            
            # Get a set of cordinates.
            x = X[i]
            
            # Get the corresponding label.
            # Add a bias so the labels are positive.
            l = L[i] + bias
            
            # Make a prediction by multiply each coordinate by its weight
            # and summing the results.
            y = x @ W
            
            # Find the difference between the label and the prediction.
            d = l - y
            
            # Adjust the weight using the learning rate and difference
            # between the prediction and the label.
            for j in range(len(W)):
                W[j] = W[j] + R * d * x[j]

        # Calculate decision point assumming Gaussian distribution.
        negatives = []
        positives = []
        i = 0
        for x in X:
            y = x @ W
            if L[i] < 0:
                negatives.append(y)
            else:
                positives.append(y)
            i += 1

        len_negatives = len(negatives)
        sum_negatives = sum(negatives)
        min_negatives = min(negatives)
        max_negatives = max(negatives)
        avg_negatives = sum_negatives / len_negatives
        std_negatives = statistics.stdev(negatives)

        plot_parameters["negatives"] = {}
        plot_parameters["negatives"]["min"] = min_negatives
        plot_parameters["negatives"]["max"] = max_negatives
        plot_parameters["negatives"]["mean"] = avg_negatives
        plot_parameters["negatives"]["sigma"] = std_negatives

        len_positives = len(positives)
        sum_positives = sum(positives)
        min_positives = min(positives)
        max_positives = max(positives)
        avg_positives = sum_positives / len_positives
        std_positives = statistics.stdev(positives)

        plot_parameters["positives"] = {}
        plot_parameters["positives"]["min"] = min_positives
        plot_parameters["positives"]["max"] = max_positives
        plot_parameters["positives"]["mean"] = avg_positives
        plot_parameters["positives"]["sigma"] = std_positives
        
        if O == 0:
            decision_point = 0
        elif O == 1:
            # Find the intersection of the two Gaussian curves.
            # This actually resulted in lower accuracy.
            # https://stackoverflow.com/questions/22579434/python-finding-the-intersection-point-of-two-gaussian-curves
            m1 = avg_negatives
            m2 = avg_positives
            std1 = std_negatives
            std2 = std_positives
            a = 1/(2*std1**2) - 1/(2*std2**2)
            b = m2/(std2**2) - m1/(std1**2)
            c = m1**2 /(2*std1**2) - m2**2 / (2*std2**2) - np.log(std2/std1)
            d = np.roots([a,b,c])
            decision_point = d[1]
        elif O == 2:
            # The decision point is the stepping function.
            # It is the average of the negative mean plus one
            # standard diviation plus the positive mean less one
            # standard diviation.  This is needed because of
            # the fuzzy plane between negative and positive labels.
            decision_point = avg_negatives + std_negatives
            decision_point += avg_positives - std_positives
            decision_point /= 2
        else:
            decision_point = 0
        
        # Add the decision point so it can be plotted.
        plot_parameters["decision point"] = decision_point

        #  Make predictions using the decision point.
        accuary = 0.0
        count = 0
        correct = 0
        i = 0
        for x in X:
            count += 1
            y = x @ W
            if y < decision_point:
                prediction = -1
            else:
                prediction = +1
            if prediction == L[i]:
                correct += 1
            i += 1
            
        # Calculate accuracy.
        accuracy = correct / count

        # Display progress.
        if iteration % 100 == 0 or iteration > I - 10:
            print('Iteration:', iteration, 'Accuracy:', accuracy, 'Weights:', W)
        
        # When there is no change in weights, quit.
        if np.equal(W,W1).all():
            print(' ')
            print('Break:  No change in weights.')
            print('Iteration:', iteration, 'Accuracy:', accuracy, 'Weights:', W)
            break
        else:
            # Update the previous weights with the current weights.
            W1 = np.copy(W)
            
    # Plot distribution.
    plot_results(plot_parameters)


# In[ ]:


# main:  All processing is controlled here.

# Print identification data.
if True:
    preamble()

# Load training data and initialize differences.
(X,L,W) = load_data()

# Check visually if the data could be bifurcated.
if True:
    title = 'Sanity Check:  There are two regions of label values.'
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
# O:  Overfitting (Decision Points at zero, intersection, average)
I = 10001
R = 0.0001
O = 0
calculate_model(X,L,W,I,R,O)

# Run the sklearn.linear_model.Perceptron package.
if True:
    sklearn_perceptron()

print(' ')
print('Done!')

