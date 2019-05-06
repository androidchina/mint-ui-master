import service from './request'

export const getCommentList = data => {
  return service({
    url: 'workReport/getComment',
    method: 'post',
    data
  })
};
