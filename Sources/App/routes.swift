import Vapor

func routes(_ app: Application) throws {

    // MARK: Static files

    app.get("*") { req in Page("<h1>Hello, world!</h1>") }
    app.get("/") { req in req.redirect(to: "/index.html") }

    // MARK: HTMX Ping

    app.get("ping") { req -> Page in
        Page("""
            <div>
              <strong>Status:</strong>
              <span 
                  hx-get="/pong"
                  hx-trigger="load, every 5s"
                  hx-swap="outerHTML">
                  <span class="status-indicator status-offline"></span>
                  Checking...
              </span>
            </div>
        """)
    }

    // MARK: HTMX
    
    app.get("pong") { req -> Page in
        Page("""
            <span class="status-indicator status-online"></span>
            Online
        """)
    }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }
    
    // MARK: Post

    app.post("ping") { req async in
        Response(status: .ok)
    }

    // MARK: File Groups

    let groupFile = app.grouped("file")

    groupFile.get("upload") { req async -> String in
        "Upload a file"
    }

    groupFile.get(":id") { req -> String in
      return "downloading"
    }
}
