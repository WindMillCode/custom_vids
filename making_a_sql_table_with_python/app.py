import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + ".\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "./site-packages/linux") 
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, redirect


app = Flask(__name__)
app.config.update(
    # SERVER_NAME="10.0.2.2:5000",
    USE_NGROK=False,
    FLASK_ENV = 'development',
    SQLALCHEMY_DATABASE_URI='sqlite:///test.db.sqlite',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)
db=SQLAlchemy(app)
db.create_all()
with db.engine.connect() as conn:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS simpleTable(
                a VARCHAR(255) NOT NULL,
                b VARCHAR(255) CHECK(a == 'enumA' OR a == 'enumB'),
                c VARCHAR(255)  UNIQUE,
                d VARCHAR(255) DEFAULT 'True' CHECK (d == 'True' OR d == 'False' ),
                e VARCHAR(513) NOT NULL,
                f INTEGER PRIMARY KEY AUTOINCREMENT,
                g VARCHAR(255) UNIQUE CHECK(a == 'enumA' AND c IS NOT NULL OR True)          
        );
        """
    )


if __name__ == "__main__":
    port = 5000
    app.run(debug=True)