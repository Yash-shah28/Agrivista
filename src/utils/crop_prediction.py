# crop-pred-DT
# print('Welcome') # type: ignore
import pickle
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
temperature = parsed_data.get("temperature")
humidity = parsed_data.get("humidity")
ph = parsed_data.get("ph")
rainfall = parsed_data.get("rainfall")
# print(type(N))

N = float(N)
P = float(P)
K = float(K)
temperature = float(temperature)
humidity = float(humidity)
ph = float(ph)
rainfall = float(rainfall)

model = pickle.load(open('C:\Users\VICTUS\OneDriveDesktop\Agri-git\Agrivista\src\utils\DecisionTree.pkl', 'rb'))
# print("Model loaded successfully.", file=sys.stderr)
prediction = model.predict([[N, P, K, temperature, humidity, ph, rainfall]])
pred = str(prediction[0])
print(pred)
    # # Return the prediction as JSON on stdout
    # print(json.dumps({'prediction': prediction[0]}))