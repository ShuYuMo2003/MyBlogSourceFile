hexo.extend.filter.register('post_permalink', function(data){
  return data.replace(/\s+/g, '-');
});
