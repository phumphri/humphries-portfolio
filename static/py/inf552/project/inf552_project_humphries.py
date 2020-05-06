#!/usr/bin/env python
# coding: utf-8

# In[ ]:



print('Importing libraries.')


import os
os.system("python -m pip install seaborn")
os.system("python -m pip install sklearn")
os.system("python -m pip install sklearn.metrics")
os.system("python -m pip install sklearn.metrics.plot_confusion_matrix")

import numpy as np
import matplotlib.pyplot as plt
import math

from sklearn.manifold import Isomap

from sklearn.mixture import GaussianMixture
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import Perceptron
from sklearn.neural_network import MLPClassifier

from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split

import seaborn as sns

# get_ipython().run_line_magic('matplotlib', 'inline')


# In[ ]:


def preamble():
    print(' ')
    print('Class Project')
    print(' ')
    print('Learning Computer Vision Fundamentals with the Famous MNIST Data')
    print(' ')
    print('Patrick Humphries (pvhumphr@usc.edu)')
    print('University of Southern California')
    print('INF 552 Machine Learning for Data Science (32458)')
    print('Final Project')
    print('Spring 2020')
    print(' ')
    print('Due to the large amount of data that was provided')
    print('please wait for the first graphic to display.')
    print('Canceling the current graphic will allow the next')
    print('graphic to be displayed.')
    print(' ')
    print('When the program is done, "Done!" will be displayed.')
    print(' ')


# In[ ]:


def reduce_features_to_two_dimensions(features):
    '''
    The Isomap reduces the dimensionality of the features from
    784 to 2.  This allows the visualize_features function to
    visualize the data in two dimensions.
    '''
    isomap = Isomap(n_components = 2)
    isomap.fit(features.data)
    transformed_features = isomap.transform(features.data)
    
    return transformed_features


# In[ ]:


# plt.rcParams


# In[ ]:


def load_data(file_name, skip_header, max_rows, test_size=0.25):
    '''
    The label is in column 0. Features are in columns 1 through 784.
    These columns are the flatten version of 28x28 pixel image.

    Load the attributes into vector features, which contains 784 columns.
    
    Load the labels into vector labels from column 0.
    
    Return features and labels.
    '''
    # Load trining dataset.
    path_to_csv = 'digit-recognizer' + os.path.sep + file_name
    
    # Load features
    usecols = range(1,785)
    X = np.genfromtxt(path_to_csv, dtype=int, skip_header=skip_header, delimiter=',',                       usecols=usecols, max_rows=max_rows)

    # Scale features from 0 through 256 to 0 through 1.
    X = X / 256

    # Load labels
    y = np.genfromtxt(path_to_csv, dtype=int, skip_header=skip_header, delimiter=',',                       usecols=0, max_rows=max_rows)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size)
    
    print('X_train.shape:', X_train.shape, 'y_train.shape:', y_train.shape,          'X_test.shape:', X_test.shape, 'y_test.shape:', y_test.shape)
    
    return (X_train, X_test, y_train, y_test)


# In[ ]:


def determine_context():
    '''
    The development environment (XPS) uses "monokai" theme,
    which is dark.  It is unknown what environment is used
    by the grader, so it reverts to default.
    '''
    logon_server = os.environ["LOGONSERVER"]
    
    if logon_server.find('XPX') == -1:
        plt.rcdefaults()
        r = plt.rcParams
    else:
        r = {"axes.edgecolor":global_text_color,
             "axes.labelcolor":global_text_color,
             "axes.facecolor":global_face_color,
             "xtick.color":global_text_color, 
             "ytick.color":global_text_color,
             "text.color":global_text_color,
             "figure.facecolor":global_face_color}
    return r


# In[ ]:


