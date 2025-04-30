import { urlList } from '../data/url'

/**
 * 获取图片数据列表
 */
export const getPexelsList = (data) => {
  return new Promise((resolve, reject) => {
     const { page, per_page } = data
     setTimeout(() => {
        resolve(
            {
                code: 200,
                data: {
                  urlList: urlList.slice((page - 1) * per_page, page * per_page),
                }
            }
        )
     }, 1000)
  })
}
