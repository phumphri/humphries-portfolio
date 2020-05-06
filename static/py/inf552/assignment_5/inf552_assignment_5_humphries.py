#!/usr/bin/env python
# coding: utf-8

# In[1]:


def preamble():
    print(' ')
    print('Artificial Neural Networks')
    print('Patrick Humphries (pvhumphr@usc.edu)')
    print('University of Southern California')
    print('INF 552 Machine Learning for Data Science (32458)')
    print('Programming Assignment 5')
    print('Spring 2020')
    print(' ')
    print('Due to the large amount of data that was provided')
    print('please wait for the first graphic to display.')
    print('Canceling the current graphic will allow the next')
    print('graphic to be displayed.')
    print(' ')
    print('In order to calculate the best accuracy with the')
    print('minimum weight values, all 1,000 iterations are run.')
    print('When the program is done, "Done!" will be displayed.')
    print(' ')
    print('keras with tensorflow is run as the final step.  If')
    print('packages have not been stalled, then the final step')
    print('will fail.  If this happens, consider "pip install tesorflow==2.0"')
    print('"pip install keras" if running python.  If running Jupyter')
    print('Notebook, consider adding two cells.  One for')
    print('"conda install tensorflow" and one for "conda install keras".')
    print(' ')


# In[2]:


print('\n Importing libraries.')
import os
import numpy as np
# from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from sklearn import linear_model
import math
# get_ipython().run_line_magic('matplotlib', 'inline')


# In[3]:


def get_file_paths(file_name='downgesture_train.list.txt'):
    '''
    Return a list of file paths from a file of file paths.
    For this assignment, this function will be called twice.
    Once for training samples and again for testing samples.
    '''
    print('\t Getting file paths.')
    
    file_paths = []
    
    with open(file_name, 'r') as f:
        for line in f:
            file_paths.append(line.strip())
            
    return file_paths
        


# In[4]:


def build_samples(target_file_names='downgesture_train.list.txt', number_of_files=1000):
    '''
    Create a vector of samples and a vector of samples that 
    correspond to the samples.  
    
    For Homework 5, the pixel values specified ranged from 0
    to 1.  The file has the range from 0 to 255.  Hence, this
    function scales the values down by dividing by 255.
    '''
    print('\t Building samples and labels.')
    
    # Define containers for samples and labels.
    samples = []
    labels = []
    
    # Process each image file.
    file_paths = get_file_paths(target_file_names)
    file_number = 0
    for file_path in file_paths:
        file_number += 1
        if file_number > number_of_files:
            break
        # Get a numpy array organized by rows and columns.
        # Need to copy the original array because it is read only.
        sample = np.array(plt.imread(file_path,format='PGM'))
        
        # Scale sample from native (0,255) to (0,1) per requirements.
        sample = sample / 255
        
        # Add the sample to the collection of samples.
        samples.append(sample)
        
        # Get label value based on file name.
        file_path = file_path.lower()
        if file_path.find('down') == -1:
            labels.append(0)
        else:
            labels.append(1)

    # Return samples and corresponding labels.
    return samples, labels
            


# In[5]:


def visualize_images(start, samples, labels, rows=5, columns=5):
    '''
    Display 25 images in a 5x5 visualization using a grey colormap.
    '''
    print('\t Visualizing images.')
    
    # Determine if using "monokai" on the development workstation
    # or default context on grader's workstation.
    logon_server = os.environ["LOGONSERVER"]
    
    if logon_server.find('XPS') == -1:
        r = plt.rcdefaults()
    else:
        r = {"axes.edgecolor":"yellow",
             "axes.labelcolor":"yellow", 
             "xtick.color":"yellow", 
             "ytick.color":"yellow",
             "figure.facecolor":(0.18, 0.31, 0.32)}

    with plt.rc_context(r):    
        gridspec_kw = {"hspace":0.1, "wspace":0.1}

        fig, ax = plt.subplots(rows, columns, figsize=(30,32),
                               subplot_kw={'xticks':[],'yticks':[]},
                               gridspec_kw = gridspec_kw) 

        sample_number = 0
        for images_row in range(rows):
            for images_column in range(columns):
                sample = samples[sample_number]
                ax[images_row][images_column].imshow(sample, cmap='Greys')
                s = str(start + sample_number + 1) + ':' + str(labels[sample_number])
                ax[images_row][images_column].text(2, 5, s, fontsize=28, color ='red')
                sample_number += 1
                
        plt.show() 
        


