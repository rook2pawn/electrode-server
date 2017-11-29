require(".")({
  connection : {
    port: 3000
  },
  listener: emitter => {
    emitter.on("plugins-sorted", (data, next) => {
      console.log("plugins-sorted:", Object.keys(data));
      next();
    });
    emitter.on("plugins-registered", (data, next) => {
      console.log("plugins-registered:", Object.keys(data));
      next();
    });
    emitter.on("complete", (data, next) => {
      console.log("complete:", Object.keys(data));
      next();
    });
    emitter.on("server-started", (data, next) => {
      console.log("server-started:", Object.keys(data));
      next();
    });
    emitter.on("server-created", (data, next) => {
      console.log("server-created", Object.keys(data));
      next();
    });
  },
  plugins: {
    cupid: {
      name: "myPlugin",
      version: "1.0.0",
      register: function(server, options) {
        server.route({
          method: "GET",
          path: "/",
          handler: function(request) {
            return "Hello, world!";
          }
        });
        server.route({
          method: "GET",
          path: "/{name}",
          handler: function(request) {
            return "Hello, " + encodeURIComponent(request.params.name) + "!";
          }
        });
      }
    }
  }
});
