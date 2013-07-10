#app/interactors/agent/add_comment.rb
class Agent::AddComment
  attr_reader :comment

  def initialize(agent, comment)
    @agent = agent
    @comment = comment
  end

  def allowed?
    #touch_log = TouchLog.find(@comment.touch_log_id)
    #return false if !@comment.valid? || touch_log.agent_id != @agent.id
    return true
  end

  def run()
    return false if !allowed?

    #MixpanelWrapper.track("Agent: Add Comment To Prospect", {:distinct_id => @agent.email})

    @comment.save
  end

end