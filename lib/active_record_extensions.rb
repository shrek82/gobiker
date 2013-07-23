module ActiveRecordExtensions

    def select_id(field = 'id')
      select_values(field)
    end

    def select_values(field = nil)
      scope = field ? self.scoped.select(field) : self.scoped
      connection.select_values(scope.to_sql)
    end

    def select_attributes(fields = nil)
      scope = fields ? self.scoped.select(fields) : self.scoped
      connection.send(:select_all, scope.to_sql)
    end

    #生成激活码
    def activecode(email=nil)
      Digest::SHA1.hexdigest(email.to_s+'gobiker.cn') if email
    end

end
