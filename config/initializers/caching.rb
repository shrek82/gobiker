#coding: utf-8
#内存缓存，默认32M
#当缓存超过了分配的大小，会做一次清理，将最近使用最少的条目移除。
ActionController::Base.cache_store = :memory_store

#文件缓存
#ActionController::Base.cache_store = :file_store, "/path/to/cache/directory"
#其他自定义缓存策略
#ActionController::Base.cache_store = :mem_cache_store, "localhost"
#ActionController::Base.cache_store = :mem_cache_store, Memcached::Rails.new("localhost:11211")
#ActionController::Base.cache_store = MyOwnStore.new("parameter")