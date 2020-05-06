#!/usr/bin/env python
# coding: utf-8

# In[ ]:


print('Homework 2, GMM')
print('Student:  Patrick Humphries, 7097-1087-72, pvhumphr@usc.edu')
print('Class:  INF 552 Machine Learning for Data Science')
print('Section:  32458')
print('University of Southern California, Spring 2020')
print(' ')
print('Summary')
print('This program implements the Gaussian Mixture Model algorithm using')
print('using file "clusters.txt" and the number of clusters set to three.')
print(' ')
print('Instructions')
print('Unzip hw02_humphries.zip into an empty directory.')
print('From a command line, execute "python inf552_assignment_2_humphries_gmm.py".')
print('A series of scatter plots will be displayed.  Cancel the current to see the next.')
print('The distribution of data points and centroid movement will be displayed in the title.')
print(' ')
print('The last plot was created using scikit learn.')
print(' ')
print('Please wait while the first plot is rendered.')
print('\n\n\n')


# In[ ]:


# Import libraries.
import csv
import matplotlib.pyplot as plt
from matplotlib import patches
from math import sqrt
from sklearn.cluster import KMeans
import numpy as np


# In[ ]:


# The data set into a list of tuples.
# The data set "clusters.txt" was copied to "custers.csv" with no modifications.
# The resulting X is a list of tuple positions of (x,y).

def load_X(D,file_name='clusters.csv'):
    if D:
        print(' ')
        print("load_X(file_name='" + file_name + "')")
    
    X = []
    with open(file_name, newline='') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                row[-1] = row[-1].rstrip()
                X.append((float(row[0]),float(row[1]))) 
      
    return X


# In[ ]:


def throtle_X(D,X,size=8):
    if D:
        print(' ')
        print('throtle_X(X,size=' + str(size) + ')')
    
    # Limit the number of records to argument size.
    X1 = []
    for x in X:
        X1.append(x)
        if len(X1) >= size:
            break
    X = X1
    
    return X


# In[ ]:


# Control totals track the number of data points in each cluster and
# the aggregated movement of all clusters.
def create_control_totals(D,C):
    
    if D:
        print(' ')
        print('create_control_totals(C)')
    
    # Create control totals for data points and total centroid movement.
    T = {}
    for c in C:
        color = c["color"]
        T[color] = 0
    T["movement"] = 0

    return T


# In[ ]:


# Create a container for storing cluster weighting for each data point.
def create_weights(D,X,C):
    if D:
        print(' ')
        print('create_weights(X,C)')

    # Create weights containiner.
    W = []
    
    # Each row in W is for a data point.
    for x in X:
        
        # Each row in W contains a list of weights for each cluster.
        W.append([0.0] * len(C))
        
    return W   


# In[ ]:


def calculate_distance_between_data_points(D,x,c):
    # Bypass debug.
    bypass_debug = True
    
    if D and not bypass_debug:
        print(' ')
        print('calculate_distance_between_data_points(' + str(x) + ',' + str(c) +')')
        
    a = (x[0] - c["xy"][0])**2
    b = (x[1] - c["xy"][1])**2
    
    return sqrt(a + b)


# In[ ]:


def calculate_centroids(D,C):
    if D:
        print(' ')
        print('calculate_centroids(C)')
    
    # Calculate the centroid for each cluster.
    for c in C:
        
        # Preserve the current centroid.
        c["prior_xy"] = c["xy"]
        prior_xy = c["xy"]
    
        # Initialize accumulators.
        a = 0
        b = 0
        n = 0
        
        # Accumulate attributes for all data points for a cluster.
        for x in c["X"]:
            a += x[0]
            b += x[1]
            n += 1
            
        # Calculate and assign the new centroid for the cluster.
        if n == 0:
            print( ' ')
            print('== Error ==')
            print(c["color"], 'had no data points.')
        else:
            a = a / n
            b = b / n
            c["xy"] = (a,b)
            
        # Calculate movement for cluster.
        c["movement"] = calculate_distance_between_data_points(D,prior_xy,c)

    # Return clusters with updated centroids.
    return C


