"""Flask application factory"""

import os  # python operating system
from flask import Flask, request
from dotenv import load_dotenv
from .routes import user


def create_app():
    """Create and return a Flask app instance. __name__ is reserved name"""
    load_dotenv()  # reads .env into os.environ

    app = Flask(__name__)
    # Import routes (this registers routes to the app)
    app.register_blueprint(user.bp)  # attach routes

    allowed_origins = [
        os.environ.get("CLIENT_URL"),
        os.environ.get("CLIENT_MOBILE_URL"),
    ]

    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin")

        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Headers"] = (
                "Content-Type, Authorization"
            )
            response.headers["Access-Control-Allow-Methods"] = (
                "GET, POST, PUT, DELETE, OPTIONS"
            )
        return response

    return app
