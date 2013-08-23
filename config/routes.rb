#coding: utf-8

Gobiker::Application.routes.draw do

  get "install/setting"

  get "install/user"

  get "install/forum"

  get "install/manager"

  #show、new、edit、update、destroy是单数，对单一元素操作
  #index、create是复数，对群集操作
  #place_path(@place)需要参数，根据HTTP动词决定show、update、destroy
  #places_path毋需参数，根据HTTP动词决定index、create

  #只需记得resources就可以写出URL Helper。
  #[custom route]_event[s]_path( event ), :method => GET | POST | PUT | DELETE
  #_path结尾是相对网址，而_url结尾则会加上完整Domain网址。

  #浏览器支援PUT跟DELETE吗？Rails其实偷藏了_method参数。HTML规格只定义了GET/POST，所以HTML表单是没有PUT/DELETE的。但是XmlHttpRequest规格(也就是Ajax用的)有定义GET/POST/PUT/DELETE/HEAD/OPTIONS。
  #as帮助我们生产一个admin_path和一个admin_url

  root :to => 'main#index', :as => 'main'

  #临时测试路径
  get "/v1" => 'main#v1'
  match 'test' => 'users#mail'

  #公共路由
  resources :albums
  resources :attacheds, :only => [:new, :post, :show] do
    collection do
      post :upload
    end
  end

  #照片
  resources :photos do
    collection do
      post :upload
    end
  end

  #评论
  resources :comments do
    collection do
      get :list
      get :getone
    end
  end

  #目的地
  resources :places do
    member do
      get 'photos'
      post 'wantgoto'
      post 'beento'
    end
    collection do
      match 'city/:name' => 'places#city', :constraints => {:name => /[a-zA-z1-9]+/}, :as => 'city'
      get :city
      get :view
    end
  end

  #论坛
  resources :forums,:except => [:show] do
    collection do
      get :select_forums
      get ':id', :to => "forums#list",:constraints => {:id => /[\d]+/},:as => 'list'
      #话题
      resources :topics,:except => [:show] do
        collection do
          get 'post', :to => "topics#new",:as => 'post'
          get ':id', :to => "topics#show",:constraints => {:id => /[\d]+/},:as => 'show'
        end
      end
      #resources :topics, :except => [:new], :path_names => {:new => "post"}
    end
  end

  #活动
  resources :events do
    collection do
      post :sign_up
      post :sign_out
      get :tags
    end
  end

  resources :provinces
  #resources :photos,:path_names => {:new => "upload"}
  resources :routes
  resources :asks, :path => 'wenda'


  #用户相关路由
  match 'login' => 'users#login', :as => 'login', :via => [:get, :post]
  match 'register' => 'users#register', :as => 'register'
  post 'users/create' => 'users#create'
  post 'users/ajax' => 'users#ajax'

  #会员个人主页
  resources :u, :only => [:show] do |u|
    resources :places, :only => [:index, :show]
  end

  #核心功能
  match '/forums/threads/:id' => 'forums#thread', :constraints => {:id => /\d/}, :as => 'forum_thread'


  #管理员路径
  get "admin" => 'admin#frame', :as => 'admin'
  post 'admin/login' => 'admin#login'
  namespace :admin do |admin|
    resources :ads
    resources :main
    resources :forums
    resources :places
    resources :users
    resources :options
    resources :comments
    resources :recommends
    resources :managers
    resources :guides
    resources :articles
  end

  #我们可以利用:constraints设定一些参数限制，例如限制:id必须是整数。
  #match "/events/show/:id" => "events#show", :constraints => {:id => /\d/}
  #在路由中添加参数
  #match '/home/action2' => 'home#action1', :has_params => 'yes'
  #这样就在action2的路由里添加了参数 params[:has_params], 其值为 ‘yes’


  #路径层次关系(增加tasks6种操作，路径有链接，controller没在一起)
  #使用嵌套路由(nested routes)来更佳地表达与 ActiveRecord 模型的关系。
  resources :projects do
    resources :tasks
  end

  #helper如下
  #project_tasks       GET    /projects/:project_id/tasks(.:format)           tasks#index
  #                    POST   /projects/:project_id/tasks(.:format)           tasks#create
  #new_project_task    GET    /projects/:project_id/tasks/new(.:format)       tasks#new
  #edit_project_task   GET    /projects/:project_id/tasks/:id/edit(.:format)  tasks#edit
  #project_task        GET    /projects/:project_id/tasks/:id(.:format)       tasks#show
  #                    PUT    /projects/:project_id/tasks/:id(.:format)       tasks#update
  #                    DELETE /projects/:project_id/tasks/:id(.:format)       tasks#destroy

  #projects            GET    /projects(.:format)                             projects#index
  #                    POST   /projects(.:format)                             projects#create
  #new_project         GET    /projects/new(.:format)                         projects#new
  #edit_project        GET    /projects/:id/edit(.:format)                    projects#edit
  #project             GET    /projects/:id(.:format)                         projects#show
  #                    PUT    /projects/:id(.:format)                         projects#update
  #                    DELETE /projects/:id(.:format)                         projects#destroy


  #当需要加入一个或多个动作至一个 RESTful(create,post,update...) 资源
  #/products/:id/sold(.:format)                   products#sold
  resources :products do
    get :sold, :on => :member
  end

  #shallow_path加前缀
  scope :shallow_path => "sekret" do
    resources :posts do
      resources :cmt, :shallow => true
    end
  end

  #resources :posts do
  #  resources :comments, :except => [:show, :edit, :update, :destroy]
  #end
  #resources :cars, :except => [:new, :index, :delete]
  #resources :cars, :only => [:show, :edit]

  #常见的
  match ':controller(/:action(/:id))(.:format)', :constraints => {:id => /[\d]+/}, :via => [:get]
  #上述這一行設定就包括六種路徑方式：

  #match '/:controller'
  #match '/:controller/:action'
  #match '/:controller/:action/:id'
  #match '/:controller.:format'
  #match '/:controller/:action.:format'
  #match '/:controller/:action/:id.:format'


end
