CREATE TABLE IF NOT EXISTS "user" (
  ID_user BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) COLLATE "vi_VN.UTF-8",
  email VARCHAR(255),
  password_changed_at DATE,
  public_ID VARCHAR(255),
  url_image VARCHAR(255),
  role VARCHAR(255),
  active BOOLEAN,
  money INT
);

CREATE TABLE IF NOT EXISTS "item" (
  ID_item BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT,
  discount FLOAT,
  quantity INT,
  saleprice FLOAT
);

CREATE TABLE IF NOT EXISTS "table" (
  id_table BIGSERIAL PRIMARY KEY,
  status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "booktable" (
  ID_user BIGSERIAL,
  ID_table BIGSERIAL,
  begintime DATE,
  endtime DATE,
  PRIMARY KEY (ID_user, ID_table),
  FOREIGN KEY (ID_user) REFERENCES "user"(ID_user),
  FOREIGN KEY (ID_table) REFERENCES "table"(id_table)
);

CREATE TABLE IF NOT EXISTS "order" (
  ID_order BIGSERIAL,
  ID_user BIGSERIAL,
  order_date DATE,
  status VARCHAR(255),
  payment BOOLEAN,
  id_cashier BIGSERIAL,
  total_price INT,
  PRIMARY KEY (ID_order),
  FOREIGN KEY (ID_user) REFERENCES "user"(ID_user),
  FOREIGN KEY (id_cashier) REFERENCES "user"(ID_user)
);


CREATE TABLE IF NOT EXISTS "orderdetail" (
  ID_order BIGSERIAL,
  ID_item BIGSERIAL,
  quantity INT,
  PRIMARY KEY (ID_order, ID_item),
  FOREIGN KEY (ID_order) REFERENCES "order"(ID_order),
  FOREIGN KEY (ID_item) REFERENCES "item"(ID_item)
);


CREATE TABLE IF NOT EXISTS "cart" (
  ID_cart BIGSERIAL,
  ID_user BIGSERIAL,
  ID_item BIGSERIAL,
  quantity INT,
  PRIMARY KEY (ID_cart),
  FOREIGN KEY (ID_user) REFERENCES "user"(ID_user),
  FOREIGN KEY (ID_item) REFERENCES "item"(ID_item)
);

CREATE TABLE IF NOT EXISTS "marketing" (
  ID_marketing BIGSERIAL,
  ID_user BIGSERIAL,
  ID_cashier BIGSERIAL,
  description text,
  date DATE,
  PRIMARY KEY (ID_marketing),
  FOREIGN KEY (ID_user) REFERENCES "user"(ID_user),
  FOREIGN KEY (ID_cashier) REFERENCES "user"(ID_user)
);

