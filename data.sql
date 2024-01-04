DO $$ 
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO "user"("username", "password", "name", "email", "password_changed_at", "public_id", "url_image", "role", "active", "money")
    VALUES (i, i, 'User ', '@example.com', NOW(), i, '', 'user', true, 100000);
  END LOOP;
END $$;
select * from "user"
DO $$ 
DECLARE
  user_id INTEGER;
  item_id INTEGER;
  order_id INTEGER;
BEGIN
  FOR user_id IN 2..50 LOOP
    FOR i IN 1..2 + FLOOR(RANDOM() * 2) LOOP
      -- Insert order
      INSERT INTO "order"("id_user", "order_date", "status", "payment", "id_cashier", "total_price")
      VALUES (user_id, CURRENT_DATE - (FLOOR(RANDOM() * 30) || ' days')::INTERVAL, 'Completed', true, user_id, 0) RETURNING "id_order" INTO order_id;

      -- Insert order details
      FOR j IN 1..1 + FLOOR(RANDOM() * 2) LOOP
        SELECT "id_item" FROM "item" ORDER BY RANDOM() LIMIT 1 INTO item_id;
        INSERT INTO "orderdetail"("id_order", "id_item", "quantity")
        VALUES (order_id, item_id, 1 + FLOOR(RANDOM() * 5));
      END LOOP;

      -- Update total price in the order
      UPDATE "order"
      SET "total_price" = (SELECT SUM(("item"."price" - ("item"."price" * "item"."discount" / 100)) * "orderdetail"."quantity") FROM "item" JOIN "orderdetail" ON "item"."id_item" = "orderdetail"."id_item" WHERE "id_order" = order_id)
      WHERE "id_order" = order_id;
    END LOOP;
  END LOOP;
END $$;