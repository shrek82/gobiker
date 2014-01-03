#coding: utf-8
class GuidesController < ApplicationController
  def index
    image = ImageClipper::Image.new('public/uploads/photos/2014/0103/1_original.jpg')
    #重置图片大小，覆盖原图
    #image.resize('200x100')
    #另存为新图片
    #image.resize('200x100','public/uploads/photos/2014/0103/test2.jpg')
    #缩小
    #image.resize('35%')
    #添加水印:
    #image.watermarking('public/images/water.png')
    #水印位置: %W(top_left top_right bottom_left bottom_right center)
    image.watermarking('public/images/water.png', position: 'bottom_right', save_to:'public/uploads/photos/2014/0103/test2.jpg')
    #还可以设置水印大小
    #image.watermarking('public/images/water.png', position: 'bottom_right', save_to:'public/uploads/photos/2014/0103/test2.jpg',resize_to: '100%')
    #设置详细坐标
    #image.watermarking('public/images/water.png', save_to:'public/uploads/photos/2014/0103/test2.jpg', resize_to: '60%', position: '100,230')

  end
end