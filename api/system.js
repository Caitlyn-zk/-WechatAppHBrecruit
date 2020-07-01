import request from "./../utils/request.js";

/**
 *  公共接口
 * @returns {*}
 */
export function getSystemAreaTreeData () {
  return request.get('sys/area/tree', {}, { login: false })
}
