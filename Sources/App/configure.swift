import Vapor

public func configure(_ app: Application) async throws {
    // register middleware
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    // register routes
    try routes(app)

    app.logger.info("routes: \(app.routes.all)")
}