def visualize_features(features, labels, title, alpha=1.0):
    '''
    Provide the user with a two-dimensional visualization of
    the data.  This will allow the user to better understand
    the covariance of the data and select the appropriate
    models.
    '''
    # When using the integer labels, ensure they are 
    # converted to floats for color rendering.
    c = labels[:]
    c = c * (1.0)

    # Determine display context.
    r = determine_context()
    
    # Plot the two-dimensional features using the
    # selected context.
    with plt.rc_context(r):
        plt.figure(figsize=(7.0,5.0))
        x = features[:,0]
        y = features[:,1]            
        plt.scatter(x, y, cmap="tab10", c=c, alpha=alpha)
        plt.title(title)        
        plt.colorbar(label='Digit', ticks=range(0,10))        
        plt.clim(-0.5, 9.5)
        plt.show()


# In[ ]:


def isomap_for_all_digits(features, labels):
    '''
    Visualize the 784-feature dataset as a two-dimensional isomap.
    '''
    # Reduce the number of features to two and display.
    reduced_features = reduce_features_to_two_dimensions(features)

    # Visualize the transformed data.
    title = 'All Figures in Isomap Dimensions'
    visualize_features(reduced_features, labels, title)
    


# In[ ]:


def visualize_heatmap(testing_labels, testing_model, title, annot=True):
    '''
    Accuracy can be determined by the number of correct answers versus
    total answers.  However, that is just a single number.  A heatmap
    shows which estimates are in error and the type of error.
    '''
    # Calculate the confustion matrix that compares testing labels
    # to predicted labels via a testing model.
    cm = confusion_matrix(testing_labels, testing_model)
    
    # Determine display context.
    r = determine_context()
    
    # Plot the heatmap using the selected context.
    with plt.rc_context(r):  
        plt.figure(figsize=(6.0,6.0))
        sns.heatmap(cm, square=True, annot=annot, cbar=True)
        plt.xlabel('Predicted Value')
        plt.ylabel('True Value')
        plt.title(title)
        plt.show()
        


# In[ ]:


def visualize_model_scores(model_scores):
    '''
    Compare the model scores using a horizontal bar chart.
    '''
    # Decompose the the scores from a dictionary to
    # two lists:  model names and model scores.
    model_names = list(model_scores.keys())
    model_scores = list(model_scores.values())

    # Determine display context.
    r = determine_context()
    
    # Plot the scores using the selected 
    with plt.rc_context(r):  
        ax = plt.axes()
        ax.barh(model_names, model_scores)
        ax.set_xlabel('Model Score')
        ax.set_title('Comparing Model Scores')
        
        # Add the scores to the horizontal bars.
        for i, v in enumerate(model_scores):
            ax.text(v - 0.08, i, str(round(v,2)),  fontweight='bold', color='white')
        plt.show()


# In[ ]:


def visualize_params(params):
    
    # Define column labels.
    colLabels = ('param', 'value')
    
    # Define cell texts.
    cellTexts = []
    for key, value in params.items():
        cellText = [key, value]
        cellTexts.append(cellText)
        cellColors = []
        
    # Determine display context.
    r = determine_context()

    # Plot the scores using the selected 
    with plt.rc_context(r):  
    
        fig, ax = plt.subplots(figsize=[6.0, 4.0])

        # Hide axes.
        ax.axis('off')

        # Build table
        if r["text.color"] == global_text_color:
            
            # Set cell colors.
            for i in range(len(cellTexts)):
                cellColor = []
                for j in range(len(cellTexts[i])):
                    cellColor.append(global_face_color)
                cellColors.append(cellColor)

            # Set column colors
            colColors = [global_face_color, global_face_color]

            the_table = ax.table(cellText = cellTexts, colLabels = colLabels,
                                 loc='center', cellColours=cellColors, colColours=colColors)
        else:
            the_table = ax.table(cellText = cellTexts, colLabels = colLabels, loc='center')
            
        the_table.auto_set_font_size(False)
        the_table.set_fontsize(14)
        
        # Visualize table.
        fig.tight_layout()
        plt.show()
    


# In[ ]:


