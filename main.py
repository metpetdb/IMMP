from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/pre-registration'
db = SQLAlchemy(app)

# Database model
class MapEntry(db.model):
	__tablename__ = "map_entries"
	id = db.Column(db.Integer, primary_key=True)
	img_url = db.Column(db.String(240), unique=True)
	
	def __init__(self, img_url):
		self.img_url = img_url

	def __repr__(self):
		return '<URL %r>' % self.img_url


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

# Profile page routing
@app.route("/profile/<name>")
def profile(name):
	return render_template("profile.html", name=name)

# Assures this file is the main before running
if __name__ == "__main__":
	app.run(debug=True)

