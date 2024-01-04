const db = require("../db/db");
module.exports =
{
    addFood: async (FoodId,Username)=>
    {
        try {
            let user = await db.selectByOneField("user","username",Username);
            let IdUser = user[0].id_user;
            await db.addFood(FoodId,IdUser);
           //insert success alert
            return {}
        } catch (error) {
            throw error;
        }
    }
    
}