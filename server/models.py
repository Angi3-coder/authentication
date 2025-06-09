from flask_sqlalchemy import SQLAlchemy

#import password hash 
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

#user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    #Hash password and store it
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    #Verify a given password matches the hashed one
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)