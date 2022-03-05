import React, { useEffect, useLayoutEffect } from "react";
import Box from "./Box";
import _ from "lodash";
import { statService } from '../../ServiceFolder/statService'

/*
    Every new container components will start a new entry of its database as
    db_$CONTAINER_ID.
    The structure of the database is like
    {
        action1:{
            key1: 0,//count of action1 on key1 component
            key2: 1
        },
        action2:{
            key1:0, //count of action2 on key1 component
            key2:2
        }
    }
*/
export var database = {}


function Container(props) {
    const [layouts, setLayouts] = React.useState(shred());
    let { brainFx, behaveFx } = props;
    var DATABSE_ID = `db_${props.id}`;

    /**
     * 
     * @returns A mutable array of children that can easily be sorted
     */
    function shred() {
        var mutableArray = [];
        props.children.forEach((val) => mutableArray.push(val))
        return mutableArray;
    }

    //Initialises database with the new entry for this component
    function initdb(id) {
        try {
            if (localStorage.getItem("db") !== null) {
                database = JSON.parse(localStorage.getItem("db"));
                console.log(database)
                return;
            }
            console.log("Initialising database")
            database[DATABSE_ID] = {}
            var actions = Object.keys(behaveFx)
            actions.forEach((action) => {
                database[DATABSE_ID][action] = {};
                props.children.forEach((child) => {
                    database[DATABSE_ID][action][child.key] = 0;
                })
            })
            localStorage.setItem("db", JSON.stringify(database))
        } catch (error) {
            console.log("error initialising database", error)
        }
    }

    //Stores database to local storage
    function reflectdb() {
        try {
            localStorage.setItem("db", JSON.stringify(database));
        } catch (error) {
            console.log("Error commiting data to local storage")
        }
    }

    /**
     * 
     * @param {string} action 
     * @param {*} key 
     * @returns {number} the count of the actions on the corresponding key
     */
    function getdb(action, key) {
        try {
            return database[DATABSE_ID][action][key];
        } catch (error) {
            console.log("Error getting key from db", error)
            return undefined;
        }
    }

    /**
     * 
     * @param {*} key 
     * @param {*} action 
     * increments the key under an action in db
     */
    function updatedb(key, action) {
        try {
            database[DATABSE_ID][action][key] += 1
        }
        catch (error) {
            console.log("Error updating database", error)
        }
    }

    /**
     * 
     * @param {*} action The action to which comparator has to be applied.
     * @returns a general comparator that uses the specified action.
     */
    function genComp(action) {
        return (a, b) => {
            return getdb(action, a.key) - getdb(action, b.key);
        }
    }

    function handleRender(action) {
        try {
            reflectdb();
            var newLayouts = []
            //sorting and shallow cloning to update page.
            layouts.sort(genComp(action)).forEach((child) => newLayouts.push(child));
            setLayouts(newLayouts)
            console.log(layouts);
        } catch (error) {
            console.log("Error trying to rearrange children", error)
        }
    }


    useEffect(() => {
        var subscription = statService.getStats().subscribe((message) => {
            if (message == undefined) {
                initdb();
            }
            if (message !== undefined) {
                updatedb(message.stats.key, message.stats.action);
                handleRender(message.stats.action);
            }
        })
        return () => {
            subscription.unsubscribe();
        }

    }, [])

    return (
        <>
            {layouts}
        </>
    )
}

export default Container;