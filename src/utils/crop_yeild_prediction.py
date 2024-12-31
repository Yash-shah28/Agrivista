import os
import pickle
import json
import sys
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings("ignore", message="X does not have valid feature names")


def map_crop_to_number(crop_name):
    crop_mapping = {
        'Arecanut': 0,
        'Arhar/Tur': 1,
        'Castor seed': 8,
        'Coconut': 9,
        'Cotton(lint)': 11,
        'Dry chillies': 13,
        'Gram': 16,
        'Jute': 21,
        'Linseed': 23,
        'Maize': 24,
        'Mesta': 26,
        'Niger seed': 29,
        'Onion': 31,
        'Other Rabi pulses': 32,
        'Potato': 37,
        'Rapeseed & Mustard': 39,
        'Rice': 40,
        'Sesamum': 43,
        'Small millets': 44,
        'Sugarcane': 46,
        'Sweet potato': 48,
        'Tapioca': 49,
        'Tobacco': 50,
        'Turmeric': 51,
        'Wheat': 53,
        'Bajra': 2,
        'Black pepper': 5,
        'Cardamom': 6,
        'Coriander': 10,
        'Garlic': 14,
        'Ginger': 15,
        'Groundnut': 17,
        'Horse-gram': 19,
        'Jowar': 20,
        'Ragi': 38,
        'Cashewnut': 7,
        'Banana': 3,
        'Soyabean': 45,
        'Barley': 4,
        'Khesari': 22,
        'Masoor': 25,
        'Moong(Green Gram)': 27,
        'Other Kharif pulses': 34,
        'Safflower': 41,
        'Sannhamp': 42,
        'Sunflower': 47,
        'Urad': 52,
        'Peas & beans (Pulses)': 36,
        'Other oilseeds': 54,
        'Other Cereals': 33,
        'Cowpea(Lobia)': 12,
        'Oilseeds total': 30,
        'Guar seed': 18,
        'Other Summer Pulses': 35,
        'Moth': 28
    }
    
    return crop_mapping.get(crop_name, 'Invalid crop name')

def map_number_to_season(season_name):
    season_mapping = {
       'Whole Year': 4,
       'Kharif': 1,
       'Rabi': 2,
       'Autumn': 0,
       'Summer': 3,
       'Winter': 5
    }
    
    return season_mapping.get(season_name, 0)


def map_state_to_number(state_name):
    state_mapping = {
        'Assam': 2,
        'Karnataka': 12,
        'Kerala': 13,
        'Meghalaya': 17,
        'West Bengal': 29,
        'Puducherry': 21,
        'Goa': 6,
        'Andhra Pradesh': 0,
        'Tamil Nadu': 24,
        'Odisha': 20,
        'Bihar': 3,
        'Gujarat': 7,
        'Madhya Pradesh': 14,
        'Maharashtra': 15,
        'Mizoram': 18,
        'Punjab': 22,
        'Uttar Pradesh': 27,
        'Haryana': 8,
        'Himachal Pradesh': 9,
        'Tripura': 26,
        'Nagaland': 19,
        'Chhattisgarh': 4,
        'Uttarakhand': 28,
        'Jharkhand': 11,
        'Delhi': 5,
        'Manipur': 16,
        'Jammu and Kashmir': 10,
        'Telangana': 25,
        'Arunachal Pradesh': 1,
        'Sikkim': 23
    }
    
    return state_mapping.get(state_name, 0)








data = (sys.argv[1])

parsed_data = json.loads(data)

Crop = parsed_data.get("Crop")
Season = parsed_data.get("Season")
State = parsed_data.get("State")
Annual_Rainfall = parsed_data.get("rainfall")
Fertilizer = parsed_data.get("Fertilizer")
Pesticide = parsed_data.get("Pesticide")


crop_number = map_crop_to_number(Crop)
Season_number = map_number_to_season(Season)
state_number = map_state_to_number(State)




Crop = float(crop_number)
Season =  float(Season_number)
State =  float(state_number)
Annual_Rainfall = float(Annual_Rainfall)
Fertilizer = float(Fertilizer)
Pesticide = float(Pesticide)


script_dir = os.path.dirname(os.path.realpath(__file__))  # Get the current script directory
model_path = os.path.join(script_dir, 'KNN.pkl')  # Relative path to the `.pkl` file


model = pickle.load(open(model_path, 'rb'))
# print("Model loaded successfully.", file=sys.stderr)
prediction = model.predict([[Crop, Season, State,Annual_Rainfall, Fertilizer, Pesticide]])
pred = str(prediction[0])
print(pred)