# In[ ]:


def initialization(D,file_name='clusters.csv',K=3,size=8):
    if D:
        print(' ')
        print("initialization(file_name='"  + file_name + "',K=" + str(K) + ")")
    
    # Load data.
    X = load_X(D)
    
    # Throtle data for development.
    if D:
        X = throtle_X(D,X,size=size)
    
    # Create clusters.
    C = create_clusters(D,X,K)
    
    # Create control totals.
    T = create_control_totals(D,C)
    
    # Create weights.
    W = create_weights(D,X,C)
    
    plot_clusters(D,C,T)
    
    return (X,C,T)


# In[ ]:


# Calculate the importance of each data point is to a cluster.
def calculate_weights(D,P):
    if D:
        print(' ')
        print('calculate_weights(P)')
    
    # Initialize list of cluster weights.
    # W will be a two-dimentional array.
    W = []
    
    for i in range(0, len(P)):
        p = P[i]
        denominator = sum(p)
        
        # Initialize the list of weights for a cluster.
        a = []
        for j in range(0, len(p)):
            numerator = p[j]
            w = numerator / denominator
            
            # Add weight to a list of weights for a cluster.
            a.append(w)
            
        # Add a list of weights for a cluster to the list of cluster weights.
        W.append(a)
        
    if D:
        for w in W:
            print(' ')
            print(w)
    
    return W


# In[ ]:


# Assign each data point to a cluster that the data point had the highest cluster probability.
def align_data_points_to_clusters(D,C,X,P):
    if D:
        print(' ')
        print('align_data_points_to_clusters(C,X,P)')
    
    for c in C:
        c["X"] = []
    
    for i in range(0, len(X)):
        
        x = X[i]
        
        highest_cluster_probability = 0
        index_of_highest_cluster_probability = 0
        
        for j in range(0, len(P)):
            p = P[j][i]
            if p > highest_cluster_probability:
                highest_cluster_probability = p
                index_of_highest_cluster_probability = j
                
        C[index_of_highest_cluster_probability]["X"].append(x)
        
    return C


# In[ ]:


# The clusters are created as far away as possible from other clusters and data points.
# This was done to emphasize movement of centroids.

