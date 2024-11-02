from flask import Flask, request, jsonify
# import speech_recognition as sr
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



import torch
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt

# Load the best saved model1
model1 = torch.load(r'C:\Users\dlsat\Mental-Health\flask\best_vit_fer2013_model.pt', map_location=torch.device('cpu'))  # Change 'cpu' to 'cpu' if using GPU
model1.eval()  # Set the model1 to evaluation mode

# Define the emotion labels (FER-2013 dataset has 7 emotions)
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Define the image transformation (same as used during training)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resizing the image to match model1 input
    transforms.Grayscale(num_output_channels=3),  # Convert to 3-channel grayscale (if needed)
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalization
])

# Load and preprocess the image
def preprocess_image(image_path):
    image = Image.open(image_path)
    image = transform(image)
    image = image.unsqueeze(0)  # Add batch dimension
    return image

# Predict emotion
def predict_emotion(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        image = image.to('cpu')  # If you use GPU, change to .to('cpu')
        outputs = model1(image).logits  # Forward pass
        _, predicted = torch.max(outputs, 1)  # Get the class with the highest score
        predicted_class = predicted.item()

    emotion_label = emotion_labels[predicted_class]  # Map the predicted index to the class label
    return emotion_label

@app.route("/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the file to the upload folder
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    emotion = predict_emotion(file_path)
    print(f'Predicted emotion: {emotion}')
    return {'resopnse': emotion}




if __name__ == "__main__":
    app.run(debug=True,port=7000)