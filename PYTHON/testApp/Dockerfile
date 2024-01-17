FROM python:3.11-slim AS builder

RUN pip install django==4.2.6

ENV PYTHONUNBUFFERED=1

# ENV PYTHONPATH=/path/to/django:$PYTHONPATH
# ENV PYTHONPATH=/new_app:$PYTHONPATH
# COPY /path/to/django /new_app

COPY env/Lib/site-packages /new_app/site-packages

WORKDIR /new_app

COPY . /new_app

RUN pip install -r requirements.txt

FROM python:3.11-slim

WORKDIR /new_app

COPY --from=builder /new_app /new_app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
