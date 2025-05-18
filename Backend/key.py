import os
import secrets

# Either load from environment or generate one (persistent recommended)
JWT_SECRET = os.environ.get("JWT_SECRET", secrets.token_hex(64))
