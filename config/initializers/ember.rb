EmberCLI.configure do |c|
  c.app :tracker_client,
    path: Rails.root.join("tracker-client").to_s,
    build_timeout: 60
end
