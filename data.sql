-- Chay tao user truoc
DO $$ 
DECLARE
  first_names VARCHAR[] := ARRAY['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Võ', 'Đặng', 'Bùi'];
  last_names VARCHAR[] := ARRAY['Hoài', 'Hoàng', 'Đức', 'Anh', 'Thảo', 'Hiếu', 'Hào', 'Nam', 'Cường', 'Lan'];
BEGIN
  FOR i IN 1..30 LOOP
    -- Generate a unique and realistic username
    DECLARE
      username_suffix VARCHAR := i;
      full_name VARCHAR := first_names[i % 10 + 1] || ' ' || last_names[i % 10 + 1];
    BEGIN
      INSERT INTO "user"("username", "password", "name", "email", "password_changed_at", "public_id", "url_image", "role", "active", "money")
      VALUES (
        LOWER(TRANSLATE(LOWER(full_name), 'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ', 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd'))|| username_suffix,
        'password',
        full_name,
        'user@example.com',
        NOW(),
        i,
        '',
        'user',
        true,
        100000
      );
    END;
  END LOOP;
END $$;

select * from "user";
DO $$ 

DECLARE
  user_id INTEGER;
  item_id INTEGER;
  order_id INTEGER;
BEGIN
  FOR user_id IN 1..30 LOOP
    FOR i IN 1..2 + FLOOR(RANDOM() * 4) LOOP
      -- Insert order
      INSERT INTO "order"("id_user", "order_date", "status", "payment", "id_cashier", "total_price")
      VALUES (user_id, CURRENT_DATE - (FLOOR(RANDOM() * 30) || ' days')::INTERVAL, 'Completed', true, user_id, 0) RETURNING "id_order" INTO order_id;

      -- Insert order details
      FOR j IN 1..1 + FLOOR(RANDOM() * 3) LOOP
        SELECT "id_item" FROM "item" ORDER BY RANDOM() LIMIT 1 INTO item_id;
        INSERT INTO "orderdetail"("id_order", "id_item", "quantity")
        VALUES (order_id, item_id, 1 + FLOOR(RANDOM() * 2));
      END LOOP;

      -- Update total price in the order
      UPDATE "order"
      SET "total_price" = (SELECT SUM(("item"."price" - ("item"."price" * "item"."discount" / 100)) * "orderdetail"."quantity") FROM "item" JOIN "orderdetail" ON "item"."id_item" = "orderdetail"."id_item" WHERE "id_order" = order_id)
      WHERE "id_order" = order_id;
    END LOOP;
  END LOOP;
END $$;