def create_clusters(D,X,K=3):
    if D:
        print(' ')
        print('create_clusters(X,K=' + str(K) + ')')
    
    C = []
    colors=['red','blue','green','black']
    centroids=[(-8, 8),(-8,-8),(8,-8),(0,0)]
    
    # Create empty clusters.
    for i in range(0,K):
        cluster = {
            "xy":centroids[i],
            "color":colors[i],
            "X":[],
            "movement":0.0
        }
        C.append(cluster)
        
    # Intially assign a data point to the nearest cluster.
    for x in X:
        shortest_distance = 99
        index_of_shortest_distance = 0
        for i in range(0, len(C)):
            c = C[i]
            distance = calculate_distance_between_data_points(D,x,c)
            if distance < shortest_distance:
                shortest_distance = distance
                index_of_shortest_distance = i
        C[index_of_shortest_distance]["X"].append(x)
    
    # Calculate initial centroids and covariances.
    for i in range(0, len(C)):
        c = C[i]
        
        # Lists of attributes.
        A = []
        B = []
        n = len(X)
        
        # Calculate size.
        c["pi"] = len(c["X"])
        
        # Calculate prior.
        c["prior"] = c["pi"] / n
        
        # Create lists of attribute values for a cluster.
        X1 = c["X"]
        n = len(X1)
        for j in range(0, n):
            x = X1[j]
            a1 = x[0]
            b1 = x[1]    
            A.append(a1)
            B.append(b1)
            
        # Calculate means and centroid.
        a2 = sum(A)
        b2 = sum(B)
        a3 = a2 / n
        b3 = b2 / n
                       
        # Calculate variances.
        a = 0.0
        for a4 in A:
            a += ((a4 - a3) * (a4 - a3))
        a = a / n
        
        b = 0.0
        for b4 in B:
            b += ((b4 - b3) * (b4 - b3))
        b = b / n
                
        # Calculate covariance.
        AB = 0
        for j in range(0, n):
            x = X1[j]
            a5 = x[0]
            b5 = x[1]
            AB += abs((a5 - a3) * (b5 - b3))
        ab = AB / n
                    
        # Create covariance matrix.
        s = [[a,ab],[ab,b]]
        try:
            covariance_matrix = np.matrix(s, dtype='float')
        except Exception as e:
            print(' ')
            print('np_matrix(' + s + ') failed.')
            print('e:', e)
            print('a variance:', a)
            print('b variance:', b)
            print('ab covariance:', ab)
            
        # Create inverse covariance matrix.
        try:
            inverse_covariance_matrix = covariance_matrix.getI()
        except Exception as e:
            print(' ')
            print('covariance_matrix.getI() failed.')
            print('e:', e)
            print('covariance_matrix:')
            print(covariance_matrix)
            
        # Calculate determinant.
        t = np.array(s)
        try:
            determinant = np.linalg.det(t)
        except Exception as e:
            print(' ')
            print('=== Error ===')
            print('e:', e)
            print('np.linalg.det(t) threw an exception')
            print('t:')
            print(t)
            print('s:')
            print(s)
            
        # Check for negative determinant.
        if determinant <= 0:
            print(' ')
            print('=== Error ===')
            print('Determinant was zero or less.')
            print('covariance matrix:')
            print(covariance_matrix)
            
        c["covariance"] = covariance_matrix
        c["inverse"] = inverse_covariance_matrix
        c["determinant"] = determinant
        
        if D:
            print(' ')
            print('debug', color)
            print('len(c["X"]):', len(c["X"]))
            print('len(A):', len(A))
            print('len(B):', len(B))
            print('a variance:', a)
            print('b variance:', b)
            print('ab covariance:', ab)
            print('covariance matrix:')
            print(covariance_matrix)
            print('inverse covariance matrix:')
            print(inverse_covariance_matrix)
            print('determinant:', c["determinant"])
 
    return C


# In[ ]:



# Intially assign a data point to the nearest cluster.
def align_data_points_to_cluster(D,X,C):
    
    # Turn off debug.
    bypass_debug = False
    
    if D and not bypass_debug:
        print(' ')
        print('align_data_points_to_cluster(X,C)')
        
    # Intialize data point assignments for each cluster.
    for c in C:
        c["X"] = []
        
    # Assing data point to the closest cluster.
    for x in X:
        shortest_distance = 99
        index_of_shortest_distance = 0
        for i in range(0, len(C)):
            c = C[i]
            distance = calculate_distance_between_data_points(D,x,c)
            if distance < shortest_distance:
                shortest_distance = distance
                index_of_shortest_distance = i
        C[index_of_shortest_distance]["X"].append(x)
        
    C = calculate_centroids(D,C)

    return C


# In[ ]:


def calculate_covariance_matricies(D,C):
    if D:
        print(' ')
        print('calculate_covariance_matricies(C)')
    
    for i in range(0, len(C)):
        c = C[i]
        X1 = c["X"]
        n = len(X1)
        if n == 0:
            print(' ')
            print('=== Error ===')
            print('No data points in c["x"].')
            for c in C:
                color = c["color"]
                print(color + ': ' + str(len(c["X"])))
            continue

        # Lists of attributes.
        A = []
        B = []

        # Create lists of attribute values for a cluster.
        for j in range(0, n):
            x = X1[j]
            w = P[i][j]
            a1 = w * x[0]
            b1 = w * x[1]    
            A.append(a1)
            B.append(b1)

        # Calculate means and centroid.
        a2 = sum(A)
        b2 = sum(B)
        a3 = a2 / n
        b3 = b2 / n
