import os
from dotenv import load_dotenv
from logging.config import dictConfig


basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
load_dotenv(os.path.join(basedir, ".env"))

DEBUG = os.environ.get("DEBUG").strip() == "true"

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "default": {
            "format": "%(asctime)s - [%(levelname)s] in %(module)s: %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"
        },
        "request": {
            "()": "api.logger.formatters.RequestFormatter",
            "format": "%(asctime)s %(remote_addr)s requested %(url)s\t"
            "[%(levelname)s] in %(module)s: %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S"
        }
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "request",
            "stream": "ext://sys.stdout",
        },
        "error_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "default",
            "filename": "/var/log/error.log",
            "maxBytes": 10000,
            "backupCount": 10,
            "delay": "True",
        },
        "log_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "default",
            "filename": "/var/log/logfile.log",
            "maxBytes": 10000,
            "backupCount": 10,
            "delay": "True",
        }
    },
    "loggers": {
        "app": {
            "handlers": ["console"] if DEBUG else ["console", "error_file", "log_file"],
            "level": "INFO",
            "propagate": False,
        },
        "api": {
            "level": "DEBUG" if DEBUG else "INFO",
            "handlers": ["console"],
            "propagate": False,
        }
    },
}

dictConfig(LOGGING_CONFIG)
