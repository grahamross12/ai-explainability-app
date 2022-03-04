# Ai Explainability App

This is a web app designed to work with [lobe.ai](https://www.lobe.ai/) models and provides a grad-CAM visualiation for a given input image.

## Installation

Follow these installation instructions to create a local development server.

1. Clone the GitHub repository and move into the new directory.

```
git clone https://github.com/grahamross12/ai-explainability-app.git
cd ai-explainability-app
```

2. Create and activate a python 3 [virtual environment](https://docs.python.org/3/tutorial/venv.html).

3. Install the python dependencies.

```
pip install -r requirements.txt
```

4. Set up the flask server.

```
cd server
python index.py
```

5. In another console, set up the React client.

```
cd client
npm i
npm start
```
