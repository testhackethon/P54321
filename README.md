# Fullstack TODO App

## Backend
- Python, FastAPI, SQLAlchemy, SQLite
- Endpointy: CRUD dla TODO
- Testy: pytest

## Frontend
- React (TypeScript), Material-UI, axios
- Testy: React Testing Library

## Uruchomienie (Docker)

```sh
docker-compose up --build
```

- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## Struktura
- `backend/` – kod backendu
- `frontend/` – kod frontendowy
- `docker-compose.yml` – uruchamianie całości

---

### Przykład endpointu (Python)
```python
# FastAPI endpoint do pobierania TODO
@app.get("/todos/", response_model=List[TodoRead])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Zwraca listę zadań TODO.

    Args:
        skip (int): Liczba pominiętych rekordów.
        limit (int): Maksymalna liczba rekordów.
        db (Session): Sesja bazy danych.

    Returns:
        List[TodoRead]: Lista zadań TODO.
    """
    return db.query(models.Todo).offset(skip).limit(limit).all()
```

### Przykład endpointu (JavaScript)
```js
// Pobieranie TODO z backendu (JS)
axios.get('http://localhost:8000/todos/').then(res => console.log(res.data));
```