def visualize_images(rows = 5, columns = 5):
    '''
    Visualize the first twenty-five characters so the
    user can understand the nature of the data.
    '''
    
    file_name = 'train.csv'
    skip_header = 1
    max_rows = rows * columns
    test_size = 0.50
    
    X_train, X_test, y_train, y_test = load_data(file_name, skip_header, max_rows * 2, test_size)

    # Determine display context.
    r = determine_context()
    
    # Plot the 28x28 characters in a grid that is 5x5.
    with plt.rc_context(r):    
        images = X_train.reshape(max_rows, 28, 28)
        gridspec_kw = {"hspace":0.1, "wspace":0.1}

        fig, ax = plt.subplots(rows, columns, figsize=(28,28),
                               subplot_kw={'xticks':[],'yticks':[]},
                               gridspec_kw = gridspec_kw) 

        image_number = 0
        for images_row in range(rows):
            for images_column in range(columns):
                ax[images_row][images_column].imshow(images[image_number], cmap='Greys')
                ax[images_row][images_column].text(2,5,
                                                   str(y_train[image_number]),
                                                   fontsize=28,
                                                   color='red')
                image_number += 1
                
        plt.show()        
        


# In[ ]:


def Gaussian_Mixture_Model(X_train, y_train, X_test, y_test, max_iter):
    '''
    Isomap demonstrated that the data is distributed in overlaping groups.
    Therefore, samples should be allocated to digit based on a
    Gaussian distribution.
    '''
    n_components = 10
    model = GaussianMixture(n_components = n_components, max_iter = max_iter)
    classifier = model.fit(X_train, y_train)
    testing_model = model.predict(X_test)
    score = accuracy_score(y_test, testing_model)
#     cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)

    print(' ')
    print('===== Gaussian Mixture Model =====')
    print('score:', score)
#     print('cross validation scores:', cv_scores)
    
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Visualize actual labels versus predicted labels.
    visualize_heatmap(y_test, testing_model, 'Gaussian Mixture Model')    
    
    return score


# In[ ]:


def Gaussian_Naive_Bayes_Model(X_train, y_train, X_test, y_test):
    '''
    Isomap demonstrated that the data is distributed in overlaping groups.
    Therefore, samples should be allocated to digit based on a
    Gaussian distribution.
    '''
    model = GaussianNB()
    classifier = model.fit(X_train, y_train)
    testing_model = model.predict(X_test)
    score = model.score(X_test, y_test)
    cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)

    print(' ')
    print('===== Gaussian Naive Bayes Model =====')
    print('score:', score)
    print('cross validation scores:', cv_scores)
    
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Display confusion matrix.
    visualize_heatmap(y_test, testing_model, 'Gaussian Naive Bayes')        
    
    return score


# In[ ]:


def Decision_Tree_Model(X_train, y_train, X_test, y_test):
    
    model = DecisionTreeClassifier()
    classifier = model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    testing_model = model.predict(X_test)
    cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)
        
    print(' ')
    print('===== Decision Tree Model =====')
    print('score:', score)
    print('cross validation scores:', cv_scores) 
      
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Display confusion matrix.
    visualize_heatmap(y_test, testing_model, 'Decision Tree Model')       
    
    return score


# In[ ]:


def KNeighbors_Model(X_train, y_train, X_test, y_test):
    
    k = 1
    max_score = 0.0
    testing_model = None
    cv_scores = None
    
    for n_neighbors in  range(1,4):
        
        model = KNeighborsClassifier(n_neighbors = n_neighbors)
        classifier = model.fit(X_train, y_train)
        testing_model = model.predict(X_test)
        score = model.score(X_test, y_test)

        if score > max_score:
            max_score = score
            k = n_neighbors
            cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)
               
    print(' ')
    print('===== k-Neighbors Model =====')
    print('score:', max_score)
    print('cross validation scores:', cv_scores) 
      
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Display confusion matrix.
    visualize_heatmap(y_test, testing_model, 'k-Neighbors')     
    
    return score


# In[ ]:


def MLPClassifier_Model(X_train, y_train, X_test, y_test, max_iter):
    
    model = MLPClassifier(max_iter = max_iter)
    classifier = model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    testing_model = model.predict(X_test)
    cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)
        
    print(' ')
    print('===== MLP Classifier Model =====')
    print('score:', score)
    print('cross validation scores:', cv_scores) 
      
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Display confusion matrix.
    visualize_heatmap(y_test, testing_model, 'MLP Classifier')       
    
    return score


