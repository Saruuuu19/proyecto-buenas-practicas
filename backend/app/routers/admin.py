from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import catalog
from app.database import get_db

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return catalog.get_stats(db)
