"""Dummy routes"""
from flask import Blueprint, jsonify
from src.utils.common import clear

# ('internal flast name', 'Python reserved variable assignee')
bp = Blueprint("dummy_route", __name__)

@bp.route("/")
def get_data():
    """Dummy General Route"""
    clear()
    return jsonify({"message": "My Python App"})
