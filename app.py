from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def principal():
    return render_template("principal.html")

@app.route('/home')
def home():
    return render_template("home.html")

@app.route('/sobre', methods=['POST' , 'GET'])
def sobre():
    return render_template("sobre.html")

@app.route('/para_voce', methods=['POST' , 'GET'])
def para_voce():
    return render_template("para_voce.html")

@app.route('/para_empresa', methods=['POST' , 'GET'])
def para_empresa():
    return render_template("para_empresa.html")

@app.route('/contato', methods=['POST' , 'GET'])
def contato():
    return render_template("contato.html")

# Rodando o servidor
if __name__ == '__main__':
    app.run(debug=True)
    
