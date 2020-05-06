#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from math import inf
from math import sqrt
from random import randint
import matplotlib.pyplot as plt


# In[ ]:


def preamble():
    print(' ')
    print('Fast Map')
    print('Patrick Humphries (pvhumphr@usc.edu)')
    print('University of Southern California')
    print('INF 552 Machine Learning for Data Science (32458)')
    print('Programming Assignment 3')
    print('Spring 202')
    print(' ')
    print('Due to the large amount of data that was provided')
    print('Please wait for the first graphic to display.')
    print('Canceling the current graphic will allow the next')
    print('graphic to be displayed.')
    print(' ')
    print('Should the visualization seem to clump all of data points')
    print('into a single location, just run the program again until')
    print('multiple data points are displayed.')


# In[ ]:


def create_G():
    '''
    The graph was used to develop the program.  It is based on
    "Dijkstra's shortest path algorithm | Greedy Algo-7" found at
    "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/".
    
    There is a flag in the main code that allows to switch between this graph
    and data provided by the professor.
    '''
    G = {}
    
    # Create verticies.
    V = {}
    V[0] = "Zero"
    V[1] = "One"
    V[2] = "Two"
    V[3] = "Three"
    V[4] = "Four"
    V[5] = "Five"
    V[6] = "Six"
    V[7] = "Seven"
    V[8] = "Eight"
    
    # Create edges.
    E = []
    E.append((0,1))
    E.append((1,2))
    E.append((2,3))
    E.append((3,4))
    E.append((4,5))
    E.append((5,6))
    E.append((6,7))
    E.append((7,8))
    
    E.append((0,7))
    E.append((1,7))
    
    E.append((2,8))
    E.append((6,8))
    
    E.append((2,5))
    E.append((3,5))
    
    # Create weights.
    w = {}
    w[(0,1)] = 4
    w[(1,2)] = 8
    w[(2,3)] = 7
    w[(3,4)] = 9
    w[(4,5)] = 10
    w[(5,6)] = 2
    w[(6,7)] = 1
    w[(7,8)] = 7
    
    w[(0,7)] = 8
    w[(1,7)] = 11
    
    w[(2,8)] = 2
    w[(6,8)] = 6
    
    w[(2,5)] = 4
    w[(3,5)] = 14
    
    # Create graph.
    G = {"V":V,"E":E,"w":w}

    return G


# In[ ]:


def get_maximum_path_length(T):
    '''
    T is a dictionary of vertices for the Shortest Path Tree.
    '''
    max_vertex_key = None
    max_distance = 0.0
    
    for key in T.keys():
        if T[key] > max_distance:
            max_distance = T[key]
            max_vertex_key = key

    return (max_vertex_key, max_distance)    


# In[ ]:


def plot_results(V,P):
    '''
    Plot the two-dimensional verticies (P) with annotations (V).
    '''
    # Plot coordinates.
    X = []
    Y = []
    N = []
    
    # Plot axes.
    min_x = 0.0
    max_x = 0.0
    min_y = 0.0
    max_y = 0.0
    
    # Process the points.
    for vertex_key in P.keys():
        
        x = P[vertex_key][0]
        y = P[vertex_key][1]
        n = V[vertex_key]
        
        X.append(x)
        Y.append(y)
        N.append(n)
        
        if x < min_x:
            min_x = x
        if x > max_x:
            max_x = x
        if y < min_y:
            min_y = y
        if y > max_y:
            max_y = y
        
    fig, ax = plt.subplots()
    
    ax.scatter(X, Y)
    
    plt.xlim(min_x - 1, max_x + 5)
    plt.ylim(min_y - 1, max_y + 1)
    
    for i, txt in enumerate(N):
        ax.annotate(txt, (X[i], Y[i]))
        
    plt.show()


# In[ ]:


def print_G(G):
    '''
    G is a representation of a graph consisting of vertices (V), 
    edges (E) and edge weights (w).
    '''
    temp_V = G["V"]
    temp_E = G["E"]
    temp_w = G["w"]

    print('G')
    print('V:', temp_V)
    print(' ')
    print('E:', temp_E)
    print(' ')
    print('w:', temp_w)
    print(' ')


# In[ ]:


