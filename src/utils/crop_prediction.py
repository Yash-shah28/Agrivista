import pickle
import json
import sys
import warnings

# Ignore warning related to invalid feature names
warnings.filterwarnings("ignore", message="X does not have valid feature names")

# Fetching the JSON data from command line arguments
data = sys.argv[1]

# Parsing the JSON data
parsed_data = json.loads(data)

# Extracting features
N = float(parsed_data.get("N"))
P = float(parsed_data.get("P"))
K = float(parsed_data.get("K"))
temperature = float(parsed_data.get("temperature"))
humidity = float(parsed_data.get("humidity"))
ph = float(parsed_data.get("ph"))
rainfall = float(parsed_data.get("rainfall"))

# Load the model file (ensure the correct path and file extension)
model_path = r'C:\Users\VICTUS\OneDrive\Desktop\Agri-git\Agrivista\src\utils\DecisionTree.pkl'

try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    # Making the prediction
    prediction = model.predict([[N, P, K, temperature, humidity, ph, rainfall]])

    # Convert prediction to string and print
    pred = str(prediction[0])
    print(pred)

except FileNotFoundError:
    print(f"Error: The model file '{model_path}' was not found.")
except Exception as e:
    print(f"An error occurred: {e}")
