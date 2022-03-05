import { database } from "../components/Container";


/**
 * Function does'nt work because there is a delay loading the data from localstorage
 * @param {string} dbname 
 * @param {string} action 
 * @param {number} key 
 * @returns {number}
 */
export async function getdb(dbname, action, key) {
    try {
        return database[dbname][action][key];
    } catch (error) {
        console.log("Global database fetch failed", error);
    }
}