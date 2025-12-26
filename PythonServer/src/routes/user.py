"""Dummy routes"""
from flask import Blueprint, jsonify
from src.utils.common import clear
from src.utils.data_generator import make_dummy

# ('internal flast name', 'Python reserved variable assignee')
bp = Blueprint("dummy_route", __name__)

@bp.route("/all")
def get_all():
    """Dummy Array Return"""
    clear()
    items = [make_dummy() for _ in range(5)]
    return jsonify(items)


@bp.route("/one")
def get_one():
    """Dummy Single Return"""
    clear()
    return jsonify(make_dummy())
