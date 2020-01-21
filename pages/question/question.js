// pages/question/questionn.js
var util = require('../../utils/question_util.js')
var app = getApp()
Page({
  data: {
    question: [],
    question_length: 0
  },
  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },

  getData: function() {
    var question = util.getData2();
    var question_data = question.data;
    this.setData({
      question: question_data,
      question_length: question_data.length
    });
  },

  onChangeShowState: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    that.setData({
      id: index,
      showView: (!that.data.showView)
    });
  }
})