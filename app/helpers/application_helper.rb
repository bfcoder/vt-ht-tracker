module ApplicationHelper
  def brand_title
    @setting ||= Setting.first
    if @setting.mode == 'visiting_teaching'
      'Visiting Teaching Tracker'
    elsif @setting.mode == 'home_teaching'
      'Home Teaching Tracker'
    end
  end
end
