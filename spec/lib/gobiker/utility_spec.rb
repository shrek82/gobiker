# encoding: utf-8

require 'spec_helper'

describe Gobiker::Utility, '#random_string' do
  context '参数正确' do
    it '应该生成长度正确的字符串' do
      Gobiker::Utility.random_string(0).should == ''
      Gobiker::Utility.random_string(1).length.should == 1
      Gobiker::Utility.random_string(10).length.should == 10
      Gobiker::Utility.random_string(100).length.should == 100
    end

    it '多次生成的随机字符串应该不同' do
      Gobiker::Utility.random_string(10).should_not == Gobiker::Utility.random_string(10)
      # 或者这样测, 如果每次生成同样的字符串, results 数组 uniq 之后就会只有一个元素
      results = 3.times.map { Gobiker::Utility.random_string(4) }
      results.uniq.length.should_not == 1
    end

    it '生成的字符串只包含大小写字母和数字' do
      10.times do
        Gobiker::Utility.random_string(10).should =~ /\A[A-Za-z0-9]*\Z/
      end
    end
  end

  context '参数非法 - 指定长度为负数' do
    it '应该报错' do
      expect{ Gobiker::Utility.random_string(-1) }.to raise_error
      expect{ Gobiker::Utility.random_string(-10) }.to raise_error
    end
  end
end