def print_G1(G1):
    '''
    G1 is a working graph.  It is referenced at G' in documentation.
    It consists of vertices (V), edges (E), and a working version
    of edge weights (w1).  Edge weights are usually referred to as
    w'.
    '''
    temp_V = G1["V"]
    temp_E = G1["E"]
    temp_w1 = G1["w1"]

    print('G1:')
    print('V:', temp_V)
    print(' ')
    print('E:', temp_E)
    print(' ')
    print('w1:', temp_w1)
    print(' ')


# In[ ]:


def load_G():
    '''
    Load the text files provided by the professor into a graph.
    G:  graph
    V:  vertices
    w:  edge weights
    '''
    
    # Initialize graph components.
    V = {}
    E = []
    w = {}
    
    # Load graph components.
    rows = open("fastmap-data.txt", "r")
    
    for row in rows:
        
        row = row.strip()
        fields = row.split('\t')
        
        # Add or update the vertices.
        vertex_index_1 = int(fields[0])
        V[vertex_index_1] = "placeholder"
        
        vertex_index_2 = int(fields[1])
        V[vertex_index_2] = "placeholder"
        
        # Add the edges.
        e = ((vertex_index_1, vertex_index_2))
        E.append(e)
        
        # Add edge weights.
        w[(vertex_index_1, vertex_index_2)] = int(fields[2])
       
    # Add strings as an attribute of the vertices.
    i = 1
    rows = open("fastmap-wordlist.txt")
    
    for row in rows:
        
        row = row.strip()
        V[i] = row
        i += 1

    # Okay, we're done.  Package up the graph.
    G = {"V":V, "E":E, "w":w}
    
    return G


# In[ ]:


def tabulate_shortest_paths(G1,vertex_key=0):
    '''
    The working graph (G1) is projected to an Euclidean system by taking
    a portion of each edge weight and using it for a dimension value.  The
    size of this portion is heuristic, and it is calculated using triangles.
    
    First, the base of the triangle is defined as the farthest two vertices.
    This is calculated using the Shortest Path Tree algorithm.
    
    For each vertex, two sides of the triangle are determined.  The right
    side of the triangle is the Shortest Path from the right most vertex
    of the base.  As you may guess, the left side of the triangle is 
    determine by a Shortest Path Tree from the left most vertex of the
    triangle base.
    
    S is a collection of vertices and their two sides.
    '''
    # Initialize shortest distances or sides of the triangle.
    S = {}
       
    # Initialize variables that are used for the base of the triangle.
    vertex_key_a = None
    previous_vertex_key_a = None
    vertex_a_distance = 0.0
    previous_vertex_a_distance = 0.0
    
    vertex_key_b = None
    previous_vertex_key_b = None
    vertex_b_distance = 0.0
    previous_vertex_b_distance = 0.0
    
    # Find the base of the triangle.
    T = shortest_path_tree(G1,vertex_key=vertex_key)
    max_vertex_key, max_distance = get_maximum_path_length(T)
    previous_vertex_key_a = max_vertex_key
    previous_vertex_a_distance = max_distance
    
    vertex_key = max_vertex_key
    
    T = shortest_path_tree(G1,vertex_key=vertex_key)
    max_vertex_key, max_distance = get_maximum_path_length(T)
    previous_vertex_key_b = max_vertex_key
    previous_vertex_b_distance = max_distance
    
    for i in range(0,4):
        
        vertex_key = max_vertex_key

        T = shortest_path_tree(G1,vertex_key)
        max_vertex_key, max_distance = get_maximum_path_length(T)
        vertex_key_a = max_vertex_key
        vertex_a_distance = max_distance
        
        vertex_key = max_vertex_key
        
        T = shortest_path_tree(G1,vertex_key)
        max_vertex_key, max_distance = get_maximum_path_length(T)
        vertex_key_b = max_vertex_key
        vertex_b_distance = max_distance
        
        if vertex_key_a == None:
            return None
        
        if vertex_key_b == None:
            return None
    
    # Once the base is known, then a Shortest Path Tree is used
    # to determine the size of each side of the triangle.
    if vertex_key_a < vertex_key_b:
        T_left_to_right = shortest_path_tree(G1,vertex_key_a)
        T_right_to_left = shortest_path_tree(G1,vertex_key_b)
    else:
        T_left_to_right = shortest_path_tree(G1,vertex_key_b)
        T_right_to_left = shortest_path_tree(G1,vertex_key_a)
        
    for key in T_left_to_right.keys():
        left_side_of_triangle = T_left_to_right[key]
        right_side_of_triangle = T_right_to_left[key]
        S[key] = (left_side_of_triangle, right_side_of_triangle)

    return S
    