# In[ ]:


def Perceptron_Model(X_train, y_train, X_test, y_test, max_iter):
    
    model = Perceptron(max_iter = max_iter)
    classifier = model.fit(X_train, y_train)
    testing_model = model.predict(X_test)
    score = accuracy_score(y_test, testing_model)
    cv_scores = cross_val_score(classifier, X_test, y_test, cv = 3)

    print(' ')
    print('===== Perceptron Model =====')
    print('score:', score)
    print('cross validation scores:', cv_scores)
    
    # Visualize parameters in a table.
    visualize_params(model.get_params())
    
    # Display confusion matrix.
    visualize_heatmap(y_test, testing_model, 'Perceptron Model')    
    
    return score


# In[ ]:


class My_Perceptron:

    def __init__(self, t):
        
        # t is the target y.
        self.t = t
        
    def get_params(self):
        
        # To report parameters in a table, they must be in a dictionary.
        params = {
            'bias (b)': b,
            'learning rate (r)': r,
            'max_iter': max_iter
        }
        
    def fit(self, X, y, b=1.0, r=0.1, max_iter=200):
        
        # Initialize weights.
        self.w = np.random.rand(784,)
        
        # Store bias.
        self.b = b
        
        for h in range(max_iter):

            for i in range(len(X)):
                
                if y[i] != self.t:
                    continue
                
                z = self.w@X[i] + b
                
                if math.isnan(z):
                    print('Bad z:', z)
                    print('self.w:')
                    print(self.w)
                    print('samples[' + str(i) + ']:')
                    print(X[i])
                    continue
                    
                c = self.t - z
                
                if abs(c) < 0.00001:
                    break
                
                c = c * r
                C = np.ones(784,)
                C = C * c
                C = C * X[i]
                self.w = self.w + C
                
        return z

    def predict(self, x):
        
        z = self.w@x + self.b
        
        c = self.t - z
        
        margin = 0.0
        p = 0
        
        # Calculate the probability with a sigmoid function
        # if it is within a margin.
        while p == 0:
            
            margin += 0.1
        
            if c > margin:
                p = 0
            elif c < (-1) * margin:
                p = 0
            else:
                s = math.exp(c)/(1 + math.exp(c))
                p = 1 - abs(s - 0.5)
        
        return p
    
    def score(self, X):
        
        for i in range(len(X_test)):

            # Select the next sample and corresponding label.
            sample = X_test[i]
            label = y_test[i]

            # Initialize predictions.
            predictions = np.zeros(10)

            # Have each perceptron contribute its probability.
            for j in range(10):
                predictions[j] = models[j].predict(sample)

            # If no predictions were made, then something must be wrong!
            if predictions.sum() == 0:
                huh += 1
            else:
                # Select the prediction with the highest probability.
                prediction = np.argmax(predictions)
                if prediction == label:
                    hit += 1
                else:
                    miss += 1

        model_score =  round(hit/(hit + miss), 2)
        print('r:', r, 'huh:', huh, 'hit:', hit, 'miss:', miss, 'rate:', model_score)
        


# In[ ]:


def My_Perceptron_Model(X_train, y_train, X_test, y_test, max_iter, r=0.0001, b=1.0):
    
    # To visual parameters in a table, they need to be in a dictionary.
    params = {
        'learning rate (r)': r,
        'bias (b)': b,
        'max_iter': max_iter
    }

    # Perforance counters.
    perceptron_score = 0.0
    perceptron_count = 0
    perceptron_correct = 0

    # Create a perceptron for each numerial.
    models = []
    for i in range(10):
        models.append(My_Perceptron(i))

    # Set the training rate.
    r = 0.001
    
    for i in range(10):
        z = models[i].fit(X_train, y_train, r = r, max_iter = max_iter, b = b)

    # Performance counters.
    hit = 0
    miss = 0
    huh = 0
    
    # These lists are input into the heatmap.
    y_true = []
    y_pred = []

    for i in range(len(X_test)):

        # Get a sample and its corresponding label.
        sample = X_test[i]
        label = y_test[i]

        # Initialize predictions.
        predictions = np.zeros(10)

        for j in range(10):
            predictions[j] = models[j].predict(sample)

        if predictions.sum() == 0:
            # There were no predictions.
            # That cannot be correct.
            huh += 1
        else:
            # Select the prediction with the highest probability.
            prediction = np.argmax(predictions)
            y_true.append(label)
            y_pred.append(prediction)
            
            # Evaluate the prediction.
            if prediction == label:
                hit += 1
            else:
                miss += 1

    # Calculate model score.
    model_score =  round(hit/(hit + miss), 2)
    
    print(' ')
    print('===== My Perceptron Model =====')
    print('score:', model_score)
    print('hit:', hit, 'miss:', miss, 'rate:', model_score)
    
    # Visualize parameters in a table.
    visualize_params(params)
    
    # Display confusion matrix.
    # Calculate the confustion matrix that compares testing labels
    # to predicted labels via a testing model.
    cm = confusion_matrix(y_true, y_pred)
    
    # Determine display context.
    rc_context = determine_context()
    
    # Plot the heatmap using the selected context.
    with plt.rc_context(rc_context):  
        plt.figure(figsize=(6.0,6.0))
        sns.heatmap(cm, square=True, annot=True, cbar=True)
        plt.xlabel('Predicted Value')
        plt.ylabel('True Value')
        plt.title('My Perceptron')
        plt.show()
    
    
    return model_score


# In[ ]:


