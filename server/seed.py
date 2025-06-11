from app import app
from models import db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    hashed_password = generate_password_hash('adminpass')
    admin = User(username='admin1', password_hash=hashed_password, role= 'admin')
    db.session.add(admin)
    db.session.commit()

    print('Admin added successfully')