# In[ ]:


def calculate_P(G,Kmax,threshold):
    '''
    P is a container of Euclidean dimensions for each vertex.
    Kmax is the maximum number of dimension values.
    threshold is the smallest value for the triangle base.
    '''
    
    V = G["V"]
    E = G["E"]
    w = G["w"]

    # Create Euclidean points.
    P = {}
    for vertex_key in V.keys():
        P[vertex_key] = []
        for dimension_index in range(0, Kmax):
            P[vertex_key].append(0)

    # Create working copy of edge weights.
    w1 = w.copy()

    # Set the initial dimension.
    K = 0
    
    # Constants for legibility.
    left_side = 0
    right_side = 1

    # Add dimension values to points.
    while Kmax > 0:

        # Create working graph G1 from graph G and working weights w1.
        G1 = {"V":V, "E":E, "w1":w1}

        # Select a random vertex.
        vertex_key = randint(0, (len(V) - 1))

        # Tabulate shortest paths starting with random vertex.
        S = tabulate_shortest_paths(G1,vertex_key=vertex_key)
        if S == None:
            break
            
        # Get the trangle base.
        triangle_base = 0
        for key in S.keys():
            sides = S[key]
            if sides[left_side] > triangle_base:
                triangle_base = sides[left_side]
            if sides[right_side] > triangle_base:
                triangle_base = sides[right_side]

        # Quit when the triangle base is less than the treshold.
        if triangle_base <= threshold:
            print('Threshold',threshold,'exceeded for triangle base', triangle_base)
            break

        # Compute the dimension values.
        for key in S.keys():
            triangle_left_side = S[key][left_side]
            triangle_right_side = S[key][right_side]
            dimension_value = (triangle_left_side + triangle_base - triangle_right_side)/2
            P[key][K] = dimension_value

        # Reduce the working edge weight by the difference dimension values.
        for w1_key in w1.keys():
            weight = w1[w1_key]
            left_vertex_key = w1_key[left_side]
            right_vertex_key = w1_key[right_side]
            pu = P[left_vertex_key][K]
            pv = P[right_vertex_key][K]
            w1[w1_key] -= abs(pu - pv)

        Kmax -= 1; K += 1
        
    return P


# In[ ]:


def shortest_path_tree(G1,vertex_key=0):
    '''
    Given a working graph (G1) and an optional starting vertex,
    create the Shortest Path Trees (T).  From the starting vertex,
    this function keeps adding the vertex of the shortest edge to
    the tree.  It uses the edge weights to determine branch length.
    
    In each iteration, the adjacent branches are collected.  The
    shortest branch is added to the tree and removed from the 
    adjacent branches collection.  Get it?  Adding branches to
    a tree.
    '''
    V = G1["V"]
    E = G1["E"]
    w = G1["w1"]
    
    # Initialize shortest path tree with no apples.
    T = {}
    
    # Initialize the adjacent branches, from which the shortest will be selected.
    adjacent_branches = {}
    
    # Add the root to the vertex tree.
    T[vertex_key] = 0
    