class my_neural_network():
    
    def __init__(self, target):
        
        # Define the target number for this neural network.
        self.target = target
        
        # Define the number of rows of activations.
        self.number_of_activation_rows = 8
        
        # Define the number of columns of activations.
        self.number_of_activation_columns = 8
        
        # Define the number of activations.
        self.number_of_activations = 64
        
        # Define the number of pixels in an activation.
        self.pixels_per_activation = 9
        
        # Create random weights from 0 to 1.
        weights = np.random.random_sample((self.number_of_activation_rows, 
                                           self.number_of_activation_columns, 
                                           self.pixels_per_activation))

        # Double the weights from 0 to 2.
        weights = weights * 2

        # Shift the weights from -1 to 1.
        weights = weights - 1

        # Scale down by 100, resulting in values -0.01 through 0.01.
        weights = weights / 100

        # Store the weights in an instance variable.
        self.weights = weights

    def fit(self, X_train, y_train, learning_rate = 0.01, maximum_iterations = 1000):
        '''
        Train the model with training samples and labels.
        X_train   Samples.  Each sample is a vector of pixel values.
        y_train   Labels corresponding to the samples.
        learning_rate         Learning rate.
        maximum_iterations    Maximum iterations.
        '''
        samples = X_train.copy()
        samples.resize(len(X_train,), 28, 28)
        labels = y_train.copy()
        
        # Process each activation in the 8x8 matrix.
        for activation_row in range(self.number_of_activation_rows):
            for activation_column in range(self.number_of_activation_columns):
                iteration = 0
                while iteration < maximum_iterations:
                    iteration += 1
                    for i in range(len(samples)):
                        
                        if labels[i] != self.target:
                            continue
                            
                        sample = samples[i]

                        # Load the pixel vector for the activation at j and k.
                        activation_pixels = np.zeros(self.pixels_per_activation)
                        
                        # Get the Northwest corner of the activation in the sample.
                        sample_row = int((activation_row % 9) * 3)
                        sample_column = int((activation_column % 9) * 3)
                        
                        # Get the pixels from the North edge of the activation
                        activation_pixels[0] = sample[sample_row][sample_column]
                        activation_pixels[1] = sample[sample_row][sample_column + 1]
                        activation_pixels[2] = sample[sample_row][sample_column + 2]
                        
                        # Get the pixels from the middle row of the activation
                        activation_pixels[3] = sample[sample_row + 1][sample_column]
                        activation_pixels[4] = sample[sample_row + 1][sample_column + 1]
                        activation_pixels[5] = sample[sample_row + 1][sample_column + 2]
                        
                        # Get the pixels from the South edge of the activation.
                        activation_pixels[6] = sample[sample_row + 2][sample_column]
                        activation_pixels[7] = sample[sample_row + 2][sample_column + 1]
                        activation_pixels[8] = sample[sample_row + 2][sample_column + 2]

                        # A value of 1 is added to move off the origin.
                        activation_pixels = activation_pixels + 1
                        
                        # Calculate dot product of weights and pixels.
                        weights = self.weights[activation_row][activation_column]
                        
                        # Calculate the activation value.
                        activation = weights @ activation_pixels

                        # Calculate the cost.  A bias of 10 is added to move off the origin.
                        cost = self.target + 10 - activation

                        weights = weights + cost * learning_rate * activation_pixels
                        
                        self.weights[activation_row][activation_column] = weights
        return 


    def get_probability(self, target):
        '''
        Return the probability is that the result of the target is the target 
        of this neural network.
        '''
        sample = target.copy()
        sample.resize(28, 28)
        
        votes = np.zeros((8,8))

        # Process all samples for each of the activations.
        for activation_row in range(self.number_of_activation_rows):
            for activation_column in range(self.number_of_activation_columns):

                # Load pixel vector.
                activation_pixels = np.zeros(self.pixels_per_activation)
                sample_row = int((activation_row % 9) * 3)
                sample_column = int((activation_column % 9) * 3)
                
                # Get the pixel values from the North edge of the activation.
                activation_pixels[0] = sample[sample_row][sample_column]
                activation_pixels[1] = sample[sample_row][sample_column + 1]
                activation_pixels[2] = sample[sample_row][sample_column + 2]
                
                # Get the pixel values from the middle row of the activation
                activation_pixels[3] = sample[sample_row + 1][sample_column]
                activation_pixels[4] = sample[sample_row + 1][sample_column + 1]
                activation_pixels[5] = sample[sample_row + 1][sample_column + 2]
                
                # Get the pixel values from the South edge of the activation.
                activation_pixels[6] = sample[sample_row + 2][sample_column]
                activation_pixels[7] = sample[sample_row + 2][sample_column + 1]
                activation_pixels[8] = sample[sample_row + 2][sample_column + 2]
                
                # Add 1 to move off the origin.
                activation_pixels = activation_pixels + 1
                
                weights = self.weights[activation_row][activation_column]

                # Calculate dot product of weights and pixels.
                activation = weights @ activation_pixels
                activation = round(activation)
                
                # If the target is for this neural network, vote for it.
                if activation == self.target + 10:
                    votes[activation_row][activation_column] += 1
                              
        # Return the probability that the target is for this neural network.
        probability = np.average(votes)
#         print(' ')
#         print('===== debug =====')
#         print('self.target:', self.target)
#         print('Votes:')
#         for i in range(8):
#             print(votes[i])
        
#         if self.target == 1 or self.target == 3:
#             probability = probability * 0.8
        
        return probability
        

    def get_score(self, X_test, y_test):
        '''
        Calculate the rate of correct decisions given trained weights.
        '''
        # Define scoring counters.
        count = 0
        correct = 0
        false_positives = 0
        false_negatives = 0
        true_positives = 0
        true_negatives = 0
        
        samples = X_test.copy()
        samples.resize(len(X_test), 28, 28)
        labels = y_test.copy()
        
        # Make a decision for each sample
        for i in range(len(samples)):
            
            sample = samples[i]
            label = labels[i]
            
            count += 1
            
            probability = self.get_probability(sample)
            if False:
                print(' ')
                print('probability:', probability)
            
            if self.target == label:
                if probability == 1.0:
                    correct += 1
                    true_positives += 1
                    if False:  
                        print(' ')
                        print('self.target:', self.target, 'true positive')
                        print(' ')
                else:
                    false_negatives += 1
                    if False:  
                        print('self.target:', self.target, 
                              'false negative:', label, 
                              'probability:', probability)
            else:
                if probability == 1.0:
                    false_positives += 1
                    if False:  
                        print('self.target:', self.target, 
                              'false positive:', label,
                              'probability:', probability)
                else:
                    correct += 1
                    true_negatives += 1
                    if False:  
                        print(' ')
                        print('self.target:', self.target, 'true negative')
                        print(' ')

        # Return the score.
        score = {
            'count': count,
            'correct': correct,
            'false_positives': false_positives,
            'false_negatives': false_negatives,
            'true_positives': true_positives,
            'true_negatives': true_negatives
        }
        
        return score


