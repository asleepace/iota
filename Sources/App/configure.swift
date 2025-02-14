import Vapor

public func configure(_ app: Application) async throws {
    
    // MARK: Middleware
    app.middleware.use(FileMiddleware(
      publicDirectory: app.directory.publicDirectory
    ))

    // MARK: Routes
    try routes(app)
    
    
    // MARK: Logging
    app.logger.info("routes: \(app.routes.all)")
}
