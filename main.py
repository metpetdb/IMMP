from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

# Index routing
@app.route('/')
def index():
	return render_template("index.html")


@app.route('/csv')
def csv():
	return render_template("csv.html")
	
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

