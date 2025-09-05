
from flask import Flask, render_template, request
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    resultado = ""
    if request.method == "POST":
        tipo = request.form["tipo"]
        tema = request.form["tema"]
        estilo = request.form["estilo"]
        longitud = int(request.form["longitud"])

        prompt = f"Escribe un {tipo} sobre '{tema}' en un estilo {estilo}. Longitud: {longitud} palabras."

        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=longitud * 5,
            temperature=0.7
        )

        resultado = response.choices[0].text.strip()

    return render_template("index.html", resultado=resultado)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81)
