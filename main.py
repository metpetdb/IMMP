from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@localhost/immp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True;
db = SQLAlchemy(app)

# Database schema
class Maps(db.Model):
	id = db.Column(db.Integer(), primary_key=True)
	url = db.Column(db.String(512), unique=True)
	csv = db.Column(db.String())
	mapping = db.Column(db.String())

	def __init__(self, url):
		self.url = url
		self.csv = None

	def __repr__(self):
		return '<URL %r>' % self.url

# Index routing
@app.route('/')
def index():
	return render_template("profile.html")

# Login page routing
@app.route('/login', methods=['GET', 'POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != 'admin' or request.form['password'] != 'admin':
			error = 'Invalid credentials. Please try again.'
		else:
			return render_template('profile.html', name='admin')
	return render_template('login.html', error=error)

@app.route('/new_map', methods=['GET', 'POST'])
def newmap():
	return render_template('newmap.html')

@app.route('/postmap', methods=['POST'])
def postmap():
	map = Maps(request.form['URL'])
	db.session.add(map)
	db.session.commit()

@app.route('/postcsv')
def postcsv():
	id = request.args.get('mapID', 0, type=int)
	csv = request.args.get('csv')
	map = Maps.query.filter_by(id=id).first()
	map.csv = csv
	print csv
	db.session.commit()
	return jsonify(csv=csv)

@app.route('/postmappings')
def postmappings():
	id = request.args.get('mapID', 0, type=int)
	mappings = request.args.get('mappings')
	map = Maps.query.filter_by(id=id).first()
	map.mapping = mappings
	print mappings
	db.session.commit()
	return jsonify(mappings=mappings)

# Dynamically load map from database
@app.route('/map/id=<mapid>', methods=['GET', 'POST'])
def loadmap(mapid):
	map = Maps.query.filter_by(id = mapid).first()
	return render_template('map.html', map=map)

# Assures this file is the main before running
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')

