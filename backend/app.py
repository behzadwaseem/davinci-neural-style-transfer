from flask import Flask, json, request, jsonify
import os
import urllib.request
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from nst import run_nst

from models import db, Image # database

app = Flask(__name__)
CORS(app, supports_credentials=True)

# initialize db:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nst.db'
db.init_app(app)

with app.app_context():
    db.create_all()

# set folder destinations and file restrictions:
UPLOAD_IMG_PATH = '/uploads'
app.config['UPLOAD_FOLDER'] = '/static/nst-images'
app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024 # 16 MB
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

ma = Marshmallow(app)
class ImageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title')
images_schema = ImageSchema(many=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return "<h1>HOME</h1>"
    

@app.route('/upload_two_images', methods=['POST'])
def upload_two_images():
    '''UPLOAD CONTENT & STYLE IMAGE'''
    # print(request.files)
    content_img = request.files.get('content_img')
    style_img = request.files.get('style_img')
    title = request.form['title']
    print(title)
    
    if content_img and allowed_file(content_img.filename):
        filename1 = secure_filename(content_img.filename)
        content_img.save(os.path.join(UPLOAD_IMG_PATH, filename1))
    else:
        print(content_img)
        return jsonify({'message': 'Image1 did not upload.'})

    if style_img and allowed_file(style_img.filename):
        filename2 = secure_filename(style_img.filename)
        style_img.save(os.path.join(UPLOAD_IMG_PATH, filename2))
    else:
        return jsonify({'message': 'Image1 did not upload.'})
    
    
    # generating nst image:
    run_nst(content_img, style_img, title)

    # storing nst image in db:
    upload_image = Image(title=title)
    db.session.add(upload_image)
    db.session.commit()

    return jsonify({'message': 'Files uploaded successfully'})



@app.route('/gallery', methods=['GET'])
def gallery():
    ''' RETRIEVE NST IMAGE GALLERY'''
    gallery = Image.query.all()
    gallery_results = images_schema.dump(gallery)
    gallery_results.reverse()  # show images in reverse-chronological order
    # print(gallery_results)
    return jsonify(gallery_results)
