from sqlalchemy import Column, Integer, String, Numeric
from app.database import Base

# Precisión y escala definidas en un solo lugar para evitar duplicación
PRICE_PRECISION = 10
PRICE_SCALE = 2

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(Numeric(PRICE_PRECISION, PRICE_SCALE), nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False, index=True)
    image = Column(String, nullable=False)
    