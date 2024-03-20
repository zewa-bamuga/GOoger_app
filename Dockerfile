FROM python:3.11.5

# Установка системных зависимостей для GDAL
RUN apt-get update && \
    apt-get install -y libgdal-dev && \
    rm -rf /var/lib/apt/lists/*

# Создание директории приложения
RUN mkdir /fastapi_app

# Установка зависимостей
WORKDIR /fastapi_app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копирование кода приложения
COPY . .

RUN chmod a+x docker/*.sh

# Запуск приложения
#CMD gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000