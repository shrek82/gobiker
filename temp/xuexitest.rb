require "test/unit"
class TestSetupTeardown < Test::Unit::TestCase

  def setup
    super
    puts "setup"
  end

  def test_1
    puts "test_1"
  end

  def test_2
    puts "test_2"
  end

  def teardown
    super
    puts "teardown"
  end
end