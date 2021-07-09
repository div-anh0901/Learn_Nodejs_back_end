export const apiUrl = process.env.NODE_ENV!== 'production'
                                                ? 'http://localhost:5000/api'
                                                :'hoanganh'

                      
                                                
export const LOCAL_STARAGE_TOKEN_NAME = 'lernit-mern';               




export const POSTS_LOADED_SUCCESS ='POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FALSE ='POSTS_LOADED_FALSE';


export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'