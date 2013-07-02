Gobiker::Application.routes.draw do

  #show、new、edit、update、destroy是单数，对单一元素操作
  #index、create是复数，对群集操作
  #place_path(@place)需要参数，根据HTTP动词决定show、update、destroy
  #places_path毋需参数，根据HTTP动词决定index、create

  #只需记得resources就可以写出URL Helper。
  #[custom route]_event[s]_path( event ), :method => GET | POST | PUT | DELETE
  #_path结尾是相对网址，而_url结尾则会加上完整Domain网址。

  #浏览器支援PUT跟DELETE吗？Rails其实偷藏了_method参数。HTML规格只定义了GET/POST，所以HTML表单是没有PUT/DELETE的。但是XmlHttpRequest规格(也就是Ajax用的)有定义GET/POST/PUT/DELETE/HEAD/OPTIONS。

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
  end


  resources :provinces
  resources :comments

  #as帮助我们生产一个admin_path和一个admin_url
  match '/admin' => 'admin#frame',:as=>'admin'
  match '/admin/dashboard' => 'admin#dashboard',:as=>'admin_dashboard'


  match 'users/ajax' => 'users#ajax'
  match 'test' => 'users#mail'
  match '/login' => 'users#login'
  match '/register' => 'users#register'

  resources :places
  resources :routes
  resources :users

  #可以透过:via 参数指定HTTP Verb 动词
  match "account/overview" => "account#overview", :via => "get"
  #或者
  get "account/overview" => "account#overview"
  get "account/setup" => "account#setup"
  post "account/setup" => "account#setup"

  #我们可以利用:constraints设定一些参数限制，例如限制:id必须是整数。
  match "/events/show/:id" => "events#show", :constraints => {:id => /\d/}

  #嵌套resources
  resources :projects do
    resources :tasks, :people
  end
  #helper如下
  #project_tasks       GET    /projects/:project_id/tasks(.:format)           tasks#index
  #                    POST   /projects/:project_id/tasks(.:format)           tasks#create

  #new_project_task    GET    /projects/:project_id/tasks/new(.:format)       tasks#new
  #edit_project_task   GET    /projects/:project_id/tasks/:id/edit(.:format)  tasks#edit
  #project_task        GET    /projects/:project_id/tasks/:id(.:format)       tasks#show
  #                    PUT    /projects/:project_id/tasks/:id(.:format)       tasks#update
  #                    DELETE /projects/:project_id/tasks/:id(.:format)       tasks#destroy

  #project_people      GET    /projects/:project_id/people(.:format)          people#index
  #                    POST   /projects/:project_id/people(.:format)          people#create

  #new_project_person  GET    /projects/:project_id/people/new(.:format)      people#new
  #edit_project_person GET    /projects/:project_id/people/:id/edit(.:format) people#edit
  #project_person      GET    /projects/:project_id/people/:id(.:format)      people#show
  #                    PUT    /projects/:project_id/people/:id(.:format)      people#update
  #                    DELETE /projects/:project_id/people/:id(.:format)      people#destroy

  #projects            GET    /projects(.:format)                             projects#index
  #                    POST   /projects(.:format)                             projects#create

  #new_project         GET    /projects/new(.:format)                         projects#new
  #edit_project        GET    /projects/:id/edit(.:format)                    projects#edit
  #project             GET    /projects/:id(.:format)                         projects#show
  #                    PUT    /projects/:id(.:format)                         projects#update
  #                    DELETE /projects/:id(.:format)                         projects#destroy


  #自定群集路由Collection
  #除了 ​​惯例中的七个Actions外，如果你需要自定群集的Action，可以这样设定：
  resources :ads do
    collection do
      get :sold
      post :ffer
    end
  end
  #这样一来，除了惯例的几个actions外，还有
  #sold_ads GET    /ads/sold(.:format)                             ads#sold
  #ffer_ads POST   /ads/ffer(.:format)                             ads#ffer


  resources :products do
    get :sold, :on => :member
  end

  #<%= link_to "About", register_path %>
  #register_path => '/register'
  #register_url  => 'http://localhost:3000/register'

  #match 'main/test'


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end



  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'main#index', :as => 'main'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.

  #其他的
  #match ':controller(/:action(/:id))(.:format)'
  #上述這一行設定就包括六種路徑方式：

  #match '/:controller'
  #match '/:controller/:action'
  #match '/:controller/:action/:id'
  #match '/:controller.:format'
  #match '/:controller/:action.:format'
  #match '/:controller/:action/:id.:format'


end
