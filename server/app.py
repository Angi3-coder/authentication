from flask import Flask, jsonify, request, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import User, db
from datetime import timedelta


app = Flask(__name__)

CORS(app, supports_credentials=True)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#Used to sign session cookies
app.config['SECRET_KEY'] = 'super-secret-key'

#session timeout - auto logout after 30mins
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)


#initalize databse
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()

    #validate
    if not data.get("username") or not data.get("password"):
         return jsonify({"Error": "Username and password required"}), 400

    #check if user already exists
    if User.query.filter_by(username= data['username']).first():
        return jsonify({"error":"Username already in use"}), 400
    
    #create user
    user = User(username=data['username'])
    #hash password
    user.set_password(password=data['password'])
    user = User(role ='user')

    #save and commit
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(password=data['password']):
        #activate lifetime setting
        session.permanent = True
        #store user id in a session
        session['user_id'] = user.id


        return jsonify({"message": "Logged in successfully", "role": user.role}), 200

    return jsonify({"error":"Invalid username or password"}), 400

@app.route('/logout', methods=['POST'])     
def logout():
    #remove user_id from session
    session.pop('user_id', None)
    return jsonify({"Message": "Logged out successfully"})

#-----PROTECTED ROUTES-------
# Route requires login
@app.route('/protected', methods=['POST'])
def protected():
    #ensure that the user in logged in
    if not session.get('user_id'):
        return jsonify({"error": "Unathorized"}), 401
    
    return jsonify({'message': "Protected Content"})

@app.route('/profile')
def profile():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': "Not Logged in"})
    
    user = User.query.get(user_id)

    return jsonify({'id': user.id, 'username': user.username})

@app.route('/admin/dashboard')
def admin_dashboard():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'error': "Admins only!!"}), 403
    
    return jsonify({"Message": "Welcome, Admin"})



if __name__ == "__main__":
    app.run(debug=True)