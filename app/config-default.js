DashboardConfig = {
  configName: 'default',

  dim: [4, 2],

  widgetMargins: 5,

  grid: {
    width: 1480,
    height: 820,

    sources: {
      meterSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 2000,
          dataUpdate: function(callback) {
            callback({ value: Math.round(Math.random() * 100), message: "Meter message" });
          }
        }
      },

      sinSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 1500,
          currentX: 0,
          dataUpdate: function(callback) {
            var step = 0.5;
            var curr = this.get('currentX');
            this.set('currentX', curr + step);
            var arr = [];
            for(var i = 0; i < 5; i++)
              arr.push({ x: curr + i * step, y: Math.sin(curr + i * step) + 1 });
            callback(arr);
          }
        }
      },

      tasksSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 10000,
          dataUpdate: function(callback) {
            callback([
              {
                task: "Random task",
                pointsTotal: 3,
                pointsDone: 1,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              },
              {
                task: "Considerable stuff",
                pointsTotal: 8,
                pointsDone: 4,
                assignedTo: [{
                  name: "jcazevedo",
                  avatarUrl: "https://s.gravatar.com/avatar/7724a3ee1890f271f424878b0524ae15?s=30"
                }, {
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Serious biz",
                pointsTotal: 15,
                pointsDone: 3,
                assignedTo: [{
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Minor thing",
                pointsTotal: 1,
                pointsDone: 0,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              }
            ])
          }
        }
      }
    },

    widgets: [
      {
        pos: [1, 1],
        widget: 'Dashboard.WeatherWidget',
        source: 'Dashboard.WeatherSource',
        sourceArgs: { woeId: 746203 }
      },
      {
        pos: [1, 2],
        widget: 'Dashboard.MeterWidget',
        source: 'meterSource',
        args: { title: 'Meter title' }
      },
      {
        pos: [1, 3],
        widget: 'Dashboard.ClockWidget',
        source: 'Dashboard.TimeSource'
      },
      {
        pos: [1, 4],
        size: [1, 2],
        widget: 'Dashboard.BuildWidget',
        source: 'Dashboard.JenkinsSource',
        sourceArgs: {
          baseUrl: "https://jenkins.qa.ubuntu.com",
          view: "PS"
        }
      },
      {
        pos: [2, 1],
        widget: 'Dashboard.GraphWidget',
        source: 'sinSource'
      },
      {
        pos: [2, 2],
        widget: 'Dashboard.ScrumWidget',
        source: 'tasksSource',
        args: { title: "Sprint" }
      },
      {
        pos: [2, 3],
        widget: 'Dashboard.SongWidget',
        source: 'Dashboard.LastFmSource',
        sourceArgs: {
          period: 60000, // can be less than 1 minute if a new API key is created!
          lastFmUsers: ["ruippeixotog", "jcazevedo", "beat1", "bytter", "skyh0rse"],
          apiKey: "c0918a85adee9c257b83c66c03dd681b"
        }
      }
    ]
  }
};