# In[6]:


def reverse_images(samples, margin = 16):
    '''
    To have weights calculated consistently, the foreground needs
    to be lighter than the background.  If the background is darker,
    the image is reversed.
    '''
    print('\t Reversing images.')
    
    # Each image consists of 30 rows and 32 columns of 
    # integer numbers representing pixel shading.
    rows = 30
    cols = 32

    for i in range(len(samples)):
        
        sample = samples[i]
        
        # This pixel is consideered the background value.
        left_pixel = sample[15][0]
        
        # This pixel is considered the forground value.
        center_pixel = sample[14][15]
        
        # Reverse the image if background is darker than the forground.
        if left_pixel > center_pixel:
            for row in range(rows):
                for col in range(cols):
                    sample[row][col] = 1 - sample[row][col]
        
        # Make background white and forgraund black.
        if False:
            center_pixel = sample[14][15]

            low_end = center_pixel - margin
            if low_end < 0:
                low_end = 0
            high_end = center_pixel + margin
            if high_end > 255:
                high_end = 255

            # Convert pixels to binary values.
            for row in range(rows):
                for col in range(cols):
                    p = sample[row][col]
                    if p > low_end and p < high_end:
                        sample[row][col] = 0
                        pass
                    else:
                        sample[row][col] = 0
                    
    return samples
    


# In[7]:


def build_weights():
    '''
    There 9 weights per activation, and there are 100 activations.
    This function creates the weights with default values between
    -0.01 an 0.01
    '''
    print('\t Building weights.')
    
    # The number of activations:  The middle layer.
    j = 100
    
    # The number of pixels in the input layer and weights vector.
    k = 9
    
    # Create random weights from 0 to 1.
    weights = np.random.random_sample((j,k))
    
    # Double the weights from 0 to 2.
    weights = weights * 2
    
    # Shift the weights from -1 to 1.
    weights = weights - 1
    
    # Scale down by 100, resulting in values -0.01 through 0.01.
    weights = weights / 100
    
    return weights
    


# In[8]:


def build(target_file_names='downgesture_train.list.txt', number_of_files=1000):
    '''
    Build the model consisting of initialized weights and biases.  
    
    Also, build the sample array and labels needed to train the model.
    '''
    print('\t Building samples, weights, biases, and labels.')
    
    samples, labels = build_samples(target_file_names, number_of_files)
    
    # View sample images before making foreground darker than background. 
    if True:
        start = 0
        end = start + 25
        visualize_images(start, samples[start:end], labels[start:end])

    # Make the foreground darker than the background.
    samples = reverse_images(samples)

    # View sample images after making foreground darker than background.
    if True:
        start = 0
        end = start + 25
        visualize_images(start, samples[start:end], labels[start:end])

    # Visualize all samples.
    if False:
        for start in range(0, len(samples), 25):
            end = start + 25
            if end > len(samples) - 1:
                end = len(samples) - 1
                start = end - 25
            visualize_images(start, samples[start:end], labels[start:end])

    # Define weights.
    weights = build_weights()
    
    # Define biases.
    biases = np.zeros(100,)
     
    return (samples, weights, biases, labels)


# In[9]:


def fit(samples, weights, biases, labels, iterations=1000):
    '''
    Train the model with training samples and labels.
    '''
    print('\t Fitting weights and biases.')
    
    # Define number of samples.
    m = len(samples)
    
    # Define number of activations.
    n = 100
    
    # Define biases.
    b = biases
    
    # Define total cost.
    C = 0.0
    
    # Proces iterations.
    for h in range(iterations):
        
        # Define cost of the iteration.
        Ch = 0.0
        
        # Define variable for calculating the accuracy of the iteration.
        correct = 0
        count = 0

        # Process samples.
        for i in range(m):
               
            # Define sample cost.
            Ci = 0.0
    
            # Define activation vector.
            a = np.zeros(n,)
            
            # Process activations.
            for j in range(n):

                # Load pixel vector.
                p = np.zeros(9,)
                row = ((math.ceil((j + 1) / 10)) * 3) - 3
                col = ((j + 1) * 3 - 1) - (row * 10)
                p[0] = samples[i][row][col]
                p[1] = samples[i][row][col + 1]
                p[2] = samples[i][row][col + 2]
                p[3] = samples[i][row + 1][col]
                p[4] = samples[i][row + 1][col + 1]
                p[5] = samples[i][row + 1][col + 2]
                p[6] = samples[i][row + 2][col]
                p[7] = samples[i][row + 2][col + 1]
                p[8] = samples[i][row + 2][col + 2]

                # load weight vector.
                w = np.zeros(9,)
                for k in range(9):
                    w[k] = weights[j][k]

                # Calculate dot product of weights and pixels.
                a[j] = w@p
                
                # Calculate the probability.
                try:
                    a[j] = math.exp(a[j])/(math.exp(a[j]) + 1)
                except OverflowError as e:
                    print('OverflowError:', e, 'a[' + str(j) +']:', a[j])
                    print('h:', h, 'i:', i, 'j:', j)
                    print('w:', w)
                    print('p:', p)
                    print('labels:', labels)
                    break
                
                # Apply bias.
                a[j] = a[j] + b[j]

            # Calculate output by averaging activations.
            o = np.average(a)
            
            # Subtract 0.5 so the input of the output sigmoid
            # is 0.5 when the input is zero.
            o -= 0.5
            
            # Calculate the probability of the output.
            o = math.exp(o)/(math.exp(o) + 1)
            
            # Make a decision based on probability.
            if o >= 0.5:
                o = 1
            else:
                o = 0

            # Get the target for the cost calculation.
            y = labels[i]
            
            # Accumulate values for initial accuracy.
            count += 1
            if y == o:
                correct += 1

            # Debug misses.
            if False:
                if y == o:
                    correct += 1
                    print(' ')
                    if o == 0:
                        print('=== Hit on False ===')
                    else:
                        print('=== Hit on True ===')
                else:
                    if o == 1:
                        print('xxx Miss on False xxx')
                    else:
                        print('xxx Miss on True xxx')
                        print('h:', h, 'i:', i, 'y:', y, 'o:', o, 'avg:', np.average(a))
                        print(a)

            # Calculate iteration cost.
            Ci = (y - o)**2
            
            # Aggregate iteration cost and total cost.
            Ch += Ci
            C += Ci

            # Increment is the difference between label and output.
            C = (y - o)
            
            # Apply the learning rate to the increment.
            C = C * 0.1
            
            # Apply the increment to each weight scaled by the pixel value.
            for j in range(n):
                # Load pixel vector.
                p = np.zeros(9,)
                row = ((math.ceil((j + 1) / 10)) * 3) - 3
                col = ((j + 1) * 3 - 1) - (row * 10)
                p[0] = samples[i][row][col]
                p[1] = samples[i][row][col + 1]
                p[2] = samples[i][row][col + 2]
                p[3] = samples[i][row + 1][col]
                p[4] = samples[i][row + 1][col + 1]
                p[5] = samples[i][row + 1][col + 2]
                p[6] = samples[i][row + 2][col]
                p[7] = samples[i][row + 2][col + 1]
                p[8] = samples[i][row + 2][col + 2]
                
                # Adjust weights, but keep in original range of -0.01 to 0.01
                for k in range(9):
                    weights[j][k] = weights[j][k] + C*p[k]
                    if weights[j][k] > 0.01:
                        weights[j][k] = 0.01
                    elif weights [j][k] < -0.01:
                        weights[j][k] = -0.01
                        
        if h % 100 == 0:             
            print('\t iteration:', h, 'count:', count, 'correct:', correct, 'rate:',
                  round(correct/count, 2), 'cost:', Ch)
                        
    return (weights, biases)


# In[10]:


