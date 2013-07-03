# Use args with the splat operation to allow
# an unlimited number of parameters
def my_method(args)
  puts "Arguments:  #{args.inspect}"
end

my_method(1, 2)
# Arguments:  [1, 2]
# Options:    {}

my_method(1, 2, :a => :b)
# Arguments:  [1, 2]
# Options:    {:a=>:b}