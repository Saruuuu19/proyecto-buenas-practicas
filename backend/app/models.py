from sqlalchemy import Column, Integer, String, Numeric
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False, index=True)
    image = Column(String, nullable=False)
    