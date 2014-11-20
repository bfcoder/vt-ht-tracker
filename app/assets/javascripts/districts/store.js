// http://emberjs.com/guides/models/using-the-store/
DS.ActiveModelAdapter.reopen({
  namespace: "api"
});

VtTracker.ApplicationAdapter = DS.ActiveModelAdapter.extend();