#         c["xy"] = (a3, b3)     TODO

        # Calculate variances
        a = 0.0
        for a4 in A:
            a += ((a4 - a3) * (a4 - a3))
        a = a / n

        b = 0.0
        for b4 in B:
            b += ((b4 - b3) * (b4 - b3))
        b = b / n

        # Calculate covariance.
        AB = 0
        for j in range(0, n):
            x = X1[j]
            a5 = x[0]
            b5 = x[1]
            AB += ((a5 - a3) * (b5 - b3))
        ab = AB / n            

        # Create covariance matrix.
        s = [[a,ab],[ab,b]]
        try:
            covariance_matrix = np.matrix(s, dtype='float')
        except Exception as e:
            print(' ')
            print('np_matrix(' + s + ') failed.')
            print('e:', e)
            print('a variance:', a)
            print('b variance:', b)
            print('ab covariance:', ab)

        # Create inverse covariance matrix.
        try:
            inverse_covariance_matrix = covariance_matrix.getI()
        except Exception as e:
            print(' ')
            print('covariance_matrix.getI() failed.')
            print('e:', e)
            print('covariance_matrix:')
            print(covariance_matrix)
            
        # Calculate determinant.
        t = np.array(s)
        try:
            determinant = np.linalg.det(t)
        except Exception as e:
            print(' ')
            print('=== Error ===')
            print('e:', e)
            print('np.linalg.det(t) threw an exception')
            print('t:')
            print(t)
            print('s:')
            print(s)
            
        # Check for negative determinant.
        if determinant <= 0:
            if D:
                print(' ')
                print('=== Error ===')
                print('Determinant was zero or less.')
                print('covariance matrix:')
                print(covariance_matrix)
                print('Changing determinant to absolute value.')
            determinant = abs(determinant)

        c["covariance"] = covariance_matrix
        c["inverse"] = inverse_covariance_matrix
        c["determinant"] = determinant
            
    return C


# In[ ]:


# Calculate the probability for a cluster for each data point.
def calculate_cluster_probabilities(D,X,C,L):
    if D:
        print(' ')
        print('calculate_cluster_probabilities(X,C,L)')
        print(' ')
        print('L:')
        for l in L:
            print('l:', str(len(l)), str(sum(l)))
            
    # Initialize cluster probabilites list.
    P = []
    
    # Calculate the probability of cluster for each data point.
    for i in range(0, len(C)):
        c = C[i]
        prior = c["prior"]
        
        # Create a list of probabilities for the cluster.
        p = []
        
        for j in range(0, len(X)):
            x = X[j]
            l = L[i][j]
            
            # Calculate numerator.
            numerator = l * prior
            
            # Calculate denominator.
            denominator = 0.0
            for l in L:
                for likelihood in l:
                    denominator += likelihood * prior
                
            cluster_probability = numerator / denominator
            
            # Add cluster probability to the list of probabilites for the cluster.
            p.append(cluster_probability)
        
        # Add the list of cluster probabilites to the cluster probabities list.
        P.append(p)
        
    return P


# In[ ]:


