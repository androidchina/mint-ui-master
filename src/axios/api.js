import service from './request'

// 工作报告-列表
export const getReportList = data => {
  return service({
    url: 'workReport/newIndex',
    method: 'post',
    data
  })
};
// 工作报告-详情
export const getReportDetail = data => {
  return service({
    url: 'workReport/detail',
    method: 'post',
    data
  })
};
// 工作报告-评论列表
export const getCommentList = data => {
  return service({
    url: 'workReport/getComment',
    method: 'post',
    data
  })
};
// 工作报告-发送评论
export const sendComment = data => {
  return service({
    url: 'workReport/comment',
    method: 'post',
    data
  })
};
// 工作报告-点赞
export const reportPraise = data => {
  return service({
    url: 'workReport/praise',
    method: 'post',
    data
  })
};
// 工作报告-审核
export const reportAuditing = data => {
  return service({
    url: 'workReport/verify',
    method: 'post',
    data
  })
};
