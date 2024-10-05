CREATE DATABASE auth_service_dev;
CREATE DATABASE auth_service_test;

CREATE DATABASE todo_pro_dev;
CREATE DATABASE todo_pro_test;

GRANT ALL PRIVILEGES ON DATABASE auth_service_dev TO app_dev;
GRANT ALL PRIVILEGES ON DATABASE auth_service_test TO app_dev;

GRANT ALL PRIVILEGES ON DATABASE todo_pro_dev TO app_dev;
GRANT ALL PRIVILEGES ON DATABASE todo_pro_test TO app_dev;
