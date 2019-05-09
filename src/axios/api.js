import service from './request'

export const getReportList = data => {
  return service({
    url: 'workReport/newIndex',
    method: 'post',
    data
  })
};
export const getCommentList = data => {
  return service({
    url: 'workReport/getComment',
    method: 'post',
    data
  })
};
