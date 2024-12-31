# crop-pred-DT
# print('Welcome') # type: ignore
import os
import numpy as np
import pandas as pd 
import json
import sys
import warnings
warnings.filterwarnings("ignore", message="X does not have valid feature names")


# print("Welcome to ",str(sys.argv[1]))
data = (sys.argv[1])

parsed_data = json.loads(data)

N = parsed_data.get("N")
P = parsed_data.get("P")
K = parsed_data.get("K")
crop_name = parsed_data.get("crop")
# print(type(N))

N = float(N)
P = float(P)
K = float(K)

df = pd.read_csv('Data/fertilizer.csv')

nr = df[df['Crop'] == crop_name]['N'].iloc[0]
pr = df[df['Crop'] == crop_name]['P'].iloc[0]
kr = df[df['Crop'] == crop_name]['K'].iloc[0]

n = nr - N
p = pr - P
k = kr - K

temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
max_value = temp[max(temp.keys())]
if max_value == "N":
    if N < 0:
        key = 'Nhigh'

script_dir = os.path.dirname(os.path.realpath(__file__))  # Get the current script directory
model_path = os.path.join(script_dir, '')  # Relative path to the `.pkl` file


# print("Model loaded successfully.", file=sys.stderr)
prediction = model.predict([[N, P, K, temperature, humidity, ph, rainfall]])
pred = str(prediction[0])
print(pred)
    # # Return the prediction as JSON on stdout
    # print(json.dumps({'prediction': prediction[0]}))