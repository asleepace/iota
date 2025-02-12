import Vapor

func routes(_ app: Application) throws {

    // static files served from /Public folder
    // app.get { req async in
    //     HTML(value: """
    //     <!DOCTYPE html>
    //     <html>
    //         <head>
    //             <title>Hello, world!</title>
    //         </head>
    //         <body>
    //             <h1>Hello, world!</h1>
    //         </body>
    //     </html>
    //     """)
    // }

    // HTMX Ping 

    app.get("ping") { req -> HTML in
        HTML(value:"""
            <div>
              Status: 
              <span 
                  hx-get="/pong"
                  hx-trigger="load, every 5s"
                  hx-swap="outerHTML">
                  <span class="status-indicator offline"></span>
                  Checking...
              </span>
            </div>
        """)
    }

    // HTMX Pong
    app.get("pong") { req -> HTML in
        HTML(value:"""
            <span class="status-indicator online"></span>
            Online
        """)
    }

    // app.get("ping") { req async in
    //     Response(status: .ok)
    // }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }

    // -- FILES --

    let groupFile = app.grouped("file")
    groupFile.get("upload") { req async -> String in
        "Upload a file"
    }

    groupFile.get(":id") { req -> Response in
      return req.fileio.streamFile(at: "path/to/your/file.pdf")
    }
}