# In[ ]:


def my_neural_network_model(X_train, y_train, X_test, y_test, 
                            learning_rate = 0.01, 
                            probability_weights = np.ones((10)),
                            maximum_iterations = 1001):
    
    print(' ')
    print('===== My Neural Network Model =====')
    
    params = {
        'learning_rate': learning_rate,
        'maximum_iterations': maximum_iterations
    }

    total_count = 0
    total_correct = 0
    total_false_positives = 0
    total_false_negatives = 0
    total_true_positives = 0
    total_true_negatives = 0
    
    
    neural_networks = []
    
    for i in range(10):
    
        # instantiate model
        neural_network = my_neural_network(i)
        neural_networks.append(neural_network)

        # Train model.
        print('Training neural network for digit '+ str(i) + '.')
        neural_network.fit(X_train, y_train, 
                           learning_rate = learning_rate, 
                           maximum_iterations = maximum_iterations)

        if False:
            # Test model.
            print('Scoring neural network for digit ' + str(i) + '.')

            score = neural_network.get_score(X_train, y_train)
            count = score['count']
            correct = score['correct']
            false_positives = score['false_positives']
            false_negatives = score['false_negatives']
            true_positives = score['true_positives']
            true_negatives = score['true_negatives']

            if False:
                print('\t count:', count, 'correct:', correct, 'rate:', round(correct/count, 2))
                print('\t true positives:', true_positives, round(true_positives/count, 2))
                print('\t false negatives:', false_negatives, round(false_negatives/count, 2))
                print(' ')
                print('\t true negatives:', true_negatives, round(true_negatives/count, 2))
                print('\t false positives:', false_positives, round(false_positives/count, 2))

            total_count += count
            total_correct += correct
            total_false_positives += false_positives
            total_false_negatives += false_negatives
            total_true_positives += true_positives
            total_true_negatives += true_negatives

        if False:
            print('\n Totals for all digits:')
            print('\t count:', total_count, 'correct:', total_correct, 'rate:', 
                  round(total_correct/total_count, 2))
            print('\t true positives:', total_true_positives, round(total_true_positives/total_count, 2))
            print('\t false negatives:', total_false_negatives, round(total_false_negatives/total_count, 2))
            print(' ')
            print('\t true negatives:', total_true_negatives, round(total_true_negatives/total_count, 2))
            print('\t false positives:', total_false_positives, round(total_false_positives/total_count, 2))
    
     # Visualize parameters in a table.
    visualize_params(params)

    # Display confusion matrix.
    # Calculate the confustion matrix that compares testing labels
    # to predicted labels via a testing model.
    y_true = []; y_pred = []  
    samples = X_test.copy()
    labels = y_test.copy()
    
    total_correct = 0
    total_count = 0
    
    # Select the highest probability for the sample.
    # The index of the highest probabilty will be the prediction for the digit.
    for i in range(len(samples)):
        
        y_true.append(labels[i])
        
        probabilities = np.zeros((10))
        
        for j in range(10):
            probabilities[j] = neural_networks[j].get_probability(samples[i])
            
        probabilities = probabilities * probability_weights
                
        if False:
            print('probabilities:', probabilities)
    
        if np.sum(probabilities) == 0:
            print('Error.  No probabilities were offered.')
            y_pred.append(0)
        else:
            y_pred.append(np.argmax(probabilities))
        
    # Calculate the rate.
    for i in range(len(y_true)):
        total_count += 1
        if y_true[i] == y_pred[i]:
            total_correct += 1
            s = 'Boffo!'
        else:
            s = ' '
        if False:
            print('i:', i, 'y_true:', y_true[i], 'y_pred', y_pred[i], s)
            
    total_rate = round(total_correct / total_count, 2)
    print('total_count:', total_count, 'total_correct:', total_correct, 'total_rate:', total_rate)
        
    cm = confusion_matrix(y_true, y_pred)

    # Determine display context.
    rc_context = determine_context()

    # Plot the heatmap using the selected context.
    with plt.rc_context(rc_context):  
        plt.figure(figsize=(6.0,6.0))
        sns.heatmap(cm, square=True, annot=True, cbar=True)
        plt.xlabel('Predicted Value')
        plt.ylabel('True Value')
        plt.title('My Neural Network')
        plt.show()                

                
    return total_rate


