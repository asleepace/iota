import Vapor

func routes(_ app: Application) throws {

    app.get("ping") { req async in
        Response(status: .ok)
    }

    app.get { req async in
        "It works!"
    }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }
}