# The likelihood of x of X is in c of C.
def calculate_likelihoods(D,X,C):
    if D:
        print(' ')
        print('calculate_likelihoods(X,C)')
    
    L = []

    for i in range(0, len(C)):
        
        c = C[i]

        xy = c["xy"]
        cv = c["covariance"]
        iv = c["inverse"]
        dt = c["determinant"]
        pi = c["pi"]
        color = c["color"]
        
        # Calculate the determinant of the covariance of the cluster.
        
        # Calculate normalizing factor.
        nf = 1
        try:
            sdt = sqrt(dt)
        except Exception as e:
            print(' ')
            print('sqrt(dt) failed.')
            print('e:', e)
            print('dt:', dt)
        try:
            nf = 1 / ((2 * pi) * (sdt))
        except Exception as e:
            print(' ')
            print('nf calculation failed.')
            print('e:', e)
            print('pi:', pi)
            print('dt:', dt)
            
        # Initialize likelihood list for cluster.
        l = []
        
        for j in range(0, len(X)):
            
            # Replace data points with (data points - centroid).
            x = X[j]
            
            # Calculate variance.
            a1 = x[0] - xy[0]
            b1 = x[1] - xy[1]
            x_row = np.array([a1,b1])
            x_row_1= x_row.reshape([2,1])
            
            
            # Multiply x by inverse.
            try:
                a2 = np.dot(iv,x_row)
            except Exception as e:
                print(' ')
                print('=== Error ===')
                print('np.dot(iv,x_row) threw an Exception.')
                print('e:', e)
                print('x_row:')
                print(x_row)
                print('iv:')
                print(iv)
            
            # Multipy by x.
            x_row_2 = x_row_1.reshape([1,2])
            a4 = np.dot(a2,x_row)
            a5 = np.asscalar(a4)            

            # Multiply by negative half.
            a6 = (-1/2) * a5

            # Calculate exponent.
            a7 = np.exp(a6)

            # Multiply by normalization factor.
            a8 = nf * a7

            # Add likelihood to list for cluster.
            l.append(a8)
            
            # Debugging
            if D:
                print(' ')
                print('debug')
                print(color, 'xy:', xy)
                print('x', x)
                print('x_row:', x_row)
                print('x_row_1:', x_row_1)
                print('x_row_2:', x_row_2)
                print('iv:')
                print(iv)
                print('(x_row_1)T(iv):')
                print(a2)
                print('(x_row_1)T(iv)(x_row_2)')
                print(a5)
                print('exp:', a6)
                print('term:', a7)
                print('likelihood:', color, a8)
            
        # Add list of likelihoods to the cluster.
        L.append(l)
    
    return L


# In[ ]:


def calculate_cluster_means(D,X,C,W):
    if D:
        print(' ')
        print('calculate_cluster_means(X,C,W)')
    
    n = len(X)
    
    for i in range(0, len(C)):
        c = C[i]
        
        # Accumulators for the attributes.
        A = 0
        B = 0
        
        # Apply the weight to each data point and add it to the accumulator.
        for j in range(0, len(X)):
            x = X[j]
            w = P[i][j]
            w = w
            a = w * x[0]
            b = w * x[1]
            A += a
            B += b
            
        # Calculate the new centroid.
        A = A / n
        B = B / n        
        c["xy"] = (A,B)
    
    C = calculate_centroids(D,C)
    
    if D:
        for c in C:
            print('c["xy"]:', c["xy"])
        
    return C


# In[ ]:


def plot_clusters(D,C,T):
    if D:
        print(' ')
        print('plot_clusters(C,T)')
        
    fig, ax = plt.subplots(subplot_kw={"aspect":"equal"})
    
    # Display control totals in the title.
    T["movement"] = 0.0
    for c in C:
        color = c["color"]
        lx = len(c["X"])
        T[color] = lx
        T["movement"] += c["movement"]
    T["movement"] = round(T["movement"], 2)
    s = ' '
    for key in T:
        s += (key + ": " + str(T[key]) + ", ")
    fig.suptitle(s)

    # Plot clusters.
    for c in C:
        
        circle = patches.Circle(c["xy"],
                                radius=1.0,
                                color=c["color"],
                                linewidth=1.0,
                                fill=False,
                                zorder=2.0)
        ax.add_patch(circle)
        
        # Plot data points for the cluster.
        for x in c["X"]:
            circle = patches.Circle(x, 
                                    radius=0.2,
                                    color=c["color"],
                                    linewidth=1.0)
                                    
            ax.add_patch(circle)

    # Set axis to contain all data points.
    ax.set_xlim([-10,10])
    ax.set_ylim([-10,10])
    
    # Showtime.
    plt.show()
    

    