#     print(' ')
#     print('shortest_path_tree, vertex_key:', vertex_key)
    
    # Select adjacent verticies with aggregated weights as potential apples for the tree (T).
    while True:
        
        # Find the edges (using weights) that are adjacent to the current vertex.
        # When found, add them to the adjacent branches.
        for w_key in w.keys():
      
            # Check if the vertex is connected to the back end of the edge.
            if vertex_key == w_key[0]:
                
                # Bypass a vertex if it is already on the tree.
                if w_key[1] in T.keys():
                    pass
                else:
                    z = w[w_key] + T[w_key[0]]
                    if w_key[1] in adjacent_branches.keys():
                        
                        # Only keep the shortest branches.
                        if adjacent_branches[w_key[1]] < z:
                            pass
                        else:
                            adjacent_branches[w_key[1]] = z
                    else:
                        adjacent_branches[w_key[1]] = z                        
            
            # Check if the vertex is connected to the back end of the edge.
            if vertex_key == w_key[1]:
                
                # Bypass a vertex if it is already on the tree.
                if w_key[0] in T.keys():
                    pass
                else:
                    z = w[w_key] + T[w_key[1]]
                    if w_key[0] in adjacent_branches.keys():
                        
                        # Only keep the shortest branches.
                        if adjacent_branches[w_key[0]] < z:
                            pass
                        else:
                            adjacent_branches[w_key[0]] = z
                    else:
                        adjacent_branches[w_key[0]] = z                        
            

        # If there are no further adjacent branches, then all vertices have been processed.
        if len(adjacent_branches) == 0: 
            break
            
        # Find the shortest branch and add it to the shortest path tree.
        shortest_branch = inf
        shortest_branch_key = None
        for adjacent_branch_key in adjacent_branches.keys():
            if adjacent_branches[adjacent_branch_key] < shortest_branch:
                shortest_branch = adjacent_branches[adjacent_branch_key]
                shortest_branch_key = adjacent_branch_key
                
        # Add the shortest branch in the adjacent branches to the shortest path tree.
        T[shortest_branch_key] = shortest_branch 
        
        
        # Remove the shortest branch from the adjacent branches.
        adjacent_branches.pop(shortest_branch_key)
        
        # Set the vertex_key to the shortest_branch_key.
        # Edges connected to this vertex will be added to the adjacent branches.
        vertex_key = shortest_branch_key

    return T


# In[ ]:


def compare_hypotenuse_to_spt(G,P):
    '''
    Now that the graph (G) has been mapped heuristically to
    an Euclidean space (P), compare the two.  The hypotenuse
    will equal or less than a distance calculated from a 
    Shortest Path Tree.  The hypotenuse is a straight line
    and a heuristic estimation.  The Shortest Path Tree is, well,
    as the crow flys.
    '''
    # Create a working graph.
    V = G["V"]
    E = G["E"]
    w1 = G["w"]
    G1 = {"V":V, "E":E, "w1":w1}
    
    # Get a shortest path tree.
    vertex_key = randint(0, (len(V) - 1))
    for i in range(0,4):
        T = shortest_path_tree(G1,vertex_key)
        max_vertex_key, max_distance = get_maximum_path_length(T)
        vertex_key = max_vertex_key
        
    # Define the fist point used in calculating the hypotenuse.
    first_vertex_key = None
    for vertex_key in T.keys():
        first_vertex_key = vertex_key
        break
        
    x1 = P[first_vertex_key][0]
    y1 = P[first_vertex_key][1]
        
    # Compare spt to hypotenuse.
    print(' ')
    print('vertex\t\tspt\tpu\t\tpv\t\thypotenuse\tdifference')
    for vertex_key in T.keys():
        x2 = P[vertex_key][0]
        x = x1 - x2
        y2 = P[vertex_key][1]
        y = y1 - y2
        hypotenuse = round(sqrt((x**2) + (y**2)), 1)
        difference = round(abs(T[vertex_key] - hypotenuse),2)
        
        
        print(V[vertex_key].ljust(14), '\t', T[vertex_key], '\t(', x1, ',', y1, ')\t(', x2, ',', y2, ')\t',               hypotenuse, '\t\t', difference)       
        


# In[ ]:


# main
'''
This is the main routine.  It calls functions that create a graph,
calculate Euclidean dimension values, print the results, and 
plots the results.
'''

# Create graph.
if False:
    # Create the graph from an example of used for Shortest Path Tree.
    G = create_G()
else:
    # Create the graph from files provided by the professor.
    preamble()
    G = load_G()

# A graph is composed of vertices (V), edges (E), and edge weights (w).
V = G["V"]
E = G["E"]
w = G["w"]

# Set maximum of dimensions.
Kmax = 2

# Set triangle minimum size (threshold or Epsilon).
threshold = 0.5

# Calculate the Euclidean dimension values for graph G.
P = calculate_P(G,Kmax,threshold)

# Compare calculate hypotenuse to shortest path tree.
compare_hypotenuse_to_spt(G,P)

# Plot Results.
plot_results(V,P)