def predict(sample, weights, biases):
    '''
    Make a prediction of a sample image based on trained
    weights and biases.
    '''
    # Define number of samples.
    m = len(samples)
    
    # Define number of activations.
    n = 100
    
    # Define biases.
    b = biases
    
    # Define activation vector.
    a = np.zeros(n,)

    # Process activations.
    for j in range(n):

        # Load pixel vector.
        p = np.zeros(9,)
        row = ((math.ceil((j + 1) / 10)) * 3) - 3
        col = ((j + 1) * 3 - 1) - (row * 10)
        p[0] = sample[row][col]
        p[1] = sample[row][col + 1]
        p[2] = sample[row][col + 2]
        p[3] = sample[row + 1][col]
        p[4] = sample[row + 1][col + 1]
        p[5] = sample[row + 1][col + 2]
        p[6] = sample[row + 2][col]
        p[7] = sample[row + 2][col + 1]
        p[8] = sample[row + 2][col + 2]

        # load weight vector.
        w = np.zeros(9,)
        for k in range(9):
            w[k] = weights[j][k]

        # Calculate dot product of weights and pixels.
        a[j] = w@p

        # Calculate the probability.
        try:
            a[j] = math.exp(a[j])/(math.exp(a[j]) + 1)
        except OverflowError as e:
            print('OverflowError:', e, 'a[' + str(j) +']:', a[j])
            print('h:', h, 'i:', i, 'j:', j)
            print('w:', w)
            print('p:', p)
            print('labels:', labels)
            break

        # Apply bias.
        a[j] = a[j] + b[j]

    # Calculate output by averaging activations.
    o = np.average(a)

    # Subtract 0.5 so the input of the output sigmoid
    # is 0.5 when the input is zero.
    o -= 0.5

    # Calculate the probability of the output.
    o = math.exp(o)/(math.exp(o) + 1)

    # Make a decision based on probability.
    if o >= 0.5:
        o = 1
    else:
        o = 0
    
    # Return the decision.
    return o


# In[11]:


def score(weights, biases, target_file_names='downgesture_test.list.txt'):
    '''
    Calculate the rate of correct decisions given trained weights, biases,
    and a list of testing samples.
    '''
    # Define scoring counters.
    count = 0
    correct = 0
    
    # Build vectors of samples and labels.
    samples, labels = build_samples(target_file_names)

    # View sample images before making foreground darker than background. 
    if False:
        start = 0
        end = start + 25
        visualize_images(start, samples[start:end], labels[start:end])

    # Make the foreground darker than the background.
    samples = reverse_images(samples)

    # Make a decision for each sample.
    for i in range(len(samples)):
        count += 1
        o = predict(samples[i], weights, biases)
        y = labels[i]
        if y == o:
             correct += 1

    # Return the scoring counters.
    return (count, correct)
                    


# In[12]:


def run_keras_with_tensorflow():
    '''
    This function required the intallation of keras and tensorflow packages.
    If this function fails, consider loading these packages and run again.
    '''
    from keras import backend as K
    from keras.models import Sequential
    from keras.layers import Activation
    from keras.layers.core import Dense
    from keras.optimizers import Adam
    from keras.metrics import categorical_crossentropy

    # Build vectors of samples and labels.
    training_samples, training_labels = build_samples('downgesture_train.list.txt')
    testing_samples, testing_labels = build_samples('downgesture_test.list.txt')

    # Reshaping the training data to be a two-dimensional vector.
    training_samples = np.array(training_samples)
    training_samples.resize(len(training_samples),960)
    training_labels = np.array(training_labels)

    # Reshaping the testing data to be a two-dimensionaal vector.
    testing_samples = np.array(testing_samples)
    testing_samples.resize(len(testing_samples),960)
    testing_labels = np.array(testing_labels)

    # Build model.
    model = Sequential([
        Dense(100, input_shape=(960,)),
        Dense(10, activation='relu'),
        Dense(2, activation='softmax')
    ])

    # Display model structure.
    print('\n Model summary.')
    model.summary()

    # Configure model.
    model.compile(Adam(lr=0.1), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Train and test model.
    print('\n Training model.')
    model.fit(training_samples, training_labels, batch_size=10, epochs=8, shuffle=False)
    
    # Make predictions.
    print('\n Testing model.')
    predictions = model.predict_classes(testing_samples, batch_size=10)
    
    # Compare predictions to labels.
    count = len(testing_labels)
    correct = 0
    for i in range(len(testing_labels)):
        if predictions[i] == testing_labels[i]:
            correct += 1
    
    print('count:', count, 'correct:', correct, 'rate:', round(correct/count, 2))
            


# In[13]:


# Main
'''
This is the main routine from where all major functions are called.
'''
if True:
    # Display identification information.
    preamble()
    print('\n Starting main.')

    # Build model.
    print('\n Building model.')
    samples, weights, biases, labels = build()

    # Train model.
    print('\n Training model.')
    weights, biases = fit(samples, weights, biases, labels)

    # Test model.
    print('\n Scoring model.')
    count, correct = score(weights, biases)
    print('\t count:', count, 'correct:', correct, 'rate:', round(correct/count, 2))

# Software familiarization with keras and tensor flow.
print('\n Executing keras with tensorflow.')
print('\t If this step should fail, check if keras and tensorflow are installed.')
run_keras_with_tensorflow()

print('\n Done!')

