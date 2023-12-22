CREATE TABLE IF NOT EXISTS "user" (
  ID_user BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
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
  saleprice FLOAT,
  cost INT,
  image text,
  type VARCHAR(255)
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

INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('1',N'Cơm Sườn Sốt Chua Ngọt',32000,0,270,32000,12000,'https://images.foody.vn/res/g17/160320/s570x570/f5516c35-2e52-4032-aa79-ecf4827634cc.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('2',N'Cơm Cá Bông Lau Kho Tộ',34000,35,255,22000,10000,'https://images.foody.vn/res/g17/160320/s570x570/cab9a2f1-adda-44e1-b87a-1fdb1c26c273.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('3',N'Cơm Gà Sốt BBQ',31000,33,125,21000,17000,'https://images.foody.vn/res/g17/160320/s570x570/c898966e-4b3a-4df2-a463-b6ead664b07b.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('4',N'Cơm Sườn Sốt BBQ',25000,0,262,25000,11000,'https://images.foody.vn/res/g17/160320/s570x570/f6364a2c-683d-40e4-99c2-bc090e7eaf95.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('5',N'Mỳ Ý Sốt Bò Băm',33000,24,300,25000,14000,'https://images.foody.vn/res/g17/160320/s570x570/ac3276a3-3d07-4195-8026-6a24c060cfd3.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('6',N'Phở gà ta',27000,0,226,27000,13000,'https://images.foody.vn/res/g17/160320/s570x570/27e89d43-626f-4b68-94d9-777c1b9c3a87.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('7',N'Phở gà đùi',28000,0,167,28000,10000,'https://images.foody.vn/res/g17/160320/s570x570/95bb6256-4ec2-46b6-93d0-e3a223a873af.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('8',N'Nước Ép Ổi',27000,34,202,18000,16000,'https://images.foody.vn/res/g17/160320/s570x570/5ff41e6a-0c73-41f3-b9c7-60086af4fed4.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('9',N'Cà Phê Cốt Dừa',18000,0,174,18000,17999,'https://images.foody.vn/res/g17/160320/s570x570/52dd5893-0ebd-4bdd-946c-a9a507c451f1.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('10',N'Sinh Tố Chanh Leo',24000,27,234,18000,17000,'https://images.foody.vn/res/g17/160320/s570x570/4f0b1ce9-6cfc-47f8-a7af-5435551feac3.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('11',N'Nước Ép Dưa Hấu',18000,18,241,15000,13000,'https://images.foody.vn/res/g17/160320/s570x570/7d1f2dcb-ac9e-46dd-902d-935890f7ec8c.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('12',N'Cacao',18000,2,254,18000,17999,'https://images.foody.vn/res/g17/160320/s570x570/c0f59f17-bd30-4948-a61a-966c7c3a74bc.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('13',N'Cà phê sữa',25000,0,176,25000,16000,'https://images.foody.vn/res/g17/160320/s570x570/5d050eee-5510-4f5c-a0e0-94efcd24a7fc.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('14',N'Cà phê đen',28000,19,299,23000,15000,'https://images.foody.vn/res/g17/160320/s570x570/84dec44a-c022-4518-9a71-8d93c5a2eaf8.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('15',N'Cơm Gà Xối Mắm',33000,24,293,25000,11000,'https://images.foody.vn/res/g64/638675/s570x570/df9ca13b-082a-4dd6-80a8-d98373fe-fb46152b-230605104019.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('16',N'Cơm Rang Dưa Bò',25000,0,175,25000,17000,'https://images.foody.vn/res/g64/638675/s570x570/a36992eb-e757-496f-a8df-5ca3402d-91a97ec8-230605104243.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('17',N'Cơm Rang Thập Cẩm',27000,1,234,27000,26999,'https://images.foody.vn/res/g64/638675/s570x570/19220d05-c001-4f84-9da2-8162e989-1faa2deb-230605104413.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('18',N'Cơm Rang Cải Bò',29000,15,145,25000,17000,'https://images.foody.vn/res/g64/638675/s570x570/23b57436-5c8a-4140-b371-d273dad3-02ebbbc6-230605104313.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('19',N'Phở Xào mềm',32000,28,256,23000,10000,'https://images.foody.vn/res/g64/638675/s570x570/e780973c-be37-4084-a420-bc14b435-de71df71-230605103950.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('20',N'Cơm sườn sốt ngũ vị',34000,0,214,34000,25000,'https://images.foody.vn/res/g64/638675/s570x570/2e28b222-c955-41b1-ab8d-5d1ac2c2-2b5e8776-230605104054.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('21',N'Mì xào mềm',25000,0,213,25000,17000,'https://images.foody.vn/res/g64/638675/s570x570/2f29715e-be04-4b32-9b6f-ac6056e2-8323bfba-210805145843.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('22',N'Phở Chiên Giòn',27000,26,113,20000,15000,'https://images.foody.vn/res/g64/638675/s570x570/044c32ef-b4fe-48c0-89be-22e9271b-85686856-230605104215.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('23',N'Mỳ Tôm chiên Giòn',35000,18,163,29000,16000,'https://images.foody.vn/res/g64/638675/s570x570/2293ec36-ac05-4b81-aa38-fd93e9cc8f37.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('24',N'Phở Chín',30000,0,107,30000,16000,'https://images.foody.vn/res/g64/638675/s570x570/fd3fffdc-76d3-410b-8953-0972da1505ba.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('25',N'Phở Tái Chín',27000,0,253,27000,26999,'https://images.foody.vn/res/g64/638675/s570x570/472e72d9-9686-4be8-a983-cd97f843f844.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('26',N'Phở Tái Gầu',32000,0,130,32000,10000,'https://images.foody.vn/res/g64/638675/s570x570/9f2f02e2-4e72-452b-92ee-1b38b57d080a.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('27',N'Phở Tái',27000,0,116,27000,22000,'https://images.foody.vn/res/g64/638675/s570x570/440ddd40-2d9f-4742-a2ab-fbf7aaab8546.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('28',N'Phở Bắp Nạm',35000,5,241,33000,10000,'https://images.foody.vn/res/g64/638675/s570x570/9b5f9df5-5cb7-4c24-9e89-7f88f9223cfb.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('29',N'Phở Đặc Biệt',34000,0,100,34000,14000,'https://images.foody.vn/res/g64/638675/s570x570/6be534c5-7b3f-4ec0-9e99-6a98dd0f52cc.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('30',N'Phở Tái Nạm',30000,13,241,26000,17000,'https://images.foody.vn/res/g64/638675/s570x570/2017129154851-pho-tai-nam.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('31',N'Phở Tái Bắp',30000,0,106,30000,26000,'https://images.foody.vn/res/g64/638675/s570x570/bc7ea22a-cdab-4575-b725-08f9e393e3df.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('32',N'Phở Tái Lăn',30000,20,106,24000,16000,'https://images.foody.vn/res/g64/638675/s570x570/bf096fa2-5ea5-47e4-a235-5b2232f6c7e0.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('33',N'Hủ tiếu tôm mực trộn',27000,1,162,27000,26999,'https://images.foody.vn/res/g100008/1000072311/s570x570/c9d1e366-1bd2-4d6e-814b-03306e4e-f78b3296-231219101308.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('34',N'Hủ tiếu bò kho',26000,21,114,21000,18000,'https://images.foody.vn/res/g100008/1000072311/s570x570/7865ce10-dd36-496e-a028-e52e274e-0a7cadc2-231219101330.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('35',N'Hủ tiếu tôm mực nước',31000,0,184,31000,18000,'https://images.foody.vn/res/g100008/1000072311/s570x570/084b3895-6349-430a-beee-6cbb62cd-ba50d228-231219101249.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('36',N'Bánh mỳ bò kho',28000,21,260,22000,21000,'https://images.foody.vn/res/g100008/1000072311/s570x570/5bcefa56-9b34-42d1-8414-a15f305e-9aff6b8a-231219101201.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('37',N'Pepsi tươi',24000,36,100,15000,10000,'https://images.foody.vn/res/g104/1033636/s570x570/14ab638b-a73d-42de-bc36-94f35c26-763d8729-210328174036.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('38',N'Trà Ô Long',24000,0,222,24000,17000,'https://images.foody.vn/res/g104/1033636/s570x570/1e8249e0-0c2f-4711-a097-809b6d8a-a0abbe64-230127170237.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('39',N'Pepsi chai 330ml',23000,0,263,23000,15000,'https://images.foody.vn/res/g104/1033636/s570x570/f90fe810-803f-43bb-a080-c387f1c6-c99f604b-210611153058.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('40',N'Coca chai 300ml',24000,0,240,24000,12000,'https://images.foody.vn/res/g104/1033636/s570x570/5b77e278-8ba7-4355-be1d-153d3689-1e460fa2-221221102811.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('41',N'Cơm Đảo Đùi Gà Lọc Xương Sốt Thái',34000,0,231,34000,25000,'https://images.foody.vn/res/g72/716655/s570x570/23a40390-d7a2-4eef-b917-2f28f988-e98d2dce-230618201027.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('42',N'Cơm Đảo Đùi Gà Sốt BBQ',33000,0,196,33000,25000,'https://images.foody.vn/res/g72/716655/s570x570/b48a539e-099b-4a51-a0b9-f9f4c3e7-bea33084-230615180117.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('43',N'Cơm Đảo Đùi Gà Sốt Thái',26000,0,158,26000,15000,'https://images.foody.vn/res/g72/716655/s570x570/cf4528d0-10ca-450f-86ab-2e51e620-9454baf5-230618201126.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('44',N'Cơm Đảo Đùi Gà Lọc Xương Sốt BBQ Phủ Phô Mai',27000,9,209,25000,24000,'https://images.foody.vn/res/g72/716655/s570x570/8c8f7a3a-c9e8-4cba-a126-4a662ad6-a0b3b848-230815103547.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('45',N'Cơm Đảo Đùi Gà Sốt Cay Hàn',30000,31,217,21000,20000,'https://images.foody.vn/res/g72/716655/s570x570/97690095-f628-4a7b-98fa-d55f9dea-07f13fa0-200830112807.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('46',N'Cơm Đảo Đùi Gà Lọc Xương Sốt Cay HQ',33000,48,248,17000,12000,'https://images.foody.vn/res/g72/716655/s570x570/5e2cf199-a782-4e30-b887-fea78175-5444b2e5-230610124835.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('47',N'Cơm Đảo Đùi Gà Sốt BBQ Phủ Phomai',28000,26,282,21000,14000,'https://images.foody.vn/res/g72/716655/s570x570/a4a51561-cffc-438e-adea-f0b668ae-78007306-220613020839.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('48',N'Cơm Đảo Đùi Gà Lọc Xương Sốt Mắm Phú Quốc',27000,1,100,27000,26999,'https://images.foody.vn/res/g72/716655/s570x570/afb22663-ba0d-44da-8a5a-39d3bcb2-9219b681-220301222117.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('49',N'Cơm Đảo Đùi Gà Sốt Mắm Phú Quốc',32000,0,170,32000,28000,'https://images.foody.vn/res/g72/716655/s570x570/a83794cb-4aa1-499c-bf9e-73093d87-0675e254-200830114209.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('50',N'Cơm Đảo Đùi Gà Sốt Cay Hàn Quốc Phủ Phomai',33000,0,144,33000,11000,'https://images.foody.vn/res/g72/716655/s570x570/018a1dfc-8a74-49e7-a88a-fce975ab-1c66fcbb-200830113029.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('51',N'Pepsi',19000,0,126,19000,13000,'https://images.foody.vn/res/g72/716655/s570x570/80c903e2-ba66-4000-ad24-6ff78c14-85ca9224-230407223726.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('52',N'Coca Cola',21000,7,208,20000,19000,'https://images.foody.vn/res/g72/716655/s570x570/f593c580-f2f0-4695-8975-cf228294ec73.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('53',N'Trà Ô Long Tea Plus',20000,28,167,14000,11000,'https://images.foody.vn/res/g72/716655/s570x570/b6d50856-7dc4-460a-bdb2-f5bc340d-2ddd16d6-230624125236.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('54',N'7 up',16000,3,294,16000,15999,'https://images.foody.vn/res/g72/716655/s570x570/4213878a-a1c6-4031-b25f-a9dabb15b45d.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('55',N'Bạc xỉu',19000,0,188,19000,13000,'https://images.foody.vn/res/g104/1030260/s570x570/122610a3-acc6-43f7-8da0-123736b9-83a958c6-230816121611.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('56',N'Phin Sữa Đá - Coffee',16000,0,195,16000,15999,'https://images.foody.vn/res/g104/1030260/s570x570/25eee68d-59c2-4794-9f54-87de5215-346c44c6-230816130607.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('57',N'Cà Phê Cốt Dừa',15000,3,119,15000,14999,'https://images.foody.vn/res/g104/1030260/s570x570/155cbc2c-f874-4a3b-98f3-a48ee8cc-3ae7a890-231016211236.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('58',N'Phin Đen Đá - Coffee',26000,25,211,20000,19000,'https://images.foody.vn/res/g104/1030260/s570x570/de06ae11-a81f-4ce8-bc0a-f616442e-423a76f8-230816130911.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('59',N'Trà mãng cầu TƯƠI (500ml)',28000,0,110,28000,16000,'https://images.foody.vn/res/g104/1030260/s570x570/6ee7f5b9-7cc9-48da-9f2e-b0fe2917-3476ec89-230520104600.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('60',N'Trà tắc Lô Hội (500ml)',23000,19,153,19000,10000,'https://images.foody.vn/res/g104/1030260/s570x570/e240b1e9-c21b-4099-8b91-e6b9644b-0092bc40-230808204353.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('61',N'Trà chanh leo Nha Đam (500ml)',27000,36,248,17000,15000,'https://images.foody.vn/res/g104/1030260/s570x570/3cc67725-3ded-401f-907b-aa8e8e55-41ba07c4-230808210002.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('62',N'Trà chanh Lô Hội (500ml)',29000,15,150,25000,15000,'https://images.foody.vn/res/g104/1030260/s570x570/ca3c78d6-bde9-4d33-8fc2-389dabfd-4b6de9e8-230808204440.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('63',N'Sữa Chua Xoài',19000,0,252,19000,12000,'https://images.foody.vn/res/g104/1030260/s570x570/a6de4fdc-ffd6-4a24-8e18-1daf0233-74296df8-210805115721.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('64',N'Sữa chua Việt Quất',18000,0,245,18000,14000,'https://images.foody.vn/res/g104/1030260/s570x570/f71502a0-f071-4d73-a1e0-4f07687e-29228cf7-210602204557.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('65',N'Sữa Chua Dâu',19000,0,237,19000,18999,'https://images.foody.vn/res/g104/1030260/s570x570/19afeb59-bee1-487d-8f29-a4628708-fc62d672-210629190415.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('66',N'Sữa chua Chanh leo',29000,0,220,29000,10000,'https://images.foody.vn/res/g104/1030260/s570x570/9193d105-61db-4675-acc7-908767d6-a25ffe1e-230331120003.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('67',N'Sữa chua đá Xay',18000,29,286,13000,12000,'https://images.foody.vn/res/g104/1030260/s570x570/55b2e9ea-0f49-4564-a1b4-c3564adb-626be554-230206143636.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('68',N'Ép Dưa Hấu(500ml)',25000,14,124,22000,12000,'https://images.foody.vn/res/g104/1030260/s570x570/487895f3-ebe6-4c9b-8eaf-ee4fd8cf-8c2cd741-230202135630.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('69',N'Ép Dứa(500ml)',22000,14,262,19000,12000,'https://images.foody.vn/res/g104/1030260/s570x570/e1eacff1-18a3-41bf-9d72-8bab8330-4579cc39-230202140703.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('70',N'Cam Vắt(500ml)',22000,12,274,19000,10000,'https://images.foody.vn/res/g104/1030260/s570x570/ac0291a7-8752-4316-a506-929e2b58-3339ac41-230202140544.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('71',N'Ép Ổi(500ml)',28000,0,285,28000,14000,'https://images.foody.vn/res/g104/1030260/s570x570/a49dd411-5596-4b68-af65-ca842b55-15b778ca-230202141430.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('72',N'Ép Cóc(500ml)',23000,0,238,23000,14000,'https://images.foody.vn/res/g104/1030260/s570x570/4468a18f-690d-491e-b7d6-31577f28-3c569ca1-230202141526.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('73',N'Nước Chanh Leo(500ml)',19000,28,196,14000,13000,'https://images.foody.vn/res/g104/1030260/s570x570/1caef5bb-c28d-4e6f-b6ce-97c326b7-0d9dd177-230202153925.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('74',N'Ép Dưa Gang(500ml)',27000,0,227,27000,17000,'https://images.foody.vn/res/g104/1030260/s570x570/5b7db7b4-7054-4be9-b528-5dafed8e-27085384-230202141807.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('75',N'Ép Táo(500ml)',19000,0,114,19000,17000,'https://images.foody.vn/res/g104/1030260/s570x570/3e9ab318-9bfb-47d7-8791-d1013f16-c3ce761d-230202161249.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('76',N'Ép Quýt(500ml)',25000,36,130,16000,15000,'https://images.foody.vn/res/g104/1030260/s570x570/2b17e622-088d-4cec-8553-464357b1-0bed465f-221117113552.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('77',N'Ép Cà Rốt(500ml)',23000,0,221,23000,20000,'https://images.foody.vn/res/g104/1030260/s570x570/1b895d5e-8766-40b7-834a-4dca1af5-c984e626-230202142939.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('78',N'Nước Chanh Tươi(500ml)',24000,27,265,18000,17000,'https://images.foody.vn/res/g104/1030260/s570x570/cd4bcf9d-d13a-47b1-83aa-1d4d8c3b-01130cdb-230516153441.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('79',N'Cơm Gà Rán Sốt Ngọt',31000,0,141,31000,14000,'https://images.foody.vn/res/g30/297288/s570x570/3e6270c8-8966-4a94-98f0-e8666b785119.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('80',N'Cơm Rang Đùi Gà Nướng BBQ',30000,0,248,30000,14000,'https://images.foody.vn/res/g30/297288/s570x570/289bf1ff-df61-460f-88c2-faa7e04aaf0c.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('81',N'Cơm Gà Rán Sốt Cay',33000,0,139,33000,27000,'https://images.foody.vn/res/g30/297288/s570x570/dd14b4cb-4a18-482e-bbc7-46a13ada1e5d.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('82',N'Cơm Rang Gà Rán Sốt Ngọt',28000,0,253,28000,20000,'https://images.foody.vn/res/g30/297288/s570x570/e4aa437a-7e37-47a9-90b0-75a100e31d7e.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('83',N'Cơm Rang Gà Rán Sốt Cay',26000,0,143,26000,25000,'https://images.foody.vn/res/g30/297288/s570x570/de5ce5aa-e54c-4358-91a8-a94f5df2f46d.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('84',N'Cơm Gà Rán Sốt vị Phomai Cay',29000,28,116,21000,10000,'https://images.foody.vn/res/g30/297288/s570x570/f72de8e6-9b15-4bbe-a57a-ec73e1b771fa.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('85',N'Cơm Rang Gà Rán Sốt vị PhôMai Cay',25000,0,182,25000,11000,'https://images.foody.vn/res/g30/297288/s570x570/5366e755-b2f8-4e5c-abf7-93091df9f889.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('86',N'Cơm Sườn Sốt Ngọt',29000,0,141,29000,26000,'https://images.foody.vn/res/g30/297288/s570x570/9f8b3b9e-8af8-46ca-a29c-3e25d9c39b16.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('87',N'Cơm Rang Sườn Sốt Ngọt',31000,0,138,31000,17000,'https://images.foody.vn/res/g30/297288/s570x570/4835dc68-ab2e-4800-a586-1a657d53c45e.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('88',N'Cơm Sườn Sốt Cay',28000,0,180,28000,27999,'https://images.foody.vn/res/g30/297288/s570x570/a9f54e18-b75a-44d0-8c7f-5668d4ba8074.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('89',N'Cơm Rang Sườn Sốt Cay',32000,14,243,28000,27000,'https://images.foody.vn/res/g30/297288/s570x570/b12b3809-b3cc-4c97-97bb-768aa41b4cca.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('90',N'Cơm Gà Rán Sốt Mắm Cay',32000,0,275,32000,22000,'https://images.foody.vn/res/g30/297288/s570x570/d83d9878-ec1e-4833-bfad-84263cac-f2525b4e-210811133707.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('91',N'Cơm gà rán sốt  tương tỏi',29000,0,214,29000,13000,'https://images.foody.vn/res/g30/297288/s570x570/528262e6-8060-413a-ab87-53453f6e-9173fcd5-210317101439.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('92',N'Cơm Rang Gà Rán Sốt Mắm Cay',33000,0,270,33000,27000,'https://images.foody.vn/res/g30/297288/s570x570/d83d9878-ec1e-4833-bfad-84263cac-f2525b4e-210811133707.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('93',N'Cơm rang gà rán sốt tương tỏi',35000,47,185,19000,16000,'https://images.foody.vn/res/g30/297288/s570x570/d83d9878-ec1e-4833-bfad-84263cac-f2525b4e-210811133707.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('94',N'Cơm gà rán sốt kem hành',26000,43,119,15000,14000,'https://images.foody.vn/res/g30/297288/s570x570/d795ca1a-08d1-4ecb-a126-c492fea6-63cb986f-220919185425.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('95',N'Cơm rang gà xiên que sốt cay',32000,0,151,32000,17000,'https://images.foody.vn/res/g30/297288/s570x570/1bcb5de9-f3ec-45fe-be77-39d0de09-252b308c-230629235408.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('96',N'Cơm gà xiên que sốt cay',29000,0,133,29000,17000,'https://images.foody.vn/res/g30/297288/s570x570/fbadf67b-dd01-48b8-8099-4a5a912f-7ffa9497-230611233841.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('97',N'Trà Đào (Nhỏ)',23000,0,142,23000,11000,'https://images.foody.vn/res/g30/297288/s570x570/2017111105919-tra-dao.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('98',N'Pepsi',17000,14,124,15000,14000,'https://images.foody.vn/res/g30/297288/s570x570/fd44e14e-dd9b-4d6c-b54c-c3aa117e-8209de62-230311130923.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('99',N'Pepsi lon',28000,50,152,14000,10000,'https://images.foody.vn/res/g30/297288/s570x570/2017111105834-b6a74fee859ac47cfc635db350bd68a6.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('100',N'Milo Lon',29000,37,158,18000,16000,'https://images.foody.vn/res/g30/297288/s570x570/258f79f0-d20e-4421-8925-50c4f6307026.jpg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('101',N'7Up',16000,3,237,16000,15999,'https://images.foody.vn/res/g30/297288/s570x570/2b50bbd6-094c-475f-8798-dab94fb4-f76dcf30-230311130941.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('102',N'Mì Trộn Thập Cẩm Nhiều Mì',33000,6,150,31000,25000,'https://images.foody.vn/res/g102/1017853/s570x570/ded0bf8d-1b2f-4bb9-9b18-02c14aff225f.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('103',N'Mì Trộn Thập Cẩm',34000,0,134,34000,15000,'https://images.foody.vn/res/g102/1017853/s570x570/c1365c02-b9fe-497f-a588-5cf2b015-d7f06264-231130140741.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('104',N'Mì Trộn Sủi Cảo Nhân Thịt',27000,0,198,27000,22000,'https://images.foody.vn/res/g102/1017853/s570x570/e6328286-dcf6-4a6b-a305-50103f7c-06263c45-200905090322.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('105',N'Mì Trộn Trứng Cút',32000,0,233,32000,19000,'https://images.foody.vn/res/g102/1017853/s570x570/cd80dc11-3dfa-4f0f-9352-46ad8ed2ba99.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('106',N'Mì Trộn Rau Củ',34000,0,265,34000,18000,'https://images.foody.vn/res/g102/1017853/s570x570/2c2d6881-c244-4e97-ae7b-5ba22c44-47beaaff-210627191708.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('107',N'Mì Trộn Tôm',28000,20,268,22000,12000,'https://images.foody.vn/res/g102/1017853/s570x570/bc8c6043-7e86-4945-80d0-24d29fb1-4b2b0c5b-201207101552.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('108',N'Mì Trộn Mực Xoắn',27000,24,297,21000,12000,'https://images.foody.vn/res/g102/1017853/s570x570/e6c06751-2847-44a8-80b9-31fbe99873fa.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('109',N'Mì Trộn Hồ Lô',29000,0,294,29000,22000,'https://images.foody.vn/res/g102/1017853/s570x570/ab500451-ee7e-4f22-ba32-4f25c428bff8.jpg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('110',N'Mì Trộn Xúc Xích',30000,0,269,30000,28000,'https://images.foody.vn/res/g102/1017853/s570x570/9c9c45be-78e6-4814-994c-fc5e3c05-17628acb-231130143237.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('111',N'Mì Trộn Tôm Viên',26000,32,137,18000,16000,'https://images.foody.vn/res/g102/1017853/s570x570/b8406b58-3754-4d6e-a45d-827c89f6-12fde419-210627191035.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('112',N'Bún cá chan',26000,24,187,20000,10000,'https://images.foody.vn/res/g108/1070205/s570x570/d2ef2429-766a-4399-95d2-42950964-7f334296-210325142053.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('113',N'Bún Bò Giò',33000,34,294,22000,11000,'https://images.foody.vn/res/g108/1070205/s570x570/d1018e7e-5eee-4c85-a99b-4b444741-6088720f-210527004331.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('114',N'Bún riêu bò',32000,10,230,29000,28000,'https://images.foody.vn/res/g108/1070205/s570x570/8d68fd12-a3e7-44f9-8133-e50a6e1d-9a7b9ea7-210325141248.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('115',N'Bún thập cẩm',26000,0,121,26000,14000,'https://images.foody.vn/res/g108/1070205/s570x570/c3e32eb6-2489-495d-b869-19ba94fe-2db6941f-210325141723.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('116',N'Bún riêu ốc bò',27000,0,136,27000,26999,'https://images.foody.vn/res/g108/1070205/s570x570/ac6d4cf5-d964-461c-8307-4a2ee9bc-ddb2895c-210325141544.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('117',N'Bún Ốc Bò Giò',30000,19,133,24000,17000,'https://images.foody.vn/res/g108/1070205/s570x570/d1018e7e-5eee-4c85-a99b-4b444741-6088720f-210527004331.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('118',N'Bún Ốc Bò',25000,2,211,25000,24999,'https://images.foody.vn/res/g108/1070205/s570x570/ba646e7c-5d3b-4af0-a641-82d4093a-7b708c4a-210526181723.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('119',N'Bún riêu',26000,0,280,26000,20000,'https://images.foody.vn/res/g108/1070205/s570x570/4e021a9a-aba2-4138-8c70-5d18c065-852532b5-210325141218.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('120',N'Bún riêu ốc',29000,46,219,16000,15000,'https://images.foody.vn/res/g108/1070205/s570x570/49d610c8-e242-42ef-a2f1-2cab6561-f9a755d2-210325141516.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('121',N'Bún riêu ốc giò',30000,11,196,27000,26000,'https://images.foody.vn/res/g108/1070205/s570x570/47f0ec85-d84d-40b7-bb59-97551654-89482abd-210325141605.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('122',N'bánh đa thập cẩm',27000,0,112,27000,12000,'https://images.foody.vn/res/g108/1070205/s570x570/e4fa17f4-6a9a-497f-99fb-7a47db13-f09a9376-211031175246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('123',N'Bún ốc',31000,0,137,31000,22000,'https://images.foody.vn/res/g108/1070205/s570x570/bc83504b-3448-4d0d-abe7-7973e690-92318ba4-210325141909.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('124',N'bánh đa riêu bò',31000,0,144,31000,17000,'https://images.foody.vn/res/g108/1070205/s570x570/e4fa17f4-6a9a-497f-99fb-7a47db13-f09a9376-211031175246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('125',N'bánh đa cá',27000,0,264,27000,14000,'https://images.foody.vn/res/g108/1070205/s570x570/e4fa17f4-6a9a-497f-99fb-7a47db13-f09a9376-211031175246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('126',N'Bún Ốc Giò',33000,23,150,25000,20000,'https://images.foody.vn/res/g108/1070205/s570x570/b3c07929-466f-4afc-8a25-6b5eba55-6aafa25d-210527004522.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('127',N'bánh đa riêu ốc bò',25000,0,128,25000,24999,'https://images.foody.vn/res/g108/1070205/s570x570/e4fa17f4-6a9a-497f-99fb-7a47db13-f09a9376-211031175246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('128',N'bánh đa riêu ốc giò',25000,0,135,25000,17000,'https://images.foody.vn/res/g108/1070205/s570x570/e4fa17f4-6a9a-497f-99fb-7a47db13-f09a9376-211031175246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('129',N'Bánh mỳ trứng xúc xích',33000,31,105,23000,14000,'https://images.foody.vn/res/g114/1132706/s570x570/811f1b78-3d8c-429b-ad30-ef4c4087-b3c164a0-220418204129.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('130',N'Bánh mỳ kẹp thịt xiên ',31000,1,221,31000,30000,'https://images.foody.vn/res/g114/1132706/s570x570/cf39754f-672d-46da-a901-f25d7484-ed5a1b3b-220418184745.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('131',N'Bánh mỳ kẹp thịt xá xíu',32000,30,136,22000,21000,'https://images.foody.vn/res/g114/1132706/s570x570/97e3e56c-1004-4c1a-876d-b06ce57a-d4478329-220418184536.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('132',N'Bánh mỳ kẹp trứng chả',32000,13,128,28000,18000,'https://images.foody.vn/res/g114/1132706/s570x570/c62ec700-1a14-4017-b2a2-b5e67b59-a8c6bb03-220418204046.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('133',N'Bánh mỳ trứng xá xíu',32000,19,254,26000,20000,'https://images.foody.vn/res/g114/1132706/s570x570/06bcb707-df8c-4f18-a994-29dfaba3-006751e0-220418204223.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('134',N'Bánh mỳ pate xúc xích',34000,0,268,34000,10000,'https://images.foody.vn/res/g114/1132706/s570x570/06bcb707-df8c-4f18-a994-29dfaba3-006751e0-220418204223.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('135',N'Bánh mỳ kẹp pate chả',32000,0,148,32000,29000,'https://images.foody.vn/res/g114/1132706/s570x570/13e750c2-3418-4332-9835-df60b0e9-03a490b8-220418184617.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('136',N'Bánh mỳ chảo đặc biệt 2',26000,0,159,26000,20000,'https://images.foody.vn/res/g114/1132706/s570x570/0e47c357-a18c-42f4-be36-1f717765-2ae7e5ab-220418205228.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('137',N'Bánh mỳ chảo thường',29000,1,154,29000,28000,'https://images.foody.vn/res/g114/1132706/s570x570/16676f94-7e3c-4e95-98cb-371b6b64-710c4434-220418205041.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('138',N'Bánh mỳ chảo pate trứng',35000,24,115,27000,26000,'https://images.foody.vn/res/g114/1132706/s570x570/a8502e43-5de1-406c-989b-3cfb3f3d-92b7d141-220430141219.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('139',N'Bánh mỳ sốt vang ',35000,15,195,30000,29000,'https://images.foody.vn/res/g114/1132706/s570x570/b98d3d09-73d7-4e3d-92ec-3730addc-c116a56c-220418205328.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('140',N'Bánh mỳ chảo 2 trứng',35000,0,139,35000,20000,'https://images.foody.vn/res/g114/1132706/s570x570/5627c36e-31c2-40d4-b17d-a1d7ace1-b4fcbff0-220418204943.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('141',N'Bánh mỳ lắc chà bông',32000,0,114,32000,16000,'https://images.foody.vn/res/g114/1132706/s570x570/b8fc86d2-e24b-450c-996d-d61a6423-0fe432f8-221105064044.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('142',N'Trà tắc',30000,15,249,26000,17000,'https://images.foody.vn/res/g114/1132706/s570x570/520cf7c5-c9dd-4d7e-9651-b1f9fa93-d14a16a6-220418205646.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('143',N'Sữa đậu nành tribeco lon',21000,37,273,13000,11000,'https://images.foody.vn/res/g114/1132706/s570x570/8c3a3b93-1d51-440a-bc4d-338e6b6e-534f9c2b-220606224034.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('144',N'Sữa trái cây nutri boost',28000,6,178,26000,14000,'https://images.foody.vn/res/g114/1132706/s570x570/9449a8cd-965d-4fa6-b2d9-cb9b8427-cf0c1795-220603212349.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('145',N'Nước coca chai',28000,0,270,28000,19000,'https://images.foody.vn/res/g114/1132706/s570x570/6b1cd445-89b9-4e18-b4dc-bc31300e-64c078dd-221008231406.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('146',N'Nước bò húc thái',23000,36,167,15000,14000,'https://images.foody.vn/res/g114/1132706/s570x570/e687a8a5-35f1-441e-9862-6fa7f3e4-31e3946a-220418210303.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('147',N'Nước khoáng lavie  500ml',21000,21,192,17000,16000,'https://images.foody.vn/res/g114/1132706/s570x570/8bcf5722-e542-45d7-bbc0-cb7bca28-85515b20-220611181214.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('148',N'Sữa đậu nành fami',18000,0,286,18000,14000,'https://images.foody.vn/res/g114/1132706/s570x570/3c47ba31-d384-43a1-b5f8-8430d122-4c5e96ab-221102102034.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('149',N'Sting vàng chai nhựa',26000,19,176,21000,10000,'https://images.foody.vn/res/g114/1132706/s570x570/efd44388-6813-418e-9b62-05728034-4f10bd73-220611181127.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('150',N'Nước tăng lực  247',27000,0,189,27000,18000,'https://images.foody.vn/res/g114/1132706/s570x570/ffadbd90-4abb-4d8a-a117-e0bf294f-e8c177f0-220917233941.jpeg',N'Đồ uống');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('151',N'Xôi thập cẩm',33000,0,187,33000,21000,'https://images.foody.vn/res/g114/1132706/s570x570/4b712b70-7a85-40ba-9cc3-2da8f81a-ac8a715d-220911222301.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('152',N'Xôi pate trứng',35000,15,258,30000,18000,'https://images.foody.vn/res/g114/1132706/s570x570/e3f1d4e0-d125-4b92-92de-3fa427ad-2fc73fcb-220521162653.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('153',N'Xôi  ruốc trứng',25000,0,240,25000,24000,'https://images.foody.vn/res/g114/1132706/s570x570/66817626-1fd8-4b16-9f34-6a04c7cb-2028c7ac-220915203953.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('154',N'Xôi trắng ruốc',28000,23,220,22000,21000,'https://images.foody.vn/res/g114/1132706/s570x570/7b51fbb0-eba9-414e-8af1-90ced5f3-adc291d7-220521200833.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('155',N'Xôi pate chả',27000,0,110,27000,26999,'https://images.foody.vn/res/g114/1132706/s570x570/fdfe7ded-df87-4556-ac8e-b75e3ed1-52de6f5e-220521161931.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('156',N'Xôi thịt xiên nướng',28000,19,270,23000,22000,'https://images.foody.vn/res/g114/1132706/s570x570/056672c9-0927-4193-a74c-832d01b8-5e932b99-220521162844.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('157',N'Xôi lạp xưởng',35000,0,222,35000,13000,'https://images.foody.vn/res/g114/1132706/s570x570/4b023348-daf6-4ff0-9e9d-e5afe6cf-be43d157-220526072119.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('158',N'Xôi lạp xưởng trứng',33000,0,112,33000,26000,'https://images.foody.vn/res/g114/1132706/s570x570/f84a63b3-cb80-46f1-9d91-8c641b00-e005cd49-220526072246.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('159',N'Xôi xúc xích pate',32000,0,232,32000,23000,'https://images.foody.vn/res/g114/1132706/s570x570/2a5e6b1a-ec4e-44c2-a757-bd59f774-76ef3c5d-220521162620.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('160',N'Xôi trắng pate ruốc',27000,5,161,26000,25000,'https://images.foody.vn/res/g114/1132706/s570x570/038a776d-6ddd-4188-85f0-64b1eee8-30d774fc-220521201104.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('161',N'Xôi trắng pate',35000,0,114,35000,12000,'https://images.foody.vn/res/g114/1132706/s570x570/f10890c8-45fe-485d-9969-9015f5d4-b6988ff7-220521162113.jpeg',N'Món ăn');
INSERT INTO "item"("id_item","name","price","discount","quantity","saleprice","cost","image","type") VALUES ('162',N'Xôi lạp xưởng ruốc',30000,0,146,30000,23000,'https://images.foody.vn/res/g114/1132706/s570x570/36191499-d5a6-4489-bf9a-81a8b991-d6a2305f-220911105214.jpeg',N'Món ăn');
