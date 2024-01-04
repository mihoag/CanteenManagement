const db = require("../db/db");
module.exports =
{
    getFoodRecent: async (username,nameFood) => {
        try {

            let data = await db.getFoodRecent(username,nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getFoodPromotion: async (nameFood) => {
        try {
            let data = await db.getFoodPromotion(nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getFoodNew: async (nameFood) => {
        try {
            let data = await db.getFoodNew(nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getFoodSoldOut: async (nameFood) => {
        try {
            let data = await db.getFoodSold(nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getFoodFavorite: async (nameFood) => {
        try {
            let data = await db.getFoodFavorite(nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getFoodAll: async (nameFood) => {
        try {
            let data = await db.getFoodAll("item",nameFood);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    },
    getDetailFood: async (Id)=>
    {
        try {
            let data = await db.selectByID("item","id_item",Id);
            if (data) {
                return data;
            }
            return {}
        } catch (error) {
            throw error;
        }
    }
    
}