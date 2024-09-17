# DaVinci 🎨🤖
Welcome to DaVinci! DaVinci is an AI art application that uses the Neural Style Transfer machine learning concept to transfer an image's art style onto another image. With the click of a button, you can easily make masterpieces and view all your stylized images in a gallery after the neural style transfer process is complete!

## What is Neural Style Transfer (NST)? 🧐

Neural Style Transfer (NST) is a technique in deep learning that allows the fusion of two images: a content image and a style image. The goal is to combine the content of one image with the artistic style of another. This is achieved by using a neural network to extract and recombine features from both images, creating a new image that retains the content structure of the first image while adopting the artistic style of the second.

### Overview of NST Process
![NST Example](https://media.licdn.com/dms/image/C4E12AQEfjA-SVxYLVQ/article-cover_image-shrink_600_2000/0/1531630356496?e=2147483647&v=beta&t=kmO2CHjqruhnAASb4Ejpu5-GKwe-7L7HjYbwZD2N4oY)


## Tech Stack 📚
- **Frontend**: React
- **Backend**: Flask (Python)
- **Database**: SQL (Flask SQLAlchemy)
- **Neural Network**: TensorFlow

## Requirements

### Backend 🗄️

- Python 3.8+
- Flask
- Flask SQLAlchemy
- Flask CORS
- Flask Marshmallow
- TensorFlow
- OpenCV
- Matplotlib
- Werkzeug
- Urllib

### Frontend 💻

- React
- Axios (for API calls)

## Getting Started

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/neural-style-transfer-app.git
    cd neural-style-transfer-app/backend
    ```

2. **Set up a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install backend dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the SQL database**:

    Modify the `config.py` file with your database configuration. For example:

    ```python
    SQLALCHEMY_DATABASE_URI = 'sqlite:///nst.db'
    ```

5. **Run database migrations**:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

6. **Start the Flask server**:
    ```bash
    flask run
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Start the React app**:
    ```bash
    npm start
    ```

The React app will run on `http://localhost:3000`, and Flask will run on `http://localhost:5000`.

## Usage

1. Navigate to the frontend (`http://localhost:3000`).
2. Upload a content image and a style image.
3. Click the "Transfer Style" button to apply the neural style transfer.
4. You can view the history of style transfers in the gallery page and download any of the images.
