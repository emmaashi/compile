from flask_app import create_app  # Adjust the import to reflect the structure

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