# In[ ]:


# Code copied from "Python Data Science Handbook" by Jake VanderPlas.
# Modified to accept custers.csv and cluster plotting
def sklearn(D):
    if D:
        print(' ')
        print('sklearn()')
        
    import itertools

    import numpy as np
    from scipy import linalg
    import matplotlib.pyplot as plt
    import matplotlib as mpl

    from sklearn import mixture

    # Number of samples per component
    n_samples = 500

    # Generate random sample, two components
    np.random.seed(0)
    C = np.array([[0., -0.1], [1.7, .4]])
    X = np.r_[np.dot(np.random.randn(n_samples, 2), C),
              .7 * np.random.randn(n_samples, 2) + np.array([-6, 3])]

    # Format data from cluster.csv to be a numpy ndarray.
    X1 = load_X(D)
    X2 = []
    for x in X1:
        X2.append(x[0])
        X2.append(x[1])
    shape = (150, 2)
    buffer = np.array(X2)
    X = np.ndarray(shape,buffer=buffer)

    # Fit a Gaussian mixture with EM using three components.
    gmm = mixture.GaussianMixture(n_components=3, covariance_type='full').fit(X)

    # Create clusters for plotting.
    colors = ['blue','red','green']

    # Create control totals
    T = {"blue":0, "red":0, "green":0, "movement":0.0}

    # Create clusters container.
    C = []
    for color in colors:
        C.append({"color":color,"X":[], "xy":(0,0)})

    # Create predictions.
    p = gmm.predict(X)

    # For each prediction, update a cluster and control totals.
    for i in range(0,len(p)):
        j = p[i]
        C[j]["X"].append(X[i])
        if j == 1:
            T["red"] += 1
        elif j == 2:
            T["green"] += 1
        else:
            T["blue"] += 1

    # Calculate new centroids for the clusters.
    C = calculate_centroids(D,C)

    # Plot centroids clusters, and control totals.
    plot_clusters(D,C,T)    


# In[ ]:


# main


# Run in debug mode if true.
D = False

# Load data, create clusters, and plot initial state.
X, C, T = initialization(D,size=15)

# plot_clusters(D,C,T)

for i in range(0,10):
    
    # Current classifications.
    current_classifications = []
    for i in range(0,len(C)):
        c = C[i]
        current_classifications.append(len(c["X"]))
    
    # The likelihood for Bayes's Theorm.
    # Victor Lavrenko https://www.youtube.com/watch?v=9YA2t78Ha68
    # "how typical is xi under source c"
    L = calculate_likelihoods(D,X,C)
        
    # The probability from Bayes's Theorm.
    # "how likely that xi came from c"
    P = calculate_cluster_probabilities(D,X,C,L)

    # Calculate the weight using probability from Bayes's Theorm.
    # "Calculate the importantce of each data point is to a cluster."
    W = calculate_weights(D,P)

    # Calculate the mean for each attribute of a cluster based on weighted data points.
    C = calculate_cluster_means(D,X,C,W)

    # Assign a data points to clusters where each cluster had the highest cluster probability for the data point.
    C = align_data_points_to_cluster(D,X,C)
    
    # Calculate covariance matrix for each cluster.
    C = calculate_covariance_matricies(D,C)

    # Plot the updated clusters.
    plot_clusters(D,C,T)
    
    # Terminate after movement the classification has not changed.
    there_was_a_change = False
    for i in range(0,len(C)):
        c = C[i]
        if current_classifications[i] == len(c["X"]):
            continue
        there_was_a_change = True
        break
    if there_was_a_change:
        continue
    else:
        break

        
# Run Software Familiarization.
if True:
    sklearn(D)
    
print('Done')
        

