#!/usr/bin/env python
# coding: utf-8

# In[ ]:


def preamble():
    print('Course:  INF 552 Machine Learning for Data Science')
    print('Session:  Spring 2020')
    print('Section:  32458')
    print('Student Name:  Patrick Humphries')
    print('Student ID:  7097-1087-72')
    print('Student email:  pvhumphr@usc.edu')
    print('Programming Assignment 1:  Decision Trees')
    print('Part 1:  Implementation')
    print(' ')
    print('Summary')
    print('This program does the following:')
    print('1.  Loads a csv file into a Decision Tree.')
    print('2.  Give the user the option to display the Decision Tree.')
    print('3.  Give the user the option to test the Decision Tree by entering attribute values.')


# In[ ]:


import csv
from random import sample
from math import floor
from math import log
import sys


# In[ ]:


def load_csv():
    '''
    The data that was provided was manually converted into a csv file and read by this functions.
    Originally, the data was split evenly into training_data and testing_data.
    However, the nature of the data required all data to be used for training_data.
    '''
    rows = []
    training_data = []
    testing_data = []
    with open('dt_data.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        next(csvreader)
        for row in csvreader:
            row[-1] = row[-1].rstrip()
            rows.append(row)
            
#     training_data = sample(rows, floor((len(rows)/2)))
    training_data = sample(rows, len(rows))
    
    # Write data not used in training data to testing data.
    for row in rows:
        training_datum_was_found = False
        for training_datum in training_data:
            if training_datum[0] == row[0]:
                training_datum_was_found = True
                break
        if training_datum_was_found:
            continue
        else:
            testing_data.append(row)
    return (training_data, testing_data)


# In[ ]:


def print_rows(rows):
    '''
    Dump the input file for analysis.
    '''
    for row in rows:
        print(row)


# In[ ]:


def calculate_entropy(yes, no):
    '''
    Calculate the entropy (uncertainty) given totals for "yes" and "no" values.
    '''
    # When equal, totally uncertain.
    if yes == no:
        return 1.00
    total = yes + no
    
    # Totally certain if there are only 'Yes' values.
    if yes == total:
        return 0.00
    
    # Totally certain if there are only 'No' values.
    if no == total:
        return 0.00
    
    # Textbook calculation of entropy.
    yes_ratio = yes / total
    no_ratio = no / total
    
    entropy = ((-1) * (yes_ratio * log(yes_ratio, 2))) - (no_ratio * log(no_ratio, 2))
    
    return round(entropy, 2)


# In[ ]:


def calculate_gain(X, Attribute, Occupied='all', Price='all', Music='all', 
                   Location='all', VIP='all', Beer='all'):
    '''
    Depending on the Attribute and filter arguments, the training data (X) is
    searched and "Yes" or "No" values are counted.  Based on these counts,
    entropy, weight, and Information Gain are calculated and returned.
    '''

    # Build an accumulator for counting values for the Enjoy label.
    if Attribute == 'Occupied':
        accumulator = {'High':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Moderate':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Low':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}
        
    elif Attribute == 'Price':
        accumulator = {'Expensive':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Normal':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Cheap':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}
        
    elif Attribute == 'Music':
        accumulator = {'Loud':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Quiet':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}

    elif Attribute == 'Location':
        accumulator = {'Talpiot':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'City-Center':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'German-Colony':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Ein-Karem':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'Mahane-Yehuda':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}
        
    elif Attribute == 'VIP':
        accumulator = {'Yes':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'No':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}
        
    elif Attribute == 'Beer':
        accumulator = {'Yes':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0},
                       'No':{'Yes':0,'No':0,'Entropy':0.0,'Weight':0.0}}
        
    accumulator['Total'] = {'Yes':0,'No':0,'Entropy':0.0,'Gain':0.0}
        
    # Count Enjoy labels, excluding values that have already been processed.
    for x in X:
        
        if Attribute == 'Occupied':
            if x[2] != Price and Price != 'all':
                continue
            if x[3] != Music and Music != 'all':
                continue
            if x[4] != Location and Location != 'all':
                continue
            if x[5] != VIP and VIP != 'all':
                continue
            if x[6] != Beer and Beer != 'all':
                continue
            accumulator[x[1]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
            
        elif Attribute == 'Price':
            if x[1] != Occupied and Occupied != 'all':
                continue
            if x[3] != Music and Music != 'all':
                continue
            if x[4] != Location and Location != 'all':
                continue
            if x[5] != VIP and VIP != 'all':
                continue
            if x[6] != Beer and Beer != 'all':
                continue
            accumulator[x[2]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
                    
        elif Attribute == 'Music':
            if x[1] != Occupied and Occupied != 'all':
                continue
            if x[2] != Price and Price != 'all':
                continue
            if x[4] != Location and Location != 'all':
                continue
            if x[5] != VIP and VIP != 'all':
                continue
            if x[6] != Beer and Beer != 'all':
                continue
            accumulator[x[3]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
            
        elif Attribute == 'Location':
            if x[1] != Occupied and Occupied != 'all':
                continue
            if x[2] != Price and Price != 'all':
                continue
            if x[3] != Music and Music != 'all':
                continue
            if x[5] != VIP and VIP != 'all':
                continue
            if x[6] != Beer and Beer != 'all':
                continue
            accumulator[x[4]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
                
        elif Attribute == 'VIP':
            if x[1] != Occupied and Occupied != 'all':
                continue
            if x[2] != Price and Price != 'all':
                continue
            if x[3] != Music and Music != 'all':
                continue
            if x[4] != Location and Location != 'all':
                continue
            if x[6] != Beer and Beer != 'all':
                continue
            accumulator[x[5]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
            
        elif Attribute == 'Beer':
            if x[1] != Occupied and Occupied != 'all':
                continue
            if x[2] != Price and Price != 'all':
                continue
            if x[3] != Music and Music != 'all':
                continue
            if x[4] != Location and Location != 'all':
                continue
            if x[5] != VIP and VIP != 'all':
                continue
            accumulator[x[6]][x[7]] += 1
            accumulator['Total'][x[7]] += 1
                
    # Calculate probabilities.
    information_gain = 0
    for k in accumulator.keys():
        # Assign entropy 
        yes = accumulator[k]['Yes']
        no = accumulator[k]['No']
        entropy = calculate_entropy(yes, no)
        accumulator[k]['Entropy'] = entropy
        
        # Assign weight
        n = yes + no
        d = accumulator['Total']['Yes'] + accumulator['Total']['No']
        if d == 0:
            weight = 0.0
        else:
            weight= round((n/d),2)
        accumulator[k]['Weight'] = weight
        
        # Accumulate information gain
        if k == 'Total':
            pass
        else:
            information_gain += (entropy * weight)
    
    accumulator['Total']['Gain']         = round(accumulator['Total']['Entropy'] - round(information_gain, 2),2)
        
     # Print the contents of the accumulator for visual inspection.
    if False:
        print(' ')
        print('accumulator for ', Attribute)
        for k, v in accumulator.items():
            print(k, v)
            
    keys = accumulator.keys()
    keys = list(keys)
    
    returned = (accumulator['Total']['Gain'],
                accumulator['Total']['Entropy'], 
                keys,
                accumulator['Total']['Yes'],
                accumulator['Total']['No'])
    
    if False:
        print('returnd:', returned)
    
    return returned
    


# In[ ]:


def split_attribute (X, Attribute, Branch, Tree, Occupied='all', Price='all', Music='all', 
                     Location='all', VIP='all', Beer='all'):
    '''
    Split the current Attribute.  If the split results in no further Information Gain, 
    then append the Branch to the Tree.  Otherwise, recursively call this function for every
    split value of the Attribute.  The arguments, when not "all", indicate the values
    already processed, hence, branch control.
    '''
    
    # Make a copy so not to overlay other calls to split_attribute.
    # Tree is shared by all spawned functions.
    Branch = Branch.copy()

    # When about to split an Attribute, the Attribute and its value are given in
    # the arguments.  At this time, add it to the Rule.  The value species the
    # branch being taken.
    if Attribute == 'Occupied':
        Branch.append({'Occupied': Occupied})
    elif Attribute == 'Price':
        Branch.append({'Price': Price})
    elif Attribute == 'Music':
        Branch.append({'Music': Music})
    elif Attribute == 'Location':
        Branch.append({'Location': Location})
    elif Attribute == 'VIP':
        Branch.append({'VIP': VIP})
    elif Attribute == 'Beer':
        Branch.append({'Beer': Beer})
    else:
        print('Invalid Attribute passed to split_attribute:', Attribute)
        return
    
    # Determine which Attributes to be searched for Information Gain.
    max_information_gained = 0
    max_entropy = 0.0
    max_attribute = ''
    max_keys = []
    
    # Search only that have yet to be searched in this branch.
    attrs = []
    if Occupied == 'all':
        attrs.append('Occupied')
    if Price == 'all':
        attrs.append('Price')
    if Music == 'all':
        attrs.append('Music')
    if Location == 'all':
        attrs.append('Location')
    if VIP == 'all':
        attrs.append('VIP')
    if Beer == 'all':
        attrs.append('Beer')
       
    # At the end of a branch.
    if len(attrs) == 0:
        return

    # Select attr that has the most Information Gain.
    yes = 0
    total_yes = 0
    no = 0
    total_no = 0
    for attr in attrs:
        
        returned = calculate_gain(X, attr, Occupied, Price, Music, Location, VIP, Beer)
        
        information_gained = returned[0]
        entropy = returned[1]
        attribute_keys = returned[2]
        yes = returned[3]
        total_yes += yes
        no = returned[4]
        total_no += no
        attribute_keys = attribute_keys.copy()
        attribute_keys.remove('Total')
        
        if information_gained > max_information_gained:
            max_information_gained = information_gained
            max_entropy = entropy
            max_attribute = attr
            max_keys = attribute_keys

    # No additional Attributes were found in branch that improved Information Gain.
    # The Enjoy label is appended to the Branch and the Branch is appended to the Tree.
    if len(max_attribute) == 0:
        
        # Check for the end of a branch.
        if (total_yes + total_no) == 0:
            return

        # Add Enjoy to the end of the branch.
        if total_yes > 0:
            if total_no > 0:
                Branch.append({'Enjoy':'Uncertain'})
            else:
                Branch.append({'Enjoy':'Yes'})
        else:
            Branch.append({'Enjoy':'No'})
            
        Tree.append(Branch)
        
        return

    # Split on each value of the next Attribute.
    if max_attribute == 'Occupied':
        for max_key in max_keys:
            Occupied = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    elif max_attribute == 'Price':
        for max_key in max_keys:
            Price = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    elif max_attribute == 'Music':
        for max_key in max_keys:
            Music = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    elif max_attribute == 'Location':
        for max_key in max_keys:
            Location = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    elif max_attribute == 'VIP':
        for max_key in max_keys:
            VIP = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    elif max_attribute == 'Beer':
        for max_key in max_keys:
            Beer = max_key
            split_attribute (X, max_attribute, Branch, Tree, 
                             Occupied, Price, Music, Location, VIP, Beer)
    else:
        print('Next Attribute was not selected in split_attribute.')
    


# In[ ]:


def build_tree():
    '''
    Select the Attribute with the most Information Gain in a split as the starting point.
    # Navigation down a path is controled by argument values.
    # Attribute-Value pairs are added to a Branch until the next split results in no Information Gain.
    # At this point, the Attribute is certain of its value.  The Branch is appended to the Tree.
    '''
    # Container for Branch objects.
    Tree = []

    # List of attribute and value pairs.
    Branch = []

    # Load data
    datasets = load_csv()

    # Training Data
    X = datasets[0]

    # Select root Attribute
    max_information_gained = 0
    max_entropy = 0.0
    max_attribute = ''
    max_keys = []
    Attributes = ['Occupied','Price','Music','Location','VIP','Beer']
    for Attribute in Attributes:
        returned = calculate_gain(X, Attribute)
        information_gained = returned[0]
        entropy = returned[1]
        attribute_keys = returned[2]
        attribute_keys = attribute_keys.copy()
        attribute_keys.remove('Total')
        if information_gained > max_information_gained:
            max_information_gained = information_gained
            max_attribute = Attribute
            max_keys = attribute_keys

    if max_attribute == 'Occupied':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, Occupied=max_key)
    elif max_attribute == 'Price':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, Price=max_key)
    elif max_attribute == 'Music':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, Music=max_key)
    elif max_attribute == 'Location':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, Location=max_key)
    elif max_attribute == 'VIP':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, VIP=max_key)
    elif max_attribute == 'Beer':
        for max_key in max_keys:
            split_attribute (X, max_attribute, Branch, Tree, Beer=max_key)
    else:
        print('Starting Attribute was not selected in main.')
        
    return Tree


# In[ ]:


def dump_tree(Tree):
    print(' ')
    print('Decision Tree:')
    print(' ')
    print('The Tree is a list of lists.  Each list in the Tree is a branch.')
    print('Each branch contains dictionaries.  Each dictionary contains the')
    print('name of an attribute and its value. The dictionary at the left end')
    print('of a branch is the root of the Tree.  The dictionary at the right')
    print('end of a branch is the leaf, Enjoy.')
    print(' ')
    print('The Tree is built, starting at the root, by selecting the first')
    print('attribute that had the maximum information gain.  The information')
    print('gain is determined by splitting the attribute by its values and')
    print('adding an attribute of maximum gain to each value.')
    print(' ')
    print('The splitting process is recursive.  It ends when the subsequent')
    print('attribute yields no information gain.  In this state, the attribute')
    print('is certain.  The Enjoy value is determined from the entropy calculation')
    print('by determining if the entropy was calulated using "Yes" or "No" values.')
    print(' ')
    print('Tree')
    print('len(Tree):', len(Tree))
    for Branch in Tree:
        print(Branch)    


# In[ ]:


def user_dialogue(Tree):
    '''
    Prompt the user for attribute values.  Examine the Branches of the Decision Tree to find
    a match.  If a match is found, return the Enjoy value for that branch.  Otherwise reurn
    "Unknown" since no example in the training dataset contained that combination of attribute
    values.
    '''
    print(' ')
    print('0 Exit')
    print('1 High')
    print('2 Moderate (default)')
    print('3 Low')
    occupied = ''
    x = input('Enter value for Occupied ==> ')
    if x == '0':
        return '0'
    elif x == '1':
        occupied = 'High'
    elif x == '2' or x == '':
        occupied = 'Moderate'
    elif x == '3':
        occupied = 'Low'
    else:
        return 'Invalid input'
    print(' ')
    print('0 Exit')
    print('1 Expensive')
    print('2 Normal')
    print('3 Cheap (default)')
    x = input('Enter value for Price ==> ')
    if x == '0':
        return '0'
    elif x == '1':
        price = 'Expensive'
    elif x == '2':
        price = 'Normal'
    elif x == '3' or x == '':
        price = 'Cheap'
    else:
        return 'Invalid input'
    print(' ')
    print('0 Exit')
    print('1 Loud (default)')
    print('2 Quiet')
    x = input('Enter value for Music ==> ')
    if x == '0':
        return '0'
    elif x == '1' or x == '':
        music = 'Loud'
    elif x == '2':
        music = 'Quiet'
    else:
        return 'Invalid input'
    print(' ')
    print('0 Exit')
    print('1 Talpiot')
    print('2 City-Center (default)')
    print('3 German-Colony')
    print('4 Ein-Karem')
    print('5 Mahane-Yehuda')
    x = input('Enter value for Location ==> ')
    if x == '0':
        return '0'
    elif x == '1':
        location = 'Talpiot'
    elif x == '2' or x =='':
        location = 'City-Center'
    elif x == '3':
        location = 'German-Colony'
    elif x == '4':
        location = 'Ein-Karem'
    elif x == '5':
        location = 'Mahane-Yehuda'
    else:
        return 'Invalid input'
    print(' ')
    print('0 Exit')
    print('1 Yes')
    print('2 No (default)')
    x = input('Enter value for VIP ==> ')
    if x == '0':
        return '0'
    elif x == '1':
        vip = 'Yes'
    elif x == '2' or x == '':
        vip = 'No'
    else:
        return 'Invalid input'
    print(' ')
    print('0 Exit')
    print('1 Yes')
    print('2 No (default)')
    x = input('Enter value for Favorite Beer ==> ')
    if x == '0':
        return '0'
    elif x == '1':
        beer = 'Yes'
    elif x == '2' or x == '':
        beer = 'No'
    else:
        return 'Invalid input'
    
    # If the entered values equal values of a branch, then return the Enjoy of the branch.
    for Branch in Tree:
        for Attribute in Branch:
            items = list(Attribute.items())
            if items[0][0] == 'Occupied' and items[0][1] != occupied:
                break
            if items[0][0] == 'Price' and items[0][1] != price:
                break
            if items[0][0] == 'Music' and items[0][1] != music:
                break
            if items[0][0] == 'Location' and items[0][1] != location:
                break
            if items[0][0] == 'VIP' and items[0][1] != vip:
                break
            if items[0][0] == 'Beer' and items[0][1] != beer:
                break
            if items[0][0] == 'Enjoy':
                return items[0][1]
            
    return 'Unkown'
            


# In[ ]:


# Main
# Options will be displayed to the user.
# Option 0:  Exit the program.
# Option 1:  Display the Decision Tree and its interpretation.
# Opiton 2:  Start a dialog that prompts the user for attribute values.  Enjoy labels is returned.

preamble()
sys.stdout.flush()
print(' ')
print('Welcome')
Tree = build_tree()
while True:
    print(' ')
    print('Enter one of the following options:')
    print('0 Exit')
    print('1 Display Decision Tree')
    print('2 Check Enjoy by entering attribute values.')
    user_input = input('==> ')
    if user_input == '0':
        break
    elif user_input == '1':
        dump_tree(Tree)
    elif user_input == '2':
        enjoy = user_dialogue(Tree)
        if enjoy == '0':
            break
        else:
            print(' ')
            print('Enjoy:', enjoy)
    else:
        print('Your selection was not understood.')
print('Good Bye')


# In[ ]:




