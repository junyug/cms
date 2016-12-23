/**
 * 使用命名空间区分不同模块
 */
/**
 * page types
 */
// set state types
export const SET_PAGE_LIST = 'page/SET_PAGE_LIST'
export const SET_CITY_LIST = 'page/SET_CITY_LIST'
export const SET_TYPE_LIST = 'page/SET_TYPE_LIST'
export const ADD_PAGE = 'page/ADD_PAGE'
export const UPDATE_PAGE = 'page/UPDATE_PAGE'
export const CLONE_PAGE = 'page/CLONE_PAGE'

// getters type
export const PAGE_LIST = 'page/GET_LIST'
export const CITY_LIST = 'page/CITY_LIST'
export const TYPE_LIST = 'page/TYPE_LIST'
export const STRUCT_LIST = 'page/STRUCT_LIST'

/**
 * page-module types
 */
// set state types
export const SET_MODULE_LIST = 'page_module/SET_MODULE_LIST'
export const SET_APPLY_MODULE_LIST = 'page_module/SET_APPLY_MODULE_LIST'
export const SET_OPERATE_MODULE = 'page_module/SET_OPERATE_MODULE'
export const ADD_MODULE = 'page_module/ADD_MODULE'
export const UPDATE_MODULE = 'page_module/UPDATE_MODULE'
export const DELETE_MODULE = 'page_module/DELETE_MODULE'
export const SORT_MODULES = 'page_module/SORT_MODULES'

// getters types
export const MODULE_LIST = 'page_module/MODULE_LIST'
export const APPLY_MODULE_LIST = 'page_module/APPLY_MODULE_LIST'
export const OPERATE_MODULE = 'page_module/OPERATE_MODULE'

/**
 * ds-timeline types
 */
// set state types
export const SET_MODULE_TIMELINE_LIST = 'timeline/SET_MODULE_TIMELINE_LIST'
export const ADD_TIMELINE = 'timeline/ADD_TIMELINE'
export const UPDATE_TIMELINE = 'timeline/UPDATE_TIMELINE'
export const DELETE_TIMELINE = 'timeline/DELETE_TIMELINE'
export const SET_OPERATE_TIMELINE_ID = 'timeline/SET_OPERATE_TIMELINE_ID'

// getters types
export const MODULE_TIMELINE_LIST = 'timeline/MODULE_TIMELINE_LIST'
export const OPERATE_TIMELINE_ID = 'timeline/OPERATE_TIMELINE_ID'

/**
 *  ds-item types
 */
// set state types
export const SET_DS_ITEM_LIST = 'ds_item/SET_DSITEM_LIST'
export const ADD_ITEM = 'ds_item/ADD_ITEM'
export const UPDATE_ITEM = 'ds_item/UPDATE_ITEM'
export const BATCH_UPDATE_ITEM = 'ds_item/BATCH_UPDATE_ITEM'
export const DELETE_ITEM = 'ds_item/DELETE_ITEM'
export const BATCH_DELETE_ITEM = 'ds_item/BATCH_DELETE_ITEM'

// getters types
export const DS_ITEM_LIST = 'ds_item/DSITEM_LIST'