# In[ ]:


# main

if True:
    preamble()
    
# Global Variables
global_face_color = (0.18, 0.31, 0.32)
global_text_color = "yellow"
    
# Maximum of iterations for any model that iterates.
max_iter = 1001

# Tabulate the model scores.
model_scores = {
    "Gaussian Mixture":0.0,
    "Gaussian Naive Bayes":0.0,
    "Decision Tree":0.0,
    "MLP Classifier":0.0,
    "k-Neighbors":0.0,
    "Perceptron":0.0,
    "My Perceptron":0.0,
    "My Neural Network":0.0}

# Visualize a sample of images.
if True:
    visualize_images()

if True:
    # Loading samples and corresponding labels.
    print(' ')
    print('Loading testing samples and labels.')
    file_name = 'train.csv'
    skip_header = 1
    max_rows = 1000
    test_size = 0.25
    X_train, X_test, y_train, y_test = load_data(file_name, skip_header, max_rows, test_size)
    
    # Display training data.
    print(' ')
    print('Training Data')
    types_of_figures = np.zeros((10))
    for i in range(len(y_train)):
        types_of_figures[y_train[i]] += 1
    for i in range(10):
        print('i:', i, 'count:', round(types_of_figures[i], 0))
        
    # Display testing data.
    print(' ')
    print('Testing Data')
    types_of_figures = np.zeros((10))
    for i in range(len(y_test)):
        types_of_figures[y_test[i]] += 1
    for i in range(10):
        print('i:', i, 'count:', round(types_of_figures[i], 0))
        
if True:
    # Visualize all digits in a two-dimentsional isomap.
    isomap_for_all_digits(X_train, y_train)

if True:
    model_score = Gaussian_Mixture_Model(X_train, y_train, X_test, y_test, max_iter)
    model_scores["Gaussian Mixture"] = model_score
    
if True:
    model_score = Gaussian_Naive_Bayes_Model(X_train, y_train, X_test, y_test)
    model_scores["Gaussian Naive Bayes"] = model_score
    
if True:
    model_score = Decision_Tree_Model(X_train, y_train, X_test, y_test)
    model_scores["Decision Tree"] = model_score
    
if True:
    model_score = KNeighbors_Model(X_train, y_train, X_test, y_test)
    model_scores["k-Neighbors"] = model_score
    
if True:
    model_score = MLPClassifier_Model(X_train, y_train, X_test, y_test, max_iter)
    model_scores["MLP Classifier"] = model_score
    
if True:
    model_score = Perceptron_Model(X_train, y_train, X_test, y_test, max_iter)
    model_scores["Perceptron"] = model_score
    
if True:
    model_score = My_Perceptron_Model(X_train, y_train, X_test, y_test, max_iter)
    model_scores["My Perceptron"] = model_score
    
if True:   
    learning_rate = 0.001
    maximum_iterations = max_iter
    probability_weights = np.ones((10))
    probability_weights[1] = 0.8
    probability_weights[2] = 1.1
    probability_weights[5] = 1.1
    probability_weights[8] = 1.0
    model_score = my_neural_network_model(X_train, y_train, X_test, y_test, 
                                          learning_rate = learning_rate, 
                                          probability_weights = probability_weights,
                                          maximum_iterations = maximum_iterations)    
    model_scores["My Neural Network"] = model_score
            
if True:
    visualize_model_scores(model_scores)
    
print(' ')
print('Done!')

