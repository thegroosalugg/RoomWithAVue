"""Dummy Data Generator"""

import uuid
import random


def make_dummy():
    """Generate Dummy Data"""
    names = ["Snake", "Otacon", "Ocelot", "Raiden", "Campbell", "Fortune", "Fatman", "Vamp"]
    name = random.choice(names)
    return {
        "id": str(uuid.uuid4()),
        "name": name,
        "phone": f"140.{random.randint(0, 9)}{random.randint(0, 9)}",
        "email": f"{name.lower()}@email.com",
    }
