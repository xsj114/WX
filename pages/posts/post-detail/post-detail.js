var postsData=require('../../../data/posts-data.js');

Page({
  data:{
    currentPostId : ""
  },
  onLoad : function(option){
    var postId=option.id;
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected){
      var postCollected = postsCollected[postId];
      if (postCollected){
        this.setData({
          collected: postCollected
        });
      }
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
  },
  onCollectionTap:function(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected?"收藏成功":"取消成功",
      duration : 1000  
    })
  }
})