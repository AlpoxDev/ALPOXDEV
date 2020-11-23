import { TYPE_DONE, TYPE_ERROR } from '../utils';

export const POST_TYPES = {
    SET_POST_STATE: 'post/SET_POST_STATE',

    GET_POSTS: 'post/GET_POSTS',
    GET_POSTS_DONE: TYPE_DONE('post/GET_POSTS'),
    GET_POSTS_ERROR: TYPE_ERROR('post/GET_POSTS'),

    GET_POST: 'post/GET_POST',
    GET_POST_DONE: TYPE_DONE('post/GET_POST'),
    GET_POST_ERROR: TYPE_ERROR('post/GET_POST'),

    CREATE_POST: 'post/CREATE_POST',
    CREATE_POST_DONE: TYPE_DONE('post/CREATE_POST'),
    CREATE_POST_ERROR: TYPE_ERROR('post/CREATE_POST'),

    DELETE_POST: 'post/DELETE_POST',
    DELETE_POST_DONE: TYPE_DONE('post/DELETE_POST'),
    DELETE_POST_ERROR: TYPE_ERROR('post/DELETE_POST'),

    UPDATE_POST: 'post/UPDATE_POST',
    UPDATE_POST_DONE: TYPE_DONE('post/UPDATE_POST'),
    UPDATE_POST_ERROR: TYPE_ERROR('post/UPDATE_POST'),
};