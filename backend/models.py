from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Image(db.Model):
    # __tablename__ = 'nst-images'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), index=True, unique=True)

