from flask import Flask, request, Response, session, jsonify
from flask_cors import CORS
import os
import shutil
import uuid
from lobe import ImageModel
import zipfile
from PIL import Image
import base64
from io import BytesIO
import json


UPLOAD_FOLDER = './models/'

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True, allow_headers=['Content-Type'], mimetypes='image/jpeg')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'any random string'


def get_uuid():
  if not session.get('uuid'):
    session['uuid'] = uuid.uuid4().hex
  return session['uuid']

@app.route('/api/upload-model', methods=["POST"])
def upload_file():
  f = request.files['file']
  orig_file, ext = os.path.splitext(f.filename)

  # Only accept .zip files
  if ext != '.zip':
    return Response(status=400)

  # Set the filename as the unique uuid for the user
  filename = get_uuid()

  # If the file exists already, then delete it
  if os.path.isdir('./models/' + filename):
    shutil.rmtree('./models/' + filename)

  f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename + '.zip'))

  # Unpack the zip file
  with zipfile.ZipFile(os.path.join(app.config['UPLOAD_FOLDER'], filename + '.zip'), 'r') as zip_ref:
    zip_ref.extractall('models')

  # Rename the unzipped folder and remove the zip file
  os.rename('models/' + orig_file, 'models/' + filename)
  os.remove('models/' + filename + '.zip')

  return Response(status=200)


@app.route('/api/upload-image', methods=["POST"])
def upload_image():
  # Get the name of the model folder
  filename = get_uuid()
  if os.path.isdir(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
    model = ImageModel.load(os.path.join(app.config['UPLOAD_FOLDER'], filename))
  # If the model folder doesn't exist for current user, then return not found error
  else:
    return Response(status=404)

  with Image.open(request.files["file"]) as img:
    pred = model.predict(img)
    heatmap = model.visualize(img)
    buffered = BytesIO()
    heatmap.save(buffered, format="JPEG")
    heatmap_str = base64.b64encode(buffered.getvalue())
    response = {"prediction": json.loads(pred.__str__()), "heatmap": heatmap_str.decode('utf-8')}

  return jsonify(response)


if __name__ == "__main__":
  # Delete all previously loaded models
  for model in os.listdir(UPLOAD_FOLDER):
    if model == ".gitkeep":
      continue
    shutil.rmtree(os.path.join(UPLOAD_FOLDER, model))
  app.run(debug=True)