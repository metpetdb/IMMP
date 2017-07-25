from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:test@localhost/immp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True;
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB limit
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
	return render_template("index.html", maps=Maps.query.order_by(desc(Maps.id)))

@app.route('/new_map', methods=['GET', 'POST'])
def newmap():
	return render_template('newmap.html')

@app.route('/postnewmap', methods=['POST'])
def postmap():
	url = request.form['URL']
	map = Maps.query.filter_by(url=url).first()
	if(map == None):
		map = Maps(url)
		db.session.add(map)
		db.session.commit()
	return redirect('/map/id='+str(map.id))


@app.route('/postcsv')
def postcsv():
	id = request.args.get('mapID', 0, type=int)
	csv = request.args.get('csv')
	map = Maps.query.filter_by(id=id).first()
	map.csv = csv
	db.session.commit()
	return jsonify(csv=csv)

@app.route('/postmappings')
def postmappings():
	id = request.args.get('mapID', 0, type=int)
	mappings = request.args.get('mappings')
	map = Maps.query.filter_by(id=id).first()
	map.mapping = mappings
	db.session.commit()
	return jsonify(mappings=mappings)

@app.route('/deletemap')
def deletemap():
	id = request.args.get('mapID', 0, type=int)
	map = Maps.query.filter_by(id=id).first()
	db.session.delete(map)
	db.session.commit()
	return "success"

# Dynamically load map from database
@app.route('/map/id=<mapid>', methods=['GET', 'POST'])
def loadmap(mapid):
	map = Maps.query.filter_by(id = mapid).first()
	return render_template('map.html', map=map)

# Assures this file is the main before running
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0')

