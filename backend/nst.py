import tensorflow_hub as hub
import tensorflow as tf
from matplotlib import pyplot as plt
import numpy as np
import cv2
import ssl
import os


def run_nst(content, style, title):
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        # Legacy Python that doesn't verify HTTPS certificates by default
        pass
    else:
        # Handle target environment that doesn't support HTTPS verification
        ssl._create_default_https_context = _create_unverified_https_context

    # import and load NST model:
    os.environ['TFHUB_CACHE_DIR'] = 'PATH TO DOWNLOADED NST MODEL'
    model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

    def load_image(img_path):
        img = tf.io.read_file(img_path)
        img = tf.image.decode_image(img, channels=3)
        img = tf.image.convert_image_dtype(img, tf.float32)
        img = img[tf.newaxis, :]
        return img
    
    content_image = load_image(f'/uploads/{content.filename}')
    style_image = load_image(f'/uploads/{style.filename}')
    stylized_image = model(tf.constant(content_image), tf.constant(style_image))[0]
    return cv2.imwrite(f'/static/nst-images/{title}.jpg', cv2.cvtColor(np.squeeze(stylized_image)*255, cv2.COLOR_BGR2RGB))