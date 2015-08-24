EmberCLI.configure do |c|
  c.app :tracker_client,
    path: Rails.root.join("tracker-client").to_s
end
