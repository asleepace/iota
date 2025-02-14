import Vapor

func routes(_ app: Application) throws {

    // MARK: Static files

    app.get { req throws -> Home in try Home() }
    
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
